"use client";

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

interface Order {
  _id: string;
  products: { product: { name: string; price: number }; quantity: number }[];
  totalPrice: number;
  createdAt: string;
}

export default function OrdersPage() {
  const auth = useContext(AuthContext);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!auth?.user) return;

      try {
        const res = await fetch("http://localhost:5001/api/orders/my", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) throw new Error("Error during the orders recovery.");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError("Impossible to recover your orders.");
        console.error("Error during the orders recovery :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [auth?.user]);

  if (!auth?.user)
    return <p className="text-center text-red-500">Please login.</p>;

  if (loading) return <p className="text-center">Loading orders...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 border border-gray-800">
        {/* 🎮 Nintendo Style Back Button */}
        <Link
          href="/"
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white font-bold shadow-md transition-all transform hover:scale-110 active:scale-90 border-4 border-gray-900 hover:bg-red-700 hover:border-black w-fit mb-6"
        >
          <ArrowLeftIcon className="w-6 h-6" />
          <span className="text-lg tracking-wider">Back to Home</span>
        </Link>

        <h1 className="text-3xl font-extrabold text-red-600 mb-6 text-center">
          Your Orders 📦
        </h1>

        {orders.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">
            No orders placed yet. 🛒
          </p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border-4 border-black p-6 rounded-lg shadow-md bg-gray-50"
              >
                <p className="text-gray-700 font-semibold text-lg">
                  📅 Ordered on{" "}
                  <span className="text-red-600 font-bold">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </p>
                <ul className="mt-4 border-t-2 border-black pt-4 text-black space-y-2">
                  {order.products.map(({ product, quantity }) => (
                    <li
                      key={product.name}
                      className="flex justify-between text-lg font-semibold"
                    >
                      <span>
                        {product.name} x{" "}
                        <span className="text-red-600">{quantity}</span>
                      </span>
                      <span className="font-bold text-black">
                        {product.price * quantity}€
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xl font-bold text-blue-600 text-right">
                  💰 Total: {order.totalPrice}€
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
