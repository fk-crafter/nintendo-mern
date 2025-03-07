"use client";

import { motion } from "motion/react";
import { ShieldCheck, Truck, CreditCard, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";

const Guarantees = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const guarantees = [
    {
      icon: <Truck size={40} className="text-red-500" />,
      title: "Fast & Free Shipping",
      description: "Enjoy free shipping on orders over $50 in the US.",
    },
    {
      icon: <CreditCard size={40} className="text-red-500" />,
      title: "100% Secure Payment",
      description: "Shop with confidence using our encrypted payment system.",
    },
    {
      icon: <ShieldCheck size={40} className="text-red-500" />,
      title: "Official & Exclusive Products",
      description:
        "Authentic, licensed collectibles you won’t find anywhere else.",
    },
    {
      icon: <RefreshCcw size={40} className="text-red-500" />,
      title: "Hassle-Free Returns",
      description: "30-day easy returns. Your satisfaction, guaranteed!",
    },
  ];

  return (
    <section className="py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold text-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Our Guarantees
        </motion.h2>
        <motion.p
          className="text-gray-600 mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Shop with peace of mind—our promises to you.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {guarantees.map((guarantee, index) => {
            const MotionWrapper = isMobile ? "div" : motion.div;
            const motionProps = isMobile
              ? {}
              : {
                  initial: { opacity: 0 },
                  whileInView: { opacity: 1 },
                  transition: {
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "easeOut",
                  },
                  viewport: { once: true },
                };

            return (
              <MotionWrapper
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center 
                           hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-300"
                {...motionProps}
              >
                {guarantee.icon}
                <h3 className="text-lg font-semibold mt-4">
                  {guarantee.title}
                </h3>
                <p className="text-gray-500 mt-2">{guarantee.description}</p>
              </MotionWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Guarantees;
