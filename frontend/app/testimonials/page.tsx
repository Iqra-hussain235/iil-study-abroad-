"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  animate,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import {
  FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube,
  FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaGoogle, FaQuoteLeft,
} from "react-icons/fa";
import GoogleReviews from "../../components/GoogleReviews";
import { testimonials, type Testimonial } from "../../data/testimonials";
import { SITE, whatsappLink } from "../../data/siteInfo";
import { galleryImages, videos } from "../../data/media";

const CATEGORIES = [
  "Study Visa",
  "IELTS / PTE",
  "Spoken English",
  "Foreign Languages",
  "Immigration",
] as const;
type Filter = (typeof CATEGORIES)[number];

const TRUST = [
  { title: "Personal attention", text: "Our trainers give every student individual focus. It is the most repeated point in our reviews." },
  { title: "Practical teaching", text: "Real-life speaking, grammar and confidence building, not rote learning." },
  { title: "Exam-level practice", text: "IELTS speaking practice, mock tests and personal feedback." },
  { title: "Clear guidance", text: "Honest guidance from profile evaluation to admission and visa." },
];

const JOURNEY = [
  { title: "Free counselling", text: "Tell us your goal, destination and budget." },
  { title: "Preparation", text: "IELTS, PTE, OET or language classes, matched to your level." },
  { title: "Profile & admission", text: "Profile evaluation and university or course selection." },
  { title: "Visa filing", text: "Complete support with documents and your visa application." },
];

// media.js khaali ho to TypeScript type error na de
const videoList: { id: string; title: string }[] = videos;

const TOPICS = [
  "IELTS", "PTE", "OET", "Spoken English", "German", "French", "Japanese",
  "Study Abroad", "Visa Guidance", "Personality Development",
];

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

function CountUp({ to, decimals = 0, suffix = "" }: { to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) return setV(to);
    const c = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: setV });
    return () => c.stop();
  }, [inView, to, reduce]);
  return <span ref={ref}>{v.toFixed(decimals)}{suffix}</span>;
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} viewBox="0 0 20 20" aria-hidden="true" className={`h-4 w-4 ${n <= rating ? "fill-amber-400" : "fill-slate-200"}`}>
          <path d="M10 1.5l2.6 5.5 6 .8-4.4 4.2 1.1 6L10 15l-5.3 3 1.1-6L1.4 7.8l6-.8L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ t, size = "h-12 w-12" }: { t: Testimonial; size?: string }) {
  if (t.photo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={t.photo} alt={t.name} className={`${size} rounded-full object-cover`} />;
  }
  const initials = t.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div className={`${size} flex items-center justify-center rounded-full bg-gradient-to-br from-[#0F4C81] to-sky-500 font-semibold text-white`}>
      {initials}
    </div>
  );
}

const meta = (t: Testimonial) =>
  [t.course, t.country, t.source].filter(Boolean).join(" · ");

const CAT_STYLE: Record<string, { bar: string; chip: string }> = {
  "Study Visa": { bar: "from-red-500 to-orange-400", chip: "bg-red-50 text-red-600" },
  "IELTS / PTE": { bar: "from-[#0F4C81] to-sky-400", chip: "bg-blue-50 text-[#0F4C81]" },
  "Spoken English": { bar: "from-emerald-500 to-teal-400", chip: "bg-emerald-50 text-emerald-700" },
  "Foreign Languages": { bar: "from-amber-500 to-yellow-400", chip: "bg-amber-50 text-amber-700" },
  Immigration: { bar: "from-violet-500 to-fuchsia-400", chip: "bg-violet-50 text-violet-700" },
};

