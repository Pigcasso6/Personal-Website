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
          <>
            你好，<br className="md:hidden" />我是梁著。
          </>
        );
      case 'ja':
        return (
          <>
            こんにちは、<br className="md:hidden" />梁著です。
          </>
        );
      case 'en':
      default:
        return (
          <>
            Hello,<br className="md:hidden" /> I'm Liang Zhu.
          </>
        );
    }
  };

  // Adjust max-width specifically for Japanese to fit the long sentence on one line
  const descriptionMaxWidth = language === 'ja' ? 'max-w-6xl' : 'max-w-4xl';

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className={`mx-auto px-6 text-center z-10 ${language === 'ja' ? 'max-w-7xl' : 'max-w-4xl'}`}>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 animate-slide-up">
          {renderGreeting()}
        </h1>
        <p 
          className={`text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 mx-auto leading-relaxed animate-slide-up whitespace-pre-wrap ${descriptionMaxWidth}`} 
          style={{ animationDelay: '0.1s' }}
        >
          {content.hero.description}
        </p>
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