
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

  // Swipe up to collapse mobile menu refs
  const menuTouchStartY = useRef<number | null>(null);
  const menuTouchDeltaY = useRef<number>(0);

  // iOS 26 Liquid Glass Navigation Links Long-Press & Vertical Drag Selector state
  const navItemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [isNavScrubbing, setIsNavScrubbing] = useState(false);
  const [scrubbingIndex, setScrubbingIndex] = useState<number | null>(null);
  const navLongPressTimer = useRef<NodeJS.Timeout | null>(null);
  const navTouchStartY = useRef<number | null>(null);
  const navTouchDeltaY = useRef<number>(0);

  // iOS 26 Liquid Glass Segmented Language Slider state
  const segmentedTrackRef = useRef<HTMLDivElement>(null);
  const [isDraggingLang, setIsDraggingLang] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const languages: { code: Language; label: string; path: string }[] = [
    { code: 'zh-CN', label: '简体中文', path: '/zh-cn' },
    { code: 'zh-TW', label: '繁體中文', path: '/zh-tw' },
    { code: 'en', label: 'English', path: '/en' },
    { code: 'ja', label: '日本語', path: '/jp' },
  ];

  const getLangIndex = (code: Language) => {
    const idx = languages.findIndex(l => l.code === code);
    return idx >= 0 ? idx : 0;
  };

  const activeLangIndex = isDraggingLang && dragIndex !== null ? dragIndex : getLangIndex(language);

  const calcLangIndexFromClientX = (clientX: number): number => {
    if (!segmentedTrackRef.current) return 0;
    const rect = segmentedTrackRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const ratio = x / rect.width;
    const idx = Math.floor(ratio * languages.length);
    return Math.max(0, Math.min(languages.length - 1, idx));
  };

  const handleLangTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    const touch = e.touches[0];
    const idx = calcLangIndexFromClientX(touch.clientX);
    setIsDraggingLang(true);
    setDragIndex(idx);
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try { navigator.vibrate(8); } catch (_) {}
    }
  };

  const handleLangTouchMove = (e: React.TouchEvent) => {
    e.stopPropagation();
    const touch = e.touches[0];
    const idx = calcLangIndexFromClientX(touch.clientX);
    if (idx !== dragIndex) {
      setDragIndex(idx);
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        try { navigator.vibrate(8); } catch (_) {}
      }
    }
  };

  const handleLangTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();
    if (dragIndex !== null && dragIndex >= 0 && dragIndex < languages.length) {
      setLanguage(languages[dragIndex].code);
    }
    setIsDraggingLang(false);
    setDragIndex(null);
  };

  const handleLangTouchCancel = (e: React.TouchEvent) => {
    e.stopPropagation();
    setIsDraggingLang(false);
    setDragIndex(null);
  };

  // Nav Links Long-Press & Vertical Drag calculation and handlers
  const calcNavIndexFromClientY = (clientY: number): number => {
    let closestIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < navItemRefs.current.length; i++) {
      const el = navItemRefs.current[i];
      if (el) {
        const rect = el.getBoundingClientRect();
        if (clientY >= rect.top && clientY <= rect.bottom) {
          return i;
        }
        const centerY = rect.top + rect.height / 2;
        const dist = Math.abs(clientY - centerY);
        if (dist < minDistance) {
          minDistance = dist;
          closestIndex = i;
        }
      }
    }
    return closestIndex;
  };

  const handleNavTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    navTouchStartY.current = touch.clientY;
    navTouchDeltaY.current = 0;
    const initialIndex = calcNavIndexFromClientY(touch.clientY);

    if (navLongPressTimer.current) clearTimeout(navLongPressTimer.current);
    navLongPressTimer.current = setTimeout(() => {
      setIsNavScrubbing(true);
      setScrubbingIndex(initialIndex);
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        try { navigator.vibrate(12); } catch (_) {}
      }
    }, 180);
  };

  const handleNavTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (navTouchStartY.current !== null) {
      navTouchDeltaY.current = touch.clientY - navTouchStartY.current;

      // If user starts scrubbing with long-press, track vertical selector
      if (isNavScrubbing) {
        e.stopPropagation();
        const newIndex = calcNavIndexFromClientY(touch.clientY);
        if (newIndex !== scrubbingIndex) {
          setScrubbingIndex(newIndex);
          if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
            try { navigator.vibrate(6); } catch (_) {}
          }
        }
      }
    }
  };

  const handleNavTouchEnd = (e: React.TouchEvent) => {
    if (navLongPressTimer.current) {
      clearTimeout(navLongPressTimer.current);
      navLongPressTimer.current = null;
    }

    if (isNavScrubbing && scrubbingIndex !== null) {
      e.stopPropagation();
      const targetLink = navLinks[scrubbingIndex];
      if (targetLink) {
        handleNavClick(e as any, targetLink.href);
      }
      setIsNavScrubbing(false);
      setScrubbingIndex(null);
    } else if (!isNavScrubbing && navTouchDeltaY.current < -25) {
      // Swiped up on nav area: trigger smooth collapse animation identically to clicking close button
      setIsMobileMenuOpen(false);
    } else {
      setIsNavScrubbing(false);
      setScrubbingIndex(null);
    }
    navTouchStartY.current = null;
    navTouchDeltaY.current = 0;
  };

  const handleNavTouchCancel = () => {
    if (navLongPressTimer.current) {
      clearTimeout(navLongPressTimer.current);
      navLongPressTimer.current = null;
    }
    setIsNavScrubbing(false);
    setScrubbingIndex(null);
    navTouchStartY.current = null;
    navTouchDeltaY.current = 0;
  };

  // Swipe up gesture for the mobile menu container
  const handleMenuTouchStart = (e: React.TouchEvent) => {
    menuTouchStartY.current = e.touches[0].clientY;
    menuTouchDeltaY.current = 0;
  };

  const handleMenuTouchMove = (e: React.TouchEvent) => {
    if (menuTouchStartY.current !== null) {
      menuTouchDeltaY.current = e.touches[0].clientY - menuTouchStartY.current;
    }
  };

  const handleMenuTouchEnd = () => {
    if (menuTouchDeltaY.current < -25) {
      setIsMobileMenuOpen(false);
    }
    menuTouchStartY.current = null;
    menuTouchDeltaY.current = 0;
  };

  // Prevent any background page scrolling while mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const preventTouchMove = (e: TouchEvent) => {
        if (e.cancelable) {
          e.preventDefault();
        }
      };

      window.addEventListener('touchmove', preventTouchMove, { passive: false });

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('touchmove', preventTouchMove);
      };
    }
  }, [isMobileMenuOpen]);

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

  const handleNavClick = (e?: React.SyntheticEvent | MouseEvent | TouchEvent, href?: string) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    setIsMobileMenuOpen(false);
    if (href) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
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
    <nav className={`${isScrolled ? 'fixed' : 'absolute'} top-0 left-0 right-0 z-50 flex flex-col items-center py-3 md:py-4 pointer-events-none`}>
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
            style={{
              transformOrigin: 'top center',
              touchAction: 'none',
              WebkitTouchCallout: 'none',
              WebkitUserSelect: 'none',
              userSelect: 'none',
            }}
            onTouchStart={handleMenuTouchStart}
            onTouchMove={handleMenuTouchMove}
            onTouchEnd={handleMenuTouchEnd}
            className="md:hidden w-[calc(100%-3rem)] max-w-6xl mx-auto mt-2.5 liquid-glass liquid-sheen rounded-3xl p-6 flex flex-col gap-4 shadow-2xl border border-white/40 dark:border-white/10 pointer-events-auto select-none touch-none"
          >
            {/* iOS Pull / Swipe-Up Indicator Bar */}
            <div className="w-10 h-1 rounded-full bg-slate-300 dark:bg-white/20 mx-auto -mt-2 mb-1 opacity-70 pointer-events-none" />

            {/* 5 Navigation Buttons with Long-Press & Vertical Drag Liquid Glass Selector */}
            <div 
              className="flex flex-col gap-1 relative select-none touch-none"
              onTouchStart={handleNavTouchStart}
              onTouchMove={handleNavTouchMove}
              onTouchEnd={handleNavTouchEnd}
              onTouchCancel={handleNavTouchCancel}
              onContextMenu={(e) => e.preventDefault()}
              style={{
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none',
                userSelect: 'none',
                touchAction: 'none',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {navLinks.map((link, index) => {
                const isSelected = isNavScrubbing && scrubbingIndex === index;

                return (
                  <button
                    key={link.label}
                    ref={(el) => { navItemRefs.current[index] = el; }}
                    type="button"
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    onClick={(e) => handleNavClick(e, link.href)}
                    onContextMenu={(e) => e.preventDefault()}
                    className={`relative w-full text-left text-lg py-2.5 px-4 rounded-2xl select-none touch-none cursor-pointer outline-none focus:outline-none ${
                      isSelected
                        ? 'liquid-glass liquid-sheen bg-white/85 dark:bg-slate-800/90 text-indigo-600 dark:text-indigo-400 font-bold border border-white/90 dark:border-white/25 shadow-xl scale-[1.01]'
                        : 'bg-transparent border border-transparent text-slate-900 dark:text-white font-medium'
                    }`}
                    style={{
                      WebkitTouchCallout: 'none',
                      WebkitUserSelect: 'none',
                      userSelect: 'none',
                      touchAction: 'none',
                      WebkitTapHighlightColor: 'transparent',
                      WebkitUserDrag: 'none',
                      transition: isNavScrubbing ? 'none' : 'transform 0.15s ease',
                    }}
                  >
                    <div className="flex items-center pointer-events-none">
                      <span>{link.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="flex flex-col gap-4 pt-4 border-t border-slate-200/50 dark:border-slate-700/50 mt-1">
              
              {/* iOS 26 Liquid Glass Drag-and-Slide Segmented Language Selector */}
              <div 
                ref={segmentedTrackRef}
                onTouchStart={handleLangTouchStart}
                onTouchMove={handleLangTouchMove}
                onTouchEnd={handleLangTouchEnd}
                onTouchCancel={handleLangTouchCancel}
                onContextMenu={(e) => e.preventDefault()}
                className="relative w-full p-1 rounded-2xl liquid-glass border border-white/60 dark:border-white/10 select-none shadow-inner touch-none overflow-hidden"
                style={{
                  WebkitTouchCallout: 'none',
                  WebkitUserSelect: 'none',
                  userSelect: 'none',
                  touchAction: 'none',
                }}
              >
                {/* Sliding Liquid Glass Highlight Capsule */}
                <div 
                  className={`absolute top-1 bottom-1 rounded-xl liquid-pill bg-white/80 dark:bg-slate-800/90 shadow-md border border-white/90 dark:border-white/20 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none ${
                    isDraggingLang ? 'scale-[0.98] ring-2 ring-indigo-400/40 dark:ring-indigo-500/40' : ''
                  }`}
                  style={{
                    width: `calc(25% - 2px)`,
                    left: `calc(${activeLangIndex * 25}% + 1px)`,
                  }}
                />

                {/* 4 Language Segments */}
                <div className="grid grid-cols-4 relative z-10">
                  {languages.map((lang, index) => {
                    const isSelected = activeLangIndex === index;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setLanguage(lang.code);
                        }}
                        onContextMenu={(e) => e.preventDefault()}
                        className={`py-2 px-1 text-center text-xs sm:text-sm font-semibold rounded-xl transition-colors duration-200 select-none cursor-pointer touch-none truncate ${
                          isSelected
                            ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                        }`}
                        style={{
                          WebkitTouchCallout: 'none',
                          WebkitUserSelect: 'none',
                          userSelect: 'none',
                        }}
                      >
                        {lang.label}
                      </button>
                    );
                  })}
                </div>
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