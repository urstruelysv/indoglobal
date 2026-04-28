'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, ArrowRight, Loader2 } from 'lucide-react';
import SectionHeader from './SectionHeader';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative section-y overflow-hidden" style={{ background: 'linear-gradient(180deg, #FAF3E4 0%, var(--background) 100%)' }}>
      <div className="decor-blob top-20 right-10 w-80 h-80 bg-primary/8" />
      <div className="decor-blob bottom-20 left-10 w-80 h-80 bg-secondary/10" />
      <div className="max-w-7xl mx-auto px-5 md:px-8 relative">
        <SectionHeader
          eyebrow="Take the First Step"
          title="Start Your Child's Journey"
        />
        <p className="-mt-6 md:-mt-10 mb-10 md:mb-14 text-[15px] md:text-base text-muted-foreground max-w-2xl leading-[1.7]">
          Call us at <a href="tel:+9121689898" className="text-primary font-semibold hover:text-secondary transition-colors">+91 21 68 98 98</a> or <a href="tel:+9121983838" className="text-primary font-semibold hover:text-secondary transition-colors">+91 21 98 38 38</a>, or fill out the form below.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-2xl mx-auto relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-br from-primary/15 via-accent/10 to-secondary/10 rounded-[2rem] blur-2xl" />
          <div className="relative bg-card rounded-2xl md:rounded-[1.5rem] shadow-[0_20px_60px_-20px_rgba(15,42,63,0.22)] p-7 md:p-10 lg:p-12 border border-border/60 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
            <h2 className="text-2xl md:text-[1.75rem] font-serif font-bold text-foreground mb-2">Send an Inquiry</h2>
            <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8">We usually respond within 24 hours.</p>

            {submitted ? (
              <div className="py-8 md:py-12 text-center space-y-3 animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                </div>
                <p className="text-lg md:text-2xl font-serif font-bold text-primary">Message Sent!</p>
                <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto">
                  Thank you for contacting us. Our team will get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                <div>
                  <label className="block text-xs md:text-sm font-medium text-foreground mb-1.5">Full Name</label>
                  <Input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your full name" required className="bg-background border-border text-sm" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-foreground mb-1.5">Email Address</label>
                    <Input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="your@email.com" required className="bg-background border-border text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-foreground mb-1.5">Phone Number</label>
                    <Input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91 9876543210" className="bg-background border-border text-sm" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-medium text-foreground mb-1.5">Subject</label>
                  <Input type="text" name="subject" value={formData.subject} onChange={handleInputChange} placeholder="e.g., Admission Inquiry for Grade 5" required className="bg-background border-border text-sm" />
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-medium text-foreground mb-1.5">Message</label>
                  <Textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="How can we help you?" rows={4} required className="bg-background border-border resize-none text-sm" />
                </div>

                <Button type="submit" disabled={loading} className="w-full text-white py-3.5 text-sm md:text-base font-semibold rounded-full transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5" style={{ background: 'var(--gradient-brand)', boxShadow: '0 10px 24px -10px rgba(15,118,110,0.5)' }}>
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight size={16} />
                    </>
                  )}
                </Button>

                <p className="text-[11px] md:text-xs text-muted-foreground text-center">
                  By submitting this form, you agree to our privacy policy and terms.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
