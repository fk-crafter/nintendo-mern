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
    <motion.div whileHover={{ scale: 1.03 }} className="w-full max-w-xs">
      <Card className="shadow-lg hover:shadow-xl transition duration-300">
        <CardHeader className="relative">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={200}
            className="w-full h-40 object-cover rounded-t-md"
          />
          <Badge className="absolute top-2 left-2 bg-red-600 text-white">
            {product.price}€
          </Badge>
        </CardHeader>

        <CardContent className="p-4">
          <CardTitle className="text-lg font-bold">{product.name}</CardTitle>
          <p className="text-gray-500 text-sm mt-1">{product.description}</p>

          <div className="flex gap-2 mt-4">
            <Button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              <FaShoppingCart className="mr-2" />{" "}
              {isAdding ? "Adding..." : "Add to Cart"}
            </Button>

            <Button variant="outline" asChild>
              <Link href={`/products/${product._id}`} className="flex-1">
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
