"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import TrustBar from "@/components/TrustBar";
import { products } from "@/lib/mock-data";

const categories = ["All", "T-Shirts", "Polos", "Hoodies", "Hats"];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const publicProducts = products.filter((p) => p.collection === "public");
  const filtered =
    activeCategory === "All"
      ? publicProducts
      : publicProducts.filter((p) => p.category === activeCategory);

  return (
    <>
      <section className="bg-[#1A1A1A] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold">Shop All Products</h1>
          <p className="text-gray-400 mt-2">
            Premium blanks and custom-ready apparel. No minimums required.
          </p>
        </div>
      </section>

      <TrustBar />

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filter sidebar */}
            <aside className="md:w-48 flex-shrink-0">
              <h3 className="font-heading font-semibold text-lg mb-4">Categories</h3>
              <ul className="flex md:flex-col gap-2 flex-wrap">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setActiveCategory(cat)}
                      className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${
                        activeCategory === cat
                          ? "bg-[#D35400] text-white"
                          : "bg-[#F5F3EF] text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </aside>

            {/* Product grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {filtered.length === 0 && (
                <p className="text-center text-gray-500 py-12">No products found in this category.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
