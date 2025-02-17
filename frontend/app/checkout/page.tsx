"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !address || !email) {
      setError("All fields are required !");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const orderData = {
        products: cart.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        totalPrice: cart.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
      };

      const res = await fetch("http://localhost:5001/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error during the order.");
      }

      clearCart();
      toast.success("🎉 Order placed successfully!", { duration: 4000 });
      setTimeout(() => router.push("/"), 3000);
    } catch (err) {
      console.error("❌ Error during the order :", err);
      setError("Error during the order processing.");
      toast.error("❌ Error during the order processing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <h1 className="text-3xl font-extrabold text-red-600 mb-6 text-center">
          Checkout
        </h1>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">
            Your cart is empty. 🛒
          </p>
        ) : (
          <>
            <div className="border p-4 rounded-md bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                Order Summary 🛍️
              </h2>
              <ul className="divide-y divide-gray-300">
                {cart.map((item) => (
                  <li key={item._id} className="flex justify-between py-3">
                    <span className="text-gray-700">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-bold text-red-600">
                      {item.price * item.quantity}€
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-2xl font-bold text-gray-900 text-right">
                Total:{" "}
                <span className="text-red-600">
                  {cart.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  )}
                  €
                </span>
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-4 text-black bg-white p-6 rounded-lg shadow-md border border-gray-300"
            >
              {error && (
                <p className="text-red-500 text-center font-semibold">
                  {error}
                </p>
              )}

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-3 w-full rounded-md focus:ring-2 focus:ring-red-500 outline-none transition text-lg"
              />
              <input
                type="text"
                placeholder="Delivery Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border p-3 w-full rounded-md focus:ring-2 focus:ring-red-500 outline-none transition text-lg"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-3 w-full rounded-md focus:ring-2 focus:ring-red-500 outline-none transition text-lg"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition font-bold text-lg shadow-md"
              >
                {loading ? "Processing Order..." : "Confirm Order 🛒"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
