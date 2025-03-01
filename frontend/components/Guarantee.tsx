import { ShieldCheck, Truck, CreditCard, RefreshCcw } from "lucide-react";

const Guarantees = () => {
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
        <h2 className="text-3xl font-bold text-gray-800">Our Guarantees</h2>
        <p className="text-gray-600 mt-2">
          Shop with peace of mind—our promises to you.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {guarantees.map((guarantee, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center 
                         hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-300"
            >
              {guarantee.icon}
              <h3 className="text-lg font-semibold mt-4">{guarantee.title}</h3>
              <p className="text-gray-500 mt-2">{guarantee.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Guarantees;
