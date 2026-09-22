import React, { useEffect, useRef } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  time: number;
}

export const CustomCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointsRef = useRef<TrailPoint[]>([]);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const isHoveringInteractiveRef = useRef(false);
  const isVisibleRef = useRef(false);
  const animFrameIdRef = useRef<number | null>(null);
  const isLoopRunningRef = useRef(false);

  useEffect(() => {
    // Gracefully disable on touch devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Handle high-DPI displays
    const updateSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    const TRAIL_LIFETIME = 650; // ms: completely fades within 0.65s

    // Main render loop
    const render = () => {
      const now = performance.now();
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Filter out aged points
      pointsRef.current = pointsRef.current.filter((p) => now - p.time < TRAIL_LIFETIME);

      const points = pointsRef.current;

      if (points.length > 1) {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Draw multiple tapered segments for smooth fading width and golden glow
        for (let i = 1; i < points.length; i++) {
          const p1 = points[i - 1];
          const p2 = points[i];

          const ageRatio = (now - p2.time) / TRAIL_LIFETIME; // 0 (new) to 1 (old)
          const alpha = Math.max(0, 1 - ageRatio);
          const width = Math.max(0.6, 3.8 * (1 - ageRatio));

          // 1. Broad soft golden blur/glow shadow pass
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(255, 190, 0, ${alpha * 0.45})`;
          ctx.lineWidth = width * 2.2;
          ctx.shadowColor = '#FFD700';
          ctx.shadowBlur = 12;
          ctx.stroke();

          // 2. High-intensity golden core line
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(255, 215, 0, ${alpha})`;
          ctx.lineWidth = width;
          ctx.shadowColor = '#FFF5B8';
          ctx.shadowBlur = 4;
          ctx.stroke();
        }

        ctx.restore();
      }

      // Draw golden pointer tip at current mouse coordinates
      if (isVisibleRef.current && mousePosRef.current.x > 0) {
        const mx = mousePosRef.current.x;
        const my = mousePosRef.current.y;
        const isInteractive = isHoveringInteractiveRef.current;

        ctx.save();
        // Outer interactive golden aura when hovering clickable controls
        if (isInteractive) {
          ctx.beginPath();
          ctx.arc(mx, my, 14, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255, 215, 0, 0.55)';
          ctx.lineWidth = 1.5;
          ctx.shadowColor = '#FFD700';
          ctx.shadowBlur = 10;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(mx, my, 14, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 215, 0, 0.12)';
          ctx.fill();
        }

        // Center luminous golden dot
        ctx.beginPath();
        ctx.arc(mx, my, isInteractive ? 3.5 : 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFF8DB';
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 8;
        ctx.fill();

        ctx.restore();
      }

      // If trail points still exist or mouse is visible, keep loop running; otherwise idle
      if (pointsRef.current.length > 0 || isVisibleRef.current) {
        animFrameIdRef.current = requestAnimationFrame(render);
      } else {
        isLoopRunningRef.current = false;
      }
    };

    const startLoopIfNeeded = () => {
      if (!isLoopRunningRef.current) {
        isLoopRunningRef.current = true;
        animFrameIdRef.current = requestAnimationFrame(render);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      isVisibleRef.current = true;
      mousePosRef.current = { x: e.clientX, y: e.clientY };

      const now = performance.now();
      pointsRef.current.push({ x: e.clientX, y: e.clientY, time: now });

      // Check if hovering over clickable or interactive element
      const target = e.target as HTMLElement | null;
      if (
        target?.closest('button') ||
        target?.closest('a') ||
        target?.closest('input') ||
        target?.closest('[role="button"]') ||
        target?.closest('.cursor-pointer') ||
        target?.closest('.cursor-ew-resize')
      ) {
        isHoveringInteractiveRef.current = true;
      } else {
        isHoveringInteractiveRef.current = false;
      }

      startLoopIfNeeded();
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[99999] block w-full h-full will-change-transform"
      style={{ pointerEvents: 'none' }}
    />
  );
};
