import Navbar from "@/components/Navbar";
import ProductList from "@/components/ProductList";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="p-6">
        <h1 className="text-3xl font-bold">Bienvenue sur MonShop 🛒</h1>
        <h1 className="text-3xl font-bold text-center mb-6">Nos Produits</h1>
        <ProductList />
      </main>
    </div>
  );
}
