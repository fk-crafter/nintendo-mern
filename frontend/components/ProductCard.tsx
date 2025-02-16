"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaShoppingCart, FaEye } from "react-icons/fa";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart({ ...product, quantity: 1 });

    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <motion.div
      className="border border-gray-300 rounded-lg p-4 shadow-lg bg-white relative hover:shadow-2xl transition duration-300"
      whileHover={{ scale: 1.03 }}
    >
      <div className="relative">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={200}
          className="w-full h-40 object-cover rounded-md"
        />
        <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-md text-xs font-bold">
          {product.price}€
        </span>
      </div>

      <h2 className="text-lg font-bold mt-2 text-black">{product.name}</h2>
      <p className="text-gray-500 text-sm">{product.description}</p>

      <div className="flex mt-4 gap-2">
        <button
          className={`flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-md transition ${
            isAdding ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"
          }`}
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          <FaShoppingCart /> {isAdding ? "Adding..." : "Add to Cart"}
        </button>

        <Link
          href={`/products/${product._id}`}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-800 text-white py-2 rounded-md transition hover:bg-gray-900"
        >
          <FaEye /> View
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
