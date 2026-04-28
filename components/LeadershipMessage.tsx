'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import SectionHeader from './SectionHeader';

const leaders = [
  {
    slug: 'chairman',
    name: 'Chinnabathini Sagar',
    role: 'Chairman',
    photo: '/images/people/chairman.jpg',
    excerpt:
      'Indo Global School was born from a passionate dream — to provide children with an education that truly empowers them to Learn, Lead, and Shine. Every child carries within them a spark of brilliance waiting to be discovered.',
    pull: 'We do not make promises — we simply do justice to our responsibilities.',
  },
  {
    slug: 'principal',
    name: 'Bambina Raju',
    role: 'Principal',
    photo: '/images/people/principal-placeholder.jpg',
    excerpt:
      'It is an honour to lead a school founded on this conviction — every child deserves a place to Learn, Lead, and Shine. We aren’t simply setting up classrooms; we are building a learning community.',
    pull: 'Where wonder is encouraged, integrity is lived, and excellence is pursued with purpose.',
  },
];

const INTERVAL = 9000;

export default function LeadershipMessage() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setActive((p) => (p + 1) % leaders.length), []);
  const prev = useCallback(() => setActive((p) => (p - 1 + leaders.length) % leaders.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, INTERVAL);
    return () => clearInterval(t);
  }, [paused, next]);

  const leader = leaders[active];

  return (
    <section
      id="leadership"
      className="relative py-20 md:py-28 lg:py-32 bg-background overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      {/* Ambient wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(900px 520px at 12% 18%, rgba(15,118,110,0.07), transparent 60%), radial-gradient(800px 460px at 92% 88%, rgba(240,167,38,0.10), transparent 60%)',
        }}
      />

      <div className="relative max-w-[1180px] mx-auto px-5 md:px-8">
        <SectionHeader
          eyebrow="Voices that Shape Us"
          title="From Our Leadership"
          subtitle="A few words from the people guiding Indo Global School."
        />

        {/* Magazine spread */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={leader.slug}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-16 items-center"
            >
              {/* Portrait */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="lg:col-span-5"
              >
                <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0">
                  <div
                    aria-hidden
                    className="absolute inset-0 translate-x-4 translate-y-4 rounded-[1.25rem] bg-gradient-to-br from-primary/20 via-accent/15 to-secondary/15"
                  />
                  <div className="relative h-full w-full rounded-[1.25rem] overflow-hidden ring-1 ring-border/60 shadow-[0_30px_80px_-30px_rgba(15,42,63,0.35)]">
                    <img src={leader.photo} alt={leader.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/35 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-white">
                      <p className="text-[11px] uppercase tracking-[0.24em] font-semibold text-white/85">
                        {leader.role}
                      </p>
                      <p className="font-serif font-bold text-2xl md:text-[1.75rem] leading-tight mt-1 drop-shadow">
                        {leader.name}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Message */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="lg:col-span-7 relative"
              >
                <Quote
                  aria-hidden
                  strokeWidth={1.5}
                  className="absolute -top-6 -left-2 md:-top-10 md:-left-6 w-16 h-16 md:w-24 md:h-24 text-accent/20"
                />

                <p className="relative font-serif text-xl md:text-2xl lg:text-[1.6rem] text-foreground leading-[1.55] tracking-[-0.005em]">
                  {leader.excerpt}
                </p>

                <div className="mt-8 md:mt-10 flex items-start gap-5">
                  <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent mt-4" />
                  <p className="font-serif italic text-[15px] md:text-base text-muted-foreground leading-relaxed max-w-md text-right shrink-0">
                    &ldquo;{leader.pull}&rdquo;
                  </p>
                </div>

                {/* Read more */}
                <Link
                  href={`/leadership#${leader.slug}`}
                  className="group inline-flex items-center gap-2 mt-8 md:mt-10 text-[13px] font-semibold text-primary hover:text-secondary transition-colors"
                >
                  Read full message
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Controls row */}
          <div className="flex items-center justify-between mt-14 md:mt-20 pt-6 border-t border-border/50">
            <div className="flex items-center gap-1">
              {leaders.map((l, i) => (
                <button
                  key={l.slug}
                  onClick={() => setActive(i)}
                  className={`relative px-3 md:px-4 py-2 text-xs md:text-sm font-semibold tracking-wide transition-colors ${
                    i === active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                  aria-label={`View ${l.role}'s message`}
                >
                  {l.role}
                  {i === active && (
                    <motion.span
                      layoutId="leader-underline"
                      className="absolute left-0 right-0 -bottom-[9px] h-[2px] bg-gradient-to-r from-secondary to-accent rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                aria-label="Previous leader message"
                className="w-11 h-11 rounded-full border border-border/70 text-foreground hover:bg-foreground hover:text-background hover:border-foreground transition-all flex items-center justify-center"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                aria-label="Next leader message"
                className="w-11 h-11 rounded-full border border-border/70 text-foreground hover:bg-foreground hover:text-background hover:border-foreground transition-all flex items-center justify-center"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
