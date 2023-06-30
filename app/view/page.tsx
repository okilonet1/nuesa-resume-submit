import prisma from "@/lib/prismadb";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

import { currentUser } from "@clerk/nextjs";
import Image from "next/image";

import Logo from "@/assets/NUESA LOGO.png";
import BG from "@/assets/SL_072620_32930_03.jpg";
import Link from "next/link";

interface pageProps {}

async function getUsers() {
  const user = await currentUser();

  if (user?.publicMetadata.role === "admin") {
    const users = await prisma.user.findMany();
    return users;
  }
  return [];
}

export const revalidate = 10;

async function Page({}: pageProps) {
  const user = await currentUser();

  const users = await getUsers();

  if (user?.publicMetadata.role !== "admin") {
    return notFound();
  }

  return (
    <>
      <div>
        <div className="space-y-8 ">
          <Link href="/">
            <Image
              alt="logo"
              src={Logo}
              width={70}
              height={70}
              placeholder="blur"
              className="mx-auto"
            />
            <h1 className="text-center text-2xl font-bold">
              NUESA ABUAD RESUME UPLOAD
            </h1>
          </Link>
        </div>
        <Table>
          <TableCaption>List of Students.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">S/N</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-center">Resume</TableHead>
              <TableHead className="text-center">ITLetter</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell className="text-center">
                  <Link href={user.downloadResume}>
                    <Button variant={"ghost"}>Download</Button>
                  </Link>
                  <Link href={user.previewResume} target="_blank">
                    <Button variant={"ghost"}>Preview</Button>
                  </Link>
                </TableCell>
                <TableCell className="text-center">
                  <Link href={user.itLetter}>
                    <Button variant={"ghost"}>Preview</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default Page;
