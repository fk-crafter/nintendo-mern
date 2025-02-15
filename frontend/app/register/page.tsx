"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import nintendoLogo from "@/public/img/nintendologo.png";

const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();
      if (!res.ok) {
        throw new Error(responseData.message || "Error during registration");
      }

      setSuccessMessage(true);
      setTimeout(() => {
        router.push("/");
      }, 2500);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative px-4 bg-gray-900">
      <Image
        src={nintendoLogo}
        alt="Nintendo Logo"
        width={150}
        height={60}
        className="mb-6"
      />

      <button
        onClick={() => router.push("/")}
        className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-bold"
      >
        ← Back to Home
      </button>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-8 text-black rounded-xl shadow-lg w-full max-w-md border-4 border-red-600"
      >
        <h1 className="text-3xl font-extrabold text-center mb-4 text-red-600">
          Create Your Account
        </h1>

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register("name")}
              placeholder="Full Name"
              className="border border-gray-300 p-3 w-full rounded-md focus:ring-2 focus:ring-red-600 outline-none transition text-lg"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              {...register("email")}
              placeholder="Email Address"
              className="border border-gray-300 p-3 w-full rounded-md focus:ring-2 focus:ring-red-600 outline-none transition text-lg"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="border border-gray-300 p-3 w-full rounded-md focus:ring-2 focus:ring-red-600 outline-none transition text-lg"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition text-lg font-bold"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </motion.div>

      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <div className="bg-white text-black p-6 rounded-lg shadow-lg text-center border-4 border-red-600">
              <h2 className="text-2xl font-bold text-green-600">
                Registration Successful! 🎉
              </h2>
              <p className="mt-2 text-gray-700">Redirecting...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
