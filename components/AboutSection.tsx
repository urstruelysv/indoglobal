'use client';

import { motion } from 'framer-motion';

// India map outline — custom SVG
function IconIndiaMap({ className }: { className?: string }) {
  return (
    <motion.svg viewBox="0 0 48 48" fill="none" className={className}
      whileHover={{ scale: [1, 1.08, 1] }} transition={{ duration: 0.4 }}
    >
      <motion.path
        d="M24 4c-1 0-3 1-5 3-1.5 1.5-3 2-4.5 3.5-1 1-1.5 3-2 4.5-.5 2-1 3-1.5 5-.3 1 .2 2.5 0 4-.2 1.5-1 2.5-1 4s1 3 1.5 4.5c.5 1.5 1 2.5 2 3.5 1.5 1.5 2.5 2 4 3 1 .7 1.5 2 2.5 3s2 1.5 3 2c.7.3 1 1 1.5 1.5.3.3.5.5.5.5s.2-.2.5-.5c.5-.5.8-1.2 1.5-1.5 1-.5 2-1 3-2s1.5-2 2.5-3c1.5-1 2.5-1.5 4-3 1-1 1.5-2 2-3.5s1.5-3 1.5-4.5-0.8-2.5-1-4c-.2-1.5.3-3 0-4-.5-2-1-3-1.5-5-.5-1.5-1-3.5-2-4.5C30 7 29 6.5 27 5s-2-1-3-1z"
        stroke="currentColor" strokeWidth="2" fill="none"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ duration: 1 }}
      />
      {/* Flag tricolor */}
      <motion.rect x="20" y="16" width="8" height="2.5" rx="0.5" fill="#FF9933" />
      <motion.rect x="20" y="18.5" width="8" height="2.5" rx="0.5" fill="white" />
      <motion.rect x="20" y="21" width="8" height="2.5" rx="0.5" fill="#138808" />
      <motion.circle cx="24" cy="19.75" r="1.5" stroke="#000080" strokeWidth="0.6" fill="none"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
      {/* Gentle pulse on the map */}
      <motion.circle cx="24" cy="24" r="16" fill="currentColor" opacity={0.03}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.svg>
  );
}

// Open book with sparkle — experiential learning
function IconOpenBook({ className }: { className?: string }) {
  return (
    <motion.svg viewBox="0 0 48 48" fill="none" className={className}
      whileHover={{ rotate: [0, -3, 3, 0] }} transition={{ duration: 0.4 }}
    >
      <motion.path
        d="M6 10c4-2 8-2 12-1s6 3 6 3"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      />
      <motion.path
        d="M6 10v26c4-2 8-2 12-1s6 3 6 3V12"
        stroke="currentColor" strokeWidth="2.5" fill="none"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      />
      <motion.path
        d="M42 10c-4-2-8-2-12-1s-6 3-6 3"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      />
      <motion.path
        d="M42 10v26c-4-2-8-2-12-1s-6 3-6 3V12"
        stroke="currentColor" strokeWidth="2.5" fill="none"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      />
      {/* Sparkle on book — loops */}
      <motion.path
        d="M34 6l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z"
        fill="#FFB84D"
        animate={{ scale: [0.8, 1.2, 0.8], rotate: [0, 15, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.svg>
  );
}

// Lightbulb with brain — experiential learning
function IconBrainBulb({ className }: { className?: string }) {
  return (
    <motion.svg viewBox="0 0 48 48" fill="none" className={className}>
      <motion.path
        d="M24 6c-7 0-12 5-12 12 0 4.5 2.5 8 6 10v4h12v-4c3.5-2 6-5.5 6-10 0-7-5-12-12-12z"
        stroke="currentColor" strokeWidth="2.5" fill="none"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
      <motion.path d="M19 36h10M20 40h8"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.5 }}
      />
      {/* Brain squiggle inside */}
      <motion.path
        d="M20 17c1-1 3-1 4 0s1 3 0 4c2 0 3 1 3 3s-2 3-3 3"
        stroke="#FF8C42" strokeWidth="1.8" strokeLinecap="round" fill="none"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
      />
      {/* Glow pulse */}
      <motion.circle cx="24" cy="18" r="14" fill="currentColor" opacity={0.04}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.svg>
  );
}

// Shield with child — safe campus
function IconSafeChild({ className }: { className?: string }) {
  return (
    <motion.svg viewBox="0 0 48 48" fill="none" className={className}
      whileHover={{ y: [0, -3, 0] }} transition={{ duration: 0.4 }}
    >
      <motion.path
        d="M24 4L8 12v10c0 12 7 19 16 24 9-5 16-12 16-24V12L24 4z"
        stroke="currentColor" strokeWidth="2.5" fill="none"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
      {/* Child silhouette inside shield */}
      <motion.circle cx="24" cy="19" r="4" stroke="currentColor" strokeWidth="2" fill="none"
        initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
        transition={{ delay: 0.5, type: 'spring' }}
      />
      <motion.path d="M17 34c0-4 3-7 7-7s7 3 7 7"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.7 }}
      />
      {/* Green check — gentle pulse */}
      <motion.circle cx="36" cy="10" r="5" fill="#2B7F6B"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.path d="M34 10l1.5 1.5L38 8.5"
        stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      />
    </motion.svg>
  );
}

