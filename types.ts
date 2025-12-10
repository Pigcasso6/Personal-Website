
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
}

export interface ContentData {
  nav: {
    about: string;
    projects: string;
    education: string;
    contact: string;
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
  };
  about: {
    title: string;
    content: string[];
    postcrossingLabel: string;
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
