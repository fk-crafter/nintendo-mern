"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useContext, useState } from "react";
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

const Navbar = () => {
  const { data: session } = useSession();
  const auth = useContext(AuthContext);
  const { cart, removeFromCart } = useCart();
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <nav className="bg-red-600 text-white py-3 shadow-md rounded-lg md:max-w-6xl md:mx-auto md:mt-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/">
          <Image
            src={nintendoLogo}
            alt="Nintendo Logo"
            className="h-8 w-auto object-contain"
          />
        </Link>

        <button
          className="md:hidden text-white"
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div className="hidden md:flex gap-8 items-center">
          <Link href="/products" className="hover:text-gray-200 text-lg">
            Products
          </Link>

          <div className="relative z-50">
            <button
              className="relative flex items-center gap-2 px-4 py-2 bg-white text-red-600 rounded-lg hover:bg-gray-100"
              onClick={() => setShowCart(!showCart)}
            >
              <ShoppingCart size={18} /> Cart ({cart.length})
            </button>

            {showCart && (
              <div className="absolute right-0 mt-2 w-64 bg-white text-black shadow-lg rounded-lg p-4">
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
              </div>
            )}
          </div>

          {session || auth?.user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="hover:text-gray-200 flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg"
              >
                <Settings size={18} /> Manage ▼
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg">
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
                </div>
              )}
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

      {/* menu mobile */}
      <div
        className={`fixed top-0 z-50 right-0 h-full w-64 bg-red-700 text-white shadow-lg transform ${
          showMenu ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 md:hidden rounded-l-lg`}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b border-red-500">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={() => setShowMenu(false)} className="text-white">
            <X size={28} />
          </button>
        </div>

        <div className="flex flex-col gap-4 p-4">
          <Link href="/products" className="hover:text-gray-300 text-lg">
            Products
          </Link>

          <button
            className="flex items-center gap-2 px-4 py-2 bg-white text-red-600 rounded-lg hover:bg-gray-100"
            onClick={() => setShowCart(!showCart)}
          >
            <ShoppingCart size={18} /> Cart ({cart.length})
          </button>

          {session || auth?.user ? (
            <div className="flex flex-col gap-2">
              <Link
                href="/orders"
                className="flex items-center gap-2 hover:text-gray-300"
              >
                <Package size={18} /> My Orders
              </Link>

              {auth?.user?.role === "admin" && (
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 hover:text-gray-300"
                >
                  <BarChart size={18} /> Admin Panel
                </Link>
              )}

              <button
                onClick={() => {
                  if (session) signOut();
                  else if (auth?.logout) auth.logout();
                }}
                className="flex items-center gap-2 hover:text-gray-300"
              >
                <LogOut size={18} /> Log Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                href="/login"
                className="flex items-center gap-2 hover:text-gray-300"
              >
                <LogOut size={18} /> Log In
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-2 hover:text-gray-300"
              >
                <User size={18} /> Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
