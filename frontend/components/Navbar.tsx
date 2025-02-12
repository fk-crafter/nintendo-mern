"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { XCircleIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  const { data: session } = useSession();
  const auth = useContext(AuthContext);
  const { cart, removeFromCart } = useCart();
  const [showCart, setShowCart] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md relative">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          MonShop
        </Link>

        <div className="flex gap-4 relative">
          <Link href="/products" className="hover:text-gray-300">
            Produits
          </Link>

          <div className="relative">
            <button
              className="relative px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
              onClick={() => setShowCart(!showCart)}
            >
              Panier ({cart.length})
            </button>

            {showCart && (
              <div className="absolute right-0 mt-2 w-64 bg-white text-black shadow-lg rounded-lg p-4">
                {cart.length === 0 ? (
                  <p className="text-center text-gray-500">
                    Votre panier est vide.
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
                        <button onClick={() => removeFromCart(product._id)}>
                          <XCircleIcon className="w-5 h-5 text-red-500 hover:text-red-700" />
                        </button>
                      </div>
                    ))}
                    <Link
                      href="/cart"
                      className="block text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 mt-2"
                    >
                      Voir mon panier
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {session || auth?.user ? (
            <>
              <Link href="/orders" className="hover:text-gray-300">
                Mes commandes
              </Link>

              {auth?.user?.role === "admin" && (
                <Link href="/dashboard" className="hover:text-gray-300">
                  Admin
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
                className="hover:text-gray-300"
              >
                Se déconnecter
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-gray-300">
                Connexion
              </Link>
              <Link href="/register" className="hover:text-gray-300">
                Inscription
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
