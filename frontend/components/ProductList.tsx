"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface Product {
  id: string;
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
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
        zelda: products.filter((p) => p.category.toLowerCase() === "zelda"),
        mario: products.filter((p) => p.category.toLowerCase() === "mario"),
        pokemon: products.filter((p) => p.category.toLowerCase() === "pokemon"),
      };
    } else {
      return {
        [selectedCategory]: products.filter(
          (p) => p.category.toLowerCase() === selectedCategory
        ),
      };
    }
  };

  const filteredProducts = getFilteredProducts();

  if (loading)
    return (
      <p className="text-center text-gray-500 text-lg animate-pulse">
        Loading products...
      </p>
    );
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div id="products-section" className="p-8 max-w-7xl mx-auto">
      {/* Boutons catégories */}
      <div className="flex justify-center flex-wrap gap-3 mb-8">
        {categories.map((category) => (
          <motion.button
            key={category}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2 rounded-full font-semibold shadow-md transition-all duration-300 ${
              selectedCategory === category
                ? "bg-red-600 text-white shadow-red-300"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {category === "all"
              ? "All"
              : category.charAt(0).toUpperCase() + category.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Produits */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          {Object.entries(filteredProducts).map(([category, items]) =>
            items.length > 0 ? (
              <motion.section
                key={category}
                className="mb-16"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-extrabold text-gray-900 mb-6 text-center capitalize drop-shadow-sm">
                  {category} Collection
                </h2>
                <Swiper
                  modules={[Navigation]}
                  spaceBetween={24}
                  slidesPerView={1}
                  breakpoints={{
                    640: { slidesPerView: 2, spaceBetween: 24 },
                    768: { slidesPerView: 3, spaceBetween: 28 },
                    1024: { slidesPerView: 4, spaceBetween: 32 },
                  }}
                  navigation
                  className="relative !overflow-visible"
                >
                  {items.map((product) => (
                    <SwiperSlide key={product.id}>
                      <motion.div
                        className="h-full px-2 md:px-3 lg:px-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
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
