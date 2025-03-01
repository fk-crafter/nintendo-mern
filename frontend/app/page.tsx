"use client";

import Navbar from "@/components/Navbar";
import ProductList from "@/components/ProductList";
import WelcomeNotification from "@/components/WelcomeNotification";
import HeroSection from "@/components/HeroSection";
import ImageCollection from "@/components/ImageCollection";
import Footer from "@/components/Footer";
import Guarantees from "@/components/Guarantee";

export default function Home() {
  return (
    <div>
      <Navbar />
      <WelcomeNotification />
      <HeroSection />
      <Guarantees />
      <ImageCollection />
      <main className="p-6 mt-12">
        <ProductList />
      </main>
      <Footer />
    </div>
  );
}
