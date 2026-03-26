"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ShoppingCart, ChevronLeft, Package, Truck, RotateCcw } from "lucide-react";
import { getProductByHandle } from "@/lib/mock-data";

export default function ProductDetailPage() {
  const { handle } = useParams<{ handle: string }>();
  const product = getProductByHandle(handle);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-2xl font-bold">Product not found</h1>
        <Link href="/shop" className="text-[#D35400] hover:underline mt-4 inline-block">
          Back to shop
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#D35400] transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
              {product.category}
            </p>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-[#1A1A1A]">
              {product.name}
            </h1>
            <p className="text-3xl font-bold text-[#D35400] mt-4">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-600 leading-relaxed mt-6">{product.description}</p>

            {/* Size selector */}
            <div className="mt-8">
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">Size</label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? "border-[#D35400] bg-[#D35400] text-white"
                        : "border-gray-300 text-gray-700 hover:border-[#D35400]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-6">
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center text-lg hover:border-[#D35400] transition-colors"
                >
                  -
                </button>
                <span className="w-10 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center text-lg hover:border-[#D35400] transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button className="mt-8 w-full bg-[#D35400] hover:bg-[#b84700] text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-lg">
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>

            {/* Trust strip */}
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-gray-200 pt-6">
              {[
                { icon: Package, label: "No Minimums" },
                { icon: Truck, label: "Ships in 5-7 Days" },
                { icon: RotateCcw, label: "Free Returns" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center text-center gap-1">
                  <item.icon className="w-5 h-5 text-[#D35400]" />
                  <span className="text-xs text-gray-600 font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
