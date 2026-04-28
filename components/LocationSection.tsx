'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Clock } from 'lucide-react';
import SectionHeader from './SectionHeader';

export default function LocationSection() {
  return (
    <section id="location" className="relative section-y surface-warm overflow-hidden">
      <div className="decor-blob top-10 left-10 w-80 h-80 bg-secondary/10" />
      <div className="max-w-7xl mx-auto px-5 md:px-8 relative">
        <SectionHeader
          eyebrow="Visit Us"
          title="School Location"
          subtitle="Kishan Nagar, Shadnagar — easily accessible with free transport facility for students."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="relative h-72 md:h-96 lg:h-[28rem] rounded-2xl md:rounded-[1.5rem] overflow-hidden shadow-xl border-4 border-card group"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3813.5068225215715!2d78.16875697519143!3d17.055700083775466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDAzJzIwLjUiTiA3OMKwMTAnMTYuOCJF!5e0!3m2!1sen!2sin!4v1712411516000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Indo Global School Location"
              className="grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4">
              <a
                href="https://www.google.com/maps/place/17%C2%B003'20.5%22N+78%C2%B010'16.8%22E/@17.0557001,78.1713319,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-card/95 backdrop-blur-md text-primary text-xs md:text-sm font-bold px-4 py-2 md:px-5 md:py-2.5 rounded-full shadow-lg border border-primary/15 hover:bg-primary hover:text-white hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
              >
                <MapPin size={14} />
                View on Google Maps
              </a>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-foreground">Contact Us</h3>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Reach out to schedule a campus visit or inquire about admissions.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 p-5 md:p-6 bg-card rounded-2xl border border-border/60 hover:border-primary/30 hover:shadow-[0_12px_28px_-12px_rgba(15,42,63,0.15)] hover:-translate-y-0.5 transition-all duration-300 ring-1 ring-primary/10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 ring-1 ring-primary/15 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-base md:text-lg text-foreground mb-1">Location</h4>
                  <p className="text-foreground/85 text-[15px]">Kishan Nagar, Shadnagar, Telangana</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Postal Code: 509410</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 md:p-6 bg-card rounded-2xl border border-border/60 hover:border-secondary/30 hover:shadow-[0_12px_28px_-12px_rgba(15,42,63,0.15)] hover:-translate-y-0.5 transition-all duration-300 ring-1 ring-secondary/10">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 ring-1 ring-secondary/15 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-base md:text-lg text-foreground mb-1">Phone</h4>
                  <div className="flex flex-col gap-1">
                    <a href="tel:+9121689898" className="text-foreground hover:text-secondary transition-colors text-[15px] font-medium">+91 21 68 98 98</a>
                    <a href="tel:+9121983838" className="text-foreground hover:text-secondary transition-colors text-[15px] font-medium">+91 21 98 38 38</a>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 p-5 md:p-6 bg-card rounded-2xl border border-border/60 hover:border-accent/30 hover:shadow-[0_12px_28px_-12px_rgba(15,42,63,0.15)] hover:-translate-y-0.5 transition-all duration-300 ring-1 ring-accent/15">
                <div className="w-12 h-12 rounded-xl bg-accent/15 ring-1 ring-accent/20 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#8A5A10]" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-base md:text-lg text-foreground mb-1">Office Hours</h4>
                  <p className="text-foreground/85 text-[15px]">Mon – Sat: 8:30 AM – 5:00 PM</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
