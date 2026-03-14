"use client";

import Link from "next/link";
import { Leaf } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 h-20 left-0 right-0 z-[100] py-6 px-10 flex justify-between items-center transition-all duration-500 ease-in-out ${
        isScrolled
          ? "bg-black/60 backdrop-blur-xl border-b border-white/5 shadow-2xl"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        <Link href="/" className="flex items-center gap-2 text-emerald-400">
          <Leaf className="h-6 w-6" />
          <span className="text-2xl font-black tracking-tighter">
            PlantCare AI
          </span>
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium text-neutral-400">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>

          <Link href="/about" className="hover:text-white transition-colors">
            About
          </Link>

          <Link
            href="/recognition"
            className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.1)]"
          >
            Diagnose Plant
          </Link>
        </div>

      </div>
    </nav>
  );
}