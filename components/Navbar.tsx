"use client";

import Link from "next/link";
import { Leaf, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const blur = isScrolled || isOpen;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500
      ${blur ? "bg-black/60 backdrop-blur-xl shadow-2xl" : "bg-transparent"}
      ${!isMobile && isScrolled && !isOpen ? "border-b border-white/5" : ""}
      `}
    >
      {/* NAVBAR */}
      <nav className="h-20 flex items-center px-6 md:px-10">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-emerald-400">
            <Leaf className="h-6 w-6" />
            <span className="text-xl md:text-2xl font-black tracking-tighter">
              PlantCare AI
            </span>
          </Link>

          {/* Desktop */}
          {!isMobile && (
            <div className="flex items-center gap-6 text-sm font-medium text-neutral-400">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>

              <Link
                href="/about"
                className="hover:text-white transition-colors"
              >
                About
              </Link>

              <Link
                href="/recognition"
                className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 text-emerald-400 hover:bg-emerald-500/20"
              >
                Diagnose Plant
              </Link>
            </div>
          )}

          {/* Mobile Hamburger */}
          {isMobile && (
            <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          )}
        </div>
      </nav>

      {/* MOBILE MENU (inside same blur container) */}
      {isMobile && isOpen && (
        <div className="pb-8">
          <div className="flex flex-col items-center gap-6 text-neutral-300 font-medium">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="hover:text-white"
            >
              Home
            </Link>

            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="hover:text-white"
            >
              About
            </Link>

            <Link
              href="/recognition"
              onClick={() => setIsOpen(false)}
              className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-5 py-2 text-emerald-400 hover:bg-emerald-500/20"
            >
              Diagnose Plant
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
