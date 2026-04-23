'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const leaders = [
  {
    name: 'Chinnabathini Sagar',
    role: 'Chairman',
    photo: '/images/people/chairman.png',
    message:
      'Indo Global School was born from a passionate dream — to build an institution that shapes not just students, but future leaders. We blend the best of global education with the timeless strength of Indian values, because the world needs young minds who are both intellectually sharp and deeply rooted in character.',
    signature: 'We do not make promises — we simply do justice to our responsibilities.',
  },
  {
    name: '[Principal Name]',
    role: 'Principal',
    photo: '/images/people/principal-placeholder.jpg',
    message:
      'Every morning, our classrooms come alive with questions, experiments, and discoveries. Our teachers don\'t just deliver lessons — they mentor, challenge, and inspire. From hands-on science to creative arts, every child here finds their own path to confidence and growth.',
    signature: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit — sed do eiusmod tempor incididunt.',
  },
];

const INTERVAL = 30000;

export default function LeadershipMessage() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % leaders.length);
  }, []);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + leaders.length) % leaders.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, INTERVAL);
    return () => clearInterval(timer);
  }, [paused, next]);

  const leader = leaders[active];

  return (
    <section
      id="leadership"
      className="relative section-y-tight surface-cream overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className="decor-blob -top-16 left-10 w-80 h-80 bg-primary/10" />
      <div className="decor-blob -bottom-16 right-10 w-80 h-80 bg-accent/15" />

      <div className="max-w-5xl mx-auto px-5 md:px-8 relative">
        {/* Section label */}
        <div className="text-center mb-10 md:mb-14 space-y-3">
          <span className="eyebrow centered">From Our Leadership</span>
          <div className="ornament"><span className="ornament-dot" /></div>
        </div>

        {/* Slider */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
              className="bg-card rounded-2xl md:rounded-[1.5rem] shadow-[0_20px_50px_-20px_rgba(15,42,63,0.18)] border border-border/60 overflow-hidden relative"
            >
              {/* Mobile: stacked — photo small + text compact */}
              {/* Desktop: side-by-side */}
              <div className="flex flex-col md:flex-row">
                {/* Photo */}
                <div className="relative w-full md:w-60 lg:w-80 shrink-0">
                  {/* Mobile: centered circle photo */}
                  <div className="flex md:hidden items-center gap-4 p-6 pb-0">
                    <div className="relative shrink-0">
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-sm" />
                      <div className="relative w-20 h-20 rounded-full overflow-hidden ring-4 ring-card">
                        <img src={leader.photo} alt={leader.name} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div>
                      <p className="font-serif font-bold text-lg text-foreground leading-tight">{leader.name}</p>
                      <p className="text-secondary text-[11px] font-bold uppercase tracking-[0.2em] mt-1">{leader.role}</p>
                    </div>
                  </div>

                  {/* Desktop: full-height photo */}
                  <div className="hidden md:block relative h-full min-h-[340px] lg:min-h-[380px]">
                    <img src={leader.photo} alt={leader.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 pt-4 md:p-10 lg:p-12 flex flex-col justify-center relative">
                  {/* Decorative corner accent */}
                  <div className="hidden md:block absolute top-8 right-8 w-12 h-12 rounded-full bg-gradient-to-br from-accent/20 to-secondary/20 blur-md" />

                  {/* Desktop name */}
                  <div className="hidden md:block mb-5">
                    <span className="eyebrow">{leader.role}&apos;s Message</span>
                    <h3 className="font-serif font-bold text-2xl lg:text-[1.75rem] text-foreground mt-3">{leader.name}</h3>
                  </div>

                  {/* Message */}
                  <div className="relative mb-5">
                    <Quote className="absolute -top-2 -left-2 md:-top-3 md:-left-3 w-8 h-8 md:w-10 md:h-10 text-accent/40" />
                    <p className="text-foreground leading-[1.75] text-[15px] md:text-base lg:text-[17px] pl-6 md:pl-8">
                      {leader.message}
                    </p>
                  </div>

                  {/* Signature quote */}
                  <div className="relative pl-5 md:pl-6 border-l-[3px] border-gradient bg-gradient-to-r from-accent/5 to-transparent py-2 rounded-r-lg" style={{ borderImage: 'linear-gradient(180deg, var(--secondary), var(--accent)) 1' }}>
                    <p className="text-sm md:text-[15px] lg:text-base font-serif italic text-muted-foreground leading-relaxed">
                      &ldquo;{leader.signature}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows — hidden on small mobile, visible from 400px+ */}
          <button
            onClick={prev}
            aria-label="Previous leader message"
            className="hidden min-[400px]:flex absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-card shadow-lg border border-border/60 items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary hover:scale-110 transition-all z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ChevronLeft size={18} className="md:w-5 md:h-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next leader message"
            className="hidden min-[400px]:flex absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-card shadow-lg border border-border/60 items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary hover:scale-110 transition-all z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ChevronRight size={18} className="md:w-5 md:h-5" />
          </button>
        </div>

        {/* Dots — also tappable on mobile */}
        <div className="flex justify-center gap-3 mt-8">
          {leaders.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? 'w-10 bg-gradient-to-r from-secondary to-accent' : 'w-2 bg-border hover:bg-primary/30'
              }`}
              aria-label={`View ${leaders[i].role}'s message`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
