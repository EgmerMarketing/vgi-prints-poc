"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";

interface Variant {
  id: string;
  title: string;
  availableForSale: boolean;
}

interface Props {
  sizes: string[];
  variants: Variant[];
}

export default function AddToCartClient({ sizes, variants }: Props) {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const selectedVariant = variants.find((v) => v.title === selectedSize) ?? variants[0];

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    // TODO: wire to Shopify cart API / iron-session
    console.log("Add to cart:", { variantId: selectedVariant.id, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      {sizes.length > 0 && (
        <div className="mt-8">
          <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">Size</label>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => {
              const variant = variants.find((v) => v.title === size);
              const available = variant?.availableForSale ?? true;
              return (
                <button
                  key={size}
                  onClick={() => available && setSelectedSize(size)}
                  disabled={!available}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    selectedSize === size
                      ? "border-[#D35400] bg-[#D35400] text-white"
                      : available
                      ? "border-gray-300 text-gray-700 hover:border-[#D35400]"
                      : "border-gray-200 text-gray-300 cursor-not-allowed line-through"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-6">
        <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">Quantity</label>
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

      <button
        onClick={handleAddToCart}
        className="mt-8 w-full bg-[#D35400] hover:bg-[#b84700] text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-lg"
      >
        <ShoppingCart className="w-5 h-5" />
        {added ? "Added!" : "Add to Cart"}
      </button>
    </>
  );
}
