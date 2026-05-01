'use client';

import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import LeadershipMessage from '@/components/LeadershipMessage';
import AboutSection from '@/components/AboutSection';
import MissionVisionPhilosophy from '@/components/MissionVisionPhilosophy';
import WhyChooseIGS from '@/components/WhyChooseIGS';
import CurriculumSection from '@/components/CurriculumSection';
import CampusHighlights from '@/components/CampusHighlights';
import VideoShowcase from '@/components/VideoShowcase';
import LocationSection from '@/components/LocationSection';
import ContactSection from '@/components/ContactSection';
import ClosingSection from '@/components/ClosingSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen">
        <HeroSection />
        <LeadershipMessage />
        <AboutSection />
        <MissionVisionPhilosophy />
        <WhyChooseIGS />
        <CurriculumSection />
        <CampusHighlights />
        <VideoShowcase />
        <LocationSection />
        <ContactSection />
        <ClosingSection />
      </main>
      <Footer />
    </>
  );
}
