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
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/60 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between py-4 md:py-5 lg:py-6">
        {/* Logo and Branding */}
        <Link href="/" className="flex items-center gap-4 md:gap-5 group">
          <img
            src="/igs-logo.png"
            alt="Indo Global School Logo"
            className="h-[72px] w-[72px] md:h-[88px] md:w-[88px] lg:h-24 lg:w-24 object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="font-serif font-bold text-[24px] md:text-[30px] lg:text-[34px] text-primary tracking-tight leading-none">
              Indo Global School
            </span>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="h-[2px] w-6 md:w-8 bg-gradient-to-r from-secondary to-accent rounded-full" />
              <span className="text-[10px] md:text-[11px] lg:text-xs text-secondary font-bold uppercase tracking-[0.18em]">
                Learn &bull; Lead &bull; Shine
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {desktopLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-foreground/75 hover:text-primary transition-colors font-semibold text-[13px] uppercase tracking-wider relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-secondary after:rounded-full hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#apply"
            className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
          >
            Apply Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          className="lg:hidden p-2.5 hover:bg-muted rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b border-border lg:hidden shadow-xl">
            <div className="flex flex-col gap-0.5 px-5 py-5">
              {mobileLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-foreground hover:text-primary transition-colors font-medium py-3 text-[15px] border-b border-border/10 last:border-0"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#apply"
                onClick={() => setIsOpen(false)}
                className="mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold text-[15px] hover:opacity-90 transition-opacity text-center"
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
