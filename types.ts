import { ReactNode } from 'react';

export type Language = 'en' | 'zh-CN' | 'zh-TW' | 'ja';

export type Theme = 'light' | 'dark';

export interface NavItem {
  label: string;
  href: string;
}

export interface EducationItem {
  school: string;
  period: string;
  url?: string;
  noUrlTooltip?: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  tags?: string[];
  link?: string; // For external links or internal routes
  action?: string; // For internal actions like opening a modal
  iconKey?: 'kanbun' | 'verb' | 'timetable' | 'circle' | 'gamble' | 'futures' | 'default';
}

export interface SectionScoreItem {
  label: string | ReactNode;
  value: string;
  percentage: number;
}

export interface SkillScoreBreakdown {
  languageKnowledge: SectionScoreItem;
  reading: SectionScoreItem;
  listening: SectionScoreItem;
  percentileRank: SectionScoreItem;
}

export interface ContentData {
  nav: {
    about: string;
    skills: string;
    projects: string;
    education: string;
    contact: string;
    switchToModern: string;
    switchToClassic: string;
  };
  theme: {
    light: string;
    dark: string;
  };
  hero: {
    greeting: string;
    role: string;
    description: string;
    cta: string;
    typewriterStrings?: string[];
  };
  about: {
    title: string;
    content: (string | ReactNode)[];
    postcrossingLabel: string;
  };
  skills: {
    title: string;
    japaneseCategoryTitle: string;
    japaneseIntro?: (string | ReactNode)[];
    n1Title: string;
    n1Score: string;
    n1Breakdown: SkillScoreBreakdown;
    n2Title: string;
    n2Score: string;
    n2Breakdown: SkillScoreBreakdown;
    viewCertificateBtn: string;
    viewReportBtn: string;
    flipBtn: string;
    closeBtn: string;
  };
  projects: {
    title: string;
    viewProject: string;
    items: ProjectItem[];
  };
  education: {
    title: string;
    items: EducationItem[];
  };
  contact: {
    title: string;
    description: string;
    emailLabel: string;
    leaveMessageBtn: string;
    footerText: string;
    icpText: string;
    form: {
      title: string;
      nameLabel: string;
      contactLabel: string;
      messageLabel: string;
      submit: string;
      submitting: string;
      success: string;
      error: string;
      close: string;
    };
  };
}