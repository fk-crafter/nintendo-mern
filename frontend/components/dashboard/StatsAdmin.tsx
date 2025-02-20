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

const generateFakeData = (days: number, maxValue: number) => {
  return Array.from({ length: days }, () =>
    Math.floor(Math.random() * maxValue)
  );
};

export default function StatsAdmin() {
  const [stats, setStats] = useState({
    totalProducts: 100,
    totalOrders: 50,
    totalUsers: 30,
    totalRevenue: 1200,
    ordersOverTime: generateFakeData(10, 100),
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setTimeout(() => {
        setStats({
          totalProducts: 100,
          totalOrders: 50,
          totalUsers: 30,
          totalRevenue: 1200,
          ordersOverTime: generateFakeData(10, 100),
        });
      }, 1000);
    } catch (err) {
      console.error("Error loading statistics:", err);
    }
  };

  const lineChartData = {
    labels: Array.from(
      { length: stats.ordersOverTime.length },
      (_, i) => `Day ${i + 1}`
    ),
    datasets: [
      {
        label: "Orders Over Time",
        data: stats.ordersOverTime,
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
          Orders Evolution
        </h2>
        <div className="bg-white p-6 shadow-lg rounded-lg border">
          <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">
            📈 Orders Over Time
          </h3>
          <Line data={lineChartData} />
        </div>
      </section>
    </div>
  );
}
