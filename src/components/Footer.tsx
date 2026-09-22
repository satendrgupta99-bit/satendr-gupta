import React from 'react';
import { ArrowUp, Instagram, Youtube, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sounds.playWhoosh();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070707] border-t border-white/10 py-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo & Vibe */}
          <div className="flex items-center gap-3">
            <span className="font-['Syne'] font-extrabold text-xl text-white tracking-wider">
              LNX<span className="text-[#00F0FF] font-['Space_Grotesk'] text-lg font-light">_EDITOR</span>
            </span>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span className="text-xs font-mono text-zinc-400 hidden sm:inline flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#00F0FF]" />
              Aesthetic & Cinematic Short-Form Post
            </span>
          </div>

          {/* Social Links (Instagram & YouTube) */}
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com/LNX_EDITOR"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sounds.playClick(800, 0.02)}
              className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-[#00F0FF] hover:border-[#00F0FF]/40 transition-all flex items-center gap-2 text-xs font-mono"
            >
              <Instagram className="w-4 h-4 text-[#00F0FF]" />
              <span>Instagram</span>
            </a>

            <a
              href="https://youtube.com/@lnx_editor?si=3e3HDZECxi6U1Il"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sounds.playClick(800, 0.02)}
              className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-red-400 hover:border-red-400/40 transition-all flex items-center gap-2 text-xs font-mono"
            >
              <Youtube className="w-4 h-4 text-red-400" />
              <span>YouTube</span>
            </a>

            <button
              onClick={scrollToTop}
              title="Back to Top"
              className="p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-all"
            >
              <ArrowUp className="w-4 h-4 text-[#00F0FF]" />
            </button>
          </div>
        </div>

        {/* Minimalist Copyright */}
        <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 gap-2 text-center sm:text-left">
          <p>© 2026 LNX EDITOR. All rights reserved.</p>
          <p className="text-zinc-600">Short-Form Content • Cinematic Reels • Aesthetic Edits</p>
        </div>
      </div>
    </footer>
  );
};
