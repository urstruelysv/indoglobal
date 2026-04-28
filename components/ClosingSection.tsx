'use client';

import { motion } from 'framer-motion';

export default function ClosingSection() {
  return (
    <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/campus/school-building-hd.jpg"
          alt="Indo Global School Campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(15,118,110,0.92) 0%, rgba(11,94,88,0.88) 50%, rgba(8,63,60,0.92) 100%)' }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '36px 36px' }} />
      </div>

      {/* Decorative glow */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-7 md:space-y-10"
        >
          <div className="relative w-20 h-20 md:w-28 md:h-28 mx-auto">
            <div className="absolute -inset-2 bg-gradient-to-br from-accent/40 to-secondary/40 rounded-full blur-lg" />
            <div className="relative w-full h-full rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/30 ring-4 ring-white/5">
              <img
                src="/igs-logo.png"
                alt="IGS Logo"
                className="w-12 h-12 md:w-16 md:h-16 object-contain"
              />
            </div>
          </div>

          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[11px] md:text-xs font-bold uppercase tracking-[0.22em] text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Indo Global School
          </span>

          <h2 className="font-serif font-bold text-white leading-[1.1] drop-shadow-lg">
            Where Every Child Learns,<br className="hidden md:block" /> Leads, and <span className="text-accent">Shines.</span>
          </h2>

          <p className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
            At Indo Global School, we are not just educating children — we are building dreams, nurturing leaders, and inspiring global citizens rooted in Indian values.
          </p>

          <div className="inline-flex items-center gap-3 text-white/70">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-white/40" />
            <p className="font-serif text-sm md:text-lg italic">
              Thank you for believing in us. Thank you for choosing IGS.
            </p>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-white/40" />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 md:pt-4">
            <a
              href="#apply"
              className="w-full sm:w-auto px-9 md:px-10 py-3.5 md:py-4 rounded-full font-bold text-sm md:text-base text-primary shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 text-center"
              style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #FDEAD9 100%)' }}
            >
              Apply for Admission
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto px-9 md:px-10 py-3.5 md:py-4 bg-white/10 backdrop-blur-md text-white border-2 border-white/30 rounded-full font-bold text-sm md:text-base hover:bg-white/20 hover:border-white/50 hover:-translate-y-0.5 transition-all duration-300 text-center"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
