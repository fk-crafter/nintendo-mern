"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const categories = ["all", "zelda", "mario", "pokemon"];

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/products");
        if (!res.ok) throw new Error("Erreur lors du chargement des produits");
        const data = await res.json();
        setProducts(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Impossible de charger les produits");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getFilteredProducts = () => {
    if (selectedCategory === "all") {
      return {
        zelda: products.filter(
          (product) => product.category.toLowerCase() === "zelda"
        ),
        mario: products.filter(
          (product) => product.category.toLowerCase() === "mario"
        ),
        pokemon: products.filter(
          (product) => product.category.toLowerCase() === "pokemon"
        ),
      };
    } else {
      return {
        [selectedCategory]: products.filter(
          (product) => product.category.toLowerCase() === selectedCategory
        ),
      };
    }
  };

  const filteredProducts = getFilteredProducts();

  if (loading)
    return (
      <p className="text-center text-gray-500 text-lg">Loading products...</p>
    );
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <div className="flex justify-center space-x-4 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-bold transition ${
              selectedCategory === category
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {category === "all"
              ? "All"
              : category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {Object.entries(filteredProducts).map(([category, items]) =>
        items.length > 0 ? (
          <section key={category} className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 capitalize">
              {category} Collection
            </h2>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {items.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </motion.div>
          </section>
        ) : null
      )}
    </div>
  );
};

export default ProductList;
