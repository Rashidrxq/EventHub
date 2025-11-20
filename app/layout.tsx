// app/layout.tsx
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Import your Cursor client component (make sure file exists at this path)
import Cursor from "./components/Cursor";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Cursor must be inside <body> so it can mount correctly */}
        <Cursor />

        <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#100325]/10">
          <nav className="max-w-6xl mx-auto flex justify-between items-center py-3 px-4">
            {/* Logo */}
            <Link href="/">
              <Image
                src="/logo/logo.png" // file in public/logo/logo.png
                alt="EventHub Logo"
                width={60}
                height={20}
                priority
              />
            </Link>

            <ul className="flex gap-6">
              {/* Use white text so it reads on the translucent background */}
              <li className="text-white/90 hover:text-[#B31CA1] cursor-pointer transition-colors duration-200">
                Home
              </li>

              <li className="text-white/90 hover:text-[#B31CA1] cursor-pointer transition-colors duration-200">
                Events
              </li>

              <li className="text-white/90 hover:text-[#B31CA1] cursor-pointer transition-colors duration-200">
                My Tickets
              </li>

              <li className="text-white/90 hover:text-[#B31CA1] cursor-pointer transition-colors duration-200">
                Organizer
              </li>

              <li className="text-white/90 hover:text-[#B31CA1] cursor-pointer transition-colors duration-200">
                Contact Us
              </li>
            </ul>
          </nav>
        </header>

        {/* page content */}
        {children}
      </body>
    </html>
  );
}
