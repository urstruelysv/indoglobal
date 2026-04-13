'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone, Instagram, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/indoglobal2025?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', label: 'Instagram' },
  ];

  return (
    <footer className="bg-primary text-white pt-14 md:pt-20 lg:pt-24 pb-8 md:pb-12 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary via-accent to-secondary opacity-30" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-5 md:px-6">
        {/* Main Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 lg:gap-16 mb-12 md:mb-20">
          {/* Brand & Mission */}
          <div className="space-y-4 md:space-y-6 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 md:gap-5 group">
              <div className="bg-white/20 p-2.5 md:p-3 rounded-xl backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
                <img
                  src="/igs-logo.png"
                  alt="Indo Global School"
                  className="w-14 h-14 md:w-16 md:h-16 object-contain"
                />
              </div>
              <div>
                <span className="font-serif font-bold text-[22px] md:text-[26px] block leading-tight">Indo Global School</span>
                <span className="text-[9px] md:text-[11px] text-accent font-bold uppercase tracking-[0.15em] md:tracking-[0.2em]">Learn &bull; Lead &bull; Shine</span>
              </div>
            </Link>

            <p className="text-white/80 text-xs md:text-sm leading-relaxed max-w-sm">
              Nurturing Experiential Learning, Creativity, and Global Citizens with strong Indian values. Join our community in Kishan Nagar, Shadnagar.
            </p>

            <div className="flex gap-3 md:gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={16} className="md:w-[18px] md:h-[18px]" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-5 md:space-y-8">
            <h4 className="font-serif font-bold text-base md:text-lg text-white border-l-4 border-secondary pl-3 md:pl-4">Quick Navigation</h4>
            <nav className="grid grid-cols-1 gap-3 md:gap-4">
              {[
                { label: 'About IGS', href: '/#about' },
                { label: 'Why Choose IGS', href: '/#why-igs' },
                { label: 'Curriculum', href: '/#curriculum' },
                { label: 'Campus Highlights', href: '/#campus' },
                { label: 'Contact Us', href: '/#contact' },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-white/70 hover:text-secondary transition-all flex items-center gap-2 group text-xs md:text-sm font-medium"
                >
                  <span className="h-px w-0 bg-secondary group-hover:w-4 transition-all duration-300" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Key Resources */}
          <div className="space-y-5 md:space-y-8">
            <h4 className="font-serif font-bold text-base md:text-lg text-white border-l-4 border-accent pl-3 md:pl-4">Resources</h4>
            <nav className="grid grid-cols-1 gap-3 md:gap-4">
              {[
                { label: 'Photo Gallery', href: '/gallery' },
                { label: 'Academic Calendar', href: '/academic-calendar' },
                { label: 'Admissions Open', href: '/#apply' },
                { label: 'Careers', href: '/careers' },
                { label: 'School Location', href: '/#location' },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-white/70 hover:text-accent transition-all flex items-center gap-2 group text-xs md:text-sm font-medium"
                >
                  <span className="h-px w-0 bg-accent group-hover:w-4 transition-all duration-300" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Direct Contact */}
          <div className="space-y-5 md:space-y-8 sm:col-span-2 lg:col-span-1">
            <h4 className="font-serif font-bold text-base md:text-lg text-white border-l-4 border-emerald-300 pl-3 md:pl-4">Direct Contact</h4>
            <div className="space-y-4 md:space-y-6">
              <div className="flex gap-3 md:gap-4 group">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/10 flex items-center justify-center text-secondary shrink-0 group-hover:bg-secondary group-hover:text-white transition-all">
                  <Phone size={16} className="md:w-[18px] md:h-[18px]" />
                </div>
                <div>
                  <div className="flex flex-col">
                    <a href="tel:+9121689898" className="text-white font-bold text-xs md:text-sm hover:text-secondary transition-colors">+91 21 68 98 98</a>
                    <a href="tel:+9121983838" className="text-white font-bold text-xs md:text-sm hover:text-secondary transition-colors">+91 21 98 38 38</a>
                  </div>
                  <p className="text-white/60 text-[9px] md:text-[10px] uppercase font-bold tracking-widest mt-1">General Inquiries</p>
                </div>
              </div>

              <div className="flex gap-3 md:gap-4 group">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/10 flex items-center justify-center text-accent shrink-0 group-hover:bg-accent group-hover:text-white transition-all">
                  <Mail size={16} className="md:w-[18px] md:h-[18px]" />
                </div>
                <div>
                  <a href="mailto:indoglobalschool@gmail.com" className="text-white font-bold text-xs md:text-sm hover:text-accent transition-colors">indoglobalschool@gmail.com</a>
                  <p className="text-white/60 text-[9px] md:text-[10px] uppercase font-bold tracking-widest mt-1">Admissions Team</p>
                </div>
              </div>

              <div className="flex gap-3 md:gap-4 group">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300 shrink-0 group-hover:bg-emerald-300 group-hover:text-white transition-all">
                  <MapPin size={16} className="md:w-[18px] md:h-[18px]" />
                </div>
                <div>
                  <p className="text-white font-bold text-xs md:text-sm leading-tight">Kishan Nagar, Shadnagar, <br />Telangana 509410</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Divider & Bottom Info */}
        <div className="border-t border-white/20 pt-6 md:pt-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-8">
              <p className="text-white/50 text-[10px] md:text-xs font-medium">
                &copy; {currentYear} Indo Global School, Kishan Nagar, Shadnagar.
              </p>
              <div className="flex gap-4 md:gap-6">
                <Link href="#" className="text-white/50 hover:text-white transition-all text-[10px] md:text-xs font-medium">Privacy Policy</Link>
                <Link href="#" className="text-white/50 hover:text-white transition-all text-[10px] md:text-xs font-medium">Terms of Service</Link>
                <Link href="#" className="text-white/50 hover:text-white transition-all text-[10px] md:text-xs font-medium">Sitemap</Link>
              </div>
            </div>

            <div className="flex items-center gap-2 text-white/50 text-[10px] md:text-xs font-medium">
              <a href="https://saivamshi.aethoscompany.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white/80 transition-colors">
                <span>Made with</span>
                <Heart size={10} className="md:w-3 md:h-3 text-rose-400 fill-rose-400" />
                <span>for education</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
