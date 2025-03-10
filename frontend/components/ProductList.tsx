"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

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
        const res = await fetch(
          "https://nintendo-backend-u0dz.onrender.com/api/products"
        );
        if (!res.ok) throw new Error("Erreur lors du chargement des produits");
        const data = await res.json();
        setProducts(data);
      } catch (error: unknown) {
        setError(
          error instanceof Error
            ? error.message
            : "Impossible de charger les produits"
        );
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
    <div id="products-section" className="p-6">
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

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          {Object.entries(filteredProducts).map(([category, items]) =>
            items.length > 0 ? (
              <motion.section
                key={category}
                className="mb-12"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-4 capitalize">
                  {category} Collection
                </h2>
                <Swiper
                  modules={[Navigation]}
                  spaceBetween={40}
                  slidesPerView={1}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                  }}
                  navigation
                  className="relative !overflow-visible"
                >
                  {items.map((product) => (
                    <SwiperSlide key={product._id}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        viewport={{ once: true }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </motion.section>
            ) : null
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ProductList;
