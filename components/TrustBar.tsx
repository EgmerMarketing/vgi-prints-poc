import { Package, Zap, Star, Truck } from "lucide-react";

const items = [
  { icon: Package, label: "No Minimums" },
  { icon: Zap, label: "Fast Turnaround" },
  { icon: Star, label: "Expert Embroidery" },
  { icon: Truck, label: "Free Shipping on $75+" },
];

export default function TrustBar() {
  return (
    <section className="bg-[#F5F3EF] py-6 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.label} className="flex items-center justify-center gap-3 text-[#1A1A1A]">
              <item.icon className="w-6 h-6 text-[#D35400] flex-shrink-0" />
              <span className="text-sm font-semibold">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
