'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { X, ImageIcon, Loader2 } from 'lucide-react';

interface GalleryImage {
  id: number;
  title: string;
  category: string;
  filename: string;
  displayOrder: number;
  active: boolean;
}

export default function GallerySection() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Limit to 8 images for the home section
          setImages(data.slice(0, 8));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="gallery" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-secondary font-serif text-base md:text-lg uppercase tracking-widest font-semibold">
            ✨ Experience Indo Global School ✨
          </p>
          <h2 className="text-primary">
            Our Facilities & Activities
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the vibrant learning environment and world-class facilities in Kishan Nagar, Shadnagar, Telangana.
          </p>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-muted-foreground font-medium">Loading gallery...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-border/60">
            <ImageIcon className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
            <p className="text-muted-foreground">Photos will be appearing here soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setSelectedIndex(index)}
                className="group relative h-64 rounded-xl overflow-hidden border border-border/20 hover:border-secondary/40 transition-all duration-300 cursor-pointer hover:shadow-lg"
              >
                {/* Real Image */}
                <img
                  src={`/api/gallery/file/${image.filename}`}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Info Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                  <p className="text-secondary-foreground bg-secondary/90 w-fit px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold mb-2">
                    {image.category}
                  </p>
                  <h3 className="text-white font-serif font-bold text-lg leading-tight">
                    {image.title}
                  </h3>
                </div>

                {/* Initial Info (Subtle) */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-sm group-hover:opacity-0 transition-opacity duration-300">
                  <h3 className="font-serif font-semibold text-primary text-sm truncate">{image.title}</h3>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{image.category}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* View All Button */}
        {!loading && images.length > 0 && (
          <div className="mt-12 text-center">
            <a 
              href="/gallery" 
              className="inline-flex items-center px-8 py-3 bg-primary text-white rounded-full font-serif font-bold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/20"
            >
              View Full Gallery
            </a>
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedIndex !== null && images[selectedIndex] && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setSelectedIndex(null)}
          >
            <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute -top-12 right-0 text-white/70 hover:text-white p-2 transition-colors"
              >
                <X size={32} />
              </button>

              {/* Image Container */}
              <img
                src={`/api/gallery/file/${images[selectedIndex].filename}`}
                alt={images[selectedIndex].title}
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl shadow-black/50"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Info Area */}
              <div className="mt-6 text-center text-white space-y-2">
                <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full uppercase tracking-widest">
                  {images[selectedIndex].category}
                </span>
                <h3 className="font-serif font-bold text-2xl md:text-3xl">
                  {images[selectedIndex].title}
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
