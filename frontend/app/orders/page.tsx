"use client";

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { ShoppingCart, Package } from "lucide-react";
import { OrderCard } from "@/components/OrderCard";

interface Order {
  id: string;
  products: { product: { name: string; price: number }; quantity: number }[];
  totalPrice: number;
  createdAt: string;
  promoApplied: boolean;
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
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
        console.error("Error fetching orders:", err);
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
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center px-4 py-10">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl p-6 md:p-8 border border-gray-300">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white font-semibold shadow-md hover:bg-red-700 transition w-fit mb-6"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Home
        </Link>

        <h1 className="text-2xl md:text-3xl font-extrabold text-center text-gray-800 mb-8 flex items-center justify-center gap-3">
          <Package size={24} className="text-red-600" />
          Your Orders
        </h1>

        {orders.length === 0 ? (
          <div className="text-center text-gray-600 text-lg flex flex-col items-center gap-2">
            <ShoppingCart size={28} />
            No orders placed yet.
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
