"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function CheckoutPage() {
  const { cart } = useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !address || !email) {
      setError("All fields are required !");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Stocker les infos de la commande dans localStorage
      const orderData = {
        customer: { name, address, email },
        products: cart.map((item) => ({
          product: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        totalPrice: cart.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
      };

      localStorage.setItem("orderData", JSON.stringify(orderData));

      toast.success("✅ Order details saved! Redirecting to payment...", {
        duration: 3000,
      });

      setTimeout(() => router.push("/payment"), 2000);
    } catch (err) {
      console.error("❌ Error saving order:", err);
      setError("Error processing your order.");
      toast.error("❌ Error processing your order.");
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
                {loading
                  ? "Redirecting to Payment..."
                  : "Proceed to Payment 💳"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
