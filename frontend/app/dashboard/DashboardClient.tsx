"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import ProductsAdmin from "@/components/dashboard/ProductsAdmin";
import OrdersAdmin from "@/components/dashboard/OrdersAdmin";
import UsersAdmin from "@/components/dashboard/UsersAdmin";
import StatsAdmin from "@/components/dashboard/StatsAdmin";

export default function DashboardPage() {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSection = searchParams.get("section") || "summary";
  const [activeSection, setActiveSection] = useState(initialSection);

  useEffect(() => {
    if (auth?.loading) return;

    if (!auth?.user || auth?.user.role !== "admin") {
      router.push("/");
    }
  }, [auth?.user, auth?.loading, router]);

  if (auth?.loading) return <p className="text-center">Checking...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:p-6 relative">
      <Link
        href="/"
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white font-bold shadow-md transition-all transform hover:scale-105 active:scale-95 border-4 border-gray-900 hover:bg-red-700 hover:border-black
        md:absolute md:top-6 md:left-6 md:hover:scale-110"
      >
        <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
        <span className="text-sm md:text-lg tracking-wider">Back</span>
      </Link>

      <h1 className="text-2xl md:text-3xl font-bold my-6 text-gray-800 text-center">
        Admin Dashboard
      </h1>

      <nav className="flex flex-col md:flex-row md:space-x-2 border-b pb-4 mb-8 text-gray-700 space-y-2 md:space-y-0">
        {[
          { label: "Summary", key: "summary" },
          { label: "Products", key: "products" },
          { label: "Orders", key: "orders" },
          { label: "Users", key: "users" },
        ].map(({ label, key }) => (
          <button
            key={key}
            className={`px-4 py-2 text-sm font-semibold transition-all rounded-md md:rounded-t-md border-b-4 ${
              activeSection === key
                ? "bg-white text-black border-black shadow-md"
                : "bg-gray-100 text-gray-600 border-transparent hover:bg-gray-200"
            }`}
            onClick={() => setActiveSection(key)}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="w-full">
        {activeSection === "summary" && <StatsAdmin />}
        {activeSection === "products" && <ProductsAdmin />}
        {activeSection === "orders" && <OrdersAdmin />}
        {activeSection === "users" && <UsersAdmin />}
      </div>
    </div>
  );
}
