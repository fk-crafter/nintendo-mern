"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useStore from "../../store/store";
import Image from "next/image";

const CheckoutPage = () => {
  const cart = useStore((state) => state.cart);
  const router = useRouter();

  useEffect(() => {
    if (cart.length === 0) {
      router.push("/");
    }
  }, [cart, router]);

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price, 0).toFixed(2);

  const handleProceedToPayment = () => {
    router.push("/payment");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-4 text-center">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                className="w-20 h-20 rounded object-cover"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-500">€{item.price.toFixed(2)}</p>
              </div>
              <span className="text-lg font-bold">
                €{item.price.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between text-lg mb-2">
            <span>Subtotal</span>
            <span>€{calculateTotal()}</span>
          </div>
          <div className="flex justify-between text-lg mb-2">
            <span>Shipping</span>
            <span>€0.00</span>
          </div>
          <div className="flex justify-between text-lg font-bold mb-4">
            <span>Total</span>
            <span>€{calculateTotal()}</span>
          </div>
          <button
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
            onClick={handleProceedToPayment}
          >
            Proceed to Payment
          </button>
          <button
            className="w-full bg-gray-200 text-gray-700 py-2 mt-2 rounded-lg hover:bg-gray-300 transition-colors"
            onClick={() => router.push("/")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
