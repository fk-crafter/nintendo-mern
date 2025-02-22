"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-6 relative">
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white font-bold shadow-md transition-all transform hover:scale-110 active:scale-90 border-4 border-gray-900 hover:bg-red-700 hover:border-black"
      >
        <ArrowLeft className="w-6 h-6" />
        <span className="text-lg tracking-wider">Back to Home</span>
      </Link>

      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 border-4 border-black">
        <h1 className="text-4xl font-extrabold text-red-600 mb-6 text-center">
          My Cart 🛒
        </h1>

        {cart.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-700 text-lg">No items in your cart.</p>
            <Link
              href="/products"
              className="mt-4 inline-block bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition font-bold border-4 border-black"
            >
              Browse Products 🔍
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center border-4 border-black p-4 rounded-md bg-gray-50 shadow-md"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={80}
                    height={80}
                    className="rounded-md border-2 border-black"
                  />
                  <div className="ml-4 flex-1">
                    <h2 className="text-lg font-bold text-gray-900">
                      {product.name}
                    </h2>
                    <p className="text-gray-700">
                      {product.price}€ x{" "}
                      <span className="text-red-600 font-bold">
                        {product.quantity}
                      </span>
                    </p>
                  </div>
                  <button
                    className=" text-white px-3 py-1 rounded-full transition flex items-center justify-center w-8 h-8 border-2  "
                    onClick={() => removeFromCart(product._id)}
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 border-t-4 border-black">
              <p className="text-2xl font-bold text-gray-900 text-right">
                Total:{" "}
                <span className="text-red-600 border-b-4 border-black">
                  {cart.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  )}
                  €
                </span>
              </p>

              <div className="mt-6 flex justify-between">
                <button
                  className="bg-gray-700 text-white px-6 py-3 rounded-full hover:bg-gray-900 transition font-bold border-4 border-black"
                  onClick={clearCart}
                >
                  Clear Cart 🗑️
                </button>
                <Link
                  href="/checkout"
                  className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition font-bold border-4 border-black"
                >
                  Proceed to Checkout ✅
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
