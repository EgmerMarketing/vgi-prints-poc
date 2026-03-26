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
    <div className="group bg-[#141414] border border-[#2A2A2A] rounded-xl overflow-hidden">
      <Link
        href={`/products/${product.handle}`}
        className="block relative aspect-square overflow-hidden"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {showBadge && isSchool && (
          <span className="absolute top-3 left-3 bg-[#E85D26] text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full flex items-center gap-1">
            <Lock className="w-3 h-3" /> School Store
          </span>
        )}
      </Link>
      <div className="p-4">
        <Link href={`/products/${product.handle}`}>
          <h3 className="font-semibold text-white hover:text-[#E85D26] transition-colors">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-[#E85D26]">${price.toFixed(2)}</span>
          <button className="bg-[#E85D26] hover:bg-[#c94d1e] text-white p-2 rounded-lg transition-colors">
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
