import React from 'react';
import { Play, ArrowRight, Film, Sparkles, Layers, Sliders, CheckCircle2 } from 'lucide-react';
import { Hero3DCanvas } from './Hero3DCanvas';
import { sounds } from '../utils/audio';

interface HeroSectionProps {
  onOpenShowreel: () => void;
  onOpenHireModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenShowreel,
  onOpenHireModal
}) => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background ambient lighting glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00F0FF]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[450px] h-[450px] bg-[#8B5CF6]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute -top-20 right-10 w-[500px] h-[500px] bg-[#00F0FF]/6 rounded-full blur-[180px] pointer-events-none" />

      {/* Decorative cyber grid lines */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Typography and CTAs */}
          <div className="lg:col-span-6 space-y-6">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-[#00F0FF]/30 backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.1)]">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
              <span className="text-xs font-mono tracking-wider font-semibold text-zinc-200 uppercase">
                ✦ 2026 Creative Post-Production
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">|</span>
              <span className="text-xs font-mono text-[#00F0FF]">DCI 4K & ACES</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-['Syne'] text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
              Crafting{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
                Cinematic Visuals
              </span>{' '}
              &&nbsp;
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-cyan-300 to-sky-400 glow-text-cyan">
                Aesthetic
              </span>{' '}
              Edits.
            </h1>

            {/* Subhead as requested */}
            <p className="text-lg sm:text-xl text-zinc-300 font-['Space_Grotesk'] font-normal max-w-xl leading-relaxed">
              Specializing in short-form content, cinematic reels, and emotional/poetic video transitions.
            </p>

            <p className="text-sm text-zinc-400 leading-relaxed max-w-lg">
              Elevating creator stories, music moods, and brand moments with precision beat-syncing, film emulation colors, and seamless velocity cuts.
            </p>

            {/* Action Buttons: "Watch Edits" and "Hire Me" */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              {/* Watch Edits Button */}
              <a
                href="#work"
                onClick={() => sounds.playWhoosh()}
                className="group relative px-7 py-3.5 rounded-full font-['Space_Grotesk'] font-bold text-sm tracking-wide text-black bg-[#00F0FF] hover:bg-cyan-300 transition-all shadow-[0_0_25px_rgba(0,240,255,0.45)] hover:shadow-[0_0_35px_rgba(0,240,255,0.7)] active:scale-95 flex items-center gap-2.5"
              >
                <div className="w-6 h-6 rounded-full bg-black/15 flex items-center justify-center">
                  <Play className="w-3.5 h-3.5 fill-black text-black ml-0.5" />
                </div>
                <span>Watch Edits</span>
              </a>

              {/* Hire Me Button */}
              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenHireModal();
                }}
                className="px-7 py-3.5 rounded-full font-['Space_Grotesk'] font-semibold text-sm tracking-wide text-zinc-200 hover:text-white bg-zinc-900/80 hover:bg-zinc-800/80 border border-white/15 hover:border-white/30 backdrop-blur-md transition-all active:scale-95 flex items-center gap-2 group"
              >
                <span>Hire Me</span>
                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </button>
            </div>

            {/* Quick Proof Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-zinc-400 font-mono">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00F0FF]" />
                <span>48-Hour Rapid Delivery Option</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00F0FF]" />
                <span>DaVinci Studio 19 & ACEScc</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00F0FF]" />
                <span>Precision Beat-Sync & Sound Design</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Cinema Camera Canvas */}
          <div className="lg:col-span-6 relative">
            {/* Ambient decorative backdrop frame */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-[#00F0FF]/30 via-transparent to-[#8B5CF6]/30 blur-lg opacity-70 pointer-events-none" />

            <div className="relative rounded-3xl border border-white/10 bg-[#0A0A12]/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
              <Hero3DCanvas />
            </div>

            {/* Floating Mini Badges */}
            <div className="absolute -bottom-5 -left-4 sm:left-4 z-20 bg-zinc-950/90 border border-white/10 p-3 rounded-2xl backdrop-blur-xl shadow-2xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#00F0FF]/15 border border-[#00F0FF]/30 flex items-center justify-center">
                <Film className="w-5 h-5 text-[#00F0FF]" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-mono text-zinc-400">Format Focus</p>
                <p className="text-sm font-bold text-white font-['Space_Grotesk']">9:16 Reels & Cinematic Cuts</p>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 z-20 hidden sm:flex bg-zinc-950/90 border border-white/10 p-3 rounded-2xl backdrop-blur-xl shadow-2xl items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
                <Sliders className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-mono text-zinc-400">Grade Standard</p>
                <p className="text-sm font-bold text-white font-['Space_Grotesk']">Arri LogC3 & S-Log3</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
