import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WorkSection } from './components/WorkSection';
import { ToolkitSection } from './components/ToolkitSection';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { WorkflowSection } from './components/WorkflowSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { HireMeSection } from './components/HireMeSection';
import { Footer } from './components/Footer';
import { ShowreelModal } from './components/ShowreelModal';
import { ProjectLightbox } from './components/ProjectLightbox';
import { CustomCursor } from './components/CustomCursor';
import { ParallaxBackground } from './components/ParallaxBackground';
import { Project } from './types';
import { sounds } from './utils/audio';

export default function App() {
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [inquiryPrefill, setInquiryPrefill] = useState<string | undefined>(undefined);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });
    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Global listener for smooth anchor jumping with Lenis
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]');
      if (target) {
        const href = target.getAttribute('href');
        if (href && href.length > 1) {
          const el = document.querySelector(href);
          if (el) {
            e.preventDefault();
            lenis.scrollTo(el as HTMLElement, { offset: -30, duration: 1.2 });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const handleOpenHireModal = () => {
    sounds.playWhoosh();
    if (lenisRef.current) {
      lenisRef.current.scrollTo('#hire', { offset: -30, duration: 1.4 });
    } else {
      const hireElement = document.getElementById('hire');
      if (hireElement) {
        hireElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleStartInquiryWithProject = (projectTitle: string) => {
    setInquiryPrefill(projectTitle);
    handleOpenHireModal();
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slate-100 flex flex-col selection:bg-[#00F0FF]/30 selection:text-[#00F0FF] relative overflow-x-hidden">
      {/* Global Layered Parallax Background Glows */}
      <ParallaxBackground />

      {/* Custom Cybernetic Glow Cursor */}
      <CustomCursor />

      {/* Global Navigation Bar */}
      <Navbar
        onOpenHireModal={handleOpenHireModal}
        onOpenShowreel={() => setShowreelOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1 relative z-10">
        {/* Hero Section with Interactive 3D Smartphone & Play Button Canvas */}
        <HeroSection
          onOpenShowreel={() => setShowreelOpen(true)}
          onOpenHireModal={handleOpenHireModal}
        />

        {/* Portfolio / My Work (Focusing on 9:16 Vertical Videos & Live Video Modal) */}
        <WorkSection onSelectProject={(project) => setSelectedProject(project)} />

        {/* My Toolkit & Skills (CapCut, VN Video Editor, DaVinci Resolve, Alight Motion) */}
        <ToolkitSection />

        {/* Interactive Before & After Color Grading Suite */}
        <BeforeAfterSection />

        {/* 5-Phase Workflow */}
        <WorkflowSection />

        {/* Testimonials & Stats */}
        <TestimonialsSection />

        {/* Simple & Friendly Contact Form with Prominent WhatsApp Button */}
        <HireMeSection prefilledProject={inquiryPrefill} />
      </main>

      {/* Minimalist Footer with Instagram & YouTube */}
      <Footer />

      {/* Modals */}
      <ShowreelModal
        isOpen={showreelOpen}
        onClose={() => setShowreelOpen(false)}
      />

      <ProjectLightbox
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onStartInquiryWithProject={handleStartInquiryWithProject}
      />
    </div>
  );
}
