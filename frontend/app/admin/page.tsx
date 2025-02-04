"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    if (status === "loading") return;

    if (!session || session.user.role !== "admin") {
      router.push("/"); // Redirige les non-admins vers l'accueil
      return;
    }

    console.log("🛠️ Token envoyé :", session.accessToken);

    // Récupérer les stats depuis l'API backend
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/admin/stats", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });
        const data = await res.json();
        console.log("📊 Stats reçues :", data);
        setStats(data);
      } catch (error) {
        console.error("❌ Erreur lors du chargement des stats :", error);
      }
    };

    fetchStats();
  }, [session, status]);

  if (status === "loading" || !stats) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard Admin</h1>

      {/* Bouton Retour à l'accueil */}
      <button
        onClick={() => router.push("/")}
        className="bg-blue-500 text-white p-2 rounded-md mt-4"
      >
        Retour à l'accueil
      </button>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="p-4 bg-gray-200 rounded-lg">
          <h2 className="text-xl font-semibold">Utilisateurs</h2>
          <p className="text-2xl">{stats.totalUsers}</p>
        </div>
        <div className="p-4 bg-gray-200 rounded-lg">
          <h2 className="text-xl font-semibold">Produits</h2>
          <p className="text-2xl">{stats.totalProducts}</p>
        </div>
        <div className="p-4 bg-gray-200 rounded-lg">
          <h2 className="text-xl font-semibold">Revenus</h2>
          <p className="text-2xl">${stats.totalRevenue}</p>
        </div>
      </div>
    </div>
  );
}
