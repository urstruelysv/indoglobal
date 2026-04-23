'use client';

import { Play } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function VideoShowcase() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative section-y overflow-hidden" style={{ background: 'linear-gradient(180deg, var(--background) 0%, #FAF3E4 100%)' }}>
      <div className="decor-blob top-10 left-10 w-80 h-80 bg-primary/8" />
      <div className="decor-blob bottom-10 right-10 w-80 h-80 bg-accent/10" />
      <div className="max-w-5xl mx-auto px-5 md:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16 space-y-4"
        >
          <span className="eyebrow centered">Our Story in Motion</span>
          <h2 className="font-serif font-bold">
            <span className="text-foreground">Experience </span>
            <span className="gradient-text-brand">Indo Global School</span>
          </h2>
          <div className="ornament"><span className="ornament-dot" /></div>
        </motion.div>

        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative group"
        >
          <div className="absolute -inset-4 md:-inset-6 bg-gradient-to-tr from-secondary/20 via-primary/12 to-accent/20 rounded-[2rem] md:rounded-[2.5rem] blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative aspect-video rounded-2xl md:rounded-[1.5rem] overflow-hidden shadow-2xl border-4 md:border-[6px] border-card bg-muted">
            {!isPlaying ? (
              <div
                role="button"
                tabIndex={0}
                aria-label="Play school showcase video"
                className="absolute inset-0 cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                onClick={() => setIsPlaying(true)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIsPlaying(true); } }}
              >
                {/* Thumbnail — school building from booklet */}
                <img
                  src="/images/campus/school-building-hd.png"
                  alt="Indo Global School Campus"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors duration-500" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute -inset-6 md:-inset-8 bg-white/20 rounded-full blur-xl animate-pulse" />
                    <button className="relative w-16 h-16 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-7 h-7 md:w-10 md:h-10 text-primary fill-primary ml-0.5 md:ml-1.5" />
                    </button>
                  </div>
                </div>

                <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8 text-white">
                  <p className="font-serif font-bold text-lg md:text-2xl drop-shadow-lg">Take a Virtual Tour</p>
                  <p className="text-white/90 text-xs md:text-sm font-medium tracking-wide flex items-center gap-2">
                    <span className="w-5 md:w-8 h-px bg-white/60" />
                    Click to discover our campus
                  </p>
                </div>
              </div>
            ) : (
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/LSJ00OzChKk?autoplay=1"
                title="Indo Global School Showcase"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
