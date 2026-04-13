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
  },
  {
    icon: User,
    title: 'Child-Centred Learning',
    description: 'Each child learns at their own pace through experiential, activity-based, and enquiry-driven approaches. We don\'t fit children into a mould — we let them shape their own path to brilliance.',
    iconBg: 'bg-secondary/10',
    iconColor: 'text-secondary',
  },
  {
    icon: Award,
    title: 'Leadership & Values',
    description: 'Character building, moral education, and public speaking form the backbone of our learning philosophy. Every student is mentored to lead with integrity, empathy, and purpose.',
    iconBg: 'bg-accent/10',
    iconColor: 'text-accent-foreground',
  },
  {
    icon: Building2,
    title: 'Modern Infrastructure',
    description: 'A sprawling 3-acre campus with smart classrooms, digital learning systems, centralized air conditioning, and interactive spaces that encourage creativity and collaboration — infrastructure built for the learners of tomorrow.',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    icon: GraduationCap,
    title: 'Dedicated & Qualified Faculty',
    description: 'Our teachers are mentors who inspire learning beyond the classroom. They nurture every child\'s potential with passion, care, and expertise — helping children achieve their best.',
    iconBg: 'bg-secondary/10',
    iconColor: 'text-secondary',
  },
  {
    icon: Shield,
    title: 'Safety & Security',
    description: '24/7 surveillance, trained staff, GPS-enabled school buses, and a nurturing environment that ensures every child\'s safety and well-being — giving parents complete peace of mind.',
    iconBg: 'bg-accent/10',
    iconColor: 'text-accent-foreground',
  },
  {
    icon: Trophy,
    title: 'Sports & Co-Curricular Excellence',
    description: 'From basketball and football to tennis and athletics, from yoga and chess to art and music — we believe in the all-round development of every student, on and off the field.',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  {
    icon: HeartPulse,
    title: 'Wellness & Mindfulness',
    description: 'Yoga, mindfulness programmes, a dedicated medical room, and regular wellness check-ups — because a healthy mind and body are the foundation of all learning.',
    iconBg: 'bg-secondary/10',
    iconColor: 'text-secondary',
  },
];

export default function WhyChooseIGS() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="why-igs" className="py-14 md:py-20 lg:py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-14 space-y-2 md:space-y-3"
        >
          <p className="text-secondary font-serif text-xs md:text-sm uppercase tracking-widest font-semibold">
            The IGS Difference
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary">
            Why Choose Indo Global School?
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-xl mx-auto">
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
                  className={`w-full text-left rounded-xl md:rounded-2xl border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    isOpen
                      ? 'bg-white shadow-lg border-primary/20'
                      : 'bg-white border-border/20 hover:border-border/40 hover:shadow-sm'
                  }`}
                >
                  <div className="p-4 md:p-6">
                    {/* Header row */}
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className={`w-10 h-10 md:w-11 md:h-11 rounded-lg ${reason.iconBg} flex items-center justify-center shrink-0`}>
                        <Icon className={`w-5 h-5 ${reason.iconColor}`} />
                      </div>
                      <h3 className="text-[15px] md:text-lg font-serif font-bold text-primary flex-1 leading-snug">
                        {reason.title}
                      </h3>
                      <ChevronDown
                        className={`w-4 h-4 md:w-5 md:h-5 text-muted-foreground transition-transform duration-300 shrink-0 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
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
                      <p className="text-foreground leading-relaxed mt-3 md:mt-4 pl-[52px] md:pl-[60px] text-[14px] md:text-base">
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
          className="text-center mt-10 md:mt-14"
        >
          <p className="text-base md:text-lg lg:text-xl font-serif italic text-muted-foreground">
            &ldquo;We Believe That the Right Environment Inspires the Right Mindset.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
