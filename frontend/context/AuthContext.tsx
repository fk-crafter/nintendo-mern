"use client";

import { createContext, useState, useEffect, ReactNode } from "react";

// Définition du type de l'utilisateur
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Définition du type du contexte
interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

// Création du contexte avec une valeur par défaut
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Provider du contexte
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Vérifier si un token est stocké dans localStorage (évite l'erreur "window is not defined")
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedUser = JSON.parse(atob(token.split(".")[1])); // Décoder le JWT (attention, pas sécurisé pour des données sensibles)
          setUser(decodedUser);
        } catch (error) {
          console.error("Erreur lors du décodage du token", error);
        }
      }
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
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
