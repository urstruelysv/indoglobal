'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import { format } from 'date-fns';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  author: string;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border/40 animate-pulse">
      <div className="h-48 bg-muted" />
      <div className="p-6 space-y-3">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-full" />
        <div className="h-3 bg-muted rounded w-5/6" />
        <div className="flex gap-4 pt-2">
          <div className="h-3 bg-muted rounded w-24" />
          <div className="h-3 bg-muted rounded w-20" />
        </div>
      </div>
    </div>
  );
}

export default function BlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blogs')
      .then((r) => r.json())
      .then((data: BlogPost[]) => setPosts(Array.isArray(data) ? data : []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section
          className="relative py-20 md:py-28 overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, #0F2A3F 0%, #1a4a3a 60%, #2B7F6B 100%)',
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(600px 400px at 80% 50%, rgba(255,140,66,0.12), transparent 70%)',
            }}
          />
          <div className="relative max-w-5xl mx-auto px-5 md:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-3 mb-5">
                <span className="h-px w-8 bg-[#FFB84D]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#FFB84D]">
                  Stories &amp; Insights
                </span>
                <span className="h-px w-8 bg-[#FFB84D]" />
              </div>
              <h1 className="font-serif font-bold text-white text-4xl md:text-5xl lg:text-6xl leading-tight mb-5">
                The IGS Journal
              </h1>
              <p className="text-white/75 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                Stories from our classrooms, thoughts from our educators, and moments from our community.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-20">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <BookOpen className="w-9 h-9 text-primary" />
              </div>
              <h2 className="font-serif font-bold text-2xl md:text-3xl text-foreground mb-3">
                No posts yet
              </h2>
              <p className="text-muted-foreground max-w-md leading-relaxed">
                We&rsquo;re curating thoughtful pieces on learning, parenting, and the
                everyday wonder of school life. Check back soon.
              </p>
              <Link
                href="/"
                className="mt-8 inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #2B7F6B, #FF8C42)',
                  boxShadow: '0 14px 30px -12px rgba(43,127,107,0.5)',
                }}
              >
                Explore the school
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {posts.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-border/40 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  {post.coverImage ? (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={`/api/gallery/file/${post.coverImage}`}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div
                      className="h-48 flex items-center justify-center"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(43,127,107,0.15) 0%, rgba(255,140,66,0.12) 100%)',
                      }}
                    >
                      <BookOpen className="w-10 h-10 text-primary/40" />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="font-serif font-bold text-foreground text-lg leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1.5">
                        <User size={12} />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        {post.publishedAt
                          ? format(new Date(post.publishedAt), 'MMM dd, yyyy')
                          : format(new Date(post.createdAt), 'MMM dd, yyyy')}
                      </span>
                    </div>
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
                    >
                      Read more
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
