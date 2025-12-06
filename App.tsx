import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BackgroundDecor from './components/BackgroundDecor';
import MessageModal from './components/MessageModal';
import { Mail, Stamp, ExternalLink, ArrowRight, Sparkles, MessageSquarePlus } from 'lucide-react';
import { Language } from './types';

// Component to handle global keyboard shortcuts
const GlobalShortcuts: React.FC = () => {
  const { toggleTheme } = useTheme();
  const { setLanguage } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore if user is typing in an input
      const target = event.target as HTMLElement;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable) {
        return;
      }

      if (event.shiftKey) {
        switch (event.code) {
          case 'KeyM':
            toggleTheme();
            break;
          case 'KeyS':
            setLanguage('zh-CN');
            break;
          case 'KeyT':
            setLanguage('zh-TW');
            break;
          case 'KeyE':
            setLanguage('en');
            break;
          case 'KeyJ':
            setLanguage('ja');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleTheme, setLanguage]);

  return null;
};

// Placeholder for the verb practice page
const VerbPractice: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      <h1 className="text-4xl font-bold">Verb Practice Tool</h1>
      <p className="mt-4">Under Construction</p>
    </div>
  );
};

const PortfolioHome: React.FC = () => {
  const { content, language } = useLanguage();
  const navigate = useNavigate();
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

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

        {/* Projects Section */}
        <section id="projects" className="py-24 bg-slate-50/60 dark:bg-slate-950/60 backdrop-blur-sm transition-colors">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-slate-900 dark:text-white flex items-center gap-4">
              <span className="w-12 h-1 bg-indigo-500 rounded-full"></span>
              {content.projects.title}
            </h2>
            <div className="grid grid-cols-1 gap-8">
              {content.projects.items.map((project, index) => (
                <div key={index} className="group relative bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                   {/* Decorative gradient blob */}
                   <div className="absolute -right-12 -top-12 w-40 h-40 bg-indigo-100 dark:bg-indigo-900/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-indigo-600 dark:text-indigo-400">
                        <Sparkles size={24} />
                      </div>
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex gap-2">
                          {project.tags.map(tag => (
                            <span key={tag} className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    <button 
                      className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold hover:gap-3 transition-all"
                      onClick={() => {
                        if (project.link?.startsWith('/')) {
                          navigate(project.link);
                        } else if (project.link) {
                          window.open(project.link, '_blank');
                        }
                      }}
                    >
                      {content.projects.viewProject}
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-24 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm transition-colors border-t border-white/20 dark:border-slate-800/20">
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
        <section id="contact" className="py-24 bg-slate-50/60 dark:bg-slate-950/60 backdrop-blur-sm transition-colors">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
              {content.contact.title}
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
              {content.contact.description}
            </p>
            
            <div className="flex flex-col items-center gap-12">
              <a 
                href="mailto:zliang723@connect.hkust-gz.edu.cn" 
                className="inline-flex items-center gap-3 text-lg md:text-3xl font-bold text-indigo-600 dark:text-indigo-400 hover:underline decoration-2 underline-offset-8 transition-all break-all"
              >
                <Mail className="w-6 h-6 md:w-8 md:h-8 shrink-0" />
                zliang723@connect.hkust-gz.edu.cn
              </a>

              <button
                onClick={() => setIsMessageModalOpen(true)}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-indigo-500/25 font-bold"
              >
                <MessageSquarePlus size={20} />
                {content.contact.leaveMessageBtn}
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-sm border-t border-slate-100 dark:border-slate-800 text-center text-slate-500 text-sm">
        <p>{content.contact.footerText}</p>
      </footer>

      {/* Message Modal */}
      <MessageModal isOpen={isMessageModalOpen} onClose={() => setIsMessageModalOpen(false)} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <HashRouter>
          <GlobalShortcuts />
          <Routes>
            <Route path="/" element={<PortfolioHome />} />
            <Route path="/verb-practice" element={<VerbPractice />} />
          </Routes>
        </HashRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;