import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Package, Truck, RotateCcw } from "lucide-react";
import { getProductByHandle, getProductPrice, getProductImage, getProductSizes, LOCKED_COLLECTION_HANDLES } from "@/lib/shopify";
import AddToCartClient from "@/components/AddToCartClient";
import LockedProductGuard from "@/components/LockedProductGuard";

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

  // Determine if this product belongs to a locked collection
  const lockedByCollection =
    product.collections.edges
      .map((e) => e.node.handle)
      .find((h) => LOCKED_COLLECTION_HANDLES.includes(h)) ?? null;

  return (
    <LockedProductGuard lockedByCollection={lockedByCollection}>
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href={lockedByCollection ? `/collections/${lockedByCollection}` : "/shop"}
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#E85D26] transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" /> Back to {lockedByCollection ? "School Store" : "Shop"}
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="aspect-square rounded-xl overflow-hidden bg-[#141414]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={product.title} className="w-full h-full object-cover" />
          </div>

          {/* Details */}
          <div>
            {lockedByCollection && (
              <span className="inline-block text-xs font-bold uppercase tracking-widest bg-[#E85D26] text-white px-3 py-1 rounded-full mb-4">
                School Store
              </span>
            )}
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-white">
              {product.title}
            </h1>
            <p className="text-3xl font-bold text-[#E85D26] mt-4">${price.toFixed(2)}</p>
            <p className="text-gray-400 leading-relaxed mt-6">{product.description}</p>

            <AddToCartClient
              sizes={sizes}
              variants={product.variants.edges.map((e) => e.node)}
              productHandle={handle}
              title={product.title}
              price={price}
              image={image}
            />

            {/* Trust strip */}
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-[#2A2A2A] pt-6">
              {[
                { icon: Package, label: "No Minimums" },
                { icon: Truck, label: "Ships in 5-7 Days" },
                { icon: RotateCcw, label: "Free Returns" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center text-center gap-1">
                  <item.icon className="w-5 h-5 text-[#E85D26]" />
                  <span className="text-xs text-gray-500 font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </LockedProductGuard>
  );
}
