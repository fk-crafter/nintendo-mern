"use client";

import { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

const LoginPage = () => {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext) || {};
  const router = useRouter();

  // redirection après connexion via NextAuth
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      if (login) {
        login(data.token);
        router.push("/"); // redirection après connexion
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur inconnue est survenue.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Connexion</h1>
      {error && <p className="text-red-500">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="bg-white text-black p-6 rounded-lg shadow-md"
      >
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="border p-2 w-full mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-full rounded"
        >
          Se connecter
        </button>
      </form>

      {/* Connexion avec NextAuth */}
      <div className="mt-4">
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="bg-red-500 text-white p-2 w-full rounded mb-2"
        >
          Connexion avec Google
        </button>
        <button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="bg-gray-800 text-white p-2 w-full rounded mb-2"
        >
          Connexion avec GitHub
        </button>
        <button
          onClick={() => signIn(undefined, { callbackUrl: "/" })}
          className="bg-purple-500 text-white p-2 w-full rounded"
        >
          Connexion via Email
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
