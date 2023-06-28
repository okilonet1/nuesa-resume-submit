import ToastContext from "@/contexts/ToastContext";
import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";

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
        <ToastContext />
        {children}
      </body>
    </html>
  );
}
