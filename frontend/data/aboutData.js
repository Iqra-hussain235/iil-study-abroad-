import { FaLinkedin, FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

// ── Shared content for the About section (About Us / Branches / Social / Career) ──
// Sirf yahin se content badlo, pages automatically update ho jayenge.

export const WHATSAPP_NUMBER = "918630048365";
export const WHATSAPP_MESSAGE =
  "Hi, I'm interested in your services. Please share more information.";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

// ── Social media (same links jo pehle footer me the) ──
export const SOCIAL_PROFILES = [
  {
    name: "LinkedIn",
    desc: "Company updates, hiring news and student success stories.",
    url: "https://www.linkedin.com/company/iilstudyabroad/",
    Icon: FaLinkedin,
    gradient: "from-[#0A66C2] to-[#0b3d7a]",
  },
  {
    name: "Facebook",
    desc: "Events, seminars and daily updates from our community.",
    url: "https://www.facebook.com/iiLstudyabroad",
    Icon: FaFacebook,
    gradient: "from-[#1877F2] to-[#0f4aa8]",
  },
  {
    name: "Instagram",
    desc: "Reels, campus moments and behind-the-scenes at IIL.",
    url: "https://www.instagram.com/iil.studyabroad",
    Icon: FaInstagram,
    gradient: "from-[#f9a03f] via-[#ff2f56] to-[#8a3ab9]",
  },
  {
    name: "WhatsApp",
    desc: "Chat with our counsellors directly for quick answers.",
    url: WHATSAPP_URL,
    Icon: FaWhatsapp,
    gradient: "from-[#25D366] to-[#128C7E]",
  },
];

// ── Branches (abhi sirf Moradabad; naya branch add karna ho to object add kar do) ──
export const BRANCHES = [
  {
    id: "moradabad",
    city: "Moradabad",
    title: "Moradabad Office",
    address: "Main Office, Civil Lines, Moradabad, Uttar Pradesh",
    email: "info@iilmoradabad.com",
    hours: "Mon–Sat: 9:00 AM – 6:00 PM",
    phone: "+91-8630048365",
    mapQuery: "Moradabad,Uttar%20Pradesh",
  },
];

// ── Careers (PLACEHOLDER jobs: apni real openings se replace karna) ──
export const APPLY_EMAIL = "info@iilstudyabroad.com";

export const JOBS = [
  {
    id: "visa-counsellor",
    title: "Visa Counsellor",
    location: "Moradabad",
    experience: "1 - 3 Years",
    type: "Full Time",
    desc: "Counsel students on study, work and visitor visa options and guide them through documentation.",
  },
  {
    id: "ielts-pte-trainer",
    title: "IELTS / PTE Trainer",
    location: "Moradabad",
    experience: "2 - 4 Years",
    type: "Full Time",
    desc: "Train batches for IELTS and PTE with a structured curriculum and weekly mock tests.",
  },
  {
    id: "front-desk-executive",
    title: "Front Desk Executive",
    location: "Moradabad",
    experience: "Fresher - 1 Year",
    type: "Full Time",
    desc: "Handle walk-in enquiries, calls and appointment scheduling for the counselling team.",
  },
];

// ── Countries marquee (About Us page) ──
export const COUNTRIES = [
  "Canada",
  "Australia",
  "New Zealand",
  "USA",
  "UK",
  "Portugal",
  "Ireland",
  "Poland",
  "Singapore",
  "Cyprus",
  "Sweden",
  "Germany",
  "France",
];