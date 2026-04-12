'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Why IGS', href: '/#why-igs' },
  { label: 'Curriculum', href: '/#curriculum' },
  { label: 'Campus', href: '/#campus' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Calendar', href: '/academic-calendar' },
  { label: 'Contact', href: '/#contact' },
];

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
              className="h-16 w-16 md:h-20 md:w-20 object-contain transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-xl md:text-2xl text-primary tracking-tight leading-none">
              Indo Global School
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="h-px w-6 bg-secondary" />
              <span className="text-[10px] md:text-xs text-secondary font-bold uppercase tracking-[0.2em]">
                Learn &bull; Lead &bull; Shine
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-foreground/80 hover:text-primary transition-colors font-semibold text-sm uppercase tracking-wider"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#apply"
            className="px-7 py-2.5 bg-primary text-primary-foreground rounded-full font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
          >
            Apply Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b border-border lg:hidden shadow-lg">
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-foreground hover:text-primary transition-colors font-medium py-3 border-b border-border/10 last:border-0"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#apply"
                onClick={() => setIsOpen(false)}
                className="mt-3 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:opacity-90 transition-opacity text-center"
              >
                Apply Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
