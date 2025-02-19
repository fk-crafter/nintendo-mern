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
    <div className="max-w-4xl mx-auto p-6">
      <Link
        href="/"
        className="flex items-center text-blue-500 hover:text-blue-700 mb-4"
      >
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        Back to home
      </Link>

      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No order passed.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border p-4 rounded-md shadow-md bg-white"
            >
              <p className="text-gray-700">
                Order passed on {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <ul className="mt-2 border-t pt-2 text-black">
                {order.products.map(({ product, quantity }) => (
                  <li key={product.name} className="flex justify-between">
                    <span>
                      {product.name} x {quantity}
                    </span>
                    <span className="font-bold">
                      {product.price * quantity}€
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 font-bold text-blue-500">
                Total: {order.totalPrice}€
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
