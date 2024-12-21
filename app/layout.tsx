import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provide";
import {Outfit} from 'next/font/google'
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({
  subsets: ["latin"]
})



export const metadata: Metadata = {
  title: "Ai Short Video Generator",
  description: "Create stunning videos with AI magic. Transform your ideas into captivating short videos in seconds. No editing skills required.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={outfit.className}
      >
        <Provider>
        {children}
        </Provider>
        <Toaster/>
      </body>
    </html>
    </ClerkProvider>
  );
}
