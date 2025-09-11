"use client";

import { Calendar, Wallet } from "lucide-react";

interface Order {
  id: string;
  products: { product: { name: string; price: number }; quantity: number }[];
  totalPrice: number;
  createdAt: string;
  promoApplied: boolean;
}

export const OrderCard = ({ order }: { order: Order }) => {
  const discount =
    order.promoApplied && order.totalPrice >= 30 ? order.totalPrice * 0.15 : 0;

  const finalTotal = order.totalPrice - discount;

  return (
    <div className="border border-gray-300 rounded-xl bg-white p-4 md:p-6 shadow-sm w-full">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
        <p className="text-gray-700 text-sm flex items-center gap-2">
          <Calendar size={18} />
          <span>
            Ordered on{" "}
            <span className="text-gray-900 font-semibold">
              {new Date(order.createdAt).toLocaleDateString()}
            </span>
          </span>
        </p>

        <span className="mt-2 md:mt-0 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full w-fit">
          ✅ Delivered
        </span>
      </div>

      <ul className="border-t pt-4 space-y-3 text-sm">
        {order.products.map(({ product, quantity }) => (
          <li key={product.name} className="flex justify-between items-center">
            <div className="text-gray-800 font-medium">
              {product.name}
              <span className="text-gray-500"> × {quantity}</span>
            </div>
            <div className="font-bold text-gray-900">
              {(product.price * quantity).toFixed(2)}€
            </div>
          </li>
        ))}
      </ul>

      {discount > 0 && (
        <div className="text-green-600 text-right mt-2 text-sm font-medium">
          -{discount.toFixed(2)}€ promo discount applied
        </div>
      )}

      <div className="mt-4 border-t pt-4 flex justify-end items-center text-base md:text-lg font-bold text-gray-900">
        <Wallet size={20} className="mr-2 text-red-600" />
        Total:{" "}
        <span className="ml-2 text-red-600">{finalTotal.toFixed(2)}€</span>
      </div>
    </div>
  );
};
