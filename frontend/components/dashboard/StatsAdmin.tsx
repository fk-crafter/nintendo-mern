"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
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

  const ordersData =
    stats.ordersOverTime && stats.ordersOverTime.length > 0
      ? stats.ordersOverTime
      : [0, 0, 0, 0];

  const lineChartData = {
    labels: ordersData.map((_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: "Total Products",
        data: new Array(ordersData.length).fill(stats.totalProducts),
        borderColor: "#FFC107",
        backgroundColor: "rgba(255, 193, 7, 0.2)",
        fill: true,
        tension: 0.3,
      },
      {
        label: "Total Orders",
        data: new Array(ordersData.length).fill(stats.totalOrders),
        borderColor: "#FF5722",
        backgroundColor: "rgba(255, 87, 34, 0.2)",
        fill: true,
        tension: 0.3,
      },
      {
        label: "Total Users",
        data: new Array(ordersData.length).fill(stats.totalUsers),
        borderColor: "#03A9F4",
        backgroundColor: "rgba(3, 169, 244, 0.2)",
        fill: true,
        tension: 0.3,
      },
      {
        label: "Total Revenue",
        data: new Array(ordersData.length).fill(stats.totalRevenue),
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        fill: true,
        tension: 0.3,
      },
      {
        label: "Orders Over Time",
        data: ordersData,
        borderColor: "#FF5733",
        backgroundColor: "rgba(255, 87, 51, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
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
        <div className="bg-white p-6 shadow-lg rounded-lg border">
          <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">
            📈 All Stats in One Curve
          </h3>
          <Line data={lineChartData} />
        </div>
      </section>
    </div>
  );
}
