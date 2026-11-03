
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "International Institute Of Languages",
//   description:
//     "International Institute Of Language - professional study abroad, visa, and language training.",
// };
export const metadata: Metadata = {
  title: "International Institute Of Languages",
  description:
    "International Institute Of Languages - professional study abroad, visa assistance, IELTS, and language training.",
  applicationName: "International Institute Of Languages",
  openGraph: {
    title: "International Institute Of Languages",
    description:
      "Professional study abroad, visa assistance, and language training.",
    siteName: "International Institute Of Languages",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
      </body>
    </html>
  );
}
