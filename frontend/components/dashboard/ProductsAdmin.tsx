"use client";

import { useState, useEffect } from "react";
import ConfirmModal from "@/components/ConfirmModal";
import { Pencil, Trash2, Gamepad2, PlusCircle, Edit3 } from "lucide-react";
import { useRef } from "react";
import Image from "next/image";

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
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

      const res = await fetch(`${API_URL}/api/products`);
      if (!res.ok) throw new Error("Error loading products.");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError("Error loading products.");
      console.error("Error loading products:", err);
    }
  };

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

      const res = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Erreur lors de l'upload de l'image");

      const data = await res.json();
      setImage(data.imageUrl);
    } catch (err) {
      console.error(err);
      alert("Échec de l'upload de l'image !");
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleImageUpload(e.target.files[0]);
    }
  };

  const handleAddOrUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!category) {
      setError("Please select a category.");
      setLoading(false);
      return;
    }

    try {
      const method = isEditing ? "PUT" : "POST";
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

      const url = isEditing
        ? `${API_URL}/api/products/${selectedProduct}`
        : `${API_URL}/api/products`;

      const res = await fetch(url, {
        method,
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

      if (!res.ok)
        throw new Error(
          isEditing ? "Error updating product." : "Error adding product."
        );

      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setCategory("");
      setImage("");
      setIsEditing(false);
      setSelectedProduct(null);
      fetchProducts();
    } catch (err) {
      setError(
        isEditing ? "Unable to update product." : "Unable to add product."
      );
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price.toString());
    setStock(product.stock.toString());
    setCategory(product.category);
    setImage(product.image);
    setSelectedProduct(product._id);
    setIsEditing(true);
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;

    try {
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

      const res = await fetch(`${API_URL}/api/products/${selectedProduct}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Error deleting product.");

      setProducts(products.filter((p) => p._id !== selectedProduct));
    } catch (err) {
      setError("Failed to delete product.");
      console.error("Error deleting product:", err);
    } finally {
      setShowModal(false);
      setSelectedProduct(null);
    }
  };

  return (
    <div className="min-h-screen  flex flex-col items-center p-6">
      <div className="w-full max-w-lg md:max-w-4xl bg-white rounded-lg shadow-xl p-6 border border-red-800">
        <h2 className="text-4xl font-extrabold text-red-800 mb-6 text-center drop-shadow-lg flex items-center justify-center gap-2">
          <Gamepad2 size={32} /> Product Management
        </h2>

        {error && <p className="text-red-700 text-center">{error}</p>}

        <form
          onSubmit={handleAddOrUpdateProduct}
          className="bg-gray-50 p-6 shadow-md rounded-lg mb-6 border border-gray-300"
        >
          <h3 className="text-xl font-semibold mb-4 text-red-800 flex items-center gap-2">
            {isEditing ? <Edit3 size={20} /> : <PlusCircle size={20} />}
            {isEditing ? "Edit Product" : "Add New Product"}
          </h3>

          <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 p-3 rounded-md w-full outline-none focus:ring-2 focus:ring-red-500"
              required
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-red-300 p-3 rounded-md w-full outline-none focus:ring-2 focus:ring-red-700  "
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
            className="border  p-3 rounded-md w-full outline-none focus:ring-2 focus:ring-red-700 mt-4 resize-none"
            required
          />

          <div className="flex flex-col gap-4 mt-4 md:grid md:grid-cols-3">
            <input
              type="number"
              placeholder="Price (€)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border mt-5 border-gray-300 p-6 h-11 rounded-md w-full outline-none focus:ring-2 focus:ring-red-500"
              required
            />
            <input
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="border mt-5 border-gray-300 p-6 h-11 rounded-md w-full outline-none focus:ring-2 focus:ring-red-500"
              required
            />

            <div
              onClick={handleClick}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="border border-dashed border-red-300 p-6 rounded-md w-full outline-none focus:ring-2 focus:ring-red-700 bg-white text-red-800 text-center cursor-pointer"
            >
              <p>Drag and drop an image here or click to select a file</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {image && (
              <div className="mt-4">
                <Image
                  src={image}
                  alt="Uploaded"
                  className="w-full max-h-48 object-cover rounded-md shadow-md"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-red-700 text-white py-3 mt-4 rounded-lg shadow-md hover:bg-red-800 transition-all duration-200 font-bold w-full md:w-auto px-6 flex items-center gap-2 justify-center"
          >
            {loading ? (
              "Processing..."
            ) : isEditing ? (
              <>
                <Edit3 size={20} /> Update Product
              </>
            ) : (
              <>
                <PlusCircle size={20} /> Add Product
              </>
            )}
          </button>
        </form>

        <div className="bg-white p-6 shadow-md rounded-lg border border-gray-300">
          <h3 className="text-2xl font-bold text-red-800 mb-4">Product List</h3>

          {products.some((product) => product.category === "zelda") && (
            <div className="mb-6">
              <h4 className="text-xl font-bold text-red-800 mb-2">Zelda</h4>
              <div className="space-y-4">
                {products
                  .filter((product) => product.category === "zelda")
                  .map((product) => (
                    <div
                      key={product._id}
                      className="flex flex-col md:flex-row items-center justify-between border border-gray-300 p-4 rounded-lg bg-white shadow-md gap-3"
                    >
                      <div>
                        <p className="font-bold text-red-800">{product.name}</p>
                        <p className="text-red-600">{product.price}€</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 flex items-center gap-1"
                        >
                          <Pencil size={16} /> Edit
                        </button>
                        <button
                          onClick={() => {
                            setSelectedProduct(product._id);
                            setShowModal(true);
                          }}
                          className="bg-red-700 text-white px-3 py-1 rounded-md hover:bg-red-800 flex items-center gap-1"
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {products.some((product) => product.category === "mario") && (
            <div className="mb-6">
              <h4 className="text-xl font-bold text-red-800 mb-2">Mario</h4>
              <div className="space-y-4">
                {products
                  .filter((product) => product.category === "mario")
                  .map((product) => (
                    <div
                      key={product._id}
                      className="flex flex-col md:flex-row items-center justify-between border border-gray-300 p-4 rounded-lg bg-white shadow-md gap-3"
                    >
                      <div>
                        <p className="font-bold text-red-800">{product.name}</p>
                        <p className="text-red-600">{product.price}€</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 flex items-center gap-1"
                        >
                          <Pencil size={16} /> Edit
                        </button>
                        <button
                          onClick={() => {
                            setSelectedProduct(product._id);
                            setShowModal(true);
                          }}
                          className="bg-red-700 text-white px-3 py-1 rounded-md hover:bg-red-800 flex items-center gap-1"
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {products.some((product) => product.category === "pokemon") && (
            <div className="mb-6">
              <h4 className="text-xl font-bold text-red-800 mb-2">Pokémon</h4>
              <div className="space-y-4">
                {products
                  .filter((product) => product.category === "pokemon")
                  .map((product) => (
                    <div
                      key={product._id}
                      className="flex flex-col md:flex-row items-center justify-between border border-gray-300 p-4 rounded-lg bg-white shadow-md gap-3"
                    >
                      <div>
                        <p className="font-bold text-red-800">{product.name}</p>
                        <p className="text-red-600">{product.price}€</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 flex items-center gap-1"
                        >
                          <Pencil size={16} /> Edit
                        </button>
                        <button
                          onClick={() => {
                            setSelectedProduct(product._id);
                            setShowModal(true);
                          }}
                          className="bg-red-700 text-white px-3 py-1 rounded-md hover:bg-red-800 flex items-center gap-1"
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDeleteProduct}
        title="Confirm Deletion"
        message="Are you sure you want to delete this product?"
      />
    </div>
  );
}
