import type { Metadata } from "next";
import { Inter, Asap } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import Navbar from "@/components/Navbar";

const asap = Asap({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={asap.className}>
          <Navbar />
          {children}</body>
      </html>
    </ClerkProvider>
  );
}
