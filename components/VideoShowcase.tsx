'use client';

import { Play } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function VideoShowcase() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-14 md:py-20 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-5 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12 space-y-2 md:space-y-3"
        >
          <p className="text-secondary font-serif text-xs md:text-sm uppercase tracking-widest font-semibold">
            Our Story in Motion
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary">
            Experience Indo Global School
          </h2>
        </motion.div>

        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative group"
        >
          <div className="absolute -inset-3 md:-inset-4 bg-gradient-to-tr from-secondary/10 via-primary/5 to-accent/10 rounded-2xl md:rounded-[2rem] blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />

          <div className="relative aspect-video rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-xl border-4 md:border-8 border-white bg-muted">
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
