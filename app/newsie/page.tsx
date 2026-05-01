'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, ArrowRight, Newspaper, Megaphone, Trophy, PartyPopper, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  category: string;
  author: string;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
}

type Category = 'all' | 'news' | 'announcement' | 'achievement' | 'event';

const categoryConfig: Record<string, {
  label: string;
  gradient: string;
  ink: string;
  soft: string;
  chip: string;
  icon: React.ElementType;
}> = {
  news: {
    label: 'School News',
    gradient: 'from-sky-200 via-cyan-200 to-blue-200',
    ink: '#0C4A6E',
    soft: 'bg-sky-50',
    chip: 'bg-sky-100 text-sky-700 border-sky-200',
    icon: Newspaper,
  },
  announcement: {
    label: 'Announcement',
    gradient: 'from-amber-200 via-orange-200 to-yellow-200',
    ink: '#92400E',
    soft: 'bg-amber-50',
    chip: 'bg-amber-100 text-amber-700 border-amber-200',
    icon: Megaphone,
  },
  achievement: {
    label: 'Achievement',
    gradient: 'from-emerald-200 via-teal-200 to-green-200',
    ink: '#065F46',
    soft: 'bg-emerald-50',
    chip: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    icon: Trophy,
  },
  event: {
    label: 'School Event',
    gradient: 'from-violet-200 via-purple-200 to-fuchsia-200',
    ink: '#6B21A8',
    soft: 'bg-violet-50',
    chip: 'bg-violet-100 text-violet-700 border-violet-200',
    icon: PartyPopper,
  },
};

function getConfig(category: string) {
  return categoryConfig[category] ?? categoryConfig.news;
}

