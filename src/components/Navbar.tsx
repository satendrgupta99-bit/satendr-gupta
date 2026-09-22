import React, { useState, useEffect } from 'react';
import { Aperture, Volume2, VolumeX, Menu, X, ArrowUpRight, Sparkles, Instagram, Youtube } from 'lucide-react';
import { sounds } from '../utils/audio';

interface NavbarProps {
  onOpenHireModal: () => void;
  onOpenShowreel: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenHireModal, onOpenShowreel }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const state = sounds.toggle();
    setSoundActive(state);
  };

  const navLinks = [
    { label: 'Watch Edits', href: '#work' },
    { label: 'Toolkit & Skills', href: '#toolkit' },
    { label: 'Color Grading', href: '#before-after' },
    { label: 'Workflow', href: '#workflow' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Hire Me', href: '#hire' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#050508]/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            onClick={() => sounds.playClick(900)}
            className="group flex items-center gap-3 select-none"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-800 to-[#0c0c16] border border-white/15 flex items-center justify-center group-hover:border-[#00F0FF]/50 transition-all shadow-[0_0_15px_rgba(0,240,255,0.15)] group-hover:shadow-[0_0_25px_rgba(0,240,255,0.35)]">
              <Aperture className="w-5 h-5 text-[#00F0FF] group-hover:rotate-45 transition-transform duration-500" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#00F0FF] rounded-full animate-ping opacity-60" />
            </div>

            <div className="flex flex-col">
              <span className="font-['Syne'] font-extrabold text-xl tracking-wider text-white flex items-center gap-1">
                LNX<span className="text-[#00F0FF] font-['Space_Grotesk'] text-lg font-light glow-text-cyan">_EDITOR</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase -mt-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Post-Production Studio
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 bg-zinc-900/60 border border-white/10 px-6 py-2 rounded-full backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => sounds.playClick(700, 0.03)}
                className="text-sm font-medium text-zinc-300 hover:text-[#00F0FF] transition-colors relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#00F0FF] group-hover:w-full transition-all duration-300 rounded-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center gap-3">
            {/* Social Links on Desktop */}
            <div className="hidden sm:flex items-center gap-2">
              <a
                href="https://instagram.com/LNX_EDITOR"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram @LNX_EDITOR"
                className="p-2 rounded-full border border-white/10 bg-zinc-900/60 text-zinc-400 hover:text-[#00F0FF] hover:border-[#00F0FF]/40 transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com/@lnx_editor?si=3e3HDZECxi6U1Il"
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube @lnx_editor"
                className="p-2 rounded-full border border-white/10 bg-zinc-900/60 text-zinc-400 hover:text-red-400 hover:border-red-400/40 transition-all"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              title={soundActive ? 'Mute interactive sound' : 'Enable interactive sound effects'}
              className={`p-2.5 rounded-full border transition-all text-xs flex items-center gap-1.5 ${
                soundActive
                  ? 'border-[#00F0FF]/40 bg-[#00F0FF]/15 text-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                  : 'border-white/10 bg-zinc-900/60 text-zinc-400 hover:text-white hover:border-white/20'
              }`}
            >
              {soundActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Quick Reel button on desktop */}
            <button
              onClick={() => {
                sounds.playWhoosh();
                onOpenShowreel();
              }}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-medium rounded-full border border-white/15 text-zinc-300 hover:text-white hover:border-white/30 bg-zinc-900/40 hover:bg-zinc-800/60 transition-all"
            >
              <span>Showreel 2026</span>
              <Sparkles className="w-3 h-3 text-[#00F0FF]" />
            </button>

            {/* Glowing Primary CTA */}
            <button
              onClick={() => {
                sounds.playWhoosh();
                onOpenHireModal();
              }}
              className="relative group overflow-hidden px-5 py-2.5 rounded-full font-['Space_Grotesk'] text-sm font-semibold tracking-wide text-black bg-gradient-to-r from-[#00F0FF] via-[#38bdf8] to-[#00F0FF] hover:opacity-95 transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.7)] active:scale-95 flex items-center gap-1.5"
            >
              <span>Hire Me</span>
              <ArrowUpRight className="w-4 h-4 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 md:hidden rounded-xl border border-white/10 bg-zinc-900/80 text-zinc-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/90 backdrop-blur-2xl p-6 flex flex-col justify-between animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Aperture className="w-6 h-6 text-[#00F0FF]" />
              <span className="font-['Syne'] font-bold text-lg text-white">LNX EDITOR</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg bg-zinc-800 text-zinc-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col gap-5 py-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  sounds.playClick();
                  setMobileMenuOpen(false);
                }}
                className="text-2xl font-['Syne'] font-bold text-zinc-200 hover:text-[#00F0FF] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenShowreel();
              }}
              className="text-left text-2xl font-['Syne'] font-bold text-zinc-200 hover:text-[#00F0FF]"
            >
              Watch Showreel 2026
            </button>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/10">
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/LNX_EDITOR"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-[#00F0FF] flex items-center justify-center gap-2 text-xs font-mono"
              >
                <Instagram className="w-4 h-4 text-[#00F0FF]" />
                <span>Instagram</span>
              </a>
              <a
                href="https://youtube.com/@lnx_editor?si=3e3HDZECxi6U1Il"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-red-400 flex items-center justify-center gap-2 text-xs font-mono"
              >
                <Youtube className="w-4 h-4 text-red-400" />
                <span>YouTube</span>
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Available Worldwide • Remote Post Studio</span>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenHireModal();
              }}
              className="w-full py-3.5 rounded-xl font-['Space_Grotesk'] text-base font-bold text-black bg-[#00F0FF] shadow-[0_0_25px_rgba(0,240,255,0.4)]"
            >
              Hire Me / Start a Project
            </button>
          </div>
        </div>
      )}
    </>
  );
};
