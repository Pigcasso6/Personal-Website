export type Language = 'en' | 'zh';

export type Theme = 'light' | 'dark';

export interface NavItem {
  label: string;
  href: string;
}

export interface EducationItem {
  school: string;
  period: string;
}

export interface ContentData {
  nav: {
    about: string;
    education: string;
    contact: string;
  };
  hero: {
    greeting: string;
    role: string;
    description: string;
    cta: string;
  };
  about: {
    title: string;
    content: string[];
    postcrossingLabel: string;
  };
  education: {
    title: string;
    items: EducationItem[];
  };
  contact: {
    title: string;
    description: string;
    emailLabel: string;
    footerText: string;
  };
}