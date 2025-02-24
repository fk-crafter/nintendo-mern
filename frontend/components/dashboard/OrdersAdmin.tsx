"use client";

import { useEffect, useState } from "react";
import ConfirmModal from "@/components/ConfirmModal";

interface Order {
  _id: string;
  user: { name?: string; email?: string } | null;
  products: { product: { name: string; price: number }; quantity: number }[];
  totalPrice: number;
  status: string;
  createdAt: string;
}

export default function OrdersAdmin() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error("Error loading orders.");

      const data = await res.json();
      setOrders(data);
    } catch (err) {
      setError("Unable to load orders.");
      console.error("Error loading orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = async () => {
    if (!selectedOrder) return;

    try {
      const res = await fetch(
        `http://localhost:5001/api/orders/${selectedOrder}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) throw new Error("Error deleting order.");

      setOrders(orders.filter((order) => order._id !== selectedOrder));
      setShowModal(false);
    } catch (err) {
      setError("Unable to delete order.");
      console.error("Error deleting order:", err);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-3xl font-extrabold text-red-500 mb-6 text-center drop-shadow-md">
        🎮 Order Management
      </h2>

      {error && <p className="text-red-600 text-center font-bold">{error}</p>}
      {loading ? (
        <p className="text-yellow-500 text-center text-lg font-bold">
          Loading...
        </p>
      ) : orders.length === 0 ? (
        <p className="text-gray-700 text-center font-bold text-lg">
          No orders available. 😢
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-5 rounded-2xl shadow-lg border-4 border-black"
            >
              <p className="text-lg font-bold text-black">
                🛒 Order from:{" "}
                {order.user
                  ? `${order.user.name} (${order.user.email})`
                  : "Unknown user"}
              </p>
              <p className="text-green-600 font-bold">
                📅 Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <ul className="mt-2 border-t-2 pt-2">
                {order.products.map(({ product, quantity }) => (
                  <li
                    key={product.name}
                    className="flex justify-between text-lg text-gray-900 font-medium"
                  >
                    <span>
                      🎁 {product.name} x {quantity}
                    </span>
                    <span className="font-bold">
                      💰 {product.price * quantity}€
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xl font-extrabold text-red-600">
                🔥 Total: {order.totalPrice}€
              </p>
              <p className="mt-2 font-bold text-gray-700">
                Status:{" "}
                <span className="uppercase bg-yellow-400 px-2 py-1 rounded-md">
                  {order.status}
                </span>
              </p>

              <button
                onClick={() => {
                  setSelectedOrder(order._id);
                  setShowModal(true);
                }}
                className="mt-3 bg-red-500 text-white text-lg px-4 py-2 rounded-full shadow-md hover:bg-red-600 transition-all"
              >
                🗑 Delete
              </button>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDeleteOrder}
        title="❗ Confirm Deletion"
        message="Are you sure you want to delete this order? This action cannot be undone."
      />
    </div>
  );
}
