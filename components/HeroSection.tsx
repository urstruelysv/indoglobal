'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerClose } from '@/components/ui/drawer';
import { ArrowRight, Bus, GraduationCap, MapPin, Monitor, Play, Trees, X } from 'lucide-react';

const HERO_IMAGES = [
  '/students-hero.webp',
  '/student-2.png',
  '/student-hero-3.webp',
];

const PALETTES = [
  {
    grad: 'linear-gradient(135deg, rgba(43,127,107,0.22) 0%, rgba(255,184,77,0.30) 35%, rgba(255,140,66,0.22) 70%, rgba(43,127,107,0.18) 100%)',
    blob1: 'radial-gradient(circle, rgba(255,140,66,0.40) 0%, transparent 65%)',
    blob2: 'radial-gradient(circle, rgba(43,127,107,0.34) 0%, transparent 65%)',
    spot: 'radial-gradient(circle at center, rgba(255,184,77,0.40) 0%, transparent 70%)',
  },
  {
    grad: 'linear-gradient(135deg, rgba(255,236,200,0.45) 0%, rgba(255,184,77,0.38) 40%, rgba(217,140,80,0.28) 75%, rgba(120,76,40,0.18) 100%)',
    blob1: 'radial-gradient(circle, rgba(255,184,77,0.48) 0%, transparent 65%)',
    blob2: 'radial-gradient(circle, rgba(217,140,80,0.32) 0%, transparent 65%)',
    spot: 'radial-gradient(circle at center, rgba(255,210,140,0.45) 0%, transparent 70%)',
  },
  {
    grad: 'linear-gradient(135deg, rgba(43,127,107,0.28) 0%, rgba(56,120,200,0.30) 40%, rgba(80,160,220,0.22) 75%, rgba(43,127,107,0.20) 100%)',
    blob1: 'radial-gradient(circle, rgba(56,120,200,0.42) 0%, transparent 65%)',
    blob2: 'radial-gradient(circle, rgba(43,127,107,0.42) 0%, transparent 65%)',
    spot: 'radial-gradient(circle at center, rgba(120,180,230,0.42) 0%, transparent 70%)',
  },
];

