'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { BookOpen, Users, Lightbulb, ShieldCheck } from 'lucide-react';

export default function AboutSection() {
  const highlights = [
    {
      icon: BookOpen,
      title: 'CBSE Excellence',
      description: 'Comprehensive CBSE curriculum with smart classrooms and modern teaching methods to develop analytical and creative thinking.',
    },
    {
      icon: Users,
      title: 'Indian Values',
      description: 'Education that instills strong Indian values, ethics, and cultural awareness while embracing global perspectives.',
    },
    {
      icon: Lightbulb,
      title: 'Experiential Learning',
      description: 'Hands-on learning experiences that encourage creativity, critical thinking, and real-world problem-solving skills.',
    },
    {
      icon: ShieldCheck,
      title: 'Safety & Security',
      description: 'Advanced 24/7 CCTV surveillance and secure campus protocols ensuring a safe and nurturing environment for every child.',
    },
  ];

  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-secondary font-serif text-sm uppercase tracking-widest font-semibold">
            🌟 About Indo Global School 🌟
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">
            Where Every Child Shines
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A CBSE Curriculum Institution in Kishan Nagar, Shadnagar, Telangana, nurturing Experiential Learning, Creativity, and Global Citizens with strong Indian values.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* School Building Image */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/10 rounded-2xl blur-2xl group-hover:bg-primary/20 transition-all duration-500" />
            <div className="relative h-96 md:h-[600px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="/schoolbuilding.png" 
                alt="Indo Global School Campus Building"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="font-serif font-bold text-xl">State-of-the-art Campus</p>
                <p className="text-sm text-white/80">Nurturing excellence in Kishan Nagar, Shadnagar</p>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-3xl font-serif font-bold text-primary">Our Motto</h3>
              <p className="text-xl font-serif text-secondary font-semibold mb-2">Learn • Lead • Shine</p>
              <p className="text-lg text-foreground leading-relaxed">
                We empower young minds to develop critical thinking, creativity, and global awareness while maintaining strong Indian values.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-3xl font-serif font-bold text-primary">Our Commitment</h3>
              <p className="text-lg text-foreground leading-relaxed">
                <em>"We do not make promises - we simply do justice to our responsibilities...just as you do"</em> - Chairman Chinnabathini Sagar
              </p>
            </div>

            <div className="pt-4">
              <h4 className="font-serif text-lg font-semibold text-primary mb-4">What We Offer</h4>
              <ul className="space-y-3">
                {['CBSE Curriculum Excellence', 'Free Transport Facility', 'Smart Classrooms & Technology', '24/7 CCTV Surveillance', 'Safe Nurturing Campus', 'Certified Expert Faculty'].map((value) => (
                  <li key={value} className="flex items-start gap-3">
                    <span className="text-2xl">✓</span>
                    <span className="text-foreground">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <Card key={index} className="p-8 bg-white border border-border/20 hover:shadow-lg hover:border-border/40 transition-all duration-300">
                <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 mb-6">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-primary mb-4">
                  {highlight.title}
                </h3>
                <p className="text-foreground leading-relaxed">
                  {highlight.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
