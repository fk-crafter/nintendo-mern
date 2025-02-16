"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WelcomeNotification() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const lastLogin = localStorage.getItem("lastLogin");

    if (token) {
      setIsLoggedIn(true);

      if (!lastLogin || lastLogin !== token) {
        setShowWelcome(true);
        localStorage.setItem("lastLogin", token);
        setTimeout(() => setShowWelcome(false), 5000);
      }
    }
  }, []);

  if (!isLoggedIn) return null;

  return (
    <div className="relative">
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-2 left-[45%] transform -translate-x-[45%] bg-green-500 text-white px-6 py-2 rounded-md shadow-lg text-lg font-semibold z-50"
          >
            Welcome 👋
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
