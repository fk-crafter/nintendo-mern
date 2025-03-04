import { BlurFade } from "@/components/magicui/blur-fade";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { motion } from "motion/react";
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
      className="w-full max-w-sm flex flex-col items-center"
    >
      <Card className="relative overflow-hidden rounded-xl border border-gray-300 bg-white shadow-lg transition-all duration-200 hover:shadow-xl w-80">
        <CardHeader className="relative p-0">
          <BlurFade delay={0.2} inView>
            <Image
              src={product.image}
              alt={product.name}
              width={250}
              height={300}
              className="w-auto h-72 object-contain rounded-t-xl"
            />
          </BlurFade>
          <Badge className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
            {product.price}€
          </Badge>
        </CardHeader>

        <CardContent className="p-5 flex flex-col items-center text-center">
          <CardTitle className="text-xl font-semibold text-gray-900">
            {product.name}
          </CardTitle>
          <p className="text-gray-600 text-sm mt-2 mb-4">
            {product.description}
          </p>

          <div className="flex flex-col gap-3 w-full">
            <Button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition"
            >
              <FaShoppingCart className="mr-2" />{" "}
              {isAdding ? "Adding..." : "Add to Cart"}
            </Button>

            <Button
              variant="outline"
              asChild
              className="w-full border-gray-300 hover:bg-gray-100 transition"
            >
              <Link
                href={`/products/${product._id}`}
                className="text-gray-700 font-semibold"
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
