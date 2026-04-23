'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, GraduationCap, Bus, Monitor, Trees, MapPin } from 'lucide-react';

export default function HeroSection() {
  const [formData, setFormData] = useState({
    parentName: '',
    studentDOB: '',
    phone: '',
    altPhone: '',
    classApplying: '',
    email: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, classApplying: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ parentName: '', studentDOB: '', phone: '', altPhone: '', classApplying: '', email: '' });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: GraduationCap, label: 'CBSE Curriculum' },
    { icon: Bus, label: 'Free Transport' },
    { icon: Monitor, label: 'Smart Classrooms' },
    { icon: Trees, label: '3-Acre Campus' },
  ];

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Ambient gradient wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(1200px 600px at 85% -10%, rgba(240,167,38,0.18), transparent 60%), radial-gradient(900px 500px at -10% 110%, rgba(15,118,110,0.14), transparent 60%)',
        }}
      />
      {/* Grain overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="relative max-w-[1240px] mx-auto px-5 md:px-8 pt-14 md:pt-20 lg:pt-24 pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left — editorial content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 relative"
          >
            {/* Eyebrow w/ vertical rule */}
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <span className="h-px w-10 bg-gradient-to-r from-secondary to-accent" />
              <span className="eyebrow !tracking-[0.28em]">Learn &bull; Lead &bull; Shine</span>
            </div>

            <h1 className="font-serif font-bold leading-[0.98] tracking-tight">
              <span className="block text-foreground">Where Every</span>
              <span className="block gradient-text-brand italic">Child Shines</span>
            </h1>

            <p className="mt-7 md:mt-8 text-lg md:text-xl text-muted-foreground max-w-[36rem] leading-[1.7]">
              A CBSE curriculum institution nurturing{' '}
              <span className="text-foreground font-semibold">experiential learning</span>,{' '}
              <span className="text-foreground font-semibold">creativity</span>, and{' '}
              <span className="text-foreground font-semibold">global citizens</span> rooted in{' '}
              <span className="text-foreground font-semibold">Indian values</span>.
            </p>

            <div className="mt-7 md:mt-8 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-card border border-border/70 shadow-[0_2px_10px_-4px_rgba(15,42,63,0.08)]">
              <MapPin className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-foreground">Kishan Nagar, Shadnagar, Telangana</span>
            </div>

            {/* Features — horizontal editorial strip */}
            <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-0 md:divide-x md:divide-border/50 border-y border-border/50 py-5 md:py-6">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                    className="flex items-center gap-3 md:px-5 first:md:pl-0"
                  >
                    <span className="w-9 h-9 rounded-full bg-primary/8 text-primary inline-flex items-center justify-center shrink-0 ring-1 ring-primary/15">
                      <Icon className="w-[17px] h-[17px]" />
                    </span>
                    <p className="text-[13px] md:text-sm font-semibold text-foreground leading-tight">{f.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right — admissions form (elevated paper card) */}
          <motion.div
            id="apply"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Offset backing layer for depth */}
            <div
              aria-hidden
              className="absolute inset-0 translate-x-3 translate-y-3 rounded-[1.75rem] bg-gradient-to-br from-primary/15 via-accent/10 to-secondary/15"
            />

            <div className="relative bg-card rounded-[1.5rem] md:rounded-[1.75rem] border border-border/60 shadow-[0_30px_80px_-30px_rgba(15,42,63,0.28)] overflow-hidden">
              {/* Header band */}
              <div className="px-6 md:px-8 pt-6 md:pt-8 pb-5 border-b border-border/50 bg-gradient-to-b from-background to-card">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="chip chip-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                    Now Enrolling
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-semibold">
                    2025&ndash;26
                  </span>
                </div>
                <h2 className="!text-[1.75rem] md:!text-[2rem] lg:!text-[2.25rem] font-serif font-bold text-foreground leading-[1.05]">
                  Admissions Open
                </h2>
                <p className="text-sm text-muted-foreground mt-2">Join Indo Global School and shine!</p>
              </div>

              <div className="px-6 md:px-8 py-6 md:py-7">
                {submitted ? (
                  <div className="py-8 text-center space-y-3">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <ArrowRight className="w-7 h-7 text-primary" />
                    </div>
                    <p className="text-lg font-semibold text-primary">Application Received!</p>
                    <p className="text-sm text-muted-foreground">We will contact you shortly with next steps.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                        Parent Name
                      </label>
                      <Input
                        type="text"
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                        className="bg-background border-border text-sm h-11"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                          Student DOB
                        </label>
                        <Input
                          type="date"
                          name="studentDOB"
                          value={formData.studentDOB}
                          onChange={handleInputChange}
                          required
                          className="bg-background border-border text-sm h-11"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                          Class Applying For
                        </label>
                        <Select value={formData.classApplying} onValueChange={handleSelectChange}>
                          <SelectTrigger className="bg-background border-border text-sm h-11">
                            <SelectValue placeholder="Select class" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kindergarten">Kindergarten</SelectItem>
                            <SelectItem value="pp1">PP1</SelectItem>
                            <SelectItem value="pp2">PP2</SelectItem>
                            <SelectItem value="grade1">Grade 1</SelectItem>
                            <SelectItem value="grade2">Grade 2</SelectItem>
                            <SelectItem value="grade3">Grade 3</SelectItem>
                            <SelectItem value="grade4">Grade 4</SelectItem>
                            <SelectItem value="grade5">Grade 5</SelectItem>
                            <SelectItem value="grade6">Grade 6</SelectItem>
                            <SelectItem value="grade7">Grade 7</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 9876543210"
                          required
                          className="bg-background border-border text-sm h-11"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                          Alternate Phone
                        </label>
                        <Input
                          type="tel"
                          name="altPhone"
                          value={formData.altPhone}
                          onChange={handleInputChange}
                          placeholder="Optional"
                          className="bg-background border-border text-sm h-11"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                        Email (Optional)
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@gmail.com"
                        className="bg-background border-border text-sm h-11"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full text-white py-6 text-sm font-semibold rounded-full transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 mt-2"
                      style={{
                        background: 'var(--gradient-brand)',
                        boxShadow: '0 14px 30px -12px rgba(15,118,110,0.55)',
                      }}
                    >
                      {loading ? 'Submitting...' : 'Apply Now'}
                      <ArrowRight size={16} />
                    </Button>

                    <p className="text-[11px] text-muted-foreground text-center pt-1">
                      Your information is secure and confidential.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
