
import React, { useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { VersionProvider, useVersion } from './contexts/VersionContext';
import PortfolioHome from './components/PortfolioHome';
import PortfolioHomeV2 from './components/PortfolioHomeV2';

// Component to handle global keyboard shortcuts
const GlobalShortcuts: React.FC = () => {
  const { toggleTheme } = useTheme();
  const { setLanguage } = useLanguage();
  const { toggleVersion } = useVersion();

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
          case 'KeyV':
            toggleVersion();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleTheme, setLanguage, toggleVersion]);

  return null;
};

import { AnimatePresence } from 'framer-motion';

// ... (imports remain the same)

// ... (GlobalShortcuts component remains the same)

// ... (VerbPractice component remains the same)

const MainContent: React.FC = () => {
  const { version } = useVersion();
  const [currentPage, setCurrentPage] = useState<'home' | 'verb'>('home');

  if (currentPage === 'verb') {
    return <VerbPractice onBack={() => setCurrentPage('home')} />;
  }

  return (
    <AnimatePresence mode="wait">
      {version === 'v1' ? (
        <PortfolioHome key="v1" onNavigateToVerbPractice={() => setCurrentPage('verb')} />
      ) : (
        <PortfolioHomeV2 key="v2" onNavigateToVerbPractice={() => setCurrentPage('verb')} />
      )}
    </AnimatePresence>
  );
};

import { recordVisitorPing } from './utils/supabaseClient';

const App: React.FC = () => {
  useEffect(() => {
    recordVisitorPing();
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <VersionProvider>
          <GlobalShortcuts />
          <MainContent />
        </VersionProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;