"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FeatureSteps } from "@/components/blocks/feature-section";

interface Feature {
  step: string;
  title: string;
  content: string;
  image: string;
}

const features: Feature[] = [
  {
    step: "Step 1",
    title: "Order Placed 🎉",
    content: "We have received your order and it is now being processed.",
    image:
      "https://images.unsplash.com/photo-1726137569772-791c3b20b4cf?q=80&w=2940&auto=format&fit=crop",
  },
  {
    step: "Step 2",
    title: "Preparing Your Order",
    content:
      "Our team is packing your items with care and getting them ready for shipment.",
    image:
      "https://images.unsplash.com/photo-1617909517054-64d4958be1c9?q=80&w=2940&auto=format&fit=crop",
  },
  {
    step: "Step 3",
    title: "Out for Delivery 🚚",
    content:
      "Your package is on its way! You will receive tracking details soon.",
    image:
      "https://images.unsplash.com/photo-1612630741022-b29ec17d013d?q=80&w=3087&auto=format&fit=crop",
  },
];

export default function OrderConfirmation() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("orderPassed", "true");
      router.push("/");
    }, 12000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg p-6 border-4 border-gray-900">
        <h1 className="text-3xl font-extrabold text-red-600 mb-6 text-center font-mono tracking-wider">
          Thank You for Your Order! 🎊
        </h1>
        <FeatureSteps
          features={features}
          title="What's Next?"
          autoPlayInterval={4000}
        />
      </div>
    </div>
  );
}
