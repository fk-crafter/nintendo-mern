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

      console.log("🔹 Données envoyées :", orderData);

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
      toast.success("🎉 Order passed successfully !", { duration: 4000 });
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
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">checkout</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="border p-4 rounded-md text-black bg-gray-100">
            {cart.map((item) => (
              <li key={item._id} className="flex justify-between border-b py-2">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span className="font-bold">{item.price * item.quantity}€</span>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-xl font-bold">
            Total:{" "}
            {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}€
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-4 space-y-3 bg-white text-black p-6 rounded-lg shadow-md"
          >
            {error && <p className="text-red-500">{error}</p>}

            <input
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full rounded-md"
            />
            <input
              type="text"
              placeholder="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border p-2 w-full rounded-md"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 w-full rounded-md"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              {loading ? "Order in progress..." : "checkout"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
