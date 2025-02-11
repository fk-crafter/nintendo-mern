"use client";

import { useState, useEffect } from "react";

interface Product {
  _id: string;
  name: string;
  description: string;
  stock: number;
  category: string;
  price: number;
  image: string;
}

export default function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError("Erreur lors du chargement des produits.");
      console.error("Erreur lors du chargement des produits:", err);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5001/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name,
          description,
          price: parseFloat(price),
          stock: parseInt(stock),
          category,
          image,
        }),
      });

      if (!res.ok) throw new Error("Erreur lors de l'ajout du produit.");

      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setCategory("");
      setImage("");
      fetchProducts();
    } catch (err) {
      setError("Impossible d'ajouter le produit.");
      console.error("Erreur lors de l'ajout du produit:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer ce produit ?")) return;

    try {
      const res = await fetch(`http://localhost:5001/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Erreur lors de la suppression du produit.");

      fetchProducts();
    } catch (err) {
      setError("Impossible de supprimer le produit.");
      console.error("Erreur lors de la suppression du produit:", err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">📦 Gestion des Produits</h2>

      {error && <p className="text-red-500">{error}</p>}

      <form
        onSubmit={handleAddProduct}
        className="mb-6 bg-gray-100 text-black p-4 rounded-md"
      >
        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-2"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full mb-2"
          required
        />
        <input
          type="number"
          placeholder="Prix"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 w-full mb-2"
          required
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="border p-2 w-full rounded-md mb-2"
        />
        <input
          type="text"
          placeholder="Catégorie"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 w-full rounded-md mb-2"
        />
        <input
          type="text"
          placeholder="URL de l'image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border p-2 w-full mb-2"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Ajout en cours..." : "Ajouter le produit"}
        </button>
      </form>

      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="border p-4 rounded-md flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{product.name}</p>
              <p className="text-gray-600">{product.price}€</p>
            </div>
            <button
              onClick={() => handleDeleteProduct(product._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
