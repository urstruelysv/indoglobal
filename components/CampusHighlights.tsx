'use client';

import { motion } from 'framer-motion';

const highlights = [
  {
    title: 'Centralized A/C Campus',
    description: 'Fully air-conditioned classrooms and common areas for comfortable learning all year round.',
    image: '/images/campus/classroom.jpg',
    span: 'md:col-span-2 md:row-span-2',
    height: 'h-72 md:h-full',
  },
  {
    title: 'Smart Classrooms',
    description: 'Bright, airy spaces equipped with smart boards and digital learning aids.',
    image: '/images/campus/computer-lab.jpg',
    span: '',
    height: 'h-64',
  },
  {
    title: 'Science & Computer Labs',
    description: 'Modern labs encouraging practical learning and scientific thinking.',
    image: '/images/campus/science-lab.jpg',
    span: '',
    height: 'h-64',
  },
  {
    title: 'Library of Inspiration',
    description: 'A curated collection of books to nurture imagination, knowledge, and curiosity.',
    image: '/images/campus/library.jpg',
    span: '',
    height: 'h-64',
  },
  {
    title: 'Sports Arena',
    description: 'Play grounds for cricket, football, basketball, athletics, tennis, kho-kho, volleyball, and indoor games.',
    image: '/images/campus/sports.jpg',
    span: 'md:col-span-2',
    height: 'h-64',
  },
  {
    title: 'Performing Arts Studio',
    description: 'Music, dance, and art spaces that celebrate every child\'s creative expression.',
    image: '/images/campus/arts.jpg',
    span: '',
    height: 'h-64',
  },
  {
    title: 'Playground & Kidz Arena',
    description: 'Safe, colourful play areas designed for exploration, fun, and physical development.',
    image: '/images/campus/playground.jpg',
    span: '',
    height: 'h-64',
  },
  {
    title: 'Yoga & Wellness Zone',
    description: 'Dedicated spaces for yoga, mindfulness, and physical fitness — nurturing body and mind.',
    image: '/images/campus/yoga.jpg',
    span: 'md:col-span-2',
    height: 'h-64',
  },
];

export default function CampusHighlights() {
  return (
    <section id="campus" className="py-24 bg-background overflow-hidden">
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
            Our World-Class Facilities
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">
            Campus Highlights
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every corner of our campus has been thoughtfully designed to inspire learning, creativity, and comfort.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer ${item.span} ${item.height}`}
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
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif font-bold text-white text-xl drop-shadow-lg">
                  {item.title}
                </h3>
              </div>

              {/* Hover overlay — description appears */}
              <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-8">
                <div className="text-center text-white space-y-3">
                  <h3 className="font-serif font-bold text-2xl">{item.title}</h3>
                  <p className="text-white/90 leading-relaxed max-w-sm mx-auto">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
