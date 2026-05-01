'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, BookOpen } from 'lucide-react';
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

export default function BlogPostPage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : Array.isArray(params.slug) ? params.slug[0] : '';
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/blogs/${slug}`)
      .then((r) => {
        if (r.status === 404) {
          setNotFound(true);
          return null;
        }
        return r.json();
      })
      .then((data: BlogPost | null) => {
        if (data) setPost(data);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {loading ? (
          <div className="max-w-3xl mx-auto px-5 md:px-8 py-16">
            <div className="animate-pulse space-y-6">
              <div className="h-4 bg-muted rounded w-32" />
              <div className="h-64 bg-muted rounded-2xl" />
              <div className="h-8 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
              <div className="space-y-3">
                <div className="h-3 bg-muted rounded" />
                <div className="h-3 bg-muted rounded" />
                <div className="h-3 bg-muted rounded w-5/6" />
              </div>
            </div>
          </div>
        ) : notFound || !post ? (
          <div className="max-w-3xl mx-auto px-5 md:px-8 py-24 text-center">
            <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-9 h-9 text-muted-foreground" />
            </div>
            <h1 className="font-serif font-bold text-3xl text-foreground mb-3">
              Post not found
            </h1>
            <p className="text-muted-foreground mb-8">
              The article you&rsquo;re looking for doesn&rsquo;t exist or may have been removed.
            </p>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #2B7F6B, #FF8C42)',
                boxShadow: '0 14px 30px -12px rgba(43,127,107,0.5)',
              }}
            >
              <ArrowLeft size={14} />
              Back to blog
            </Link>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {post.coverImage && (
              <div className="w-full h-64 md:h-96 overflow-hidden">
                <img
                  src={`/api/gallery/file/${post.coverImage}`}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="max-w-3xl mx-auto px-5 md:px-8 py-10 md:py-14">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground hover:text-primary transition-colors mb-10"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to blog
              </Link>

              <h1 className="font-serif font-bold text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-5">
                {post.title}
              </h1>

              <div className="flex items-center gap-5 text-sm text-muted-foreground mb-8 pb-8 border-b border-border/60">
                <span className="flex items-center gap-1.5">
                  <User size={14} />
                  {post.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  {post.publishedAt
                    ? format(new Date(post.publishedAt), 'MMMM dd, yyyy')
                    : format(new Date(post.createdAt), 'MMMM dd, yyyy')}
                </span>
              </div>

              {post.excerpt && (
                <p className="text-lg text-muted-foreground leading-relaxed italic mb-8 border-l-4 border-primary/30 pl-5">
                  {post.excerpt}
                </p>
              )}

              <div className="prose prose-neutral max-w-none">
                {post.content.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-foreground text-base leading-[1.85] mb-5">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-border/60">
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  <ArrowLeft size={14} />
                  Back to all articles
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </main>
      <Footer />
    </>
  );
}
