import Link from "next/link";
import {
  Package,
  Zap,
  MapPin,
  Scissors,
  Lock,
  Shirt,
  Wind,
  HardHat,
  Tag,
  LayoutGrid,
  ArrowRight,
} from "lucide-react";
import TrustBar from "@/components/TrustBar";

const categories = [
  { icon: Shirt, label: "T-Shirts" },
  { icon: Wind, label: "Hoodies" },
  { icon: Shirt, label: "Polos" },
  { icon: HardHat, label: "Hats" },
  { icon: Tag, label: "Patches" },
  { icon: LayoutGrid, label: "Signage" },
];

const steps = [
  {
    num: "01",
    title: "Choose Your Product",
    desc: "Browse our catalog of premium blanks — tees, hoodies, hats, polos, and more.",
  },
  {
    num: "02",
    title: "Send Us Your Design",
    desc: "Upload your artwork or work with our team to create something unique.",
  },
  {
    num: "03",
    title: "We Print and Ship",
    desc: "Fast turnaround, quality guarantee, delivered straight to your door.",
  },
];

const schoolCards = [
  { name: "Ridgeline High School", handle: "ridgeline" },
  { name: "Desert Vista Academy", handle: "desert-vista" },
  { name: "Sonoran Springs School", handle: "sonoran-springs" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#0A0A0A] min-h-[70vh] flex items-center overflow-hidden">
        {/* Warm gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#1a0f00] to-[#0A0A0A] opacity-80" />
        {/* Grid texture overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(232,93,38,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(232,93,38,0.15) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <p className="text-xs text-[#E85D26] uppercase tracking-widest mb-4 font-semibold">
              Arizona&apos;s Custom Apparel Studio
            </p>
            <h1 className="font-heading text-5xl md:text-7xl font-bold leading-tight text-white">
              Your Brand.
              <br />
              <span className="text-[#E85D26]">Printed Bold.</span>
            </h1>
            <p className="mt-6 text-lg text-[#888888] leading-relaxed max-w-xl">
              Custom embroidery and DTF prints for schools, teams, and businesses across Arizona.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="bg-[#E85D26] hover:bg-[#c94d1e] text-white font-bold px-8 py-4 rounded-lg transition-colors flex items-center gap-2 uppercase tracking-widest text-sm"
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/#schools"
                className="border border-white hover:border-[#E85D26] hover:text-[#E85D26] text-white px-8 py-4 rounded-lg transition-colors uppercase tracking-widest text-sm font-semibold"
              >
                School Stores
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <TrustBar />

      {/* How It Works */}
      <section className="py-20 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs text-[#E85D26] uppercase tracking-widest mb-3 font-semibold">Simple Process</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div
                key={step.num}
                className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-8 relative overflow-hidden group hover:border-[#E85D26] transition-colors duration-300"
              >
                <span className="text-6xl font-bold text-[#E85D26] opacity-20 absolute top-4 right-6 font-heading leading-none select-none">
                  {step.num}
                </span>
                <span className="text-sm font-bold text-[#E85D26] uppercase tracking-widest">{step.num}</span>
                <h3 className="font-heading text-xl font-bold text-white mt-3 mb-3">{step.title}</h3>
                <p className="text-[#888888] text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-20 bg-[#141414]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs text-[#E85D26] uppercase tracking-widest mb-3 font-semibold">Browse</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">Shop by Category</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((cat) => (
              <Link
                href="/shop"
                key={cat.label}
                className="flex-shrink-0 bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl px-8 py-8 flex flex-col items-center gap-3 hover:border-[#E85D26] hover:bg-[#1a1209] transition-all duration-300 group min-w-[140px]"
              >
                <cat.icon className="w-8 h-8 text-[#888888] group-hover:text-[#E85D26] transition-colors" />
                <span className="text-xs font-semibold uppercase tracking-widest text-[#888888] group-hover:text-white transition-colors whitespace-nowrap">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* School Stores */}
      <section id="schools" className="py-20 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs text-[#E85D26] uppercase tracking-widest mb-3 font-semibold">Private Collections</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Exclusive School Stores
            </h2>
            <p className="text-[#888888] max-w-xl mx-auto leading-relaxed">
              Each school gets their own private store. Students and parents unlock it with a passcode
              — keeping designs exclusive and orders simple.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {schoolCards.map((school) => (
              <div
                key={school.handle}
                className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-8 flex flex-col items-center text-center gap-4"
              >
                <div className="w-14 h-14 rounded-full bg-[#1E1E1E] border border-[#2A2A2A] flex items-center justify-center">
                  <Lock className="w-6 h-6 text-[#E85D26]" />
                </div>
                <h3 className="font-heading text-lg font-bold text-white">{school.name}</h3>
                <span className="text-[10px] font-bold uppercase tracking-widest bg-[#1E1E1E] text-[#888888] border border-[#2A2A2A] px-3 py-1 rounded-full">
                  Locked
                </span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/collections/ridgeline"
              className="inline-flex items-center gap-2 bg-[#E85D26] hover:bg-[#c94d1e] text-white font-bold px-8 py-4 rounded-lg transition-colors uppercase tracking-widest text-sm"
            >
              Get Your School a Store <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-[#E85D26] to-[#C4832A] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to get printed?
          </h2>
          <p className="text-white/80 text-lg mb-10">
            No minimums. Fast turnaround. Arizona-based.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white hover:text-[#E85D26] transition-colors uppercase tracking-widest text-sm"
          >
            Start Shopping <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
