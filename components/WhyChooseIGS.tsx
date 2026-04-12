'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Globe, User, Award, Building2, GraduationCap, Shield, Trophy, Dumbbell, ChevronDown } from 'lucide-react';

const reasons = [
  {
    icon: Globe,
    title: 'Global Perspective with Indian Roots',
    description: 'A curriculum designed to balance modern educational standards with traditional cultural wisdom. We prepare children to thrive globally while staying rooted in the values that define who they are.',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: User,
    title: 'Child-Centred Learning',
    description: 'Each child learns at their own pace through experiential, activity-based, and enquiry-driven approaches. We don\'t fit children into a mould — we let them shape their own path to brilliance.',
    color: 'bg-secondary/10 text-secondary',
  },
  {
    icon: Award,
    title: 'Leadership & Values',
    description: 'Character building, moral education, and public speaking form the backbone of our learning philosophy. Every student is mentored to lead with integrity, empathy, and purpose.',
    color: 'bg-accent/10 text-accent-foreground',
  },
  {
    icon: Building2,
    title: 'Modern Infrastructure',
    description: 'Smart classrooms, digital learning systems, centralized air conditioning, and interactive spaces that encourage creativity and collaboration — infrastructure built for the learners of tomorrow.',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: GraduationCap,
    title: 'Dedicated & Qualified Faculty',
    description: 'Our teachers are mentors who inspire learning beyond the classroom. They nurture every child\'s potential with passion, care, and expertise — helping children achieve their best.',
    color: 'bg-secondary/10 text-secondary',
  },
  {
    icon: Shield,
    title: 'Safety & Security',
    description: '24/7 surveillance, trained staff, GPS-enabled school buses, and a nurturing environment that ensures every child\'s safety and well-being — giving parents complete peace of mind.',
    color: 'bg-accent/10 text-accent-foreground',
  },
  {
    icon: Trophy,
    title: 'Sports & Co-Curricular Excellence',
    description: 'From basketball and football to tennis and athletics, from yoga and chess to art and music — we believe in the all-round development of every student, on and off the field.',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: Dumbbell,
    title: 'Wellness & Mindfulness',
    description: 'Yoga, mindfulness programmes, a dedicated medical room, and regular wellness check-ups — because a healthy mind and body are the foundation of all learning.',
    color: 'bg-secondary/10 text-secondary',
  },
];

export default function WhyChooseIGS() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="why-igs" className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <p className="text-secondary font-serif text-sm uppercase tracking-widest font-semibold">
            The IGS Difference
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">
            Why Choose Indo Global School?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Eight reasons parents trust us with what matters most — their children&apos;s future.
          </p>
        </motion.div>

        {/* Accordion Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className={`w-full text-left rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? 'bg-white shadow-lg border-primary/20 scale-[1.02]'
                      : 'bg-white border-border/20 hover:border-border/40 hover:shadow-md'
                  }`}
                >
                  <div className="p-6 md:p-8">
                    {/* Header row */}
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl ${reason.color} flex items-center justify-center shrink-0`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg md:text-xl font-serif font-bold text-primary flex-1">
                        {reason.title}
                      </h3>
                      <ChevronDown
                        className={`w-5 h-5 text-muted-foreground transition-transform duration-300 shrink-0 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </div>

                    {/* Expandable content */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: isOpen ? 'auto' : 0,
                        opacity: isOpen ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-foreground leading-relaxed mt-4 pl-16 text-base">
                        {reason.description}
                      </p>
                    </motion.div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-xl font-serif italic text-muted-foreground">
            &ldquo;We Believe That the Right Environment Inspires the Right Mindset.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
