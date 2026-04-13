'use client';

import { motion } from 'framer-motion';

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
    <section id="campus" className="py-14 md:py-20 lg:py-24 bg-background overflow-hidden">
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
            Our World-Class Facilities
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary">
            Campus Highlights
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            Spread across a sprawling <span className="text-primary font-semibold">3-acre campus</span>, every corner has been thoughtfully designed to inspire learning, creativity, and comfort.
          </p>
        </motion.div>

        {/* Grid — 2 cols on mobile, 4 cols on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3">
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className={`group relative rounded-xl md:rounded-2xl overflow-hidden cursor-pointer ${item.height} ${item.span}`}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Default overlay — title always visible */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5">
                <h3 className="font-serif font-bold text-white text-sm md:text-lg lg:text-xl drop-shadow-lg leading-snug">
                  {item.title}
                </h3>
              </div>

              {/* Hover overlay — description appears */}
              <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 md:p-6">
                <div className="text-center text-white space-y-2">
                  <h3 className="font-serif font-bold text-base md:text-xl">{item.title}</h3>
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
