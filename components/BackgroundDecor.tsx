import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const BackgroundDecor: React.FC = () => {
  const { isChristmas } = useTheme();

  if (isChristmas) {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 select-none">
        <div className="absolute -top-[10%] left-1/2 w-[90vw] max-w-[1200px] h-[75vh] -translate-x-1/2 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(234,179,8,0.12)_0%,rgba(234,179,8,0.04)_45%,transparent_80%)]" />
        <div className="absolute -bottom-[15%] right-0 w-[85vw] max-w-[1100px] h-[75vh] bg-[radial-gradient(ellipse_80%_60%_at_60%_50%,rgba(220,38,38,0.12)_0%,rgba(220,38,38,0.04)_45%,transparent_80%)]" />
        <div className="absolute top-1/3 -left-[10%] w-[80vw] max-w-[1000px] h-[70vh] bg-[radial-gradient(ellipse_80%_60%_at_40%_50%,rgba(16,185,129,0.1)_0%,rgba(16,185,129,0.03)_45%,transparent_80%)]" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 select-none">
      {/* 
        Ultra-Soft Atmospheric Liquid Aura 
        Expansive elliptical gradients with smooth multi-stop attenuation.
        Preserves the vibrant chromatic liquid-glass aesthetics without visible circular balls or hard borders.
      */}

      {/* Top / Hero Ambient Aura (Soft Periwinkle & Morning Sky) */}
      <div 
        className="absolute -top-[18%] left-[2%] w-[88vw] max-w-[1250px] h-[80vh] min-h-[620px] opacity-80
          bg-[radial-gradient(ellipse_80%_60%_at_45%_35%,rgba(199,210,254,0.36)_0%,rgba(186,230,253,0.22)_35%,rgba(224,231,255,0.08)_65%,transparent_85%)] 
          dark:bg-[radial-gradient(ellipse_80%_60%_at_45%_35%,rgba(99,102,241,0.16)_0%,rgba(14,165,233,0.1)_35%,rgba(79,70,229,0.04)_65%,transparent_85%)]" 
      />

      {/* Upper-Right Ambient Aura (Gentle Rose Lavender & Blush Mist) */}
      <div 
        className="absolute top-[16%] -right-[12%] w-[82vw] max-w-[1150px] h-[82vh] min-h-[650px] opacity-75
          bg-[radial-gradient(ellipse_75%_65%_at_60%_45%,rgba(233,213,255,0.34)_0%,rgba(244,114,182,0.16)_35%,rgba(253,242,248,0.06)_65%,transparent_85%)] 
          dark:bg-[radial-gradient(ellipse_75%_65%_at_60%_45%,rgba(147,51,234,0.14)_0%,rgba(219,39,119,0.09)_35%,rgba(126,34,206,0.03)_65%,transparent_85%)]" 
      />

      {/* Middle-Left Ambient Aura (Refreshing Seafoam & Aquamarine Dawn) */}
      <div 
        className="absolute top-[46%] -left-[14%] w-[85vw] max-w-[1180px] h-[82vh] min-h-[650px] opacity-75
          bg-[radial-gradient(ellipse_75%_65%_at_40%_50%,rgba(204,251,241,0.35)_0%,rgba(186,230,253,0.2)_35%,rgba(240,253,250,0.06)_65%,transparent_85%)] 
          dark:bg-[radial-gradient(ellipse_75%_65%_at_40%_50%,rgba(13,148,136,0.14)_0%,rgba(2,132,199,0.09)_35%,rgba(15,118,110,0.03)_65%,transparent_85%)]" 
      />

      {/* Bottom-Right Ambient Aura (Serene Violet & Indigo Twilight) */}
      <div 
        className="absolute -bottom-[18%] right-[2%] w-[88vw] max-w-[1250px] h-[80vh] min-h-[620px] opacity-75
          bg-[radial-gradient(ellipse_80%_60%_at_55%_60%,rgba(224,231,255,0.34)_0%,rgba(245,208,254,0.18)_35%,rgba(238,242,255,0.06)_65%,transparent_85%)] 
          dark:bg-[radial-gradient(ellipse_80%_60%_at_55%_60%,rgba(67,56,202,0.14)_0%,rgba(192,38,211,0.09)_35%,rgba(49,46,129,0.03)_65%,transparent_85%)]" 
      />

      {/* Unifying Smooth Diffusion Sheen (Blends all transitions seamlessly into the background) */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/40 dark:from-transparent dark:to-slate-950/25"></div>
    </div>
  );
};

export default BackgroundDecor;