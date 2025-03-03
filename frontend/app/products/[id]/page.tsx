"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { toast } from "react-hot-toast";

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
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${id}`
        );
        if (!res.ok) throw new Error("Product not found");
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

    toast.success(`🛒 Product added to cart!`);
  };

  if (loading)
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="h-6 w-48 bg-gray-300 rounded mb-3 animate-pulse"></div>
        <div className="h-64 bg-gray-300 rounded mb-3 animate-pulse"></div>
        <div className="h-4 w-64 bg-gray-300 rounded mb-2 animate-pulse"></div>
        <div className="h-4 w-40 bg-gray-300 rounded mb-2 animate-pulse"></div>
        <div className="h-10 w-32 bg-gray-300 rounded mt-4 animate-pulse"></div>
      </div>
    );

  if (!product)
    return <p className="text-center text-red-500">Product not found.</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <Link
          href="/"
          className="text-gray-500 hover:text-gray-700 text-sm mb-4 inline-block"
        >
          ← Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {product.image && (
            <div className="flex justify-center">
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={400}
                className="rounded-md object-cover shadow-md"
              />
            </div>
          )}

          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-semibold text-gray-900">
              {product.name}
            </h1>
            <p className="text-gray-600 text-sm mt-2">{product.description}</p>
            <p className="text-2xl font-bold text-red-600 mt-2">
              {product.price}€
            </p>

            <button
              className="mt-6 w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition font-bold text-lg shadow-md"
              onClick={handleAddToCart}
            >
              🛒 Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
