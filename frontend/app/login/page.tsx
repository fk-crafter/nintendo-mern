"use client";

import { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "motion/react";
import { LogIn } from "lucide-react";
import nintendoLogo from "@/public/img/nintendologo.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext) || {};
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      if (login) {
        login(data.token);
        router.push("/");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error has occurred.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative px-4">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-red-600"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white"></div>

      <Image
        src={nintendoLogo}
        alt="Nintendo Logo"
        width={150}
        height={60}
        className="mb-6 relative z-10"
      />

      <button
        onClick={() => router.push("/")}
        className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-bold z-10"
      >
        ← Back to Home
      </button>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-8 text-black rounded-xl shadow-lg w-full max-w-md border-4 border-red-600 relative z-10"
      >
        <h1 className="text-3xl font-extrabold text-center mb-4 text-red-600">
          Welcome Back
        </h1>

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 p-3 w-full rounded-md focus:ring-2 focus:ring-red-600 outline-none transition text-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 p-3 w-full rounded-md focus:ring-2 focus:ring-red-600 outline-none transition text-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition text-lg font-bold flex items-center justify-center gap-2"
          >
            <LogIn size={20} />
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
