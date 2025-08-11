"use client";

import { useState } from "react";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import { products } from "@/lib/constant";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="px-10 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8 text-left">
          Breville
        </h1>

        <ProductGrid products={filteredProducts} />
      </main>
    </div>
  );
}
