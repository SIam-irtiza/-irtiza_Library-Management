"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import {
  FaBook,
  FaUser,
  FaBookOpen,
  FaSignOutAlt,
} from "react-icons/fa";

export default function UserDashboard() {

  const router = useRouter();

  // Role Protection
  useEffect(() => {

    const user =
      localStorage.getItem("user");

    if (!user) {

      router.push("/login");

      return;
    }

    const parsedUser =
      JSON.parse(user);

    if (
      parsedUser.role !== "USER" &&
      parsedUser.role !== "user"
    ) {

      router.push("/login");
    }

  }, []);

  const [activePage, setActivePage] =
    useState("dashboard");

  return (
    <div className="min-h-screen bg-[#0B1120] text-white flex">

      {/* Sidebar */}
      <aside className="w-72 bg-[#111827] border-r border-white/10 p-6 flex flex-col justify-between">

        <div>

          {/* Logo */}
          <div className="flex items-center gap-4 mb-12">

            <img
              src="/library-logo.png"
              alt="Logo"
              className="w-14 h-14 rounded-full bg-white"
            />

            <h1 className="text-3xl font-bold">
              Library
            </h1>

          </div>

          {/* Menu */}
          <nav className="flex flex-col gap-5 text-lg">

            {/* Dashboard */}
            <button
              onClick={() =>
                setActivePage("dashboard")
              }
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition ${
                activePage === "dashboard"
                  ? "bg-blue-600"
                  : "hover:bg-white/10"
              }`}
            >

              <FaBookOpen />

              Dashboard

            </button>

            {/* Profile */}
            <button
              onClick={() =>
                setActivePage("profile")
              }
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition ${
                activePage === "profile"
                  ? "bg-blue-600"
                  : "hover:bg-white/10"
              }`}
            >

              <FaUser />

              My Profile

            </button>

            {/* Books */}
            <button
              onClick={() =>
                setActivePage("books")
              }
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition ${
                activePage === "books"
                  ? "bg-blue-600"
                  : "hover:bg-white/10"
              }`}
            >

              <FaBook />

              Books

            </button>

            {/* Borrowed */}
            <button
              onClick={() =>
                setActivePage("borrowed")
              }
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition ${
                activePage === "borrowed"
                  ? "bg-blue-600"
                  : "hover:bg-white/10"
              }`}
            >

              <FaBook />

              Borrowed Books

            </button>

          </nav>

        </div>

        {/* Logout */}
        <button
          onClick={() => {

            localStorage.removeItem(
              "token"
            );

            localStorage.removeItem(
              "user"
            );

            router.push("/login");
          }}
          className="flex items-center gap-4 hover:bg-red-500/20 text-red-400 px-5 py-4 rounded-2xl transition"
        >

          <FaSignOutAlt />

          Logout

        </button>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-5xl font-bold">
              User Dashboard
            </h1>

            <p className="text-zinc-400 mt-3 text-lg">
              Welcome back to your library panel.
            </p>

          </div>

          {/* User Info */}
          <div className="flex items-center gap-4 bg-white/5 px-5 py-3 rounded-2xl border border-white/10">

            <img
              src="https://i.pravatar.cc/100"
              alt="User"
              className="w-14 h-14 rounded-full"
            />

            <div>

              <h2 className="font-bold text-lg">
                User
              </h2>

              <p className="text-zinc-400 text-sm">
                user@gmail.com
              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}