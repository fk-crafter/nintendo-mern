import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const FloatingCart = () => {
  const { cart, removeFromCart } = useCart();
  const [showCart, setShowCart] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cartRef = useRef<HTMLDivElement | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setShowCart(false);
      }
    }
    if (showCart) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCart]);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={() => setShowCart(!showCart)}
            className="fixed bottom-6 z-50 right-6 bg-red-600 text-white p-4 rounded-full shadow-lg flex items-center gap-2 hover:bg-red-700 transition"
          >
            <ShoppingCart size={24} />
            <span className="font-bold">{cart.length}</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCart && (
          <motion.div
            ref={cartRef}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-50 p-6 overflow-y-auto"
          >
            <button
              onClick={() => setShowCart(false)}
              className="absolute top-2 right-2 text-gray-700 hover:text-black"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4">🛒 My Cart</h2>
            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              cart.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center justify-between border-b py-2"
                >
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{product.name}</p>
                    <p className="text-xs text-gray-500">
                      {product.price}€ x {product.quantity}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✖
                  </button>
                </div>
              ))
            )}
            <Link href="/cart">
              <button className="w-full mt-4 bg-black text-white py-2 rounded-md">
                View Cart
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingCart;
