import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Language, ContentData } from '../types';
import { CONTENT } from '../constants';

export const LANG_TO_PATH: Record<Language, string> = {
  'zh-CN': '/zh-cn',
  'zh-TW': '/zh-tw',
  'en': '/en',
  'ja': '/jp',
};

export const getLanguageFromPath = (pathname: string): Language => {
  const cleanPath = pathname.toLowerCase().replace(/\/+$/, '');
  if (cleanPath === '/zh-tw' || cleanPath.startsWith('/zh-tw/')) return 'zh-TW';
  if (cleanPath === '/en' || cleanPath.startsWith('/en/')) return 'en';
  if (cleanPath === '/jp' || cleanPath.startsWith('/jp/') || cleanPath === '/ja' || cleanPath.startsWith('/ja/')) return 'ja';
  if (cleanPath === '/zh-cn' || cleanPath.startsWith('/zh-cn/')) return 'zh-CN';
  return 'zh-CN'; // Default for '/' (no suffix) or any unrecognized path
};

export const getPathFromLanguage = (lang: Language): string => {
  return LANG_TO_PATH[lang] || '/zh-cn';
};

interface LanguageContextType {
  language: Language;
  content: ContentData;
  setLanguage: (lang: Language) => void;
  langPath: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return getLanguageFromPath(window.location.pathname);
    }
    return 'zh-CN';
  });

  const setLanguage = useCallback((newLang: Language) => {
    setLanguageState(newLang);
    if (typeof window !== 'undefined') {
      const newPath = getPathFromLanguage(newLang);
      const currentHash = window.location.hash;
      const currentSearch = window.location.search;
      const targetUrl = `${newPath}${currentSearch}${currentHash}`;
      if (window.location.pathname.toLowerCase() !== newPath) {
        window.history.pushState({ lang: newLang }, '', targetUrl);
      }
    }
  }, []);

  // Sync state when user navigates using browser Back / Forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const detectedLang = getLanguageFromPath(window.location.pathname);
      setLanguageState(detectedLang);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const value = {
    language,
    content: CONTENT[language],
    setLanguage,
    langPath: getPathFromLanguage(language),
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};