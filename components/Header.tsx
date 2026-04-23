'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

// Desktop: consolidated nav (About includes Why IGS)
const desktopLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Curriculum', href: '/#curriculum' },
  { label: 'Campus', href: '/#campus' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/#contact' },
];

// Mobile: expanded nav with more sections
const mobileLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Why IGS', href: '/#why-igs' },
  { label: "Chairman's Message", href: '/#leadership' },
  { label: 'Curriculum', href: '/#curriculum' },
  { label: 'Campus', href: '/#campus' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Calendar', href: '/academic-calendar' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/#contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-xl border-b border-border/50 shadow-[0_1px_0_0_rgba(234,223,206,0.5),0_8px_24px_-16px_rgba(15,42,63,0.08)]">
      {/* Gradient accent strip */}
      <div className="h-[3px] w-full bg-gradient-to-r from-primary via-secondary to-accent" />

      <nav className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between py-4 md:py-5 lg:py-6">
        {/* Logo and Branding */}
        <Link href="/" className="flex items-center gap-4 md:gap-5 group">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img
              src="/igs-logo.png"
              alt="Indo Global School Logo"
              className="relative h-[64px] w-[64px] md:h-20 md:w-20 lg:h-24 lg:w-24 object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-[22px] md:text-[28px] lg:text-[32px] text-primary tracking-tight leading-none">
              Indo Global School
            </span>
            <div className="flex items-center gap-2 mt-2">
              <span className="h-[2px] w-6 md:w-8 bg-gradient-to-r from-secondary to-accent rounded-full" />
              <span className="text-[10px] md:text-[11px] lg:text-xs font-bold uppercase tracking-[0.22em] gradient-text-sunrise">
                Learn &bull; Lead &bull; Shine
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-9">
          {desktopLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-foreground/75 hover:text-primary transition-colors font-semibold text-[13px] uppercase tracking-wider relative after:absolute after:-bottom-1.5 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-secondary after:to-accent after:rounded-full hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#apply"
            className="relative inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm text-white overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
            style={{ background: 'var(--gradient-brand)', boxShadow: '0 8px 22px -6px rgba(15,118,110,0.45)' }}
          >
            <span className="relative z-10">Apply Now</span>
            <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-accent" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          className="lg:hidden p-2.5 bg-primary/5 hover:bg-primary/10 text-primary rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-background/98 backdrop-blur-xl border-b border-border lg:hidden shadow-2xl">
            <div className="flex flex-col gap-0.5 px-6 py-6">
              {mobileLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-foreground hover:text-primary hover:pl-2 transition-all font-medium py-3.5 text-[15px] border-b border-border/20 last:border-0"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#apply"
                onClick={() => setIsOpen(false)}
                className="mt-5 px-6 py-3.5 rounded-xl font-bold text-[15px] text-white text-center transition-all hover:opacity-95"
                style={{ background: 'var(--gradient-brand)' }}
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
