'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/INDO%20GLOBAL%20SCHOOL%20LOGO%20PNG.png-XkTAa5bf7XLyvi8yF7mgr6NtaHwNI2.jpeg"
            alt="Indo Global School Logo"
            className="h-12 w-12"
          />
          <div className="hidden sm:block">
            <span className="font-serif font-bold text-xl text-primary block">
              Indo Global School
            </span>
            <span className="text-xs text-muted-foreground font-medium">
              Learn • Lead • Shine
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#about" className="text-foreground hover:text-primary transition-colors font-medium">
            About
          </Link>
          <Link href="#gallery" className="text-foreground hover:text-primary transition-colors font-medium">
            Gallery
          </Link>
          <Link href="#location" className="text-foreground hover:text-primary transition-colors font-medium">
            Location
          </Link>
          <Link href="#contact" className="text-foreground hover:text-primary transition-colors font-medium">
            Contact
          </Link>
          <Link href="#apply" className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
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
              <Link href="#about" className="text-foreground hover:text-primary transition-colors font-medium">
                About
              </Link>
              <Link href="#gallery" className="text-foreground hover:text-primary transition-colors font-medium">
                Gallery
              </Link>
              <Link href="#location" className="text-foreground hover:text-primary transition-colors font-medium">
                Location
              </Link>
              <Link href="#contact" className="text-foreground hover:text-primary transition-colors font-medium">
                Contact
              </Link>
              <Link href="#apply" className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity text-center">
                Apply Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
