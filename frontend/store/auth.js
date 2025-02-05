export const loginUser = async (email, password) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Échec de la connexion");

    localStorage.setItem("token", data.token); // Stocker le token JWT

    return data; // Retourner les infos utilisateur
  } catch (error) {
    console.error("Erreur de connexion :", error);
    return null;
  }
};
