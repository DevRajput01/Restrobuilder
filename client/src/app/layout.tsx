import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // Ensure the path matches your folder structure
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RestroBuilder | Create Your Restaurant Website in 5 Minutes",
  description: "The easiest way for restaurants to create beautiful, professional websites without coding.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-slate-900`}
      >
        {/* <Navbar /> */}
        
        {/* main tag with pt-16 to account for the fixed navbar height */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* <Footer /> */}
      </body>
    </html>
  );
}