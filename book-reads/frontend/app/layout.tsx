"use client";
import "./globals.css";
import React from "react";
import { usePathname } from "next/navigation";
import { NavBarDemo } from "./components/NavBar";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideNavBar = ["/auth/login", "/auth/signup"].includes(pathname);

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        {!hideNavBar && <NavBarDemo />}
        <main className="container mx-auto mt-4">{children}</main>
      </body>
    </html>
  );
}
