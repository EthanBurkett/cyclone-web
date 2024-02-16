import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import dbConnect from "@/lib/db";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await dbConnect();
  return (
    <html lang="en">
      <body
        className={`w-screen h-screen absolute top-0 left-0 overflow-hidden ${inter.className}`}
      >
        {children}
      </body>
    </html>
  );
}
