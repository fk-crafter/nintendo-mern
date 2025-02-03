"use client";

import { useState, useRef, useEffect } from "react";
import {
  Home,
  ShoppingCart,
  LogIn,
  Package,
  Search,
  ChevronDown,
  X,
  Menu,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Nintendologo from "@/public/assets/nintendologo.png";
import { signOut, useSession } from "next-auth/react";
import useStore from "@/store/store";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Fonction pour détecter si on clique en dehors du panier et le fermer
    const handleClickOutside = (event: MouseEvent) => {
      if (
        cartRef.current &&
        !cartRef.current.contains(event.target as Node) &&
        !document.getElementById("cart-button")?.contains(event.target as Node)
      ) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="bg-red-700 p-5 flex justify-between items-center mt-4 rounded-2xl shadow-lg max-w-screen-xl mx-auto">
        <div className="flex items-center space-x-2">
          <Link href="#">
            <Image src={Nintendologo} alt="Logo" width={150} height={50} />
          </Link>
        </div>

        {/* Bouton de menu hamburger pour les mobiles */}
        <div className="md:hidden">
          <button
            onClick={() => setIsHamburgerMenuOpen(!isHamburgerMenuOpen)}
            className="text-white flex items-center space-x-2"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Liens de navigation en mode bureau */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-white flex items-center space-x-2">
            <Home className="w-6 h-6" />
            <span className="text-lg font-medium">Home</span>
          </Link>
          <Link
            href="/products"
            className="text-white flex items-center space-x-2"
          >
            <Package className="w-6 h-6" />
            <span className="text-lg font-medium">Products</span>
          </Link>

          {/* Bouton Panier */}
          <div className="relative">
            <button
              id="cart-button"
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="text-white flex items-center space-x-2"
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="text-lg font-medium">Cart ({cart.length})</span>
            </button>

            {/* Contenu du Panier */}
            {isCartOpen && (
              <div
                ref={cartRef}
                className="absolute top-full mt-2 left-0 w-64 bg-white text-gray-900 rounded-lg shadow-lg p-4 z-50"
              >
                {cart.length === 0 ? (
                  <p className="text-center text-gray-500">
                    Your cart is empty.
                  </p>
                ) : (
                  <>
                    <ul className="mb-4">
                      {cart.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between border-b border-gray-200 py-2"
                        >
                          <X
                            className="text-red-600 cursor-pointer"
                            onClick={() => removeFromCart(item.id)}
                          />
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                            className="rounded"
                          />
                          <span>{item.name}</span>
                          <span>€{item.price}</span>
                        </li>
                      ))}
                    </ul>
                    {isMounted && (
                      <button
                        className="bg-red-600 text-white w-full py-2 rounded-lg hover:bg-red-700 transition-colors"
                        onClick={() => router.push("/checkout")}
                      >
                        Checkout
                      </button>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          {session ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="text-white flex items-center space-x-2"
              >
                <span className="text-lg font-medium">
                  {session.user?.name}
                </span>
                <ChevronDown className="w-6 h-6" />
              </button>
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-lg shadow-lg">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile Settings
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="../login"
              className="text-white flex items-center space-x-2"
            >
              <LogIn className="w-6 h-6" />
              <span className="text-lg font-medium">Login</span>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
