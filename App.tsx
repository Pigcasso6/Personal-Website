import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BackgroundDecor from './components/BackgroundDecor';
import { Mail, Stamp, ExternalLink } from 'lucide-react';
import { Language } from './types';

const TestPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center text-4xl">
      ✅ 这是 /test 页面
    </div>
  );
};

const MainContent: React.FC = () => {
  const { content, language } = useLanguage();

  // Update HTML lang attribute and apply specific font families
  useEffect(() => {
    const root = document.documentElement;
    root.lang = language;
  }, [language]);

  const getFontClass = (lang: Language) => {
    switch (lang) {
      case 'zh-CN':
        return 'font-sans-sc';
      case 'zh-TW':
        return 'font-sans-tc';
      case 'ja':
        return 'font-sans-jp';
      case 'en':
      default:
        return 'font-sans';
    }
  };

  return (
    <div className={`min-h-screen flex flex-col selection:bg-indigo-100 dark:selection:bg-indigo-900/50 ${getFontClass(language)}`}>
      <BackgroundDecor />
      <Navbar />
      
      <main className="flex-grow">
        <Hero />

        {/* About Section */}
        <section id="about" className="py-24 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm transition-colors border-y border-white/20 dark:border-slate-800/20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-slate-900 dark:text-white flex items-center gap-4">
              <span className="w-12 h-1 bg-indigo-500 rounded-full"></span>
              {content.about.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-6 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  {content.about.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
                
                {/* Postcrossing Button */}
                <div className="pt-4">
                  <a 
                    href="https://www.postcrossing.com/user/Pigcasso6" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-50/80 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors font-medium border border-indigo-100 dark:border-indigo-800"
                  >
                    <Stamp size={20} />
                    {content.about.postcrossingLabel}
                  </a>
                </div>
              </div>
              
              <div className="relative group">
                <div className="absolute inset-0 bg-indigo-500 rounded-2xl rotate-3 opacity-20 group-hover:rotate-6 transition-transform duration-300"></div>
                <img 
                  src="https://picsum.photos/600/800?grayscale" 
                  alt="Liang Zhu" 
                  className="relative rounded-2xl shadow-xl w-full h-[500px] object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-24 bg-slate-50/60 dark:bg-slate-950/60 backdrop-blur-sm transition-colors">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-slate-900 dark:text-white flex items-center gap-4">
              <span className="w-12 h-1 bg-indigo-500 rounded-full"></span>
              {content.education.title}
            </h2>
            <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 md:ml-6 space-y-12 pb-2">
              {content.education.items.map((item, index) => (
                <div key={index} className="relative pl-8 md:pl-12">
                  {/* Timeline Dot */}
                  <div className="absolute left-[-9px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-slate-950 border-4 border-indigo-500 shadow-sm z-10"></div>
                  
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 md:gap-8 group">
                    {item.url ? (
                      <a 
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2 w-fit"
                      >
                        {item.school}
                        <ExternalLink size={16} className="opacity-50" />
                      </a>
                    ) : (
                      <div className="relative group/tooltip w-fit cursor-help">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b border-dotted border-slate-400 dark:border-slate-600">
                          {item.school}
                        </h3>
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-0 mb-2 w-max max-w-[280px] px-3 py-2 bg-slate-800 text-white text-xs rounded shadow-lg opacity-0 group-hover/tooltip:opacity-100 group-active/tooltip:opacity-100 transition-opacity pointer-events-none z-20 whitespace-normal">
                          {item.noUrlTooltip}
                          <div className="absolute top-full left-4 border-4 border-transparent border-t-slate-800"></div>
                        </div>
                      </div>
                    )}
                    <span className="shrink-0 font-mono text-sm font-semibold text-slate-500 dark:text-slate-400 bg-slate-100/80 dark:bg-slate-900/80 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800">
                      {item.period}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm transition-colors border-t border-white/20 dark:border-slate-800/20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
              {content.contact.title}
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
              {content.contact.description}
            </p>
            
            <a 
              href="mailto:zliang723@connect.hkust-gz.edu.cn" 
              className="inline-flex items-center gap-3 text-lg md:text-3xl font-bold text-indigo-600 dark:text-indigo-400 hover:underline decoration-2 underline-offset-8 transition-all break-all"
            >
              <Mail className="w-6 h-6 md:w-8 md:h-8 shrink-0" />
              zliang723@connect.hkust-gz.edu.cn
            </a>
          </div>
        </section>
      </main>

      <footer className="py-8 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-sm border-t border-slate-100 dark:border-slate-800 text-center text-slate-500 text-sm">
        <p>{content.contact.footerText}</p>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
