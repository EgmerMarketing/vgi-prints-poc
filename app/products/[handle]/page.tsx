import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Package, Truck, RotateCcw } from "lucide-react";
import { getProductByHandle, getProductPrice, getProductImage, getProductSizes } from "@/lib/shopify";
import AddToCartClient from "@/components/AddToCartClient";

export const revalidate = 60;

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) return notFound();

  const price = getProductPrice(product);
  const image = getProductImage(product);
  const sizes = getProductSizes(product);

  return (
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
          <img src={image} alt={product.title} className="w-full h-full object-cover" />
        </div>

        {/* Details */}
        <div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-[#1A1A1A]">
            {product.title}
          </h1>
          <p className="text-3xl font-bold text-[#D35400] mt-4">${price.toFixed(2)}</p>
          <p className="text-gray-600 leading-relaxed mt-6">{product.description}</p>

          {/* Add to cart / size picker — client component */}
          <AddToCartClient
            sizes={sizes}
            variants={product.variants.edges.map((e) => e.node)}
          />

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
  );
}
