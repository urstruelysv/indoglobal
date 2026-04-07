'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { X } from 'lucide-react';

export default function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const images = [
    { id: 1, title: 'Smart Classrooms', category: '💻 Learning', emoji: '🎓' },
    { id: 2, title: 'Free Transport Service', category: '🚌 Facility', emoji: '🚌' },
    { id: 3, title: 'Safe Campus', category: '🏫 Campus', emoji: '🛡️' },
    { id: 4, title: 'Arts & Creativity', category: '🎨 Culture', emoji: '🎨' },
    { id: 5, title: 'Sports Activities', category: '⚽ Sports', emoji: '⚽' },
    { id: 6, title: 'CBSE Excellence', category: '📚 Academic', emoji: '📚' },
    { id: 7, title: 'Student Achievements', category: '🏆 Awards', emoji: '🏆' },
    { id: 8, title: 'Global Citizens', category: '🌍 Values', emoji: '🌍' },
  ];

  return (
    <section id="gallery" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-secondary font-serif text-sm uppercase tracking-widest font-semibold">
            ✨ Experience Indo Global School ✨
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">
            Our Facilities & Activities
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the vibrant learning environment and world-class facilities in Kishanagar, Shadnagar, Telangana.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedIndex(index)}
              className="group relative h-64 rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 border border-border/20 hover:border-secondary/40 transition-all duration-300 cursor-pointer hover:shadow-lg"
            >
              {/* Placeholder Content */}
              <div className="w-full h-full flex items-center justify-center flex-col gap-3 p-4">
                <div className="text-7xl group-hover:scale-125 transition-transform duration-300">
                  {image.emoji}
                </div>
                <div className="text-center px-4">
                  <h3 className="font-serif font-semibold text-primary text-base">{image.title}</h3>
                  <p className="text-xs text-muted-foreground">{image.category}</p>
                </div>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/5 transition-all duration-300" />
            </button>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedIndex !== null && (
          <div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedIndex(null)}
          >
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-96 flex flex-col">
              {/* Image Container */}
              <div className="flex-1 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center rounded-t-lg">
                <div className="text-6xl">📸</div>
              </div>

              {/* Info Footer */}
              <div className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-semibold text-primary text-lg">
                    {images[selectedIndex].title}
                  </h3>
                  <p className="text-muted-foreground">{images[selectedIndex].category}</p>
                </div>
                <button
                  onClick={() => setSelectedIndex(null)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
