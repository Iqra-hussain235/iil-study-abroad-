export const COACHING_SERVICES = [
  {
    id: "english",
    title: "English",
    levels: ["Basic", "Moderate", "Advanced", "Professional"],
  },
  {
    id: "german",
    title: "German",
    levels: ["A1", "A2", "B1", "B2", "C1", "C2"],
  },
  {
    id: "french",
    title: "French",
    levels: ["A1", "A2", "B1", "B2", "C1", "C2"],
  },
  {
    id: "ielts",
    title: "IELTS",
    levels: ["Academic", "General"],
  },
  {
    id: "pte",
    title: "PTE",
    levels: ["PTE Academic", "PTE Academic UKVI", "PTE Core"],
  },
  {
    id: "oet",
    title: "OET",
    levels: [],
  },
  {
    id: "celpip",
    title: "CELPIP",
    levels: ["CELPIP General", "CELPIP General LS"],
  },
  {
    id: "toefl",
    title: "TOEFL",
    levels: ["TOEFL iBT", "TOEFL ITP", "TOEFL Essentials"],
  },
  {
    id: "duolingo",
    title: "Duolingo",
    levels: [],
  },
  {
    id: "train-the-trainer",
    title: "Train the Trainer",
    levels: ["TESOL", "TEFL"],
  },
  {
    id: "training-for-career",
    title: "Training for Career",
    levels: ["Interview Preparation"],
  },
];

export const VISA_SERVICES = [
  { id: "study-visa", title: "Study Visa" },
  { id: "work-visa", title: "Work Visa" },
  { id: "visitor-visa", title: "Visitor Visa" },
  { id: "permanent-visa", title: "Permanent Visa" },
  { id: "spouse-visa", title: "Spouse Visa" },
];

export const MAIN_SERVICE_CATEGORIES = [
  {
    id: "in-house-coaching",
    title: "In-house Coaching",
    shortDesc: "Classroom-based language & exam preparation with expert mentors.",
    desc: "Explore our in-house coaching courses to improve your English skills and crack English proficiency tests such as IELTS, PTE, TOEFL, learn foreign languages, and more.",
    img: "/inhouse.png",
    icon: "graduation",
    gradient: "from-[#0F4C81] via-blue-700 to-indigo-900",
    glow: "rgba(15, 76, 129, 0.45)",
    accent: "#3b82f6",
    type: "coaching",
    services: COACHING_SERVICES,
  },
  {
    id: "online-coaching",
    title: "Online Coaching",
    shortDesc: "Live & flexible online classes from anywhere in the world.",
    desc: "Take online coaching at International Institute of Language and Study Abroad from anywhere to prepare for IELTS, PTE, TOEFL, foreign languages, and more effectively at your own pace.",
    img: "/online.png",
    icon: "laptop",
    gradient: "from-violet-700 via-purple-700 to-[#0F4C81]",
    glow: "rgba(139, 92, 246, 0.4)",
    accent: "#a78bfa",
    type: "coaching",
    services: COACHING_SERVICES,
  },
  {
    id: "visa-assistance",
    title: "Visa Assistance",
    shortDesc: "End-to-end visa guidance for study, work, and immigration.",
    desc: "Expert guidance for student, work, tourist, and immigration visa applications. We help with documentation, application procedures, and interview preparation to make your international journey smooth and successful.",
    img: "/visa-assistance.png",
    icon: "passport",
    gradient: "from-[#ff2f56] via-rose-600 to-[#0F4C81]",
    glow: "rgba(255, 47, 86, 0.35)",
    accent: "#ff2f56",
    type: "visa",
    services: VISA_SERVICES,
  },
];