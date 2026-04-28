'use client';

import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';

const highlights = [
  {
    title: 'Centralized A/C Campus',
    description: 'Fully air-conditioned classrooms and common areas for comfortable learning all year round.',
    image: '/images/campus/school-building-hd.png',
    span: 'col-span-2 row-span-2',
    mobileSpan: '',
    height: 'h-48 md:h-full',
  },
  {
    title: 'Smart Classrooms',
    description: 'Bright, airy spaces equipped with smart boards and digital learning aids.',
    image: '/images/campus/surveillance.png',
    span: '',
    mobileSpan: '',
    height: 'h-40 md:h-56',
  },
  {
    title: 'Science & Computer Labs',
    description: 'Modern labs encouraging practical learning and scientific thinking.',
    image: '/images/campus/science-lab.jpg',
    span: '',
    mobileSpan: '',
    height: 'h-40 md:h-56',
  },
  {
    title: 'Library of Inspiration',
    description: 'A curated collection of books to nurture imagination, knowledge, and curiosity.',
    image: '/images/campus/teacher-students.png',
    span: '',
    mobileSpan: '',
    height: 'h-40 md:h-56',
  },
  {
    title: 'Sports Arena',
    description: 'Cricket, football, basketball, athletics, tennis, kho-kho, volleyball, and indoor games.',
    image: '/images/campus/sports-arena.png',
    span: 'col-span-2',
    mobileSpan: '',
    height: 'h-40 md:h-56',
  },
  {
    title: 'Performing Arts Studio',
    description: 'Music, dance, and art spaces that celebrate every child\'s creative expression.',
    image: '/images/campus/performing-arts.png',
    span: '',
    mobileSpan: '',
    height: 'h-40 md:h-56',
  },
  {
    title: 'Safe Transportation',
    description: 'GPS-enabled school buses with trained attendants for safe and reliable commutes.',
    image: '/images/campus/transportation.png',
    span: '',
    mobileSpan: '',
    height: 'h-40 md:h-56',
  },
  {
    title: 'Health & Wellness',
    description: 'Medical room with first-aid facilities, regular wellness check-ups, and dedicated care.',
    image: '/images/campus/health-hygiene.png',
    span: 'col-span-2',
    mobileSpan: '',
    height: 'h-40 md:h-56',
  },
];

export default function CampusHighlights() {
  return (
    <section id="campus" className="relative section-y surface-warm overflow-hidden">
      <div className="decor-blob top-20 right-10 w-80 h-80 bg-secondary/12" />
      <div className="max-w-7xl mx-auto px-5 md:px-8 relative">
        <SectionHeader
          eyebrow="World-Class Facilities"
          title="Campus Highlights"
          subtitle="A sprawling 3-acre campus where every corner is thoughtfully designed to inspire learning, creativity, and comfort."
        />

        {/* Grid — 2 cols on mobile, 4 cols on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className={`group relative rounded-2xl md:rounded-[1.25rem] overflow-hidden cursor-pointer shadow-[0_4px_14px_-6px_rgba(15,42,63,0.15)] hover:shadow-[0_20px_40px_-16px_rgba(15,42,63,0.3)] transition-shadow duration-500 ${item.height} ${item.span}`}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Default overlay — title always visible */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F2E]/80 via-[#0A1F2E]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-1 h-4 bg-accent rounded-full" />
                </div>
                <h3 className="font-serif font-bold text-white text-sm md:text-lg lg:text-xl drop-shadow-lg leading-snug">
                  {item.title}
                </h3>
              </div>

              {/* Hover overlay — description appears */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center p-5 md:p-7" style={{ background: 'linear-gradient(135deg, rgba(15,118,110,0.92) 0%, rgba(11,94,88,0.92) 100%)' }}>
                <div className="text-center text-white space-y-3">
                  <h3 className="font-serif font-bold text-base md:text-xl">{item.title}</h3>
                  <div className="w-10 h-[2px] bg-accent mx-auto rounded-full" />
                  <p className="text-white/90 leading-relaxed text-xs md:text-sm max-w-xs mx-auto">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
