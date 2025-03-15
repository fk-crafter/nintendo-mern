"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CreditCard,
  Search,
  ShoppingCart,
  Trash2,
  X,
} from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-200 p-4 relative">
      <Link
        href="/"
        className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 rounded-full bg-red-600 text-white font-bold shadow-md transition-transform transform hover:scale-110 active:scale-90 border-2 border-gray-900 hover:bg-red-700 hover:border-black"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm">Home</span>
      </Link>

      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-5 border-4 border-black mt-12">
        <h1 className="text-2xl font-extrabold text-red-600 mb-4 text-center flex items-center justify-center gap-2">
          My Cart <ShoppingCart size={24} />
        </h1>

        {cart.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-700 text-base">Your cart is empty.</p>
            <Link
              href="/products"
              className="mt-4 inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition font-bold border-2 border-black"
            >
              Explore Products <Search size={20} />
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((product) => (
                <div
                  key={product._id}
                  className="flex flex-col sm:flex-row items-center border-2 border-black p-3 rounded-md bg-gray-50 shadow-md"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={70}
                    height={70}
                    className="rounded-md border-2 border-black"
                  />
                  <div className="sm:ml-4 flex-1 text-center sm:text-left mt-2 sm:mt-0">
                    <h2 className="text-sm font-bold text-gray-900">
                      {product.name}
                    </h2>
                    <p className="text-gray-700 text-sm">
                      {product.price}€ x{" "}
                      <span className="text-red-600 font-bold">
                        {product.quantity}
                      </span>
                    </p>
                  </div>
                  <button
                    className="mt-2 sm:mt-0 text-white px-2 py-1 rounded-full transition border-2 border-black flex items-center justify-center bg-red-600 hover:bg-red-700"
                    onClick={() => removeFromCart(product._id)}
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 border-t-2 border-black text-center">
              <p className="text-xl font-bold text-gray-900">
                Total :{" "}
                <span className="text-red-600 border-b-2 border-black">
                  {cart.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  )}
                  €
                </span>
              </p>

              <div className="mt-4 flex flex-col sm:flex-row justify-between gap-2">
                <button
                  className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-900 transition font-bold border-2 border-black flex items-center gap-2"
                  onClick={clearCart}
                >
                  Remove all items <Trash2 size={20} />
                </button>
                <Link
                  href="/checkout"
                  className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition font-bold border-2 border-black flex items-center gap-2"
                >
                  Proceed to Checkout <CreditCard size={20} />
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
