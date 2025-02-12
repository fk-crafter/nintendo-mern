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

      if (!res.ok)
        throw new Error("Erreur lors du chargement des statistiques.");

      const data = await res.json();
      setStats(data);
    } catch (err) {
      setError("Impossible de charger les statistiques.");
      console.error("Erreur lors du chargement des statistiques :", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">📊 Statistiques</h2>

      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-4">
          <div className="bg-blue-500 text-white p-4 rounded-md shadow">
            <p className="text-2xl font-bold">{stats.totalProducts}</p>
            <p>Produits</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-md shadow">
            <p className="text-2xl font-bold">{stats.totalOrders}</p>
            <p>Commandes</p>
          </div>
          <div className="bg-yellow-500 text-white p-4 rounded-md shadow">
            <p className="text-2xl font-bold">{stats.totalUsers}</p>
            <p>Utilisateurs</p>
          </div>
          <div className="bg-red-500 text-white p-4 rounded-md shadow">
            <p className="text-2xl font-bold">{stats.totalRevenue}€</p>
            <p>Revenu Total</p>
          </div>
        </div>
      )}
    </div>
  );
}
