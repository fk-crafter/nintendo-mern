"use client";

import { useEffect, useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export default function UsersAdmin() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok)
        throw new Error("Erreur lors du chargement des utilisateurs.");

      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError("Impossible de charger les utilisateurs.");
      console.error("Erreur lors du chargement des utilisateurs :", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;

    try {
      const res = await fetch(`http://localhost:5001/api/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok)
        throw new Error("Erreur lors de la suppression de l'utilisateur.");

      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      setError("Impossible de supprimer l'utilisateur.");
      console.error("Erreur lors de la suppression de l'utilisateur :", err);
    }
  };

  const handleToggleRole = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5001/api/users/${id}/role`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Erreur lors de la modification du rôle.");

      fetchUsers();
    } catch (err) {
      setError("Impossible de modifier le rôle.");
      console.error("Erreur lors de la modification du rôle :", err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">👥 Gestion des Utilisateurs</h2>

      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Chargement...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-500">Aucun utilisateur pour l&apos;instant.</p>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="border p-4 rounded-md bg-white flex justify-between items-center"
            >
              <div>
                <p className="text-gray-700 font-bold">{user.name}</p>
                <p className="text-gray-500">{user.email}</p>
                <p
                  className={`text-sm ${
                    user.role === "admin" ? "text-red-500" : "text-blue-500"
                  }`}
                >
                  {user.role.toUpperCase()}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleToggleRole(user._id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  {user.role === "admin" ? "Rétrograder" : "Promouvoir"}
                </button>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
