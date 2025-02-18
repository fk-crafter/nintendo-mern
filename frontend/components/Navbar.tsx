"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import {
  Menu,
  X,
  ShoppingCart,
  LogOut,
  User,
  Package,
  BarChart,
  Settings,
} from "lucide-react";
import nintendoLogo from "@/public/img/nintendologo.png";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { data: session } = useSession();
  const auth = useContext(AuthContext);
  const { cart, removeFromCart } = useCart();
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  const closeAllMenus = () => {
    setShowCart(false);
    setShowUserMenu(false);
  };

  // ✅ Ferme le menu "Manage" si on clique en dehors
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    }

    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showUserMenu]);

  return (
    <nav className="bg-red-600 text-white py-3 shadow-md rounded-lg md:max-w-6xl md:mx-auto md:mt-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/">
          <Image
            src={nintendoLogo}
            alt="Nintendo Logo"
            className="h-10 w-auto object-contain"
          />
        </Link>

        <button
          className="md:hidden text-white"
          onClick={() => setShowMenu((prev) => !prev)}
        >
          {showMenu ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div className="hidden md:flex gap-8 items-center">
          <Link href="/products" className="hover:text-gray-200 text-lg">
            Products
          </Link>

          <div className="relative">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-white text-red-600 rounded-lg hover:bg-gray-100"
              onClick={() => {
                closeAllMenus();
                setShowCart((prev) => !prev);
              }}
            >
              <ShoppingCart size={18} /> Cart ({cart.length})
            </button>

            <AnimatePresence>
              {showCart && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-50 right-0 mt-2 w-64 bg-white text-black shadow-lg rounded-lg p-4"
                >
                  {cart.length === 0 ? (
                    <p className="text-center text-gray-500">
                      Your cart is empty.
                    </p>
                  ) : (
                    <>
                      {cart.map((product) => (
                        <div
                          key={product._id}
                          className="flex items-center justify-between border-b py-2"
                        >
                          <div className="flex-1">
                            <p className="text-sm font-semibold">
                              {product.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {product.price}€ x {product.quantity}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(product._id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      ))}
                      <Link
                        href="/cart"
                        className="block text-center bg-black text-white py-2 rounded-md mt-2"
                      >
                        View Cart
                      </Link>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {session || auth?.user ? (
            <div className="relative z-50" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu((prev) => !prev)}
                className="hover:text-gray-200 flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg"
              >
                <Settings size={18} /> Manage ▼
              </button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg"
                  >
                    <Link
                      href="/orders"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200"
                    >
                      <Package size={18} /> My Orders
                    </Link>
                    {auth?.user?.role === "admin" && (
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200"
                      >
                        <BarChart size={18} /> Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        if (session) signOut();
                        else if (auth?.logout) auth.logout();
                      }}
                      className="flex w-full text-left px-4 py-2 hover:bg-gray-200 items-center gap-2"
                    >
                      <LogOut size={18} /> Log Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link
                href="/login"
                className="hover:text-gray-200 flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg"
              >
                <LogOut size={18} /> Log In
              </Link>
              <Link
                href="/register"
                className="hover:bg-gray-100 flex items-center gap-2 px-4 py-2 bg-white text-red-600 rounded-lg"
              >
                <User size={18} /> Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* ✅ Menu mobile remis comme avant */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 z-50 right-0 h-full w-64 bg-red-700 text-white shadow-lg rounded-l-lg flex flex-col gap-4 p-6 md:hidden"
          >
            <button
              onClick={() => setShowMenu(false)}
              className="text-white text-right"
            >
              <X size={28} />
            </button>

            <Link href="/products" className="hover:text-gray-300 text-lg">
              Products
            </Link>

            <Link
              href="/cart"
              className="flex items-center gap-2 bg-white text-red-600 px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              <ShoppingCart size={18} /> Cart ({cart.length})
            </Link>

            {session || auth?.user ? (
              <>
                <Link href="/orders" className="hover:text-gray-300">
                  My Orders
                </Link>
                {auth?.user?.role === "admin" && (
                  <Link href="/dashboard" className="hover:text-gray-300">
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => (session ? signOut() : auth?.logout?.())}
                  className="hover:text-gray-300"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-gray-300">
                  Log In
                </Link>
                <Link href="/register" className="hover:text-gray-300">
                  Sign Up
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
