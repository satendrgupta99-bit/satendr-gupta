import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Smartphone, Play, Sparkles, RotateCcw } from 'lucide-react';
import { sounds } from '../utils/audio';

export const Hero3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phoneDomRef = useRef<HTMLDivElement>(null);
  const [modelMode, setModelMode] = useState<'phone' | 'playButton'>('phone');

  // Three.js object references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const playGroupRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  // Mouse & tilt state
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);
    cameraRef.current = camera;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    rendererRef.current = renderer;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const cyanLight = new THREE.DirectionalLight(0x00f0ff, 3.5);
    cyanLight.position.set(4, 5, 4);
    scene.add(cyanLight);

    const purpleLight = new THREE.DirectionalLight(0xa855f7, 3.0);
    purpleLight.position.set(-4, -3, 3);
    scene.add(purpleLight);

    const backRimLight = new THREE.PointLight(0x00f0ff, 2.5, 12);
    backRimLight.position.set(0, 2, -4);
    scene.add(backRimLight);

    // --- GLOWING 3D PLAY BUTTON MODEL (Alternative Mode) ---
    const playGroup = new THREE.Group();
    playGroupRef.current = playGroup;
    playGroup.visible = false;
    scene.add(playGroup);

    // Outer Glass Ring
    const playRingGeo = new THREE.TorusGeometry(1.8, 0.12, 24, 64);
    const playRingMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      metalness: 0.85,
      roughness: 0.1
    });
    const playRing = new THREE.Mesh(playRingGeo, playRingMat);
    playGroup.add(playRing);

    // Inner Glowing Disc
    const playDiscGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.08, 48);
    const playDiscMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a1020,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.8,
      thickness: 0.5,
      transparent: true,
      opacity: 0.85
    });
    const playDisc = new THREE.Mesh(playDiscGeo, playDiscMat);
    playDisc.rotation.x = Math.PI / 2;
    playGroup.add(playDisc);

    // 3D Play Triangle
    const triShape = new THREE.Shape();
    triShape.moveTo(-0.6, -0.9);
    triShape.lineTo(-0.6, 0.9);
    triShape.lineTo(0.9, 0);
    triShape.closePath();

    const triGeo = new THREE.ExtrudeGeometry(triShape, {
      depth: 0.25,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 0.06,
      bevelThickness: 0.06
    });
    triGeo.center();

    const triMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      metalness: 0.9,
      roughness: 0.15
    });
    const triMesh = new THREE.Mesh(triGeo, triMat);
    triMesh.position.set(0.1, 0, 0.05);
    playGroup.add(triMesh);

    // Floating orbit rings around play button
    const orbit1 = new THREE.Mesh(
      new THREE.TorusGeometry(2.3, 0.02, 16, 64),
      new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.5 })
    );
    orbit1.rotation.x = Math.PI / 3;
    playGroup.add(orbit1);

    const orbit2 = new THREE.Mesh(
      new THREE.TorusGeometry(2.1, 0.015, 16, 64),
      new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.4 })
    );
    orbit2.rotation.y = Math.PI / 3;
    playGroup.add(orbit2);

    // --- AMBIENT CYBER PARTICLES ---
    const pCount = 200;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    const pCol = new Float32Array(pCount * 3);

    for (let i = 0; i < pCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 15;
      pPos[i + 1] = (Math.random() - 0.5) * 13;
      pPos[i + 2] = (Math.random() - 0.5) * 10;

      if (Math.random() > 0.5) {
        pCol[i] = 0.0;
        pCol[i + 1] = 0.94;
        pCol[i + 2] = 1.0; // Cyan
      } else {
        pCol[i] = 0.65;
        pCol[i + 1] = 0.35;
        pCol[i + 2] = 0.98; // Purple
      }
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);
    particlesRef.current = particles;

    // --- Resize Handler ---
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const newW = containerRef.current.clientWidth;
      const newH = containerRef.current.clientHeight;
      cameraRef.current.aspect = newW / newH;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // --- Main Animation Loop ---
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth lerp mouse parallax
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.08;
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.08;

      // Update 3D Phone Chassis tilt & float in real-time
      if (phoneDomRef.current) {
        const rx = currentRotation.current.x * 20; // -8 to +8 deg
        const ry = currentRotation.current.y * 26; // -14 to +14 deg
        const bob = Math.sin(elapsedTime * 1.6) * 5; // gentle floating bob
        phoneDomRef.current.style.transform = `perspective(1000px) translateY(${bob}px) rotateX(${-rx}deg) rotateY(${ry}deg)`;
      }

      // Play button 3D animation
      if (playGroupRef.current && playGroupRef.current.visible) {
        const bob = Math.sin(elapsedTime * 2.0) * 0.1;
        playGroupRef.current.position.y = bob;
        playGroupRef.current.rotation.y = elapsedTime * 0.4 + currentRotation.current.y;
        playGroupRef.current.rotation.x = 0.1 + currentRotation.current.x;
      }

      // Particles drift
      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsedTime * 0.03;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Switch between 3D Smartphone and 3D Play Button
  const toggleModel = (mode: 'phone' | 'playButton') => {
    sounds.playClick(800, 0.03);
    setModelMode(mode);
    if (playGroupRef.current) {
      playGroupRef.current.visible = mode === 'playButton';
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

    // Natural tilt angles
    targetRotation.current.x = -y * 0.35;
    targetRotation.current.y = x * 0.55;
  };

  const handleResetTilt = () => {
    sounds.playClick();
    targetRotation.current = { x: 0, y: 0 };
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className="relative w-full h-[460px] sm:h-[520px] lg:h-[580px] select-none cursor-grab active:cursor-grabbing overflow-hidden rounded-3xl"
    >
      {/* 3D WebGL Canvas for Background Cyber Particles & Holographic Play Button */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* 3D Smartphone Chassis Overlay with Real Playing Instagram Reel */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-3 sm:p-4">
        <div
          ref={phoneDomRef}
          style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
          className={`relative w-[280px] sm:w-[310px] h-[450px] sm:h-[510px] rounded-[42px] bg-[#0c0c14] p-2.5 sm:p-3 shadow-[0_0_50px_rgba(0,240,255,0.35),0_25px_60px_rgba(0,0,0,0.9)] border-[4px] border-[#222230] transition-opacity duration-300 pointer-events-auto ${
            modelMode === 'phone' ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Dynamic Island Notch */}
          <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-30 flex items-center justify-between px-2.5 border border-white/10 shadow-md pointer-events-none">
            <div className="w-2 h-2 rounded-full bg-[#151520] border border-white/10 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[#00F0FF]/90" />
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[7.5px] font-mono text-zinc-400 font-semibold tracking-wider">LIVE</span>
            </div>
          </div>

          {/* Neon Edge Rim Accent */}
          <div className="absolute inset-0 rounded-[42px] border border-[#00F0FF]/40 pointer-events-none shadow-[inset_0_0_15px_rgba(0,240,255,0.2)]" />

          {/* Screen Area with 9:16 Aspect Masking & Embedded Reel */}
          <div className="w-full h-full rounded-[34px] overflow-hidden bg-black relative flex items-center justify-center shadow-inner">
            <iframe
              src="https://www.instagram.com/reel/DcuxTecIOQU/embed/"
              title="LNX EDITOR Featured Instagram Reel"
              frameBorder="0"
              scrolling="no"
              allow="autoplay; encrypted-media"
              className="w-full h-full border-0 select-none bg-black"
            />
          </div>

          {/* Subtle Glass Glare Reflection */}
          <div className="absolute inset-0 rounded-[34px] bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-20" />
        </div>
      </div>

      {/* Cyber HUD telemetry badge */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none z-10">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-pulse shadow-[0_0_10px_#00F0FF]" />
          <span className="text-xs font-mono tracking-wider font-semibold text-zinc-300">
            {modelMode === 'phone' ? '3D VERTICAL REEL PREVIEW' : '3D HOLOGRAPHIC PLAY'}
          </span>
          <span className="text-[10px] font-mono text-[#00F0FF] px-1.5 py-0.5 rounded bg-[#00F0FF]/10">
            9:16 LIVE
          </span>
        </div>

        <div className="text-[11px] font-mono text-zinc-500 pl-1">
          <span>CAPCUT • VN EDITOR • RESOLVE • ALIGHT</span>
        </div>
      </div>

      {/* Interactive Model Toggle & Controls */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
        <div className="p-1 rounded-xl bg-black/70 border border-white/10 backdrop-blur-md flex items-center gap-1">
          <button
            onClick={() => toggleModel('phone')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
              modelMode === 'phone'
                ? 'bg-[#00F0FF] text-black font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>3D Phone</span>
          </button>

          <button
            onClick={() => toggleModel('playButton')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
              modelMode === 'playButton'
                ? 'bg-[#00F0FF] text-black font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>3D Play Button</span>
          </button>
        </div>

        <button
          onClick={handleResetTilt}
          title="Reset Tilt Angle"
          className="p-2.5 rounded-xl border border-white/10 bg-black/70 text-zinc-400 hover:text-white transition-all backdrop-blur-md"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Micro mouse hint */}
      <div className="absolute bottom-4 left-4 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 border border-white/10 text-[11px] text-zinc-400 backdrop-blur-sm z-10">
        <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
        <span>Move pointer to tilt 3D scene in real-time</span>
      </div>
    </div>
  );
};
