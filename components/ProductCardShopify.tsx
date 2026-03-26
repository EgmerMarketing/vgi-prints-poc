import Link from "next/link";
import { Lock, ShoppingCart } from "lucide-react";
import type { ShopifyProduct } from "@/lib/shopify";
import { getProductPrice, getProductImage } from "@/lib/shopify";

interface Props {
  product: ShopifyProduct;
  showBadge?: boolean;
}

export default function ProductCardShopify({ product, showBadge }: Props) {
  const price = getProductPrice(product);
  const image = getProductImage(product);
  const isSchool =
    product.collections.edges.some((e) => e.node.handle !== "all") &&
    !product.collections.edges.some((e) => e.node.handle === "frontpage");

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      <Link
        href={`/products/${product.handle}`}
        className="block relative aspect-square overflow-hidden"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {showBadge && isSchool && (
          <span className="absolute top-3 left-3 bg-[#D35400] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded flex items-center gap-1">
            <Lock className="w-3 h-3" /> School Store
          </span>
        )}
      </Link>
      <div className="p-4">
        <Link href={`/products/${product.handle}`}>
          <h3 className="font-heading font-semibold text-[#1A1A1A] hover:text-[#D35400] transition-colors">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-[#D35400]">${price.toFixed(2)}</span>
          <button className="bg-[#1A1A1A] hover:bg-[#D35400] text-white p-2 rounded-lg transition-colors">
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
