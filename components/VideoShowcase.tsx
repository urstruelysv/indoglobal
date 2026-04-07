'use client';

import { Play } from 'lucide-react';
import { useState } from 'react';

export default function VideoShowcase() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <p className="text-secondary font-serif text-sm uppercase tracking-widest font-semibold italic">
            🎬 Our Story in Motion
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">
            Experience Indo Global School
          </h2>
        </div>

        {/* Cinematic Video Player */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-tr from-secondary/15 via-primary/5 to-accent/15 rounded-[2rem] blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
          
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(43,127,107,0.2)] border-8 border-white bg-muted">
            {!isPlaying ? (
              <div 
                className="absolute inset-0 cursor-pointer overflow-hidden"
                onClick={() => setIsPlaying(true)}
              >
                {/* Custom Cinematic Thumbnail */}
                <div className="absolute inset-0 bg-[url('/schoolbuilding.png')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors duration-500" />
                
                {/* Play Button Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute -inset-8 bg-white/20 rounded-full blur-xl animate-pulse" />
                    <button className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-10 h-10 text-primary fill-primary ml-1.5" />
                    </button>
                  </div>
                </div>
                
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <p className="font-serif font-bold text-2xl drop-shadow-lg">Take a Virtual Tour</p>
                  <p className="text-white/90 font-medium tracking-wide flex items-center gap-2">
                    <span className="w-8 h-px bg-white/60" />
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
              ></iframe>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
