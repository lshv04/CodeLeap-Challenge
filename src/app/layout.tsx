import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "CodeLeap Network",
  description: "CodeLeap Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased bg-gray-100 min-h-screen`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
