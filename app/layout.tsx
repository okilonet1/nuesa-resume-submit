import ToastContext from "@/contexts/ToastContext";
import "./globals.css";
import { Inter } from "next/font/google";
import { type Metadata } from "next";
import Image from "next/image";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NUESA Internships",
  description:
    "Looking for an internship opportunity in engineering? NUESA presents a simplified application process where you can submit your details and upload your CV. Access our platform to find guides and templates for crafting a standout CV. Start your journey towards a rewarding internship experience today!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={inter.className}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "#f9fafb",
          }}
        >
          <header className="p-2 backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 flex items-center justify-end mb-2">
            <SignedIn>
              <Button variant={"ghost"}>View Students</Button>
              <UserButton />
            </SignedIn>
          </header>
          <ToastContext />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
