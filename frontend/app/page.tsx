"use client";

import Navbar from "./components/Navbar";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const heroImages = [
  "https://images.unsplash.com/photo-1521587760476-6c12a4b040da",
  "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
  "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
];

export default function Home() {

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === heroImages.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);

  }, []);

  return (
    <div className="bg-black text-white overflow-x-hidden">

      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">

        {/* Auto Changing Background */}
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ${
              currentImage === index
                ? "opacity-100"
                : "opacity-0"
            }`}
          >

            <img
              src={image}
              alt="library"
              className="w-full h-full object-cover scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

          </div>
        ))}

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 px-5"
        >

          <h1 className="text-6xl md:text-8xl font-extrabold leading-tight text-white drop-shadow-2xl">
            Read a book to
            <br />
            open your mind
          </h1>

          <p className="text-zinc-200 mt-8 max-w-2xl mx-auto text-xl leading-9">
            Discover a modern digital platform for managing
            books, library members, borrowing systems and more.
          </p>

          <div className="flex justify-center gap-6 mt-12 flex-wrap">

            <button className="bg-blue-600 px-10 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition hover:scale-105">
              Get Started
            </button>

            <button className="border border-white/20 backdrop-blur-lg bg-white/10 px-10 py-4 rounded-full text-lg hover:bg-white/20 transition hover:scale-105">
              Explore Books
            </button>

          </div>

        </motion.div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="min-h-screen flex items-center justify-center px-10 py-24 bg-zinc-950"
      >

        <motion.div
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="grid md:grid-cols-2 gap-20 items-center max-w-7xl"
        >

          {/* Left Side */}
          <div>

            <h2 className="text-blue-500 text-2xl font-bold">
              Meet
            </h2>

            <h1 className="text-7xl font-extrabold mt-3 text-white">
              Libraryon
            </h1>

            <p className="text-zinc-400 text-xl mt-10 leading-10">
              Our Online Library - your best way to read as many
              books as you want, anywhere, anytime.
            </p>

          </div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >

            <p className="text-4xl leading-[70px] text-zinc-300 italic">
              “The reading of all good books is like conversation
              with the finest people of the past centuries.”
            </p>

            <p className="mt-10 text-xl font-bold text-blue-400">
              — Descartes
            </p>

          </motion.div>

        </motion.div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-28 px-8 bg-black"
      >

        <motion.h2
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold text-center mb-20"
        >
          Featured Books
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">

          {[
            {
              title: "Atomic Habits",
              image:
                "https://images.unsplash.com/photo-1512820790803-83ca734da794",
            },

            {
              title: "Rich Dad Poor Dad",
              image:
                "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
            },

            {
              title: "Psychology of Money",
              image:
                "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
            },
          ].map((book, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 120 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
              }}
              className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-3xl overflow-hidden hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-500/20 transition duration-500"
            >

              <img
                src={book.image}
                alt={book.title}
                className="h-80 w-full object-cover"
              />

              <div className="p-6">

                <h3 className="text-3xl font-bold">
                  {book.title}
                </h3>

                <p className="text-zinc-400 mt-3 text-lg">
                  Premium digital library collection.
                </p>

              </div>

            </motion.div>
          ))}

        </div>
      </section>

    </div>
  );
}