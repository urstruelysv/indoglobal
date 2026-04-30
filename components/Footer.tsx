'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone, Instagram, Facebook, Youtube, Linkedin, Briefcase, Heart } from 'lucide-react';

// X / Twitter inline glyph (lucide doesn't ship the new X mark)
const XIcon = ({ size = 17 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2H21.5l-7.51 8.59L23 22h-6.945l-5.44-6.61L4.4 22H1.13l8.04-9.2L1 2h7.115l4.92 6.05L18.244 2Zm-1.22 18h1.86L7.06 4H5.07l11.954 16Z" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Update hrefs when accounts go live
  const socialLinks = [
    {
      icon: Instagram,
      href: 'https://www.instagram.com/indoglobal2025?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
      label: 'Instagram',
    },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: XIcon, href: '#', label: 'X' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Briefcase, href: '#', label: 'Indeed' },
  ];

  return (
    <footer className="relative text-white pt-16 md:pt-24 lg:pt-28 pb-8 md:pb-12 overflow-hidden" style={{ background: 'linear-gradient(165deg, #0F766E 0%, #0B5E58 55%, #083F3C 100%)' }}>
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-secondary via-accent to-secondary" />
      <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-accent/8 rounded-full blur-3xl" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative">
        {/* Main Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-14 lg:gap-16 mb-16 md:mb-24">
          {/* Brand & Mission */}
          <div className="space-y-5 md:space-y-6 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-4 md:gap-5 group">
              <div className="bg-white/15 p-3 md:p-3.5 rounded-2xl backdrop-blur-sm group-hover:bg-white/25 transition-all duration-300 ring-1 ring-white/10">
                <img
                  src="/igs-logo.png"
                  alt="Indo Global School"
                  className="w-14 h-14 md:w-16 md:h-16 object-contain"
                />
              </div>
              <div>
                <span className="font-serif font-bold text-[22px] md:text-[26px] block leading-tight">Indo Global School</span>
                <span className="text-[9px] md:text-[11px] text-accent font-bold uppercase tracking-[0.2em]">Learn &bull; Lead &bull; Shine</span>
              </div>
            </Link>

            <p className="text-white/75 text-sm leading-relaxed max-w-sm">
              Nurturing Experiential Learning, Creativity, and Global Citizens with strong Indian values. Join our community in Kishan Nagar, Shadnagar.
            </p>

            <div className="flex flex-wrap gap-2.5 md:gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/10 ring-1 ring-white/15 flex items-center justify-center hover:bg-gradient-to-br hover:from-secondary hover:to-accent hover:ring-transparent hover:scale-110 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon size={17} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-5 md:space-y-7">
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
          <div className="space-y-5 md:space-y-7">
            <h4 className="font-serif font-bold text-base md:text-lg text-white border-l-4 border-accent pl-3 md:pl-4">Resources</h4>
            <nav className="grid grid-cols-1 gap-3 md:gap-4">
              {[
                { label: 'Photo Gallery', href: '/gallery' },
                { label: 'Academic Calendar', href: '/academic-calendar' },
                { label: 'Leadership Message', href: '/leadership' },
                { label: 'Blogs', href: '/blogs' },
                { label: 'Admissions Open', href: '/#apply' },
                { label: 'Careers', href: '/careers' },
                { label: 'School Location', href: '/#location' },
                { label: 'Admin', href: '/admin' },
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
            <h4 className="font-serif font-bold text-base md:text-lg text-white border-l-4 border-accent pl-3 md:pl-4">Direct Contact</h4>
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
                  <a href="mailto:info@indoglobaligs.com" className="text-white font-bold text-xs md:text-sm hover:text-accent transition-colors">info@indoglobaligs.com</a>
                  <p className="text-white/60 text-[9px] md:text-[10px] uppercase font-bold tracking-widest mt-1">Admissions Team</p>
                </div>
              </div>

              <div className="flex gap-3 md:gap-4 group">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/10 flex items-center justify-center text-accent shrink-0 group-hover:bg-accent group-hover:text-white transition-all">
                  <Mail size={16} className="md:w-[18px] md:h-[18px]" />
                </div>
                <div>
                  <a href="mailto:chairman@indoglobaligs.com" className="text-white font-bold text-xs md:text-sm hover:text-accent transition-colors">chairman@indoglobaligs.com</a>
                  <p className="text-white/60 text-[9px] md:text-[10px] uppercase font-bold tracking-widest mt-1">Chairman&rsquo;s Office</p>
                </div>
              </div>

              <div className="flex gap-3 md:gap-4 group">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0 group-hover:bg-white group-hover:text-primary transition-all">
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

            {/* <div className="flex items-center gap-2 text-white/50 text-[10px] md:text-xs font-medium">
              <a href="https://saivamshi.aethoscompany.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white/80 transition-colors">
                <span>Made with</span>
                <Heart size={10} className="md:w-3 md:h-3 text-rose-400 fill-rose-400" />
                <span>for education</span>
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
