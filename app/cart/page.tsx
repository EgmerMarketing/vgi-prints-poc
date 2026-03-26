"use client";

import Link from "next/link";
import { Trash2, ChevronLeft, Loader2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, totalCount, totalPrice, removeItem, updateQuantity, checkout, checkingOut } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] bg-[#0A0A0A] flex items-center justify-center">
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="font-heading text-3xl font-bold text-white mb-4">Your cart is empty</h1>
          <p className="text-[#888888] mb-8">Looks like you haven&apos;t added anything yet.</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#E85D26] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#c94d1e] transition-colors uppercase tracking-widest text-sm"
          >
            <ChevronLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-heading text-3xl font-bold text-white mb-8">
          Your Cart ({totalCount} {totalCount === 1 ? "item" : "items"})
        </h1>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Line items */}
          <div className="flex-1 space-y-4">
            {items.map((item) => (
              <div key={item.variantId} className="bg-[#141414] rounded-xl border border-[#2A2A2A] p-4 flex gap-4">
                {/* Image */}
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-[#1E1E1E] flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>

                {/* Details */}
                <div className="flex-1">
                  <Link
                    href={`/products/${item.productHandle}`}
                    className="font-semibold text-white hover:text-[#E85D26] transition-colors"
                  >
                    {item.title}
                  </Link>
                  {item.variantTitle !== "Default Title" && (
                    <p className="text-sm text-[#888888] mt-0.5">{item.variantTitle}</p>
                  )}
                  <p className="text-[#E85D26] font-bold mt-1">${item.price.toFixed(2)}</p>

                  {/* Quantity */}
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                      className="w-8 h-8 rounded border border-[#2A2A2A] flex items-center justify-center hover:border-[#E85D26] transition-colors text-sm text-white"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-semibold text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                      className="w-8 h-8 rounded border border-[#2A2A2A] flex items-center justify-center hover:border-[#E85D26] transition-colors text-sm text-white"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Line total + remove */}
                <div className="flex flex-col items-end justify-between">
                  <span className="font-bold text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeItem(item.variantId)}
                    className="text-[#888888] hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:w-80">
            <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6 sticky top-24">
              <h2 className="font-heading text-xl font-bold text-white mb-4">Order Summary</h2>
              <div className="flex justify-between text-sm text-[#888888] mb-2">
                <span>Subtotal ({totalCount} items)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-[#888888] mb-4">
                <span>Shipping</span>
                <span className="text-[#2D7A4F] font-medium">Calculated at checkout</span>
              </div>
              <div className="border-t border-[#2A2A2A] pt-4 flex justify-between font-bold text-white text-lg mb-6">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={checkout}
                disabled={checkingOut}
                className="w-full bg-[#E85D26] hover:bg-[#c94d1e] disabled:opacity-60 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
              >
                {checkingOut ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                ) : (
                  "Proceed to Checkout"
                )}
              </button>
              <Link
                href="/shop"
                className="block text-center text-sm text-[#888888] hover:text-[#E85D26] transition-colors mt-4"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
