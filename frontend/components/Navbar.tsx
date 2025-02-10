"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const Navbar = () => {
  const { data: session } = useSession();
  const auth = useContext(AuthContext);

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          MonShop
        </Link>

        <div className="flex gap-4">
          <Link href="/products" className="hover:text-gray-300">
            Produits
          </Link>
          <Link href="/cart" className="hover:text-gray-300">
            Panier
          </Link>

          {session || auth?.user ? (
            <>
              <span className="text-gray-300">
                Salut, {session?.user?.name || auth?.user?.name}!
              </span>
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
