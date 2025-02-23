"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");

  const [focus, setFocus] = useState<
    "name" | "number" | "expiry" | "cvc" | undefined
  >(undefined);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !name ||
      !address ||
      !email ||
      !cardNumber ||
      !cardName ||
      !cardExpiry ||
      !cardCVC
    ) {
      setError("All fields and payment details are required!");
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
        cardDetails: { cardNumber, cardName, cardExpiry, cardCVC },
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
    <div className="min-h-screen flex items-center justify-center  p-6">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6 border-4 border-gray-900 relative">
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white font-bold shadow-md transition-all transform hover:scale-110 active:scale-90 border-4 border-gray-900 hover:bg-red-700 hover:border-black"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="text-lg tracking-wider">Back</span>
        </button>

        <h1 className="text-3xl font-extrabold text-red-600 mb-6 text-center font-mono tracking-wider">
          Checkout
        </h1>

        {cart.length === 0 ? (
          <p className="text-gray-700 text-center text-lg">
            Your cart is empty. 🛒
          </p>
        ) : (
          <>
            <div className="border-4 border-gray-900 rounded-lg bg-white p-4 mb-6">
              <h2 className="text-xl font-bold text-red-600 mb-3 font-mono tracking-wider">
                Order Summary 🛍️
              </h2>
              <ul className="divide-y divide-gray-900">
                {cart.map((item) => (
                  <li key={item._id} className="flex justify-between py-3">
                    <span className="text-gray-800 font-mono">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-bold text-red-600 font-mono">
                      {item.price * item.quantity}€
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-2xl font-bold text-gray-900 text-right font-mono">
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
              className="space-y-4 bg-white p-6 rounded-lg shadow-md border-4 border-gray-900"
            >
              {error && (
                <p className="text-red-600 text-center font-bold">{error}</p>
              )}

              <div className="mb-6">
                <h2 className="text-xl font-bold text-red-600 mb-3 font-mono tracking-wider">
                  Shipping Information
                </h2>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-4 border-gray-900 p-3 w-full rounded-md focus:outline-none focus:border-red-700"
                />
                <input
                  type="text"
                  placeholder="Delivery Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border-4 border-gray-900 p-3 w-full rounded-md mt-4 focus:outline-none focus:border-red-700"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-4 border-gray-900 p-3 w-full rounded-md mt-4 focus:outline-none focus:border-red-700"
                />
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-bold text-red-600 mb-3 font-mono tracking-wider">
                  Payment Information
                </h2>
                <Cards
                  number={cardNumber}
                  name={cardName}
                  expiry={cardExpiry}
                  cvc={cardCVC}
                  focused={focus}
                />
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  onFocus={() => setFocus("name")}
                  className="border-4 border-gray-900 p-3 mt-6 w-full rounded-md focus:outline-none focus:border-red-700"
                />
                <input
                  type="text"
                  placeholder="Card Number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  onFocus={() => setFocus("number")}
                  className="border-4 border-gray-900 p-3 w-full rounded-md mt-4 focus:outline-none focus:border-red-700"
                />
                <input
                  type="text"
                  placeholder="Expiry Date (MM/YY)"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  onFocus={() => setFocus("expiry")}
                  className="border-4 border-gray-900 p-3 w-full rounded-md mt-4 focus:outline-none focus:border-red-700"
                />
                <input
                  type="text"
                  placeholder="CVC"
                  value={cardCVC}
                  onChange={(e) => setCardCVC(e.target.value)}
                  onFocus={() => setFocus("cvc")}
                  className="border-4 border-gray-900 p-3 w-full rounded-md mt-4 focus:outline-none focus:border-red-700"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 text-white py-3 rounded-full font-bold shadow-md transition-all transform hover:scale-110 active:scale-90 border-4 border-gray-900 hover:bg-red-700 hover:border-black"
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
