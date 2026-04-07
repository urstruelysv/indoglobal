'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import VideoShowcase from '@/components/VideoShowcase';
import GallerySection from '@/components/GallerySection';
import LocationSection from '@/components/LocationSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSection />
        <AboutSection />
        <VideoShowcase />
        <GallerySection />
        <LocationSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
