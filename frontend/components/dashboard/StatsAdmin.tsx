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
      <h2 className="text-xl font-bold mb-4">📊 Dashboard Statistics</h2>

      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-4">
          <div className="bg-blue-500 text-white p-4 rounded-md shadow">
            <p className="text-2xl font-bold">{stats.totalProducts}</p>
            <p>Products</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-md shadow">
            <p className="text-2xl font-bold">{stats.totalOrders}</p>
            <p>Orders</p>
          </div>
          <div className="bg-yellow-500 text-white p-4 rounded-md shadow">
            <p className="text-2xl font-bold">{stats.totalUsers}</p>
            <p>Users</p>
          </div>
          <div className="bg-red-500 text-white p-4 rounded-md shadow">
            <p className="text-2xl font-bold">{stats.totalRevenue}€</p>
            <p>Total Revenue</p>
          </div>
        </div>
      )}
    </div>
  );
}
