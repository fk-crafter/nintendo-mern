"use client";

import { createContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean; // Ajout de l'état de chargement
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Ajout du state loading

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedUser = JSON.parse(atob(token.split(".")[1]));
          setUser(decodedUser);
        } catch (error) {
          console.error("Erreur lors du décodage du token", error);
        }
      }
      setLoading(false); // On arrête le chargement après avoir essayé de récupérer l'utilisateur
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    const decodedUser = JSON.parse(atob(token.split(".")[1]));
    setUser(decodedUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
