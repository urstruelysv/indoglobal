'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Sparkles } from 'lucide-react';
import SectionHeader from './SectionHeader';

const values = [
  {
    icon: Eye,
    title: 'Vision',
    text: 'A world where every child learns with curiosity, leads with integrity, and shines with purpose — growing into a confident, compassionate, and globally aware citizen rooted in strong values.',
    gradient: 'linear-gradient(135deg, rgba(229,106,31,0.08) 0%, rgba(229,106,31,0.02) 100%)',
    ringClass: 'ring-secondary/15',
    iconBg: 'bg-secondary/10',
    iconColor: 'text-secondary',
    titleColor: 'text-secondary',
    accent: 'bg-secondary',
    topBar: 'bg-gradient-to-r from-secondary to-secondary/60',
  },
  {
    icon: Target,
    title: 'Mission',
    text: 'To deliver a holistic, future-ready education that blends global learning standards with the richness of Indian values — inspiring creativity, character, and a lifelong love for learning.',
    gradient: 'linear-gradient(135deg, rgba(15,118,110,0.08) 0%, rgba(15,118,110,0.02) 100%)',
    ringClass: 'ring-primary/15',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    titleColor: 'text-primary',
    accent: 'bg-primary',
    topBar: 'bg-gradient-to-r from-primary to-primary/60',
  },
  {
    icon: Sparkles,
    title: 'Philosophy',
    text: 'Every child carries a spark of brilliance. We create the right environment for that spark to shine — because education is not confined to textbooks; it is an awakening of the mind and spirit.',
    gradient: 'linear-gradient(135deg, rgba(240,167,38,0.1) 0%, rgba(240,167,38,0.02) 100%)',
    ringClass: 'ring-accent/20',
    iconBg: 'bg-accent/15',
    iconColor: 'text-[#8A5A10]',
    titleColor: 'text-[#8A5A10]',
    accent: 'bg-accent',
    topBar: 'bg-gradient-to-r from-accent to-accent/60',
  },
];

export default function MissionVisionPhilosophy() {
  return (
    <section id="values" className="relative section-y overflow-hidden" style={{ background: 'linear-gradient(180deg, var(--background) 0%, #FAF3E4 100%)' }}>
      <div className="decor-blob top-20 left-10 w-80 h-80 bg-primary/8" />
      <div className="decor-blob bottom-20 right-10 w-80 h-80 bg-secondary/10" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative">
        <SectionHeader
          eyebrow="Our Foundation"
          title="What Drives Us"
          subtitle="The pillars that guide every decision we make and every child we shape."
        />

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className={`relative rounded-2xl md:rounded-[1.5rem] overflow-hidden group bg-card border border-border/60 ring-1 ${v.ringClass} shadow-[0_2px_12px_-4px_rgba(15,42,63,0.06)] hover:shadow-[0_20px_50px_-20px_rgba(15,42,63,0.2)] transition-all duration-500`}
                style={{ backgroundImage: v.gradient }}
              >
                {/* Top gradient bar */}
                <div className={`h-1.5 w-full ${v.topBar}`} />

                {/* Content */}
                <div className="relative z-10 p-7 md:p-8 lg:p-10 flex flex-col h-full">
                  {/* Icon */}
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl ${v.iconBg} flex items-center justify-center mb-6 ring-1 ${v.ringClass}`}>
                    <Icon className={`w-6 h-6 ${v.iconColor}`} />
                  </div>

                  {/* Title */}
                  <h3 className={`text-2xl md:text-xl lg:text-2xl font-serif font-bold ${v.titleColor} mb-3`}>
                    {v.title}
                  </h3>

                  {/* Text */}
                  <p className="text-[15px] md:text-[14px] lg:text-[15.5px] text-foreground/85 leading-[1.85] flex-1">
                    {v.text}
                  </p>

                  {/* Bottom accent */}
                  <div className={`mt-6 h-[3px] w-10 ${v.accent} rounded-full opacity-60 group-hover:w-20 group-hover:opacity-100 transition-all duration-500`} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
