'use client';

import Link from "next/link";
import { Zap, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/skills", label: "Skills" },
    { href: "/education", label: "Education" },
    { href: "/experience", label: "Experience" },
    { href: "/achievements", label: "Achievements" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between relative z-50">
      <div className="text-2xl font-bold tracking-tighter font-mono">
        <Link href="/">
          <span className="text-gradient">&lt; /&gt;</span>
        </Link>
      </div>
      <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-300">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className={pathname === link.href ? "text-neon-blue" : "hover:text-white transition-colors"}>{link.label}</Link>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 glass-card rounded-full hover:bg-white/10 transition-colors hidden sm:block">
          <Zap className="w-4 h-4 text-yellow-400" />
        </button>
        <Link href="/contact" className="hidden sm:flex bg-gradient-to-r from-neon-blue to-neon-blue text-white px-6 py-2.5 rounded-full font-medium text-sm hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(0,210,255,0.3)]">
          Let&apos;s Connect
        </Link>
        
        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 text-gray-300 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[#0a0f1c]/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl lg:hidden"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-lg font-medium py-2 ${pathname === link.href ? "text-neon-blue" : "text-gray-300 hover:text-white"}`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 mt-2 border-t border-white/10 flex gap-4">
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="bg-neon-blue text-black px-6 py-3 rounded-full font-bold text-center w-full">
                Let&apos;s Connect
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
