import ToastContext from "@/contexts/ToastContext";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Resume Submit",
  description: "NUESA Resume Submit",
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
