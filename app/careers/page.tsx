'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, Loader2, Upload, CheckCircle, GraduationCap, Users, Heart, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const teachingPositions = [
  'Pre-Primary Teacher',
  'Primary Teacher (English)',
  'Primary Teacher (Mathematics)',
  'Primary Teacher (Science)',
  'Primary Teacher (Social Studies)',
  'Middle School Teacher (English)',
  'Middle School Teacher (Mathematics)',
  'Middle School Teacher (Science)',
  'Hindi Teacher',
  'Telugu Teacher',
  'Computer Science Teacher',
  'Art & Craft Teacher',
  'Music Teacher',
  'Dance Teacher',
  'Physical Education Teacher',
  'Yoga Instructor',
  'Special Educator',
  'Other Teaching Role',
];

const nonTeachingPositions = [
  'Administrative Officer',
  'Front Office Executive',
  'Accountant',
  'IT Support',
  'Lab Assistant',
  'Library Assistant',
  'Bus Driver',
  'Bus Attendant',
  'Housekeeping Staff',
  'Security Guard',
  'Maintenance Staff',
  'Other Non-Teaching Role',
];

const perks = [
  { icon: GraduationCap, title: 'Professional Growth', description: 'Regular training, workshops, and career development opportunities.' },
  { icon: Users, title: 'Supportive Team', description: 'A collaborative, inclusive environment where every voice matters.' },
  { icon: Heart, title: 'Work-Life Balance', description: 'Structured hours, leave policies, and a culture that values well-being.' },
  { icon: Sparkles, title: 'Modern Campus', description: 'Air-conditioned classrooms, smart boards, and top-tier infrastructure.' },
];

