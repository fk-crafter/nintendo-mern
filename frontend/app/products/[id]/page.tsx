"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5001/api/products/${id}`);
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        const data = await res.json();
        setProduct(data);
      } catch {
        console.error("Product not found or server error.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
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
  };

  if (loading)
    return (
      <div className="max-w-3xl mx-auto p-6 animate-pulse">
        <div className="h-6 w-48 bg-gray-300 rounded mb-4"></div>
        <div className="h-80 bg-gray-300 rounded mb-4"></div>
        <div className="h-4 w-64 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-40 bg-gray-300 rounded mb-2"></div>
        <div className="h-10 w-32 bg-gray-300 rounded mt-4"></div>
      </div>
    );

  if (!product)
    return <p className="text-center text-red-500">Product not found.</p>;

  return (
    <motion.div
      className="max-w-3xl mx-auto p-6 relative bg-white shadow-lg rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Bouton retour */}
      <Link
        href="/"
        className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition"
      >
        ← Back to Shop
      </Link>

      {/* Détails du produit */}
      <h1 className="text-3xl font-extrabold mt-8 text-gray-900">
        {product.name}
      </h1>

      {product.image && (
        <Image
          src={product.image}
          alt={product.name}
          width={600}
          height={400}
          className="rounded-lg my-4 object-cover w-full"
        />
      )}

      <p className="text-lg text-gray-700">{product.description}</p>
      <p className="text-2xl font-bold text-red-600 mt-4">{product.price}€</p>

      {/* Bouton Ajouter au panier */}
      <button
        className="mt-4 w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition font-bold text-lg"
        onClick={handleAddToCart}
      >
        Add to Cart 🛒
      </button>
    </motion.div>
  );
}
