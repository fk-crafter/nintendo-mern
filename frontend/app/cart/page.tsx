"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Mon Panier 🛒</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Votre panier est vide.</p>
      ) : (
        <>
          {cart.map((product) => (
            <div key={product._id} className="flex items-center border-b py-4">
              <Image
                src={product.image}
                alt={product.name}
                width={80}
                height={80}
                className="rounded-md"
              />
              <div className="ml-4 flex-1">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-500">
                  {product.price}€ x {product.quantity}
                </p>
              </div>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                onClick={() => removeFromCart(product._id)}
              >
                Supprimer
              </button>
            </div>
          ))}

          <div className="mt-4 flex justify-between items-center">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              onClick={clearCart}
            >
              Vider le panier
            </button>
            <Link
              href="/checkout"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Commander
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