const FEATURES = [
  { icon: Trees, label: '3-Acre Campus' },
  { icon: GraduationCap, label: 'CBSE Curriculum' },
  { icon: Monitor, label: 'Smart Classrooms' },
  { icon: Bus, label: 'Free Transport' },
];

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
  const [imgIndex, setImgIndex] = useState(0);
  const [mobileFormOpen, setMobileFormOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setImgIndex(i => (i + 1) % HERO_IMAGES.length);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth >= 1024) return;
    if (sessionStorage.getItem('hero_form_shown')) return;
    const t = setTimeout(() => {
      setMobileFormOpen(true);
      sessionStorage.setItem('hero_form_shown', '1');
    }, 1500);
    return () => clearTimeout(t);
  }, []);

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

      <div className="relative max-w-[1320px] mx-auto px-5 md:px-8 pt-12 md:pt-16 lg:pt-20 pb-14 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* LEFT — Headline (3 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 relative order-1"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5 md:mb-6">
              <span className="h-px w-10 bg-gradient-to-r from-secondary to-accent" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
                Learn &bull; Lead &bull; Shine
              </span>
            </div>

            {/* HEADLINE */}
            <h1 className="font-serif font-bold leading-[0.92] tracking-tight text-[4rem] md:text-[4rem] lg:text-[3.5rem] xl:text-[4.25rem]">
       
              <span className="block whitespace-nowrap text-foreground">Where Every</span>
              <span className="block whitespace-nowrap italic text-primary">Child Shines</span>
            </h1>


            {/* Sub */}
            <p className="mt-6 md:mt-7 text-sm md:text-base text-muted-foreground max-w-[30rem] leading-[1.65]">
              A CBSE curriculum institution nurturing{' '}
              <span className="text-secondary font-semibold">experiential learning</span>,{' '}
              <span className="text-secondary font-semibold">creativity</span>, and{' '}
              <span className="text-secondary font-semibold">global citizens</span> rooted in{' '}
              <span className="text-secondary font-semibold">Indian values</span>.
            </p>

            {/* Location chip — links to map */}
            <motion.a
              href="#location"
              whileHover={{ y: -2 }}
              className="group mt-6 inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-card border border-border/70 shadow-[0_2px_10px_-4px_rgba(15,42,63,0.08)] transition-all duration-500 ease-out hover:border-secondary/40 hover:shadow-[0_10px_24px_-10px_rgba(43,127,107,0.35)]"
            >
              <MapPin className="w-3.5 h-3.5 text-secondary transition-transform duration-500 ease-out group-hover:scale-110" />
              <span className="text-xs font-medium text-foreground">
                Kishan Nagar, Shadnagar, Telangana
              </span>
              <ArrowRight className="w-3 h-3 text-muted-foreground -ml-0.5 opacity-0 -translate-x-1 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-0" />
            </motion.a>

            <div className="mt-7 grid grid-cols-2 gap-2.5 sm:gap-3">
              {FEATURES.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -2 }}
                    className="group relative flex items-center gap-3 overflow-hidden rounded-xl border border-border/50 bg-card/70 px-3.5 py-2.5 backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-500 ease-out hover:border-secondary/35 hover:bg-card hover:shadow-[0_18px_40px_-24px_rgba(43,127,107,0.35)]"
                  >
                    {/* sheen on hover */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-all duration-700 ease-out group-hover:translate-x-full group-hover:opacity-100"
                    />
                    <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary/8 text-secondary ring-1 ring-inset ring-secondary/15 transition-all duration-500 ease-out group-hover:bg-secondary group-hover:text-white group-hover:ring-secondary/40 group-hover:shadow-[0_8px_20px_-8px_rgba(255,140,66,0.55)]">
                      <Icon className="h-[16px] w-[16px] transition-transform duration-500 ease-out group-hover:scale-110" strokeWidth={1.75} />
                    </span>
                    <span className="relative text-[13px] font-semibold leading-tight text-foreground/90 tracking-tight transition-colors duration-500 group-hover:text-foreground">
                      {feature.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* CENTER — Image with backdrop shape (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative order-2"
          >
            <div className="relative w-full aspect-[5/5.5] md:aspect-[5/5.2]">
              
              {/* Backdrop — palette layers crossfade by image index */}
              <div
                aria-hidden
                className="absolute inset-x-4 inset-y-4 md:inset-x-6 md:inset-y-6 rounded-[2.5rem] overflow-hidden"
              >
                {PALETTES.map((p, i) => (
                  <motion.div
                    key={i}
                    aria-hidden
                    className="absolute inset-0"
                    initial={false}
                    animate={{ opacity: imgIndex === i ? 1 : 0 }}
                    transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
                  >
                    {/* Drifting gradient */}
                    <motion.div
                      aria-hidden
                      className="absolute inset-0"
                      style={{ backgroundImage: p.grad, backgroundSize: '300% 300%' }}
                      animate={{ backgroundPosition: ['0% 0%', '100% 50%', '50% 100%', '0% 0%'] }}
                      transition={{ duration: 14, ease: 'linear', repeat: Infinity }}
                    />
                    {/* Glow blobs */}
                    <motion.div
                      aria-hidden
                      className="absolute w-[70%] aspect-square rounded-full blur-3xl"
                      style={{ background: p.blob1 }}
                      animate={{ x: ['-15%', '20%', '-15%'], y: ['10%', '-10%', '10%'] }}
                      transition={{ duration: 12, ease: 'easeInOut', repeat: Infinity }}
                    />
                    <motion.div
                      aria-hidden
                      className="absolute right-0 bottom-0 w-[60%] aspect-square rounded-full blur-3xl"
                      style={{ background: p.blob2 }}
                      animate={{ x: ['10%', '-15%', '10%'], y: ['5%', '15%', '5%'] }}
                      transition={{ duration: 16, ease: 'easeInOut', repeat: Infinity }}
                    />
                    {/* Pulsing spotlight */}
                    <motion.div
                      aria-hidden
                      className="absolute left-1/2 top-1/2 w-[55%] aspect-square rounded-full"
                      style={{ x: '-50%', y: '-50%', background: p.spot }}
                      animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
                    />
                  </motion.div>
                ))}

                {/* Counter-rotating rings — shared across palettes */}
                <motion.div
                  aria-hidden
                  className="absolute left-1/2 top-1/2 w-[110%] aspect-square rounded-full border border-accent/25"
                  style={{ x: '-50%', y: '-50%' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
                />
                <motion.div
                  aria-hidden
                  className="absolute left-1/2 top-1/2 w-[80%] aspect-square rounded-full border border-dashed border-primary/25"
                  style={{ x: '-50%', y: '-50%' }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
                />
              </div>

              {/* Hero image — gentle crossfade + slow drift carousel */}
              <div className="relative w-full h-full flex items-end justify-center z-10">
                <AnimatePresence>
                  <motion.div
                    key={imgIndex}
                    initial={{ opacity: 0, scale: 1.04, y: 8 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      transition: {
                        opacity: { duration: 1.4, ease: [0.4, 0, 0.2, 1] },
                        scale: { duration: 6, ease: [0.22, 1, 0.36, 1] },
                        y: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
                      },
                    }}
                    exit={{
                      opacity: 0,
                      scale: 1.02,
                      transition: { duration: 1.2, ease: [0.4, 0, 0.2, 1] },
                    }}
                    className="absolute inset-0 flex items-end justify-center will-change-[opacity,transform]"
                  >
                    <Image
                      src={HERO_IMAGES[imgIndex]}
                      alt="Indo Global School students"
                      width={1400}
                      height={1400}
                      priority
                      loading="eager"
                      className="w-[92%] h-auto object-contain drop-shadow-[0_30px_40px_rgba(15,42,63,0.18)]"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Floating campus-tour badge — links to video story */}
              <motion.a
                href="#video"
                aria-label="Watch our story in motion"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ y: -2 }}
                className="group absolute top-8 left-2 md:left-4 z-20 inline-flex items-center gap-2 bg-card/95 backdrop-blur-sm rounded-full pl-2 pr-4 py-1.5 border border-border/60 shadow-[0_8px_24px_-8px_rgba(15,42,63,0.18)] transition-all duration-500 ease-out hover:border-secondary/40 hover:shadow-[0_14px_30px_-12px_rgba(255,140,66,0.4)]"
              >
                <span className="w-7 h-7 rounded-full bg-secondary text-white inline-flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-110">
                  <Play className="w-3 h-3 fill-current" />
                </span>
                <span className="text-[11px] font-semibold text-foreground tracking-tight">Watch Our Story</span>
              </motion.a>

              {/* Ground shadow */}
              <div
                aria-hidden
                className="absolute bottom-[6%] left-1/2 -translate-x-1/2 w-[55%] h-3 rounded-[50%] z-0"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(15,42,63,0.22) 0%, transparent 70%)',
                  filter: 'blur(8px)',
                }}
              />
            </div>
          </motion.div>

          {/* RIGHT — Full admissions form (4 cols) */}
          <motion.div
            id="apply"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3 relative order-3 lg:ml-auto w-full lg:max-w-[26rem]"
          >
            {/* Offset shadow layer */}
            <div
              aria-hidden
              className="absolute inset-0 translate-x-2 translate-y-2 rounded-[1.75rem] bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10"
            />

            <div className="relative bg-card rounded-[1.5rem] md:rounded-[1.75rem] border border-border/50 shadow-[0_24px_60px_-28px_rgba(15,42,63,0.22)] overflow-hidden">
              {/* Header band */}
              <div className="px-5 md:px-6 pt-5 md:pt-5 pb-4 border-b border-border/40 bg-gradient-to-b from-background to-card">
                <div className="flex items-center justify-between gap-3 mb-2.5">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                    Now Enrolling
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-semibold">
                    2025&ndash;26
                  </span>
                </div>
                <h2 className="text-[1.4rem] md:text-[1.55rem] font-serif font-bold text-foreground leading-[1.05]">
                  Admissions Open
                </h2>
                <p className="text-[12px] text-muted-foreground mt-1.5">Join Indo Global School and shine.</p>
              </div>

              <div className="px-5 md:px-6 py-5">
                {submitted ? (
                  <div className="py-8 text-center space-y-3">
                    <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                      <ArrowRight className="w-7 h-7 text-secondary" />
                    </div>
                    <p className="text-lg font-semibold text-foreground">Application Received</p>
                    <p className="text-sm text-muted-foreground">We&rsquo;ll be in touch within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <label className="block text-[10.5px] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-1.5">
                        Parent Name
                      </label>
                      <Input
                        type="text"
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                        className="bg-background border-border text-[13px] h-10 rounded-lg"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10.5px] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-1.5">
                          Student DOB
                        </label>
                        <Input
                          type="date"
                          name="studentDOB"
                          value={formData.studentDOB}
                          onChange={handleInputChange}
                          required
                          className="bg-background border-border text-[13px] h-10 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-[10.5px] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-1.5">
                          Class Applying For
                        </label>
                        <Select value={formData.classApplying} onValueChange={handleSelectChange}>
                          <SelectTrigger className="bg-background border-border text-[13px] h-10 rounded-lg">
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10.5px] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-1.5">
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 9876543210"
                          required
                          className="bg-background border-border text-[13px] h-10 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-[10.5px] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-1.5">
                          Alternate Phone
                        </label>
                        <Input
                          type="tel"
                          name="altPhone"
                          value={formData.altPhone}
                          onChange={handleInputChange}
                          placeholder="Optional"
                          className="bg-background border-border text-[13px] h-10 rounded-lg"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10.5px] font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-1.5">
                        Email (Optional)
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@gmail.com"
                        className="bg-background border-border text-[13px] h-10 rounded-lg"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full text-white py-3 text-[13px] font-semibold rounded-full transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 mt-2 h-11 tracking-tight"
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

      {/* Mobile-only one-shot admissions drawer */}
      <Drawer open={mobileFormOpen} onOpenChange={setMobileFormOpen}>
        <DrawerContent className="lg:hidden">
          <DrawerHeader className="text-left">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-secondary">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                  Now Enrolling 2025–26
                </span>
                <DrawerTitle className="font-serif text-2xl mt-2">Admissions Open</DrawerTitle>
                <DrawerDescription className="text-xs">
                  Quick apply — we'll call within 24 hrs.
                </DrawerDescription>
              </div>
              <DrawerClose className="rounded-full p-1.5 hover:bg-muted">
                <X className="w-4 h-4" />
              </DrawerClose>
            </div>
          </DrawerHeader>

          <div className="px-4 pb-6">
            {submitted ? (
              <div className="py-6 text-center space-y-2">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <ArrowRight className="w-6 h-6 text-secondary" />
                </div>
                <p className="text-base font-semibold">Application Received</p>
                <p className="text-xs text-muted-foreground">We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  await handleSubmit(e);
                  setTimeout(() => setMobileFormOpen(false), 1800);
                }}
                className="space-y-2.5"
              >
                <Input
                  type="text"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleInputChange}
                  placeholder="Parent name"
                  required
                  className="h-10 text-sm"
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="date"
                    name="studentDOB"
                    value={formData.studentDOB}
                    onChange={handleInputChange}
                    required
                    className="h-10 text-sm"
                  />
                  <Select value={formData.classApplying} onValueChange={handleSelectChange}>
                    <SelectTrigger className="h-10 text-sm">
                      <SelectValue placeholder="Class" />
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
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone number"
                  required
                  className="h-10 text-sm"
                />
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email (optional)"
                  className="h-10 text-sm"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white py-3 text-sm font-semibold rounded-full flex items-center justify-center gap-2 h-11 mt-1"
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
        </DrawerContent>
      </Drawer>
    </section>
  );
}
