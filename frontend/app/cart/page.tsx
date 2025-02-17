"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <h1 className="text-3xl font-extrabold text-red-600 mb-6 text-center">
          My Cart 🛒
        </h1>

        {cart.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-500 text-lg">Your cart is empty.</p>
            <Link
              href="/products"
              className="mt-4 inline-block bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition font-bold"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center border p-4 rounded-md bg-gray-50 shadow-sm"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={80}
                    height={80}
                    className="rounded-md"
                  />
                  <div className="ml-4 flex-1">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {product.name}
                    </h2>
                    <p className="text-gray-600">
                      {product.price}€ x {product.quantity}
                    </p>
                  </div>
                  <button
                    className=" text-white px-3 py-1 rounded-full transition flex items-center justify-center w-8 h-8"
                    onClick={() => removeFromCart(product._id)}
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 border-t">
              <p className="text-xl font-bold text-gray-900 text-right">
                Total:{" "}
                <span className="text-red-600">
                  {cart.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  )}
                  €
                </span>
              </p>

              <div className="mt-6 flex justify-between">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                  onClick={clearCart}
                >
                  Clear Cart 🗑️
                </button>
                <Link
                  href="/checkout"
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition font-bold"
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
