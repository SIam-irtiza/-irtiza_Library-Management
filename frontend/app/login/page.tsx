"use client";

import axios from "axios";

import { useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { motion } from "framer-motion";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import API_BASE_URL from "../config/api";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // Validation
  const validateForm = () => {

    let valid = true;

    const newErrors = {
      email: "",
      password: "",
    };

    // Email
    if (!email) {

      newErrors.email =
        "Email is required";

      valid = false;

    } else if (!email.includes("@")) {

      newErrors.email =
        "Enter a valid email";

      valid = false;
    }

    // Password
    if (!password) {

      newErrors.password =
        "Password is required";

      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  // Login
  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (validateForm()) {

      try {

        const response =
          await axios.post(
            `${API_BASE_URL}/auth/login`,
            {
              email,
              password,
            }
          );

        console.log(response.data);

        // Save Token
        localStorage.setItem(
          "token",
          response.data.access_token
        );

        // Save User
        localStorage.setItem(
          "user",
          JSON.stringify(
            response.data.user
          )
        );

        toast.success(
          "Login Successful ",
          {
            position: "top-center",
          }
        );

        // Role Based Redirect
        const role =
          response.data.user.role;

        if (
          role === "admin" ||
          role === "ADMIN"
        ) {

          router.push(
            "/admin/dashboard"
          );

        } else {

          router.push(
            "/user/dashboard"
          );
        }

      } catch (error: any) {

        console.log(error);

        toast.error(
          error.response?.data
            ?.message ||
            "Login Failed",
          {
            position: "top-center",
          }
        );
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-black">

      {/* Background */}
      <img
        src="https://images.unsplash.com/photo-1507842217343-583bb7270b66"
        alt="Library"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Main */}
      <div className="relative z-10 w-full max-w-md">

        {/* Login Card */}
        <motion.div
          initial={{
            opacity: 0,
            y: 80,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="bg-[#132235]/90 backdrop-blur-xl border border-white/10 rounded-[35px] p-10 shadow-2xl"
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
                className="w-full mt-3 bg-transparent border-b border-zinc-500 p-3 outline-none text-white placeholder:text-zinc-400"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
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

              <div className="relative">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  className="w-full mt-3 bg-transparent border-b border-zinc-500 p-3 outline-none text-white placeholder:text-zinc-400"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  className="w-full mt-3 bg-transparent border-b border-zinc-500 p-3 outline-none text-white placeholder:text-zinc-400"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-3 top-7 text-zinc-400"
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
            <div className="text-right">

              <a
                href="#"
                className="text-blue-400 hover:text-blue-300 transition text-sm"
              >

                Forgot Password?

              </a>

            </div>

            {/* Button */}
            <button className="bg-blue-600 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition hover:scale-105">

              Log in

            </button>

          </form>

          {/* Register */}
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