"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/assets/nintendologo.png";
import React from "react";

export default function Login() {
  const { data: session } = useSession();

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
          <div>
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
              Sign in with Google
            </button>
          </div>

          <div>
            <button
              onClick={() => signIn("github", { callbackUrl: "/" })}
              className="flex w-full justify-center items-center rounded-md bg-white border border-gray-300 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-5 w-5 mr-2"
              >
                <path
                  d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.6.111.793-.26.793-.577v-2.234c-3.338.726-4.043-1.416-4.043-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.085 1.838 1.24 1.838 1.24 1.07 1.835 2.809 1.304 3.495.997.108-.775.419-1.304.762-1.604-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.469-2.38 1.236-3.221-.124-.304-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.96-.267 1.985-.4 3.004-.404 1.02.004 2.044.137 3.004.404 2.292-1.552 3.299-1.23 3.299-1.23.653 1.653.242 2.872.118 3.176.769.841 1.235 1.911 1.235 3.221 0 4.61-2.805 5.623-5.476 5.922.431.372.823 1.104.823 2.222v3.293c0 .32.193.694.801.575C20.565 21.796 24 17.298 24 12c0-6.627-5.373-12-12-12z"
                  fill="currentColor"
                />
              </svg>
              Sign in with GitHub
            </button>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-white">
          Don't have an account?{" "}
          <Link
            href="#"
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
