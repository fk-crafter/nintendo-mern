"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Player from "lottie-react";
import Cards, { Focused } from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import successAnimation from "@/public/lottieanimation/validation.json";
import { useForm } from "react-hook-form";
import useStore from "@/store/store";
import { ArrowLeft } from "lucide-react";

export default function PaymentPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [focus, setFocus] = useState<Focused | undefined>();
  const clearCart = useStore((state) => state.clearCart);

  // Récupération des valeurs du formulaire
  const cardNumber = watch("cardNumber", "");
  const cardHolder = watch("cardHolder", "");
  const expiryDate = watch("expiryDate", "");
  const cvc = watch("cvc", "");

  const onSubmit = useCallback(
    (data: any) => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setPaymentStatus("success");
        clearCart();
        setTimeout(() => router.push("/"), 5000);
      }, 2000);
    },
    [clearCart, router]
  );

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 relative">
      {/* Bouton retour */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-4 left-4 flex items-center text-gray-600 hover:text-gray-900 transition"
      >
        <ArrowLeft size={24} className="mr-2" />
        Retour
      </button>

      <h1 className="text-2xl font-bold mb-4 text-center">Paiement sécurisé</h1>

      {paymentStatus === "success" ? (
        <div className="text-center flex flex-col items-center mt-4">
          <Player
            autoplay
            loop={false}
            animationData={successAnimation}
            style={{ height: "150px", width: "150px" }}
          />
          <p className="text-green-700 font-bold mt-4">
            Paiement réussi ! Redirection...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
          {/* Carte bancaire interactive */}
          <div className="flex justify-center">
            <Cards
              number={cardNumber}
              name={cardHolder}
              expiry={expiryDate}
              cvc={cvc}
              focused={focus}
            />
          </div>

          {/* Champs du formulaire */}
          <div className="p-4 border rounded-lg">
            <label className="block text-sm font-medium text-gray-700">
              Numéro de carte
            </label>
            <input
              type="text"
              {...register("cardNumber", {
                required: "Numéro de carte requis",
              })}
              placeholder="4242 4242 4242 4242"
              className="w-full bg-gray-100 px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
              onFocus={() => setFocus("number" as Focused)}
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm">
                {errors.cardNumber?.message?.toString()}
              </p>
            )}
          </div>

          <div className="p-4 border rounded-lg">
            <label className="block text-sm font-medium text-gray-700">
              Nom du titulaire
            </label>
            <input
              type="text"
              {...register("cardHolder", { required: "Nom requis" })}
              placeholder="John Doe"
              className="w-full bg-gray-100 px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
              onFocus={() => setFocus("name" as Focused)}
            />
            {errors.cardHolder && (
              <p className="text-red-500 text-sm">
                {errors.cardHolder?.message?.toString()}
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <div className="p-4 border rounded-lg w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Expiration
              </label>
              <input
                type="text"
                {...register("expiryDate", {
                  required: "Date d'expiration requise",
                })}
                placeholder="MM/YY"
                className="w-full bg-gray-100 px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                onFocus={() => setFocus("expiry" as Focused)}
              />
              {errors.expiryDate && (
                <p className="text-red-500 text-sm">
                  {errors.expiryDate?.message?.toString()}
                </p>
              )}
            </div>
            <div className="p-4 border rounded-lg w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                CVC
              </label>
              <input
                type="text"
                {...register("cvc", { required: "CVC requis" })}
                placeholder="123"
                className="w-full bg-gray-100 px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
                onFocus={() => setFocus("cvc" as Focused)}
                onBlur={() => setFocus(undefined)}
              />
              {errors.cvc && (
                <p className="text-red-500 text-sm">
                  {errors.cvc?.message?.toString()}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-all"
            disabled={isLoading}
          >
            {isLoading ? "Traitement en cours..." : "Payer maintenant"}
          </button>
        </form>
      )}
    </div>
  );
}
