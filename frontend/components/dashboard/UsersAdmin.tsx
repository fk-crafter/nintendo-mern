"use client";

import { useEffect, useState } from "react";
import ConfirmModal from "@/components/ConfirmModal";

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
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok)
        throw new Error("Erreur lors du chargement des utilisateurs.");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError("Impossible de charger les utilisateurs.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${selectedUser}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) throw new Error("Erreur lors de la suppression.");
      setUsers(users.filter((user) => user._id !== selectedUser));
      setShowModal(false);
    } catch (err) {
      setError("Impossible de supprimer l'utilisateur.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">👥 User Management</h2>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-500">No users for now.</p>
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
                  onClick={() => {
                    setSelectedUser(user._id);
                    setShowModal(true);
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDeleteUser}
        title="Confirm deletion"
        message="Are you sure you want to delete this user? This action is irreversible."
      />
    </div>
  );
}
