import React, { useState, useRef, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw, Sparkles } from 'lucide-react';
import { SHOWREEL_DATA } from '../data/portfolioData';
import { sounds } from '../utils/audio';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShowreelModal: React.FC<ShowreelModalProps> = ({ isOpen, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00:00');
  const [duration, setDuration] = useState('00:01:45');
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Attempt play on open
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      }, 200);
    } else {
      document.body.style.overflow = 'unset';
      if (videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ' && isOpen) {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

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

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration || 105;
    setProgress((current / total) * 100);

    const mins = Math.floor(current / 60);
    const secs = Math.floor(current % 60);
    const frames = Math.floor((current % 1) * 24);
    setCurrentTime(
      `00:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${frames
        .toString()
        .padStart(2, '0')}`
    );
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * (videoRef.current.duration || 105);
  };

  const cyclePlaybackRate = () => {
    if (!videoRef.current) return;
    const rates = [1, 1.25, 1.5, 0.75];
    const nextIndex = (rates.indexOf(playbackRate) + 1) % rates.length;
    const nextRate = rates[nextIndex];
    videoRef.current.playbackRate = nextRate;
    setPlaybackRate(nextRate);
    sounds.playClick(800, 0.03);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-6 lg:p-10 animate-in fade-in duration-300">
      {/* Close button */}
      <button
        onClick={() => {
          sounds.playClick();
          onClose();
        }}
        className="absolute top-4 right-4 sm:top-6 sm:right-8 z-50 p-3 rounded-full bg-zinc-900/80 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-white/10 transition-all flex items-center gap-2 group"
      >
        <span className="text-xs font-mono hidden sm:inline text-zinc-400 group-hover:text-white">ESC</span>
        <X className="w-5 h-5" />
      </button>

      <div className="relative w-full max-w-6xl rounded-2xl overflow-hidden border border-white/15 bg-zinc-950 shadow-[0_0_80px_rgba(0,240,255,0.25)] flex flex-col">
        {/* Video Header Telemetry */}
        <div className="flex items-center justify-between px-5 py-3 bg-zinc-900/90 border-b border-white/10 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span className="text-white font-semibold tracking-wider">{SHOWREEL_DATA.title}</span>
            <span className="hidden md:inline px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
              {SHOWREEL_DATA.fps}
            </span>
            <span className="hidden md:inline px-2 py-0.5 rounded bg-[#00F0FF]/10 text-[#00F0FF]">
              {SHOWREEL_DATA.resolution}
            </span>
          </div>

          <div className="flex items-center gap-3 text-zinc-400">
            <span className="hidden sm:inline">{SHOWREEL_DATA.colorSpace}</span>
            <span className="text-[#00F0FF]">{currentTime}</span>
          </div>
        </div>

        {/* Cinematic Video Stage with Letterbox overlay */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center group overflow-hidden">
          <video
            ref={videoRef}
            src={SHOWREEL_DATA.videoUrl}
            poster={SHOWREEL_DATA.posterUrl}
            onTimeUpdate={handleTimeUpdate}
            onClick={togglePlay}
            loop
            playsInline
            className="w-full h-full object-contain cursor-pointer"
          />

          {/* Center Play/Pause button on hover or pause */}
          {!isPlaying && (
            <button
              onClick={togglePlay}
              className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-[#00F0FF]/90 text-black flex items-center justify-center shadow-[0_0_40px_rgba(0,240,255,0.8)] hover:scale-105 active:scale-95 transition-all"
            >
              <Play className="w-8 h-8 fill-black ml-1" />
            </button>
          )}

          {/* Letterbox subtle top/bottom bars */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-black/70 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-black/70 pointer-events-none" />
        </div>

        {/* Video Scrubber & Playback Controls */}
        <div className="p-4 bg-zinc-950/95 border-t border-white/10 space-y-3">
          {/* Timeline scrub track */}
          <div
            onClick={handleSeek}
            className="group/seek relative w-full h-2.5 bg-zinc-800/80 hover:h-4 rounded-full cursor-pointer transition-all flex items-center"
          >
            <div
              className="h-full bg-gradient-to-r from-[#00F0FF] to-cyan-300 rounded-full relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_10px_#00F0FF] opacity-0 group-hover/seek:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Control Bar Actions */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="p-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white transition-all"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              </button>

              <button
                onClick={toggleMute}
                className="p-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-all"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <span className="font-mono text-xs text-zinc-400">
                {currentTime} / {duration}
              </span>
            </div>

            {/* Audio Waveform Graphic Simulation */}
            <div className="hidden lg:flex items-center gap-1 h-6">
              {[40, 75, 20, 90, 60, 30, 85, 45, 95, 30, 70, 40, 80, 25, 60, 90, 35].map(
                (h, idx) => (
                  <span
                    key={idx}
                    className={`w-1 rounded-full transition-all duration-150 ${
                      isPlaying ? 'bg-[#00F0FF]' : 'bg-zinc-700'
                    }`}
                    style={{
                      height: isPlaying ? `${Math.max(15, (h * (progress + 20)) % 100)}%` : '20%'
                    }}
                  />
                )
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={cyclePlaybackRate}
                className="px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-xs font-mono text-zinc-300 hover:text-white border border-white/5 transition-all"
              >
                {playbackRate}x
              </button>

              <button
                onClick={toggleFullscreen}
                className="p-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-all"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Project Details Strip */}
        <div className="px-5 py-3 bg-zinc-900/60 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="text-zinc-500 font-mono">Featured Clients:</span>
            {SHOWREEL_DATA.clientList.map((client) => (
              <span
                key={client}
                className="px-2 py-0.5 rounded-md bg-zinc-800/80 text-zinc-300 font-medium"
              >
                {client}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 text-zinc-400">
            <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>Mastered in DaVinci Resolve Studio 19</span>
          </div>
        </div>
      </div>
    </div>
  );
};
