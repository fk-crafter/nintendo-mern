"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import ProductList from "@/components/ProductList";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      setShowWelcome(true);
      const timer = setTimeout(() => setShowWelcome(false), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div>
      <Navbar />

      {isLoggedIn && (
        <div className="relative">
          <AnimatePresence>
            {showWelcome && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-2 left-[45%] transform -translate-x-[45%] bg-green-500 text-white px-6 py-2 rounded-md shadow-lg text-lg font-semibold z-50"
              >
                Bienvenue 👋
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <main className="p-6 mt-12">
        <h1 className="text-3xl font-bold">Bienvenue sur MonShop 🛒</h1>
        <h1 className="text-3xl font-bold text-center mb-6">Nos Produits</h1>
        <ProductList />
      </main>
    </div>
  );
}
