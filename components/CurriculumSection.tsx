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
    color: 'bg-accent/10 text-accent-foreground border-accent/20',
    dotColor: 'bg-accent',
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
    color: 'bg-primary/10 text-primary border-primary/20',
    dotColor: 'bg-primary',
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
    color: 'bg-secondary/10 text-secondary border-secondary/20',
    dotColor: 'bg-secondary',
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
    description: 'A strong foundation in science, mathematics, languages, and humanities — built through innovative teaching methods that go beyond rote memorisation.',
    image: '/images/campus/classroom.jpg',
  },
  {
    icon: Palette,
    title: 'Arts & Aesthetics',
    description: 'Dance, art, craft, and theatre — creative spaces that celebrate every child\'s imagination and foster self-expression through performing and visual arts.',
    image: '/images/campus/arts.jpg',
  },
  {
    icon: Brain,
    title: 'Life Skills',
    description: 'Critical thinking, communication, collaboration, and leadership workshops that equip students with the skills they need beyond the classroom.',
    image: '/images/campus/computer-lab.jpg',
  },
  {
    icon: HeartPulse,
    title: 'Wellness',
    description: 'Yoga, sports, mindfulness programmes, and regular wellness check-ups — nurturing physical and emotional well-being as the foundation of all learning.',
    image: '/images/campus/yoga.jpg',
  },
];

export default function CurriculumSection() {
  const [activeTab, setActiveTab] = useState<TabId>('curriculum');

  return (
    <section id="curriculum" className="py-24 bg-muted/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 space-y-3"
        >
          <p className="text-secondary font-serif text-sm uppercase tracking-widest font-semibold">
            What We Teach &amp; How We Grow
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">
            Curriculum &amp; Holistic Development
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            At IGS, education goes beyond textbooks — it is a journey of exploration, understanding, and development.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-16">
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 border-2 ${
              activeTab === 'curriculum'
                ? 'bg-primary text-white border-transparent shadow-lg'
                : 'bg-white text-primary border-primary/20 hover:shadow-md'
            }`}
          >
            Curriculum Overview
          </button>
          <button
            onClick={() => setActiveTab('holistic')}
            className={`px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 border-2 ${
              activeTab === 'holistic'
                ? 'bg-secondary text-white border-transparent shadow-lg'
                : 'bg-white text-secondary border-secondary/20 hover:shadow-md'
            }`}
          >
            Holistic Development
          </button>
        </div>

        {/* Curriculum Tab Content */}
        {activeTab === 'curriculum' && (
          <motion.div
            key="curriculum"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-center text-lg text-foreground max-w-3xl mx-auto mb-12">
              We follow a comprehensive and progressive curriculum framework that integrates academic excellence, skill development, and value-based learning. Every learning experience is crafted to balance intellectual growth with emotional and social development.
            </p>

            {/* Timeline-style stages */}
            <div className="relative">
              {/* Vertical line */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-border/40 -translate-x-1/2" />

              <div className="space-y-12 lg:space-y-16">
                {curriculumStages.map((stage, i) => {
                  const Icon = stage.icon;
                  const isEven = i % 2 === 0;

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="relative"
                    >
                      {/* Center dot (desktop) */}
                      <div className={`hidden lg:flex absolute left-1/2 top-8 -translate-x-1/2 w-5 h-5 rounded-full ${stage.dotColor} border-4 border-white shadow-md z-10`} />

                      <div className={`lg:grid lg:grid-cols-2 lg:gap-16 ${isEven ? '' : 'lg:direction-rtl'}`}>
                        <div className={isEven ? 'lg:text-right lg:pr-12' : 'lg:col-start-2 lg:pl-12'}>
                          <div className={`${stage.color} rounded-2xl p-8 md:p-10 border`}>
                            <div className={`flex items-center gap-4 mb-4 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                              <div className="w-12 h-12 rounded-xl bg-white/60 flex items-center justify-center shrink-0">
                                <Icon className="w-6 h-6" />
                              </div>
                              <div className={isEven ? 'lg:text-right' : ''}>
                                <h3 className="font-serif font-bold text-2xl">{stage.stage}</h3>
                                <p className="text-sm font-semibold uppercase tracking-wider opacity-70">{stage.grades}</p>
                              </div>
                            </div>

                            <p className={`text-foreground leading-relaxed mb-4 ${isEven ? 'lg:text-right' : ''}`}>
                              {stage.description}
                            </p>

                            <ul className={`space-y-2 ${isEven ? 'lg:text-right' : ''}`}>
                              {stage.skills.map((skill, j) => (
                                <li key={j} className={`flex items-start gap-2 text-foreground ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                                  <span className="text-sm mt-1.5 shrink-0">&#9679;</span>
                                  <span>{skill}</span>
                                </li>
                              ))}
                            </ul>

                            {stage.motto && (
                              <p className={`mt-4 italic font-serif text-sm opacity-70 ${isEven ? 'lg:text-right' : ''}`}>
                                &ldquo;{stage.motto}&rdquo;
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Bottom quote */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center mt-16"
            >
              <p className="text-xl font-serif italic text-primary">
                &ldquo;At Indo Global School, we prepare students not just for exams — but for life.&rdquo;
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* Holistic Development Tab Content */}
        {activeTab === 'holistic' && (
          <motion.div
            key="holistic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-center text-lg text-foreground max-w-3xl mx-auto mb-12">
              Our comprehensive learning framework nurtures every dimension of a child&apos;s growth — intellectual, creative, physical, and emotional — preparing them to thrive in all aspects of life.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {holisticAreas.map((area, i) => {
                const Icon = area.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                  >
                    {/* Background image */}
                    <div className="h-64 overflow-hidden">
                      <img
                        src={area.image}
                        alt={area.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>

                    {/* Content overlay */}
                    <div className="p-8 bg-white">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-serif font-bold text-xl text-primary">{area.title}</h3>
                      </div>
                      <p className="text-foreground leading-relaxed">{area.description}</p>
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
