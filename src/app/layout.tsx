
import type { Metadata } from "next";
import "./globals.css";
import { Kode_Mono } from "next/font/google";

const kode = Kode_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-kode-mono",
});

export const metadata: Metadata = {
  title: "Fundifier",
  description: "Find your fund",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={kode.className}>{children}</body>
    </html>
  );
}
