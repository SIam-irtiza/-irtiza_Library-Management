"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

import {
  FaBook,
  FaUsers,
  FaUserShield,
  FaTrash,
  FaSignOutAlt,
} from "react-icons/fa";

import axios from "axios";

import toast from "react-hot-toast";

import API_BASE_URL from "../../config/api";

export default function AdminDashboard() {

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
      parsedUser.role !== "ADMIN" &&
      parsedUser.role !== "admin"
    ) {

      router.push("/login");
    }

  }, []);

  const [activePage, setActivePage] =
    useState("dashboard");

  const [users, setUsers] =
    useState<any[]>([]);

  const [books, setBooks] =
    useState<any[]>([]);

  // Fetch Users
  const fetchUsers = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await axios.get(
          `${API_BASE_URL}/users`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setUsers(response.data);

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to load users"
      );
    }
  };

  // Fetch Books
  const fetchBooks = async () => {

    try {

      const response =
        await axios.get(
          `${API_BASE_URL}/books`
        );

      setBooks(response.data);

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to load books"
      );
    }
  };

  // Delete User
  const deleteUser = async (
    id: number
  ) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.delete(
        `${API_BASE_URL}/users/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "User Deleted"
      );

      fetchUsers();

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to delete user"
      );
    }
  };

  // Delete Book
  const deleteBook = async (
    id: number
  ) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.delete(
        `${API_BASE_URL}/books/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Book Deleted"
      );

      fetchBooks();

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to delete book"
      );
    }
  };

  useEffect(() => {

    fetchUsers();

    fetchBooks();

  }, []);

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
              Admin Panel
            </h1>

          </div>

          {/* Menu */}
          <nav className="flex flex-col gap-5 text-lg">

            {/* Dashboard */}
            <button
              onClick={() =>
                setActivePage(
                  "dashboard"
                )
              }
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition ${
                activePage ===
                "dashboard"
                  ? "bg-blue-600"
                  : "hover:bg-white/10"
              }`}
            >

              <FaUserShield />

              Dashboard

            </button>

            {/* Users */}
            <button
              onClick={() =>
                setActivePage(
                  "users"
                )
              }
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition ${
                activePage ===
                "users"
                  ? "bg-blue-600"
                  : "hover:bg-white/10"
              }`}
            >

              <FaUsers />

              Manage Users

            </button>

            {/* Books */}
            <button
              onClick={() =>
                setActivePage(
                  "books"
                )
              }
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition ${
                activePage ===
                "books"
                  ? "bg-blue-600"
                  : "hover:bg-white/10"
              }`}
            >

              <FaBook />

              Manage Books

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

      {/* Main */}
      <main className="flex-1 p-10">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-5xl font-bold">
              Admin Dashboard
            </h1>

            <p className="text-zinc-400 mt-3 text-lg">
              Manage your entire
              library system.
            </p>

          </div>

          {/* Admin Profile */}
          <div className="flex items-center gap-4 bg-white/5 px-5 py-3 rounded-2xl border border-white/10">

            <img
              src="https://i.pravatar.cc/100"
              alt="Admin"
              className="w-14 h-14 rounded-full"
            />

            <div>

              <h2 className="font-bold text-lg">
                Admin
              </h2>

              <p className="text-zinc-400 text-sm">
                admin@gmail.com
              </p>

            </div>

          </div>

        </div>

        {/* Dashboard */}
        {activePage ===
          "dashboard" && (

          <div className="grid md:grid-cols-3 gap-8">

            {/* Users */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 shadow-2xl">

              <h2 className="text-2xl font-bold">
                Total Users
              </h2>

              <p className="text-6xl font-extrabold mt-6">
                {users.length}
              </p>

            </div>

            {/* Books */}
            <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-3xl p-8 shadow-2xl">

              <h2 className="text-2xl font-bold">
                Total Books
              </h2>

              <p className="text-6xl font-extrabold mt-6">
                {books.length}
              </p>

            </div>

            {/* Status */}
            <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-3xl p-8 shadow-2xl">

              <h2 className="text-2xl font-bold">
                Library System
              </h2>

              <p className="text-2xl font-bold mt-6">
                Active
              </p>

            </div>

          </div>

        )}

        {/* Users */}
        {activePage ===
          "users" && (

          <div>

            <h2 className="text-4xl font-bold mb-10">
              Manage Users
            </h2>

            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">

              {/* Header */}
              <div className="grid grid-cols-5 bg-white/10 px-6 py-5 font-bold text-lg">

                <p>ID</p>

                <p>Name</p>

                <p>Email</p>

                <p>Role</p>

                <p>Action</p>

              </div>

              {/* Users */}
              {users.map((user) => (

                <div
                  key={user.id}
                  className="grid grid-cols-5 px-6 py-5 border-t border-white/10 items-center"
                >

                  <p>{user.id}</p>

                  <p>{user.fullName}</p>

                  <p>{user.email}</p>

                  <p>{user.role}</p>

                  <button
                    onClick={() =>
                      deleteUser(
                        user.id
                      )
                    }
                    className="bg-red-600 hover:bg-red-700 transition px-5 py-2 rounded-xl w-fit"
                  >

                    Delete

                  </button>

                </div>

              ))}

            </div>

          </div>

        )}

        {/* Books */}
        {activePage ===
          "books" && (

          <div>

            <h2 className="text-4xl font-bold mb-10">
              Manage Books
            </h2>

            {/* Books Table */}
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">

              {/* Header */}
              <div className="grid grid-cols-5 bg-white/10 px-6 py-5 font-bold text-lg">

                <p>ID</p>

                <p>Book Name</p>

                <p>Author</p>

                <p>Available</p>

                <p>Action</p>

              </div>

              {/* Books */}
              {books.map((book) => (

                <div
                  key={book.id}
                  className="grid grid-cols-5 px-6 py-5 border-t border-white/10 items-center"
                >

                  <p>{book.id}</p>

                  <p>{book.title}</p>

                  <p>{book.author}</p>

                  <p>{book.available}</p>

                  {/* Buttons */}
                  <div className="flex gap-3">

                    {/* Add */}
                    <button className="bg-green-600 hover:bg-green-700 transition px-5 py-2 rounded-xl">

                      Add Book

                    </button>

                    {/* Update */}
                    <button className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-xl">

                      Update

                    </button>

                    {/* Delete */}
                    <button
                      onClick={() =>
                        deleteBook(
                          book.id
                        )
                      }
                      className="bg-red-600 hover:bg-red-700 transition px-5 py-2 rounded-xl"
                    >

                      Delete

                    </button>

                  </div>

                </div>

              ))}

            </div>

          </div>

        )}

      </main>

    </div>
  );
}