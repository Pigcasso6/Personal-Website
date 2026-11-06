import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const BackgroundDecor: React.FC = () => {
  const { isChristmas } = useTheme();
  const { scrollYProgress } = useScroll();

  // Scroll-linked fluid parallax movements across sections (0: top of page -> 1: bottom of page)
  const layer1Y = useTransform(scrollYProgress, [0, 1], ['0%', '-48%']);
  const layer1X = useTransform(scrollYProgress, [0, 0.5, 1], ['0%', '9%', '-7%']);
  const layer1Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.14, 0.9]);
  const layer1Opacity = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0.95, 0.75, 0.55, 0.4]);

  const layer2Y = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);
  const layer2X = useTransform(scrollYProgress, [0, 0.5, 1], ['0%', '-13%', '7%']);
  const layer2Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1.2, 1.02]);
  const layer2Opacity = useTransform(scrollYProgress, [0, 0.3, 0.65, 1], [0.65, 0.95, 0.75, 0.5]);

  const layer3Y = useTransform(scrollYProgress, [0, 1], ['0%', '-34%']);
  const layer3X = useTransform(scrollYProgress, [0, 0.5, 1], ['0%', '13%', '-5%']);
  const layer3Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.24, 1.06]);
  const layer3Opacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.55, 0.8, 0.95, 0.65]);

  const layer4Y = useTransform(scrollYProgress, [0, 1], ['0%', '-56%']);
  const layer4X = useTransform(scrollYProgress, [0, 0.5, 1], ['0%', '-12%', '8%']);
  const layer4Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.86, 1.12, 1.28]);
  const layer4Opacity = useTransform(scrollYProgress, [0, 0.45, 0.8, 1], [0.45, 0.65, 0.85, 0.95]);

  if (isChristmas) {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 select-none">
        <motion.div 
          style={{ y: layer1Y, x: layer1X }}
          className="absolute -top-[10%] left-1/2 w-[90vw] max-w-[1200px] h-[75vh] -translate-x-1/2 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(234,179,8,0.22)_0%,rgba(234,179,8,0.08)_45%,transparent_80%)]" 
        />
        <motion.div 
          style={{ y: layer2Y, x: layer2X }}
          className="absolute -bottom-[15%] right-0 w-[85vw] max-w-[1100px] h-[75vh] bg-[radial-gradient(ellipse_80%_60%_at_60%_50%,rgba(220,38,38,0.22)_0%,rgba(220,38,38,0.08)_45%,transparent_80%)]" 
        />
        <motion.div 
          style={{ y: layer3Y, x: layer3X }}
          className="absolute top-1/3 -left-[10%] w-[80vw] max-w-[1000px] h-[70vh] bg-[radial-gradient(ellipse_80%_60%_at_40%_50%,rgba(16,185,129,0.18)_0%,rgba(16,185,129,0.06)_45%,transparent_80%)]" 
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 select-none">
      {/* 
        Scroll-Linked Living Liquid Atmosphere 
        Luminous chromatic auras with smooth multi-stop Gaussian falloff.
        Provides distinct, rich, recognizable ambient glow across sections without circular ball contours.
      */}

      {/* Layer 1: Top / Hero Dominance (Periwinkle & Morning Sky Blue) */}
      <motion.div 
        style={{ 
          y: layer1Y, 
          x: layer1X, 
          scale: layer1Scale,
          opacity: layer1Opacity,
        }}
        className="absolute -top-[16%] left-[2%] w-[88vw] max-w-[1250px] h-[80vh] min-h-[620px] will-change-transform
          bg-[radial-gradient(ellipse_80%_60%_at_45%_35%,rgba(165,180,252,0.65)_0%,rgba(186,230,253,0.48)_35%,rgba(224,231,255,0.20)_65%,transparent_88%)] 
          dark:bg-[radial-gradient(ellipse_80%_60%_at_45%_35%,rgba(99,102,241,0.28)_0%,rgba(14,165,233,0.20)_35%,rgba(79,70,229,0.08)_65%,transparent_88%)]" 
      />

      {/* Layer 2: Upper-Right Flow (Rose Lavender & Blush Lilac) - Sweeps into view across About & Skills */}
      <motion.div 
        style={{ 
          y: layer2Y, 
          x: layer2X, 
          scale: layer2Scale,
          opacity: layer2Opacity,
        }}
        className="absolute top-[16%] -right-[12%] w-[82vw] max-w-[1150px] h-[82vh] min-h-[650px] will-change-transform
          bg-[radial-gradient(ellipse_75%_65%_at_60%_45%,rgba(244,114,182,0.56)_0%,rgba(216,180,254,0.44)_35%,rgba(253,242,248,0.18)_65%,transparent_88%)] 
          dark:bg-[radial-gradient(ellipse_75%_65%_at_60%_45%,rgba(219,39,119,0.24)_0%,rgba(147,51,234,0.20)_35%,rgba(126,34,206,0.08)_65%,transparent_88%)]" 
      />

      {/* Layer 3: Middle-Left Flow (Seafoam Mint & Cyan Dawn) - Blooms across Projects & Experience */}
      <motion.div 
        style={{ 
          y: layer3Y, 
          x: layer3X, 
          scale: layer3Scale,
          opacity: layer3Opacity,
        }}
        className="absolute top-[46%] -left-[14%] w-[85vw] max-w-[1180px] h-[82vh] min-h-[650px] will-change-transform
          bg-[radial-gradient(ellipse_75%_65%_at_40%_50%,rgba(94,234,212,0.58)_0%,rgba(125,211,252,0.44)_35%,rgba(204,251,241,0.18)_65%,transparent_88%)] 
          dark:bg-[radial-gradient(ellipse_75%_65%_at_40%_50%,rgba(13,148,136,0.25)_0%,rgba(2,132,199,0.20)_35%,rgba(15,118,110,0.08)_65%,transparent_88%)]" 
      />

      {/* Layer 4: Bottom Flow (Twilight Violet & Indigo Twilight) - Rises and warms Education & Contact */}
      <motion.div 
        style={{ 
          y: layer4Y, 
          x: layer4X, 
          scale: layer4Scale,
          opacity: layer4Opacity,
        }}
        className="absolute -bottom-[16%] right-[2%] w-[88vw] max-w-[1250px] h-[80vh] min-h-[620px] will-change-transform
          bg-[radial-gradient(ellipse_80%_60%_at_55%_60%,rgba(199,210,254,0.60)_0%,rgba(232,121,249,0.42)_35%,rgba(224,231,255,0.18)_65%,transparent_88%)] 
          dark:bg-[radial-gradient(ellipse_80%_60%_at_55%_60%,rgba(99,102,241,0.26)_0%,rgba(192,38,211,0.18)_35%,rgba(67,56,202,0.08)_65%,transparent_88%)]" 
      />
    </div>
  );
};

export default BackgroundDecor;