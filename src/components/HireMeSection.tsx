import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Send, CheckCircle2, MessageSquare, Sparkles, Instagram, Youtube, UserCheck, ArrowRight } from 'lucide-react';
import { InquiryFormData } from '../types';
import { sounds } from '../utils/audio';

interface HireMeSectionProps {
  prefilledProject?: string;
}

export const HireMeSection: React.FC<HireMeSectionProps> = ({ prefilledProject }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    email: '',
    projectType: 'Instagram Reel',
    details: prefilledProject ? `Interested in similar style/pacing to "${prefilledProject}"` : ''
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const glowY1 = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const glowY2 = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const projectTypes = [
    { id: 'Instagram Reel', label: 'Instagram Reel', sub: '9:16 Vertical Viral Edit' },
    { id: 'YouTube Video', label: 'YouTube Video', sub: 'Long-Form & Shorts Cuts' },
    { id: 'Personal Project', label: 'Personal Project', sub: 'Music, Travel, or Vlog' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playLaser();
    setIsSubmitted(true);
  };

  const resetForm = () => {
    sounds.playClick();
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      projectType: 'Instagram Reel',
      details: ''
    });
  };

  const whatsappUrl = "whatsapp://send?phone=918127060444&text=Hi%20Satendra,%20I%20checked%20out%20your%20portfolio%20and%20want%20to%20discuss%20a%20video%20editing%20project!";

  return (
    <section ref={sectionRef} id="hire" className="py-24 relative overflow-hidden bg-[#0A0A0A]">
      {/* Background glow lighting with parallax */}
      <motion.div
        style={{ y: glowY1 }}
        className="absolute top-1/3 right-10 w-96 h-96 bg-[#00F0FF]/[0.06] rounded-full blur-[160px] pointer-events-none transform-gpu will-change-transform"
      />
      <motion.div
        style={{ y: glowY2 }}
        className="absolute bottom-10 left-10 w-96 h-96 bg-purple-600/[0.06] rounded-full blur-[160px] pointer-events-none transform-gpu will-change-transform"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header with Side-Drift */}
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono text-[#00F0FF]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready to Collaborate?</span>
          </div>

          <h2 className="font-['Syne'] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            Hire Me / Let's Connect
          </h2>

          <p className="text-zinc-400 font-['Space_Grotesk'] text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Have raw footage ready or an aesthetic vision in mind? Drop a quick note below or ping me directly on WhatsApp for an immediate response.
          </p>
        </motion.div>

        {/* Instant Connect: Prominent "Chat on WhatsApp" Button */}
        <div className="flex justify-center">
          <a
            href={whatsappUrl}
            onClick={() => sounds.playClick()}
            className="group px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-['Space_Grotesk'] font-bold text-sm sm:text-base flex items-center gap-3 transition-all shadow-[0_0_30px_rgba(16,185,129,0.35)] hover:shadow-[0_0_45px_rgba(16,185,129,0.6)] active:scale-95"
          >
            <div className="w-7 h-7 rounded-full bg-black/15 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-black" />
            </div>
            <span>Chat on WhatsApp</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Divider with friendly text */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-white/10 w-full" />
          <span className="bg-[#0A0A0A] px-4 text-xs font-mono text-zinc-500 uppercase tracking-wider shrink-0">
            or send project brief
          </span>
          <div className="border-t border-white/10 w-full" />
        </div>

        {/* Simple & Friendly Contact Form */}
        <div className="rounded-3xl bg-zinc-950 border border-white/15 p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          {isSubmitted ? (
            /* Friendly Confirmation State */
            <div className="py-8 text-center space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-[#00F0FF]/20 border border-[#00F0FF] mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.4)]">
                <CheckCircle2 className="w-8 h-8 text-[#00F0FF]" />
              </div>

              <div className="space-y-1">
                <h3 className="font-['Syne'] text-2xl font-bold text-white">
                  Message Sent to LNX EDITOR!
                </h3>
                <p className="text-zinc-400 text-sm font-['Space_Grotesk'] max-w-md mx-auto">
                  Thank you, <span className="text-white font-medium">{formData.name}</span>. I have received your request for a <span className="text-[#00F0FF] font-medium">{formData.projectType}</span>. I will review your idea and get back to you within a few hours.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={resetForm}
                  className="px-6 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-mono border border-white/10 transition-all"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 1. Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400">YOUR NAME *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Liam Parker"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00F0FF] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400">EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="liam@creator.com"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00F0FF] transition-all"
                  />
                </div>
              </div>

              {/* 2. Project Type Selector (Instagram Reel, YouTube Video, Personal Project) */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-400">PROJECT TYPE *</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {projectTypes.map((pt) => (
                    <div
                      key={pt.id}
                      onClick={() => {
                        sounds.playClick(650, 0.02);
                        setFormData({ ...formData, projectType: pt.id });
                      }}
                      className={`cursor-pointer p-4 rounded-xl border transition-all ${
                        formData.projectType === pt.id
                          ? 'bg-zinc-900 border-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.15)]'
                          : 'bg-zinc-950 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-['Space_Grotesk'] font-bold text-white text-sm">
                          {pt.label}
                        </span>
                        <span
                          className={`w-3.5 h-3.5 rounded-full border ${
                            formData.projectType === pt.id
                              ? 'bg-[#00F0FF] border-[#00F0FF]'
                              : 'border-zinc-600'
                          }`}
                        />
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-1">{pt.sub}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Message / Project Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-400">
                  PROJECT VISION / SONG REFERENCE (OPTIONAL)
                </label>
                <textarea
                  rows={3}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Tell me about your song choice, desired pacing, deadline, or raw footage links (Drive / Dropbox)..."
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00F0FF] transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#00F0FF] text-black font-['Space_Grotesk'] font-bold text-sm flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-[0_0_25px_rgba(0,240,255,0.45)] active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