// Teacher with chalkboard — dedicated faculty
function IconTeacher({ className }: { className?: string }) {
  return (
    <motion.svg viewBox="0 0 48 48" fill="none" className={className}
      whileHover={{ scale: [1, 1.06, 1] }} transition={{ duration: 0.3 }}
    >
      {/* Board */}
      <motion.rect x="14" y="6" width="28" height="20" rx="2"
        stroke="currentColor" strokeWidth="2.5" fill="none"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      />
      {/* Writing on board */}
      <motion.path d="M19 13h18M19 18h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity={0.4}
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.4 }}
      />
      {/* Teacher figure */}
      <motion.circle cx="10" cy="30" r="4" stroke="currentColor" strokeWidth="2" fill="none"
        initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
        transition={{ delay: 0.4, type: 'spring' }}
      />
      <motion.path d="M4 44c0-4 3-7 6-7s6 3 6 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.4 }}
      />
      {/* Pointer hand */}
      <motion.path d="M14 32l6-6" stroke="#FF8C42" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.3 }}
      />
      <motion.circle cx="20" cy="26" r="1.5" fill="#FF8C42"
        animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.svg>
  );
}

// Kids playing — holistic growth
function IconKidsPlay({ className }: { className?: string }) {
  return (
    <motion.svg viewBox="0 0 48 48" fill="none" className={className}>
      {/* Child 1 — running */}
      <motion.circle cx="14" cy="10" r="3.5" stroke="currentColor" strokeWidth="2" fill="none"
        initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
        transition={{ type: 'spring', delay: 0.1 }}
      />
      <motion.path d="M14 14l-4 8 3 2-2 8M14 14l5 5-1 7 5 4M10 22l5 1"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      />
      {/* Child 2 — jumping */}
      <motion.circle cx="34" cy="8" r="3.5" stroke="currentColor" strokeWidth="2" fill="none"
        initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
        transition={{ type: 'spring', delay: 0.2 }}
      />
      <motion.path d="M34 12l3 7-4 1 1 8M34 12l-5 4 2 8-4 3M37 19l-5 2"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      />
      {/* Ball — bounces */}
      <motion.circle cx="24" cy="38" r="5" stroke="#FF8C42" strokeWidth="2" fill="none"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.path d="M21 35l6 6M21 41l6-6" stroke="#FF8C42" strokeWidth="1" opacity={0.5} />
      {/* Sparkle */}
      <motion.path d="M40 4l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5L36.5 7l2.5-1 1-2z"
        fill="#FFB84D"
        animate={{ rotate: [0, 20, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </motion.svg>
  );
}

const highlights = [
  {
    Icon: IconOpenBook,
    title: 'CBSE Excellence',
    description: 'Rigorous academics with skill-building and value education at every stage.',
    bg: 'bg-[rgba(15,118,110,0.05)]',
    hoverBg: 'group-hover:bg-[rgba(15,118,110,0.1)]',
    accent: 'bg-primary',
    iconColor: 'text-primary',
    ring: 'ring-primary/15',
  },
  {
    Icon: IconIndiaMap,
    title: 'Indian Roots, Global Wings',
    description: 'Grounded in Indian culture and wisdom, built for a global future.',
    bg: 'bg-[rgba(229,106,31,0.06)]',
    hoverBg: 'group-hover:bg-[rgba(229,106,31,0.12)]',
    accent: 'bg-secondary',
    iconColor: 'text-secondary',
    ring: 'ring-secondary/15',
  },
  {
    Icon: IconBrainBulb,
    title: 'Experiential Learning',
    description: 'Hands-on experiments, real projects, and curiosity-driven classrooms.',
    bg: 'bg-[rgba(240,167,38,0.08)]',
    hoverBg: 'group-hover:bg-[rgba(240,167,38,0.15)]',
    accent: 'bg-accent',
    iconColor: 'text-[#8A5A10]',
    ring: 'ring-accent/20',
  },
  {
    Icon: IconSafeChild,
    title: 'Safe & Secure',
    description: '24/7 CCTV, GPS buses, medical room — your child\'s safety is our priority.',
    bg: 'bg-[rgba(15,118,110,0.05)]',
    hoverBg: 'group-hover:bg-[rgba(15,118,110,0.1)]',
    accent: 'bg-primary',
    iconColor: 'text-primary',
    ring: 'ring-primary/15',
  },
  {
    Icon: IconTeacher,
    title: 'Passionate Faculty',
    description: 'Teachers who mentor, challenge, and bring out the best in every child.',
    bg: 'bg-[rgba(229,106,31,0.06)]',
    hoverBg: 'group-hover:bg-[rgba(229,106,31,0.12)]',
    accent: 'bg-secondary',
    iconColor: 'text-secondary',
    ring: 'ring-secondary/15',
  },
  {
    Icon: IconKidsPlay,
    title: 'Holistic Growth',
    description: 'Sports, arts, yoga, and life skills — shaping confident, well-rounded kids.',
    bg: 'bg-[rgba(240,167,38,0.08)]',
    hoverBg: 'group-hover:bg-[rgba(240,167,38,0.15)]',
    accent: 'bg-accent',
    iconColor: 'text-[#8A5A10]',
    ring: 'ring-accent/20',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative section-y surface-warm overflow-hidden">
      <div className="decor-blob top-20 -right-24 w-96 h-96 bg-primary/10" />
      <div className="max-w-7xl mx-auto px-5 md:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 md:mb-20 space-y-4"
        >
          <span className="eyebrow centered">Discover Our Story</span>
          <h2 className="font-serif font-bold">
            <span className="text-foreground">About </span>
            <span className="gradient-text-brand">Indo Global School</span>
          </h2>
          <div className="ornament"><span className="ornament-dot" /></div>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto pt-1">
            Where every child is encouraged to dream, explore, and shine.
          </p>
        </motion.div>

        {/* Two-column: image + text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 md:mb-24">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/15 via-accent/10 to-secondary/10 rounded-[2rem] blur-2xl group-hover:from-primary/20 group-hover:to-secondary/15 transition-all duration-500" />
            <div className="relative aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/3] rounded-2xl md:rounded-[1.5rem] overflow-hidden shadow-2xl border-4 border-card">
              <img
                src="/schoolbuilding.png"
                alt="Indo Global School Campus"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/20 to-transparent" />
              <div className="absolute bottom-5 left-5 md:bottom-6 md:left-6 text-white">
                <p className="font-serif font-bold text-lg md:text-xl drop-shadow">Our Campus</p>
                <p className="text-xs md:text-sm text-white/85">Kishan Nagar, Shadnagar</p>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-5 md:space-y-6"
          >
            <h3 className="font-serif font-bold">
              <span className="gradient-text-sunrise">Learn. Lead. Shine.</span>
            </h3>
            <p className="text-base md:text-lg text-foreground/90 leading-[1.8]">
              At Indo Global School, education is not merely the acquisition of knowledge — it is the art of shaping character, igniting curiosity, and cultivating leadership. We blend the best of global learning practices with the timeless strength of Indian values.
            </p>
            <p className="text-base md:text-lg text-foreground/90 leading-[1.8]">
              Every classroom is a vibrant space for discovery, dialogue, and creativity — inspiring children to become confident thinkers and compassionate leaders.
            </p>
            <div className="relative rounded-2xl p-5 md:p-6 overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(15,118,110,0.07), rgba(240,167,38,0.06))' }}>
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent" />
              <p className="text-[15px] md:text-base font-serif italic text-foreground leading-relaxed pl-2">
                &ldquo;Education at IGS is not confined to textbooks — it is an awakening of the mind and spirit.&rdquo;
              </p>
            </div>
          </motion.div>
        </div>

        {/* Cards — 2 columns on mobile, 3 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <div className={`relative h-full rounded-2xl p-5 md:p-7 bg-card border border-border/60 ring-1 ${item.ring} shadow-[0_2px_10px_-4px_rgba(15,42,63,0.06)] group-hover:shadow-[0_16px_40px_-16px_rgba(15,42,63,0.18)] transition-all duration-300 overflow-hidden`}>
                {/* Floating accent */}
                <div className={`absolute -top-6 -right-6 w-20 h-20 md:w-24 md:h-24 ${item.accent} rounded-full opacity-[0.06] group-hover:opacity-[0.14] group-hover:scale-[1.5] transition-all duration-700`} />

                {/* Soft bg surface on hover */}
                <div className={`absolute inset-0 ${item.bg} opacity-0 ${item.hoverBg.replace('group-hover:', 'group-hover:opacity-100 group-hover:')} transition-opacity duration-500`} />

                <div className="relative">
                  {/* Icon */}
                  <div className={`w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-5 ${item.iconColor} p-2 md:p-2.5 rounded-xl ${item.bg} inline-flex items-center justify-center ring-1 ${item.ring}`}>
                    <item.Icon className="w-full h-full" />
                  </div>

                  {/* Title */}
                  <h3 className="text-[15px] md:text-lg font-serif font-bold text-foreground mb-1.5 md:mb-2 leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-3 md:line-clamp-none">
                    {item.description}
                  </p>

                  {/* Accent bar on hover */}
                  <div className={`mt-4 md:mt-5 h-[3px] w-8 ${item.accent} rounded-full opacity-50 group-hover:w-16 group-hover:opacity-100 transition-all duration-500`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
