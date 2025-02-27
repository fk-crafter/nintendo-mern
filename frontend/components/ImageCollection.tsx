import Image from "next/image";
import Image1 from "@/public/img/hero1.png";
import Image2 from "@/public/img/hero2.png";
import Image3 from "@/public/img/hero3.png";
import { motion } from "framer-motion";

const images = [
  { src: Image1, title: "Zelda Collection" },
  { src: Image2, title: "Mario Collection" },
  { src: Image3, title: "Pokémon Collection" },
];

export default function ImageCollection() {
  return (
    <div className="max-w-6xl mx-auto mt-32 px-6">
      <div className="flex justify-between gap-10">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative w-[250px] h-[250px] rounded-xl overflow-hidden shadow-lg flex justify-center items-center bg-red-700"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
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
  );
}
