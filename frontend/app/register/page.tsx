"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/assets/nintendologo.png";

export default function Register() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-red-700">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image src={Logo} alt="Nintendo" className="mx-auto h-12 w-auto" />
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Create an account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="flex w-full justify-center items-center rounded-md bg-white border border-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            <svg
              className="h-5 w-5 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.35 11.1H12v2.7h5.35c-.23 1.34-.93 2.47-1.96 3.23v2.68h3.14c1.83-1.69 2.89-4.17 2.89-6.91 0-.57-.05-1.12-.13-1.66z"
                fill="#4285F4"
              />
              <path
                d="M12 21c2.43 0 4.46-.8 5.95-2.15l-3.14-2.68c-.87.58-1.97.93-3.17.93-2.43 0-4.48-1.65-5.21-3.88H3.15v2.75C4.64 18.98 8.06 21 12 21z"
                fill="#34A853"
              />
              <path
                d="M6.79 13.2c-.2-.58-.31-1.2-.31-1.85s.11-1.27.31-1.85V6.75H3.15C2.42 8.18 2 9.75 2 11.35s.42 3.17 1.15 4.6l3.64-2.75z"
                fill="#FBBC05"
              />
              <path
                d="M12 4.07c1.32 0 2.51.46 3.44 1.35l2.57-2.57C16.47 1.77 14.44 1 12 1 8.06 1 4.64 3.02 3.15 5.65l3.64 2.75C7.52 6.72 9.57 4.07 12 4.07z"
                fill="#EA4335"
              />
            </svg>
            Sign up with Google
          </button>

          <button
            onClick={() => signIn("github", { callbackUrl: "/" })}
            className="flex w-full justify-center items-center rounded-md bg-white border border-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Sign up with GitHub
          </button>
        </div>

        <p className="mt-10 text-center text-sm text-white">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold leading-6 text-white hover:text-red-300"
          >
            Sign in
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
