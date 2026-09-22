import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Smartphone, Monitor } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project, ProjectCategory, AspectRatio } from '../types';
import { sounds } from '../utils/audio';
import { TiltProjectCard } from './TiltProjectCard';

interface WorkSectionProps {
  onSelectProject: (project: Project) => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({ onSelectProject }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [aspectFilter, setAspectFilter] = useState<'all' | AspectRatio>('all');
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  // Parallax glow effect moving slower than content scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const glowY1 = useTransform(scrollYProgress, [0, 1], [-90, 90]);
  const glowY2 = useTransform(scrollYProgress, [0, 1], [80, -80]);

  const categories: { label: string; value: ProjectCategory }[] = [
    { label: 'All Edits', value: 'all' },
    { label: 'Cinematic Reels', value: 'cinematic-reels' },
    { label: 'Poetic & Song Edits', value: 'poetic-edits' },
    { label: 'Trending Transitions', value: 'trending-transitions' }
  ];

  const filteredProjects = PROJECTS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesAspect = aspectFilter === 'all' || item.aspect === aspectFilter;
    return matchesCategory && matchesAspect;
  });

  return (
    <section ref={sectionRef} id="work" className="py-24 relative overflow-hidden bg-[#0A0A0A]">
      {/* Parallax Background glow highlights (moves slower than cards) */}
      <motion.div
        style={{ y: glowY1, willChange: 'transform, opacity' }}
        className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-[#00F0FF]/[0.06] rounded-full blur-[140px] pointer-events-none transform-gpu"
      />
      <motion.div
        style={{ y: glowY2, willChange: 'transform, opacity' }}
        className="absolute bottom-10 -right-20 w-[500px] h-[500px] bg-purple-600/[0.06] rounded-full blur-[140px] pointer-events-none transform-gpu"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        {/* Section Header with Side-Drift Entrance Animation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-3"
          >
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#00F0FF] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
              <span>Portfolio / My Work</span>
            </div>
            <h2 className="font-['Syne'] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Selected Edits & Reels
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl font-['Space_Grotesk'] leading-relaxed">
              Hover over any card for a 3D tilt preview. Click any project to open the <span className="text-[#00F0FF] font-medium">live video player modal</span> directly on the website.
            </p>
          </motion.div>

          {/* Aspect Ratio Filter (Focusing heavily on 9:16 Vertical) */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 p-1.5 rounded-xl bg-zinc-900/80 border border-white/10 self-start md:self-auto backdrop-blur-md"
          >
            <button
              onClick={() => {
                sounds.playClick(800, 0.03);
                setAspectFilter('all');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                aspectFilter === 'all'
                  ? 'bg-[#00F0FF] text-black font-semibold shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              All Formats
            </button>
            <button
              onClick={() => {
                sounds.playClick(800, 0.03);
                setAspectFilter('9:16');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
                aspectFilter === '9:16'
                  ? 'bg-[#00F0FF] text-black font-semibold shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>9:16 Reels / Shorts</span>
            </button>
            <button
              onClick={() => {
                sounds.playClick(800, 0.03);
                setAspectFilter('16:9');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
                aspectFilter === '16:9'
                  ? 'bg-[#00F0FF] text-black font-semibold shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>16:9 Cinematic</span>
            </button>
          </motion.div>
        </div>

        {/* Categories / Tabs as specified */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                sounds.playClick(750, 0.03);
                setActiveCategory(cat.value);
              }}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat.value
                  ? 'bg-[#00F0FF] text-black font-bold shadow-[0_0_20px_rgba(0,240,255,0.35)]'
                  : 'bg-zinc-900/70 text-zinc-400 hover:text-white border border-white/5 hover:border-white/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry Video Grid with 3D Tilt Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {filteredProjects.map((project, index) => (
            <TiltProjectCard
              key={project.id}
              project={project}
              index={index}
              isHovered={hoveredProjectId === project.id}
              onHover={setHoveredProjectId}
              onSelect={onSelectProject}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
