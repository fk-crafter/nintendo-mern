"use client";

import Link from "next/link";
import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={200}
        className="w-full h-40 object-cover rounded-md"
      />
      <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
      <p className="text-gray-500 text-sm">{product.description}</p>
      <p className="text-xl font-bold mt-2 text-blue-500">{product.price}€</p>
      <Link
        href={`/products/${product._id}`}
        className="mt-3 block text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Voir le produit
      </Link>
    </div>
  );
};

export default ProductCard;
