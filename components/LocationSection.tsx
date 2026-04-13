'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Clock } from 'lucide-react';

export default function LocationSection() {
  return (
    <section id="location" className="py-14 md:py-20 lg:py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-14 space-y-2 md:space-y-3"
        >
          <p className="text-secondary font-serif text-xs md:text-sm uppercase tracking-widest font-semibold">
            Visit Us in Kishan Nagar, Shadnagar
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary">
            School Location
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            Easily accessible with free transport facility for students.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-start">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="relative h-64 md:h-80 lg:h-96 rounded-xl md:rounded-2xl overflow-hidden shadow-md border border-border/20 group"
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
                className="bg-white/90 backdrop-blur-sm text-primary text-xs font-bold px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-md border border-primary/10 hover:bg-primary hover:text-white transition-all duration-300 flex items-center gap-1.5"
              >
                <MapPin size={11} />
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
            className="space-y-4 md:space-y-5"
          >
            <div className="space-y-2">
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary">Contact Us</h3>
              <p className="text-sm md:text-base text-foreground leading-relaxed">
                Reach out to schedule a campus visit or inquire about admissions.
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-3 md:space-y-4">
              {/* Address */}
              <div className="flex gap-3 md:gap-4 p-4 md:p-5 bg-white rounded-xl border border-border/20 hover:border-primary/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-sm md:text-base text-primary mb-0.5">Location</h4>
                  <p className="text-foreground text-sm">Kishan Nagar, Shadnagar, Telangana</p>
                  <p className="text-xs text-muted-foreground">Postal Code: 509410</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-3 md:gap-4 p-4 md:p-5 bg-white rounded-xl border border-border/20 hover:border-secondary/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-sm md:text-base text-primary mb-0.5">Phone</h4>
                  <div className="flex flex-col gap-0.5">
                    <a href="tel:+9121689898" className="text-foreground hover:text-secondary transition-colors text-sm font-medium">+91 21 68 98 98</a>
                    <a href="tel:+9121983838" className="text-foreground hover:text-secondary transition-colors text-sm font-medium">+91 21 98 38 38</a>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-3 md:gap-4 p-4 md:p-5 bg-white rounded-xl border border-border/20 hover:border-accent/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-sm md:text-base text-primary mb-0.5">Office Hours</h4>
                  <p className="text-foreground text-sm">Mon – Sat: 8:30 AM – 5:00 PM</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
