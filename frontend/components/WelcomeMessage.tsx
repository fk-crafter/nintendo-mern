"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function WelcomeMessage() {
  const { data: session } = useSession();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000); // 5 secondes avant disparition

    return () => clearTimeout(timer);
  }, []);

  if (!session || !visible) return null;

  return (
    <div className="z-1 fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-800 text-white py-3 px-6 rounded-lg shadow-md border border-red-600 transition-opacity duration-500 ease-in-out">
      <h1 className="text-lg font-semibold ">Welcome, {session.user?.name}!</h1>
    </div>
  );
}
