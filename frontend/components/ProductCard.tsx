"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const [showNotification, setShowNotification] = useState(false);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
    setShowNotification(true);

    // Hide notification after 3 seconds
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white relative">
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={200}
        className="w-full h-40 object-cover rounded-md"
      />
      <h2 className="text-lg font-semibold mt-2 text-black">{product.name}</h2>
      <p className="text-gray-500 text-sm">{product.description}</p>
      <p className="text-xl font-bold mt-2 text-blue-500">{product.price}€</p>

      <button
        className="mt-3 w-full bg-black text-white py-2 rounded-md  transition"
        onClick={handleAddToCart}
      >
        Add to cart
      </button>

      <Link
        href={`/products/${product._id}`}
        className="mt-2 block text-center bg-black text-white py-2 rounded-md  transition"
      >
        Description
      </Link>

      {/* 🔥 Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-2 right-2 bg-black text-white px-4 py-2 rounded-md shadow-lg text-sm"
          >
            ✅ Product added to cart!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductCard;
