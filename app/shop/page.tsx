import TrustBar from "@/components/TrustBar";
import ProductCardShopify from "@/components/ProductCardShopify";
import { getProducts } from "@/lib/shopify";

export const revalidate = 60;

export default async function ShopPage() {
  const products = await getProducts(50);

  return (
    <>
      <section className="bg-[#0A0A0A] py-16 border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-[#E85D26] uppercase tracking-widest mb-3 font-semibold">All Products</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">Shop All Products</h1>
          <p className="text-[#888888] mt-3 max-w-xl">
            Premium blanks and custom-ready apparel. No minimums required.
          </p>
        </div>
      </section>

      <TrustBar />

      <section className="py-12 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCardShopify key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-[#888888] text-lg">No products found. Check back soon.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
