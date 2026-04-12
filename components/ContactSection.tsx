'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, ArrowRight, Loader2 } from 'lucide-react';

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
    <section id="contact" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-secondary font-serif text-sm uppercase tracking-widest font-semibold">
            Take the First Step
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">
            Start Your Child&apos;s Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Call us at <a href="tel:+9121689898" className="text-primary font-bold hover:text-secondary transition-colors">+91 21 68 98 98</a> or <a href="tel:+9121983838" className="text-primary font-bold hover:text-secondary transition-colors">+91 21 98 38 38</a>, or fill out the form below to learn more about Indo Global School.
          </p>
        </div>

        {/* Contact Form - Redesigned to match HeroSection */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-border/20">
            <h2 className="text-2xl font-serif font-bold text-primary mb-2">Send an Inquiry</h2>
            <p className="text-muted-foreground mb-8">We usually respond within 24 hours.</p>

            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-10 h-10 text-primary" />
                </div>
                <p className="text-2xl font-serif font-bold text-primary">Message Sent!</p>
                <p className="text-muted-foreground max-w-md mx-auto text-lg">
                  Thank you for contacting us. Our team will review your message and get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    className="bg-background border-border"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
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
                      className="bg-background border-border"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="e.g., Admission Inquiry for Grade 5"
                    required
                    className="bg-background border-border"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="How can we help you?"
                    rows={5}
                    required
                    className="bg-background border-border resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 text-lg font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight size={20} />
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By submitting this form, you agree to our privacy policy and terms.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
