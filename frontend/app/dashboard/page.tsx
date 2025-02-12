"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

import ProductsAdmin from "@/components/dashboard/ProductsAdmin";
import OrdersAdmin from "@/components/dashboard/OrdersAdmin";

export default function DashboardPage() {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("products");

  useEffect(() => {
    if (!auth?.user || auth?.user.role !== "admin") {
      router.push("/");
    }
  }, [auth, router]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard Admin</h1>

      <div className="flex space-x-4 text-black mb-6">
        <button
          className={`px-4 py-2 rounded ${
            activeSection === "products"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setActiveSection("products")}
        >
          Produits
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeSection === "orders"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setActiveSection("orders")}
        >
          Commandes
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeSection === "users" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveSection("users")}
        >
          Utilisateurs
        </button>
      </div>

      {activeSection === "products" && <ProductsAdmin />}
      {activeSection === "orders" && <OrdersAdmin />}
      {activeSection === "users" && <p>👥 Gestion des Utilisateurs</p>}
    </div>
  );
}
