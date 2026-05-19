import type { Metadata } from "next";
import "./globals.css";

import Footer from "./components/Footer";

import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Library Management System",
  description: "Modern Library Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className="bg-black text-white">

        {/* Toast Message */}
        <Toaster position="top-right" />

        {children}

        <Footer />

      </body>

    </html>
  );
}