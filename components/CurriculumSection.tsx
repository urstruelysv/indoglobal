'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { BookOpen, Palette, Brain, HeartPulse, Baby, School, GraduationCap } from 'lucide-react';

type TabId = 'curriculum' | 'holistic';

const curriculumStages = [
  {
    icon: Baby,
    stage: 'Foundation Stage',
    grades: 'Pre-Primary',
    color: 'bg-gradient-to-br from-accent/[0.08] to-accent/[0.02]',
    borderColor: 'border-accent/25',
    dotColor: 'bg-accent',
    iconColor: 'text-[#8A5A10]',
    description: 'The early years are the corner stone of a child\'s development. Our Pre-Primary curriculum focuses on joyful learning through play, storytelling, music, movement, and creative exploration.',
    skills: [
      'Early literacy and numeracy skills',
      'Fine and gross motor coordination',
      'Language and communication skills',
      'Emotional and social awareness',
    ],
    motto: 'We nurture curiosity before we nurture knowledge.',
  },
  {
    icon: School,
    stage: 'Primary Stage',
    grades: 'Grade I – V',
    color: 'bg-gradient-to-br from-primary/[0.08] to-primary/[0.02]',
    borderColor: 'border-primary/25',
    dotColor: 'bg-primary',
    iconColor: 'text-primary',
    description: 'Children are introduced to a structured learning environment that encourages curiosity and self-expression. Our integrated curriculum blends core subjects with arts, sports, and life skills for balanced development.',
    skills: [
      'Concept-based learning in English, Math, Science, and Social Science',
      'Introduction to computers, AI, and technology',
      'Value education and environmental awareness',
      'Emphasis on reading, creative writing, and public speaking',
    ],
    motto: null,
  },
  {
    icon: GraduationCap,
    stage: 'Middle Stage',
    grades: 'Grade VI – VII',
    color: 'bg-gradient-to-br from-secondary/[0.08] to-secondary/[0.02]',
    borderColor: 'border-secondary/25',
    dotColor: 'bg-secondary',
    iconColor: 'text-secondary',
    description: 'Students transition into higher-order learning, analytical thinking, and leadership development. We promote project-based learning, research activities, and collaborative methods that prepare children for real-world challenges.',
    skills: [
      'Advanced Science and Mathematics concepts',
      'Exposure to social and global studies',
      'ICT, IT, and AI integration across subjects',
      'Art, physical education, and leadership training',
    ],
    motto: null,
  },
];

const holisticAreas = [
  {
    icon: BookOpen,
    title: 'Academics',
    description: 'A strong foundation in science, mathematics, languages, and humanities — built through innovative teaching that goes beyond rote memorisation.',
    image: '/images/campus/teacher-students.png',
    iconColor: 'text-primary',
    iconBg: 'bg-primary/10',
  },
  {
    icon: Palette,
    title: 'Arts & Aesthetics',
    description: 'Dance, art, craft, and theatre — creative spaces that celebrate every child\'s imagination and foster self-expression.',
    image: '/images/campus/performing-arts.png',
    iconColor: 'text-secondary',
    iconBg: 'bg-secondary/10',
  },
  {
    icon: Brain,
    title: 'Life Skills',
    description: 'Critical thinking, communication, collaboration, and leadership workshops that equip students with skills beyond the classroom.',
    image: '/images/campus/students-trophy.png',
    iconColor: 'text-accent-foreground',
    iconBg: 'bg-accent/10',
  },
  {
    icon: HeartPulse,
    title: 'Wellness',
    description: 'Yoga, sports, mindfulness programmes, and regular wellness check-ups — nurturing physical and emotional well-being.',
    image: '/images/campus/sports-arena.png',
    iconColor: 'text-primary',
    iconBg: 'bg-primary/10',
  },
];

