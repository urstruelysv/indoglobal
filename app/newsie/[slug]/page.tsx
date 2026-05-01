'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Newspaper, Megaphone, Trophy, PartyPopper } from 'lucide-react';
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
  publishedAt: string | null;
  createdAt: string;
}

const categoryConfig: Record<string, { label: string; gradient: string; ink: string; chip: string; icon: React.ElementType }> = {
  news: { label: 'School News', gradient: 'from-sky-200 via-cyan-200 to-blue-200', ink: '#0C4A6E', chip: 'bg-sky-100 text-sky-700 border-sky-200', icon: Newspaper },
  announcement: { label: 'Announcement', gradient: 'from-amber-200 via-orange-200 to-yellow-200', ink: '#92400E', chip: 'bg-amber-100 text-amber-700 border-amber-200', icon: Megaphone },
  achievement: { label: 'Achievement', gradient: 'from-emerald-200 via-teal-200 to-green-200', ink: '#065F46', chip: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: Trophy },
  event: { label: 'School Event', gradient: 'from-violet-200 via-purple-200 to-fuchsia-200', ink: '#6B21A8', chip: 'bg-violet-100 text-violet-700 border-violet-200', icon: PartyPopper },
};

function getConfig(category: string) {
  return categoryConfig[category] ?? categoryConfig.news;
}

export default function NewsItemPage() {
  const { slug } = useParams<{ slug: string }>();
  const [item, setItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/news/${slug}`)
      .then((r) => {
        if (!r.ok) { setNotFound(true); return null; }
        return r.json();
      })
      .then((data) => { if (data) setItem(data); })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        </main>
        <Footer />
      </>
    );
  }

  if (notFound || !item) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-5">
          <h1 className="font-serif font-bold text-3xl text-foreground mb-3">Update not found</h1>
          <Link href="/newsie" className="text-primary font-semibold hover:underline">← Back to News</Link>
        </main>
        <Footer />
      </>
    );
  }

  const cfg = getConfig(item.category ?? 'news');
  const Icon = cfg.icon;
  const date = item.publishedAt ?? item.createdAt;
  const paragraphs = item.content.split(/\n\n+/).filter(Boolean);

  return (
    <>
      <Header />
      <main className="relative min-h-screen bg-background overflow-hidden pb-24">
        {/* Ambient */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(900px 480px at 12% 0%, rgba(240,167,38,0.14), transparent 60%), radial-gradient(800px 460px at 88% 10%, rgba(15,118,110,0.12), transparent 60%)' }}
        />

        <div className="relative max-w-[860px] mx-auto px-5 md:px-8 pt-10 md:pt-14">
          {/* Back */}
          <Link
            href="/newsie"
            className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-muted-foreground hover:text-primary transition-colors mb-10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to News
          </Link>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Category chip */}
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[12px] font-bold ${cfg.chip} mb-5`}>
              <Icon size={12} />
              {cfg.label}
            </span>

            {/* Title */}
            <h1 className="font-serif font-bold text-[2.2rem] md:text-[3rem] lg:text-[3.5rem] leading-[1.05] tracking-tight text-foreground mb-5">
              {item.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border/50">
              <span className="flex items-center gap-2">
                <User size={14} />
                {item.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={14} />
                {format(new Date(date), 'MMMM dd, yyyy')}
              </span>
            </div>

            {/* Cover image */}
            {item.coverImage && (
              <div className="relative mb-10 rounded-[1.2rem] overflow-hidden">
                <div aria-hidden className={`absolute inset-0 translate-x-3 translate-y-3 rounded-[1.2rem] bg-gradient-to-br ${cfg.gradient} opacity-80`} />
                <div className="relative rounded-[1.2rem] overflow-hidden ring-1 ring-border/60 shadow-[0_30px_80px_-30px_rgba(15,42,63,0.30)]">
                  <img
                    src={`/api/gallery/file/${item.coverImage}`}
                    alt={item.title}
                    className="w-full h-auto max-h-[480px] object-cover"
                  />
                </div>
              </div>
            )}

            {/* Excerpt */}
            {item.excerpt && (
              <p className="font-serif text-xl md:text-2xl text-foreground/80 leading-[1.6] mb-8 italic">
                {item.excerpt}
              </p>
            )}

            {/* Body */}
            <div className="space-y-5 font-serif text-[17px] md:text-[18.5px] text-foreground/90 leading-[1.78]">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Footer ornament */}
            <div className="text-center mt-16 md:mt-20">
              <div className="inline-flex items-center gap-3 text-primary mb-4">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-primary" />
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-primary" />
              </div>
              <Link
                href="/newsie"
                className="block font-serif italic text-base text-muted-foreground hover:text-primary transition-colors"
              >
                ← More News &amp; Updates
              </Link>
            </div>
          </motion.article>
        </div>
      </main>
      <Footer />
    </>
  );
}
