import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Play, Instagram, Music2 } from 'lucide-react';
import { Project } from '../types';
import { sounds } from '../utils/audio';

interface TiltProjectCardProps {
  project: Project;
  index: number;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onSelect: (project: Project) => void;
}

export const TiltProjectCard: React.FC<TiltProjectCardProps> = ({
  project,
  index,
  isHovered,
  onHover,
  onSelect,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isVertical = project.aspect === '9:16';

  // 3D Tilt Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for tilt physics
  const springConfig = { damping: 25, stiffness: 220, mass: 0.5 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  // Rotate ranges: up to 6.5 degrees tilt
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['6.5deg', '-6.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6.5deg', '6.5deg']);

  // Dynamic glare angle & opacity
  const glareOpacity = useTransform(mouseYSpring, [-0.5, 0.5], [0.18, 0.0]);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseEnter = () => {
    onHover(project.id);
    sounds.playClick(520, 0.02);
  };

  const handleMouseLeave = () => {
    onHover(null);
    x.set(0);
    y.set(0);
  };

  const handleClick = () => {
    sounds.playWhoosh();
    onSelect(project);
  };

  return (
    <div
      style={{ perspective: 1200 }}
      className={`relative ${isVertical ? 'sm:row-span-2' : ''}`}
    >
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{
          duration: 0.65,
          delay: (index % 3) * 0.1,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          willChange: 'transform, opacity',
        }}
        className="group relative rounded-2xl overflow-hidden bg-zinc-950 border border-white/10 hover:border-[#00F0FF]/60 transition-colors duration-300 shadow-xl hover:shadow-[0_0_35px_rgba(0,240,255,0.22)] cursor-pointer flex flex-col transform-gpu select-none"
      >
        {/* Dynamic Specular Glare Layer */}
        <motion.div
          style={{
            opacity: glareOpacity,
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(0,240,255,0.35), transparent 60%)`,
          }}
          className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
        />

        {/* Media Container with 9:16 or 16:9 Aspect Ratio */}
        <div
          className={`relative w-full overflow-hidden bg-zinc-900 flex items-center justify-center rounded-t-2xl ${
            isVertical ? 'aspect-[9/16]' : 'aspect-video'
          }`}
        >
          {/* High-Performance Optimized Static Thumbnail Image */}
          <img
            src={project.posterUrl}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover z-[1] transition-transform duration-500 ease-out group-hover:scale-105 will-change-transform"
          />

          {/* Gradient Shadow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 pointer-events-none z-[2]" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
            <span className="px-2.5 py-1 rounded-full bg-black/75 border border-white/10 text-[10px] font-mono tracking-wider text-zinc-300 backdrop-blur-md uppercase">
              {project.client || 'LNX EDIT'}
            </span>

            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#00F0FF]/25 to-purple-500/25 text-[#00F0FF] border border-[#00F0FF]/40 text-[10px] font-mono font-semibold backdrop-blur-md flex items-center gap-1">
                <Instagram className="w-2.5 h-2.5" />
                <span>Reel</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-black/70 text-zinc-300 border border-white/10 text-[10px] font-mono font-bold backdrop-blur-md">
                {project.aspect}
              </span>
            </div>
          </div>

          {/* Center Play Button on Hover */}
          <div className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#00F0FF] text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-[0_0_25px_rgba(0,240,255,0.7)] pointer-events-none z-10">
            <Play className="w-6 h-6 fill-black ml-0.5" />
          </div>

          {/* Audio track tag if present */}
          {project.audioTrack && (
            <div className="absolute bottom-11 left-3 right-3 z-10 pointer-events-none">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 border border-white/15 text-[10px] font-mono text-zinc-300 backdrop-blur-md max-w-full truncate">
                <Music2 className="w-3 h-3 text-[#00F0FF] shrink-0" />
                <span className="truncate">{project.audioTrack}</span>
              </div>
            </div>
          )}

          {/* Bottom specs preview */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-zinc-300 z-10 pointer-events-none">
            <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md">
              {project.duration}
            </span>
            <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[#00F0FF]">
              {project.fps}
            </span>
          </div>
        </div>

        {/* Card Info Content */}
        <div className="p-4 sm:p-5 space-y-3 bg-zinc-950 flex-1 flex flex-col justify-between border-t border-white/5">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                {project.categoryDisplay || project.category.replace('-', ' ')}
              </span>
              <span className="text-xs font-mono text-zinc-500">{project.year}</span>
            </div>

            <h3 className="font-['Syne'] font-bold text-base sm:text-lg text-white group-hover:text-[#00F0FF] transition-colors leading-tight">
              {project.title}
            </h3>

            <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed font-sans">
              {project.description}
            </p>
          </div>

          {/* Software used pills & Live Play prompt */}
          <div className="pt-2 flex items-center justify-between border-t border-white/5 gap-2">
            <div className="flex flex-wrap gap-1">
              {project.software.slice(0, 2).map((s) => (
                <span
                  key={s}
                  className="px-2 py-0.5 rounded bg-zinc-900 border border-white/10 text-[10px] font-mono text-zinc-300"
                >
                  {s}
                </span>
              ))}
            </div>

            <span className="text-xs font-mono font-medium text-[#00F0FF] group-hover:translate-x-1 transition-transform flex items-center gap-1 shrink-0">
              <span>Watch Live</span>
              <span>▶</span>
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
