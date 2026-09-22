import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Scissors, Video, Palette, Sparkles, Layers, Sliders, CheckCircle2, Music, Cpu, Zap } from 'lucide-react';
import { TOOLKIT_SOFTWARE, CAPABILITIES_LIST } from '../data/portfolioData';
import { sounds } from '../utils/audio';

export const ToolkitSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCapability, setActiveCapability] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const glowY1 = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const glowY2 = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const getSoftwareIcon = (name: string) => {
    switch (name) {
      case 'CapCut':
        return <Scissors className="w-6 h-6 text-[#00F0FF]" />;
      case 'VN Video Editor':
        return <Video className="w-6 h-6 text-[#38BDF8]" />;
      case 'DaVinci Resolve':
        return <Palette className="w-6 h-6 text-[#FF9933]" />;
      case 'Alight Motion':
        return <Sparkles className="w-6 h-6 text-[#00FF99]" />;
      default:
        return <Layers className="w-6 h-6 text-[#00F0FF]" />;
    }
  };

  return (
    <section ref={sectionRef} id="toolkit" className="py-24 relative overflow-hidden bg-[#0A0A0A] border-t border-b border-white/5">
      {/* Background ambient lighting with parallax */}
      <motion.div
        style={{ y: glowY1 }}
        className="absolute top-1/3 left-1/4 w-[500px] h-[300px] bg-[#00F0FF]/[0.06] rounded-full blur-[140px] pointer-events-none transform-gpu will-change-transform"
      />
      <motion.div
        style={{ y: glowY2 }}
        className="absolute top-1/2 right-1/4 w-[500px] h-[300px] bg-purple-600/[0.06] rounded-full blur-[140px] pointer-events-none transform-gpu will-change-transform"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header with Side-Drift */}
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono text-[#00F0FF]">
            <Cpu className="w-3.5 h-3.5" />
            <span>Core Software & Production Stack</span>
          </div>

          <h2 className="font-['Syne'] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            My Toolkit & Skills
          </h2>

          <p className="text-zinc-400 font-['Space_Grotesk'] text-sm sm:text-base leading-relaxed">
            Harnessing dedicated desktop and mobile editing suites to deliver broadcast-quality cuts, viral velocity, and unforgettable aesthetic moods.
          </p>
        </motion.div>

        {/* 1. Software Used Banner (CapCut, VN Video Editor, DaVinci Resolve, Alight Motion) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 px-1">
            <span className="uppercase tracking-widest text-[#00F0FF]">PRIMARY SOFTWARE SUITES</span>
            <span>4 MASTERY CERTIFICATIONS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TOOLKIT_SOFTWARE.map((software) => (
              <div
                key={software.name}
                onMouseEnter={() => sounds.playClick(600, 0.02)}
                className="group relative p-6 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-[#00F0FF]/50 transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(0,240,255,0.15)] flex flex-col justify-between"
              >
                {/* Glow accent */}
                <div
                  className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none"
                  style={{ backgroundColor: software.color }}
                />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {getSoftwareIcon(software.name)}
                    </div>
                    <span
                      className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border"
                      style={{
                        borderColor: `${software.color}40`,
                        color: software.color,
                        backgroundColor: `${software.color}15`
                      }}
                    >
                      {software.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-['Syne'] font-bold text-lg text-white group-hover:text-[#00F0FF] transition-colors">
                      {software.name}
                    </h3>
                    <p className="text-xs font-mono text-zinc-400 mt-0.5">
                      {software.role}
                    </p>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    {software.highlight}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-zinc-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00F0FF]" />
                  <span>Pro Workflow Ready</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Capabilities List (Smooth Transitions, Aesthetic Color Grading, Beat Syncing, Text Animation) */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 px-1">
            <span className="uppercase tracking-widest text-[#00F0FF]">CORE CAPABILITIES</span>
            <span>WHAT I DO BEST</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CAPABILITIES_LIST.map((cap, idx) => (
              <div
                key={cap.title}
                onClick={() => {
                  sounds.playClick(700, 0.03);
                  setActiveCapability(idx);
                }}
                className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  activeCapability === idx
                    ? 'bg-zinc-900 border-[#00F0FF] shadow-[0_0_30px_rgba(0,240,255,0.2)]'
                    : 'bg-zinc-950 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded bg-zinc-900 border border-white/10 text-[10px] font-mono text-[#00F0FF]">
                      {cap.tag}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">0{idx + 1}</span>
                  </div>

                  <h3 className="font-['Syne'] font-bold text-lg text-white">
                    {cap.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-['Space_Grotesk']">
                    {cap.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500">Benchmark:</span>
                  <span className="text-emerald-400 font-semibold">{cap.metric}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Interactive Rhythm / Beat-Sync Audio Waveform Visualizer Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-white/10 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center lg:text-left">
            <h4 className="font-['Syne'] font-bold text-lg text-white flex items-center justify-center lg:justify-start gap-2">
              <Zap className="w-5 h-5 text-[#00F0FF]" />
              <span>Pixel-Perfect Sub-Frame Beat Syncing</span>
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400 font-['Space_Grotesk'] max-w-lg">
              Every cut, speed ramp, and camera blur is aligned to audio transients for maximum viewer dopamine and viral retention loops.
            </p>
          </div>

          <div className="flex items-center gap-1.5 h-10 px-4 py-2 rounded-xl bg-black border border-white/10">
            {[40, 75, 95, 60, 30, 85, 100, 50, 70, 90, 45, 65, 80, 100, 55, 35, 90, 60].map((h, i) => (
              <span
                key={i}
                className="w-1.5 rounded-full bg-[#00F0FF] transition-all animate-pulse"
                style={{
                  height: `${h}%`,
                  animationDelay: `${i * 80}ms`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
