"use client";

import { useEffect, useState } from "react";

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
      if (!res.ok) throw new Error("Erreur lors du chargement des commandes.");

      const data = await res.json();
      setOrders(data);
    } catch (err) {
      setError("Impossible de charger les commandes.");
      console.error("Erreur lors du chargement des commandes :", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer cette commande ?")) return;

    try {
      const res = await fetch(`http://localhost:5001/api/orders/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok)
        throw new Error("Erreur lors de la suppression de la commande.");

      setOrders(orders.filter((order) => order._id !== id));
    } catch (err) {
      setError("Impossible de supprimer la commande.");
      console.error("Erreur lors de la suppression de la commande:", err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">📜 Gestion des Commandes</h2>

      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Chargement...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">Aucune commande pour l&apos;instant.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded-md bg-white">
              <p className="text-gray-700">
                <strong>Commande de :</strong>{" "}
                {order.user
                  ? `${order.user.name} (${order.user.email})`
                  : "Utilisateur inconnu"}
              </p>
              <p className="text-gray-700">
                <strong>Date :</strong>{" "}
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
                Statut: <span className="uppercase">{order.status}</span>
              </p>

              <button
                onClick={() => handleDeleteOrder(order._id)}
                className="bg-red-500 text-white px-3 py-1 rounded mt-2 hover:bg-red-600"
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
