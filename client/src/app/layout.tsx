import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
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
  icons: {
    icon: [
      { url: "/favicon.ico" },                                                        // ✅ favicon.ico
      { url: "/favicon.svg", type: "image/svg+xml" },                                 // ✅ favicon.svg
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },              // ✅ favicon-96x96.png
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },         // ✅ apple-touch-icon.png
    ],
    other: [
      { url: "/web-app-manifest-192x192.png", sizes: "192x192", rel: "manifest" },   // ✅ web-app-manifest-192x192.png
      { url: "/web-app-manifest-512x512.png", sizes: "512x512", rel: "manifest" },   // ✅ web-app-manifest-512x512.png
    ],
  },
  manifest: "/site.webmanifest",                                                       // ✅ site.webmanifest
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

        <main className="min-h-screen">
          {children}
        </main>

        {/* <Footer /> */}
      </body>
    </html>
  );
}