"use client";

import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

const AuthCallback = () => {
  const { login } = useContext(AuthContext) || {};
  const router = useRouter();
  const [hasLoggedIn, setHasLoggedIn] = useState(false);

  useEffect(() => {
    if (!hasLoggedIn) {
      const token = new URLSearchParams(window.location.search).get("token");
      if (token && login) {
        login(token);
        setHasLoggedIn(true);
        router.push("/");
      }
    }
  }, [hasLoggedIn, login, router]);

  return <p className="text-center mt-10">Connexion en cours...</p>;
};

export default AuthCallback;
