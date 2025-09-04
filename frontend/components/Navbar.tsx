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
import { motion, AnimatePresence } from "motion/react";

const Navbar = () => {
  const { data: session } = useSession();
  const auth = useContext(AuthContext);
  const { cart, removeFromCart } = useCart();
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const cartRef = useRef<HTMLDivElement | null>(null);

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
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-red-600 text-white py-3 shadow-md rounded-lg md:max-w-6xl md:mx-auto md:mt-4"
    >
      {" "}
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

        {/* menu mobile */}
        {showMenu && (
          <div className="absolute top-16 left-0 w-full bg-white text-black flex flex-col items-center shadow-md z-50 py-4">
            <Link
              href="#products"
              className="py-2 text-lg hover:text-gray-500"
              onClick={() => setShowMenu(false)}
            >
              Products
            </Link>
            <Link
              href="/cart"
              className="py-2 text-lg hover:text-gray-500"
              onClick={() => setShowMenu(false)}
            >
              Cart ({cart.length})
            </Link>
            {session || auth?.user ? (
              <>
                <Link
                  href="/orders"
                  className="py-2 text-lg hover:text-gray-500"
                  onClick={() => setShowMenu(false)}
                >
                  My Orders
                </Link>
                {auth?.user?.role === "admin" && (
                  <Link
                    href="/dashboard"
                    className="py-2 text-lg hover:text-gray-500"
                    onClick={() => setShowMenu(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => {
                    setShowMenu(false);
                    if (session) signOut();
                    else if (auth?.logout) auth.logout();
                  }}
                  className="py-2 text-lg hover:text-gray-500"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="py-2 text-lg hover:text-gray-500"
                  onClick={() => setShowMenu(false)}
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="py-2 text-lg hover:text-gray-500"
                  onClick={() => setShowMenu(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}

        <div className="hidden md:flex gap-8 items-center">
          <Link href="#products" className="hover:text-gray-200 text-lg">
            Products
          </Link>

          <div className="relative" ref={cartRef}>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-white text-red-600 rounded-lg hover:bg-gray-100"
              onClick={() => {
                setShowUserMenu(false);
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
                          key={product.id}
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
                            onClick={() => removeFromCart(product.id)}
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
                onClick={() => {
                  setShowCart(false);
                  setShowUserMenu((prev) => !prev);
                }}
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
    </motion.nav>
  );
};

export default Navbar;
