"use client";

import Navbar from "@/components/Navbar";
import ProductList from "@/components/ProductList";
import WelcomeNotification from "@/components/WelcomeNotification";

export default function Home() {
  return (
    <div>
      <Navbar />
      <WelcomeNotification />
      <main className="p-6 mt-12">
        <h1 className="text-3xl font-bold text-center mb-6">Our Products</h1>
        <ProductList />
      </main>
    </div>
  );
}
