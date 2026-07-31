import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Navbar from './Navbar';
import MessageModal from './MessageModal';
import CertificateModal from './CertificateModal';
import { Mail, Stamp, ExternalLink, ArrowRight, Sparkles, MessageSquarePlus, Languages, CalendarDays, Terminal, Code2, Cpu, CircleDashed, Dices, TrendingUp, Award, FileText } from 'lucide-react';
import { Language } from '../types';

const Typewriter: React.FC<{ strings: string[], language: Language }> = ({ strings, language }) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [delta, setDelta] = useState(100); // Faster base speed

  useEffect(() => {
    let ticker = setTimeout(() => {
      tick();
    }, delta);

    return () => clearTimeout(ticker);
  }, [text, delta]);

  const tick = () => {
    const i = loopNum % strings.length;
    const fullText = strings[i]; // Removed space
    const updatedText = isDeleting 
      ? fullText.substring(0, text.length - 1) 
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(30); // Faster deleting
    } else {
      // Faster typing for EN only
      const typingSpeed = (language === 'en') ? 50 : 100;
      setDelta(typingSpeed);
    }

    if (!isDeleting && updatedText === fullText) {
      setDelta(1000); // Wait 1 second before deleting
      setIsDeleting(true);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(100);
    }
  };

  return (
    <span className="border-r-2 border-cyan-500 animate-pulse pr-1">
      {text}
    </span>
  );
};

const FadingTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <h2 className={`absolute -top-16 left-0 text-7xl md:text-9xl font-bold bg-gradient-to-b from-slate-400/90 to-transparent dark:from-slate-500/80 dark:to-transparent bg-clip-text text-transparent select-none -z-0 pointer-events-none ${className}`}>
    {children}
  </h2>
);

