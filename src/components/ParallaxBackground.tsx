import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export const ParallaxBackground: React.FC = () => {
  const { scrollY } = useScroll();

  // Multi-layered parallax speeds - all moving substantially slower than foreground scroll
  const yOrb1 = useTransform(scrollY, [0, 4500], [0, 750]);    // ~0.16x scroll rate
  const yOrb2 = useTransform(scrollY, [0, 4500], [120, 1100]);  // ~0.22x scroll rate
  const yOrb3 = useTransform(scrollY, [0, 4500], [450, 1550]);  // ~0.24x scroll rate
  const yOrb4 = useTransform(scrollY, [0, 4500], [900, 2200]);  // ~0.28x scroll rate

  // Subtle breathing scale pulse synchronized with scroll
  const scaleOrb1 = useTransform(scrollY, [0, 2000, 4000], [1, 1.25, 0.95]);
  const scaleOrb2 = useTransform(scrollY, [0, 2000, 4000], [1.1, 0.9, 1.2]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Layer 1: Electric Cyan Glow - Top Left */}
      <motion.div
        style={{ y: yOrb1, scale: scaleOrb1 }}
        className="absolute -top-36 -left-36 w-[620px] h-[620px] rounded-full bg-[#00F0FF]/[0.07] blur-[150px] transform-gpu will-change-transform"
      />

      {/* Layer 2: Deep Cybernetic Purple Glow - Mid Right */}
      <motion.div
        style={{ y: yOrb2, scale: scaleOrb2 }}
        className="absolute top-[25vh] -right-44 w-[700px] h-[700px] rounded-full bg-purple-600/[0.08] blur-[170px] transform-gpu will-change-transform"
      />

      {/* Layer 3: Vibrant Teal / Emerald Glow - Lower Left */}
      <motion.div
        style={{ y: yOrb3 }}
        className="absolute top-[65vh] -left-28 w-[580px] h-[580px] rounded-full bg-[#00F0FF]/[0.05] blur-[150px] transform-gpu will-change-transform"
      />

      {/* Layer 4: Deep Violet / Indigo Glow - Bottom Right */}
      <motion.div
        style={{ y: yOrb4 }}
        className="absolute top-[110vh] right-[5%] w-[640px] h-[640px] rounded-full bg-violet-700/[0.06] blur-[180px] transform-gpu will-change-transform"
      />
    </div>
  );
};
