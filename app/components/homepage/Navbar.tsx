"use client";
import { useState } from "react";

import { Menu, X } from "lucide-react";
import Logo from "./Logo";

interface NavbarProps {
  onLogin?: () => void;
  onSignup?: () => void;
}

export default function Navbar({ onLogin, onSignup }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#0a2e16] border-b border-white/8">
      <div className="max-w-6xl mx-auto px-6 h-[60px] flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {["How it Works", "Products", "Features", "FAQ"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-white/65 hover:text-white text-sm transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onLogin}
            className="text-white text-sm border border-white/25 px-4 py-2 rounded-md hover:border-white/50 transition-colors"
          >
            Login
          </button>
          <button
            onClick={onSignup}
            className="bg-[#3db86a] hover:bg-[#35a55e] text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
          >
            Sign up free
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0a2e16] border-t border-white/8 px-6 py-4 space-y-3">
          {["How it Works", "Products", "Features", "FAQ"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="block text-white/65 text-sm py-1"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={onLogin}
              className="text-white text-sm border border-white/25 px-4 py-2 rounded-md"
            >
              Login
            </button>
            <button
              onClick={onSignup}
              className="bg-[#3db86a] text-white text-sm font-medium px-4 py-2 rounded-md"
            >
              Sign up free
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
