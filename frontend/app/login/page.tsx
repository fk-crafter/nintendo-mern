"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/assets/nintendologo.png";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/store/auth"; // Import de la fonction

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  // Ajout de champs pour l'auth via backend
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError(""); // Réinitialise les erreurs
    const userData = await loginUser(email, password);

    if (userData) {
      router.push("/"); // Redirige l'utilisateur connecté
    } else {
      setError("Échec de la connexion. Vérifie tes identifiants !");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-red-700">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image src={Logo} alt="Nintendo" className="mx-auto h-12 w-auto" />
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          {/* Champs Email & Password */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Bouton Login via Backend */}
          <button
            onClick={handleLogin}
            className="w-full bg-white text-gray-900 font-semibold py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-all"
          >
            Login with Email
          </button>

          {/* Boutons Login via NextAuth */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="flex w-full justify-center items-center rounded-md bg-white border border-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm hover:bg-gray-100"
          >
            <span className="mr-2">🔵</span> Sign in with Google
          </button>

          <button
            onClick={() => signIn("github", { callbackUrl: "/" })}
            className="flex w-full justify-center items-center rounded-md bg-white border border-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm hover:bg-gray-100"
          >
            <span className="mr-2">🐱</span> Sign in with GitHub
          </button>
        </div>

        <p className="mt-10 text-center text-sm text-white">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-semibold leading-6 text-white hover:text-red-300"
          >
            Sign up
          </Link>
        </p>

        <div className="mt-4 text-center">
          <Link href="/" className="text-white hover:underline">
            Go back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
