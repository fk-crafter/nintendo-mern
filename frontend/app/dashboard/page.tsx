"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import ProductsAdmin from "@/components/dashboard/ProductsAdmin";
import OrdersAdmin from "@/components/dashboard/OrdersAdmin";
import UsersAdmin from "@/components/dashboard/UsersAdmin";
import StatsAdmin from "@/components/dashboard/StatsAdmin";

export default function DashboardPage() {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSection = searchParams.get("section") || "products";
  const [activeSection, setActiveSection] = useState(initialSection);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth?.user === undefined) return;

    if (!auth?.user || auth?.user.role !== "admin") {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [auth, router]);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    router.push(`/dashboard?section=${section}`, { scroll: false });
  };

  if (loading)
    return <p className="text-center">Chargement du tableau de bord...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Link
        href="/"
        className="inline-block mb-4 text-blue-500 hover:underline text-sm"
      >
        ← Retour à l&apos;accueil
      </Link>

      <h1 className="text-3xl font-bold mb-4">Dashboard Admin</h1>

      <StatsAdmin />

      <div className="flex space-x-4 text-black mb-6">
        <button
          className={`px-4 py-2 rounded ${
            activeSection === "products"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => handleSectionChange("products")}
        >
          Produits
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeSection === "orders"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => handleSectionChange("orders")}
        >
          Commandes
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeSection === "users" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleSectionChange("users")}
        >
          Utilisateurs
        </button>
      </div>

      {activeSection === "products" && <ProductsAdmin />}
      {activeSection === "orders" && <OrdersAdmin />}
      {activeSection === "users" && <UsersAdmin />}
    </div>
  );
}
