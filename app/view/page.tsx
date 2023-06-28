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
import { useRouter } from "next/navigation";
import Link from "next/link";

interface pageProps {}

async function getUsers() {
  const users = await prisma.user.findMany();
  return users;
}

export const revalidate = 60;

async function page({}: pageProps) {
  const users = await getUsers();

  return (
    <div>
      <Table>
        <TableCaption>List of Students.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">S/N</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead className="text-center">Resume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default page;
