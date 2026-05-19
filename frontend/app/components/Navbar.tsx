"use client";

import { FaBookOpen } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-10 py-5 flex justify-between items-center">

        <div className="flex items-center gap-3">
          <FaBookOpen className="text-3xl text-blue-500" />

          <h1 className="text-2xl font-bold tracking-wide">
            LibraryMS
          </h1>
        </div>

        <div className="flex gap-8 text-lg">

          <a href="/" className="hover:text-blue-400 transition">
            Home
          </a>

          <a
            href="#about"
            className="hover:text-blue-400 transition"
          >
            About
          </a>

          <a
            href="#features"
            className="hover:text-blue-400 transition"
          >
            Features
          </a>

          <a
            href="/login"
            className="hover:text-blue-400 transition"
          >
            Login
          </a>

          <a
            href="#contact"
            className="hover:text-blue-400 transition"
          >
            Contact
          </a>

        </div>
      </div>
    </nav>
  );
}