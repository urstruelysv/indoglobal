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
      className="py-10 md:py-16 lg:py-20 bg-gradient-to-br from-primary/[0.03] to-secondary/[0.03] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className="max-w-5xl mx-auto px-5 md:px-6">
        {/* Section label */}
        <p className="text-secondary font-serif text-xs md:text-sm uppercase tracking-widest font-semibold text-center mb-6 md:mb-10">
          From Our Leadership
        </p>

        {/* Slider */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
              className="bg-white rounded-xl md:rounded-2xl shadow-md md:shadow-lg border border-border/20 overflow-hidden"
            >
              {/* Mobile: stacked — photo small + text compact */}
              {/* Desktop: side-by-side */}
              <div className="flex flex-col md:flex-row">
                {/* Photo */}
                <div className="relative w-full md:w-60 lg:w-80 shrink-0">
                  {/* Mobile: centered circle photo */}
                  <div className="flex md:hidden items-center gap-4 p-5 pb-0">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 shrink-0">
                      <img
                        src={leader.photo}
                        alt={leader.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-serif font-bold text-base text-primary leading-tight">{leader.name}</p>
                      <p className="text-secondary text-xs font-semibold uppercase tracking-wider">{leader.role}</p>
                    </div>
                  </div>

                  {/* Desktop: full-height photo */}
                  <div className="hidden md:block h-full min-h-[300px] lg:min-h-[340px]">
                    <img
                      src={leader.photo}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-5 pt-3 md:p-8 lg:p-10 flex flex-col justify-center">
                  {/* Desktop name */}
                  <div className="hidden md:block mb-4">
                    <p className="text-xs font-semibold text-secondary uppercase tracking-wider">{leader.role}&apos;s Message</p>
                    <h3 className="font-serif font-bold text-xl lg:text-2xl text-primary mt-1">{leader.name}</h3>
                  </div>

                  {/* Message */}
                  <div className="relative mb-4">
                    <Quote className="absolute -top-1 -left-1 w-6 h-6 md:w-8 md:h-8 text-primary/10" />
                    <p className="text-foreground leading-relaxed text-[15px] md:text-base lg:text-lg pl-5 md:pl-6">
                      {leader.message}
                    </p>
                  </div>

                  {/* Signature quote */}
                  <div className="border-l-3 md:border-l-4 border-secondary/30 pl-4 md:pl-5">
                    <p className="text-xs md:text-sm lg:text-base font-serif italic text-muted-foreground">
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
            className="hidden min-[400px]:flex absolute -left-2 md:-left-5 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/90 shadow-md border border-border/20 items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors z-10"
          >
            <ChevronLeft size={16} className="md:w-5 md:h-5" />
          </button>
          <button
            onClick={next}
            className="hidden min-[400px]:flex absolute -right-2 md:-right-5 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/90 shadow-md border border-border/20 items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors z-10"
          >
            <ChevronRight size={16} className="md:w-5 md:h-5" />
          </button>
        </div>

        {/* Dots — also tappable on mobile */}
        <div className="flex justify-center gap-3 mt-5 md:mt-6">
          {leaders.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? 'w-8 bg-primary' : 'w-2 bg-border hover:bg-primary/30'
              }`}
              aria-label={`View ${leaders[i].role}'s message`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
