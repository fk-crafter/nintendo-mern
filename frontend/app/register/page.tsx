"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import nintendoLogo from "@/public/img/nintendologo.png";
import { Eye, EyeOff, X, Check, Info } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const registerSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[@#%&*!]/,
        "Password must contain at least one special character (@, #, %, &, *, !)"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showTooltipConfirmPassword, setShowTooltipConfirmPassword] =
    useState(false);

  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    specialChar: false,
    number: false,
    uppercase: false,
    match: false,
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const validatePassword = (password: string, confirmPassword: string) => {
    setPasswordCriteria({
      length: password.length >= 8,
      specialChar: /[@#%&*!]/.test(password),
      number: /[0-9]/.test(password),
      uppercase: /[A-Z]/.test(password),
      match: password === confirmPassword,
    });
  };

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

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
        className="bg-white p-8 text-black rounded-xl shadow-lg w-full max-w-lg border-4 border-red-600 relative z-10"
      >
        <h1 className="text-3xl font-extrabold text-center mb-4 text-red-600">
          Create Your Account
        </h1>

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
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

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="Password"
              className="border border-gray-300 p-3 w-full rounded-md focus:ring-2 focus:ring-red-600 outline-none transition text-lg"
              onChange={(e) => {
                validatePassword(e.target.value, getValues("confirmPassword"));
              }}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 hover:text-black transition"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>

            <div
              className="absolute right-10 top-[14px] text-gray-500 cursor-pointer"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <Info size={16} />
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute right-0 top-12 bg-white border border-gray-300 shadow-md rounded-md p-3 z-50 w-64 text-sm"
                >
                  <p
                    className={`flex items-center gap-2 ${
                      passwordCriteria.length
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {passwordCriteria.length ? <Check /> : <X />} At least 8
                    characters
                  </p>
                  <p
                    className={`flex items-center gap-2 ${
                      passwordCriteria.specialChar
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {passwordCriteria.specialChar ? <Check /> : <X />} 1 special
                    character (@#%&*!)
                  </p>
                  <p
                    className={`flex items-center gap-2 ${
                      passwordCriteria.number
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {passwordCriteria.number ? <Check /> : <X />} 1 number
                  </p>
                  <p
                    className={`flex items-center gap-2 ${
                      passwordCriteria.uppercase
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {passwordCriteria.uppercase ? <Check /> : <X />} 1 capital
                    character
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              placeholder="Confirm Password"
              className="border border-gray-300 p-3 w-full rounded-md focus:ring-2 focus:ring-red-600 outline-none transition text-lg"
              onChange={(e) => {
                validatePassword(getValues("password"), e.target.value);
              }}
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-gray-500 hover:text-black transition z-10"
            >
              {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>

            <div
              className="absolute right-10 top-[14px] text-gray-500 cursor-pointer z-10"
              onMouseEnter={() => setShowTooltipConfirmPassword(true)}
              onMouseLeave={() => setShowTooltipConfirmPassword(false)}
            >
              <Info size={16} />

              <AnimatePresence>
                {showTooltipConfirmPassword && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute right-0 top-6 bg-white border border-gray-300 shadow-md rounded-md p-3 z-50 w-52 text-sm"
                  >
                    <p
                      className={`flex items-center gap-2 ${
                        passwordCriteria.match
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {passwordCriteria.match ? (
                        <Check size={16} />
                      ) : (
                        <X size={16} />
                      )}{" "}
                      Passwords match
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-2">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={
              loading || !Object.values(passwordCriteria).every(Boolean)
            }
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6">
          <p className="text-center text-gray-600 mb-3">Or sign up with</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() =>
                (window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`)
              }
              className="bg-white border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 transition flex items-center gap-2"
            >
              <FcGoogle size={20} />
              Google
            </button>

            <button
              onClick={() =>
                (window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/github`)
              }
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition flex items-center gap-2"
            >
              <FaGithub size={20} />
              GitHub
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          >
            <div className="bg-white  text-black p-6 rounded-lg shadow-lg text-center border-4 border-red-600">
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
