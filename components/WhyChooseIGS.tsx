'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Globe, User, Award, Building2, GraduationCap, Shield, Trophy, HeartPulse, ChevronDown } from 'lucide-react';

const reasons = [
  {
    icon: Globe,
    title: 'Global Perspective with Indian Roots',
    description: 'A curriculum designed to balance modern educational standards with traditional cultural wisdom. We prepare children to thrive globally while staying rooted in the values that define who they are.',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    ring: 'ring-primary/15',
  },
  {
    icon: User,
    title: 'Child-Centred Learning',
    description: 'Each child learns at their own pace through experiential, activity-based, and enquiry-driven approaches. We don\'t fit children into a mould — we let them shape their own path to brilliance.',
    iconBg: 'bg-secondary/12',
    iconColor: 'text-secondary',
    ring: 'ring-secondary/15',
  },
  {
    icon: Award,
    title: 'Leadership & Values',
    description: 'Character building, moral education, and public speaking form the backbone of our learning philosophy. Every student is mentored to lead with integrity, empathy, and purpose.',
    iconBg: 'bg-accent/15',
    iconColor: 'text-[#8A5A10]',
    ring: 'ring-accent/20',
  },
  {
    icon: Building2,
    title: 'Modern Infrastructure',
    description: 'A sprawling 3-acre campus with smart classrooms, digital learning systems, centralized air conditioning, and interactive spaces that encourage creativity and collaboration — infrastructure built for the learners of tomorrow.',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    ring: 'ring-primary/15',
  },
  {
    icon: GraduationCap,
    title: 'Dedicated & Qualified Faculty',
    description: 'Our teachers are mentors who inspire learning beyond the classroom. They nurture every child\'s potential with passion, care, and expertise — helping children achieve their best.',
    iconBg: 'bg-secondary/12',
    iconColor: 'text-secondary',
    ring: 'ring-secondary/15',
  },
  {
    icon: Shield,
    title: 'Safety & Security',
    description: '24/7 surveillance, trained staff, GPS-enabled school buses, and a nurturing environment that ensures every child\'s safety and well-being — giving parents complete peace of mind.',
    iconBg: 'bg-accent/15',
    iconColor: 'text-[#8A5A10]',
    ring: 'ring-accent/20',
  },
  {
    icon: Trophy,
    title: 'Sports & Co-Curricular Excellence',
    description: 'From basketball and football to tennis and athletics, from yoga and chess to art and music — we believe in the all-round development of every student, on and off the field.',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    ring: 'ring-primary/15',
  },
  {
    icon: HeartPulse,
    title: 'Wellness & Mindfulness',
    description: 'Yoga, mindfulness programmes, a dedicated medical room, and regular wellness check-ups — because a healthy mind and body are the foundation of all learning.',
    iconBg: 'bg-secondary/12',
    iconColor: 'text-secondary',
    ring: 'ring-secondary/15',
  },
];

export default function WhyChooseIGS() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="why-igs" className="relative section-y surface-warm overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 md:mb-20 space-y-4"
        >
          <span className="eyebrow centered">The IGS Difference</span>
          <h2 className="font-serif font-bold">
            <span className="text-foreground">Why Choose </span>
            <span className="gradient-text-brand">Indo Global School?</span>
          </h2>
          <div className="ornament"><span className="ornament-dot" /></div>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto pt-1">
            Eight reasons parents trust us with what matters most — their children&apos;s future.
          </p>
        </motion.div>

        {/* Accordion Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`why-igs-panel-${index}`}
                  className={`w-full text-left rounded-2xl border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    isOpen
                      ? 'bg-card shadow-[0_16px_40px_-16px_rgba(15,42,63,0.18)] border-primary/30 ring-1 ring-primary/10'
                      : 'bg-card border-border/60 hover:border-primary/30 hover:shadow-[0_8px_24px_-12px_rgba(15,42,63,0.12)] hover:-translate-y-0.5'
                  }`}
                >
                  <div className="p-5 md:p-7">
                    {/* Header row */}
                    <div className="flex items-center gap-4 md:gap-5">
                      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl ${reason.iconBg} ring-1 ${reason.ring} flex items-center justify-center shrink-0`}>
                        <Icon className={`w-[22px] h-[22px] md:w-6 md:h-6 ${reason.iconColor}`} />
                      </div>
                      <h3 className="text-[15px] md:text-lg font-serif font-bold text-foreground flex-1 leading-snug">
                        {reason.title}
                      </h3>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${isOpen ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </div>
                    </div>

                    {/* Expandable content */}
                    <motion.div
                      id={`why-igs-panel-${index}`}
                      role="region"
                      aria-labelledby={`why-igs-btn-${index}`}
                      initial={false}
                      animate={{
                        height: isOpen ? 'auto' : 0,
                        opacity: isOpen ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-foreground/85 leading-[1.75] mt-4 md:mt-5 pl-16 md:pl-[76px] text-[14px] md:text-[15px] pr-2">
                        {reason.description}
                      </p>
                    </motion.div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-14 md:mt-20"
        >
          <div className="inline-flex items-center gap-3 text-accent">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-accent" />
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-accent" />
          </div>
          <p className="text-lg md:text-xl lg:text-2xl font-serif italic text-foreground/80 mt-4 max-w-3xl mx-auto leading-relaxed">
            &ldquo;We Believe That the Right Environment Inspires the Right Mindset.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
