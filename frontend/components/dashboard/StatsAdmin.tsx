"use client";

import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function StatsAdmin() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    ordersOverTime: [],
  });

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
      console.error("Error loading statistics:", err);
    }
  };

  const barChartData = {
    labels: ["Products", "Orders", "Users", "Revenue (€)"],
    datasets: [
      {
        label: "Current Stats",
        data: [
          stats.totalProducts,
          stats.totalOrders,
          stats.totalUsers,
          stats.totalRevenue,
        ],
        backgroundColor: ["#FFC107", "#FF5722", "#03A9F4", "#4CAF50"],
        borderRadius: 6,
      },
    ],
  };

  const lineChartData = {
    labels: stats.ordersOverTime
      ? stats.ordersOverTime.map((_, i) => `Day ${i + 1}`)
      : [],
    datasets: [
      {
        label: "Orders Over Time",
        data: stats.ordersOverTime ? stats.ordersOverTime : [],
        borderColor: "#FF5733",
        backgroundColor: "rgba(255, 87, 51, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <section className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white p-6 rounded-lg shadow border">
            <p className="text-4xl font-bold text-gray-900">
              {stats.totalProducts}
            </p>
            <p className="text-lg text-gray-600">Total Products</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border">
            <p className="text-4xl font-bold text-gray-900">
              {stats.totalOrders}
            </p>
            <p className="text-lg text-gray-600">Total Orders</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border">
            <p className="text-4xl font-bold text-gray-900">
              {stats.totalUsers}
            </p>
            <p className="text-lg text-gray-600">Total Users</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border">
            <p className="text-4xl font-bold text-gray-900">
              {stats.totalRevenue}€
            </p>
            <p className="text-lg text-gray-600">Total Revenue</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Statistics Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 shadow-lg rounded-lg border">
            <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">
              📊 General Stats
            </h3>
            <Bar data={barChartData} />
          </div>

          <div className="bg-white p-6 shadow-lg rounded-lg border">
            <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">
              📈 Orders Over Time
            </h3>
            <Line data={lineChartData} />
          </div>
        </div>
      </section>
    </div>
  );
}
