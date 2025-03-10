"use client";

import { useEffect, useState } from "react";
import ConfirmModal from "@/components/ConfirmModal";
import { ShoppingCart, Calendar, Package, Trash2 } from "lucide-react";

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
      const res = await fetch(
        "https://nintendo-backend-u0dz.onrender.com/api/orders",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
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
        `https://nintendo-backend-u0dz.onrender.com/api/orders/${selectedOrder}`,
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
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-2xl lg:text-3xl font-extrabold text-red-800 mb-6 text-center drop-shadow-md flex items-center justify-center gap-2">
        <ShoppingCart className="w-7 h-7 lg:w-8 lg:h-8" />
        Order Management
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
        <div className="flex flex-col gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all flex flex-col md:flex-row items-center md:items-start gap-6 w-full"
            >
              <div className="flex flex-col w-full md:w-1/4">
                <p className="text-lg font-bold text-black flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-gray-700" />
                  {order.user ? `${order.user.name}` : "Unknown user"}
                </p>
                <p className="text-sm text-gray-500">{order.user?.email}</p>
                <p className="text-gray-600 text-sm mt-1 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex-1 border-l pl-6 space-y-2">
                {order.products.map(({ product, quantity }, index) => (
                  <div
                    key={product?.name || index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-800 text-base flex items-center gap-2">
                      <Package className="w-4 h-4 text-gray-600" />
                      {product?.name
                        ? `${product.name} x ${quantity}`
                        : "Unknown Product"}
                    </span>
                    <span className="font-bold text-gray-900">
                      {product?.price ? product.price * quantity : "N/A"}€
                    </span>
                  </div>
                ))}
              </div>

              <div className="w-full md:w-1/4 flex flex-col items-center md:items-end">
                <p className="text-xl font-extrabold text-red-600 flex items-center gap-2">
                  Total: {order.totalPrice}€
                </p>
                <p className="mt-2 text-sm">
                  Status:{" "}
                  <span
                    className={`uppercase px-3 py-1 rounded-full text-white text-xs font-bold ${
                      order.status === "pending"
                        ? "bg-yellow-500"
                        : order.status === "completed"
                        ? "bg-green-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>

                <button
                  onClick={() => {
                    setSelectedOrder(order._id);
                    setShowModal(true);
                  }}
                  className="mt-4 bg-red-500 text-white text-lg px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition-all flex items-center gap-2"
                >
                  <Trash2 className="w-5 h-5" />
                  Delete
                </button>
              </div>
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
