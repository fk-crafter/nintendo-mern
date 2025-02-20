"use client";

import { useState, useEffect } from "react";
import ConfirmModal from "@/components/ConfirmModal";

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
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/products");
      if (!res.ok) throw new Error("Error loading products.");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError("Error loading products.");
      console.error("Error loading products:", err);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!category) {
      setError("Please select a category.");
      setLoading(false);
      return;
    }

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

      if (!res.ok) throw new Error("Error adding product.");

      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setCategory("");
      setImage("");
      fetchProducts();
    } catch (err) {
      setError("Unable to add product.");
      console.error("Error adding product:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;

    try {
      const res = await fetch(
        `http://localhost:5001/api/products/${selectedProduct}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) throw new Error("Error deleting product.");

      setProducts(products.filter((p) => p._id !== selectedProduct));
    } catch (err) {
      setError("Failed to delete product.");
      console.error("Error deleting product:", err);
    } finally {
      setShowModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center p-6">
      <div className="max-w-4xl w-full bg-gray-100 rounded-lg shadow-xl p-6 border border-gray-700">
        <h2 className="text-4xl font-extrabold text-red-500 mb-6 text-center drop-shadow-lg">
          🎮 Nintendo Product Manager
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form
          onSubmit={handleAddProduct}
          className="bg-white p-6 shadow-md rounded-lg mb-6 border border-gray-300"
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            ➕ Add New Product
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-3 rounded-md w-full outline-none focus:ring-2 focus:ring-red-500"
              required
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-3 rounded-md w-full outline-none focus:ring-2 focus:ring-red-500 bg-white text-gray-700"
              required
            >
              <option value="" disabled hidden>
                Category
              </option>
              <option value="zelda">Zelda</option>
              <option value="mario">Mario</option>
              <option value="pokemon">Pokémon</option>
            </select>
          </div>

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-3 rounded-md w-full outline-none focus:ring-2 focus:ring-red-500 mt-4"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <input
              type="number"
              placeholder="Price (€)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border p-3 rounded-md w-full outline-none focus:ring-2 focus:ring-red-500"
              required
            />
            <input
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="border p-3 rounded-md w-full outline-none focus:ring-2 focus:ring-red-500"
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="border p-3 rounded-md w-full outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* ✅ Changement de couleur du bouton Add Product pour un rouge Nintendo plus marqué */}
          <button
            type="submit"
            disabled={loading}
            className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition-all duration-200 font-bold w-full mt-4"
          >
            {loading ? "Adding..." : "🎮 Add Product"}
          </button>
        </form>

        <div className="bg-white p-6 shadow-md rounded-lg border border-gray-300">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            📋 Product List
          </h3>

          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="flex items-center justify-between border border-gray-300 p-4 rounded-lg bg-gray-50 shadow-md"
              >
                <div>
                  <p className="font-bold text-lg text-gray-900">
                    {product.name}
                  </p>
                  <p className="text-gray-600">{product.price}€</p>
                </div>
                {/* ✅ Changement du bouton Delete pour mieux s'intégrer */}
                <button
                  onClick={() => {
                    setSelectedProduct(product._id);
                    setShowModal(true);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all shadow-md"
                >
                  🗑️ Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDeleteProduct}
        title="Confirm Deletion"
        message="Are you sure you want to delete this product? This action cannot be undone."
      />
    </div>
  );
}
