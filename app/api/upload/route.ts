import { NextResponse } from "next/server";
import { google } from "googleapis";
import { Readable, PassThrough } from "stream";
import prisma from "@/lib/prismadb";

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

const folderId = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID!;

async function generatePublicUrl(id: string) {
  try {
    await drive.permissions.create({
      fileId: id,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    const result = await drive.files.get({
      fileId: id,
      fields: "webViewLink, webContentLink",
    });

    return result.data as { webViewLink: string; webContentLink: string };
  } catch (error: any) {
    console.log(error.message);
  }
}

async function uploadFile(file: any) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const readableStream = new Readable();
  readableStream.push(buffer);
  readableStream.push(null);

  try {
    const response = await drive.files.create({
      requestBody: {
        parents: [folderId],
        name: file.name,
      },
      media: {
        mimeType: file.type,
        body: readableStream,
      },
    });

    return response.data as {
      kind: string;
      id: string;
      name: string;
      mimeType: string;
    };
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;

  if (file.length < 1 || !name || !email || !phone) {
    return new NextResponse("Invalid Credentials", {
      status: 400,
    });
  }

  const alreadyFilled = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  let user;

  console.log(alreadyFilled, "alreadyFilled");

  if (!alreadyFilled) {
    try {
      const fileUpload = await uploadFile(file);

      if (!fileUpload) {
        throw new Error("Error uploading file");
      }

      const publicUrl = await generatePublicUrl(fileUpload.id);

      if (!publicUrl) {
        throw new Error("Error generating public url");
      }

      user = await prisma.user.create({
        data: {
          name: name,
          email: email,
          phone: phone,
          previewResume: publicUrl?.webViewLink!,
          downloadResume: publicUrl?.webContentLink!,
        },
      });

      return NextResponse.json(user);
    } catch (error) {
      console.log(error);
      return new NextResponse("Error", {
        status: 400,
      });
    }
  } else {
    return new NextResponse("You have already submitted before", {
      status: 400,
    });
  }
}
