"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Menu,
  X,
} from "lucide-react";

import ProductsAdmin from "@/components/dashboard/ProductsAdmin";
import OrdersAdmin from "@/components/dashboard/OrdersAdmin";
import UsersAdmin from "@/components/dashboard/UsersAdmin";
import StatsAdmin from "@/components/dashboard/StatsAdmin";

const menuItems = [
  {
    label: "Summary",
    key: "summary",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  { label: "Products", key: "products", icon: <Package className="w-5 h-5" /> },
  {
    label: "Orders",
    key: "orders",
    icon: <ShoppingCart className="w-5 h-5" />,
  },
  { label: "Users", key: "users", icon: <Users className="w-5 h-5" /> },
];

export default function DashboardPage() {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSection = searchParams.get("section") || "summary";
  const [activeSection, setActiveSection] = useState(initialSection);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (auth?.loading) return;
    if (!auth?.user || auth?.user.role !== "admin") {
      router.push("/");
    }
  }, [auth?.user, auth?.loading, router]);

  if (auth?.loading) return <p className="text-center">Checking...</p>;

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isSidebarOpen && !(e.target as HTMLElement).closest("aside")) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen relative" onClick={handleOutsideClick}>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-gray-900 text-white transition-transform duration-300 ${
          isSidebarOpen ? "w-64" : "w-0 overflow-hidden"
        }`}
      >
        <div
          className={`flex flex-col items-center py-6 space-y-6 transition-all duration-300 ${
            isSidebarOpen ? "w-64" : "w-0 opacity-0"
          }`}
        >
          <button
            className="absolute top-4 right-4 text-gray-300 hover:text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
          <Image
            src="/img/nintendologo.png"
            alt="Nintendo Logo"
            width={120}
            height={40}
            className={`${isSidebarOpen ? "block" : "hidden"}`}
          />
          <div
            className={`bg-gray-700 px-4 py-2 rounded-md text-sm font-semibold ${
              isSidebarOpen ? "block" : "hidden"
            }`}
          >
            admin principal
          </div>
          <nav className="w-full px-4">
            {menuItems.map(({ label, key, icon }) => (
              <button
                key={key}
                className={`flex items-center gap-2 w-full px-4 py-3 rounded-md transition-all ${
                  activeSection === key
                    ? "bg-red-600 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                } ${isSidebarOpen ? "flex" : "hidden"}`}
                onClick={() => setActiveSection(key)}
              >
                {icon}
                {label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Sidebar Open Button */}
      {!isSidebarOpen && (
        <button
          className="fixed top-4 left-4 bg-gray-900 text-white p-2 rounded-md z-50"
          onClick={(e) => {
            e.stopPropagation();
            setIsSidebarOpen(true);
          }}
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      {/* Main Content */}
      <main
        className={`flex-1 p-6 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Fixed Back Button */}
        <Link
          href="/"
          className="fixed top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white font-bold shadow-md transition-all transform hover:scale-105 active:scale-95 border-4 border-gray-900 hover:bg-red-700 hover:border-black"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm md:text-lg tracking-wider">Back</span>
        </Link>

        <h1 className="text-2xl text-center md:text-3xl font-bold my-6 text-gray-800">
          Admin Dashboard
        </h1>

        <div className="w-full">
          {activeSection === "summary" && <StatsAdmin />}
          {activeSection === "products" && <ProductsAdmin />}
          {activeSection === "orders" && <OrdersAdmin />}
          {activeSection === "users" && <UsersAdmin />}
        </div>
      </main>
    </div>
  );
}
