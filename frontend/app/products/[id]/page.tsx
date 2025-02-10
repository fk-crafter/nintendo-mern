"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
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
        if (!res.ok) throw new Error(`Erreur HTTP: ${res.status}`);
        const data = await res.json();
        setProduct(data);
      } catch {
        console.error("Produit introuvable ou erreur serveur.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center">Chargement...</p>;
  if (!product)
    return <p className="text-center text-red-500">Produit introuvable.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{product.name}</h1>
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
        Ajouter au panier
      </button>
    </div>
  );
}
