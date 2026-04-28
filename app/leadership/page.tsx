'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Quote } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type Leader = {
  slug: string;
  name: string;
  role: string;
  photo: string;
  greeting: string;
  paragraphs: string[];
  signoff: string;
  accent: string;
};

const leaders: Leader[] = [
  {
    slug: 'chairman',
    name: 'Chinnabathini Sagar',
    role: "Chairman's Message",
    photo: '/images/people/chairman.png',
    greeting: 'Dear Parents and Students,',
    paragraphs: [
      'It gives me immense pleasure, joy, and pride to welcome you to Indo Global School — an institution born from a passionate dream to provide children with an education that truly empowers them to Learn, Lead, and Shine.',
      'Education, in its truest sense, is the most powerful tool for transformation. It is not just about academic success, but about shaping minds that think independently, act with integrity, and care deeply for others. At Indo Global School, our goal is to nurture children who are not only intellectually strong, but also emotionally balanced, culturally rooted, and globally aware.',
      'We believe that every child carries within them a spark of brilliance waiting to be discovered. Our role as educators is to create the right environment — one filled with encouragement and opportunity — where that spark can shine bright.',
      'Through a blend of modern learning methods, dedicated teachers, and a value-based approach, Indo Global School aims to prepare young learners to face the challenges of tomorrow with confidence and courage.',
      'Our non-teaching staff are the silent pillars of our school. With their dedication, care, and quiet strength, they help every day run smoothly and every space feel welcoming. From keeping the campus clean to managing daily operations, their efforts create a safe and happy environment in which every child can grow. They may work behind the scenes, but their contribution shines brightly in everything we do.',
      'As we embark on this beautiful journey together, I invite parents, teachers, and students to be active partners in building a community where every child truly shines.',
    ],
    signoff: 'With warm regards,',
    accent: 'from-primary/25 via-accent/15 to-secondary/15',
  },
  {
    slug: 'principal',
    name: 'Bambina Raju',
    role: "Principal's Message",
    photo: '/images/people/principal-placeholder.jpg',
    greeting: 'Welcome to Indo Global School.',
    paragraphs: [
      'It is an honour to lead a school founded on this conviction: every child deserves a place to Learn, Lead, and Shine.',
      'As we lay the first stones of Indo Global School, I am moved by the passion, dedication, and faith our founding team brings each day. We aren’t simply setting up classrooms — we are building a learning community where wonder is encouraged, integrity is lived, and excellence is pursued with purpose.',
      'At Indo Global School, learning reaches far beyond the page. We integrate global best practices with the strength of our roots, pairing modern teaching approaches with enduring values. Through experienced educators and a nurturing environment, we focus on academic excellence, strong moral character, and 21st-century skills. Your child’s safety, well-being, and all-round development are our foremost priorities.',
      'Our goal is to equip students to navigate both textbooks and the real world with confidence, kindness, and the courage to drive positive change — prepared for higher education and ready to contribute meaningfully to society.',
      'To our parents: thank you for the trust you have placed in us. To our students: this is your home to grow — may your potential take flight here. To our team: your commitment is the foundation of this shared vision.',
      'Our journey has just begun, and together, we look forward to a future of growth, achievement, and excellence.',
    ],
    signoff: 'Warm regards,',
    accent: 'from-secondary/25 via-accent/15 to-primary/15',
  },
];

export default function LeadershipPage() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen bg-background overflow-hidden">
        {/* Ambient wash */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(1100px 600px at 8% 10%, rgba(15,118,110,0.07), transparent 60%), radial-gradient(900px 500px at 95% 90%, rgba(240,167,38,0.10), transparent 60%)',
          }}
        />

        <div className="relative max-w-[1180px] mx-auto px-5 md:px-8 pt-10 md:pt-14 pb-24 md:pb-32">
          {/* Breadcrumb / back */}
          <Link
            href="/#leadership"
            className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-muted-foreground hover:text-primary transition-colors mb-10 md:mb-14"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to home
          </Link>

          {/* Hero header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mb-16 md:mb-24"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-gradient-to-r from-secondary to-accent" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
                In Their Own Words
              </span>
            </div>
            <h1 className="font-serif font-bold leading-[0.95] tracking-tight text-[3rem] md:text-[4rem] lg:text-[5rem]">
              <span className="block text-foreground">From Our</span>
              <span className="block italic text-primary">Leadership.</span>
            </h1>
            <p className="mt-6 md:mt-8 text-[15px] md:text-[17px] text-muted-foreground max-w-[40rem] leading-[1.75]">
              The full messages from our Chairman and Principal — on the founding belief
              that shapes Indo Global School, and the journey we invite you to share with us.
            </p>
          </motion.header>

          {/* Leaders */}
          <div className="space-y-24 md:space-y-32">
            {leaders.map((leader, i) => (
              <motion.section
                key={leader.slug}
                id={leader.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="scroll-mt-24 md:scroll-mt-28"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-16">
                  {/* Portrait — sticky on lg */}
                  <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="lg:sticky lg:top-28">
                      <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0">
                        <div
                          aria-hidden
                          className={`absolute inset-0 translate-x-4 translate-y-4 rounded-[1.5rem] bg-gradient-to-br ${leader.accent}`}
                        />
                        <div className="relative h-full w-full rounded-[1.5rem] overflow-hidden ring-1 ring-border/60 shadow-[0_30px_80px_-30px_rgba(15,42,63,0.35)]">
                          <img
                            src={leader.photo}
                            alt={leader.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/45 via-primary/5 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7 text-white">
                            <p className="text-[11px] uppercase tracking-[0.26em] font-semibold text-white/85">
                              {leader.role.replace("'s Message", '')}
                            </p>
                            <p className="font-serif font-bold text-[1.65rem] md:text-[2rem] leading-tight mt-1 drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
                              {leader.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="relative">
                      <Quote
                        aria-hidden
                        strokeWidth={1.4}
                        className="absolute -top-6 -left-2 md:-top-8 md:-left-4 w-14 h-14 md:w-20 md:h-20 text-accent/25"
                      />

                      <p className="text-[11px] uppercase tracking-[0.28em] font-semibold text-secondary mb-3">
                        {leader.role}
                      </p>
                      <h2 className="font-serif font-bold text-[1.85rem] md:text-[2.4rem] lg:text-[2.75rem] leading-[1.05] tracking-tight text-foreground">
                        {leader.greeting}
                      </h2>

                      <div className="mt-7 md:mt-9 space-y-5 md:space-y-6 font-serif text-[17px] md:text-[18.5px] lg:text-[19px] text-foreground/90 leading-[1.78] tracking-[-0.003em]">
                        {leader.paragraphs.map((p, j) => (
                          <p key={j}>{p}</p>
                        ))}
                      </div>

                      <div className="mt-10 md:mt-12 pt-6 border-t border-border/50">
                        <p className="font-serif italic text-muted-foreground text-[15px] md:text-base">
                          {leader.signoff}
                        </p>
                        <p className="font-serif font-bold text-foreground text-xl md:text-2xl mt-1">
                          {leader.name}
                        </p>
                        <p className="text-[13px] text-muted-foreground mt-0.5">
                          {leader.role.replace("'s Message", '')}, Indo Global School
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            ))}
          </div>

          {/* Footer ornament */}
          <div className="text-center mt-24 md:mt-32">
            <div className="inline-flex items-center gap-3 text-primary mb-5">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-primary" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-primary" />
            </div>
            <p className="font-serif italic text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
              &ldquo;Indo Global School — where every child truly shines.&rdquo;
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
