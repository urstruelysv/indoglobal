'use client';

/**
 * CollabSection — Global Collaborations & Partnerships.
 *
 * Standalone section, NOT yet wired into app/page.tsx.
 * To enable: import in app/page.tsx and place where appropriate, e.g.
 *   import CollabSection from '@/components/CollabSection';
 *   ...
 *   <CollabSection />
 *
 * Drop real partner logos into /public/images/collab/<slug>.png and
 * fill in the `partners` array below. Hrefs are placeholders.
 */

import { motion } from 'framer-motion';
import { Globe2, GraduationCap, Sparkles, Handshake, ArrowUpRight } from 'lucide-react';

type PartnerKind = 'institute' | 'brand' | 'program';

type Partner = {
  name: string;
  kind: PartnerKind;
  /** Path to logo in /public, e.g. '/images/collab/cambridge.png'. Falls back to monogram if missing. */
  logo?: string;
  region?: string;
  href?: string;
  blurb?: string;
};

const kindConfig: Record<PartnerKind, { label: string; chip: string; ring: string }> = {
  institute: { label: 'Educational Institute', chip: 'bg-primary/10 text-primary border-primary/20', ring: 'ring-primary/15' },
  brand: { label: 'Industry Partner', chip: 'bg-secondary/10 text-secondary border-secondary/20', ring: 'ring-secondary/15' },
  program: { label: 'Program', chip: 'bg-accent/15 text-[#8A5A10] border-accent/25', ring: 'ring-accent/20' },
};

// Replace these placeholders with real partners as deals close.
const partners: Partner[] = [
  { name: 'Partner Institute One', kind: 'institute', region: 'United Kingdom', href: '#', blurb: 'Curriculum exchange & faculty mentoring program for senior school.' },
  { name: 'Partner Institute Two', kind: 'institute', region: 'Singapore', href: '#', blurb: 'STEM enrichment workshops and student exchange opportunities.' },
  { name: 'Partner Brand One', kind: 'brand', region: 'Global', href: '#', blurb: 'Smart-classroom technology stack powering experiential learning.' },
  { name: 'Partner Brand Two', kind: 'brand', region: 'India', href: '#', blurb: 'Co-curricular labs in robotics, design, and creative media.' },
  { name: 'Partner Program One', kind: 'program', region: 'International', href: '#', blurb: 'Global citizenship program — language, culture, and service learning.' },
  { name: 'Partner Program Two', kind: 'program', region: 'Asia-Pacific', href: '#', blurb: 'Sports & wellness alliance with certified coaching pathways.' },
];

const stats = [
  { icon: Globe2, value: 'Global', label: 'Reach' },
  { icon: GraduationCap, value: 'World-Class', label: 'Curriculum' },
  { icon: Sparkles, value: 'Innovation', label: 'In Studies' },
  { icon: Handshake, value: 'Trusted', label: 'Partnerships' },
];

function monogram(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

export default function CollabSection() {
  return (
    <section
      id="collaborations"
      className="relative py-20 md:py-28 lg:py-32 bg-background overflow-hidden"
    >
      {/* Ambient wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(900px 520px at 90% 10%, rgba(15,118,110,0.07), transparent 60%), radial-gradient(800px 460px at 10% 90%, rgba(240,167,38,0.10), transparent 60%)',
        }}
      />
      {/* Grain */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.035] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-5 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-12 md:mb-16"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-gradient-to-r from-secondary to-accent" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
              Global Collaborations
            </span>
          </div>
          <h2 className="font-serif font-bold leading-[0.95] tracking-tight text-[2.5rem] md:text-[3.5rem] lg:text-[4.25rem]">
            <span className="block text-foreground">Bringing the world</span>
            <span className="block italic text-primary">to our classrooms.</span>
          </h2>
          <p className="mt-6 md:mt-7 text-[15px] md:text-base text-muted-foreground max-w-[38rem] leading-[1.7]">
            We&rsquo;re partnering with international educational institutes and trusted
            brands to bring fresh perspectives, real-world skills, and meaningful innovation
            into the way our students learn.
          </p>
        </motion.div>

        {/* Stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-14 md:mb-20"
        >
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="relative flex items-center gap-3 rounded-2xl border border-border/60 bg-card/70 backdrop-blur-sm px-4 py-3.5"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/15">
                  <Icon className="w-[18px] h-[18px]" />
                </span>
                <div className="min-w-0">
                  <p className="font-serif font-bold text-foreground text-[17px] leading-tight truncate">
                    {s.value}
                  </p>
                  <p className="text-[10.5px] uppercase tracking-[0.18em] font-semibold text-muted-foreground mt-0.5">
                    {s.label}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Partners grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {partners.map((p, i) => {
            const cfg = kindConfig[p.kind];
            return (
              <motion.a
                key={p.name + i}
                href={p.href ?? '#'}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: Math.min(i, 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3 }}
                className="group relative rounded-[1.25rem] border border-border/60 bg-card p-6 md:p-7 shadow-[0_2px_12px_-4px_rgba(15,42,63,0.06)] hover:shadow-[0_22px_50px_-22px_rgba(15,42,63,0.22)] transition-all duration-500"
              >
                {/* Logo / monogram */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className={`relative w-14 h-14 rounded-xl bg-muted/40 ring-1 ${cfg.ring} flex items-center justify-center overflow-hidden`}>
                    {p.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.logo} alt={p.name} className="w-full h-full object-contain p-2" />
                    ) : (
                      <span className="font-serif font-bold text-xl text-foreground/70">
                        {monogram(p.name)}
                      </span>
                    )}
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10.5px] font-bold uppercase tracking-[0.16em] ${cfg.chip}`}>
                    {cfg.label}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-foreground text-[1.2rem] md:text-[1.3rem] leading-tight">
                  {p.name}
                </h3>
                {p.region && (
                  <p className="text-[12px] uppercase tracking-[0.18em] font-semibold text-muted-foreground mt-1.5">
                    {p.region}
                  </p>
                )}
                {p.blurb && (
                  <p className="mt-4 text-[14px] text-foreground/80 leading-[1.65]">
                    {p.blurb}
                  </p>
                )}

                <div className="mt-6 pt-5 border-t border-border/50 flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.22em] font-semibold text-muted-foreground">
                    Learn more
                  </span>
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Closing line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-16 md:mt-24"
        >
          <div className="inline-flex items-center gap-3 text-primary mb-4">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-primary" />
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-primary" />
          </div>
          <p className="font-serif italic text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            &ldquo;Innovation in studies begins where curiosity meets the world.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
