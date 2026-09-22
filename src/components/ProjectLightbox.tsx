import React, { useState, useRef, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, SlidersHorizontal, CheckCircle, Youtube, Instagram, Film, Music2, ExternalLink } from 'lucide-react';
import { Project } from '../types';
import { sounds } from '../utils/audio';

interface ProjectLightboxProps {
  project: Project | null;
  onClose: () => void;
  onStartInquiryWithProject?: (projectTitle: string) => void;
}

export const ProjectLightbox: React.FC<ProjectLightboxProps> = ({
  project,
  onClose,
  onStartInquiryWithProject
}) => {
  const [playerMode, setPlayerMode] = useState<'embed' | 'direct'>('embed');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showColorCompare, setShowColorCompare] = useState(false);
  const [sliderPos, setSliderPos] = useState(50);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      setShowColorCompare(false);
      setIsPlaying(true);
      setIsMuted(true);
      // Default to embed if available
      setPlayerMode(project.embedUrl || project.youtubeId ? 'embed' : 'direct');
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const isVertical = project.aspect === '9:16';
  const embedSrc = project.embedUrl || (project.youtubeId ? `https://www.youtube-nocookie.com/embed/${project.youtubeId}?autoplay=1&rel=0&modestbranding=1` : null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-3 sm:p-6 lg:p-8 overflow-y-auto animate-in fade-in duration-200">
      {/* Close button */}
      <button
        onClick={() => {
          sounds.playClick();
          onClose();
        }}
        className="fixed top-4 right-4 sm:top-6 sm:right-8 z-50 p-3 rounded-full bg-zinc-900/90 text-zinc-300 hover:text-white border border-white/10 hover:border-white/20 transition-all flex items-center gap-2 group shadow-2xl"
      >
        <span className="text-xs font-mono hidden sm:inline text-zinc-400 group-hover:text-white">CLOSE [ESC]</span>
        <X className="w-5 h-5" />
      </button>

      <div className="relative w-full max-w-4xl my-auto rounded-3xl overflow-hidden border border-white/15 bg-zinc-950 shadow-[0_0_80px_rgba(0,240,255,0.2)] flex flex-col">
        {/* Top Header */}
        <div className="px-6 py-4 bg-zinc-900/90 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono uppercase tracking-wider text-[#00F0FF] font-semibold">
                {project.categoryDisplay || project.category.replace('-', ' ')}
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-xs font-mono text-zinc-400">{project.client || 'LNX Original'}</span>
              <span className="text-zinc-600">•</span>
              <span className="text-xs font-mono text-zinc-400">{project.year}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold font-['Syne'] text-white">
              {project.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct Instagram Link Button */}
            {project.instagramUrl && (
              <a
                href={project.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#00F0FF]/15 to-purple-500/15 hover:from-[#00F0FF]/25 hover:to-purple-500/25 border border-[#00F0FF]/40 text-[#00F0FF] transition-all flex items-center gap-1.5 text-xs font-mono font-medium shadow-[0_0_15px_rgba(0,240,255,0.2)]"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Watch on Instagram</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            )}

            {/* Player Switcher (Live Embed vs Direct Cut) */}
            {embedSrc && (
              <div className="flex items-center p-1 rounded-xl bg-zinc-800/80 border border-white/10 text-xs font-mono">
                <button
                  onClick={() => {
                    sounds.playClick();
                    setPlayerMode('embed');
                  }}
                  className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                    playerMode === 'embed'
                      ? 'bg-[#00F0FF] text-black font-semibold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {embedSrc.includes('instagram.com') ? (
                    <Instagram className="w-3.5 h-3.5" />
                  ) : (
                    <Youtube className="w-3.5 h-3.5" />
                  )}
                  <span>Live Embed</span>
                </button>
                <button
                  onClick={() => {
                    sounds.playClick();
                    setPlayerMode('direct');
                  }}
                  className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                    playerMode === 'direct'
                      ? 'bg-[#00F0FF] text-black font-semibold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>Direct Preview</span>
                </button>
              </div>
            )}

            {/* Before/After Toggle if available */}
            {project.beforeAfter && (
              <button
                onClick={() => {
                  sounds.playClick(750, 0.04);
                  setShowColorCompare(!showColorCompare);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium border transition-all flex items-center gap-1.5 ${
                  showColorCompare
                    ? 'bg-[#00F0FF] text-black border-[#00F0FF]'
                    : 'bg-zinc-800 text-zinc-300 border-white/10 hover:border-white/20'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>{showColorCompare ? 'Video' : 'Grading'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Live Video Player Area */}
        <div className="relative w-full bg-black flex items-center justify-center min-h-[380px] max-h-[660px] overflow-hidden">
          {showColorCompare && project.beforeAfter ? (
            /* Embedded Color Grade Split-screen comparison */
            <div className="relative w-full aspect-video select-none overflow-hidden">
              <img
                src={project.beforeAfter.gradedUrl}
                alt="Color Graded"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 px-2.5 py-1 rounded bg-black/80 border border-[#00F0FF]/40 text-[11px] font-mono text-[#00F0FF]">
                {project.beforeAfter.gradedLabel}
              </div>

              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                <img
                  src={project.beforeAfter.rawUrl}
                  alt="Raw Log"
                  className="w-full h-full object-cover filter saturate-[0.35] brightness-[1.1] contrast-[0.85]"
                />
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-black/80 border border-white/20 text-[11px] font-mono text-zinc-300">
                  {project.beforeAfter.rawLabel}
                </div>
              </div>

              <div
                className="absolute top-0 bottom-0 w-0.5 bg-[#00F0FF] shadow-[0_0_10px_#00F0FF] pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-black border-2 border-[#00F0FF] flex items-center justify-center text-[10px] font-mono text-white shadow-xl">
                  ↔
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-20"
              />
            </div>
          ) : playerMode === 'embed' && embedSrc ? (
            /* Live Instagram / YouTube Iframe Embed playing directly on site */
            <div
              className={`relative flex flex-col items-center justify-center w-full py-4 ${
                isVertical
                  ? 'max-w-[400px]'
                  : 'max-w-3xl aspect-video'
              }`}
            >
              <div className="relative w-full h-[540px] sm:h-[620px] rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl">
                <iframe
                  src={embedSrc}
                  title={project.title}
                  loading="lazy"
                  frameBorder="0"
                  scrolling="no"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="w-full h-full border-0 select-none"
                />
              </div>

              {/* Instagram direct helper link underneath */}
              {project.instagramUrl && (
                <div className="mt-2.5 flex items-center justify-between w-full px-2 text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1 text-zinc-500">
                    <Instagram className="w-3.5 h-3.5 text-[#00F0FF]" />
                    <span>Instagram Reel Player</span>
                  </span>
                  <a
                    href={project.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00F0FF] hover:underline flex items-center gap-1 font-medium"
                  >
                    <span>Open in Instagram App</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          ) : (
            /* Direct HTML5 60FPS Video Player */
            <div
              className={`relative flex items-center justify-center ${
                isVertical ? 'w-full max-w-[340px] py-3' : 'w-full aspect-video'
              }`}
            >
              <video
                ref={videoRef}
                src={project.videoUrl}
                poster={project.posterUrl}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className={`object-contain max-h-[540px] rounded-xl ${
                  isVertical ? 'aspect-[9/16] shadow-2xl border border-white/10' : 'w-full h-full'
                }`}
              />

              {/* Playback Overlay Controls */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-auto">
                <div className="flex items-center gap-2">
                  <button
                    onClick={togglePlay}
                    className="p-2.5 rounded-xl bg-black/75 hover:bg-black/90 text-white backdrop-blur-md transition-all border border-white/10"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-2.5 rounded-xl bg-black/75 hover:bg-black/90 text-white backdrop-blur-md transition-all border border-white/10"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>

                <div className="px-3 py-1 rounded-xl bg-black/75 backdrop-blur-md text-xs font-mono text-zinc-300 border border-white/10">
                  {project.duration} • {project.fps}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Audio tag banner if available */}
        {project.audioTrack && (
          <div className="px-6 py-2.5 bg-zinc-900/60 border-t border-b border-white/5 flex items-center justify-between text-xs font-mono text-zinc-300">
            <div className="flex items-center gap-2">
              <Music2 className="w-4 h-4 text-[#00F0FF]" />
              <span>Audio: {project.audioTrack}</span>
            </div>
            {project.views && (
              <span className="text-emerald-400 font-bold">{project.views} Views</span>
            )}
          </div>
        )}

        {/* Project Breakdown Details */}
        <div className="p-6 sm:p-8 space-y-6 bg-zinc-950">
          {/* Metadata Specs Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-zinc-900/60 border border-white/5 font-mono text-xs">
            <div>
              <span className="text-zinc-500 block">ASPECT</span>
              <span className="text-[#00F0FF] font-bold">{project.aspect} ({project.resolution})</span>
            </div>
            <div>
              <span className="text-zinc-500 block">FRAME RATE</span>
              <span className="text-white font-semibold">{project.fps}</span>
            </div>
            <div>
              <span className="text-zinc-500 block">DURATION</span>
              <span className="text-white font-semibold">{project.duration}</span>
            </div>
            <div>
              <span className="text-zinc-500 block">YEAR</span>
              <span className="text-white font-semibold">{project.year}</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-mono tracking-wider text-zinc-400 uppercase">
              Creative Editing Approach
            </h3>
            <p className="text-zinc-200 text-sm leading-relaxed font-sans">
              {project.description}
            </p>
          </div>

          {/* Software Suite & Tags */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/10">
            <div>
              <span className="text-[11px] font-mono text-zinc-500 block mb-1.5">SOFTWARE STACK:</span>
              <div className="flex flex-wrap gap-1.5">
                {project.software.map((sw) => (
                  <span
                    key={sw}
                    className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-white/10 text-zinc-200 text-xs font-mono font-medium"
                  >
                    {sw}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded bg-[#00F0FF]/10 text-[#00F0FF] text-[11px] font-mono"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 flex items-center justify-between gap-4 border-t border-white/10">
            <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
              Love this pacing and mood? Let's produce your next reel.
            </span>
            <button
              onClick={() => {
                if (onStartInquiryWithProject) {
                  onStartInquiryWithProject(project.title);
                }
                onClose();
              }}
              className="ml-auto px-6 py-2.5 rounded-full bg-[#00F0FF] text-black font-['Space_Grotesk'] font-bold text-sm hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)]"
            >
              Order Similar Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
