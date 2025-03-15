"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

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
      toast.success("🎉 Order placed successfully!", { duration: 3000 });
      setTimeout(() => router.push("/confirmation"), 1500);
    } catch (err) {
      console.error("❌ Error during the order :", err);
      setError("Error during the order processing.");
      toast.error("❌ Error during the order processing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:flex-row md:p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4 border-4 border-gray-900 relative md:max-w-2xl lg:max-w-3xl">
        <button
          onClick={() => router.back()}
          className="absolute top-2 left-2 flex items-center justify-center gap-1 px-2 py-1 rounded-full text-xs bg-red-600 text-white font-bold shadow-md transition-all transform hover:scale-105 active:scale-90 border-2 border-gray-900 hover:bg-red-700 hover:border-black md:top-4 md:left-4 md:px-4 md:py-2 md:text-lg md:border-4 md:hover:scale-110"
        >
          <ArrowLeft className="w-4 h-4 md:w-6 md:h-6" />
          <span className="text-sm tracking-wide md:text-lg">Back</span>
        </button>

        <h1 className="text-2xl font-extrabold text-red-600 mb-4 text-center font-mono tracking-wider md:text-3xl md:mb-6">
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
              className="space-y-4 bg-white p-4 rounded-lg shadow-md border-4 border-gray-900 md:p-6"
            >
              {error && (
                <p className="text-red-600 text-center font-bold">{error}</p>
              )}

              <div className="mb-6">
                <h3 className="text-center text-gray-700 font-semibold mb-2 text-md md:text-lg">
                  Express Checkout
                </h3>

                <div className="flex justify-center flex-wrap space-x-3 mb-4">
                  <Image
                    src="/img/shop-pay.png"
                    alt="Shop Pay"
                    className="max-w-[200px] object-contain"
                    width={200}
                    height={50}
                  />
                  <Image
                    src="/img/google.png"
                    alt="Google Pay"
                    className="max-w-[200px] object-contain"
                    width={200}
                    height={50}
                  />
                  <Image
                    src="/img/apple.png"
                    alt="Apple Pay"
                    className="max-w-[200px] object-contain"
                    width={200}
                    height={50}
                  />
                  <Image
                    src="/img/paypal.png"
                    alt="PayPal"
                    className="max-w-[200px] mt-2 object-contain"
                    width={200}
                    height={50}
                  />
                </div>

                <h2 className="text-lg font-semibold text-gray-900 mb-3 md:text-xl">
                  Shipping Information
                </h2>

                <fieldset className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex flex-col">
                    <label
                      htmlFor="name"
                      className="text-gray-700 text-sm font-medium"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 text-sm"
                      aria-invalid={error && !name ? "true" : "false"}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="email"
                      className="text-gray-700 text-sm font-medium"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 text-sm"
                      aria-invalid={error && !email ? "true" : "false"}
                    />
                  </div>

                  <div className="flex flex-col col-span-2">
                    <label
                      htmlFor="address"
                      className="text-gray-700 text-sm font-medium"
                    >
                      Delivery Address
                    </label>
                    <input
                      id="address"
                      type="text"
                      placeholder="123 Main Street, NY"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 text-sm"
                      aria-invalid={error && !address ? "true" : "false"}
                    />
                  </div>
                </fieldset>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3 md:text-xl">
                  Payment Information
                </h2>

                <fieldset className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="col-span-2 flex justify-center">
                    <Cards
                      number={cardNumber}
                      name={cardName}
                      expiry={cardExpiry}
                      cvc={cardCVC}
                      focused={focus}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="cardName"
                      className="text-gray-700 text-sm font-medium"
                    >
                      Cardholder Name
                    </label>
                    <input
                      id="cardName"
                      type="text"
                      placeholder="John Doe"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      onFocus={() => setFocus("name")}
                      className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 text-sm"
                      aria-invalid={error && !cardName ? "true" : "false"}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="cardNumber"
                      className="text-gray-700 text-sm font-medium"
                    >
                      Card Number
                    </label>
                    <input
                      id="cardNumber"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      onFocus={() => setFocus("number")}
                      className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 text-sm"
                      aria-invalid={error && !cardNumber ? "true" : "false"}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="cardExpiry"
                      className="text-gray-700 text-sm font-medium"
                    >
                      Expiration Date
                    </label>
                    <input
                      id="cardExpiry"
                      type="text"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      onFocus={() => setFocus("expiry")}
                      className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 text-sm"
                      aria-invalid={error && !cardExpiry ? "true" : "false"}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="cardCVC"
                      className="text-gray-700 text-sm font-medium"
                    >
                      CVC
                    </label>
                    <input
                      id="cardCVC"
                      type="text"
                      placeholder="123"
                      value={cardCVC}
                      onChange={(e) => setCardCVC(e.target.value)}
                      onFocus={() => setFocus("cvc")}
                      className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 text-sm"
                      aria-invalid={error && !cardCVC ? "true" : "false"}
                    />
                  </div>
                </fieldset>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 text-white py-3 rounded-md font-semibold shadow-md transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              >
                {loading ? "Processing Order..." : "Confirm Order"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
