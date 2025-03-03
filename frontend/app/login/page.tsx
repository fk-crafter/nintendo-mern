"use client";

import { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { motion } from "motion/react";
import { Github, LogIn } from "lucide-react";
import nintendoLogo from "@/public/img/nintendologo.png";

const LoginPage = () => {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext) || {};
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

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
        className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-bold  z-10"
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

        <div className="space-y-3 mb-6">
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-100 transition flex items-center justify-center gap-2 font-bold"
          >
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/0/09/IOS_Google_icon.png"
              alt="Google Logo"
              width={20}
              height={20}
            />
            Login with Google
          </button>
          <button
            onClick={() => signIn("github", { callbackUrl: "/" })}
            className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 transition flex items-center justify-center gap-2 font-bold"
          >
            <Github size={20} />
            Login with GitHub
          </button>
        </div>

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
