import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const BackgroundDecor: React.FC = () => {
  const { isChristmas } = useTheme();
  const { scrollYProgress } = useScroll();

  // Scroll-linked fluid parallax movements across sections (0: top of page -> 1: bottom of page)
  const layer1Y = useTransform(scrollYProgress, [0, 1], ['0%', '-48%']);
  const layer1X = useTransform(scrollYProgress, [0, 0.5, 1], ['0%', '8%', '-6%']);
  const layer1Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.12, 0.92]);
  const layer1Opacity = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0.95, 0.75, 0.55, 0.38]);

  const layer2Y = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);
  const layer2X = useTransform(scrollYProgress, [0, 0.5, 1], ['0%', '-12%', '6%']);
  const layer2Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1.18, 1.02]);
  const layer2Opacity = useTransform(scrollYProgress, [0, 0.3, 0.65, 1], [0.6, 0.95, 0.75, 0.45]);

  const layer3Y = useTransform(scrollYProgress, [0, 1], ['0%', '-34%']);
  const layer3X = useTransform(scrollYProgress, [0, 0.5, 1], ['0%', '12%', '-5%']);
  const layer3Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.22, 1.05]);
  const layer3Opacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.5, 0.8, 0.95, 0.6]);

  const layer4Y = useTransform(scrollYProgress, [0, 1], ['0%', '-56%']);
  const layer4X = useTransform(scrollYProgress, [0, 0.5, 1], ['0%', '-10%', '7%']);
  const layer4Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1.12, 1.25]);
  const layer4Opacity = useTransform(scrollYProgress, [0, 0.45, 0.8, 1], [0.4, 0.65, 0.85, 0.95]);

  if (isChristmas) {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 select-none">
        <motion.div 
          style={{ y: layer1Y, x: layer1X }}
          className="absolute -top-[10%] left-1/2 w-[90vw] max-w-[1200px] h-[75vh] -translate-x-1/2 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(245,158,11,0.18)_0%,rgba(251,191,36,0.06)_45%,transparent_80%)]" 
        />
        <motion.div 
          style={{ y: layer2Y, x: layer2X }}
          className="absolute -bottom-[15%] right-0 w-[85vw] max-w-[1100px] h-[75vh] bg-[radial-gradient(ellipse_80%_60%_at_60%_50%,rgba(239,68,68,0.18)_0%,rgba(248,113,113,0.06)_45%,transparent_80%)]" 
        />
        <motion.div 
          style={{ y: layer3Y, x: layer3X }}
          className="absolute top-1/3 -left-[10%] w-[80vw] max-w-[1000px] h-[70vh] bg-[radial-gradient(ellipse_80%_60%_at_40%_50%,rgba(16,185,129,0.16)_0%,rgba(52,211,153,0.05)_45%,transparent_80%)]" 
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 select-none">
      {/* 
        Pure Crystal Harmonic Liquid Atmosphere
        Uses an analogous color spectrum (Electric Cyan -> Royal Azure -> Pure Indigo -> Radiant Orchid)
        Completely eliminates gray/brown complementary overlap zones, keeping the background clean, 
        luminous, crystal-clear, and vibrant.
      */}

      {/* Layer 1: Top / Hero (Pure Electric Sky & Luminous Indigo) */}
      <motion.div 
        style={{ 
          y: layer1Y, 
          x: layer1X, 
          scale: layer1Scale,
          opacity: layer1Opacity,
        }}
        className="absolute -top-[16%] left-[2%] w-[88vw] max-w-[1250px] h-[80vh] min-h-[620px] will-change-transform
          bg-[radial-gradient(ellipse_80%_60%_at_45%_35%,rgba(99,102,241,0.40)_0%,rgba(56,189,248,0.32)_38%,rgba(186,230,253,0.12)_68%,transparent_88%)] 
          dark:bg-[radial-gradient(ellipse_80%_60%_at_45%_35%,rgba(99,102,241,0.28)_0%,rgba(14,165,233,0.20)_38%,rgba(79,70,229,0.06)_68%,transparent_88%)]" 
      />

      {/* Layer 2: Upper-Right (Clean Luminous Orchid & Rose Petal) - Blends harmoniously with Indigo */}
      <motion.div 
        style={{ 
          y: layer2Y, 
          x: layer2X, 
          scale: layer2Scale,
          opacity: layer2Opacity,
        }}
        className="absolute top-[16%] -right-[12%] w-[82vw] max-w-[1150px] h-[82vh] min-h-[650px] will-change-transform
          bg-[radial-gradient(ellipse_75%_65%_at_60%_45%,rgba(236,72,153,0.36)_0%,rgba(168,85,247,0.28)_38%,rgba(243,232,255,0.10)_68%,transparent_88%)] 
          dark:bg-[radial-gradient(ellipse_75%_65%_at_60%_45%,rgba(219,39,119,0.24)_0%,rgba(147,51,234,0.18)_38%,rgba(126,34,206,0.06)_68%,transparent_88%)]" 
      />

      {/* Layer 3: Middle-Left (Crystal Azure & Vivid Cyan) - Blends seamlessly into Sky & Indigo */}
      <motion.div 
        style={{ 
          y: layer3Y, 
          x: layer3X, 
          scale: layer3Scale,
          opacity: layer3Opacity,
        }}
        className="absolute top-[46%] -left-[14%] w-[85vw] max-w-[1180px] h-[82vh] min-h-[650px] will-change-transform
          bg-[radial-gradient(ellipse_75%_65%_at_40%_50%,rgba(6,182,212,0.38)_0%,rgba(59,130,246,0.28)_38%,rgba(224,231,255,0.10)_68%,transparent_88%)] 
          dark:bg-[radial-gradient(ellipse_75%_65%_at_40%_50%,rgba(6,182,212,0.24)_0%,rgba(37,99,235,0.18)_38%,rgba(15,118,110,0.06)_68%,transparent_88%)]" 
      />

      {/* Layer 4: Bottom (Deep Pure Violet & Royal Wisteria) - Rich, luminous, crystal-clear finale */}
      <motion.div 
        style={{ 
          y: layer4Y, 
          x: layer4X, 
          scale: layer4Scale,
          opacity: layer4Opacity,
        }}
        className="absolute -bottom-[16%] right-[2%] w-[88vw] max-w-[1250px] h-[80vh] min-h-[620px] will-change-transform
          bg-[radial-gradient(ellipse_80%_60%_at_55%_60%,rgba(139,92,246,0.40)_0%,rgba(99,102,241,0.30)_38%,rgba(238,242,255,0.10)_68%,transparent_88%)] 
          dark:bg-[radial-gradient(ellipse_80%_60%_at_55%_60%,rgba(124,58,237,0.26)_0%,rgba(67,56,202,0.20)_38%,rgba(49,46,129,0.06)_68%,transparent_88%)]" 
      />
    </div>
  );
};

export default BackgroundDecor;