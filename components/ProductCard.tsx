import Link from "next/link";
import { Lock, ShoppingCart } from "lucide-react";
import type { Product } from "@/lib/mock-data";

interface ProductCardProps {
  product: Product;
  showBadge?: boolean;
}

export default function ProductCard({ product, showBadge }: ProductCardProps) {
  const isSchoolProduct = product.collection !== "public";

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      <Link href={`/products/${product.handle}`} className="block relative aspect-square overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {showBadge && isSchoolProduct && (
          <span className="absolute top-3 left-3 bg-[#D35400] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded flex items-center gap-1">
            <Lock className="w-3 h-3" /> School Store
          </span>
        )}
      </Link>
      <div className="p-4">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{product.category}</p>
        <Link href={`/products/${product.handle}`}>
          <h3 className="font-heading font-semibold text-[#1A1A1A] hover:text-[#D35400] transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-[#D35400]">${product.price.toFixed(2)}</span>
          <button className="bg-[#1A1A1A] hover:bg-[#D35400] text-white p-2 rounded-lg transition-colors">
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
