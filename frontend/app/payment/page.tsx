"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function PaymentPage() {
  const [order, setOrder] = useState<any>(null);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Récupérer la commande stockée dans localStorage
    const storedOrder = localStorage.getItem("orderData");
    if (storedOrder) {
      setOrder(JSON.parse(storedOrder));
    } else {
      toast.error("🚨 No order found!");
      router.push("/checkout");
    }
  }, [router]);

  const handlePayment = async () => {
    if (!cardName || !cardNumber || !expiryDate || !cvc) {
      toast.error("❌ Please complete all card details!");
      return;
    }

    setLoading(true);
    toast.loading("Processing payment... 💳");

    setTimeout(() => {
      toast.dismiss();
      toast.success("🎉 Payment successful!");

      // Nettoyer la commande après paiement
      localStorage.removeItem("orderData");

      setTimeout(() => {
        router.push("/");
      }, 2000);
    }, 3000);
  };

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-600 text-white text-2xl font-bold">
        Loading order details...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-600 p-6">
      <div className="max-w-2xl w-full bg-white shadow-xl rounded-lg p-8 border-4 border-black text-center">
        <h1 className="text-4xl font-extrabold text-red-600 mb-6">
          🎮 Nintendo Payment
        </h1>

        <div className="border-4 border-black p-6 rounded-md bg-gray-100 shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            🛍️ Order Summary
          </h2>
          <ul className="space-y-2 text-lg font-semibold">
            {order.products.map((item: any) => (
              <li
                key={item.product}
                className="flex justify-between text-black"
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span className="text-red-600">
                  {item.price * item.quantity}€
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-3xl font-bold text-gray-900">
            Total: <span className="text-red-600">{order.totalPrice}€</span>
          </p>
        </div>

        {/* FORMULAIRE DE CARTE BANCAIRE */}
        <div className="mt-6 p-6 bg-gray-50 border-4 border-black rounded-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            💳 Payment Details
          </h2>

          <input
            type="text"
            placeholder="Cardholder Name"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            className="border p-3 w-full rounded-md focus:ring-2 focus:ring-red-500 outline-none transition text-lg mb-3"
          />

          <input
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            maxLength={16}
            className="border p-3 w-full rounded-md focus:ring-2 focus:ring-red-500 outline-none transition text-lg mb-3"
          />

          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              maxLength={5}
              className="border p-3 w-1/2 rounded-md focus:ring-2 focus:ring-red-500 outline-none transition text-lg mb-3"
            />
            <input
              type="text"
              placeholder="CVC"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              maxLength={3}
              className="border p-3 w-1/2 rounded-md focus:ring-2 focus:ring-red-500 outline-none transition text-lg mb-3"
            />
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            className={`mt-4 w-full py-4 text-white text-xl font-bold rounded-full transition transform active:scale-90
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-700 shadow-lg"
              }
            `}
          >
            {loading ? "Processing... 🎮" : "Confirm Payment 💳"}
          </button>
        </div>
      </div>
    </div>
  );
}
