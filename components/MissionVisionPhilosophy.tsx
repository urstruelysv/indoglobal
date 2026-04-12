'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Target, Eye, Sparkles, ChevronRight } from 'lucide-react';

const values = [
  {
    id: 'mission',
    icon: Target,
    label: 'Mission',
    color: 'primary',
    headline: 'What We Stand For',
    content: [
      'Inspiring a lifelong love for learning through innovative and engaging teaching.',
      'Developing character, leadership, and creativity in every child.',
      'Building a safe, inclusive, and nurturing environment where every learner feels valued.',
      'Empowering students with skills, confidence, and compassion to make a positive impact — locally and globally.',
    ],
    summary: 'To provide a holistic and future-ready education that blends global learning standards with the richness of Indian values.',
  },
  {
    id: 'vision',
    icon: Eye,
    label: 'Vision',
    color: 'secondary',
    headline: 'Where We\'re Headed',
    content: [
      'To nurture young minds into confident, compassionate, and globally aware leaders.',
      'To carry forward the light of knowledge and values into every community.',
      'To create a world where every child learns with curiosity, leads with integrity, and strives with purpose.',
      'To become a beacon of excellence in an ever-changing global society.',
    ],
    summary: 'A world where every child learns with curiosity, leads with integrity, and shines with purpose.',
  },
  {
    id: 'philosophy',
    icon: Sparkles,
    label: 'Core Philosophy',
    color: 'accent',
    headline: 'What We Believe',
    content: [
      'We do not make promises — we simply do justice to our responsibilities.',
      'Every child shines when given the right environment to learn, lead, and grow.',
      'Education is not confined to textbooks — it is an awakening of the mind and spirit.',
      'We shape confident, responsible, and compassionate young citizens.',
    ],
    summary: 'Every child shines when given the right environment to learn, lead, and grow.',
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string; icon: string; activeBg: string }> = {
  primary: { bg: 'bg-primary/5', text: 'text-primary', border: 'border-primary/20', icon: 'bg-primary/10', activeBg: 'bg-primary' },
  secondary: { bg: 'bg-secondary/5', text: 'text-secondary', border: 'border-secondary/20', icon: 'bg-secondary/10', activeBg: 'bg-secondary' },
  accent: { bg: 'bg-accent/5', text: 'text-accent-foreground', border: 'border-accent/20', icon: 'bg-accent/10', activeBg: 'bg-accent' },
};

export default function MissionVisionPhilosophy() {
  const [active, setActive] = useState(0);
  const current = values[active];
  const colors = colorMap[current.color];

  return (
    <section id="values" className="py-24 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-3"
        >
          <p className="text-secondary font-serif text-sm uppercase tracking-widest font-semibold">
            Our Foundation
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">
            Mission &middot; Vision &middot; Philosophy
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The pillars that guide every decision we make and every child we shape.
          </p>
        </motion.div>

        {/* Tab Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {values.map((v, i) => {
            const Icon = v.icon;
            const isActive = i === active;
            return (
              <button
                key={v.id}
                onClick={() => setActive(i)}
                className={`flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 border-2 ${
                  isActive
                    ? `${colorMap[v.color].activeBg} text-white border-transparent shadow-lg scale-105`
                    : `bg-white ${colorMap[v.color].text} ${colorMap[v.color].border} hover:shadow-md`
                }`}
              >
                <Icon className="w-5 h-5" />
                {v.label}
              </button>
            );
          })}
        </motion.div>

        {/* Content Panel */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`${colors.bg} rounded-3xl p-10 md:p-16 border ${colors.border}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left — summary + icon */}
            <div className="space-y-6">
              <div className={`w-20 h-20 rounded-2xl ${colors.icon} flex items-center justify-center`}>
                <current.icon className={`w-10 h-10 ${colors.text}`} />
              </div>
              <h3 className={`text-3xl md:text-4xl font-serif font-bold ${colors.text}`}>
                {current.headline}
              </h3>
              <p className="text-xl text-foreground leading-relaxed font-serif italic">
                &ldquo;{current.summary}&rdquo;
              </p>
            </div>

            {/* Right — bullet points */}
            <div className="space-y-5">
              {current.content.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="flex items-start gap-4 bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-white/80"
                >
                  <div className={`w-8 h-8 rounded-lg ${colors.icon} flex items-center justify-center shrink-0 mt-0.5`}>
                    <ChevronRight className={`w-4 h-4 ${colors.text}`} />
                  </div>
                  <p className="text-foreground leading-relaxed text-lg">{point}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
