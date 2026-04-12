'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Sparkles } from 'lucide-react';

const values = [
  {
    num: '01',
    icon: Target,
    title: 'Mission',
    text: 'To deliver a holistic, future-ready education that blends global learning standards with the richness of Indian values — inspiring creativity, character, and a lifelong love for learning.',
    bg: 'bg-primary/[0.07]',
    numColor: 'text-primary/10',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    titleColor: 'text-primary',
    textColor: 'text-foreground',
    accent: 'bg-primary',
  },
  {
    num: '02',
    icon: Eye,
    title: 'Vision',
    text: 'A world where every child learns with curiosity, leads with integrity, and shines with purpose — growing into a confident, compassionate, and globally aware citizen rooted in strong values.',
    bg: 'bg-secondary/[0.07]',
    numColor: 'text-secondary/10',
    iconBg: 'bg-secondary/10',
    iconColor: 'text-secondary',
    titleColor: 'text-secondary',
    textColor: 'text-foreground',
    accent: 'bg-secondary',
  },
  {
    num: '03',
    icon: Sparkles,
    title: 'Philosophy',
    text: 'Every child carries a spark of brilliance. We create the right environment for that spark to shine — because education is not confined to textbooks; it is an awakening of the mind and spirit.',
    bg: 'bg-accent/[0.07]',
    numColor: 'text-accent/10',
    iconBg: 'bg-accent/10',
    iconColor: 'text-accent-foreground',
    titleColor: 'text-primary',
    textColor: 'text-foreground',
    accent: 'bg-accent',
  },
];

export default function MissionVisionPhilosophy() {
  return (
    <section id="values" className="py-14 md:py-20 lg:py-24 bg-muted/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        {/* Header — matches site style */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-14 space-y-2 md:space-y-3"
        >
          <p className="text-secondary font-serif text-xs md:text-sm uppercase tracking-widest font-semibold">
            Our Foundation
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary">
            What Drives Us
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            The pillars that guide every decision we make and every child we shape.
          </p>
        </motion.div>

        {/* Cards — dark panels but with site's rounded style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className={`${v.bg} relative rounded-xl md:rounded-2xl overflow-hidden group`}
              >
                {/* Big background number */}
                <span className={`absolute -top-3 -right-1 text-[6.5rem] md:text-[7rem] lg:text-[8rem] font-serif font-black leading-none pointer-events-none select-none ${v.numColor}`}>
                  {v.num}
                </span>

                {/* Content — identical structure for all three */}
                <div className="relative z-10 p-6 md:p-7 lg:p-8 flex flex-col h-full">
                  {/* Icon */}
                  <div className={`w-10 h-10 md:w-11 md:h-11 rounded-lg ${v.iconBg} flex items-center justify-center mb-5`}>
                    <Icon className={`w-5 h-5 ${v.iconColor}`} />
                  </div>

                  {/* Title */}
                  <h3 className={`text-xl md:text-lg lg:text-xl font-serif font-bold ${v.titleColor} mb-3`}>
                    {v.title}
                  </h3>

                  {/* Text — dark on light, max readability */}
                  <p className={`text-[14px] md:text-[13.5px] lg:text-[15px] ${v.textColor} leading-[1.8] flex-1`}>
                    {v.text}
                  </p>

                  {/* Bottom accent */}
                  <div className={`mt-5 h-[3px] w-8 ${v.accent} rounded-full opacity-40 group-hover:w-14 group-hover:opacity-70 transition-all duration-500`} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
