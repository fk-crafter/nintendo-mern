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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="max-w-4xl w-full">
        <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
          📦 Product Management
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form
          onSubmit={handleAddProduct}
          className="bg-white p-6 shadow-md rounded-lg mb-6"
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
              className="border p-2 rounded-md w-full outline-none focus:ring-2 focus:ring-red-500"
              required
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-2 rounded-md w-full outline-none focus:ring-2 focus:ring-red-500 bg-white text-black"
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
            className="border p-2 rounded-md w-full outline-none focus:ring-2 focus:ring-red-500 mt-4"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <input
              type="number"
              placeholder="Price (€)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border p-2 rounded-md w-full outline-none focus:ring-2 focus:ring-red-500"
              required
            />
            <input
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="border p-2 rounded-md w-full outline-none focus:ring-2 focus:ring-red-500"
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="border p-2 rounded-md w-full outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition font-bold w-full mt-4"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>

        <div className="bg-white p-6 shadow-md rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            📋 Products List
          </h3>

          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="flex items-center justify-between border p-4 rounded-md bg-gray-50 shadow-sm"
              >
                <div>
                  <p className="font-semibold text-gray-800">{product.name}</p>
                  <p className="text-gray-600">{product.price}€</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedProduct(product._id);
                    setShowModal(true);
                  }}
                  className="bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700 transition"
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
        onConfirm={() => {
          setProducts(products.filter((p) => p._id !== selectedProduct));
          setShowModal(false);
        }}
        title="Confirm Deletion"
        message="Are you sure you want to delete this product? This action cannot be undone."
      />
    </div>
  );
}