export default function CurriculumSection() {
  const [activeTab, setActiveTab] = useState<TabId>('curriculum');

  return (
    <section id="curriculum" className="relative section-y overflow-hidden" style={{ background: 'linear-gradient(180deg, #FAF3E4 0%, var(--background) 100%)' }}>
      <div className="decor-blob top-10 right-10 w-96 h-96 bg-accent/12" />
      <div className="decor-blob bottom-10 left-10 w-80 h-80 bg-primary/8" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16 space-y-4"
        >
          <span className="eyebrow centered">What We Teach &amp; How We Grow</span>
          <h2 className="font-serif font-bold">
            <span className="text-foreground">Curriculum &amp; </span>
            <span className="gradient-text-sunrise">Holistic Development</span>
          </h2>
          <div className="ornament"><span className="ornament-dot" /></div>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto pt-1">
            At IGS, education goes beyond textbooks — it is a journey of exploration, understanding, and development.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-12 md:mb-16">
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`px-6 md:px-9 py-3 md:py-3.5 rounded-full font-semibold text-sm md:text-base transition-all duration-300 ${
              activeTab === 'curriculum'
                ? 'text-white shadow-lg -translate-y-0.5'
                : 'bg-card text-primary border-2 border-primary/20 hover:border-primary/40 hover:shadow-sm'
            }`}
            style={activeTab === 'curriculum' ? { background: 'var(--gradient-brand)', boxShadow: '0 10px 26px -10px rgba(15,118,110,0.5)' } : {}}
          >
            Curriculum Overview
          </button>
          <button
            onClick={() => setActiveTab('holistic')}
            className={`px-6 md:px-9 py-3 md:py-3.5 rounded-full font-semibold text-sm md:text-base transition-all duration-300 ${
              activeTab === 'holistic'
                ? 'text-white shadow-lg -translate-y-0.5'
                : 'bg-card text-secondary border-2 border-secondary/20 hover:border-secondary/40 hover:shadow-sm'
            }`}
            style={activeTab === 'holistic' ? { background: 'var(--gradient-sunrise)', boxShadow: '0 10px 26px -10px rgba(229,106,31,0.5)' } : {}}
          >
            Holistic Development
          </button>
        </div>

        {/* Curriculum Tab Content */}
        {activeTab === 'curriculum' && (
          <motion.div
            key="curriculum"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-center text-sm md:text-base lg:text-lg text-foreground max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed">
              We follow a comprehensive and progressive curriculum framework that integrates academic excellence, skill development, and value-based learning.
            </p>

            {/* Stacked cards instead of timeline — mobile-friendly */}
            <div className="space-y-4 md:space-y-5 max-w-3xl mx-auto">
              {curriculumStages.map((stage, i) => {
                const Icon = stage.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className={`${stage.color} rounded-2xl md:rounded-[1.25rem] p-6 md:p-8 lg:p-10 border ${stage.borderColor} shadow-[0_2px_12px_-4px_rgba(15,42,63,0.06)] hover:shadow-[0_12px_32px_-12px_rgba(15,42,63,0.14)] transition-shadow duration-500`}
                  >
                    <div className="flex items-start gap-4 md:gap-5 mb-4 md:mb-5">
                      <div className="relative shrink-0">
                        <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-card/80 backdrop-blur-sm flex items-center justify-center ring-1 ${stage.borderColor}`}>
                          <Icon className={`w-6 h-6 md:w-7 md:h-7 ${stage.iconColor}`} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <span className={`inline-block text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1.5`}>{stage.grades}</span>
                        <h3 className="font-serif font-bold text-xl md:text-2xl lg:text-[1.75rem] text-foreground leading-tight">{stage.stage}</h3>
                      </div>
                    </div>

                    <p className="text-foreground/85 leading-[1.8] mb-5 md:mb-6 text-[15px] md:text-base">
                      {stage.description}
                    </p>

                    <ul className="space-y-2.5 md:space-y-3">
                      {stage.skills.map((skill, j) => (
                        <li key={j} className="flex items-start gap-3 text-foreground/90 text-[14px] md:text-[15px]">
                          <span className={`w-1.5 h-1.5 rounded-full ${stage.dotColor} mt-2.5 shrink-0`} />
                          <span className="flex-1">{skill}</span>
                        </li>
                      ))}
                    </ul>

                    {stage.motto && (
                      <p className={`mt-5 md:mt-6 pt-4 border-t ${stage.borderColor} italic font-serif text-sm md:text-[15px] ${stage.iconColor}`}>
                        &ldquo;{stage.motto}&rdquo;
                      </p>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom quote */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center mt-14 md:mt-20"
            >
              <div className="inline-flex items-center gap-3 text-primary mb-4">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-primary" />
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-primary" />
              </div>
              <p className="text-lg md:text-xl lg:text-2xl font-serif italic gradient-text-brand max-w-3xl mx-auto leading-relaxed">
                &ldquo;At Indo Global School, we prepare students not just for exams — but for life.&rdquo;
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* Holistic Development Tab Content */}
        {activeTab === 'holistic' && (
          <motion.div
            key="holistic"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-center text-sm md:text-base lg:text-lg text-foreground max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed">
              Our comprehensive learning framework nurtures every dimension of a child&apos;s growth — intellectual, creative, physical, and emotional.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              {holisticAreas.map((area, i) => {
                const Icon = area.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="group relative rounded-2xl md:rounded-[1.25rem] overflow-hidden shadow-[0_2px_12px_-4px_rgba(15,42,63,0.08)] hover:shadow-[0_20px_50px_-20px_rgba(15,42,63,0.22)] hover:-translate-y-1 transition-all duration-500 bg-card border border-border/60"
                  >
                    {/* Image */}
                    <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden">
                      <img
                        src={area.image}
                        alt={area.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Content */}
                    <div className="p-5 md:p-7">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-11 h-11 md:w-12 md:h-12 rounded-xl ${area.iconBg} flex items-center justify-center ring-1 ring-inset`} style={{ borderColor: 'transparent' }}>
                          <Icon className={`w-5 h-5 ${area.iconColor}`} />
                        </div>
                        <h3 className="font-serif font-bold text-lg md:text-xl text-foreground">{area.title}</h3>
                      </div>
                      <p className="text-foreground/80 leading-relaxed text-sm md:text-[15px]">{area.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