function NewsCard({ item, index }: { item: NewsItem; index: number }) {
  const cfg = getConfig(item.category ?? 'news');
  const Icon = cfg.icon;
  const date = item.publishedAt ?? item.createdAt;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: Math.min(index, 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="relative group"
    >
      {/* Offset backing block */}
      <div
        aria-hidden
        className={`absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-[1.4rem] bg-gradient-to-br ${cfg.gradient} opacity-90 transition-transform duration-500 group-hover:translate-x-3.5 group-hover:translate-y-3.5`}
      />
      <div className="relative bg-card rounded-[1.4rem] border border-border/60 shadow-[0_18px_50px_-26px_rgba(15,42,63,0.22)] overflow-hidden transition-shadow duration-500 group-hover:shadow-[0_30px_70px_-30px_rgba(15,42,63,0.32)] flex flex-col h-full">
        {/* Header band */}
        <div className={`relative px-6 pt-6 pb-5 bg-gradient-to-br ${cfg.gradient}`}>
          <div aria-hidden className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '14px 14px' }} />
          <div className="relative flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-bold ${cfg.chip} mb-3`}>
                <Icon size={11} />
                {cfg.label}
              </span>
              <h2 className="font-serif font-bold text-[1.2rem] leading-snug line-clamp-2" style={{ color: cfg.ink }}>
                {item.title}
              </h2>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-white/60 backdrop-blur-sm flex items-center justify-center ring-1 ring-white/70 shadow-sm shrink-0">
              <Icon className="w-4.5 h-4.5" style={{ color: cfg.ink }} />
            </div>
          </div>
        </div>

        {/* Cover image */}
        {item.coverImage && (
          <div className="h-40 overflow-hidden">
            <img
              src={`/api/gallery/file/${item.coverImage}`}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-5 flex flex-col flex-1">
          {item.excerpt && (
            <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
              {item.excerpt}
            </p>
          )}
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
            <span className="flex items-center gap-1.5">
              <User size={11} />
              {item.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={11} />
              {format(new Date(date), 'MMM dd, yyyy')}
            </span>
          </div>
          <Link
            href={`/newsie/${item.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all mt-auto"
          >
            Read more
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

function SkeletonCard() {
  return (
    <div className="relative">
      <div className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-[1.4rem] bg-gradient-to-br from-muted via-muted to-muted/60" />
      <div className="relative bg-card rounded-[1.4rem] border border-border/60 overflow-hidden animate-pulse">
        <div className="h-28 bg-muted" />
        <div className="p-6 space-y-3">
          <div className="h-4 bg-muted rounded w-3/4" />
          <div className="h-3 bg-muted rounded w-full" />
          <div className="h-3 bg-muted rounded w-5/6" />
          <div className="flex gap-4 pt-2">
            <div className="h-3 bg-muted rounded w-20" />
            <div className="h-3 bg-muted rounded w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NewsPage() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  useEffect(() => {
    fetch('/api/news')
      .then((r) => r.json())
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return items;
    return items.filter((i) => (i.category ?? 'news') === activeCategory);
  }, [items, activeCategory]);

  const categories = useMemo(() => {
    const present = new Set(items.map((i) => i.category ?? 'news'));
    return (['news', 'announcement', 'achievement', 'event'] as const).filter((c) => present.has(c));
  }, [items]);

  return (
    <>
      <Header />
      <main className="relative min-h-screen pb-24 bg-background overflow-hidden">
        {/* Ambient backdrop */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[700px] pointer-events-none"
          style={{
            background:
              'radial-gradient(900px 480px at 12% 0%, rgba(240,167,38,0.18), transparent 60%), radial-gradient(800px 460px at 88% 10%, rgba(15,118,110,0.16), transparent 60%)',
          }}
        />
        <motion.div
          aria-hidden
          className="absolute top-32 -left-10 w-40 h-40 rounded-full blur-3xl bg-secondary/20 pointer-events-none"
          animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
          transition={{ duration: 9, ease: 'easeInOut', repeat: Infinity }}
        />
        <motion.div
          aria-hidden
          className="absolute top-60 right-0 w-52 h-52 rounded-full blur-3xl bg-primary/15 pointer-events-none"
          animate={{ y: [0, 14, 0], x: [0, -10, 0] }}
          transition={{ duration: 11, ease: 'easeInOut', repeat: Infinity }}
        />

        <div className="relative max-w-[1280px] mx-auto px-5 md:px-8">
          {/* Header */}
          <div className="text-center pt-12 md:pt-16 pb-12 md:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5"
            >
              <div className="inline-flex items-center gap-3">
                <span className="h-px w-10 bg-gradient-to-r from-secondary to-accent" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
                  From the School
                </span>
                <span className="h-px w-10 bg-gradient-to-l from-secondary to-accent" />
              </div>
              <h1 className="font-serif font-bold leading-[0.95] tracking-tight text-[3rem] md:text-[4.5rem] lg:text-[5.5rem]">
                <span className="block text-foreground">News &amp;</span>
                <span className="block italic gradient-text-sunrise">Updates.</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Announcements, achievements, events, and stories from Indo Global School.
              </p>
            </motion.div>

            {/* Category filter */}
            {!loading && categories.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="mt-9 inline-flex flex-wrap justify-center items-center gap-2"
              >
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-full transition-all border ${
                    activeCategory === 'all'
                      ? 'text-white border-transparent shadow-[0_8px_22px_-10px_rgba(15,118,110,0.55)]'
                      : 'text-foreground/70 border-border/60 hover:text-foreground bg-card'
                  }`}
                  style={activeCategory === 'all' ? { background: 'var(--gradient-brand)' } : {}}
                >
                  All
                </button>
                {categories.map((cat) => {
                  const cfg = categoryConfig[cat];
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs md:text-sm font-semibold rounded-full transition-all border ${
                        activeCategory === cat
                          ? `${cfg.chip} shadow-sm`
                          : 'text-foreground/70 border-border/60 hover:text-foreground bg-card'
                      }`}
                    >
                      <cfg.icon size={12} />
                      {cfg.label}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 md:gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Sparkles className="w-9 h-9 text-primary" />
              </div>
              <h2 className="font-serif font-bold text-2xl md:text-3xl text-foreground mb-3">
                {activeCategory === 'all' ? 'No updates yet' : `No ${categoryConfig[activeCategory]?.label ?? activeCategory} yet`}
              </h2>
              <p className="text-muted-foreground max-w-md leading-relaxed">
                Check back soon — we're always up to something exciting at IGS.
              </p>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 md:gap-8"
              >
                {filtered.map((item, i) => (
                  <NewsCard key={item.id} item={item} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Closing flourish */}
          {!loading && filtered.length > 0 && (
            <div className="text-center mt-20 md:mt-28">
              <div className="inline-flex items-center gap-3 text-primary mb-4">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-primary" />
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-primary" />
              </div>
              <p className="font-serif italic text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
                &ldquo;Every great school story starts with a single update.&rdquo;
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
