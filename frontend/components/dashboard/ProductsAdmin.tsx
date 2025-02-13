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

      setProducts(
        products.filter((product) => product._id !== selectedProduct)
      );
      setShowModal(false);
    } catch (err) {
      setError("Unable to delete product.");
      console.error("Error deleting product:", err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">📦 Product Management</h2>

      {error && <p className="text-red-500">{error}</p>}

      <form
        onSubmit={handleAddProduct}
        className="mb-6 bg-gray-100 text-black p-4 rounded-md"
      >
        <input
          type="text"
          placeholder="Name"
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
          placeholder="Price"
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
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 w-full rounded-md mb-2"
        />
        <input
          type="text"
          placeholder="Image URL"
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
          {loading ? "Adding..." : "Add Product"}
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
              onClick={() => {
                setSelectedProduct(product._id);
                setShowModal(true);
              }}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
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
