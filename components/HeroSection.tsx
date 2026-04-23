'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, GraduationCap, Bus, Monitor, Trees } from 'lucide-react';

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
    { icon: GraduationCap, label: 'CBSE Curriculum', iconBg: 'bg-primary/10', iconColor: 'text-primary', ring: 'ring-primary/15' },
    { icon: Bus, label: 'Free Transport', iconBg: 'bg-secondary/12', iconColor: 'text-secondary', ring: 'ring-secondary/15' },
    { icon: Monitor, label: 'Smart Classrooms', iconBg: 'bg-accent/15', iconColor: 'text-[#8A5A10]', ring: 'ring-accent/20' },
    { icon: Trees, label: '3-Acre Campus', iconBg: 'bg-primary/10', iconColor: 'text-primary', ring: 'ring-primary/15' },
  ];

  return (
    <section className="relative flex items-center py-14 md:py-20 lg:py-24 surface-warm overflow-hidden">
      {/* Decorative elements */}
      <div className="decor-blob -top-24 -right-24 w-80 md:w-[28rem] h-80 md:h-[28rem] bg-accent/25 animate-float-slow" />
      <div className="decor-blob -bottom-24 -left-24 w-80 md:w-[28rem] h-80 md:h-[28rem] bg-secondary/20 animate-float-slow" style={{ animationDelay: '2s' }} />
      <div className="decor-blob top-1/3 left-1/2 w-72 h-72 bg-primary/10" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 w-full grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center relative z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-7 md:space-y-8"
        >
          <div className="space-y-5 md:space-y-6">
            <span className="eyebrow">Learn &bull; Lead &bull; Shine</span>
            <h1 className="font-serif font-bold leading-[1.02]">
              <span className="block text-foreground">Where Every</span>
              <span className="block gradient-text-brand">Child Shines</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
              A CBSE curriculum institution nurturing <span className="text-foreground font-semibold">experiential learning</span>, <span className="text-foreground font-semibold">creativity</span>, and <span className="text-foreground font-semibold">global citizens</span> rooted in <span className="text-foreground font-semibold">Indian values</span>.
            </p>
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              Kishan Nagar, Shadnagar, Telangana
            </div>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.label} className={`flex items-center gap-3 p-3 md:p-4 bg-card rounded-xl border border-border/60 ring-1 ${f.ring} shadow-[0_2px_10px_-4px_rgba(15,42,63,0.08)] hover:shadow-[0_8px_24px_-8px_rgba(15,42,63,0.16)] hover:-translate-y-0.5 transition-all duration-300`}>
                  <div className={`w-10 h-10 md:w-11 md:h-11 rounded-xl ${f.iconBg} ${f.iconColor} flex items-center justify-center shrink-0`}>
                    <Icon className="w-[18px] h-[18px]" />
                  </div>
                  <p className="text-sm font-semibold text-foreground leading-tight">{f.label}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Right - Application Form */}
        <motion.div
          id="apply"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Gradient glow behind card */}
          <div className="absolute -inset-4 bg-gradient-to-br from-primary/15 via-accent/10 to-secondary/10 rounded-[2rem] blur-2xl" />

          <div className="relative bg-card rounded-2xl md:rounded-[1.5rem] shadow-[0_20px_60px_-20px_rgba(15,42,63,0.22)] p-6 md:p-8 lg:p-9 border border-border/60 overflow-hidden">
            {/* Decorative top stripe */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />

            <div className="flex items-center gap-2 mb-3">
              <span className="chip chip-secondary">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                Now Enrolling
              </span>
            </div>
            <h2 className="text-2xl md:text-[1.75rem] font-serif font-bold text-foreground">Admissions Open</h2>
            <p className="text-sm text-muted-foreground mb-5 md:mb-6">Join Indo Global School and shine!</p>

            {submitted ? (
              <div className="py-6 md:py-8 text-center space-y-3">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <ArrowRight className="w-7 h-7 text-primary" />
                </div>
                <p className="text-lg font-semibold text-primary">Application Received!</p>
                <p className="text-sm text-muted-foreground">We will contact you shortly with next steps.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Parent Name</label>
                  <Input type="text" name="parentName" value={formData.parentName} onChange={handleInputChange} placeholder="Enter your full name" required className="bg-background border-border text-sm" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">Student Date of Birth</label>
                    <Input type="date" name="studentDOB" value={formData.studentDOB} onChange={handleInputChange} required className="bg-background border-border text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">Class Applying For</label>
                    <Select value={formData.classApplying} onValueChange={handleSelectChange}>
                      <SelectTrigger className="bg-background border-border text-sm">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">Phone Number</label>
                    <Input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91 9876543210" required className="bg-background border-border text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">Alternate Phone</label>
                    <Input type="tel" name="altPhone" value={formData.altPhone} onChange={handleInputChange} placeholder="Optional" className="bg-background border-border text-sm" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">Email (Optional)</label>
                  <Input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="your@gmail.com" className="bg-background border-border text-sm" />
                </div>

                <Button type="submit" disabled={loading} className="w-full text-white py-3 text-sm font-semibold rounded-full transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5" style={{ background: 'var(--gradient-brand)', boxShadow: '0 10px 24px -10px rgba(15,118,110,0.5)' }}>
                  {loading ? 'Submitting...' : 'Apply Now'}
                  <ArrowRight size={16} />
                </Button>

                <p className="text-[10px] md:text-[11px] text-muted-foreground text-center">
                  Your information is secure and confidential.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