const PortfolioHomeV2: React.FC<{ onNavigateToVerbPractice: () => void }> = ({ onNavigateToVerbPractice }) => {
  const { content, language } = useLanguage();
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [certModal, setCertModal] = useState<{
    isOpen: boolean;
    title: string;
    frontImg: string;
    backImg: string;
  }>({
    isOpen: false,
    title: '',
    frontImg: '',
    backImg: '',
  });

  const openCertModal = (data: { title: string; frontImg: string; backImg: string }) => {
    setCertModal({
      isOpen: true,
      ...data,
    });
  };

  // Update HTML lang attribute
  useEffect(() => {
    const root = document.documentElement;
    root.lang = language;
  }, [language]);

  const getFontClass = (lang: Language) => {
    switch (lang) {
      case 'zh-CN': return 'font-sans-sc';
      case 'zh-TW': return 'font-sans-tc';
      case 'ja': return 'font-sans-jp';
      case 'en': default: return 'font-sans';
    }
  };

  const getProjectIcon = (key?: string) => {
    switch (key) {
      case 'verb': return <Languages size={24} />;
      case 'timetable': return <CalendarDays size={24} />;
      case 'circle': return <CircleDashed size={24} />;
      case 'gamble': return <Dices size={24} />;
      case 'futures': return <TrendingUp size={24} />;
      default: return <Sparkles size={24} />;
    }
  };

  const renderGreeting = () => {
    let greeting = content.hero.greeting;

    // Japanese time-based greeting
    if (language === 'ja') {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const currentMinutes = hour * 60 + minute;
      
      const startMorning = 5 * 60; // 05:00
      const startEvening = 17 * 60 + 30; // 17:30
      
      // If it's evening (17:30 - 04:59 next day)
      if (currentMinutes >= startEvening || currentMinutes < startMorning) {
        greeting = "こんばんは、梁著です。";
      } else {
        greeting = "こんにちは、梁著です。";
      }
    }
    
    if (language === 'en') {
      // "Hello, I'm Liang Zhu."
      const parts = greeting.split(', ');
      if (parts.length === 2) {
        return (
          <>
            <span className="block lg:inline-block">{parts[0]}, </span>
            <span className="block lg:inline-block">{parts[1]}</span>
          </>
        );
      }
    } else if (language === 'ja') {
        // "こんにちは、梁著です。" or "こんばんは、梁著です。"
        const parts = greeting.split('、');
        if (parts.length === 2) {
            return (
                <>
                    <span className="block lg:inline-block">{parts[0]}、</span>
                    <span className="block lg:inline-block">{parts[1]}</span>
                </>
            );
        }
    } else if (language === 'zh-CN' || language === 'zh-TW') {
        // "你好，我是梁著。"
        const parts = greeting.split('，');
        if (parts.length === 2) {
            return (
                <>
                    <span className="block lg:inline-block whitespace-nowrap">{parts[0]}，</span>
                    <span className="block lg:inline-block whitespace-nowrap">{parts[1]}</span>
                </>
            );
        }
    }

    return greeting;
  };

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white selection:bg-cyan-200 dark:selection:bg-cyan-500/30 ${getFontClass(language)} transition-colors duration-300`}>
      {/* Tech Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-slate-200 to-slate-300 dark:from-slate-900 dark:via-slate-950 dark:to-black transition-colors duration-300"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-400/20 dark:bg-cyan-600/20 rounded-full blur-[120px] transition-colors duration-300"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-400/20 dark:bg-cyan-600/20 rounded-full blur-[120px] transition-colors duration-300"></div>
      </div>

      <div className="relative z-10 flex flex-col flex-grow">
        <Navbar />
        
        <main className="flex-grow">
          {/* Hero Section V2 */}
          <section className="min-h-screen flex items-center pt-20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 w-full">
              <div className="max-w-full space-y-8">
                <h1 className="text-6xl md:text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-700 via-slate-900 to-black dark:from-white dark:via-slate-200 dark:to-slate-400 pb-2 leading-tight">
                  {renderGreeting()}
                </h1>
                
                <div className="text-xl md:text-3xl text-slate-600 dark:text-slate-400 h-24 font-mono">
                  <span className="text-cyan-600 dark:text-cyan-400 mr-2">{'>'}</span>
                  {content.hero.typewriterStrings ? (
                    <Typewriter strings={content.hero.typewriterStrings} language={language} />
                  ) : (
                    content.hero.description
                  )}
                </div>

                <div className="flex gap-4 pt-8">
                  <a href="#projects" className="px-8 py-4 bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold rounded-lg hover:bg-slate-800 dark:hover:bg-cyan-50 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg shadow-cyan-500/20">
                    {content.hero.cta} <ArrowRight size={20} />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Main Content Grid */}
          <div className="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-64">
            
            {/* About Section */}
            <div id="about" className="relative order-1 md:order-1 md:col-span-1 scroll-mt-48">
              <FadingTitle className="text-7xl md:text-6xl">{content.about.title}</FadingTitle>
              
              <div className="pt-12 md:pt-20 relative z-10">
                <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  {content.about.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
                <div className="mt-8">
                  <a 
                    href="https://www.postcrossing.com/user/Pigcasso6" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/30 transition-colors border border-slate-200 dark:border-cyan-500/20 shadow-sm"
                  >
                    <Stamp size={20} />
                    {content.about.postcrossingLabel}
                  </a>
                </div>
              </div>
            </div>

            {/* Education Section */}
            <div id="education" className="relative order-2 md:order-2 md:col-span-1 pt-12 md:pt-0 scroll-mt-48">
              <FadingTitle className="text-7xl md:text-6xl">{content.education.title}</FadingTitle>
              
              <div className="pt-12 md:pt-20 relative z-10">
                <div className="space-y-12 border-l-2 border-slate-200 dark:border-slate-800 ml-3 pl-8">
                  {content.education.items.map((item, index) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full bg-slate-50 dark:bg-slate-950 border-4 border-cyan-500"></div>
                      <div className="flex flex-col gap-2">
                        <span className="text-sm font-mono text-cyan-600 dark:text-cyan-400 font-bold bg-cyan-50 dark:bg-cyan-900/20 px-3 py-1 rounded-full w-fit">
                          {item.period}
                        </span>
                        {item.url ? (
                          <a 
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xl font-bold text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors inline-flex items-center gap-2"
                          >
                            {item.school}
                            <ExternalLink size={16} className="opacity-50" />
                          </a>
                        ) : (
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                            {item.school}
                          </h3>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills & Achievements Section V2 */}
            <div id="skills" className="relative order-3 md:col-span-2 pt-12 md:pt-0 scroll-mt-48">
              <FadingTitle>{content.skills.title}</FadingTitle>

              <div className="pt-12 md:pt-20 relative z-10">
                <div className="bg-white/60 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-200 dark:border-white/5 backdrop-blur-sm shadow-sm space-y-8">
                  <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-cyan-600 dark:text-cyan-400">
                      <Languages size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {content.skills.japaneseCategoryTitle}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* N1 Card */}
                    <div className="p-6 rounded-2xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between gap-5 hover:border-cyan-500/40 transition-all">
                      <div>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white whitespace-nowrap overflow-hidden text-ellipsis">
                          {content.skills.n1Title}
                        </h4>

                        {/* Score Progress Bar */}
                        <div className="flex items-center gap-3 my-3">
                          <div className="flex-1 bg-slate-200 dark:bg-slate-700/80 h-2.5 rounded-full overflow-hidden">
                            <div 
                              className="bg-cyan-500 dark:bg-cyan-400 h-full rounded-full transition-all duration-1000"
                              style={{ width: '80%' }}
                            />
                          </div>
                          <span className="text-sm font-mono font-bold text-slate-700 dark:text-slate-300 shrink-0">
                            {content.skills.n1Score}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 w-full pt-1">
                        <button
                          onClick={() => openCertModal({
                            title: `${content.skills.n1Title} - ${content.skills.viewCertificateBtn}`,
                            frontImg: '/images/N1_C_F.jpg',
                            backImg: '/images/N1_C_B.jpg',
                          })}
                          className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-bold rounded-lg bg-slate-900 text-white dark:bg-cyan-600 dark:hover:bg-cyan-500 hover:bg-slate-800 transition-all shadow-md active:scale-95 text-center whitespace-nowrap"
                        >
                          <Award size={16} className="shrink-0" />
                          <span>{content.skills.viewCertificateBtn}</span>
                        </button>

                        <button
                          onClick={() => openCertModal({
                            title: `${content.skills.n1Title} - ${content.skills.viewReportBtn}`,
                            frontImg: '/images/N1_S_F.jpg',
                            backImg: '/images/N1_S_B.jpg',
                          })}
                          className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-bold rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors active:scale-95 text-center whitespace-nowrap"
                        >
                          <FileText size={16} className="shrink-0" />
                          <span>{content.skills.viewReportBtn}</span>
                        </button>
                      </div>
                    </div>

                    {/* N2 Card */}
                    <div className="p-6 rounded-2xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between gap-5 hover:border-cyan-500/40 transition-all">
                      <div>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white whitespace-nowrap overflow-hidden text-ellipsis">
                          {content.skills.n2Title}
                        </h4>

                        {/* Score Progress Bar */}
                        <div className="flex items-center gap-3 my-3">
                          <div className="flex-1 bg-slate-200 dark:bg-slate-700/80 h-2.5 rounded-full overflow-hidden">
                            <div 
                              className="bg-cyan-500 dark:bg-cyan-400 h-full rounded-full transition-all duration-1000"
                              style={{ width: '98.33%' }}
                            />
                          </div>
                          <span className="text-sm font-mono font-bold text-slate-700 dark:text-slate-300 shrink-0">
                            {content.skills.n2Score}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 w-full pt-1">
                        <button
                          onClick={() => openCertModal({
                            title: `${content.skills.n2Title} - ${content.skills.viewCertificateBtn}`,
                            frontImg: '/images/N2_C_F.jpg',
                            backImg: '/images/N2_C_B.jpg',
                          })}
                          className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-bold rounded-lg bg-slate-900 text-white dark:bg-cyan-600 dark:hover:bg-cyan-500 hover:bg-slate-800 transition-all shadow-md active:scale-95 text-center whitespace-nowrap"
                        >
                          <Award size={16} className="shrink-0" />
                          <span>{content.skills.viewCertificateBtn}</span>
                        </button>

                        <button
                          onClick={() => openCertModal({
                            title: `${content.skills.n2Title} - ${content.skills.viewReportBtn}`,
                            frontImg: '/images/N2_S_F.jpg',
                            backImg: '/images/N2_S_B.jpg',
                          })}
                          className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-bold rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors active:scale-95 text-center whitespace-nowrap"
                        >
                          <FileText size={16} className="shrink-0" />
                          <span>{content.skills.viewReportBtn}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Projects Section */}
            <div id="projects" className="relative order-4 md:col-span-2 pt-12 md:pt-0 scroll-mt-48">
              <FadingTitle>{content.projects.title}</FadingTitle>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 md:pt-20 relative z-10">
                {content.projects.items.map((project, index) => (
                  <div key={index} className="group relative bg-white/60 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-200 dark:border-white/5 hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-2 overflow-hidden backdrop-blur-sm shadow-sm hover:shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-6">
                        <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl text-cyan-600 dark:text-cyan-400 group-hover:text-white group-hover:bg-cyan-600 transition-all duration-300">
                          {getProjectIcon(project.iconKey)}
                        </div>
                        <ArrowRight className="text-slate-400 dark:text-slate-600 group-hover:text-cyan-600 dark:group-hover:text-white -rotate-45 group-hover:rotate-0 transition-all duration-300" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                        {project.title}
                      </h3>
                      
                      {project.description && (
                        <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                          {project.description}
                        </p>
                      )}

                      <button 
                        className="text-sm font-mono text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 flex items-center gap-2 font-bold"
                        onClick={() => {
                          if (project.link === '/verb-practice') {
                            onNavigateToVerbPractice();
                          } else if (project.link) {
                            window.open(project.link, '_blank');
                          }
                        }}
                      >
                        [{content.projects.viewProject}]
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Contact V2 */}
          <section id="contact" className="py-32 relative border-t border-slate-200 dark:border-white/5 scroll-mt-48">
            <div className="max-w-4xl mx-auto px-6 text-center relative">
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none">
                 <FadingTitle className="!static !text-center">{content.contact.title}</FadingTitle>
              </div>

              <div className="relative z-10 pt-12 md:pt-20">
                <p className="text-xl text-slate-600 dark:text-slate-400 mb-12">
                  {content.contact.description}
                </p>
                
                <div className="flex flex-col items-center gap-8">
                  <div className="flex flex-col gap-4">
                    <a href="mailto:zliang723@connect.hkust-gz.edu.cn" className="text-xl md:text-2xl font-mono text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                      zliang723@connect.hkust-gz.edu.cn
                    </a>
                    <a href="mailto:liangzhu@pigcasso6.top" className="text-xl md:text-2xl font-mono text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                      liangzhu@pigcasso6.top
                    </a>
                  </div>

                  <div className="flex gap-6 mt-8">
                    <button
                      onClick={() => setIsMessageModalOpen(true)}
                      className="px-8 py-3 rounded-lg bg-cyan-600 text-white font-bold hover:bg-cyan-500 transition-all shadow-lg shadow-cyan-500/20"
                    >
                      {content.contact.leaveMessageBtn}
                    </button>
                    
                    <a 
                      href="https://x.com/Pigcasso66"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 group shadow-sm"
                    >
                      <img 
                        src="/images/x_icon.png" 
                        alt="X" 
                        className="w-6 h-6 object-contain dark:invert opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer V2 */}
          <footer className="py-8 border-t border-slate-200 dark:border-slate-800 transition-colors">
            <div className="max-w-6xl mx-auto px-6 text-center space-y-2">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {content.contact.footerText}
              </p>
              <a 
                href="https://beian.miit.gov.cn/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-slate-500 dark:text-slate-400 font-sans-sc hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                {content.contact.icpText}
              </a>
            </div>
          </footer>
        </main>
      </div>

      <MessageModal 
        isOpen={isMessageModalOpen} 
        onClose={() => setIsMessageModalOpen(false)} 
        version="v2"
      />

      <CertificateModal
        isOpen={certModal.isOpen}
        onClose={() => setCertModal(prev => ({ ...prev, isOpen: false }))}
        title={certModal.title}
        frontImg={certModal.frontImg}
        backImg={certModal.backImg}
        flipBtnText={content.skills.flipBtn}
        closeBtnText={content.skills.closeBtn}
        version="v2"
      />
    </div>
  );
};

export default PortfolioHomeV2;
