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
    color: 'bg-accent/[0.07]',
    borderColor: 'border-accent/20',
    dotColor: 'bg-accent',
    iconColor: 'text-accent-foreground',
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
    color: 'bg-primary/[0.07]',
    borderColor: 'border-primary/20',
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
    color: 'bg-secondary/[0.07]',
    borderColor: 'border-secondary/20',
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
    <section id="curriculum" className="py-14 md:py-20 lg:py-24 bg-muted/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12 space-y-2 md:space-y-3"
        >
          <p className="text-secondary font-serif text-xs md:text-sm uppercase tracking-widest font-semibold">
            What We Teach &amp; How We Grow
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary">
            Curriculum &amp; Holistic Development
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            At IGS, education goes beyond textbooks — it is a journey of exploration, understanding, and development.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 md:gap-3 mb-8 md:mb-12">
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`px-5 md:px-8 py-2.5 md:py-3 rounded-full font-semibold text-sm md:text-base transition-all duration-300 border-2 ${
              activeTab === 'curriculum'
                ? 'bg-primary text-white border-transparent shadow-md'
                : 'bg-white text-primary border-primary/20 hover:shadow-sm'
            }`}
          >
            Curriculum Overview
          </button>
          <button
            onClick={() => setActiveTab('holistic')}
            className={`px-5 md:px-8 py-2.5 md:py-3 rounded-full font-semibold text-sm md:text-base transition-all duration-300 border-2 ${
              activeTab === 'holistic'
                ? 'bg-secondary text-white border-transparent shadow-md'
                : 'bg-white text-secondary border-secondary/20 hover:shadow-sm'
            }`}
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
                    className={`${stage.color} rounded-xl md:rounded-2xl p-5 md:p-7 lg:p-8 border ${stage.borderColor}`}
                  >
                    <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-white/60 flex items-center justify-center shrink-0">
                        <Icon className={`w-5 h-5 md:w-6 md:h-6 ${stage.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-lg md:text-xl lg:text-2xl text-primary">{stage.stage}</h3>
                        <p className="text-xs md:text-sm font-semibold uppercase tracking-wider text-muted-foreground">{stage.grades}</p>
                      </div>
                    </div>

                    <p className="text-foreground leading-relaxed mb-3 md:mb-4 text-[14px] md:text-base">
                      {stage.description}
                    </p>

                    <ul className="space-y-1.5 md:space-y-2">
                      {stage.skills.map((skill, j) => (
                        <li key={j} className="flex items-start gap-2 text-foreground text-[13px] md:text-sm">
                          <span className={`w-1.5 h-1.5 rounded-full ${stage.dotColor} mt-1.5 shrink-0`} />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>

                    {stage.motto && (
                      <p className="mt-3 md:mt-4 italic font-serif text-xs md:text-sm text-muted-foreground">
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
              className="text-center mt-10 md:mt-14"
            >
              <p className="text-base md:text-lg lg:text-xl font-serif italic text-primary">
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
                    className="group relative rounded-xl md:rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white border border-border/20"
                  >
                    {/* Image */}
                    <div className="h-40 md:h-48 lg:h-56 overflow-hidden">
                      <img
                        src={area.image}
                        alt={area.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4 md:p-6">
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className={`w-8 h-8 md:w-9 md:h-9 rounded-lg ${area.iconBg} flex items-center justify-center`}>
                          <Icon className={`w-4 h-4 ${area.iconColor}`} />
                        </div>
                        <h3 className="font-serif font-bold text-base md:text-lg text-primary">{area.title}</h3>
                      </div>
                      <p className="text-foreground leading-relaxed text-[13px] md:text-sm">{area.description}</p>
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
