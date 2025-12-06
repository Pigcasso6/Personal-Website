import { ContentData, Language } from './types';

export const CONTENT: Record<Language, ContentData> = {
  en: {
    nav: {
      about: "About",
      projects: "Projects",
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
    projects: {
      title: "Projects",
      viewProject: "View Project",
      items: [
        {
          title: "Japanese Verb Conjugation",
          description: "An interactive tool powered by Gemini AI to practice Japanese verb conjugations.",
          link: "https://jp-verb-practice.pigcasso6.top"
        }
      ]
    },
    education: {
      title: "Education",
      items: [
        {
          period: "2025 - Present",
          school: "The Hong Kong University of Science and Technology (Guangzhou)",
          url: "https://hkust-gz.edu.cn",
        },
        {
          period: "2022 - 2025",
          school: "Shenzhen Foreign Languages School (Group) Senior High School",
          url: "https://www.sfls.net.cn",
        },
        {
          period: "2019 - 2022",
          school: "Shenzhen Middle School (Junior High)",
          url: "https://www.shenzhong.net",
        },
        {
          period: "2013 - 2019",
          school: "The Affiliated Tianjian Primary School of CUHK-Shenzhen",
          url: "http://tjxx.szftedu.cn",
        },
        {
          period: "2009 - 2013",
          school: "Shenzhen No.8 Kindergarten",
          noUrlTooltip: "Shenzhen No.8 Kindergarten does not have an official website.",
        },
      ],
    },
    contact: {
      title: "Get in Touch",
      description: "I'm always open to discussing new ideas, academic exchanges, or sharing stories.",
      emailLabel: "Email me at",
      leaveMessageBtn: "Leave a Message",
      footerText: "© 2025 Liang Zhu. All Rights Reserved.",
      form: {
        title: "Leave a Message",
        nameLabel: "Your Name",
        contactLabel: "Contact Info",
        messageLabel: "Message",
        submit: "Send Message",
        submitting: "Sending...",
        success: "Message sent successfully!",
        error: "Failed to send message. Please try again.",
        close: "Close",
      },
    },
  },
  'zh-CN': {
    nav: {
      about: "关于我",
      projects: "项目展示",
      education: "教育经历",
      contact: "联系我",
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
    projects: {
      title: "项目展示",
      viewProject: "查看项目",
      items: [
        {
          title: "日语动词变形练习",
          description: "基于 Gemini AI 构建的互动工具，用于练习日语动词变形。",
          link: "https://jp-verb-practice.pigcasso6.top"
        }
      ]
    },
    education: {
      title: "教育经历",
      items: [
        {
          period: "2025 - 至今",
          school: "香港科技大学（广州）",
          url: "https://hkust-gz.edu.cn",
        },
        {
          period: "2022 - 2025",
          school: "深圳外国语学校（集团）高中部",
          url: "https://www.sfls.net.cn",
        },
        {
          period: "2019 - 2022",
          school: "深圳中学初中部",
          url: "https://www.shenzhong.net",
        },
        {
          period: "2013 - 2019",
          school: "香港中文大学（深圳）附属天健小学",
          url: "http://tjxx.szftedu.cn",
        },
        {
          period: "2009 - 2013",
          school: "深圳市第八幼儿园",
          noUrlTooltip: "深圳市第八幼儿园暂无官网。",
        },
      ],
    },
    contact: {
      title: "联系我",
      description: "我随时欢迎讨论学习经历、兴趣爱好，或进行学术交流。",
      emailLabel: "发送邮件至",
      leaveMessageBtn: "给我留言",
      footerText: "© 2025 梁著. 保留所有权利.",
      form: {
        title: "给我留言",
        nameLabel: "您的名字",
        contactLabel: "联系方式",
        messageLabel: "留言内容",
        submit: "发送留言",
        submitting: "发送中...",
        success: "留言发送成功！",
        error: "发送失败，请重试。",
        close: "关闭",
      },
    },
  },
  'zh-TW': {
    nav: {
      about: "關於我",
      projects: "項目展示",
      education: "教育經歷",
      contact: "聯絡",
    },
    hero: {
      greeting: "你好，我是梁著。",
      role: "學生 & 探索者",
      description: "我致力於打造優雅的數位體驗，將藝術與技術完美融合。\n專注於極簡主義、高性能和無障礙設計。",
      cta: "了解更多",
    },
    about: {
      title: "關於我",
      content: [
        "我是梁著，目前是香港科技大學（廣州）的大一學生。雖然現在我還沒有太多科研經歷，但我相信通過大學期間的不斷努力和探索，我會逐漸在自己感興趣的領域積累經驗並有所突破。",
        "我非常注重個人成長，不僅僅在學術上追求進步，也希望通過多方面的實踐，拓寬自己的視野。我最大的興趣愛好是外語、排版和明信片交換（Postcrossing），這些都讓我更深入地了解世界，開闊思維。",
        "如果你對我的學習經歷或興趣有任何問題，歡迎隨時聯繫我！謝謝訪問我的網頁，希望你能從中了解我更多！",
      ],
      postcrossingLabel: "訪問我的 Postcrossing 主頁",
    },
    projects: {
      title: "項目展示",
      viewProject: "查看項目",
      items: [
        {
          title: "日語動詞變形練習",
          description: "基於 Gemini AI 構建的互動工具，用於練習日語動詞變形。",
          link: "https://jp-verb-practice.pigcasso6.top"
        }
      ]
    },
    education: {
      title: "教育經歷",
      items: [
        {
          period: "2025 - 至今",
          school: "香港科技大學（廣州）",
          url: "https://hkust-gz.edu.cn",
        },
        {
          period: "2022 - 2025",
          school: "深圳外國語學校（集團）高中部",
          url: "https://www.sfls.net.cn",
        },
        {
          period: "2019 - 2022",
          school: "深圳中學初中部",
          url: "https://www.shenzhong.net",
        },
        {
          period: "2013 - 2019",
          school: "香港中文大學（深圳）附屬天健小學",
          url: "http://tjxx.szftedu.cn",
        },
        {
          period: "2009 - 2013",
          school: "深圳市第八幼兒園",
          noUrlTooltip: "深圳市第八幼兒園暫無官網。",
        },
      ],
    },
    contact: {
      title: "聯絡我",
      description: "我隨時歡迎討論學習經歷、興趣愛好，或進行學術交流。",
      emailLabel: "發送郵件至",
      leaveMessageBtn: "給我留言",
      footerText: "© 2025 梁著. 保留所有權利.",
      form: {
        title: "給我留言",
        nameLabel: "您的名字",
        contactLabel: "聯絡方式",
        messageLabel: "留言內容",
        submit: "發送留言",
        submitting: "發送中...",
        success: "留言發送成功！",
        error: "發送失敗，請重試。",
        close: "關閉",
      },
    },
  },
  'ja': {
    nav: {
      about: "プロフィール",
      projects: "プロジェクト",
      education: "学歴",
      contact: "お問い合わせ",
    },
    hero: {
      greeting: "こんにちは、梁著です。",
      role: "学生 & 探求者",
      description: "芸術と技術を融合させた、優雅なデジタル体験を創造することに尽力しています。\nミニマリズム、パフォーマンス、アクセシビリティを重視しています。",
      cta: "もっと詳しく",
    },
    about: {
      title: "プロフィール",
      content: [
        "梁著（Liang Zhu）と申します。現在、香港科技大学（広州）の1年生です。まだ研究経験は浅いですが、大学での努力と探求を通じて、興味のある分野で経験を積み、ブレイクスルーを達成できると信じています。",
        "個人の成長を非常に重視しており、学術的な向上だけでなく、多方面での実践を通じて視野を広げたいと考えています。趣味は外国語、タイポグラフィ、そしてポストレター交換（Postcrossing）です。これらは世界をより深く理解し、視野を広げる助けとなっています。",
        "私の学習経験や興味についてご質問があれば、いつでもご連絡ください！ウェブサイトをご覧いただきありがとうございます。私のことをもっと知っていただければ幸いです！",
      ],
      postcrossingLabel: "Postcrossingのプロフィールを見る",
    },
    projects: {
      title: "プロジェクト",
      viewProject: "プロジェクトを見る",
      items: [
        {
          title: "日本語動詞活用練習",
          description: "Gemini AIを活用した、日本語の動詞活用を練習するためのインタラクティブなツールです。",
          link: "https://jp-verb-practice.pigcasso6.top"
        }
      ]
    },
    education: {
      title: "学歴",
      items: [
        {
          period: "2025 - 現在",
          school: "香港科技大学（広州）",
          url: "https://hkust-gz.edu.cn",
        },
        {
          period: "2022 - 2025",
          school: "深セン外国語学校（グループ）高等部",
          url: "https://www.sfls.net.cn",
        },
        {
          period: "2019 - 2022",
          school: "深セン中学（中学部）",
          url: "https://www.shenzhong.net",
        },
        {
          period: "2013 - 2019",
          school: "香港中文大学（深セン）付属天健小学校",
          url: "http://tjxx.szftedu.cn",
        },
        {
          period: "2009 - 2013",
          school: "深セン市第八幼稚園",
          noUrlTooltip: "深セン市第八幼稚園の公式サイトはありません。",
        },
      ],
    },
    contact: {
      title: "お問い合わせ",
      description: "学習経験や趣味についての議論、学術交流など、いつでも歓迎します。",
      emailLabel: "メールを送る",
      leaveMessageBtn: "メッセージを残す",
      footerText: "© 2025 Liang Zhu. All Rights Reserved.",
      form: {
        title: "メッセージを残す",
        nameLabel: "お名前",
        contactLabel: "連絡先",
        messageLabel: "メッセージ内容",
        submit: "送信",
        submitting: "送信中...",
        success: "メッセージを送信しました！",
        error: "送信に失敗しました。再試行してください。",
        close: "閉じる",
      },
    },
  },
};