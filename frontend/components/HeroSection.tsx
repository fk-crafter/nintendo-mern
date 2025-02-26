"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Image1 from "@/public/img/hero1.png";
import Image2 from "@/public/img/hero2.png";
import Image3 from "@/public/img/hero3.png";

import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Tooltip from "@mui/material/Tooltip";
import Rating from "@mui/material/Rating";

const images = [
  { src: Image1, title: "Zelda Collection" },
  { src: Image2, title: "Mario Collection" },
  { src: Image3, title: "Pokémon Collection" },
];

const reviews = [
  {
    name: "Remy Sharp",
    src: "/img/badge1.jpeg",
    review: "Amazing collectibles!",
  },
  {
    name: "Travis Howard",
    src: "/img/badge2.jpeg",
    review: "Great quality items!",
  },
  {
    name: "Agnes Walker",
    src: "/img/badge3.jpeg",
    review: "Super fast shipping!",
  },
  {
    name: "Trevor Henderson",
    src: "/img/badge4.jpeg",
    review: "I love the exclusives!",
  },
];

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 pt-40">
      <motion.div
        className="relative z-10 max-w-3xl px-6 flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          <div className="flex flex-col">
            <span className="text-center">Let&apos;s Starts Here</span>
            <span className="text-center text-red-600 drop-shadow-[0_0_10px_rgba(255,0,0,0.6)]">
              Explore Nintendo Exclusive Collectibles
            </span>
            <span className="text-center">Now</span>
          </div>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-2xl">
          Find exclusive{" "}
          <span className="font-semibold text-gray-900">
            Nintendo collectibles
          </span>{" "}
          and bring your favorite worlds to life.
        </p>

        <div className="mt-8 flex justify-center gap-6">
          <a
            href="#shop"
            className="px-6 py-3 bg-red-600 text-white font-semibold text-lg rounded-lg shadow-md transition-all 
                      hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/50 active:scale-95"
          >
            Start Your Journey
          </a>

          <a
            href="#about"
            className="px-6 py-3 border border-gray-900 text-gray-900 rounded-lg font-semibold text-lg transition-all 
                      hover:bg-gray-900 hover:text-white active:scale-95"
          >
            Learn More
          </a>
        </div>

        <div className="mt-10 flex justify-center">
          <AvatarGroup total={94}>
            {reviews.map((user, index) => (
              <Tooltip
                key={index}
                title={`${user.name}: "${user.review}"`}
                arrow
              >
                <Avatar alt={user.name} src={user.src} />
              </Tooltip>
            ))}
          </AvatarGroup>
        </div>
      </motion.div>

      <div className="mt-6">
        <div className="text-xl font-semibold text-gray-900">4.8/5</div>
        <Rating name="read-only" value={4.8} precision={0.1} readOnly />
      </div>

      <div className="max-w-6xl mx-auto mt-32 px-6">
        <div className="flex justify-between gap-10">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="relative w-[250px] h-[250px] rounded-xl overflow-hidden shadow-lg flex justify-center items-center bg-red-700"
              initial={{ scale: 1, rotate: 0 }}
              whileHover={{
                scale: 1.08,
                boxShadow: "0px 0px 40px rgba(255, 0, 0, 0.6)",
                transition: { type: "spring", stiffness: 200, damping: 10 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src={image.src}
                alt={image.title}
                fill
                className="object-cover pointer-events-none"
              />

              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />

              <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.6, 0] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                style={{ boxShadow: "0px 0px 40px rgba(255, 0, 0, 0.6)" }}
              />

              <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 w-full text-white text-center py-3 rounded-b-xl text-lg font-semibold">
                {image.title}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
