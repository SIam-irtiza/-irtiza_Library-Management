"use client";

import AuthNavbar from "../components/AuthNavbar";

import { motion } from "framer-motion";

import { useState } from "react";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import axios from "axios";

import toast from "react-hot-toast";

import API_BASE_URL from "../config/api";

import { useRouter } from "next/navigation";

export default function RegisterPage() {

  const router = useRouter();

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [errors, setErrors] = useState<any>({});

  const validateForm = () => {

    const newErrors: any = {};

    // Name Validation
    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (/\d/.test(fullName)) {
      newErrors.fullName =
        "Name cannot contain numbers";
    }

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
    } else if (password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    // Confirm Password
    if (!confirmPassword) {
      newErrors.confirmPassword =
        "Confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (validateForm()) {

      try {

        const response = await axios.post(
          `${API_BASE_URL}/auth/register`,
          {
            fullName: fullName,
            email,
            password,
            role: "USER",
          }
        );

        toast.success(
          "Registration Successful",
          {
            position: "top-center",
          }
        );

        console.log(response.data);

       router.push("/login");

      } catch (error: any) {

        toast.error(
          error.response?.data?.message ||
          "Registration Failed",
          {
            position: "top-center",
          }
        );

        console.log(error);
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-black">

      {/* Navbar */}
      <AuthNavbar />

      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
        alt="Library"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl px-10 grid md:grid-cols-2 gap-10 items-center">

        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="hidden md:block"
        >

          <h1 className="text-6xl font-extrabold leading-tight text-white">
            Join the
            <br />
            Library System
          </h1>

          <p className="text-zinc-300 text-xl mt-10 leading-10">
            Create your account and explore thousands
            of books with our modern digital platform.
          </p>

        </motion.div>

        {/* Register Card */}
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="bg-[#132235]/90 backdrop-blur-xl border border-white/10 rounded-[35px] p-10 max-w-md w-full justify-self-center shadow-2xl mt-20"
        >

          <h2 className="text-5xl font-bold text-white text-center">
            Register
          </h2>

          <form
            onSubmit={handleRegister}
            className="mt-10 flex flex-col gap-6"
          >

            {/* Full Name */}
            <div>

              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value)
                }
                className="w-full bg-transparent border-b border-zinc-500 p-4 outline-none text-white placeholder:text-zinc-400"
              />

              {errors.fullName && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.fullName}
                </p>
              )}

            </div>

            {/* Email */}
            <div>

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full bg-transparent border-b border-zinc-500 p-4 outline-none text-white placeholder:text-zinc-400"
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.email}
                </p>
              )}

            </div>

            {/* Password */}
            <div>

              <div className="flex items-center border-b border-zinc-500">

                <input
                  type={
                    showPassword ? "text" : "password"
                  }
                  placeholder="Password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  className="w-full bg-transparent p-4 outline-none text-white placeholder:text-zinc-400"
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

            {/* Confirm Password */}
            <div>

              <div className="flex items-center border-b border-zinc-500">

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  className="w-full bg-transparent p-4 outline-none text-white placeholder:text-zinc-400"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="text-zinc-400 pr-3"
                >

                  {showConfirmPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}

                </button>

              </div>

              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.confirmPassword}
                </p>
              )}

            </div>

            {/* Button */}
            <button className="bg-blue-600 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition hover:scale-105">
              Create Account
            </button>

          </form>

          {/* Login Link */}
          <p className="text-zinc-400 text-center mt-8">
            Already have an account?
          </p>

          <a
            href="/login"
            className="block text-center text-blue-400 mt-2 hover:text-blue-300"
          >
            Login now
          </a>

        </motion.div>

      </div>

    </div>
  );
}