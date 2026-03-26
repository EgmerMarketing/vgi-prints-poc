"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useRouter } from "next/navigation";

interface Variant {
  id: string;
  title: string;
  availableForSale: boolean;
}

interface Props {
  sizes: string[];
  variants: Variant[];
  productHandle: string;
  title: string;
  price: number;
  image: string;
}

export default function AddToCartClient({ sizes, variants, productHandle, title, price, image }: Props) {
  const [selectedSize, setSelectedSize] = useState(sizes.length === 1 ? sizes[0] : "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");
  const { addItem } = useCart();
  const router = useRouter();

  const selectedVariant =
    variants.find((v) => v.title === selectedSize) ??
    (variants.length === 1 ? variants[0] : undefined);

  const handleAddToCart = () => {
    if (!selectedVariant) {
      setError("Please select a size.");
      return;
    }
    setError("");
    for (let i = 0; i < quantity; i++) {
      addItem({
        variantId: selectedVariant.id,
        productHandle,
        title,
        variantTitle: selectedVariant.title,
        price,
        image,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      {sizes.length > 1 && (
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

      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

      <div className="mt-8 flex gap-3">
        <button
          onClick={handleAddToCart}
          className={`flex-1 font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-lg ${
            added
              ? "bg-[#2D5A2D] text-white"
              : "bg-[#D35400] hover:bg-[#b84700] text-white"
          }`}
        >
          {added ? (
            <><Check className="w-5 h-5" /> Added!</>
          ) : (
            <><ShoppingCart className="w-5 h-5" /> Add to Cart</>
          )}
        </button>
        {added && (
          <button
            onClick={() => router.push("/cart")}
            className="px-6 py-4 rounded-lg border-2 border-[#1A1A1A] text-[#1A1A1A] font-bold hover:bg-[#1A1A1A] hover:text-white transition-colors text-sm"
          >
            View Cart
          </button>
        )}
      </div>
    </>
  );
}
