import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import AuthProvider from "./context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";

const sora = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AnjarHariadi",
  description: "Software Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en" className=" scroll-smooth">
        <body className={sora.className}>
          <main>{children}</main>
          <Toaster />
        </body>
      </html>
    </AuthProvider>
  );
}
