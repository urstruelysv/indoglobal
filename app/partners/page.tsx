'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type Partner = {
  slug: string;
  name: string;
  website: string;
  websiteLabel: string;
  category: string;
  tagline: string;
  logo: string;
  logoBg: string;
  accent: string;
  accentText: string;
  description: string[];
  atIGS: string;
};

const partners: Partner[] = [
  {
    slug: 'cognospace',
    name: 'CognoSpace',
    website: 'https://www.cognospace.in',
    websiteLabel: 'cognospace.in',
    category: 'STEM & Experiential Learning',
    tagline: 'Hands-on learning powered by STEM, AI, Robotics & Life Skills.',
    logo: '/images/partners/cognospace.png',
    logoBg: 'bg-gray-900',
    accent: 'from-orange-200 via-amber-200 to-yellow-200',
    accentText: '#92400E',
    description: [
      'CognoSpace is an experiential learning company founded by BITS Pilani alumni, on a mission to make 21st-century skills accessible to every school in India. They design and deploy Composite Skill Labs — fully integrated learning spaces that bring together STEM, Artificial Intelligence, Robotics, Augmented Reality, Drones, and Life Skills under one roof.',
      'Their programme is built on 600+ structured activities across 30 carefully designed modules, all aligned with NEP 2020. Each module is delivered with a complete support system: lab setup, detailed curriculum, teacher training, and ongoing digital learning resources — so schools can focus on teaching, not logistics.',
      'With a presence in 150+ schools across 9+ states and reaching over 1,00,000 students every week, CognoSpace has established itself as one of India\'s most trusted partners for experiential education. Their 98%+ programme renewal rate reflects the genuine impact they deliver in classrooms every day.',
    ],
    atIGS: 'Indo Global School has set up a fully equipped CognoSpace Composite Skill Lab on campus. Students from Class 1 onwards engage in weekly hands-on sessions covering robotics, coding, AI concepts, and life skills — making 21st-century education a lived reality, not just a curriculum promise.',
  },
  {
    slug: 'lead-group',
    name: 'LEAD Group',
    website: 'https://leadgroup.co.in',
    websiteLabel: 'leadgroup.co.in',
    category: 'Curriculum & School Technology',
    tagline: 'Transforming India, One School at a Time.',
    logo: '/images/partners/lead-group.jpg',
    logoBg: 'bg-[#1e1b5e]',
    accent: 'from-indigo-200 via-blue-200 to-violet-200',
    accentText: '#3730A3',
    description: [
      'LEAD Group is one of India\'s most impactful school improvement organisations, working with a singular mission: to transform the quality of education in private schools across the country. They do this by providing schools with a complete, integrated academic operating system — combining structured curriculum, classroom technology, teacher training, and real-time learning analytics.',
      'LEAD\'s platform is designed specifically for Tier 2 and Tier 3 India, where access to high-quality academic resources has historically been limited. By standardising curriculum delivery through proven pedagogy and supporting teachers with detailed lesson plans, assessment tools, and continuous coaching, LEAD helps schools raise learning outcomes measurably and sustainably.',
      'Today, LEAD Group works with 8,000+ schools across 400+ cities, serving over 35 lakh students — making it one of the largest school edtech ecosystems in the country. Their technology systems allow school leaders to monitor student progress, teacher performance, and academic health in real time.',
    ],
    atIGS: 'IGS has partnered with LEAD Group to implement their structured academic platform across all classes. Our teachers use LEAD\'s lesson delivery system, assessment tools, and training resources to ensure every child receives consistent, high-quality instruction — regardless of subject or grade.',
  },
  {
    slug: 'pinnacle',
    name: 'Pinnacle+',
    website: 'https://pinnacleschool.co',
    websiteLabel: 'pinnacleschool.co',
    category: 'Academic Excellence Programme',
    tagline: 'The academic operating system built for school excellence.',
    logo: '/images/partners/pinnacle.png',
    logoBg: 'bg-white',
    accent: 'from-blue-200 via-indigo-200 to-slate-200',
    accentText: '#1e3a5f',
    description: [
      'Pinnacle+ is a premium academic excellence programme that brings together structured curriculum content, teacher enablement tools, and student learning systems into a single, coherent platform. Designed for schools committed to measurable academic outcomes, Pinnacle+ covers the full K–12 spectrum — from pre-primary foundations to competitive exam preparation at the high school level.',
      'The programme equips teachers with dedicated tablets loaded with lesson plans, assessments, and teaching aids aligned to board syllabi. Students benefit from a dedicated learning app, concept-by-concept practice modules, and test series designed for IIT-JEE, NEET, and other competitive examinations. Curriculum content is developed in collaboration with Pearson — one of the world\'s most respected educational publishers — ensuring world-class academic rigour.',
      'Pinnacle+ also gives school administrators a data dashboard to track learning progress at the individual student, class, and grade level — enabling timely interventions and informed academic decisions. The result is a school that runs on data, delivers consistently, and produces outcomes that parents and students can trust.',
    ],
    atIGS: 'Through our Pinnacle+ partnership, IGS students benefit from Pearson-aligned curriculum content, regular structured assessments, and a learning app that extends classroom learning to home. From nursery to Class 9, every academic interaction at IGS is supported by the Pinnacle+ framework.',
  },
];

