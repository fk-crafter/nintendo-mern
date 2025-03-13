import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Package, ShoppingCart, Users, DollarSign } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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
    labels: ["Total Products", "Total Orders", "Total Users", "Total Revenue"],
    datasets: [
      {
        label: "Stats Overview",
        data: [
          stats.totalProducts,
          stats.totalOrders,
          stats.totalUsers,
          stats.totalRevenue / 10,
        ],
        backgroundColor: ["#FFC107", "#FF5722", "#03A9F4", "#4CAF50"],
        borderColor: ["#FFA000", "#E64A19", "#0288D1", "#388E3C"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <section className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Summary
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
          {[
            {
              icon: <Package size={30} />,
              value: stats.totalProducts,
              label: "Total Products",
            },
            {
              icon: <ShoppingCart size={30} />,
              value: stats.totalOrders,
              label: "Total Orders",
            },
            {
              icon: <Users size={30} />,
              value: stats.totalUsers,
              label: "Total Users",
            },
            {
              icon: <DollarSign size={30} />,
              value: `${stats.totalRevenue}€`,
              label: "Total Revenue",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-4 md:p-6 rounded-lg shadow-lg text-white bg-red-600 flex flex-col items-center border-4 border-white"
            >
              {item.icon}
              <p className="text-2xl md:text-4xl font-bold mt-2">
                {item.value}
              </p>
              <p className="text-base md:text-lg">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Statistics Overview
        </h2>
        <div className="bg-white p-4 md:p-6 shadow-lg rounded-lg border">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 text-center mb-4">
            📊 Overview of Stats
          </h3>
          <Bar data={barChartData} />
        </div>
      </section>
    </div>
  );
}
