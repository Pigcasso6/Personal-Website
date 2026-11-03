
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
      {/* Dynamic Liquid Chromatic Blobs that refract through Liquid Glass */}
      <div 
        className="absolute -top-20 left-1/4 w-[520px] h-[520px] bg-gradient-to-tr from-indigo-300/40 via-sky-300/40 to-blue-200/30 dark:from-indigo-600/25 dark:via-sky-500/20 dark:to-blue-900/15 rounded-full filter blur-[90px] animate-float-slow" 
      />
      <div 
        className="absolute top-1/4 -right-20 w-[560px] h-[560px] bg-gradient-to-br from-purple-300/40 via-pink-300/35 to-rose-200/30 dark:from-purple-600/25 dark:via-pink-600/20 dark:to-indigo-900/15 rounded-full filter blur-[100px] animate-float-slow-reverse" 
        style={{ animationDelay: '-4s' }}
      />
      <div 
        className="absolute top-2/3 -left-20 w-[500px] h-[500px] bg-gradient-to-tr from-teal-200/40 via-cyan-300/35 to-sky-200/30 dark:from-teal-600/20 dark:via-cyan-600/20 dark:to-blue-900/15 rounded-full filter blur-[95px] animate-float-slow" 
        style={{ animationDelay: '-8s' }}
      />
      <div 
        className="absolute -bottom-32 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-indigo-200/40 via-violet-300/35 to-fuchsia-200/30 dark:from-indigo-700/20 dark:via-violet-600/20 dark:to-purple-950/20 rounded-full filter blur-[110px] animate-float-slow-reverse" 
        style={{ animationDelay: '-11s' }}
      />
      {/* Subtle liquid surface micro-shimmer highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.4)_0%,transparent_60%)] dark:bg-[radial-gradient(ellipse_at_50%_0%,rgba(99,102,241,0.08)_0%,transparent_60%)]"></div>
    </div>
  );
};

export default BackgroundDecor;