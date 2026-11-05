
import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Languages, Menu, X, ChevronDown, Zap, Layout } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useVersion } from '../contexts/VersionContext';
import { Language } from '../types';
import { AnimatePresence, motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, content } = useLanguage();
  const { version, toggleVersion } = useVersion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuBtnRef = useRef<HTMLButtonElement>(null);

  const languages: { code: Language; label: string; path: string }[] = [
    { code: 'zh-CN', label: '简体中文', path: '/zh-cn' },
    { code: 'zh-TW', label: '繁體中文', path: '/zh-tw' },
    { code: 'en', label: 'English', path: '/en' },
    { code: 'ja', label: '日本語', path: '/jp' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (langMenuRef.current && !langMenuRef.current.contains(target)) {
        setIsLangMenuOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target) &&
        mobileMenuBtnRef.current &&
        !mobileMenuBtnRef.current.contains(target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside as EventListener);
    document.addEventListener('touchstart', handleClickOutside as EventListener, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside as EventListener);
      document.removeEventListener('touchstart', handleClickOutside as EventListener);
    };
  }, []);

  const navLinks = [
    { label: content.nav.about, href: '#about' },
    { label: content.nav.skills, href: '#skills' },
    { label: content.nav.projects, href: '#projects' },
    { label: content.nav.education, href: '#education' },
    { label: content.nav.contact, href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getLanguageLabel = (code: Language) => {
    const lang = languages.find(l => l.code === code);
    return lang ? lang.label : code;
  };

  const getShortLanguageLabel = (code: Language) => {
    if (code === 'zh-CN') return '简';
    if (code === 'zh-TW') return '繁';
    if (code === 'en') return 'EN';
    if (code === 'ja') return 'JP';
    return code;
  };

  // Local path for the avatar logo
  const AVATAR_URL = "/images/avatar.png";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center py-3 md:py-4 pointer-events-none">
      <div 
        className={`pointer-events-auto liquid-nav-capsule h-16 md:h-18 flex items-center justify-between border ${
          isScrolled
            ? 'w-[calc(100%-3rem)] max-w-[848px] px-5 md:px-7 rounded-2xl md:rounded-full liquid-nav shadow-xl'
            : 'w-full max-w-7xl px-6 md:px-10 rounded-2xl md:rounded-full bg-transparent border-transparent shadow-none'
        }`}
      >
        {/* Logo */}
        <a 
          href="#home" 
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-2.5 cursor-pointer"
          aria-label="Back to top"
        >
          {!imgError ? (
            <img 
              src={AVATAR_URL}
              alt="Liang Zhu" 
              className="h-9 w-9 md:h-10 md:w-10 rounded-full object-cover dark:invert select-none" 
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="font-serif font-bold text-2xl tracking-tight text-slate-900 dark:text-white">
              Liang Zhu
            </span>
          )}
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors px-2 py-1 rounded-lg hover:bg-white/40 dark:hover:bg-white/5"
            >
              {link.label}
            </a>
          ))}
          
          <div className="w-px h-5 bg-slate-300/60 dark:bg-slate-700/60 mx-1" />

          <div className="flex items-center gap-2.5">
            {/* Language Dropdown */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full liquid-pill hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all text-slate-700 dark:text-slate-200 active:scale-95"
                aria-label="Select Language"
              >
                <Languages size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">{getShortLanguageLabel(language)}</span>
                <ChevronDown size={13} className={`transition-transform duration-300 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isLangMenuOpen && (
                <div className="absolute right-0 top-full mt-2.5 w-36 liquid-glass liquid-sheen rounded-2xl p-1.5 overflow-hidden animate-fade-in shadow-2xl z-50">
                  {languages.map((lang) => (
                    <a
                      key={lang.code}
                      href={lang.path}
                      onClick={(e) => {
                        e.preventDefault();
                        setLanguage(lang.code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`block w-full text-left px-3.5 py-2 text-sm rounded-xl transition-all cursor-pointer ${
                        language === lang.code
                          ? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-semibold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-white/10'
                      }`}
                    >
                      {lang.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Version Toggle (only visible when at top of page) */}
            <div className={`flex items-center justify-center overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isScrolled ? 'w-0 opacity-0 pointer-events-none -mr-2.5 scale-75' : 'w-9 opacity-100 scale-100'
            }`}>
              <button
                onClick={toggleVersion}
                className="p-2 rounded-full liquid-pill hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all text-slate-700 dark:text-slate-200 whitespace-nowrap active:scale-95"
                aria-label="Toggle Version"
              >
                {version === 'v1' ? <Zap size={18} /> : <Layout size={18} />}
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full liquid-pill hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all text-slate-700 dark:text-slate-200 active:scale-95"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <button
            ref={mobileMenuBtnRef}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl liquid-pill text-slate-800 dark:text-slate-100 active:scale-95 touch-manipulation cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay with Smooth Expand/Collapse Animation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            ref={mobileMenuRef}
            key="mobile-nav-menu"
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'top center' }}
            className="md:hidden w-[calc(100%-3rem)] max-w-6xl mx-auto mt-2.5 liquid-glass liquid-sheen rounded-3xl p-6 flex flex-col gap-4 shadow-2xl border border-white/40 dark:border-white/10 pointer-events-auto"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-lg font-medium text-slate-900 dark:text-slate-100 py-2 px-3 rounded-xl hover:bg-white/40 dark:hover:bg-white/10 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-4 pt-4 border-t border-slate-200/50 dark:border-slate-700/50 mt-2">
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <a
                    key={lang.code}
                    href={lang.path}
                    onClick={(e) => {
                      e.preventDefault();
                      setLanguage(lang.code);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-sm transition-all border cursor-pointer ${
                      language === lang.code
                        ? 'bg-indigo-500/20 border-indigo-400 text-indigo-700 dark:text-indigo-300 font-semibold shadow-sm'
                        : 'liquid-pill border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {lang.label}
                  </a>
                ))}
              </div>
              
              <div className="flex items-center gap-4 pt-1">
                {!isScrolled && (
                  <button
                    onClick={toggleVersion}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl liquid-pill text-slate-700 dark:text-slate-200 cursor-pointer"
                  >
                    {version === 'v1' ? <Zap size={18} /> : <Layout size={18} />}
                    <span className="text-xs font-bold">
                      {version === 'v1' ? content.nav.switchToModern : content.nav.switchToClassic}
                    </span>
                  </button>
                )}

                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl liquid-pill text-slate-700 dark:text-slate-200 cursor-pointer"
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                  <span className="text-xs font-bold">
                    {theme === 'dark' ? content.theme.light : content.theme.dark}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;