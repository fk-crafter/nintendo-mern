"use client";

import { useEffect, useState } from "react";
import ConfirmModal from "@/components/ConfirmModal";
import { Pencil, Trash2, Check, RefreshCcw } from "lucide-react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  updatedAt: string;
}

export default function UsersAdmin() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [updatedUsers, setUpdatedUsers] = useState<
    Record<string, Partial<User>>
  >({});

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
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      const res = await fetch(
        `http://localhost:5001/api/users/${selectedUser}`,
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

  const handleEditUser = (userId: string) => {
    setEditingUser(userId);
    setUpdatedUsers((prev) => ({
      ...prev,
      [userId]: users.find((user) => user._id === userId) || {},
    }));
  };

  const handleChange = (userId: string, field: keyof User, value: string) => {
    setUpdatedUsers((prev) => ({
      ...prev,
      [userId]: { ...prev[userId], [field]: value },
    }));
  };

  const handleUpdateUser = async (userId: string) => {
    if (!updatedUsers[userId]) return;

    // Vérifier si des modifications ont été apportées
    const originalUser = users.find((user) => user._id === userId);
    if (
      originalUser &&
      updatedUsers[userId]?.name === originalUser.name &&
      updatedUsers[userId]?.email === originalUser.email &&
      updatedUsers[userId]?.role === originalUser.role
    ) {
      alert("Aucune modification détectée !");
      setEditingUser(null); // Quitte le mode édition
      return;
    }

    try {
      const res = await fetch(`http://localhost:5001/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedUsers[userId]),
      });

      if (!res.ok) throw new Error("Erreur lors de la mise à jour.");
      fetchUsers();
      setEditingUser(null);
    } catch (err) {
      console.error(err);
      alert("Mise à jour échouée !");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">👥 Manage Users</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-500 text-center">No users available.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 rounded-md overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3">Name</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Updated At</th>
              <th className="border p-3">Role</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border">
                <td className="p-3 border">
                  {editingUser === user._id ? (
                    <input
                      type="text"
                      value={updatedUsers[user._id]?.name || ""}
                      onChange={(e) =>
                        handleChange(user._id, "name", e.target.value)
                      }
                      className="border p-2 rounded w-full"
                    />
                  ) : (
                    user.name
                  )}
                </td>

                <td className="p-3 border">
                  {editingUser === user._id ? (
                    <input
                      type="text"
                      value={updatedUsers[user._id]?.email || ""}
                      onChange={(e) =>
                        handleChange(user._id, "email", e.target.value)
                      }
                      className="border p-2 rounded w-full"
                    />
                  ) : (
                    user.email
                  )}
                </td>

                <td className="p-3 border text-gray-500 text-sm">
                  {user.updatedAt}
                </td>

                <td className="p-3 border">
                  {editingUser === user._id ? (
                    <select
                      value={updatedUsers[user._id]?.role || ""}
                      onChange={(e) =>
                        handleChange(user._id, "role", e.target.value)
                      }
                      className="border p-2 rounded w-full"
                    >
                      <option value="admin">Admin</option>
                      <option value="User">User</option>
                    </select>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        user.role === "admin" ? "bg-blue-500" : "bg-yellow-500"
                      }`}
                    >
                      {user.role.toUpperCase()}
                    </span>
                  )}
                </td>

                <td className="p-3 border flex justify-center gap-3">
                  {editingUser === user._id ? (
                    <>
                      {/* ✅ Bouton de validation */}
                      <button
                        onClick={() => handleUpdateUser(user._id)}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Check size={20} />
                      </button>

                      {/* ❌ Bouton d'annulation (quitte le mode édition) */}
                      <button
                        onClick={() => setEditingUser(null)}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        ✖
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleEditUser(user._id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={20} />
                    </button>
                  )}

                  <button className="text-gray-600 hover:text-gray-800">
                    <RefreshCcw size={20} />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedUser(user._id);
                      setShowModal(true);
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDeleteUser}
        title="Confirm Deletion"
        message="Are you sure you want to delete this user? This action cannot be undone."
      />
    </div>
  );
}
