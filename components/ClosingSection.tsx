'use client';

import { motion } from 'framer-motion';

export default function ClosingSection() {
  return (
    <section className="relative py-20 md:py-28 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/campus/school-building-hd.png"
          alt="Indo Global School Campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-5 md:space-y-8"
        >
          <div className="w-16 h-16 md:w-24 md:h-24 mx-auto rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <img
              src="/igs-logo.png"
              alt="IGS Logo"
              className="w-10 h-10 md:w-16 md:h-16 object-contain"
            />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
            Where Every Child Learns, Leads, and Shines.
          </h2>

          <p className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
            At Indo Global School, we are not just educating children — we are building dreams, nurturing leaders, and inspiring global citizens rooted in Indian values.
          </p>

          <div className="pt-2 md:pt-4">
            <p className="text-white/70 font-serif text-sm md:text-lg italic">
              Thank you for believing in us. Thank you for choosing IGS.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 pt-2 md:pt-4">
            <a
              href="#apply"
              className="w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 bg-white text-primary rounded-full font-bold text-sm md:text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-center"
            >
              Apply for Admission
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 bg-white/10 text-white border-2 border-white/30 rounded-full font-bold text-sm md:text-base hover:bg-white/20 transition-all duration-300 text-center"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
