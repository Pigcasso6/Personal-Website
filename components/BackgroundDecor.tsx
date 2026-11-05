
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const BackgroundDecor: React.FC = () => {
  const { isChristmas } = useTheme();

  if (isChristmas) {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/2 w-[900px] h-[700px] -translate-x-1/2 bg-yellow-500/15 rounded-full mix-blend-screen filter blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-red-600/25 rounded-full mix-blend-screen filter blur-[140px] opacity-60"></div>
        <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-emerald-600/15 rounded-full mix-blend-screen filter blur-[100px]"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* High-Performance Liquid Chromatic Blooms (Radial gradients with zero GPU filter passes) */}
      <div 
        className="absolute -top-24 left-1/4 w-[560px] h-[560px] rounded-full bg-[radial-gradient(circle_at_center,rgba(165,180,252,0.5)_0%,rgba(186,230,253,0.35)_45%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.3)_0%,rgba(14,165,233,0.2)_45%,transparent_70%)]" 
      />
      <div 
        className="absolute top-1/4 -right-24 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(216,180,254,0.5)_0%,rgba(244,114,182,0.35)_45%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.3)_0%,rgba(219,39,119,0.2)_45%,transparent_70%)]" 
      />
      <div 
        className="absolute top-2/3 -left-24 w-[540px] h-[540px] rounded-full bg-[radial-gradient(circle_at_center,rgba(153,246,228,0.5)_0%,rgba(125,211,252,0.35)_45%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(13,148,136,0.25)_0%,rgba(2,132,199,0.2)_45%,transparent_70%)]" 
      />
      <div 
        className="absolute -bottom-36 right-1/4 w-[640px] h-[640px] rounded-full bg-[radial-gradient(circle_at_center,rgba(199,210,254,0.5)_0%,rgba(232,121,249,0.35)_45%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(67,56,202,0.25)_0%,rgba(192,38,211,0.2)_45%,transparent_70%)]" 
      />
      {/* Subtle liquid surface micro-shimmer highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.45)_0%,transparent_60%)] dark:bg-[radial-gradient(ellipse_at_50%_0%,rgba(99,102,241,0.1)_0%,transparent_60%)]"></div>
    </div>
  );
};

export default BackgroundDecor;