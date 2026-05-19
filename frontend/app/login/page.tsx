"use client";

import AuthNavbar from "../components/AuthNavbar";

import { motion } from "framer-motion";

import { useState } from "react";

import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {

  const [showPassword, setShowPassword] =
    useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<any>({});

  const validateForm = () => {

    const newErrors: any = {};

    // Email Validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      newErrors.email = "Invalid email address";
    }

    // Password Validation
    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (validateForm()) {

      console.log({
        email,
        password,
      });

      alert("Login Validation Passed 😄🔥");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-black">

      {/* Navbar */}
      <AuthNavbar />

      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1507842217343-583bb7270b66"
        alt="Library"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/65"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl px-10 grid md:grid-cols-2 gap-10 items-center">

        {/* Left Side Text */}
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="hidden md:block"
        >

          <h1 className="text-6xl font-extrabold leading-tight text-white drop-shadow-2xl">
            Welcome to the
            <br />
            Library System
          </h1>

          <p className="text-zinc-300 text-xl mt-10 leading-10">
            Log in to continue your digital library journey
            and explore thousands of books anytime.
          </p>

        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="bg-[#132235]/90 backdrop-blur-xl border border-white/10 rounded-[35px] p-10 max-w-md w-full justify-self-center shadow-2xl mt-20"
        >

          <h2 className="text-5xl font-bold text-white text-center">
            Log in
          </h2>

          <form
            onSubmit={handleLogin}
            className="mt-12 flex flex-col gap-8"
          >

            {/* Email */}
            <div>

              <label className="text-blue-300 text-sm">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full mt-3 bg-transparent border-b border-zinc-500 p-3 outline-none text-white placeholder:text-zinc-400"
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.email}
                </p>
              )}

            </div>

            {/* Password */}
            <div>

              <label className="text-blue-300 text-sm">
                Password
              </label>

              <div className="flex items-center border-b border-zinc-500 mt-3">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  className="w-full bg-transparent p-3 outline-none text-white placeholder:text-zinc-400"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="text-zinc-400 pr-3"
                >

                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}

                </button>

              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.password}
                </p>
              )}

            </div>

            {/* Forgot Password */}
            <a
              href="/forgot-password"
              className="text-right text-blue-400 hover:text-blue-300 text-sm"
            >
              Forgot Password?
            </a>

            {/* Button */}
            <button className="bg-blue-600 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition hover:scale-105">
              Log in
            </button>

          </form>

          {/* Register Link */}
          <p className="text-zinc-400 text-center mt-8">
            Don&apos;t have an account?
          </p>

          <a
            href="/register"
            className="block text-center text-blue-400 mt-2 hover:text-blue-300 transition"
          >
            Sign up now
          </a>

        </motion.div>

      </div>

    </div>
  );
}