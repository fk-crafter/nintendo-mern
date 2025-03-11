"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function OrderBadge() {
  const [showBadge, setShowBadge] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem("orderPassed") === "true") {
      setShowBadge(true);
      localStorage.removeItem("orderPassed");
      setTimeout(() => setShowBadge(false), 5000);
    }
  }, []);

  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50">
      <AnimatePresence>
        {showBadge && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-green-600 text-white px-6 py-2 rounded-full shadow-lg text-lg font-semibold"
          >
            Order successfully placed ✅
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
