import { ContentData, Language } from './types';

export const JlptTooltip = () => (
  <span className="relative inline-block group cursor-help underline decoration-dashed underline-offset-4 decoration-slate-400 dark:decoration-slate-500 hover:decoration-indigo-500 dark:hover:decoration-cyan-400 transition-colors">
    JLPT
    <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs px-2.5 py-1.5 text-xs font-sans font-normal text-white bg-slate-800 dark:bg-slate-200 dark:text-slate-900 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30">
      Japanese-Language Proficiency Test
      <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-800 dark:border-t-slate-200"></span>
    </span>
  </span>
);

export const JeesTooltip = () => (
  <span className="relative inline-block group cursor-help underline decoration-dashed underline-offset-4 decoration-slate-400 dark:decoration-slate-500 hover:decoration-indigo-500 dark:hover:decoration-cyan-400 transition-colors">
    JEES
    <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs px-2.5 py-1.5 text-xs font-sans font-normal text-white bg-slate-800 dark:bg-slate-200 dark:text-slate-900 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30">
      Japan Educational Exchanges and Services
      <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-800 dark:border-t-slate-200"></span>
    </span>
  </span>
);

export const CONTENT: Record<Language, ContentData> = {
  en: {
    nav: {
      about: "About",
      skills: "Skills & Achievements",
      projects: "Projects",
      education: "Education",
      contact: "Contact",
      switchToModern: "Switch to Modern Version",
      switchToClassic: "Switch to Classic Version",
    },
    theme: {
      light: "Light Mode",
      dark: "Dark Mode",
    },
    hero: {
      greeting: "Hello, I'm Liang Zhu.",
      role: "Student & Creative Explorer",
      description: "I craft elegant digital experiences that merge art with technology.\nDedicated to simplicity and accessible design.",
      cta: "View Details",
      typewriterStrings: [
        "Dedicated to crafting elegant digital experiences.",
        "Merging art with technology perfectly.",
        "Focusing on minimalism and accessible design."
      ]
    },
    about: {
      title: "About Me",
      content: [
        "I am Liang Zhu, currently a sophomore at The Hong Kong University of Science and Technology (Guangzhou). Although I don't have much research experience yet, I believe that through continuous effort and exploration during my university years, I will gradually accumulate experience and make breakthroughs in the fields I am interested in.",
        "I pay great attention to personal growth, pursuing progress not only academically but also hoping to broaden my horizons through various practices. My biggest hobbies are foreign languages, typography, and postcard exchange (Postcrossing), all of which allow me to understand the world more deeply and broaden my thinking.",
        "If you have any questions about my learning experience or interests, please feel free to contact me! Thank you for visiting my webpage, and I hope you can learn more about me here!",
      ],
      postcrossingLabel: "Visit My Postcrossing Profile",
    },
    skills: {
      title: "Skills & Achievements",
      japaneseCategoryTitle: "Japanese Proficiency",
      japaneseIntro: [
        "My Japanese has been entirely self-taught. Since first learning the hiragana and katakana syllabaries in 2019, I have studied the language on and off for over seven years.",
        "I have accumulated more than 60 hours of one-on-one, in-person Japanese teaching experience, primarily working with beginners and learners at the JLPT N5 level, helping them build a solid foundation in the language.",
        "The Japanese-Language Proficiency Test (JLPT) is the world's most widely recognized certification for Japanese proficiency. Jointly administered by the Japan Foundation and Japan Educational Exchanges and Services (JEES), it consists of five levels, from N5 (beginner) to N1 (the highest level). Below are my JLPT certificates and score reports."
      ],
      n1Title: "JLPT N1",
      n1Score: "144 / 180",
      n1Breakdown: {
        languageKnowledge: {
          label: (
            <>
              <span className="hidden sm:inline">Lang. Knowledge</span>
              <span className="inline sm:hidden">Language Knowledge</span>
            </>
          ),
          value: "45 / 60",
          percentage: 75,
        },
        reading: { label: "Reading", value: "60 / 60", percentage: 100 },
        listening: { label: "Listening", value: "39 / 60", percentage: 65 },
        percentileRank: { label: "Percentile Rank", value: "94.1%", percentage: 94.1 },
      },
      n2Title: "JLPT N2",
      n2Score: "177 / 180",
      n2Breakdown: {
        languageKnowledge: {
          label: (
            <>
              <span className="hidden sm:inline">Lang. Knowledge</span>
              <span className="inline sm:hidden">Language Knowledge</span>
            </>
          ),
          value: "60 / 60",
          percentage: 100,
        },
        reading: { label: "Reading", value: "60 / 60", percentage: 100 },
        listening: { label: "Listening", value: "57 / 60", percentage: 95 },
        percentileRank: { label: "Percentile Rank", value: "99.4%", percentage: 99.4 },
      },
      viewCertificateBtn: "View Certificate",
      viewReportBtn: "View Score Report",
      flipBtn: "Flip",
      closeBtn: "Close",
    },
    projects: {
      title: "Projects",
      viewProject: "View Project",
      items: [
        {
          title: "Kanbun HTML Converter",
          description: "",
          link: "https://kanbun.pigcasso6.top",
          iconKey: "kanbun"
        },
        {
          title: "Japanese Verb Conjugation",
          description: "",
          link: "https://jp-verb-practice.pigcasso6.top",
          iconKey: "verb"
        },
        {
          title: "Futures Calculator",
          description: "",
          link: "https://futures.pigcasso6.top",
          iconKey: "futures"
        },
        {
          title: "Gambler Simulator",
          description: "",
          link: "https://gamble.pigcasso6.top",
          iconKey: "gamble"
        },
        {
          title: "Minecraft Circle Generator",
          description: "",
          link: "https://mccircle.pigcasso6.top/",
          iconKey: "circle"
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
      ],
    },
    contact: {
      title: "Get in Touch",
      description: "I'm always open to discussing new ideas, academic exchanges, or sharing stories.",
      emailLabel: "Email me at",
      leaveMessageBtn: "Leave a Message",
      footerText: "© 2025—2026 Liang Zhu. All Rights Reserved.",
      icpText: "ICP Filing: 粤 ICP 备 2025513331 号",
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
      skills: "能力与成果",
      projects: "项目展示",
      education: "教育经历",
      contact: "联系我",
      switchToModern: "切换至新版页面",
      switchToClassic: "切换至旧版页面",
    },
    theme: {
      light: "浅色模式",
      dark: "深色模式",
    },
    hero: {
      greeting: "你好，我是梁著。",
      role: "学生 & 探索者",
      description: "我致力于打造优雅的数字体验，将艺术与技术完美融合。\n专注于极简主义和无障碍设计。",
      cta: "了解更多",
      typewriterStrings: [
        "我致力于打造优雅的数字体验。",
        "将艺术与技术完美融合。",
        "专注于极简主义和无障碍设计。"
      ]
    },
    about: {
      title: "关于我",
      content: [
        "我是梁著，目前是香港科技大学（广州）的大二学生。虽然现在我还没有太多科研经历，但我相信通过大学期间的不断努力和探索，我会逐渐在自己感兴趣的领域积累经验并有所突破。",
        "我非常注重个人成长，不仅仅在学术上追求进步，也希望通过多方面的实践，拓宽自己的视野。我最大的兴趣爱好是外语、排版和明信片交换（Postcrossing），这些都让我更深入地了解世界，开阔思维。",
        "如果你对我的学习经历或兴趣有任何问题，欢迎随时联系我！谢谢访问我的网页，希望你能从中了解我更多！",
      ],
      postcrossingLabel: "访问我的 Postcrossing 主页",
    },
    skills: {
      title: "能力与成果",
      japaneseCategoryTitle: "日语能力",
      japaneseIntro: [
        "我的日语完全通过自学习得。自2019年第一次接触五十音图以来，至今已断断续续学习七年有余。",
        "目前，我累计拥有60小时以上线下一对一日语教学的经验，主要面向零基础至N5水平的学习者，帮助他们建立日语学习基础。",
        <>
          日本语能力测试（<JlptTooltip />）是目前国际上最具代表性的日语水平认证考试，由日本国际交流基金会（Japan Foundation）与日本国际教育支援协会（<JeesTooltip />）共同举办。考试共分为N5至N1五个等级，其中N5为入门级，N1为最高级别。以下展示的是我获得的JLPT证书及成绩。
        </>
      ],
      n1Title: "日本语能力测试（JLPT）N1",
      n1Score: "144 / 180 分",
      n1Breakdown: {
        languageKnowledge: { label: "语言知识", value: "45 / 60", percentage: 75 },
        reading: { label: "阅读", value: "60 / 60", percentage: 100 },
        listening: { label: "听力", value: "39 / 60", percentage: 65 },
        percentileRank: { label: "百分位排名", value: "94.1%", percentage: 94.1 },
      },
      n2Title: "日本语能力测试（JLPT）N2",
      n2Score: "177 / 180 分",
      n2Breakdown: {
        languageKnowledge: { label: "语言知识", value: "60 / 60", percentage: 100 },
        reading: { label: "阅读", value: "60 / 60", percentage: 100 },
        listening: { label: "听力", value: "57 / 60", percentage: 95 },
        percentileRank: { label: "百分位排名", value: "99.4%", percentage: 99.4 },
      },
      viewCertificateBtn: "查看证书",
      viewReportBtn: "查看成绩单",
      flipBtn: "翻面",
      closeBtn: "关闭",
    },
    projects: {
      title: "项目展示",
      viewProject: "查看项目",
      items: [
        {
          title: "汉文HTML转换器",
          description: "",
          link: "https://kanbun.pigcasso6.top",
          iconKey: "kanbun"
        },
        {
          title: "日语动词变形练习",
          description: "",
          link: "https://jp-verb-practice.pigcasso6.top",
          iconKey: "verb"
        },
        {
          title: "合约计算器",
          description: "",
          link: "https://futures.pigcasso6.top",
          iconKey: "futures"
        },
        {
          title: "赌徒模拟器",
          description: "",
          link: "https://gamble.pigcasso6.top",
          iconKey: "gamble"
        },
        {
          title: "我的世界圆形生成器",
          description: "",
          link: "https://mccircle.pigcasso6.top/",
          iconKey: "circle"
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
      ],
    },
    contact: {
      title: "联系我",
      description: "我随时欢迎讨论学习经历、兴趣爱好，或进行学术交流。",
      emailLabel: "发送邮件至",
      leaveMessageBtn: "给我留言",
      footerText: "© 2025—2026 Liang Zhu. 保留所有权利。",
      icpText: "备案号：粤 ICP 备 2025513331 号",
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
      skills: "能力與成果",
      projects: "項目展示",
      education: "教育經歷",
      contact: "聯絡我",
      switchToModern: "切換至新版頁面",
      switchToClassic: "切換至舊版頁面",
    },
    theme: {
      light: "淺色模式",
      dark: "深色模式",
    },
    hero: {
      greeting: "你好，我是梁著。",
      role: "學生 & 探索者",
      description: "我致力於打造優雅的數位體驗，將藝術與技術完美融合。\n專注於極簡主義和無障礙設計。",
      cta: "了解更多",
      typewriterStrings: [
        "我致力於打造優雅的數位體驗。",
        "將藝術與技術完美融合。",
        "專注於極簡主義和無障礙設計。"
      ]
    },
    about: {
      title: "關於我",
      content: [
        "我是梁著，目前是香港科技大學（廣州）的大二學生。雖然現在我還沒有太多科研經歷，但我相信透過大學期間的不斷努力和探索，我會逐漸在自己感興趣的領域積累經驗並有所突破。",
        "我非常注重個人成長，不僅僅在學術上追求進步，也希望透過多方面的實踐，拓寬自己的視野。我最大的興趣愛好是外語、排版和明信片交換（Postcrossing），這些都讓我更深入地瞭解世界，開闊思維。",
        "如果你對我的學習經歷或興趣有任何問題，歡迎隨時聯絡我！謝謝訪問我的網頁，希望你能從中瞭解我更多！",
      ],
      postcrossingLabel: "訪問我的 Postcrossing 主頁",
    },
    skills: {
      title: "能力與成果",
      japaneseCategoryTitle: "日語能力",
      japaneseIntro: [
        "我的日語完全透過自學習得。自2019年第一次接觸五十音圖以來，至今已斷斷續續學習七年有餘。",
        "目前，我累計擁有60小時以上線下一對一日語教學的經驗，主要面向零基礎至N5水平的學習者，幫助他們建立日語學習基礎。",
        <>
          日本語能力測試（<JlptTooltip />）是目前國際上最具代表性的日語水平認證考試，由日本國際交流基金會（Japan Foundation）與日本國際教育支援協會（<JeesTooltip />）共同舉辦。考試共分為N5至N1五個等級，其中N5為入門級，N1為最高級別。以下展示的是我獲得的JLPT證書及成績。
        </>
      ],
      n1Title: "日本語能力試驗（JLPT）N1",
      n1Score: "144 / 180 分",
      n1Breakdown: {
        languageKnowledge: { label: "語言知識", value: "45 / 60", percentage: 75 },
        reading: { label: "閱讀", value: "60 / 60", percentage: 100 },
        listening: { label: "聽力", value: "39 / 60", percentage: 65 },
        percentileRank: { label: "百分位排名", value: "94.1%", percentage: 94.1 },
      },
      n2Title: "日本語能力試驗（JLPT）N2",
      n2Score: "177 / 180 分",
      n2Breakdown: {
        languageKnowledge: { label: "語言知識", value: "60 / 60", percentage: 100 },
        reading: { label: "閱讀", value: "60 / 60", percentage: 100 },
        listening: { label: "聽力", value: "57 / 60", percentage: 95 },
        percentileRank: { label: "百分位排名", value: "99.4%", percentage: 99.4 },
      },
      viewCertificateBtn: "查看證書",
      viewReportBtn: "查看成績單",
      flipBtn: "翻面",
      closeBtn: "關閉",
    },
    projects: {
      title: "項目展示",
      viewProject: "查看項目",
      items: [
        {
          title: "漢文HTML轉換器",
          description: "",
          link: "https://kanbun.pigcasso6.top",
          iconKey: "kanbun"
        },
        {
          title: "日語動詞變形練習",
          description: "",
          link: "https://jp-verb-practice.pigcasso6.top",
          iconKey: "verb"
        },
        {
          title: "合約計算器",
          description: "",
          link: "https://futures.pigcasso6.top",
          iconKey: "futures"
        },
        {
          title: "賭徒模擬器",
          description: "",
          link: "https://gamble.pigcasso6.top",
          iconKey: "gamble"
        },
        {
          title: "我的世界圓形生成器",
          description: "",
          link: "https://mccircle.pigcasso6.top/",
          iconKey: "circle"
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
      ],
    },
    contact: {
      title: "聯絡我",
      description: "我隨時歡迎討論學習經歷、興趣愛好，或進行學術交流。",
      emailLabel: "發送郵件至",
      leaveMessageBtn: "給我留言",
      footerText: "© 2025—2026 Liang Zhu. 保留所有權利。",
      icpText: "備案號：粤 ICP 备 2025513331 号",
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
      skills: "スキル・実績",
      projects: "プロジェクト",
      education: "学歴",
      contact: "お問い合わせ",
      switchToModern: "新バージョンへ",
      switchToClassic: "旧バージョンへ",
    },
    theme: {
      light: "ライトモード",
      dark: "ダークモード",
    },
    hero: {
      greeting: "こんにちは、梁著です。",
      role: "学生 & 探求者",
      description: "芸術と技術を融合し、洗練されたデジタル体験づくりに取り組んでいます。\nミニマリズムとアクセシビリティを大切にしています。",
      cta: "もっと詳しく",
      typewriterStrings: [
        "芸術と技術を融合させる。",
        "洗練されたデジタル体験をつくる。",
        "ミニマリズムとアクセシビリティを大切にする。"
      ]
    },
    about: {
      title: "プロフィール",
      content: [
        <>
          <ruby>梁著<rt>リョウチョ</rt></ruby>と申します。現在、香港科技大学（広州）に在学している2年生です。研究経験はまだ多くありませんが、大学での学びや挑戦を通じて興味のある分野で経験を積み、将来は社会に価値をもたらす研究や成果につなげられるよう努力しています。
        </>,
        "自己成長を大切にしており、学術的な知識を深めるだけでなく、さまざまな経験を通じて視野を広げたいと考えています。趣味は外国語の学習、タイポグラフィ、そしてPostcrossing（ポストカード交換）です。異なる文化や価値観に触れることが、自分自身の成長につながると考えています。",
        "学習や興味のある分野についてご質問などがございましたら、どうぞお気軽にご連絡ください。最後までご覧いただき、ありがとうございます。このウェブサイトを通じて、私のことを少しでも知っていただければ幸いです。",
      ],
      postcrossingLabel: "Postcrossingのプロフィールを見る",
    },
    skills: {
      title: "スキル・実績",
      japaneseCategoryTitle: "日本語能力",
      japaneseIntro: [
        "私の日本語は、すべて独学で身につけたものです。2019年に初めて五十音を学んで以来、7年以上にわたり、断続的に学習を続けてきました。",
        "これまでに、対面でのマンツーマン日本語指導を60時間以上行った経験があり、主に日本語初心者からJLPT N5レベルまでの学習者を対象に、基礎力の定着をサポートしてきました。",
        <>
          日本語能力試験（<JlptTooltip />）は、日本語能力を測る国際的に最も広く認知されている資格試験です。国際交流基金（Japan Foundation）と日本国際教育支援協会（<JeesTooltip />）が共同で実施しており、N5（入門レベル）からN1（最高レベル）までの5段階で構成されています。以下に、私が取得したJLPTの認定証および成績を掲載しています。
        </>
      ],
      n1Title: "日本語能力試験（JLPT）N1",
      n1Score: "144 / 180点",
      n1Breakdown: {
        languageKnowledge: { label: "言語知識", value: "45 / 60", percentage: 75 },
        reading: { label: "読解", value: "60 / 60", percentage: 100 },
        listening: { label: "聴解", value: "39 / 60", percentage: 65 },
        percentileRank: { label: "パーセンタイル順位", value: "94.1%", percentage: 94.1 },
      },
      n2Title: "日本語能力試験（JLPT）N2",
      n2Score: "177 / 180点",
      n2Breakdown: {
        languageKnowledge: { label: "言語知識", value: "60 / 60", percentage: 100 },
        reading: { label: "読解", value: "60 / 60", percentage: 100 },
        listening: { label: "聴解", value: "57 / 60", percentage: 95 },
        percentileRank: { label: "パーセンタイル順位", value: "99.4%", percentage: 99.4 },
      },
      viewCertificateBtn: "認定書を見る",
      viewReportBtn: "成績証明書を見る",
      flipBtn: "裏返す",
      closeBtn: "閉じる",
    },
    projects: {
      title: "プロジェクト",
      viewProject: "プロジェクトを見る",
      items: [
        {
          title: "漢文HTMLコンバーター",
          description: "",
          link: "https://kanbun.pigcasso6.top",
          iconKey: "kanbun"
        },
        {
          title: "日本語動詞活用練習",
          description: "",
          link: "https://jp-verb-practice.pigcasso6.top",
          iconKey: "verb"
        },
        {
          title: "先物計算機",
          description: "",
          link: "https://futures.pigcasso6.top",
          iconKey: "futures"
        },
        {
          title: "ギャンブラーシミュレーター",
          description: "",
          link: "https://gamble.pigcasso6.top",
          iconKey: "gamble"
        },
        {
          title: "マイクラ円ジェネレーター",
          description: "",
          link: "https://mccircle.pigcasso6.top/",
          iconKey: "circle"
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
      ],
    },
    contact: {
      title: "お問い合わせ",
      description: "学習や趣味、研究に関するご質問や交流は、いつでもお気軽にお寄せください。",
      emailLabel: "メールを送る",
      leaveMessageBtn: "メッセージを送る",
      footerText: "© 2025—2026 Liang Zhu. 無断複写・転載を禁じます。",
      icpText: "届出番号：粤 ICP 备 2025513331 号",
      form: {
        title: "メッセージを送る",
        nameLabel: "お名前",
        contactLabel: "連絡先",
        messageLabel: "メッセージ内容",
        submit: "送信",
        submitting: "送信中...",
        success: "送信が完了しました。",
        error: "送信に失敗しました。再試行してください。",
        close: "閉じる",
      },
    },
  },
};