"use client";

import { useState, useEffect, useRef } from "react";
import ConfirmModal from "@/components/ConfirmModal";
import {
  Pencil,
  Trash2,
  Gamepad2,
  PlusCircle,
  Edit3,
  List,
} from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";

interface Product {
  id: string; // Prisma => id
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
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
      if (!res.ok) throw new Error("Error loading products.");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError("Error loading products.");
      console.error("Error loading products:", err);
    }
  };

  const toggleView = () => {
    setIsFormVisible((prev) => !prev);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0]);
    }
  };

  const handleEditProduct = (product: Product) => {
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price.toString());
    setStock(product.stock.toString());
    setCategory(product.category);
    setImage(product.image);
    setSelectedProduct(product.id);
    setIsEditing(true);
    setIsFormVisible(true);
    setToastMessage("Product ready for editing");
    setTimeout(() => setToastMessage(null), 3000);
  };
  // ------------------------------------

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Error while uploading image");

      const data = await res.json();
      setImage(data.imageUrl);
    } catch (err) {
      console.error(err);
      alert("Failed to upload image !");
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
      const url = isEditing
        ? `${process.env.NEXT_PUBLIC_API_URL}/products/${selectedProduct}`
        : `${process.env.NEXT_PUBLIC_API_URL}/products`;

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

      // reset form
      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setCategory("");
      setImage("");
      setIsEditing(false);
      setSelectedProduct(null);
      await fetchProducts();
      setIsFormVisible(false);
    } catch (err) {
      setError(
        isEditing ? "Unable to update product." : "Unable to add product."
      );
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${selectedProduct}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) throw new Error("Error deleting product.");

      setProducts((prev) => prev.filter((p) => p.id !== selectedProduct));
    } catch (err) {
      setError("Failed to delete product.");
      console.error("Error deleting product:", err);
    } finally {
      setShowModal(false);
      setSelectedProduct(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <div className="w-full max-w-5xl md:max-w-6xl bg-white rounded-lg shadow-xl p-8 border border-red-800">
        {toastMessage && (
          <div className="fixed bottom-6 z-50 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-3 px-6 rounded-md shadow-md">
            <p>{toastMessage}</p>
          </div>
        )}
        <h2 className="text-4xl font-extrabold text-red-800 mb-6 text-center drop-shadow-lg flex items-center justify-center gap-2">
          <Gamepad2 size={32} /> Product Management
        </h2>

        <button
          onClick={toggleView}
          className="mb-4 bg-red-700 text-white py-2 px-4 rounded-md hover:bg-red-800 flex items-center gap-2 transition-all duration-300"
        >
          <motion.div
            key={isFormVisible ? "list-icon" : "plus-icon"}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {isFormVisible ? <List size={20} /> : <PlusCircle size={20} />}
          </motion.div>
          {isFormVisible ? "View Products" : "Add Product"}
        </button>

        {error && <p className="text-red-700 text-center">{error}</p>}

        <motion.div
          key={isFormVisible ? "form-section" : "product-list"}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
        >
          {isFormVisible ? (
            <motion.form
              onSubmit={handleAddOrUpdateProduct}
              className="bg-gray-50 p-6 shadow-md rounded-lg mb-6 border border-gray-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
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
                  className="border border-red-300 p-3 rounded-md w-full outline-none focus:ring-2 focus:ring-red-700"
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
                className="border p-3 rounded-md w-full outline-none focus:ring-2 focus:ring-red-700 mt-4 resize-none"
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
                      width={1000}
                      height={1000}
                      src={image}
                      alt="Uploaded"
                      className="w-full max-h-48 object-cover rounded-md shadow-md"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-5">
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
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setName("");
                    setDescription("");
                    setPrice("");
                    setStock("");
                    setCategory("");
                    setImage("");
                  }}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              className="bg-white p-6 shadow-md rounded-lg border border-gray-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-red-800 mb-4">
                Product List
              </h3>
              {["zelda", "mario", "pokemon"].map(
                (category) =>
                  products.some((product) => product.category === category) && (
                    <div key={category} className="mb-6">
                      <h4 className="text-2xl font-bold text-gray-800 mb-4 capitalize">
                        {category}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products
                          .filter((product) => product.category === category)
                          .map((product) => (
                            <div
                              key={product.id}
                              className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200 relative"
                            >
                              <div className="relative">
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  width={500}
                                  height={300}
                                  className="w-full h-60 object-cover"
                                />
                                <button
                                  className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                                  onClick={() => {
                                    setSelectedProduct(product.id);
                                    setShowModal(true);
                                  }}
                                >
                                  <Trash2 className="text-red-500" size={18} />
                                </button>
                              </div>

                              <div className="p-4">
                                <h3 className="text-lg font-bold text-gray-800">
                                  {product.name}
                                </h3>
                                <p className="text-sm text-gray-500 mb-3">
                                  {product.description}
                                </p>
                                <div className="flex justify-between items-center">
                                  <span className="text-lg font-semibold text-red-600">
                                    {product.price}€
                                  </span>
                                  <button
                                    onClick={() => handleEditProduct(product)}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 flex items-center gap-1"
                                  >
                                    <Pencil size={16} /> Edit
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )
              )}
            </motion.div>
          )}
        </motion.div>
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
