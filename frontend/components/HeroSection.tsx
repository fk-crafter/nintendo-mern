"use client";

import { motion } from "motion/react";

import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Tooltip from "@mui/material/Tooltip";
import Rating from "@mui/material/Rating";

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
        transition={{ duration: 0.6, ease: "easeOut" }}
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
    </section>
  );
}
