'use client';

import { motion } from 'framer-motion';

export default function ClosingSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/schoolbuilding.png"
          alt="Indo Global School Campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <div className="w-24 h-24 mx-auto rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <img
              src="/igs-logo.png"
              alt="IGS Logo"
              className="w-16 h-16 object-contain"
            />
          </div>

          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
            Where Every Child Learns, Leads, and Shines.
          </h2>

          <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
            At Indo Global School, we are not just educating children — we are building dreams, nurturing leaders, and inspiring global citizens rooted in Indian values. Every child who walks through our gate begins a journey of discovery.
          </p>

          <div className="pt-4">
            <p className="text-white/70 font-serif text-lg italic">
              Thank you for believing in us. Thank you for choosing IGS.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#apply"
              className="px-10 py-4 bg-white text-primary rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              Apply for Admission
            </a>
            <a
              href="#contact"
              className="px-10 py-4 bg-white/10 text-white border-2 border-white/30 rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
