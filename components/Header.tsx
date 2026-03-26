"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/#schools", label: "Schools" },
    { href: "#", label: "About" },
    { href: "#", label: "Contact" },
  ];

  return (
    <header className="bg-[#1A1A1A] text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-heading text-2xl font-bold tracking-wider">
              v<span className="text-[#D35400]">.</span>g
              <span className="text-[#D35400]">.</span>i
            </span>
            <span className="hidden sm:inline text-xs text-gray-400 uppercase tracking-widest ml-2">
              Prints
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Cart + mobile toggle */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-300 hover:text-white transition-colors">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 bg-[#D35400] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </button>
            <button
              className="md:hidden p-2 text-gray-300 hover:text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="md:hidden pb-4 border-t border-gray-700 pt-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-gray-300 hover:text-white transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
