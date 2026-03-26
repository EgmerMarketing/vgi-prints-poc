import Link from "next/link";
import { Mail, Phone, MapPin, Share2, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white mt-auto border-t border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/vgi-logo.png" alt="VGI Prints" className="h-7 w-auto mb-4" />
            <p className="text-sm text-[#888888] mt-3 leading-relaxed">
              Custom Apparel. Built for Arizona.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-[#888888] hover:text-white transition-colors">
                <Share2 className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#888888] hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold mb-4 text-xs uppercase tracking-widest text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-[#888888]">
              <li><Link href="/shop" className="hover:text-white transition-colors">Shop All</Link></li>
              <li><Link href="/#schools" className="hover:text-white transition-colors">School Stores</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Custom Orders</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-xs uppercase tracking-widest text-white">
              Services
            </h4>
            <ul className="space-y-2 text-sm text-[#888888]">
              <li><Link href="#" className="hover:text-white transition-colors">DTF Printing</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Embroidery</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">School Programs</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Team Orders</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-xs uppercase tracking-widest text-white">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-[#888888]">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 flex-shrink-0" /> (555) 123-4567</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 flex-shrink-0" /> hello@vgiprints.com</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4 flex-shrink-0" /> Arizona, USA</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2A2A2A] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#888888]">
          <span>&copy; {new Date().getFullYear()} VGI Prints. All rights reserved.</span>
          <span className="uppercase tracking-widest">Custom Apparel. Built for Arizona.</span>
        </div>
      </div>
    </footer>
  );
}
