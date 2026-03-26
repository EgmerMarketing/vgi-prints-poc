"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import TrustBar from "@/components/TrustBar";
import {
  getCollectionByHandle,
  getProductsByCollection,
} from "@/lib/mock-data";
import { isCollectionUnlocked } from "@/lib/auth";

export default function CollectionPage() {
  const { handle } = useParams<{ handle: string }>();
  const router = useRouter();
  const [unlocked, setUnlocked] = useState(false);
  const [checking, setChecking] = useState(true);

  const collection = getCollectionByHandle(handle);
  const isAll = handle === "all";
  const products = getProductsByCollection(handle);

  useEffect(() => {
    if (isAll || !collection?.locked) {
      setUnlocked(true);
      setChecking(false);
      return;
    }

    if (isCollectionUnlocked(handle)) {
      setUnlocked(true);
      setChecking(false);
    } else {
      router.replace(`/unlock/${handle}`);
    }
  }, [handle, isAll, collection, router]);

  if (checking) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!isAll && !collection) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-2xl font-bold">Collection not found</h1>
      </div>
    );
  }

  return (
    <>
      <section className="bg-[#1A1A1A] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold">
            {isAll ? "All Products" : collection!.name}
          </h1>
          <p className="text-gray-400 mt-2">
            {isAll ? "Browse our full catalog." : collection!.description}
          </p>
        </div>
      </section>

      <TrustBar />

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {unlocked && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} showBadge />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-12">
              No products in this collection yet.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
