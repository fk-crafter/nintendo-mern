"use client";

import { useCart } from "@/context/CartContext";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { ArrowLeft, ShoppingBag, Percent, Truck } from "lucide-react";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promoError, setPromoError] = useState("");
  const [discount, setDiscount] = useState(0);
  const [shippingCost, setShippingCost] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const subtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart]
  );
  const total = useMemo(
    () => Math.max(0, subtotal + shippingCost - discount),
    [subtotal, shippingCost, discount]
  );

  const applyPromoCode = () => {
    setPromoError("");
    setDiscount(0);
    if (!promoCode.trim()) return;

    if (promoCode.toUpperCase() === "DISCOUNT15") {
      if (subtotal < 30) {
        setPromoError("Minimum order amount of 30€ required.");
        return;
      }
      setDiscount(Number((subtotal * 0.15).toFixed(2)));
      toast.success("15% discount applied!");
    } else {
      setPromoError("Invalid promo code.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cart.length) {
      setError("Your cart is empty.");
      return;
    }

    if (!name.trim() || !email.trim() || !address.trim()) {
      setError("Please complete name, email and address.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      const payload = {
        products: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Order failed.");
      }

      clearCart();
      toast.success("🎉 Order placed successfully!");
      router.push("/confirmation");
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Order failed.");
      toast.error("❌ Error during the order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-gray-200 p-6 relative">
        <button
          onClick={() => router.back()}
          className="absolute -top-4 -left-4 bg-red-600 text-white rounded-full border-4 border-white shadow-md p-2 hover:bg-red-700"
          aria-label="Back"
          title="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h1 className="text-3xl font-extrabold text-center text-red-600 mb-6">
          Checkout
        </h1>

        {!cart.length ? (
          <p className="text-center text-gray-600">Your cart is empty. 🛒</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="bg-gray-50 p-4 rounded-lg border">
                <h2 className="text-lg font-semibold flex items-center gap-2 mb-3">
                  <ShoppingBag className="w-5 h-5 text-red-600" />
                  Contact & Shipping
                </h2>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Full name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Street, City, ZIP"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Shipping
                    </label>
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-gray-500" />
                      <select
                        className="border rounded-md px-3 py-2"
                        value={shippingCost}
                        onChange={(e) =>
                          setShippingCost(Number(e.target.value))
                        }
                      >
                        <option value={5}>Standard (3–5j) – 5€</option>
                        <option value={10}>Express (1–2j) – 10€</option>
                        <option value={0}>Pickup – 0€</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border">
                <h2 className="text-lg font-semibold flex items-center gap-2 mb-3">
                  <Percent className="w-5 h-5 text-red-600" />
                  Promo code
                </h2>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="DISCOUNT15"
                  />
                  <button
                    type="button"
                    onClick={applyPromoCode}
                    className="px-4 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="mt-2 text-sm text-red-600">{promoError}</p>
                )}
              </div>

              {error && (
                <p className="text-center text-red-600 font-medium">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-md bg-red-600 text-white font-semibold shadow hover:bg-red-700 active:scale-[0.98] transition"
              >
                {loading ? "Processing..." : "Confirm Order"}
              </button>
            </form>

            <div className="space-y-4">
              <div className="bg-white border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3">Order summary</h3>
                <ul className="divide-y">
                  {cart.map((item) => (
                    <li key={item.id} className="flex gap-3 py-3 items-center">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={56}
                        height={56}
                        className="rounded-md border object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          Qty {item.quantity}
                        </p>
                      </div>
                      <div className="font-semibold">
                        {(item.price * item.quantity).toFixed(2)}€
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 border rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{subtotal.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{shippingCost.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Discount</span>
                  <span>-{discount.toFixed(2)}€</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{total.toFixed(2)}€</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