export default function CareersPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    positionType: '',
    positionApplying: '',
    qualification: '',
    experience: '',
    message: '',
  });
  const [resume, setResume] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'positionType' ? { positionApplying: '' } : {}),
    }));
    setError('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        setError('Resume must be under 3MB.');
        return;
      }
      setResume(file);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) {
      setError('Please upload your resume.');
      return;
    }

    setLoading(true);
    setError('');

    const form = new FormData();
    Object.entries(formData).forEach(([key, val]) => form.append(key, val));
    form.append('resume', resume);

    try {
      const res = await fetch('/api/careers', { method: 'POST', body: form });

      if (res.ok) {
        setSubmitted(true);
        setFormData({ fullName: '', email: '', phone: '', positionType: '', positionApplying: '', qualification: '', experience: '', message: '' });
        setResume(null);
      } else {
        const data = await res.json();
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const positions = formData.positionType === 'Teaching' ? teachingPositions : formData.positionType === 'Non-Teaching' ? nonTeachingPositions : [];

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen">
        {/* Hero */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary/[0.04] to-secondary/[0.04] overflow-hidden">
          <div className="max-w-5xl mx-auto px-5 md:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-3 md:space-y-4"
            >
              <p className="text-secondary font-serif text-xs md:text-sm uppercase tracking-widest font-semibold">
                Join Our Team
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary leading-tight">
                Build Futures With Us
              </h1>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                At Indo Global School, we believe great education starts with great people. We are looking for passionate teachers and dedicated support staff to join our growing family.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Why Work With Us */}
        <section className="py-14 md:py-20 bg-background overflow-hidden">
          <div className="max-w-5xl mx-auto px-5 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8 md:mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary">Why Work at IGS?</h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              {perks.map((perk, i) => {
                const Icon = perk.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex gap-3 md:gap-4 p-4 md:p-5 bg-white rounded-xl border border-border/20 hover:shadow-sm transition-shadow"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-sm md:text-base text-primary mb-0.5">{perk.title}</h3>
                      <p className="text-xs md:text-sm text-foreground leading-relaxed">{perk.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-14 md:py-20 bg-muted/30 overflow-hidden">
          <div className="max-w-2xl mx-auto px-5 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8 md:mb-12 space-y-2 md:space-y-3"
            >
              <p className="text-secondary font-serif text-xs md:text-sm uppercase tracking-widest font-semibold">
                Apply Now
              </p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-primary">
                Submit Your Application
              </h2>
              <p className="text-sm md:text-base text-muted-foreground">
                Fill in your details and upload your resume. We will get back to you shortly.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-white rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl p-6 md:p-8 lg:p-10 border border-border/20">
                {submitted ? (
                  <div className="py-8 md:py-12 text-center space-y-3">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-lg font-serif font-bold text-primary">Application Received!</p>
                    <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                      Thank you for your interest in joining Indo Global School. We will review your application and contact you soon.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-sm text-primary font-semibold hover:underline mt-2"
                    >
                      Submit another application
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-foreground mb-1.5">Full Name</label>
                      <Input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Enter your full name" required className="bg-background border-border text-sm" maxLength={100} />
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs md:text-sm font-medium text-foreground mb-1.5">Email</label>
                        <Input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="your@email.com" required className="bg-background border-border text-sm" maxLength={100} />
                      </div>
                      <div>
                        <label className="block text-xs md:text-sm font-medium text-foreground mb-1.5">Phone</label>
                        <Input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91 9876543210" required className="bg-background border-border text-sm" maxLength={20} />
                      </div>
                    </div>

                    {/* Position Type & Position */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs md:text-sm font-medium text-foreground mb-1.5">Position Type</label>
                        <Select value={formData.positionType} onValueChange={(v) => handleSelectChange('positionType', v)}>
                          <SelectTrigger className="bg-background border-border text-sm">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Teaching">Teaching</SelectItem>
                            <SelectItem value="Non-Teaching">Non-Teaching</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-xs md:text-sm font-medium text-foreground mb-1.5">Position Applying For</label>
                        <Select value={formData.positionApplying} onValueChange={(v) => handleSelectChange('positionApplying', v)} disabled={!formData.positionType}>
                          <SelectTrigger className="bg-background border-border text-sm">
                            <SelectValue placeholder={formData.positionType ? 'Select position' : 'Select type first'} />
                          </SelectTrigger>
                          <SelectContent>
                            {positions.map((pos) => (
                              <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Qualification & Experience */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs md:text-sm font-medium text-foreground mb-1.5">Highest Qualification</label>
                        <Input type="text" name="qualification" value={formData.qualification} onChange={handleInputChange} placeholder="e.g. B.Ed, M.Sc, MBA" required className="bg-background border-border text-sm" maxLength={200} />
                      </div>
                      <div>
                        <label className="block text-xs md:text-sm font-medium text-foreground mb-1.5">Years of Experience</label>
                        <Select value={formData.experience} onValueChange={(v) => handleSelectChange('experience', v)}>
                          <SelectTrigger className="bg-background border-border text-sm">
                            <SelectValue placeholder="Select experience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Fresher">Fresher</SelectItem>
                            <SelectItem value="1-2 years">1-2 years</SelectItem>
                            <SelectItem value="3-5 years">3-5 years</SelectItem>
                            <SelectItem value="5-10 years">5-10 years</SelectItem>
                            <SelectItem value="10+ years">10+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Resume Upload */}
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-foreground mb-1.5">Resume</label>
                      <div className="relative">
                        <label className={`flex items-center gap-3 p-3 md:p-4 border border-dashed rounded-lg cursor-pointer transition-colors ${resume ? 'border-primary bg-primary/5' : 'border-border hover:border-border/60'}`}>
                          <Upload className={`w-5 h-5 shrink-0 ${resume ? 'text-primary' : 'text-muted-foreground'}`} />
                          <div className="flex-1 min-w-0">
                            {resume ? (
                              <p className="text-sm font-medium text-primary truncate">{resume.name}</p>
                            ) : (
                              <p className="text-sm text-muted-foreground">Upload PDF, DOC, or DOCX (max 3MB)</p>
                            )}
                          </div>
                          <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
                          {resume && (
                            <span className="text-xs text-primary font-medium shrink-0">Change</span>
                          )}
                        </label>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-foreground mb-1.5">Cover Note (optional)</label>
                      <Textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Tell us why you want to join IGS..." rows={3} className="bg-background border-border resize-none text-sm" maxLength={1000} />
                    </div>

                    {error && (
                      <p className="text-sm text-rose-600 font-medium">{error}</p>
                    )}

                    <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-sm md:text-base font-medium rounded-lg transition-all flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin" size={16} />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Application
                          <ArrowRight size={16} />
                        </>
                      )}
                    </Button>

                    <p className="text-[11px] md:text-xs text-muted-foreground text-center">
                      Your information is secure and will only be used for recruitment purposes.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
