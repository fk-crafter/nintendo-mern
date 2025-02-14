"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

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

  if (loading) return <p className="text-center">Loading...</p>;
  if (!product)
    return <p className="text-center text-red-500">Product not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 relative">
      <Link
        href="/"
        className="absolute top-2 left-2 bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm hover:bg-gray-300"
      >
        ← home
      </Link>

      <h1 className="text-3xl font-bold mt-8">{product.name}</h1>
      {product.image && (
        <Image
          src={product.image}
          alt={product.name}
          width={600}
          height={400}
          className="rounded-lg my-4"
        />
      )}
      <p className="text-lg text-gray-700">{product.description}</p>
      <p className="text-xl font-bold text-blue-500 mt-4">{product.price}€</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
        onClick={() => addToCart({ ...product, quantity: 1 })}
      >
        Add to cart
      </button>
    </div>
  );
}
