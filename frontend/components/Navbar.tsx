"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import {
  ShoppingCart,
  LogOut,
  User,
  Package,
  BarChart,
  Settings,
} from "lucide-react";

const Navbar = () => {
  const { data: session } = useSession();
  const auth = useContext(AuthContext);
  const { cart } = useCart();
  const [showCart, setShowCart] = useState(false);
  const [showAuthMenu, setShowAuthMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md relative">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          MyShop
        </Link>

        <div className="flex gap-4 relative">
          <Link href="/products" className="hover:text-gray-300">
            Products
          </Link>

          <div className="relative">
            <button
              className="relative flex items-center gap-2 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
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
                        className="flex items-center border-b py-2"
                      >
                        <div className="flex-1">
                          <p className="text-sm font-semibold">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {product.price}€ x {product.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                    <Link
                      href="/cart"
                      className="block text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 mt-2"
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
                className="hover:text-gray-300 flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-md"
              >
                <Settings size={18} /> Manage Account ▼
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
                      if (session) {
                        signOut();
                      } else if (auth?.logout) {
                        auth.logout();
                      }
                    }}
                    className="flex w-full text-left px-4 py-2 hover:bg-gray-200 items-center gap-2"
                  >
                    <LogOut size={18} /> Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowAuthMenu(!showAuthMenu)}
                className="hover:text-gray-300 flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-md"
              >
                <User size={18} /> My Account ▼
              </button>

              {showAuthMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg">
                  <Link
                    href="/login"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200"
                  >
                    <LogOut size={18} /> Log In
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200"
                  >
                    <User size={18} /> Sign Up
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
