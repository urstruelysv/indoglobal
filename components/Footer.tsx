'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/INDO%20GLOBAL%20SCHOOL%20LOGO%20PNG.png-XkTAa5bf7XLyvi8yF7mgr6NtaHwNI2.jpeg"
                alt="Indo Global School"
                className="w-10 h-10"
              />
              <div>
                <span className="font-serif font-bold text-lg block">Indo Global School</span>
                <span className="text-xs text-primary-foreground/70">Learn • Lead • Shine</span>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Nurturing Experiential Learning, Creativity, and Global Citizens with Indian values in Shadnagar, Telangana.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif font-semibold mb-4">Quick Links</h4>
            <nav className="space-y-2">
              {[
                { label: 'About Us', href: '#about' },
                { label: 'Gallery', href: '#gallery' },
                { label: 'Location', href: '#location' },
                { label: 'Contact', href: '#contact' },
                { label: 'Admin Dashboard', href: '/admin' },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Programs */}
          <div className="space-y-4">
            <h4 className="font-serif font-semibold mb-4">Programs</h4>
            <nav className="space-y-2">
              {[
                { label: 'Early Years', href: '#' },
                { label: 'Primary School', href: '#' },
                { label: 'Secondary School', href: '#' },
                { label: 'Advanced Programs', href: '#' },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-serif font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex gap-3 text-sm">
                <Phone size={18} className="flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-primary-foreground/80">+91 21 68 98 98</p>
                  <p className="text-primary-foreground/80">+91 21 98 38 38</p>
                </div>
              </div>
              <div className="flex gap-3 text-sm">
                <MapPin size={18} className="flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-primary-foreground/80">Shadnagar</p>
                  <p className="text-primary-foreground/80">Telangana 509216</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-primary-foreground/20 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          <p className="text-primary-foreground/80">
            © {currentYear} Indo Global School, Shadnagar. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
