import ToastContext from "@/contexts/ToastContext";
import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import Image from "next/image";

import Logo from "@/assets/NUESA LOGO.png";
import BG from "@/assets/SL_072620_32930_03.jpg";
import Link from "next/link";

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
    <html lang="en">
      <body className={inter.className}>
        <div className="space-y-8 ">
          {/* <div
            style={{
              position: "fixed",
              height: "100vh",
              width: "100vw",
              overflow: "hidden",
              zIndex: "-1",
            }}
          >
            <Image
              alt="Mountains"
              src={BG}
              placeholder="blur"
              quality={100}
              fill
              sizes="100vw"
              style={{
                objectFit: "cover",
              }}
            />
          </div> */}

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
        <ToastContext />
        {children}
      </body>
    </html>
  );
}
