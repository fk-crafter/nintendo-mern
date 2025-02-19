"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { FaShoppingCart, FaEye } from "react-icons/fa";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart({ ...product, quantity: 1 });

    toast({
      title: "🛒 Added to Cart",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
      variant: "default",
    });

    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="w-full max-w-xs"
    >
      <Card className="relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all duration-200 hover:shadow-lg">
        <CardHeader className="relative p-0">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={200}
            className="w-full h-44 object-cover rounded-t-lg"
          />

          <Badge className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
            {product.price}€
          </Badge>
        </CardHeader>

        <CardContent className="p-4">
          <CardTitle className="text-lg font-semibold text-gray-800">
            {product.name}
          </CardTitle>
          <p className="text-gray-500 text-sm mt-1">{product.description}</p>

          <div className="flex gap-2 mt-4">
            <Button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md transition"
            >
              <FaShoppingCart className="mr-2" />{" "}
              {isAdding ? "Adding..." : "Add to Cart"}
            </Button>

            <Button
              variant="outline"
              asChild
              className="border-gray-300 hover:bg-gray-100 transition"
            >
              <Link
                href={`/products/${product._id}`}
                className="flex-1 text-gray-700 font-semibold"
              >
                <FaEye className="mr-2" /> View
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
