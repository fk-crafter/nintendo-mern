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

  if (loading) return <p className="text-center">Loading dashboard...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 relative">
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white font-bold shadow-md transition-all transform hover:scale-110 active:scale-90 border-4 border-gray-900 hover:bg-red-700 hover:border-black"
      >
        <ArrowLeft className="w-6 h-6" />
        <span className="text-lg tracking-wider">Back to home</span>
      </Link>

      <div className="mt-16"></div>

      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Admin Dashboard
      </h1>

      <nav className="flex space-x-2 border-b pb-4 mb-12 text-gray-700">
        {[
          { label: "Summary", key: "summary" },
          { label: "Products", key: "products" },
          { label: "Orders", key: "orders" },
          { label: "Users", key: "users" },
        ].map(({ label, key }) => (
          <button
            key={key}
            className={`px-6 py-2 text-sm font-semibold transition-all rounded-t-md border-b-4 ${
              activeSection === key
                ? "bg-white text-black border-black shadow-md"
                : "bg-gray-100 text-gray-600 border-transparent hover:bg-gray-200"
            }`}
            onClick={() => handleSectionChange(key)}
          >
            {label}
          </button>
        ))}
      </nav>

      {activeSection === "summary" && <StatsAdmin />}
      {activeSection === "products" && <ProductsAdmin />}
      {activeSection === "orders" && <OrdersAdmin />}
      {activeSection === "users" && <UsersAdmin />}
    </div>
  );
}
