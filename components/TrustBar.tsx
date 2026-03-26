import { Package, Zap, MapPin, Scissors } from "lucide-react";

const items = [
  { icon: Package, label: "No Minimums" },
  { icon: Zap, label: "Fast Turnaround" },
  { icon: MapPin, label: "Arizona-Based" },
  { icon: Scissors, label: "Custom Embroidery + DTF" },
];

export default function TrustBar() {
  return (
    <section className="bg-[#141414] py-6 border-y border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.label} className="flex items-center justify-center gap-3 text-white">
              <item.icon className="w-5 h-5 text-[#E85D26] flex-shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-300">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
