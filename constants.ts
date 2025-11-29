import { ContentData, Language } from './types';

export const CONTENT: Record<Language, ContentData> = {
  en: {
    nav: {
      about: "About",
      education: "Education",
      contact: "Contact",
    },
    hero: {
      greeting: "Hello, I'm Liang Zhu.",
      role: "Student & Creative Explorer",
      description: "I craft elegant digital experiences that merge art with technology.\nDedicated to simplicity, performance, and accessible design.",
      cta: "View Details",
    },
    about: {
      title: "About Me",
      content: [
        "I am Liang Zhu, currently a freshman at The Hong Kong University of Science and Technology (Guangzhou). Although I don't have much research experience yet, I believe that through continuous effort and exploration during my university years, I will gradually accumulate experience and make breakthroughs in the fields I am interested in.",
        "I pay great attention to personal growth, pursuing progress not only academically but also hoping to broaden my horizons through various practices. My biggest hobbies are foreign languages, typography, and postcard exchange (Postcrossing), all of which allow me to understand the world more deeply and broaden my thinking.",
        "If you have any questions about my learning experience or interests, please feel free to contact me! Thank you for visiting my webpage, and I hope you can learn more about me here!",
      ],
      postcrossingLabel: "Visit My Postcrossing Profile",
    },
    education: {
      title: "Education",
      items: [
        {
          period: "2025 - Present",
          school: "The Hong Kong University of Science and Technology (Guangzhou)",
        },
        {
          period: "2022 - 2025",
          school: "Shenzhen Foreign Languages School (Group) Senior High School",
        },
        {
          period: "2019 - 2022",
          school: "Shenzhen Middle School (Junior High)",
        },
        {
          period: "2013 - 2019",
          school: "The Affiliated Tianjian Primary School of CUHK-Shenzhen",
        },
        {
          period: "2009 - 2013",
          school: "Shenzhen No.8 Kindergarten",
        },
      ],
    },
    contact: {
      title: "Get in Touch",
      description: "I'm always open to discussing new ideas, academic exchanges, or sharing stories.",
      emailLabel: "Email me at",
      footerText: "© 2025 Liang Zhu. All Rights Reserved.",
    },
  },
  zh: {
    nav: {
      about: "关于我",
      education: "教育经历",
      contact: "联系",
    },
    hero: {
      greeting: "你好，我是梁著。",
      role: "学生 & 探索者",
      description: "我致力于打造优雅的数字体验，将艺术与技术完美融合。\n专注于极简主义、高性能和无障碍设计。",
      cta: "了解更多",
    },
    about: {
      title: "关于我",
      content: [
        "我是梁著，目前是香港科技大学（广州）的大一学生。虽然现在我还没有太多科研经历，但我相信通过大学期间的不断努力和探索，我会逐渐在自己感兴趣的领域积累经验并有所突破。",
        "我非常注重个人成长，不仅仅在学术上追求进步，也希望通过多方面的实践，拓宽自己的视野。我最大的兴趣爱好是外语、排版和明信片交换（Postcrossing），这些都让我更深入地了解世界，开阔思维。",
        "如果你对我的学习经历或兴趣有任何问题，欢迎随时联系我！谢谢访问我的网页，希望你能从中了解我更多！",
      ],
      postcrossingLabel: "访问我的 Postcrossing 主页",
    },
    education: {
      title: "教育经历",
      items: [
        {
          period: "2025 - 至今",
          school: "香港科技大学（广州）",
        },
        {
          period: "2022 - 2025",
          school: "深圳外国语学校（集团）高中部",
        },
        {
          period: "2019 - 2022",
          school: "深圳中学初中部",
        },
        {
          period: "2013 - 2019",
          school: "香港中文大学（深圳）附属天健小学",
        },
        {
          period: "2009 - 2013",
          school: "深圳市第八幼儿园",
        },
      ],
    },
    contact: {
      title: "联系我",
      description: "我随时欢迎讨论学习经历、兴趣爱好，或进行学术交流。",
      emailLabel: "发送邮件至",
      footerText: "© 2025 梁著. 保留所有权利.",
    },
  },
};