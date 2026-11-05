import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Navbar from './Navbar';
import MessageModal from './MessageModal';
import CertificateModal from './CertificateModal';
import { Mail, Stamp, ExternalLink, ArrowRight, Sparkles, MessageSquarePlus, Languages, CalendarDays, Terminal, Code2, Cpu, CircleDashed, Dices, TrendingUp, Award, FileText, PencilRuler } from 'lucide-react';
import { Language } from '../types';
import { AppleScrollSection, AppleRevealItem } from './AppleScrollSection';

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

  const renderSkillTitle = (title: string) => {
    if (title.includes('（')) {
      const parts = title.split('（');
      return (
        <span>
          <span>{parts[0]}</span>
          <span className="inline-block whitespace-nowrap">（{parts[1]}</span>
        </span>
      );
    }
    return title;
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
      case 'kanbun': return <PencilRuler size={24} />;
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
                  <a href="#projects" className="group px-8 py-4 liquid-btn text-slate-900 dark:text-white font-bold rounded-full transition-all flex items-center gap-2.5 shadow-xl active:scale-95">
                    {content.hero.cta} <ArrowRight size={20} className="text-cyan-600 dark:text-cyan-400 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Main Content Grid */}
          <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-36 md:gap-y-48">
            
            {/* About Section */}
            <AppleScrollSection as="div" id="about" className="relative order-1 md:order-1 md:col-span-1 pt-8 md:pt-0 scroll-mt-20">
              <FadingTitle className="text-7xl md:text-6xl">{content.about.title}</FadingTitle>
              
              <div className="pt-12 md:pt-20 relative z-10">
                <AppleRevealItem delay={180} className="liquid-glass rounded-3xl p-8 shadow-xl space-y-6 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  {content.about.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                  
                  <div className="pt-2 flex justify-center md:justify-start w-full">
                    <a 
                      href="https://www.postcrossing.com/user/Pigcasso6" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-[92%] sm:w-auto max-w-sm inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 rounded-full liquid-btn text-cyan-600 dark:text-cyan-400 font-semibold shadow-md active:scale-95 transition-all text-xs sm:text-sm md:text-base whitespace-nowrap"
                    >
                      <Stamp className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                      <span className="whitespace-nowrap">{content.about.postcrossingLabel}</span>
                    </a>
                  </div>
                </AppleRevealItem>
              </div>
            </AppleScrollSection>

            {/* Education Section */}
            <AppleScrollSection as="div" id="education" className="relative order-2 md:order-2 md:col-span-1 pt-8 md:pt-0 scroll-mt-20">
              <FadingTitle className="text-7xl md:text-6xl">{content.education.title}</FadingTitle>
              
              <div className="pt-12 md:pt-20 relative z-10">
                <div className="liquid-glass rounded-3xl p-8 shadow-xl space-y-10 border-l-4 border-cyan-500/40">
                  {content.education.items.map((item, index) => (
                    <AppleRevealItem key={index} delay={180 + index * 160} className="relative">
                      <div className="flex flex-col gap-2.5">
                        <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold liquid-pill px-3 py-1 rounded-full w-fit shadow-sm">
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
                    </AppleRevealItem>
                  ))}
                </div>
              </div>
            </AppleScrollSection>

            {/* Skills & Achievements Section V2 */}
            <AppleScrollSection as="div" id="skills" className="relative order-3 md:col-span-2 pt-8 md:pt-0 scroll-mt-20">
              <FadingTitle>{content.skills.title}</FadingTitle>

              <div className="pt-12 md:pt-20 relative z-10">
                <AppleRevealItem delay={180} className="liquid-glass liquid-sheen rounded-3xl p-8 shadow-2xl space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 liquid-pill rounded-2xl text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-xl leading-none select-none shadow-sm">
                      あ
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {content.skills.japaneseCategoryTitle}
                    </h3>
                  </div>

                  {content.skills.japaneseIntro && (
                    <div className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed space-y-3">
                      {content.skills.japaneseIntro.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* N1 Card */}
                    <AppleRevealItem delay={340} scale={true}>
                      <div className="p-6 rounded-2xl liquid-glass liquid-glass-interactive flex flex-col justify-between gap-5 h-full">
                        <div>
                          <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                            {renderSkillTitle(content.skills.n1Title)}
                          </h4>

                          {/* Total Score Progress Bar */}
                          <div className="flex items-center gap-3 my-3">
                            <div className="flex-1 liquid-track h-2.5 rounded-full overflow-hidden">
                              <div 
                                className="bg-gradient-to-r from-cyan-500 to-cyan-400 h-full rounded-full liquid-fill transition-all duration-1000"
                                style={{ width: '80%' }}
                              />
                            </div>
                            <span className="text-sm font-mono font-bold text-slate-800 dark:text-slate-200 shrink-0">
                              {content.skills.n1Score}
                            </span>
                          </div>

                          {/* Breakdown Progress Bars */}
                          {content.skills.n1Breakdown && (
                            <div className="mt-4 pt-3.5 border-t border-slate-200/60 dark:border-slate-700/60 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                              {[
                                content.skills.n1Breakdown.languageKnowledge,
                                content.skills.n1Breakdown.reading,
                                content.skills.n1Breakdown.listening,
                                content.skills.n1Breakdown.percentileRank,
                              ].map((item, idx) => (
                                <div key={idx} className="space-y-1">
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="font-medium text-slate-600 dark:text-slate-400">
                                      {item.label}
                                    </span>
                                    <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                                      {item.value}
                                    </span>
                                  </div>
                                  <div className="w-full liquid-track h-1.5 rounded-full overflow-hidden">
                                    <div
                                      className={`h-full rounded-full liquid-fill transition-all duration-1000 ${
                                        idx === 3
                                          ? 'bg-gradient-to-r from-indigo-400 to-cyan-400'
                                          : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                                      }`}
                                      style={{ width: `${item.percentage}%` }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full pt-1">
                          <button
                            onClick={() => openCertModal({
                              title: `${content.skills.n1Title} - ${content.skills.viewCertificateBtn}`,
                              frontImg: '/images/N1_C_F.jpg',
                              backImg: '/images/N1_C_B.jpg',
                            })}
                            className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs sm:text-sm font-bold rounded-xl liquid-btn-primary text-white transition-all shadow-md active:scale-95 text-center whitespace-nowrap"
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
                            className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs sm:text-sm font-bold rounded-xl liquid-btn text-slate-800 dark:text-slate-200 transition-colors active:scale-95 text-center whitespace-nowrap"
                          >
                            <FileText size={16} className="shrink-0" />
                            <span>{content.skills.viewReportBtn}</span>
                          </button>
                        </div>
                      </div>
                    </AppleRevealItem>

                    {/* N2 Card */}
                    <AppleRevealItem delay={500} scale={true}>
                      <div className="p-6 rounded-2xl liquid-glass liquid-glass-interactive flex flex-col justify-between gap-5 h-full">
                        <div>
                          <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                            {renderSkillTitle(content.skills.n2Title)}
                          </h4>

                          {/* Total Score Progress Bar */}
                          <div className="flex items-center gap-3 my-3">
                            <div className="flex-1 liquid-track h-2.5 rounded-full overflow-hidden">
                              <div 
                                className="bg-gradient-to-r from-cyan-500 to-cyan-400 h-full rounded-full liquid-fill transition-all duration-1000"
                                style={{ width: '98.33%' }}
                              />
                            </div>
                            <span className="text-sm font-mono font-bold text-slate-800 dark:text-slate-200 shrink-0">
                              {content.skills.n2Score}
                            </span>
                          </div>

                          {/* Breakdown Progress Bars */}
                          {content.skills.n2Breakdown && (
                            <div className="mt-4 pt-3.5 border-t border-slate-200/60 dark:border-slate-700/60 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                              {[
                                content.skills.n2Breakdown.languageKnowledge,
                                content.skills.n2Breakdown.reading,
                                content.skills.n2Breakdown.listening,
                                content.skills.n2Breakdown.percentileRank,
                              ].map((item, idx) => (
                                <div key={idx} className="space-y-1">
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="font-medium text-slate-600 dark:text-slate-400">
                                      {item.label}
                                    </span>
                                    <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                                      {item.value}
                                    </span>
                                  </div>
                                  <div className="w-full liquid-track h-1.5 rounded-full overflow-hidden">
                                    <div
                                      className={`h-full rounded-full liquid-fill transition-all duration-1000 ${
                                        idx === 3
                                          ? 'bg-gradient-to-r from-indigo-400 to-cyan-400'
                                          : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                                      }`}
                                      style={{ width: `${item.percentage}%` }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full pt-1">
                          <button
                            onClick={() => openCertModal({
                              title: `${content.skills.n2Title} - ${content.skills.viewCertificateBtn}`,
                              frontImg: '/images/N2_C_F.jpg',
                              backImg: '/images/N2_C_B.jpg',
                            })}
                            className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs sm:text-sm font-bold rounded-xl liquid-btn-primary text-white transition-all shadow-md active:scale-95 text-center whitespace-nowrap"
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
                            className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs sm:text-sm font-bold rounded-xl liquid-btn text-slate-800 dark:text-slate-200 transition-colors active:scale-95 text-center whitespace-nowrap"
                          >
                            <FileText size={16} className="shrink-0" />
                            <span>{content.skills.viewReportBtn}</span>
                          </button>
                        </div>
                      </div>
                    </AppleRevealItem>
                  </div>
                </AppleRevealItem>
              </div>
            </AppleScrollSection>

            {/* Projects Section */}
            <AppleScrollSection as="div" id="projects" className="relative order-4 md:col-span-2 pt-8 md:pt-0 scroll-mt-20">
              <FadingTitle>{content.projects.title}</FadingTitle>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 md:pt-20 relative z-10">
                {content.projects.items.map((project, index) => (
                  <AppleRevealItem key={index} delay={180 + index * 140} scale={true} className="h-full">
                    <div className="group relative liquid-glass liquid-glass-interactive rounded-3xl p-8 transition-all duration-500 overflow-hidden shadow-xl h-full flex flex-col justify-between">
                      <div className="relative z-10 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-6">
                          <div className="p-4 liquid-pill rounded-2xl text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-600 group-hover:text-white transition-all duration-300 shadow-sm">
                            {getProjectIcon(project.iconKey)}
                          </div>
                          <ArrowRight className="text-slate-400 dark:text-slate-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 -rotate-45 group-hover:rotate-0 transition-all duration-300" />
                        </div>
                        
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                          {project.title}
                        </h3>
                        
                        {project.description && (
                          <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed flex-grow">
                            {project.description}
                          </p>
                        )}

                        <div className={project.description ? "" : "mt-auto pt-4"}>
                          <button 
                            className="text-sm font-mono text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 flex items-center gap-2 font-bold px-3 py-1.5 rounded-xl liquid-pill"
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
                    </div>
                  </AppleRevealItem>
                ))}
              </div>
            </AppleScrollSection>

          </div>

          {/* Contact V2 */}
          <AppleScrollSection id="contact" className="pt-24 pb-32 md:py-32 relative scroll-mt-20">
            <div className="max-w-4xl mx-auto px-6 text-center relative">
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none">
                 <FadingTitle className="!static !text-center">{content.contact.title}</FadingTitle>
              </div>

              <div className="relative z-10 pt-12 md:pt-20">
                <AppleRevealItem delay={180}>
                  <p className="text-xl text-slate-600 dark:text-slate-300 mb-12">
                    {content.contact.description}
                  </p>
                </AppleRevealItem>
                
                <div className="liquid-glass rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col items-center gap-8">
                  <AppleRevealItem delay={340} className="flex flex-col gap-4">
                    <a href="mailto:zliang723@connect.hkust-gz.edu.cn" className="text-xl md:text-2xl font-mono text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                      zliang723@connect.hkust-gz.edu.cn
                    </a>
                    <a href="mailto:liangzhu@pigcasso6.top" className="text-xl md:text-2xl font-mono text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                      liangzhu@pigcasso6.top
                    </a>
                  </AppleRevealItem>

                  <AppleRevealItem delay={500} className="flex gap-6 mt-4">
                    <button
                      onClick={() => setIsMessageModalOpen(true)}
                      className="px-8 py-3.5 rounded-full liquid-btn-primary text-white font-bold shadow-xl active:scale-95 transition-all"
                    >
                      {content.contact.leaveMessageBtn}
                    </button>
                    
                    <a 
                      href="https://x.com/Pigcasso66"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-full liquid-btn text-slate-700 dark:text-slate-300 active:scale-95 shadow-md group"
                    >
                      <img 
                        src="/images/x_icon.png" 
                        alt="X" 
                        className="w-5 h-5 object-contain dark:invert opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    </a>
                  </AppleRevealItem>
                </div>
              </div>
            </div>
          </AppleScrollSection>

          {/* Footer V2 */}
          <footer className="py-10 bg-transparent text-center space-y-2 relative z-10">
            <div className="max-w-6xl mx-auto px-6 text-center space-y-2">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {content.contact.footerText}
              </p>
              <a 
                href="https://beian.miit.gov.cn/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block text-sm text-slate-500 dark:text-slate-400 font-sans-sc hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
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
