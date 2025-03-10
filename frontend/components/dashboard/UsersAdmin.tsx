"use client";

import { useEffect, useState } from "react";
import ConfirmModal from "@/components/ConfirmModal";
import { Pencil, Trash2, Check, RefreshCcw, Users } from "lucide-react";

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
      const res = await fetch(
        "https://nintendo-backend-u0dz.onrender.com/api/users",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) throw new Error("Error when loading users.");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError("Impossible to load users.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      const res = await fetch(
        `https://nintendo-backend-u0dz.onrender.com/api/users/${selectedUser}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) throw new Error("Error when deleting.");
      setUsers(users.filter((user) => user._id !== selectedUser));
      setShowModal(false);
    } catch (err) {
      setError("Impossible to delete the user.");
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

    const originalUser = users.find((user) => user._id === userId);
    if (
      originalUser &&
      updatedUsers[userId]?.name === originalUser.name &&
      updatedUsers[userId]?.email === originalUser.email &&
      updatedUsers[userId]?.role === originalUser.role
    ) {
      alert("No changes detected !");
      setEditingUser(null);
      return;
    }

    try {
      const res = await fetch(
        `https://nintendo-backend-u0dz.onrender.com/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedUsers[userId]),
        }
      );

      if (!res.ok) throw new Error("Error when updating.");
      fetchUsers();
      setEditingUser(null);
    } catch (err) {
      console.error(err);
      alert("update failed !");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-red-800 lg:mb-6 text-center flex items-center justify-center gap-2">
        <Users className="w-6 h-6 lg:w-8 lg:h-8" />
        Users Management
      </h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-500 text-center">No users available.</p>
      ) : (
        <div className="hidden lg:block">
          <table className="w-full border-collapse border border-gray-300 rounded-md overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3">Name</th>
                <th className="border p-3">Email</th>
                <th className="border p-3 hidden lg:table-cell">Updated At</th>

                <th className="border p-3">Role</th>
                <th className="border p-2 lg:p-3 text-center w-[80px]">
                  Actions
                </th>
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

                  <td className="p-3 border text-gray-500 text-sm hidden lg:table-cell">
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
                          user.role === "admin"
                            ? "bg-blue-500"
                            : "bg-yellow-500"
                        }`}
                      >
                        {user.role.toUpperCase()}
                      </span>
                    )}
                  </td>

                  <td className="p-2 lg:p-3 border flex justify-center gap-2 lg:gap-3">
                    {editingUser === user._id ? (
                      <>
                        <button
                          onClick={() => handleUpdateUser(user._id)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <Check className="w-5 h-5 lg:w-6 lg:h-6" />
                        </button>

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
                        <Pencil className="w-5 h-5 lg:w-6 lg:h-6" />
                      </button>
                    )}

                    <button className="text-gray-600 hover:text-gray-800">
                      <RefreshCcw className="w-5 h-5 lg:w-6 lg:h-6" />
                    </button>

                    <button
                      onClick={() => {
                        setSelectedUser(user._id);
                        setShowModal(true);
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-5 h-5 lg:w-6 lg:h-6" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* mobile */}
      <div className="lg:hidden flex flex-col gap-4">
        {users.map((user) => (
          <div key={user._id} className="p-4 bg-gray-100 rounded-lg shadow-md">
            {editingUser === user._id ? (
              <>
                <input
                  type="text"
                  value={updatedUsers[user._id]?.name || ""}
                  onChange={(e) =>
                    handleChange(user._id, "name", e.target.value)
                  }
                  className="border p-2 rounded w-full mb-2"
                  placeholder="Name"
                />
                <input
                  type="text"
                  value={updatedUsers[user._id]?.email || ""}
                  onChange={(e) =>
                    handleChange(user._id, "email", e.target.value)
                  }
                  className="border p-2 rounded w-full mb-2"
                  placeholder="Email"
                />
                <select
                  value={updatedUsers[user._id]?.role || ""}
                  onChange={(e) =>
                    handleChange(user._id, "role", e.target.value)
                  }
                  className="border p-2 rounded w-full mb-2"
                >
                  <option value="admin">Admin</option>
                  <option value="User">User</option>
                </select>

                <div className="mt-3 flex justify-between">
                  <button
                    onClick={() => handleUpdateUser(user._id)}
                    className="text-green-600 hover:text-green-800"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setEditingUser(null)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    ✖
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Mode lecture */}
                <p>
                  <strong>Name:</strong> {user.name}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Role:</strong>
                  <span
                    className={`px-3 py-1 rounded-full text-white ml-2 ${
                      user.role === "admin" ? "bg-blue-500" : "bg-yellow-500"
                    }`}
                  >
                    {user.role.toUpperCase()}
                  </span>
                </p>

                {/* Boutons d’action en bas */}
                <div className="mt-3 flex justify-between">
                  <button
                    onClick={() => handleEditUser(user._id)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-800">
                    <RefreshCcw className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedUser(user._id);
                      setShowModal(true);
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

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