export default function PartnersPage() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen bg-background overflow-hidden">
        {/* Ambient */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(1100px 600px at 8% 10%, rgba(15,118,110,0.07), transparent 60%), radial-gradient(900px 500px at 95% 90%, rgba(240,167,38,0.10), transparent 60%)',
          }}
        />

        <div className="relative max-w-[1180px] mx-auto px-5 md:px-8 pt-10 md:pt-14 pb-24 md:pb-32">
          {/* Back */}
          <Link
            href="/"
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
                Trusted Partnerships
              </span>
            </div>
            <h1 className="font-serif font-bold leading-[0.95] tracking-tight text-[3rem] md:text-[4rem] lg:text-[5rem]">
              <span className="block text-foreground">Partners &amp;</span>
              <span className="block italic text-primary">Tie-ups.</span>
            </h1>
            <p className="mt-6 md:mt-8 text-[15px] md:text-[17px] text-muted-foreground max-w-[40rem] leading-[1.75]">
              The organisations we work with to deliver world-class learning, technology, and academic excellence to every child at Indo Global School.
            </p>
          </motion.header>

          {/* Partners */}
          <div className="space-y-24 md:space-y-32">
            {partners.map((partner, i) => (
              <motion.section
                key={partner.slug}
                id={partner.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="scroll-mt-24 md:scroll-mt-28"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-16 items-start">
                  {/* Logo panel */}
                  <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="lg:sticky lg:top-28">
                      <div className="relative max-w-md mx-auto lg:mx-0">
                        {/* Offset backing */}
                        <div
                          aria-hidden
                          className={`absolute inset-0 translate-x-4 translate-y-4 rounded-[1.5rem] bg-gradient-to-br ${partner.accent} opacity-90`}
                        />
                        <div className={`relative rounded-[1.5rem] overflow-hidden ring-1 ring-border/60 shadow-[0_30px_80px_-30px_rgba(15,42,63,0.30)] ${partner.logoBg} p-10 md:p-12 aspect-[4/3] flex items-center justify-center`}>
                          <Image
                            src={partner.logo}
                            alt={partner.name}
                            fill
                            className="object-contain p-10 md:p-12"
                            sizes="(max-width: 768px) 100vw, 480px"
                          />
                        </div>
                        {/* Category chip below logo */}
                        <div className="mt-5 flex items-center gap-3">
                          <span className="h-px flex-1 bg-border/50" />
                          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground whitespace-nowrap">
                            {partner.category}
                          </span>
                          <span className="h-px flex-1 bg-border/50" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <p className="text-[11px] uppercase tracking-[0.28em] font-semibold text-secondary mb-3">
                      Partner Profile
                    </p>
                    <h2 className="font-serif font-bold text-[1.85rem] md:text-[2.4rem] lg:text-[2.75rem] leading-[1.05] tracking-tight text-foreground mb-3">
                      {partner.name}
                    </h2>
                    <p className="font-serif italic text-lg md:text-xl text-foreground/70 mb-8 leading-relaxed">
                      &ldquo;{partner.tagline}&rdquo;
                    </p>

                    <div className="space-y-5 font-serif text-[16px] md:text-[17.5px] text-foreground/85 leading-[1.78]">
                      {partner.description.map((para, j) => (
                        <p key={j}>{para}</p>
                      ))}
                    </div>

                    {/* At IGS highlight box */}
                    <div className="mt-8 md:mt-10 p-5 md:p-6 rounded-2xl border border-primary/20 bg-primary/5 relative overflow-hidden">
                      <div
                        aria-hidden
                        className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-secondary to-accent rounded-l-2xl"
                      />
                      <p className="text-[10.5px] uppercase tracking-[0.24em] font-bold text-primary mb-2 pl-3">
                        At Indo Global School
                      </p>
                      <p className="text-sm md:text-[15px] text-foreground/80 leading-relaxed pl-3">
                        {partner.atIGS}
                      </p>
                    </div>

                    {/* Website link */}
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 mt-8 text-[13px] font-semibold text-primary hover:text-secondary transition-colors"
                    >
                      Visit {partner.websiteLabel}
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </span>
                    </a>
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
              &ldquo;Great partnerships build great schools.&rdquo;
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
