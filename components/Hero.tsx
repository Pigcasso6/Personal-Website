import React from 'react';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { content, language } = useLanguage();

  const handleScrollDown = () => {
    const aboutSection = document.querySelector('#about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderGreeting = () => {
    switch (language) {
      case 'zh-CN':
      case 'zh-TW':
        return (
          <span className="flex flex-col lg:flex-row items-center justify-center gap-x-[1em] gap-y-2">
             <span className="relative inline-block whitespace-nowrap">
                你好
                <span className="absolute left-full">，</span>
             </span>
             <span className="relative inline-block whitespace-nowrap">
                我是梁著
                <span className="absolute left-full">。</span>
             </span>
          </span>
        );
      case 'ja':
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const currentMinutes = hour * 60 + minute;
        
        const startMorning = 5 * 60; // 05:00
        const startEvening = 17 * 60 + 30; // 17:30
        
        let greeting = "こんにちは、梁著です。";
        let part1 = "こんにちは";
        let part2 = "梁著です";

        // If it's evening (17:30 - 04:59 next day)
        if (currentMinutes >= startEvening || currentMinutes < startMorning) {
          greeting = "こんばんは、梁著です。";
          part1 = "こんばんは";
        }

        return (
          <>
            <span className="flex flex-col items-center gap-3 lg:hidden">
              <span className="relative inline-block">
                {part1}
                <span className="absolute left-full">、</span>
              </span>
              <span className="relative inline-block">
                {part2}
                <span className="absolute left-full">。</span>
              </span>
            </span>
            <span className="hidden lg:inline-block relative">
              {part1}、{part2}
              <span className="absolute left-full">。</span>
            </span>
          </>
        );
      case 'en':
      default:
        return (
          <>
            <span className="flex flex-col items-center gap-3 lg:hidden">
              <span>Hello,</span>
              <span>I'm Liang Zhu.</span>
            </span>
            <span className="hidden lg:inline">
              Hello, I'm Liang Zhu.
            </span>
          </>
        );
    }
  };

  const renderDescription = () => {
    // Structured layout for Chinese with hanging punctuation
    if (language === 'zh-CN' || language === 'zh-TW') {
      const isTw = language === 'zh-TW';
      return (
        <div className="flex flex-col items-center gap-2 leading-relaxed">
          {/* Mobile Layout: 3 Lines */}
          <div className="flex flex-col items-center md:hidden gap-1">
            <span className="relative">
              {isTw ? "我致力於打造優雅的數位體驗" : "我致力于打造优雅的数字体验"}
              <span className="absolute left-full">，</span>
            </span>
            <span className="relative">
              {isTw ? "將藝術與技術完美融合" : "将艺术与技术完美融合"}
              <span className="absolute left-full">。</span>
            </span>
            <span className="relative">
              {isTw ? "專注於極簡主義和無障礙設計" : "专注于极简主义和无障碍设计"}
              <span className="absolute left-full">。</span>
            </span>
          </div>

          {/* Desktop Layout: 2 Lines */}
          <div className="hidden md:flex flex-col items-center gap-2">
            <span className="relative">
              {isTw ? "我致力於打造優雅的數位體驗，將藝術與技術完美融合" : "我致力于打造优雅的数字体验，将艺术与技术完美融合"}
              <span className="absolute left-full">。</span>
            </span>
            <span className="relative">
              {isTw ? "專注於極簡主義和無障礙設計" : "专注于极简主义和无障碍设计"}
              <span className="absolute left-full">。</span>
            </span>
          </div>
        </div>
      );
    }

    if (language === 'en') {
      return (
        <div className="flex flex-col items-center gap-2 leading-relaxed">
          {/* Mobile Layout: Custom breaks */}
          <div className="flex flex-col items-center md:hidden gap-1">
            <span>I craft elegant digital experiences</span>
            <span>that merge art with technology.</span>
            <span>Dedicated to simplicity</span>
            <span>and accessible design.</span>
          </div>

          {/* Desktop Layout: Standard flow based on constant string */}
          <div className="hidden md:flex flex-col items-center gap-2">
            <span>I craft elegant digital experiences that merge art with technology.</span>
            <span>Dedicated to simplicity and accessible design.</span>
          </div>
        </div>
      );
    }

    if (language === 'ja') {
      return (
        <div className="flex flex-col items-center gap-2 leading-relaxed">
          {/* Mobile Layout: Specific breaks */}
          <div className="flex flex-col items-center md:hidden gap-1">
            <span>芸術と技術を融合し、洗練された</span>
            <span>デジタル体験づくりに</span>
            <span>取り組んでいます。</span>
            <span>ミニマリズムとアクセシビリティを</span>
            <span>大切にしています。</span>
          </div>

          {/* Desktop Layout: Standard flow */}
          <div className="hidden md:flex flex-col items-center gap-2">
            <span>芸術と技術を融合し、洗練されたデジタル体験づくりに取り組んでいます。</span>
            <span>ミニマリズムとアクセシビリティを大切にしています。</span>
          </div>
        </div>
      );
    }

    // Fallback for any other future languages
    const text = content.hero.description;
    const lines = text.split('\n');
    return (
      <div className="flex flex-col items-center gap-2 leading-relaxed">
        {lines.map((line, index) => (
          <span key={index}>{line}</span>
        ))}
      </div>
    );
  };

  // Adjust max-width specifically for Japanese to fit the long sentence on one line
  const descriptionMaxWidth = language === 'ja' ? 'max-w-6xl' : 'max-w-4xl';

  return (
    <section 
      id="home" 
      className="relative flex flex-col items-center justify-center pt-20 pb-20 overflow-hidden" 
      style={{ minHeight: '100svh' }}
    >
      <div className={`mx-auto px-6 text-center z-10 ${language === 'ja' ? 'max-w-7xl' : 'max-w-4xl'}`}>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 animate-slide-up">
          {renderGreeting()}
        </h1>
        <div 
          className={`text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 mx-auto leading-relaxed animate-slide-up whitespace-pre-wrap ${descriptionMaxWidth}`} 
          style={{ animationDelay: '0.1s' }}
        >
          {renderDescription()}
        </div>
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
           <button 
             onClick={handleScrollDown}
             className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-all hover:scale-105 active:scale-95 shadow-lg"
           >
             {content.hero.cta}
             <ArrowDown size={18} />
           </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;