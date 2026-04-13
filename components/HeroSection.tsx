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
    { icon: GraduationCap, label: 'CBSE Curriculum', color: 'bg-secondary/10 text-secondary' },
    { icon: Bus, label: 'Free Transport', color: 'bg-accent/10 text-accent-foreground' },
    { icon: Monitor, label: 'Smart Classrooms', color: 'bg-primary/10 text-primary' },
    { icon: Trees, label: '3-Acre Campus', color: 'bg-secondary/10 text-secondary' },
  ];

  return (
    <section className="relative flex items-center py-8 md:py-10 lg:py-12 bg-gradient-to-br from-background via-background to-muted/30 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-60 md:w-80 h-60 md:h-80 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-60 md:w-80 h-60 md:h-80 bg-secondary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-5 md:px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start relative z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 md:space-y-5"
        >
          <div className="space-y-2.5 md:space-y-3">
            <p className="text-secondary font-serif text-xs md:text-sm uppercase tracking-widest font-semibold">
              Learn &bull; Lead &bull; Shine
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-[52px] lg:text-6xl font-serif font-bold text-primary leading-[1.1]">
              Where Every Child Shines
            </h1>
            <p className="text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed">
              A CBSE curriculum institution nurturing <span className="text-primary font-semibold">experiential learning</span>, <span className="text-primary font-semibold">creativity</span>, and <span className="text-primary font-semibold">global citizens</span> with <span className="text-primary font-semibold">Indian values</span>.
            </p>
            <p className="text-xs md:text-sm text-muted-foreground">
              Kishan Nagar, Shadnagar, Telangana
            </p>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-2 gap-2.5 md:gap-3">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.label} className="flex items-center gap-2.5 p-2.5 md:p-3 bg-white rounded-lg border border-border/20 shadow-sm">
                  <div className={`w-8 h-8 md:w-9 md:h-9 rounded-lg ${f.color} flex items-center justify-center shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <p className="text-xs md:text-sm font-semibold text-foreground leading-tight">{f.label}</p>
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
          className=""
        >
          <div className="bg-white rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl p-5 md:p-6 lg:p-8 border border-border/20">
            <h2 className="text-lg md:text-xl font-serif font-bold text-primary mb-0.5">Admissions Open</h2>
            <p className="text-sm text-muted-foreground mb-4 md:mb-5">Join Indo Global School and shine!</p>

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

                <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2">
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
