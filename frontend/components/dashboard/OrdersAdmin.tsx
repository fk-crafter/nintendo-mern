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
    <div>
      <h2 className="text-xl font-bold mb-4">📜 Order Management</h2>

      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No orders available.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded-md bg-white">
              <p className="text-gray-700">
                <strong>Order from:</strong>{" "}
                {order.user
                  ? `${order.user.name} (${order.user.email})`
                  : "Unknown user"}
              </p>
              <p className="text-gray-700">
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
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
              <p className="mt-2 font-bold text-gray-700">
                Status: <span className="uppercase">{order.status}</span>
              </p>

              <button
                onClick={() => {
                  setSelectedOrder(order._id);
                  setShowModal(true);
                }}
                className="bg-red-500 text-white px-3 py-1 rounded mt-2 hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDeleteOrder}
        title="Confirm Deletion"
        message="Are you sure you want to delete this order? This action cannot be undone."
      />
    </div>
  );
}
