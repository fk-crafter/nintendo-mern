"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Image1 from "@/public/assets/hero1.png";
import Image2 from "@/public/assets/hero2.png";
import Image3 from "@/public/assets/hero3.png";

const images = [
  { src: Image1, text: "Choose" },
  { src: Image2, text: "Your" },
  { src: Image3, text: "Character" },
];

export default function HeroSection() {
  return (
    <section className="bg-white py-10">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="relative w-[16rem] h-[16rem] rounded-xl overflow-hidden shadow-lg flex justify-center items-center bg-red-700"
              initial={{ scale: 1, rotate: 0 }}
              whileHover={{
                scale: 1.15,
                rotate: [-3, 3, -3, 2, 0], // Effet rebond sur la rotation
                transition: { type: "spring", stiffness: 200, damping: 10 }, // Rendu rebondissant
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Image de fond */}
              <Image
                src={image.src}
                alt={`Image ${index + 1}`}
                fill
                className="object-cover"
              />

              {/* Effet de lumière dynamique */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />

              {/* Effet de glow pulsé */}
              <motion.div
                className="absolute inset-0 rounded-xl"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.6, 0], // Apparition progressive du glow
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                style={{
                  boxShadow: "0px 0px 40px rgba(255, 0, 0, 0.6)", // Glow rouge pulsé
                }}
              />

              {/* Texte animé */}
              <motion.div
                className="absolute left-1/2 bottom-5 transform -translate-x-1/2"
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                whileHover={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <span className="text-white text-2xl font-bold drop-shadow-lg tracking-wide">
                  {image.text}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
