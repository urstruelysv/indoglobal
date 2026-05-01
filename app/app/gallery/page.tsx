'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const categories = ['All', 'Campus', 'Events', 'Sports', 'Academics'] as const;

type GalleryImage = {
  id: number;
  title: string;
  category: string;
  filename: string;
  displayOrder: number;
  active: boolean;
  createdAt: string;
};

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setImages(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = activeCategory === 'All'
    ? images
    : images.filter((img) => img.category === activeCategory);

  const handlePrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex > 0 ? selectedIndex - 1 : filtered.length - 1);
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(selectedIndex < filtered.length - 1 ? selectedIndex + 1 : 0);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-8 pb-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12 space-y-4 pt-8">
            <p className="text-secondary font-serif text-sm uppercase tracking-widest font-semibold">
              Life at IGS
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-primary tracking-tight">
              Photo Gallery
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Glimpses of learning, laughter, and growth at Indo Global School.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-foreground border border-border/30 hover:border-primary/30 hover:shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          {loading ? (
            <div className="text-center py-24">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading gallery...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-6xl mb-4">📸</p>
              <p className="text-xl text-muted-foreground">No photos yet in this category.</p>
              <p className="text-sm text-muted-foreground mt-2">Photos will appear here once uploaded by the admin.</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              {filtered.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="break-inside-avoid group cursor-pointer"
                  onClick={() => setSelectedIndex(index)}
                >
                  <div className="relative rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <img
                      src={`/api/gallery/file/${image.filename}`}
                      alt={image.title}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-sm font-medium">{image.title}</p>
                      <p className="text-white/70 text-xs mt-1">{image.category}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedIndex !== null && filtered[selectedIndex] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedIndex(null)}
            >
              {/* Close */}
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-6 right-6 text-white/70 hover:text-white p-2 z-50"
              >
                <X size={28} />
              </button>

              {/* Prev */}
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="absolute left-4 md:left-8 text-white/50 hover:text-white p-2 z-50"
              >
                <ChevronLeft size={36} />
              </button>

              {/* Image */}
              <motion.img
                key={filtered[selectedIndex].id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                src={`/api/gallery/file/${filtered[selectedIndex].filename}`}
                alt={filtered[selectedIndex].title}
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Next */}
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-4 md:right-8 text-white/50 hover:text-white p-2 z-50"
              >
                <ChevronRight size={36} />
              </button>

              {/* Caption */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
                <p className="text-white text-lg font-medium">{filtered[selectedIndex].title}</p>
                <p className="text-white/50 text-sm mt-1">{filtered[selectedIndex].category}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}
