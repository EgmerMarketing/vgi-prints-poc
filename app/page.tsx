import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import TrustBar from "@/components/TrustBar";
import { products, collections } from "@/lib/mock-data";

const coreProducts = products.filter((p) => p.collection === "public").slice(0, 4);

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#1A1A1A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight">
              Custom Apparel,
              <br />
              <span className="text-[#D35400]">Crafted for You.</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 leading-relaxed">
              Screen printing, embroidery, and custom apparel for schools, teams, and
              organizations. No minimums — just quality that speaks for itself.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="bg-[#D35400] hover:bg-[#b84700] text-white font-bold px-8 py-3 rounded-lg transition-colors flex items-center gap-2"
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#schools"
                className="border border-gray-500 hover:border-white text-white px-8 py-3 rounded-lg transition-colors"
              >
                School Stores
              </Link>
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Core Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-heading text-3xl font-bold text-[#1A1A1A]">Core Products</h2>
              <p className="text-gray-500 mt-2">Premium blanks ready for your custom design.</p>
            </div>
            <Link
              href="/shop"
              className="hidden sm:flex items-center gap-1 text-[#D35400] font-semibold text-sm hover:underline"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 bg-[#F5F3EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-[#1A1A1A] text-center mb-12">
            What We Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Screen Printing",
                desc: "High-quality screen printing for bulk orders. Vibrant colors, durable prints that last wash after wash.",
              },
              {
                title: "Embroidery",
                desc: "Professional embroidery for polos, hats, jackets, and more. Add a polished, premium feel to any garment.",
              },
              {
                title: "School Stores",
                desc: "Private online stores for your school or organization. Passcode-protected collections with custom branding.",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
              >
                <h3 className="font-heading text-xl font-semibold text-[#1A1A1A] mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* School Stores */}
      <section id="schools" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-[#1A1A1A]">School Stores</h2>
            <p className="text-gray-500 mt-2">
              Private collections for schools and organizations. Enter your passcode to access.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((col) => (
              <Link
                key={col.handle}
                href={`/unlock/${col.handle}`}
                className="group relative overflow-hidden rounded-xl aspect-[3/2] block"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={col.image}
                  alt={col.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors flex flex-col items-center justify-center text-white">
                  <Lock className="w-6 h-6 mb-2 text-[#D35400]" />
                  <h3 className="font-heading text-xl font-bold">{col.name}</h3>
                  <p className="text-sm text-gray-300 mt-1">Enter passcode to shop</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
