import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Navbar from './Navbar';
import Hero from './Hero';
import BackgroundDecor from './BackgroundDecor';
import MessageModal from './MessageModal';
import CertificateModal from './CertificateModal';
import { Mail, Stamp, ExternalLink, ArrowRight, Sparkles, MessageSquarePlus, Languages, CalendarDays, CircleDashed, Dices, TrendingUp, Award, FileText, PencilRuler } from 'lucide-react';
import { Language } from '../types';
import { AppleScrollSection, AppleRevealItem } from './AppleScrollSection';

const PortfolioHome: React.FC<{ onNavigateToVerbPractice: () => void }> = ({ onNavigateToVerbPractice }) => {
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

  const getProjectIcon = (key?: string) => {
    switch (key) {
      case 'kanbun':
        return <PencilRuler size={24} />;
      case 'verb':
        return <Languages size={24} />;
      case 'timetable':
        return <CalendarDays size={24} />;
      case 'circle':
        return <CircleDashed size={24} />;
      case 'gamble':
        return <Dices size={24} />;
      case 'futures':
        return <TrendingUp size={24} />;
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
        <AppleScrollSection id="about" className="pt-8 pb-16 md:py-24 bg-transparent scroll-mt-20">
          <div className="max-w-6xl mx-auto px-6">
            <AppleRevealItem delay={0}>
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-slate-900 dark:text-white flex items-center gap-4">
                <span className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-sky-400 rounded-full"></span>
                {content.about.title}
              </h2>
            </AppleRevealItem>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <AppleRevealItem delay={180} className="space-y-6">
                <div className="space-y-6 text-lg text-slate-600 dark:text-slate-300 leading-relaxed liquid-glass p-7 md:p-8 rounded-3xl shadow-xl">
                  {content.about.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                  
                  {/* Postcrossing Button */}
                  <div className="pt-2">
                    <a 
                      href="https://www.postcrossing.com/user/Pigcasso6" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full liquid-btn text-indigo-700 dark:text-indigo-300 font-semibold shadow-md active:scale-95 transition-all"
                    >
                      <Stamp size={20} />
                      {content.about.postcrossingLabel}
                    </a>
                  </div>
                </div>
              </AppleRevealItem>
              
              <AppleRevealItem delay={340} scale={true} className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                <div className="relative liquid-glass p-2.5 rounded-3xl shadow-2xl overflow-hidden">
                  <img 
                    src="https://picsum.photos/600/800?grayscale" 
                    alt="Liang Zhu" 
                    className="relative rounded-2xl w-full h-[480px] object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </AppleRevealItem>
            </div>
          </div>
        </AppleScrollSection>

        {/* Skills & Achievements Section */}
        <AppleScrollSection id="skills" className="pt-8 pb-16 md:py-24 bg-transparent scroll-mt-20">
          <div className="max-w-4xl mx-auto px-6">
            <AppleRevealItem delay={0}>
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-slate-900 dark:text-white flex items-center gap-4">
                <span className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-sky-400 rounded-full"></span>
                {content.skills.title}
              </h2>
            </AppleRevealItem>

            <AppleRevealItem delay={180} className="liquid-glass liquid-sheen rounded-3xl p-6 md:p-8 space-y-4 md:space-y-6 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 liquid-pill text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center font-bold text-lg md:text-xl leading-none select-none shadow-sm">
                  あ
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* N1 Card */}
                <AppleRevealItem delay={340} scale={true} className="h-full">
                  <div className="p-6 rounded-2xl liquid-glass liquid-glass-interactive flex flex-col justify-between gap-4 h-full">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                        {renderSkillTitle(content.skills.n1Title)}
                      </h4>

                      {/* Total Score Progress Bar */}
                      <div className="flex items-center gap-3 my-3">
                        <div className="flex-1 liquid-track h-2.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-full rounded-full liquid-fill transition-all duration-1000"
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
                                      ? 'bg-gradient-to-r from-amber-400 to-amber-500'
                                      : 'bg-gradient-to-r from-teal-400 to-emerald-500'
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
                        className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs sm:text-sm font-semibold rounded-xl liquid-btn-primary text-white transition-all text-center whitespace-nowrap active:scale-95"
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
                        className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs sm:text-sm font-semibold rounded-xl liquid-btn text-slate-800 dark:text-slate-200 transition-all text-center whitespace-nowrap active:scale-95"
                      >
                        <FileText size={16} className="shrink-0" />
                        <span>{content.skills.viewReportBtn}</span>
                      </button>
                    </div>
                  </div>
                </AppleRevealItem>

                {/* N2 Card */}
                <AppleRevealItem delay={500} scale={true} className="h-full">
                  <div className="p-6 rounded-2xl liquid-glass liquid-glass-interactive flex flex-col justify-between gap-4 h-full">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                        {renderSkillTitle(content.skills.n2Title)}
                      </h4>

                      {/* Total Score Progress Bar */}
                      <div className="flex items-center gap-3 my-3">
                        <div className="flex-1 liquid-track h-2.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-full rounded-full liquid-fill transition-all duration-1000"
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
                                      ? 'bg-gradient-to-r from-amber-400 to-amber-500'
                                      : 'bg-gradient-to-r from-teal-400 to-emerald-500'
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
                        className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs sm:text-sm font-semibold rounded-xl liquid-btn-primary text-white transition-all text-center whitespace-nowrap active:scale-95"
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
                        className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs sm:text-sm font-semibold rounded-xl liquid-btn text-slate-800 dark:text-slate-200 transition-all text-center whitespace-nowrap active:scale-95"
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
        <AppleScrollSection id="projects" className="pt-8 pb-16 md:py-24 bg-transparent scroll-mt-20">
          <div className="max-w-4xl mx-auto px-6">
            <AppleRevealItem delay={0}>
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-slate-900 dark:text-white flex items-center gap-4">
                <span className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-sky-400 rounded-full"></span>
                {content.projects.title}
              </h2>
            </AppleRevealItem>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {content.projects.items.map((project, index) => (
                <AppleRevealItem key={index} delay={180 + index * 140} scale={true} className="h-full">
                  <div className="group relative liquid-glass liquid-glass-interactive rounded-3xl p-7 flex flex-col h-full shadow-xl">
                    <div className="relative z-10 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 liquid-pill rounded-2xl text-indigo-600 dark:text-indigo-400 shadow-sm">
                          {getProjectIcon(project.iconKey)}
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {project.title}
                      </h3>
                      
                      {project.description && (
                        <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed flex-grow text-sm md:text-base">
                          {project.description}
                        </p>
                      )}

                      <div className={project.description ? "" : "mt-auto"}>
                        <button 
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl liquid-btn text-indigo-600 dark:text-indigo-400 font-bold hover:gap-3 transition-all active:scale-95 text-sm"
                          onClick={() => {
                            if (project.link === '/verb-practice') {
                              onNavigateToVerbPractice();
                            } else if (project.link) {
                              window.open(project.link, '_blank');
                            }
                          }}
                        >
                          {content.projects.viewProject}
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </AppleRevealItem>
              ))}
            </div>
          </div>
        </AppleScrollSection>

        {/* Education Section */}
        <AppleScrollSection id="education" className="pt-8 pb-16 md:py-24 bg-transparent scroll-mt-20">
          <div className="max-w-4xl mx-auto px-6">
            <AppleRevealItem delay={0}>
              <h2 className="text-3xl md:text-4xl font-bold mb-16 text-slate-900 dark:text-white flex items-center gap-4">
                <span className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-sky-400 rounded-full"></span>
                {content.education.title}
              </h2>
            </AppleRevealItem>
            <div className="liquid-glass rounded-3xl p-6 md:p-10 shadow-xl space-y-8">
              <div className="relative border-l-2 border-indigo-400/40 dark:border-indigo-500/30 ml-2 md:ml-4 space-y-10">
                {content.education.items.map((item, index) => (
                  <AppleRevealItem key={index} delay={180 + index * 160} className="relative pl-8 md:pl-10">
                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-indigo-600 border-2 border-white dark:border-slate-900 shadow-md"></div>
                    
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
                      <span className="shrink-0 font-mono text-xs md:text-sm font-semibold text-slate-600 dark:text-slate-300 liquid-pill px-3.5 py-1 rounded-full shadow-sm">
                        {item.period}
                      </span>
                    </div>
                  </AppleRevealItem>
                ))}
              </div>
            </div>
          </div>
        </AppleScrollSection>

        {/* Contact Section */}
        <AppleScrollSection id="contact" className="pt-8 pb-16 md:py-24 bg-transparent scroll-mt-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <AppleRevealItem delay={0}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
                {content.contact.title}
              </h2>
            </AppleRevealItem>
            <AppleRevealItem delay={180}>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
                {content.contact.description}
              </p>
            </AppleRevealItem>
            
            <div className="liquid-glass rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col items-center gap-10">
              {/* Top Group: Icon + Emails */}
              <AppleRevealItem delay={340} className="flex flex-col items-center gap-6">
                <div className="w-16 h-16 rounded-2xl liquid-pill flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-md">
                  <Mail className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col items-center gap-3">
                  <a href="mailto:zliang723@connect.hkust-gz.edu.cn" className="text-lg md:text-2xl font-bold text-indigo-600 dark:text-indigo-400 hover:underline decoration-2 underline-offset-8 transition-all break-all text-center">
                    zliang723@connect.hkust-gz.edu.cn
                  </a>
                  <a href="mailto:liangzhu@pigcasso6.top" className="text-lg md:text-2xl font-bold text-indigo-600 dark:text-indigo-400 hover:underline decoration-2 underline-offset-8 transition-all break-all text-center">
                    liangzhu@pigcasso6.top
                  </a>
                </div>
              </AppleRevealItem>

              {/* Leave Message Button */}
              <AppleRevealItem delay={500}>
                <button
                  onClick={() => setIsMessageModalOpen(true)}
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full liquid-btn-primary text-white font-bold text-base shadow-xl active:scale-95 transition-all"
                >
                  <MessageSquarePlus size={20} />
                  {content.contact.leaveMessageBtn}
                </button>
              </AppleRevealItem>

              {/* X Social Link */}
              <AppleRevealItem delay={640}>
                <a 
                  href="https://x.com/Pigcasso66"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center p-3.5 rounded-full liquid-btn text-slate-700 dark:text-slate-300 active:scale-95 shadow-md group"
                  aria-label="Visit my X profile"
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
        </AppleScrollSection>

        {/* Footer */}
        <footer className="py-10 bg-transparent text-center space-y-2 relative z-10">
          <div className="max-w-6xl mx-auto px-6 text-center space-y-2">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {content.contact.footerText}
            </p>
            <a 
              href="https://beian.miit.gov.cn/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block text-sm text-slate-500 dark:text-slate-400 font-sans-sc hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
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

      <CertificateModal
        isOpen={certModal.isOpen}
        onClose={() => setCertModal(prev => ({ ...prev, isOpen: false }))}
        title={certModal.title}
        frontImg={certModal.frontImg}
        backImg={certModal.backImg}
        flipBtnText={content.skills.flipBtn}
        closeBtnText={content.skills.closeBtn}
        version="v1"
      />
    </div>
  );
};

export default PortfolioHome;
