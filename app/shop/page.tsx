import TrustBar from "@/components/TrustBar";
import ProductCardShopify from "@/components/ProductCardShopify";
import { getProducts } from "@/lib/shopify";

export const revalidate = 60;

export default async function ShopPage() {
  const products = await getProducts(50);

  return (
    <>
      <section className="bg-[#1A1A1A] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold">Shop All Products</h1>
          <p className="text-gray-400 mt-2">
            Premium blanks and custom-ready apparel. No minimums required.
          </p>
        </div>
      </section>

      <TrustBar />

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCardShopify key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-12">
              No products found. Check back soon.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
