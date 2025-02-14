"use client";

import { useEffect, useState } from "react";

export default function StatsAdmin() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/stats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Error loading statistics.");

      const data = await res.json();
      setStats(data);
    } catch (err) {
      setError("Unable to load statistics.");
      console.error("Error loading statistics:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-white">
        📊 Dashboard Statistics
      </h2>

      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-4">
          <div className="bg-gradient-to-r from-gray-800 to-gray-600 text-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <p className="text-3xl font-bold">{stats.totalProducts}</p>
            <p className="text-lg">Products</p>
          </div>
          <div className="bg-gradient-to-r from-gray-800 to-gray-600 text-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <p className="text-3xl font-bold">{stats.totalOrders}</p>
            <p className="text-lg">Orders</p>
          </div>
          <div className="bg-gradient-to-r from-gray-800 to-gray-600 text-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <p className="text-3xl font-bold">{stats.totalUsers}</p>
            <p className="text-lg">Users</p>
          </div>
          <div className="bg-gradient-to-r from-gray-800 to-gray-600 text-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <p className="text-3xl font-bold">{stats.totalRevenue}€</p>
            <p className="text-lg">Total Revenue</p>
          </div>
        </div>
      )}
    </div>
  );
}
