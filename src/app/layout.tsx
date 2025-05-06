import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LinkHub - Your Personal Link Hub",
  description: "Manage and share your important links in one place",
  keywords: "links, profile, social media, link sharing, linktree alternative",
  authors: [{ name: "LinkHub Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} animate-fadeIn`}>
        {children}
      </body>
    </html>
  );
}
