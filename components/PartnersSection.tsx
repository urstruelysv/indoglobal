'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from './SectionHeader';

const partners = [
  {
    slug: 'cognospace',
    name: 'CognoSpace',
    tagline: 'Experiential Learning — STEM, AI & Robotics',
    logo: '/images/partners/cognospace.png',
    logoBg: 'bg-gray-900',
  },
  {
    slug: 'lead-group',
    name: 'LEAD Group',
    tagline: 'Integrated Curriculum & School Technology',
    logo: '/images/partners/lead-group.jpg',
    logoBg: 'bg-[#1e1b5e]',
  },
  {
    slug: 'pinnacle',
    name: 'Pinnacle+',
    tagline: 'Academic Excellence Operating System',
    logo: '/images/partners/pinnacle.png',
    logoBg: 'bg-white',
  },
];

export default function PartnersSection() {
  return (
    <section className="relative py-16 md:py-20 bg-background overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(800px 400px at 85% 60%, rgba(240,167,38,0.07), transparent 60%)',
        }}
      />

      <div className="relative max-w-[1180px] mx-auto px-5 md:px-8">
        <SectionHeader
          eyebrow="Trusted Partnerships"
          title="Partners & Tie-ups"
          subtitle="World-class organisations that strengthen our curriculum, technology, and learning outcomes."
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6 mt-10 md:mt-12">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/partners#${partner.slug}`}
                className="group flex flex-col items-center text-center p-7 md:p-8 rounded-2xl border border-border/50 bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden h-full"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                {/* Logo container */}
                <div className={`relative w-full h-24 rounded-xl overflow-hidden mb-5 ${partner.logoBg} flex items-center justify-center p-4`}>
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain p-3"
                    sizes="240px"
                  />
                </div>

                <h3 className="font-serif font-bold text-foreground text-lg mb-1.5">
                  {partner.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  {partner.tagline}
                </p>

                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowUpRight size={12} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-10">
          <Link
            href="/partners"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary transition-colors"
          >
            View all partnerships
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
