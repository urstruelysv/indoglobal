'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const [formData, setFormData] = useState({
    parentName: '',
    studentDOB: '',
    phone: '',
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
        setFormData({ parentName: '', studentDOB: '', phone: '', classApplying: '', email: '' });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-20 bg-gradient-to-br from-background via-background to-muted/30 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-secondary font-serif text-sm uppercase tracking-widest font-semibold">
              ⭐ Learn • Lead • Shine ⭐
            </p>
            <h1 className="text-5xl lg:text-6xl font-serif font-bold text-primary leading-tight">
              Where Every Child Shines
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
              A CBSE Curriculum Institution nurturing Experiential Learning, Creativity, and Global Citizens with Indian values. Join our thriving community in Kishanagar, Shadnagar, Telangana.
            </p>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-2 gap-6 pt-8">
            <div className="space-y-2 p-4 bg-secondary/10 rounded-lg border border-secondary/20">
              <p className="text-3xl font-serif font-bold text-secondary">🎓</p>
              <p className="text-sm font-semibold text-foreground">CBSE Curriculum</p>
            </div>
            <div className="space-y-2 p-4 bg-accent/10 rounded-lg border border-accent/20">
              <p className="text-3xl font-serif font-bold text-accent">🚌</p>
              <p className="text-sm font-semibold text-foreground">Free Transport</p>
            </div>
            <div className="space-y-2 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-3xl font-serif font-bold text-primary">💻</p>
              <p className="text-sm font-semibold text-foreground">Smart Classrooms</p>
            </div>
            <div className="space-y-2 p-4 bg-secondary/10 rounded-lg border border-secondary/20">
              <p className="text-3xl font-serif font-bold text-secondary">🌍</p>
              <p className="text-sm font-semibold text-foreground">Global Values</p>
            </div>
          </div>
        </div>

        {/* Right - Application Form */}
        <div id="apply" className="lg:sticky lg:top-32">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-border/20">
            <h2 className="text-2xl font-serif font-bold text-primary mb-2">Admissions Open</h2>
            <p className="text-muted-foreground mb-8">Join Indo Global School and shine!</p>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="text-5xl">✓</div>
                <p className="text-lg font-semibold text-primary">Application Received!</p>
                <p className="text-muted-foreground">Thank you for your interest. We will contact you shortly with next steps.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Parent Name</label>
                  <Input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    className="bg-background border-border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Student Date of Birth</label>
                  <Input
                    type="date"
                    name="studentDOB"
                    value={formData.studentDOB}
                    onChange={handleInputChange}
                    required
                    className="bg-background border-border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 9876543210"
                    required
                    className="bg-background border-border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Class Applying For</label>
                  <Select value={formData.classApplying} onValueChange={handleSelectChange}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">Kindergarten</SelectItem>
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

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email (Optional)</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@gmail.com"
                    className="bg-background border-border"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-base font-medium rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  {loading ? 'Submitting...' : 'Apply Now'}
                  <ArrowRight size={18} />
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  We respect your privacy. Your information is secure and confidential.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
