import Link from "next/link";
import { Globe, MessageCircle, Share2, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#2D5A2D] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <span className="font-heading text-2xl font-bold tracking-wider">
              v<span className="text-[#D35400]">.</span>g
              <span className="text-[#D35400]">.</span>i
            </span>
            <p className="text-sm text-green-200 mt-3 leading-relaxed">
              Custom apparel printing &amp; embroidery for schools, teams, and organizations.
              Quality craftsmanship, no minimums.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading font-semibold mb-3 text-sm uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-green-200">
              <li><Link href="/shop" className="hover:text-white transition-colors">Shop All</Link></li>
              <li><Link href="/#schools" className="hover:text-white transition-colors">School Stores</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Custom Orders</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold mb-3 text-sm uppercase tracking-wide">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-green-200">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> (555) 123-4567</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> hello@vgiprints.com</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Las Vegas, NV</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading font-semibold mb-3 text-sm uppercase tracking-wide">
              Follow Us
            </h4>
            <div className="flex gap-4">
              <a href="#" className="text-green-200 hover:text-white transition-colors"><Globe className="w-5 h-5" /></a>
              <a href="#" className="text-green-200 hover:text-white transition-colors"><MessageCircle className="w-5 h-5" /></a>
              <a href="#" className="text-green-200 hover:text-white transition-colors"><Share2 className="w-5 h-5" /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-green-700 mt-8 pt-6 text-center text-xs text-green-300">
          &copy; {new Date().getFullYear()} VGI Prints. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
