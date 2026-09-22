import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote, TrendingUp, CheckCircle, Award } from 'lucide-react';
import { TESTIMONIALS } from '../data/portfolioData';
import { sounds } from '../utils/audio';

export const TestimonialsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], [-70, 70]);

  const prev = () => {
    sounds.playClick(600, 0.03);
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const next = () => {
    sounds.playClick(600, 0.03);
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section ref={sectionRef} id="testimonials" className="py-24 bg-[#06060c] relative overflow-hidden">
      {/* Background radial accent with parallax */}
      <motion.div
        style={{ y: glowY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#00F0FF]/[0.05] rounded-full blur-[160px] pointer-events-none transform-gpu will-change-transform"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Client Reviews Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column Description with Side-Drift */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 space-y-5"
          >
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#00F0FF] uppercase">
              <Award className="w-4 h-4 text-[#00F0FF]" />
              <span>Client Feedback</span>
            </div>

            <h2 className="font-['Syne'] text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              What Collaborators Say
            </h2>

            <p className="text-zinc-400 text-sm sm:text-base font-['Space_Grotesk'] leading-relaxed">
              Real feedback from creators, musical artists, and brands who trusted LNX EDITOR with their visual storytelling.
            </p>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-3 pt-4">
              <button
                onClick={prev}
                className="p-3 rounded-full border border-white/10 bg-zinc-900/80 hover:bg-zinc-800 text-white transition-all hover:border-[#00F0FF]/40"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="p-3 rounded-full border border-white/10 bg-zinc-900/80 hover:bg-zinc-800 text-white transition-all hover:border-[#00F0FF]/40"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <span className="text-xs font-mono text-zinc-500 pl-2">
                0{currentIndex + 1} / 0{TESTIMONIALS.length}
              </span>
            </div>
          </motion.div>

          {/* Right Column: Active Testimonial Card */}
          <div className="lg:col-span-8">
            <div className="relative p-8 sm:p-10 rounded-3xl bg-zinc-950 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.7)] space-y-6">
              {/* Quote icon watermark */}
              <Quote className="absolute top-6 right-8 w-16 h-16 text-white/5 pointer-events-none" />

              {/* Rating & Highlight Pill */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{current.highlightMetric}</span>
                </div>
              </div>

              {/* Testimonial Quote */}
              <p className="text-lg sm:text-xl text-zinc-200 font-['Space_Grotesk'] leading-relaxed italic">
                "{current.content}"
              </p>

              {/* Author Info */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="w-12 h-12 rounded-full object-cover border border-[#00F0FF]/40"
                  />
                  <div>
                    <h4 className="font-['Syne'] font-bold text-white text-base">
                      {current.name}
                    </h4>
                    <p className="text-xs text-zinc-400 font-mono">
                      {current.role} • {current.company}
                    </p>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-lg bg-zinc-900 border border-white/5 text-[11px] font-mono text-zinc-400">
                  {current.projectType}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