function ReviewCard({ t, i }: { t: Testimonial; i: number }) {
  const [open, setOpen] = useState(false);
  const long = t.text.length > 200;
  const shown = long && !open ? t.text.slice(0, 200).trimEnd() + "…" : t.text;
  const st = CAT_STYLE[t.category] ?? CAT_STYLE["IELTS / PTE"];
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: Math.min(i, 5) * 0.07 }}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-2xl hover:shadow-blue-900/10"
    >
      <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${st.bar}`} />
      <FaQuoteLeft aria-hidden="true" className="absolute right-6 top-8 h-9 w-9 text-slate-100 transition-colors duration-300 group-hover:text-blue-100" />
      <div className="flex items-center gap-3">
        <Stars rating={t.rating} />
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${st.chip}`}>{t.category}</span>
      </div>
      <p className="mt-5 flex-1 text-[15px] leading-7 text-slate-700">{shown}</p>
      {long && (
        <button type="button" onClick={() => setOpen(!open)} className="mt-3 w-fit text-sm font-semibold text-[#0F4C81] hover:underline">
          {open ? "Show less" : "Read more"}
        </button>
      )}
      <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
        <Avatar t={t} size="h-12 w-12 ring-4 ring-slate-50" />
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-slate-900">{t.name}</p>
          <p className="truncate text-xs text-slate-500">{t.course}</p>
        </div>
        {t.source === "Google" && <FaGoogle aria-label="Google review" className="h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-[#0F4C81]" />}
      </div>
    </motion.article>
  );
}

