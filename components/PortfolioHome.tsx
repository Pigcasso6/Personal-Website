import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Navbar from './Navbar';
import Hero from './Hero';
import BackgroundDecor from './BackgroundDecor';
import MessageModal from './MessageModal';
import { Mail, Stamp, ExternalLink, ArrowRight, Sparkles, MessageSquarePlus, Languages, CalendarDays, CircleDashed } from 'lucide-react';
import { Language } from '../types';

const PortfolioHome: React.FC<{ onNavigateToVerbPractice: () => void }> = ({ onNavigateToVerbPractice }) => {
  const { content, language } = useLanguage();
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

  const getProjectIcon = (key?: string) => {
    switch (key) {
      case 'verb':
        return <Languages size={24} />;
      case 'timetable':
        return <CalendarDays size={24} />;
      case 'circle':
        return <CircleDashed size={24} />;
      default:
        return <Sparkles size={24} />;
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {content.projects.items.map((project, index) => (
                <div key={index} className="group relative bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col h-full">
                   <div className="absolute -right-12 -top-12 w-40 h-40 bg-indigo-100 dark:bg-indigo-900/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                  <div className="relative z-10 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-3">
                      <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-indigo-600 dark:text-indigo-400">
                        {getProjectIcon(project.iconKey)}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h3>
                    
                    {project.description && (
                      <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-grow">
                        {project.description}
                      </p>
                    )}

                    <div className={project.description ? "" : "mt-auto"}>
                      <button 
                        className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold hover:gap-3 transition-all pt-2"
                        onClick={() => {
                          if (project.link === '/verb-practice') {
                            onNavigateToVerbPractice();
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
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {item.school}
                      </h3>
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
              {/* Top Group: Icon + Emails */}
              <div className="flex flex-col items-center gap-6">
                <Mail className="w-10 h-10 md:w-12 md:h-12 text-indigo-600 dark:text-indigo-400" strokeWidth={1.5} />
                <div className="flex flex-col items-center gap-3">
                  <a href="mailto:zliang723@connect.hkust-gz.edu.cn" className="text-lg md:text-2xl font-bold text-indigo-600 dark:text-indigo-400 hover:underline decoration-2 underline-offset-8 transition-all break-all text-center">
                    zliang723@connect.hkust-gz.edu.cn
                  </a>
                  <a href="mailto:liangzhu@pigcasso6.top" className="text-lg md:text-2xl font-bold text-indigo-600 dark:text-indigo-400 hover:underline decoration-2 underline-offset-8 transition-all break-all text-center">
                    liangzhu@pigcasso6.top
                  </a>
                </div>
              </div>

              {/* Leave Message Button - direct child of parent flex to ensure gap consistency */}
              <button
                onClick={() => setIsMessageModalOpen(true)}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-indigo-500/25 font-bold"
              >
                <MessageSquarePlus size={20} />
                {content.contact.leaveMessageBtn}
              </button>

              {/* X Social Link - direct child of parent flex to ensure gap consistency */}
              <a 
                href="https://x.com/Pigcasso66"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all hover:scale-110 active:scale-95 border border-slate-200 dark:border-slate-700 shadow-sm group"
                aria-label="Visit my X profile"
              >
                <img 
                  src="https://lwwfxjiixaltbedvassi.supabase.co/storage/v1/object/public/portfolio/x_icon.png" 
                  alt="X" 
                  className="w-5 h-5 object-contain dark:invert opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </a>
            </div>
          </div>
        </section>

        {/* Footer Bar */}
        <footer className="py-8 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors">
          <div className="max-w-6xl mx-auto px-6 text-center space-y-2">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {content.contact.footerText}
            </p>
            <a 
              href="https://beian.miit.gov.cn/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-slate-500 dark:text-slate-400 font-sans-sc hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {content.contact.icpText}
            </a>
          </div>
        </footer>
      </main>

      <MessageModal 
        isOpen={isMessageModalOpen} 
        onClose={() => setIsMessageModalOpen(false)} 
      />
    </div>
  );
};

export default PortfolioHome;
