'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BlogsPage() {
  return (
    <>
      <Header />
      <main className="relative min-h-[80vh] bg-background overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(900px 500px at 10% 10%, rgba(15,118,110,0.07), transparent 60%), radial-gradient(800px 460px at 95% 90%, rgba(240,167,38,0.10), transparent 60%)',
          }}
        />

        <div className="relative max-w-[1100px] mx-auto px-5 md:px-8 pt-10 md:pt-14 pb-24 md:pb-32">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-muted-foreground hover:text-primary transition-colors mb-12 md:mb-16"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-gradient-to-r from-secondary to-accent" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
                Stories &amp; Reflections
              </span>
            </div>

            <h1 className="font-serif font-bold leading-[0.95] tracking-tight text-[3rem] md:text-[4rem] lg:text-[5rem]">
              <span className="block text-foreground">The IGS</span>
              <span className="block italic text-primary">Journal.</span>
            </h1>

            <p className="mt-7 md:mt-8 text-[15px] md:text-[17px] text-muted-foreground leading-[1.75]">
              A space for stories from our classrooms, thoughts from our educators, and
              moments from our community. Our journal is just being put together —
              the first chapter goes live soon.
            </p>
          </motion.div>

          {/* Coming-soon card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-16 md:mt-20 max-w-2xl"
          >
            <div
              aria-hidden
              className="absolute inset-0 translate-x-3 translate-y-3 rounded-[1.5rem] bg-gradient-to-br from-primary/20 via-accent/15 to-secondary/15"
            />
            <div className="relative bg-card rounded-[1.5rem] border border-border/60 p-8 md:p-10 shadow-[0_24px_60px_-30px_rgba(15,42,63,0.22)]">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5">
                <BookOpen className="w-5 h-5" />
              </div>
              <h2 className="font-serif font-bold text-2xl md:text-[1.75rem] text-foreground leading-tight">
                Coming soon
              </h2>
              <p className="mt-3 text-[14.5px] md:text-[15.5px] text-muted-foreground leading-[1.7]">
                We&rsquo;re curating thoughtful pieces on learning, parenting, and the
                everyday wonder of school life. Check back shortly — and in the meantime,
                follow us on social to catch our first stories as they go up.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold text-white transition-all hover:-translate-y-0.5"
                  style={{
                    background: 'var(--gradient-brand)',
                    boxShadow: '0 14px 30px -12px rgba(15,118,110,0.55)',
                  }}
                >
                  Get in touch
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold text-foreground border border-border/70 hover:border-foreground/40 hover:bg-card transition-all"
                >
                  Explore the school
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