function FeaturedReview({ t }: { t: Testimonial }) {
  return (
    <Reveal>
      <article className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-[#eaf3fb] to-white p-8 md:p-12">
        <span aria-hidden="true" className="pointer-events-none absolute -top-6 right-6 select-none text-[9rem] font-serif leading-none text-blue-200/60">”</span>
        <Stars rating={t.rating} />
        <blockquote className="relative mt-5 max-w-3xl text-lg leading-relaxed text-slate-800 md:text-2xl">{t.text}</blockquote>
        <div className="relative mt-7 flex items-center gap-4">
          <Avatar t={t} size="h-14 w-14" />
          <div>
            <p className="font-semibold text-slate-900">{t.name}</p>
            <p className="text-sm text-slate-600">{meta(t)}</p>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function Gallery() {
  const reduce = useReducedMotion();
  const n = galleryImages.length;
  const [idx, setIdx] = useState<number[]>(() => galleryImages.map(() => 0));
  const [failed, setFailed] = useState<boolean[]>(() => galleryImages.map(() => false));
  const [open, setOpen] = useState<number | null>(null);

  const markError = (i: number) => {
    if (idx[i] < galleryImages[i].srcs.length - 1) setIdx((a) => a.map((v, k) => (k === i ? v + 1 : v)));
    else setFailed((a) => a.map((v, k) => (k === i ? true : v)));
  };
  const step = (dir: 1 | -1) =>
    setOpen((cur) => {
      if (cur === null) return cur;
      for (let k = 1; k <= n; k++) {
        const j = (cur + dir * k + n * 2) % n;
        if (!failed[j]) return j;
      }
      return cur;
    });

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, failed]);

  const arrow = "absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-2xl text-white backdrop-blur transition-colors hover:bg-white/30";

  return (
    <>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {galleryImages.map((g, i) => (
          <motion.div
            key={g.alt}
            initial={{ opacity: 0, y: 36, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.button
              type="button"
              disabled={failed[i]}
              onClick={() => setOpen(i)}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
              aria-label={`Open photo: ${g.label}`}
              className="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-2xl bg-gradient-to-br from-[#eaf3fb] to-slate-100 shadow-md transition-shadow hover:shadow-2xl hover:shadow-blue-900/20 disabled:cursor-default"
            >
              <motion.div layoutId={`gal-${i}`} className="absolute inset-0 overflow-hidden rounded-2xl">
                {!failed[i] && (
                  <motion.img
                    src={g.srcs[idx[i]]}
                    alt={g.alt}
                    onError={() => markError(i)}
                    animate={reduce ? undefined : { scale: [1, 1.08, 1] }}
                    transition={{ duration: 14 + i * 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ objectPosition: g.position }}
                    className="h-full w-full object-cover"
                  />
                )}
              </motion.div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-100" />
              <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-800 transition-transform group-hover:-translate-y-1">{g.label}</span>
              {!failed[i] && (
                <span className="absolute right-3 top-3 flex h-8 w-8 scale-75 items-center justify-center rounded-full bg-white/90 text-slate-800 opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100" aria-hidden="true">
                  <svg viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3h5v5M8 17H3v-5M17 3l-6 6M3 17l6-6" /></svg>
                </span>
              )}
            </motion.button>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={galleryImages[open].label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm"
          >
            <motion.div
              layoutId={`gal-${open}`}
              onClick={(e) => e.stopPropagation()}
              className="relative overflow-hidden rounded-2xl bg-black shadow-2xl"
            >
              <img
                src={galleryImages[open].srcs[idx[open]]}
                alt={galleryImages[open].alt}
                onError={() => markError(open)}
                className="max-h-[80vh] max-w-[92vw] object-contain"
              />
            </motion.div>
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/15 px-5 py-2 text-sm font-medium text-white backdrop-blur">
              {galleryImages[open].label} · {open + 1} / {n}
            </p>
            <button type="button" aria-label="Close" onClick={(e) => { e.stopPropagation(); setOpen(null); }} className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-xl text-white backdrop-blur transition-colors hover:bg-red-500">✕</button>
            <button type="button" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); step(-1); }} className={`${arrow} left-4`}>‹</button>
            <button type="button" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); step(1); }} className={`${arrow} right-4`}>›</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  const picks = testimonials
    .filter((t) => !t.text.endsWith("…") && t.text.length <= 150)
    .slice(0, 3);
  const tilt = ["lg:-rotate-2", "lg:ml-10 lg:rotate-2", "lg:ml-3 lg:-rotate-1"];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#eaf3fb] via-white to-white px-6 pb-24 pt-32">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(#0F4C81_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-blue-300/30 blur-3xl"
        animate={reduce ? undefined : { x: [0, 40, 0], y: [0, 25, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-red-300/30 blur-3xl"
        animate={reduce ? undefined : { x: [0, -40, 0], y: [0, -25, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/" className="mb-4 inline-block text-sm text-slate-500 transition-colors hover:text-[#0F4C81]">
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-extrabold leading-[1.05] text-slate-900 md:text-6xl">
            Student <span className="text-red-500">Success Stories</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
            Real feedback from our students across study abroad, IELTS / PTE, spoken English and foreign languages.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#reviews" className="rounded-full bg-[#0F4C81] px-7 py-3 font-semibold text-white shadow-lg shadow-blue-900/20 transition-transform hover:-translate-y-0.5">
              Read the reviews
            </a>
            <Link href="/enquiry" className="rounded-full border border-slate-300 bg-white px-7 py-3 font-semibold text-slate-800 transition-colors hover:border-[#0F4C81] hover:text-[#0F4C81]">
              Book free counselling
            </Link>
          </div>
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-5 py-3 shadow-sm backdrop-blur">
            <Stars rating={5} />
            <span className="text-sm text-slate-700">
              <strong className="text-slate-900">{SITE.googleRating}</strong> on Google · {SITE.googleReviews}+ reviews
            </span>
          </div>
        </motion.div>

        <div className="relative space-y-3">
          {picks.map((t, i) => (
            <motion.div
              key={t.name + i}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
            >
              <motion.div
                animate={reduce ? undefined : { y: [0, -10, 0] }}
                transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
                className={`max-w-md rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5 ${tilt[i]}`}
              >
                <Stars rating={t.rating} />
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-700">“{t.text}”</p>
                <div className="mt-4 flex items-center gap-3">
                  <Avatar t={t} size="h-9 w-9" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.course} · {t.source}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const LINKS = [
  ["Home", "/"], ["About", "/about"], ["Services", "/services"], ["Visa", "/visa"],
  ["Academy", "/academy"], ["Events", "/events"], ["Testimonials", "/testimonials"],
  ["Contact", "/contact"], ["Enquiry", "/enquiry"],
] as const;

function SiteFooter() {
  const socials = [
    { href: SITE.socials.instagram, label: "Instagram", Icon: FaInstagram },
    { href: SITE.socials.facebook, label: "Facebook", Icon: FaFacebookF },
    { href: SITE.socials.linkedin, label: "LinkedIn", Icon: FaLinkedinIn },
    { href: SITE.socials.youtube, label: "YouTube", Icon: FaYoutube },
  ];
  const contact = [
    { Icon: FaPhoneAlt, label: "Call us", text: SITE.phone, href: `tel:${SITE.phone}` },
    { Icon: FaWhatsapp, label: "WhatsApp", text: SITE.phone, href: whatsappLink("Hi, I would like more information.") },
    { Icon: FaEnvelope, label: "Email", text: SITE.email, href: `mailto:${SITE.email}` },
    { Icon: FaMapMarkerAlt, label: "Visit us", text: SITE.address, href: undefined },
  ];
  return (
    <footer className="relative overflow-hidden bg-[#0b2540] text-white">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-500 via-[#0F4C81] to-sky-400" />
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-red-400/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.4fr]">
        <div>
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/IIL-logo.png" alt="IIL logo" className="h-16 w-16 shrink-0 rounded-full bg-white object-contain p-1 shadow-lg ring-4 ring-white/20" />
            <h3 className="text-xl font-bold leading-snug">{SITE.name}</h3>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-blue-100">
            IELTS, PTE, OET, spoken English, foreign languages and study abroad guidance in Moradabad.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
            {SITE.yearsExperience}+ years of experience
          </div>
          <div className="mt-6 flex gap-3">
            {socials.map(({ href, label, Icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -4 }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-red-500"
              >
                <Icon className="h-4 w-4" />
              </motion.a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">Quick links</h4>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-blue-100">
            {LINKS.map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="transition-colors hover:text-white hover:underline">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">Get in touch</h4>
          <ul className="space-y-4">
            {contact.map(({ Icon, label, text, href }) => {
              const body = (
                <>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10"><Icon className="h-4 w-4" /></span>
                  <span>
                    <span className="block text-xs text-blue-200">{label}</span>
                    <span className="block text-sm font-medium leading-snug">{text}</span>
                  </span>
                </>
              );
              return (
                <li key={label}>
                  {href ? (
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="flex items-start gap-3 transition-transform hover:translate-x-1">{body}</a>
                  ) : (
                    <div className="flex items-start gap-3">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-white/10 px-6 py-5 text-xs text-blue-200 md:flex-row">
        <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="rounded-full border border-white/20 px-4 py-1.5 font-medium text-white transition-colors hover:bg-white/10"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}

export default function TestimonialsPage() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  // Only categories that have reviews (no "All" tab)
  const tabs = CATEGORIES.filter((c) => testimonials.some((t) => t.category === c));
  const countOf = (c: Filter) => testimonials.filter((t) => t.category === c).length;
  const defaultTab = tabs.reduce((a, c) => (countOf(c) > countOf(a) ? c : a), tabs[0]);
  const [filter, setFilter] = useState<Filter | null>(null);
  const active = filter ?? defaultTab;
  const filtered = useMemo(() => testimonials.filter((t) => t.category === active), [active]);
  const featured = filtered.length > 3 ? filtered[0] : null;
  const rest = featured ? filtered.slice(1) : filtered;

  const stats = [
    { to: Number(SITE.yearsExperience), suffix: "+", label: "Years of experience", d: 0 },
    { to: Number(SITE.googleRating), suffix: "", label: "Google rating", d: 1 },
    { to: parseInt(SITE.googleReviews, 10), suffix: "+", label: "Google reviews", d: 0 },
  ];

  return (
    <>
    <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-red-500" />
    <main className="overflow-x-hidden bg-white">
      <Hero />

      {/* Stats */}
      <section className="relative z-10 mx-auto -mt-14 max-w-5xl px-6">
        <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 shadow-md">
          {stats.map((s) => (
            <div key={s.label} className="bg-white px-3 py-6 text-center">
              <p className="text-3xl font-extrabold text-[#0F4C81] md:text-4xl">
                <CountUp to={s.to} decimals={s.d} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-xs text-slate-600 md:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Topics marquee */}
      <section className="relative mt-12 overflow-hidden bg-gradient-to-r from-[#071a2f] via-[#0F4C81] to-[#071a2f] py-5 shadow-[inset_0_8px_16px_-8px_rgba(0,0,0,0.35)]" aria-label="Courses and services">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#071a2f] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#071a2f] to-transparent" />
        <motion.div
          className="flex w-max gap-3"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        >
          {[...TOPICS, ...TOPICS].map((t, i) => (
            <span key={i} className="whitespace-nowrap rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-sm">
              {t}
            </span>
          ))}
        </motion.div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="mx-auto max-w-6xl scroll-mt-28 px-6 py-16">
        <Reveal>
          <h2 className="mb-2 text-center text-3xl font-bold text-slate-900 md:text-4xl">What our students say</h2>
          <p className="mx-auto mb-8 max-w-xl text-center text-slate-600">Pick a course and read what students of that course say.</p>
        </Reveal>
        <div role="tablist" aria-label="Filter reviews" className="mb-10 flex flex-wrap justify-center gap-2">
          {tabs.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={active === c}
              onClick={() => setFilter(c)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F4C81] ${
                active === c ? "border-[#0F4C81] bg-[#0F4C81] text-white" : "border-slate-200 bg-white text-slate-700 hover:border-[#0F4C81] hover:text-[#0F4C81]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">
            <p className="text-lg font-semibold text-slate-900">Reviews for this category are coming soon</p>
            <p className="mt-2 text-sm text-slate-600">Meanwhile, try another category or read our Google reviews below.</p>
          </div>
        ) : (
          <div key={active} className="space-y-6">
            {featured && <FeaturedReview t={featured} />}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((t, i) => (
                <ReviewCard key={`${t.name}-${i}`} t={t} i={i} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Why trust */}
      <section className="bg-slate-50 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="mb-10 text-center text-3xl font-bold text-slate-900 md:text-4xl">Why students trust us</h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST.map((x, i) => (
              <Reveal key={x.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border-l-4 border-[#0F4C81] bg-white p-6 shadow-sm">
                  <h3 className="font-semibold text-slate-900">{x.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{x.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Photos */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <h2 className="mb-2 text-center text-3xl font-bold text-slate-900 md:text-4xl">A glimpse of IIL</h2>
          <p className="mx-auto mb-10 max-w-xl text-center text-slate-600">Our classrooms, events and students.</p>
        </Reveal>
        <Gallery />
      </section>

      {/* Videos (sirf tab dikhega jab data/media.js mein video ho) */}
      {videoList.length > 0 && (
        <section className="bg-slate-50 px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-10 text-center text-3xl font-bold text-slate-900 md:text-4xl">Video testimonials</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {videoList.map((v) => (
                <div key={v.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  <iframe
                    className="aspect-video w-full"
                    src={`https://www.youtube-nocookie.com/embed/${v.id}`}
                    title={v.title}
                    loading="lazy"
                    allowFullScreen
                  />
                  <p className="p-4 text-sm font-medium text-slate-800">{v.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Journey */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <Reveal>
          <h2 className="mb-10 text-center text-3xl font-bold text-slate-900 md:text-4xl">Your journey in 4 steps</h2>
        </Reveal>
        <ol className="grid gap-5 md:grid-cols-4">
          {JOURNEY.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <li className="relative h-full list-none rounded-2xl border border-slate-200 bg-white p-6">
                <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white">{i + 1}</span>
                <h3 className="font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <GoogleReviews showCards={false} />

      {/* CTA */}
      <section className="px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-[#0F4C81] px-8 py-14 text-center text-white"
        >
          <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-red-400/20 blur-2xl" />
          <h2 className="relative text-3xl font-bold md:text-4xl">Your success story could be next</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-blue-100">
            Share your course, destination and budget in a free counselling session. We will show you the right path.
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/enquiry" className="rounded-full bg-white px-7 py-3 font-semibold text-[#0F4C81] transition-colors hover:bg-blue-50">
              Book free counselling
            </Link>
            <a
              href={whatsappLink("Hello, I would like to know more about free counselling.")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/60 px-7 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      </section>
    </main>
    <SiteFooter />
    <a
      href={whatsappLink("Hi, I would like more information about your courses.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3.5 text-white shadow-xl transition-transform hover:scale-105"
    >
      <FaWhatsapp className="h-6 w-6" />
      <span className="hidden pr-1 text-sm font-semibold sm:inline">WhatsApp us</span>
    </a>
    </>
  );
}