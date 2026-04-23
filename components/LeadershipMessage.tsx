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
  const counter = `${String(active + 1).padStart(2, '0')} / ${String(leaders.length).padStart(2, '0')}`;

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
            'radial-gradient(800px 500px at 15% 20%, rgba(15,118,110,0.07), transparent 60%), radial-gradient(700px 400px at 90% 90%, rgba(240,167,38,0.09), transparent 60%)',
        }}
      />

      <div className="relative max-w-[1240px] mx-auto px-5 md:px-8">
        {/* Editorial header */}
        <div className="max-w-3xl mb-14 md:mb-20">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-gradient-to-r from-secondary to-accent" />
            <span className="eyebrow !tracking-[0.28em]">From Our Leadership</span>
          </div>
          <h2 className="font-serif font-bold leading-[1.02] tracking-tight">
            <span className="text-foreground">Voices that </span>
            <span className="gradient-text-brand italic">shape us.</span>
          </h2>
        </div>

        {/* Magazine spread */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center"
            >
              {/* Portrait — left half */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="lg:col-span-5 relative"
              >
                <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0">
                  {/* Backing block */}
                  <div
                    aria-hidden
                    className="absolute inset-0 translate-x-4 translate-y-4 rounded-[1.25rem] bg-gradient-to-br from-primary/20 via-accent/15 to-secondary/15"
                  />
                  <div className="relative h-full w-full rounded-[1.25rem] overflow-hidden ring-1 ring-border/60 shadow-[0_30px_80px_-30px_rgba(15,42,63,0.35)]">
                    <img
                      src={leader.photo}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/35 via-transparent to-transparent" />

                    {/* Name plate overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-white">
                      <p className="text-[11px] uppercase tracking-[0.24em] font-semibold text-white/85">
                        {leader.role}
                      </p>
                      <p className="font-serif font-bold text-2xl md:text-[1.75rem] leading-tight mt-1 drop-shadow">
                        {leader.name}
                      </p>
                    </div>
                  </div>

                  {/* Counter badge */}
                  <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-card border border-border/60 rounded-full px-4 py-1.5 shadow-[0_8px_24px_-8px_rgba(15,42,63,0.2)]">
                    <span className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground tabular-nums">
                      {counter}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Message — right half */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-7 relative"
              >
                {/* Giant decorative quote mark */}
                <Quote
                  aria-hidden
                  className="absolute -top-6 -left-2 md:-top-10 md:-left-6 w-16 h-16 md:w-24 md:h-24 text-accent/20"
                  strokeWidth={1.5}
                />

                <p className="relative font-serif text-xl md:text-2xl lg:text-[1.6rem] text-foreground leading-[1.55] tracking-[-0.005em]">
                  {leader.message}
                </p>

                <div className="mt-8 md:mt-10 flex items-start gap-5">
                  <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent mt-4" />
                  <p className="font-serif italic text-[15px] md:text-base text-muted-foreground leading-relaxed max-w-md text-right shrink-0">
                    &ldquo;{leader.signature}&rdquo;
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Controls row */}
          <div className="flex items-center justify-between mt-14 md:mt-20 pt-6 border-t border-border/50">
            {/* Tabs for leaders */}
            <div className="flex items-center gap-1">
              {leaders.map((l, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`group relative px-3 md:px-4 py-2 text-xs md:text-sm font-semibold tracking-wide transition-colors ${
                    i === active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                  aria-label={`View ${l.role}'s message`}
                >
                  <span className="inline-block align-middle mr-2 text-[10px] font-mono text-muted-foreground">
                    0{i + 1}
                  </span>
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

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                aria-label="Previous leader message"
                className="w-11 h-11 rounded-full border border-border/70 text-foreground hover:bg-foreground hover:text-background hover:border-foreground transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                aria-label="Next leader message"
                className="w-11 h-11 rounded-full border border-border/70 text-foreground hover:bg-foreground hover:text-background hover:border-foreground transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
