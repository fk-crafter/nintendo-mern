"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-100 to-gray-300 p-6 relative">
      <Link
        href="/"
        className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-800 shadow-md hover:bg-gray-100 transition"
      >
        <ArrowLeft className="w-5 h-5 text-gray-700" />
        <span className="text-sm font-semibold">Home</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-6 mt-16 border border-gray-300"
      >
        <h1 className="text-3xl font-extrabold text-red-600 mb-6 text-center flex items-center justify-center gap-2">
          My Cart <ShoppingCart size={28} />
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Your cart is empty 🛒</p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 bg-red-600 text-white px-5 py-3 rounded-lg shadow-md hover:bg-red-700 transition font-bold"
            >
              Explore Products <Search size={20} />
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {cart.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between border border-gray-300 p-4 rounded-lg bg-gray-50 hover:shadow-lg transition"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={70}
                      height={70}
                      className="rounded-md border border-gray-400"
                    />
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">
                        {product.name}
                      </h2>
                      <p className="text-gray-700 text-sm">
                        {product.price}€ x{" "}
                        <span className="text-red-600 font-bold">
                          {product.quantity}
                        </span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition"
                  >
                    <X size={20} />
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 border-t pt-6">
              <p className="text-2xl font-bold text-gray-900 text-right">
                Total:{" "}
                <span className="text-red-600">{total.toFixed(2)} €</span>
              </p>

              <div className="mt-6 flex flex-col sm:flex-row justify-between gap-4">
                <button
                  onClick={clearCart}
                  className="flex items-center justify-center gap-2 bg-gray-700 text-white px-5 py-3 rounded-lg shadow-md hover:bg-gray-900 transition"
                >
                  <Trash2 size={20} /> Clear Cart
                </button>
                <Link
                  href="/checkout"
                  className="flex items-center justify-center gap-2 bg-green-600 text-white px-5 py-3 rounded-lg shadow-md hover:bg-green-700 transition font-bold"
                >
                  Proceed to Checkout <CreditCard size={20} />
                </Link>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
