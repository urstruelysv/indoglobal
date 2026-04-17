'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface GalleryImage {
  id: number;
  title: string;
  category: string;
  imageData: string;
  displayOrder: number;
  active: boolean;
}

// Fallback shown only when CMS has no uploaded images yet.
const fallbackImages = [
  { id: 1, title: 'Smart Classrooms', category: '💻 Learning', emoji: '🎓' },
  { id: 2, title: 'Free Transport Service', category: '🚌 Facility', emoji: '🚌' },
  { id: 3, title: 'Safe Campus', category: '🏫 Campus', emoji: '🛡️' },
  { id: 4, title: 'Arts & Creativity', category: '🎨 Culture', emoji: '🎨' },
  { id: 5, title: 'Sports Activities', category: '⚽ Sports', emoji: '⚽' },
  { id: 6, title: 'CBSE Excellence', category: '📚 Academic', emoji: '📚' },
  { id: 7, title: 'Student Achievements', category: '🏆 Awards', emoji: '🏆' },
  { id: 8, title: 'Global Citizens', category: '🌍 Values', emoji: '🌍' },
];

export default function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/gallery', { cache: 'no-store' });
        if (!res.ok) throw new Error();
        const data: GalleryImage[] = await res.json();
        if (!cancelled) setImages(data);
      } catch {
        // Leave images empty; fallback tiles render instead.
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const useFallback = loaded && images.length === 0;
  const tiles = useFallback ? fallbackImages : images;
  const selected = selectedIndex !== null ? tiles[selectedIndex] : null;

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
            Discover the vibrant learning environment and world-class facilities in Kishan Nagar, Shadnagar, Telangana.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiles.map((tile, index) => {
            const isReal = !useFallback;
            return (
              <button
                key={tile.id}
                onClick={() => setSelectedIndex(index)}
                className="group relative h-64 rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 border border-border/20 hover:border-secondary/40 transition-all duration-300 cursor-pointer hover:shadow-lg"
              >
                {isReal ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={(tile as GalleryImage).imageData}
                      alt={tile.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                      <h3 className="font-serif font-semibold text-white text-base drop-shadow">
                        {tile.title}
                      </h3>
                      <p className="text-xs text-white/85">{tile.category}</p>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center flex-col gap-3 p-4">
                    <div className="text-7xl group-hover:scale-125 transition-transform duration-300">
                      {(tile as typeof fallbackImages[number]).emoji}
                    </div>
                    <div className="text-center px-4">
                      <h3 className="font-serif font-semibold text-primary text-base">{tile.title}</h3>
                      <p className="text-xs text-muted-foreground">{tile.category}</p>
                    </div>
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/5 transition-all duration-300" />
              </button>
            );
          })}
        </div>

        {/* Lightbox Modal */}
        {selected && (
          <div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedIndex(null)}
          >
            <div
              className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Container */}
              <div className="flex-1 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center min-h-[240px]">
                {!useFallback ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={(selected as GalleryImage).imageData}
                    alt={selected.title}
                    className="max-h-[70vh] w-auto object-contain"
                  />
                ) : (
                  <div className="text-6xl py-12">
                    {(selected as typeof fallbackImages[number]).emoji}
                  </div>
                )}
              </div>

              {/* Info Footer */}
              <div className="p-6 flex items-center justify-between border-t border-border/30">
                <div>
                  <h3 className="font-serif font-semibold text-primary text-lg">
                    {selected.title}
                  </h3>
                  <p className="text-muted-foreground">{selected.category}</p>
                </div>
                <button
                  onClick={() => setSelectedIndex(null)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                  aria-label="Close"
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
