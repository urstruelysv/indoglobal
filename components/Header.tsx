'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border py-2">
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo and Branding */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative">
            <img 
              src="/igs-logo.png"
              alt="Indo Global School Logo"
              className="h-20 w-20 md:h-24 md:w-24 object-contain transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-2xl md:text-3xl text-primary tracking-tight leading-none">
              Indo Global School
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="h-px w-8 bg-secondary"></span>
              <span className="text-xs md:text-sm text-secondary font-bold uppercase tracking-[0.2em]">
                Learn • Lead • Shine
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10">
          <Link href="/#about" className="text-foreground/80 hover:text-primary transition-colors font-semibold text-sm uppercase tracking-wider">
            About
          </Link>
          <Link href="/#gallery" className="text-foreground/80 hover:text-primary transition-colors font-semibold text-sm uppercase tracking-wider">
            Gallery
          </Link>
          <Link href="/#location" className="text-foreground/80 hover:text-primary transition-colors font-semibold text-sm uppercase tracking-wider">
            Location
          </Link>
          <Link href="/#contact" className="text-foreground/80 hover:text-primary transition-colors font-semibold text-sm uppercase tracking-wider">
            Contact
          </Link>
          <Link href="/#apply" className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300">
            Apply Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b border-border md:hidden">
            <div className="flex flex-col gap-4 px-6 py-4">
              <Link href="/#about" className="text-foreground hover:text-primary transition-colors font-medium">
                About
              </Link>
              <Link href="/#gallery" className="text-foreground hover:text-primary transition-colors font-medium">
                Gallery
              </Link>
              <Link href="/#location" className="text-foreground hover:text-primary transition-colors font-medium">
                Location
              </Link>
              <Link href="/#contact" className="text-foreground hover:text-primary transition-colors font-medium">
                Contact
              </Link>
              <Link href="/#apply" className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity text-center">
                Apply Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
