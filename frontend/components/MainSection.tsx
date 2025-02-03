"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import useStore from "@/store/store";
import { motion } from "framer-motion";

import zelda1 from "@/public/assets/zelda1.png";
import zelda2 from "@/public/assets/zelda2.png";
import zelda3 from "@/public/assets/zelda3.png";
import zelda4 from "@/public/assets/zelda4.png";

import mario1 from "@/public/assets/mario1.png";
import mario2 from "@/public/assets/mario2.png";
import mario3 from "@/public/assets/mario3.png";
import mario4 from "@/public/assets/mario4.png";

import pokemon1 from "@/public/assets/poke1.png";
import pokemon2 from "@/public/assets/poke2.png";
import pokemon3 from "@/public/assets/poke3.png";
import pokemon4 from "@/public/assets/poke4.png";

const products = {
  zelda: [
    { id: "zelda-1", name: "Master Sword", price: 159.99, image: zelda1 },
    { id: "zelda-2", name: "Rubis", price: 59.99, image: zelda2 },
    { id: "zelda-3", name: "Shield", price: 89.99, image: zelda3 },
    { id: "zelda-4", name: "Ocarina", price: 29.99, image: zelda4 },
  ],
  mario: [
    { id: "mario-1", name: "Mario coin", price: 49.99, image: mario1 },
    { id: "mario-2", name: "Random cup", price: 59.99, image: mario2 },
    { id: "mario-3", name: "Star plush", price: 39.99, image: mario3 },
    { id: "mario-4", name: "Mario cosplay", price: 29.99, image: mario4 },
  ],
  pokemon: [
    { id: "pokemon-1", name: "Pokeball", price: 49.99, image: pokemon1 },
    { id: "pokemon-2", name: "Pokedex", price: 59.99, image: pokemon2 },
    {
      id: "pokemon-3",
      name: "Pokemon stadium",
      price: 249.99,
      image: pokemon3,
    },
    { id: "pokemon-4", name: "Mewtwo piece", price: 299.99, image: pokemon4 },
  ],
};

type Product = {
  id: string;
  name: string;
  price: number;
  image: any;
};

export default function MainSection() {
  const addToCart = useStore((state) => state.addToCart);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        setIsModalOpen(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-screen-xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">
          Main Collection
        </h2>

        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 z-50 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg"
          >
            Added to cart!
          </motion.div>
        )}

        {Object.entries(products).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-2xl font-semibold mt-12 text-center capitalize">
              {category}
            </h3>
            <div className="w-16 h-1 bg-red-700 mb-6 mx-auto"></div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2 },
                },
              }}
            >
              {items.map((product) => (
                <motion.div
                  key={product.id}
                  className="relative w-full h-80 border-2 border-gray-200 rounded-xl overflow-hidden shadow-lg flex flex-col justify-between bg-white group p-4 transition-all duration-500 ease-in-out"
                  whileHover={{
                    boxShadow: "0px 15px 30px rgba(255, 0, 0, 0.2)",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.4,
                    ease: "linear",
                  }}
                >
                  <div className="flex justify-center items-center h-2/3">
                    <Image
                      src={product.image}
                      alt={product.name}
                      className="max-h-40 object-contain"
                    />
                  </div>

                  <div className="w-full flex justify-between items-center mt-4">
                    <span className="text-lg font-semibold text-gray-900">
                      {product.name}
                    </span>
                    <span className="text-white text-sm bg-red-600 px-3 py-1 rounded-lg">
                      €{product.price.toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-2 w-10 h-10 flex items-center justify-center bg-white text-red-600 p-2 rounded-full border border-red-600 transition-all duration-300 hover:bg-red-600 hover:text-white"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
