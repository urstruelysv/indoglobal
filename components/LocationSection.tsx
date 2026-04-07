'use client';

import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function LocationSection() {
  return (
    <section id="location" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-secondary font-serif text-sm uppercase tracking-widest font-semibold">
            📍 Visit Us in Kishanagar, Shadnagar 📍
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">
            Indo Global School Location
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Located in Kishanagar, Shadnagar, Telangana - easily accessible with free transport facility for students.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Embedded Google Map */}
          <div className="relative h-96 rounded-xl overflow-hidden shadow-xl border border-border/20 group">
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
            {/* View on Google Maps Link overlay */}
            <div className="absolute bottom-4 left-4">
              <a 
                href="https://www.google.com/maps/place/17%C2%B003'20.5%22N+78%C2%B010'16.8%22E/@17.0557001,78.1713319,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/90 backdrop-blur-sm text-primary text-xs font-bold px-4 py-2 rounded-full shadow-lg border border-primary/10 hover:bg-primary hover:text-white transition-all duration-300 flex items-center gap-2"
              >
                <MapPin size={12} />
                View on Google Maps
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-3xl font-serif font-bold text-primary">Contact Us</h3>
              <p className="text-lg text-foreground leading-relaxed">
                Reach out to schedule a campus visit or inquire about admissions. We&apos;re here to help!
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-5">
              {/* Address */}
              <div className="flex gap-4 p-6 bg-white rounded-lg border border-border/20 hover:border-secondary/40 transition-colors">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-serif font-semibold text-primary mb-1">Location</h4>
                  <p className="text-foreground">Kishanagar, Shadnagar, Telangana</p>
                  <p className="text-sm text-muted-foreground">Postal Code: 509410</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4 p-6 bg-white rounded-lg border border-border/20 hover:border-secondary/40 transition-colors">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary/10">
                    <Phone className="w-6 h-6 text-secondary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-serif font-semibold text-primary mb-1">Phone</h4>
                  <div className="flex flex-col gap-1">
                    <a href="tel:+9121689898" className="text-foreground hover:text-secondary transition-colors font-medium">+91 21 68 98 98</a>
                    <a href="tel:+9121983838" className="text-foreground hover:text-secondary transition-colors font-medium">+91 21 98 38 38</a>
                  </div>
                </div>
              </div>

              {/* Chairman Quote */}
              <div className="flex gap-4 p-6 bg-secondary/5 rounded-lg border border-secondary/30 hover:border-secondary/60 transition-colors">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary/20">
                    <span className="text-2xl">🎓</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-serif font-semibold text-primary mb-1">Chairman Chinnabathini Sagar</h4>
                  <p className="text-sm italic text-foreground">&quot;We do not make promises - we simply do justice to our responsibilities...just as you do!&quot;</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4 p-6 bg-white rounded-lg border border-border/20 hover:border-secondary/40 transition-colors">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-serif font-semibold text-primary mb-1">Office Hours</h4>
                  <p className="text-foreground">Mon - Sat: 8:30 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
