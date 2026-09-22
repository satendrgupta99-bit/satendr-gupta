import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Film, Palette, Volume2, Sparkles, Check, ArrowRight, Layers, Cpu, Clock, ShieldCheck } from 'lucide-react';
import { WORKFLOW_STEPS, CAPABILITIES } from '../data/portfolioData';
import { sounds } from '../utils/audio';

export const WorkflowSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  const getCapabilityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Film':
        return <Film className="w-5 h-5 text-[#00F0FF]" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-purple-400" />;
      case 'Volume2':
        return <Volume2 className="w-5 h-5 text-cyan-300" />;
      case 'Sparkles':
      default:
        return <Sparkles className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section ref={sectionRef} id="workflow" className="py-24 relative overflow-hidden">
      {/* Background cyber accent with parallax */}
      <motion.div
        style={{ y: glowY, willChange: 'transform, opacity' }}
        className="absolute top-1/3 right-10 w-96 h-96 bg-[#00F0FF]/[0.05] rounded-full blur-[140px] pointer-events-none transform-gpu"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 relative z-10">
        {/* Section 1: Core Capabilities 4-Grid */}
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <motion.div
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-3"
            >
              <span className="text-xs font-mono tracking-widest text-[#00F0FF] uppercase">
                ✦ High-End Capabilities
              </span>
              <h2 className="font-['Syne'] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
                Engineered for Impact & Retention
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="text-zinc-400 text-sm sm:text-base max-w-md font-['Space_Grotesk']"
            >
              Every cut, color node, and sound layer is calculated to grip the audience's psychology and elevate brand credibility.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CAPABILITIES.map((cap, idx) => (
              <div
                key={cap.title}
                onMouseEnter={() => sounds.playClick(600, 0.02)}
                className="group p-6 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-[#00F0FF]/40 transition-all duration-300 space-y-4 shadow-lg hover:shadow-[0_0_25px_rgba(0,240,255,0.12)] flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getCapabilityIcon(cap.icon)}
                  </div>
                  <h3 className="font-['Syne'] font-bold text-lg text-white group-hover:text-[#00F0FF] transition-colors leading-snug">
                    {cap.title}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                    {cap.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#00F0FF]">
                    {cap.metric}
                  </span>
                  <span className="text-zinc-600 font-mono text-xs">0{idx + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Step-by-Step Workflow Pipeline */}
        <div id="workflow" className="space-y-10 pt-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono tracking-widest text-[#00F0FF] uppercase">
              ✦ Seamless Remote Collaboration
            </span>
            <h2 className="font-['Syne'] text-3xl sm:text-4xl font-extrabold text-white">
              The 5-Phase Post-Production Architecture
            </h2>
            <p className="text-zinc-400 font-['Space_Grotesk'] text-sm sm:text-base">
              From raw footage transfer via Frame.io or Google Drive to color-graded, sound-mixed, multi-format delivery.
            </p>
          </div>

          {/* Workflow Interactive Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {WORKFLOW_STEPS.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <div
                  key={step.number}
                  onClick={() => {
                    sounds.playClick(700 + index * 50, 0.03);
                    setActiveStep(index);
                  }}
                  className={`cursor-pointer p-5 rounded-2xl border transition-all duration-300 relative flex flex-col justify-between gap-4 ${
                    isActive
                      ? 'bg-zinc-900 border-[#00F0FF] shadow-[0_0_25px_rgba(0,240,255,0.2)]'
                      : 'bg-zinc-950/80 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-2xl font-bold font-['Syne'] ${
                        isActive ? 'text-[#00F0FF]' : 'text-zinc-600'
                      }`}
                    >
                      {step.number}
                    </span>
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        isActive ? 'bg-[#00F0FF] animate-pulse' : 'bg-zinc-700'
                      }`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <h3
                      className={`font-['Space_Grotesk'] font-bold text-sm ${
                        isActive ? 'text-white' : 'text-zinc-300'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                      {step.desc}
                    </p>
                  </div>

                  <div className="text-[10px] font-mono text-zinc-500 pt-2 border-t border-white/5 flex items-center justify-between">
                    <span>Phase 0{index + 1}</span>
                    <span className="text-[#00F0FF] opacity-0 group-hover:opacity-100">
                      View
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Guarantee Badges */}
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs text-zinc-300">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#00F0FF] shrink-0" />
              <div>
                <span className="font-bold text-white block">Strict Delivery Deadlines</span>
                <span className="text-zinc-500">Never miss a campaign drop date</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Layers className="w-5 h-5 text-purple-400 shrink-0" />
              <div>
                <span className="font-bold text-white block">Iterative Revision Rounds</span>
                <span className="text-zinc-500">Direct timecode notes via Frame.io</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold text-white block">Full Project Archiving</span>
                <span className="text-zinc-500">Project files & stems backed up in cold storage</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
