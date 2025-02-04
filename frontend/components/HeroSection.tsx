"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Image1 from "@/public/assets/hero1.png";
import Image2 from "@/public/assets/hero2.png";
import Image3 from "@/public/assets/hero3.png";

const images = [Image1, Image2, Image3];

export default function HeroSection() {
  return (
    <section className="bg-white py-10">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
          {images.map((src, index) => (
            <motion.div
              key={index}
              className="relative w-[16rem] h-[16rem] rounded-xl overflow-hidden shadow-lg flex justify-center items-center bg-red-700"
              initial={{
                scale: 1,
                rotate: 0,
                boxShadow: "0px 0px 0px rgba(255, 0, 0, 0.0)",
              }}
              whileHover={{
                scale: 1.15,
                rotate: [-3, 3, -3, 2, 0],
                boxShadow: "0px 0px 40px rgba(255, 0, 0, 0.6)",
                transition: { type: "spring", stiffness: 200, damping: 10 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Image de fond */}
              <Image
                src={src}
                alt={`Image ${index + 1}`}
                fill
                className="object-cover pointer-events-none"
              />

              {/* Effet de lumière dynamique */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />

              {/* Effet de glow pulsé */}
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
