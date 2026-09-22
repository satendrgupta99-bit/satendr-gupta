import React, { useState, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { SlidersHorizontal, Activity, Layers, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { TOOL_STACK } from '../data/portfolioData';
import { sounds } from '../utils/audio';

interface ComparisonScene {
  id: string;
  name: string;
  camera: string;
  colorSpace: string;
  rawUrl: string;
  gradedUrl: string;
  rawDetails: string;
  gradedDetails: string;
}

const COMPARISON_SCENES: ComparisonScene[] = [
  {
    id: 'cyber',
    name: 'Neo Cyberpunk Street',
    camera: 'Arri Alexa Mini LF',
    colorSpace: 'Arri LogC3 to ACEScc',
    rawUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1600&q=70',
    gradedUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=85',
    rawDetails: 'Low contrast, flat dynamic range, unseparated neon spills',
    gradedDetails: 'Custom subtractive saturation, deep teal blacks & neon cyan separation'
  },
  {
    id: 'nordic',
    name: 'Nordic Volcanic Glacier',
    camera: 'RED V-Raptor 8K VV',
    colorSpace: 'REDWideGamutRGB to Film 2383',
    rawUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=70',
    gradedUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85',
    rawDetails: 'Overcast white sky clipping, muted basalt sands, flat shadows',
    gradedDetails: 'Balanced highlight rolloff, rich organic blues, 35mm film halation bloom'
  },
  {
    id: 'automotive',
    name: 'Midnight Supercar Sprint',
    camera: 'Sony FX6 Full-Frame',
    colorSpace: 'S-Gamut3.Cine / S-Log3 to Rec.709',
    rawUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1600&q=70',
    gradedUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85',
    rawDetails: 'Milky streetlights, washed asphalt reflections, flat car contours',
    gradedDetails: 'Deep obsidian contrast curve, metallic rim speculars, anamorphic blue flare'
  }
];

export const BeforeAfterSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedScene, setSelectedScene] = useState<ComparisonScene>(COMPARISON_SCENES[0]);
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeScope, setActiveScope] = useState<'none' | 'waveform' | 'parade'>('none');
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const glowY1 = useTransform(scrollYProgress, [0, 1], [-70, 70]);
  const glowY2 = useTransform(scrollYProgress, [0, 1], [70, -70]);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!sliderContainerRef.current) return;
      const rect = sliderContainerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setSliderPos(percentage);
    },
    []
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <section ref={sectionRef} id="before-after" className="py-24 bg-[#07070d] relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/30 to-transparent" />

      {/* Parallax ambient glows */}
      <motion.div
        style={{ y: glowY1 }}
        className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-[#00F0FF]/[0.05] rounded-full blur-[150px] pointer-events-none transform-gpu will-change-transform"
      />
      <motion.div
        style={{ y: glowY2 }}
        className="absolute bottom-10 -left-20 w-[500px] h-[500px] bg-purple-600/[0.05] rounded-full blur-[150px] pointer-events-none transform-gpu will-change-transform"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 relative z-10">
        {/* Section Header with Side-Drift */}
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono text-[#00F0FF]">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Interactive Color Grading Suite</span>
          </div>

          <h2 className="font-['Syne'] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            Raw Camera Log <span className="text-zinc-500 font-light">vs</span> Mastered Grade
          </h2>

          <p className="text-zinc-400 font-['Space_Grotesk'] text-sm sm:text-base leading-relaxed">
            Drag the slider horizontally to inspect color separation, dynamic range recovery, skin tone protection, and film density print emulation.
          </p>
        </motion.div>

        {/* Scene Presets Selector & Scopes Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-2 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-md">
          {/* Preset Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto">
            {COMPARISON_SCENES.map((scene) => (
              <button
                key={scene.id}
                onClick={() => {
                  sounds.playClick(700, 0.03);
                  setSelectedScene(scene);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  selectedScene.id === scene.id
                    ? 'bg-[#00F0FF] text-black font-semibold shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                {scene.name}
              </button>
            ))}
          </div>

          {/* Color Scopes Viewers Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-500 hidden sm:inline">Color Scopes:</span>
            <button
              onClick={() => {
                sounds.playClick(850, 0.03);
                setActiveScope(activeScope === 'waveform' ? 'none' : 'waveform');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all flex items-center gap-1.5 ${
                activeScope === 'waveform'
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/50'
                  : 'bg-zinc-900 text-zinc-400 border-white/10 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Waveform (IRE)</span>
            </button>
            <button
              onClick={() => {
                sounds.playClick(850, 0.03);
                setActiveScope(activeScope === 'parade' ? 'none' : 'parade');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all flex items-center gap-1.5 ${
                activeScope === 'parade'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                  : 'bg-zinc-900 text-zinc-400 border-white/10 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>RGB Parade</span>
            </button>
          </div>
        </div>

        {/* Draggable Split-Screen Slider Box */}
        <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-zinc-950 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          <div
            ref={sliderContainerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="relative w-full aspect-[16/9] sm:aspect-[21/9] select-none cursor-ew-resize overflow-hidden touch-none"
          >
            {/* Graded Image (Full Background) */}
            <img
              src={selectedScene.gradedUrl}
              alt="Final Color Graded"
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />

            {/* Graded Label Badge */}
            <div className="absolute top-4 right-4 z-10 pointer-events-none flex flex-col items-end gap-1">
              <span className="px-3 py-1.5 rounded-lg bg-black/80 border border-[#00F0FF]/40 text-xs font-mono text-[#00F0FF] backdrop-blur-md shadow-lg font-bold">
                FINAL GRADE // {selectedScene.colorSpace}
              </span>
              <span className="text-[11px] font-mono text-zinc-400 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm hidden sm:inline">
                {selectedScene.gradedDetails}
              </span>
            </div>

            {/* Raw Footage Layer (Clipped via clipPath) */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <img
                src={selectedScene.rawUrl}
                alt="Raw Camera Log"
                className="absolute inset-0 w-full h-full object-cover filter saturate-[0.25] brightness-[1.12] contrast-[0.8]"
                draggable={false}
              />
              <div className="absolute top-4 left-4 z-10 flex flex-col items-start gap-1">
                <span className="px-3 py-1.5 rounded-lg bg-black/80 border border-white/20 text-xs font-mono text-zinc-300 backdrop-blur-md shadow-lg font-bold">
                  RAW LOG // {selectedScene.camera}
                </span>
                <span className="text-[11px] font-mono text-zinc-400 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm hidden sm:inline">
                  {selectedScene.rawDetails}
                </span>
              </div>
            </div>

            {/* Center Draggable Bar */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-[#00F0FF] shadow-[0_0_15px_#00F0FF] pointer-events-none transition-transform"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-black/90 border-2 border-[#00F0FF] flex items-center justify-center text-white shadow-[0_0_20px_rgba(0,240,255,0.7)]">
                <span className="text-xs font-mono text-[#00F0FF] font-bold">◀ ▶</span>
              </div>
            </div>

            {/* Scopes Overlay Simulation */}
            {activeScope === 'waveform' && (
              <div className="absolute bottom-4 left-4 z-20 w-64 p-3 rounded-xl bg-black/85 border border-purple-500/40 backdrop-blur-xl font-mono text-[10px] space-y-1 pointer-events-none animate-in fade-in">
                <div className="flex justify-between text-purple-400 font-bold border-b border-white/10 pb-1">
                  <span>LUMA WAVEFORM</span>
                  <span>100 IRE (Peak)</span>
                </div>
                <div className="h-16 flex items-end justify-between gap-1 pt-1 opacity-80">
                  {[20, 35, 45, 60, 50, 75, 85, 95, 65, 45, 30, 70, 80, 55, 35, 20].map((v, i) => (
                    <div
                      key={i}
                      className="w-full bg-gradient-to-t from-purple-800 to-purple-300 rounded-t"
                      style={{ height: `${v}%` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-zinc-500 text-[9px]">
                  <span>0 IRE (Blacks)</span>
                  <span>Rec.709 Highlight Rolloff OK</span>
                </div>
              </div>
            )}

            {activeScope === 'parade' && (
              <div className="absolute bottom-4 left-4 z-20 w-72 p-3 rounded-xl bg-black/85 border border-emerald-500/40 backdrop-blur-xl font-mono text-[10px] space-y-1 pointer-events-none animate-in fade-in">
                <div className="flex justify-between text-emerald-400 font-bold border-b border-white/10 pb-1">
                  <span>RGB PARADE NODE</span>
                  <span>BALANCED CHANNELS</span>
                </div>
                <div className="grid grid-cols-3 gap-2 h-16 pt-1">
                  {/* RED */}
                  <div className="flex items-end gap-0.5 h-full border-r border-white/5">
                    <span className="text-[8px] text-red-400">R</span>
                    {[40, 70, 60, 80].map((v, i) => (
                      <div key={i} className="w-full bg-red-500 rounded-t" style={{ height: `${v}%` }} />
                    ))}
                  </div>
                  {/* GREEN */}
                  <div className="flex items-end gap-0.5 h-full border-r border-white/5">
                    <span className="text-[8px] text-emerald-400">G</span>
                    {[35, 65, 55, 75].map((v, i) => (
                      <div key={i} className="w-full bg-emerald-500 rounded-t" style={{ height: `${v}%` }} />
                    ))}
                  </div>
                  {/* BLUE */}
                  <div className="flex items-end gap-0.5 h-full">
                    <span className="text-[8px] text-blue-400">B</span>
                    {[50, 80, 70, 85].map((v, i) => (
                      <div key={i} className="w-full bg-blue-400 rounded-t" style={{ height: `${v}%` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick preset slider buttons */}
          <div className="px-6 py-3 bg-zinc-900/90 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-zinc-500">Quick Compare:</span>
              <button
                onClick={() => setSliderPos(0)}
                className="hover:text-[#00F0FF] transition-colors"
              >
                100% Graded
              </button>
              <span>•</span>
              <button
                onClick={() => setSliderPos(50)}
                className="hover:text-[#00F0FF] transition-colors"
              >
                50/50 Split
              </button>
              <span>•</span>
              <button
                onClick={() => setSliderPos(100)}
                className="hover:text-[#00F0FF] transition-colors"
              >
                100% Raw Log
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-zinc-300">
              <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>Drag handle anywhere to compare</span>
            </div>
          </div>
        </div>

        {/* Post-Production Software Stack Badges */}
        <div className="space-y-6 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
            <div>
              <h3 className="font-['Syne'] font-bold text-xl text-white">
                Technical Toolset & Engineering Stack
              </h3>
              <p className="text-zinc-400 text-xs font-mono">
                Certified workflows in industry-standard NLE and compositing environments
              </p>
            </div>
            <span className="text-xs font-mono text-[#00F0FF]">DCI Compliant Pipeline</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {TOOL_STACK.map((tool) => (
              <div
                key={tool.name}
                className="p-4 rounded-xl bg-zinc-950 border border-white/10 hover:border-[#00F0FF]/40 transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="w-2 h-2 rounded-full bg-[#00F0FF] group-hover:scale-125 transition-transform" />
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 group-hover:text-[#00F0FF]">
                    {tool.badge}
                  </span>
                </div>
                <h4 className="font-['Space_Grotesk'] font-bold text-sm text-zinc-200 group-hover:text-white">
                  {tool.name}
                </h4>
                <p className="text-[11px] text-zinc-500 font-mono leading-tight">
                  {tool.focus || tool.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
