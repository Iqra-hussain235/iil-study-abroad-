"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Bell,
  GraduationCap,
  Lightbulb,
  CalendarDays,
  ArrowRight,
} from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import PageHero from "../../../components/about/PageHero";
import Reveal from "../../../components/about/Reveal";
import AboutFooter from "../../../components/about/AboutFooter";
import { SOCIAL_PROFILES, WHATSAPP_URL } from "../../../data/aboutData";

// ── Is page ka extra content (apne hisaab se badal lena) ──

// "Kya milega humare channels par" cards
const CONTENT_TYPES = [
  {
    icon: Bell,
    title: "Visa Updates",
    desc: "Rule changes, intake alerts and important deadlines, shared as they happen.",
  },
  {
    icon: GraduationCap,
    title: "Student Success Stories",
    desc: "Real journeys of students who flew abroad with IIL's guidance.",
  },
  {
    icon: Lightbulb,
    title: "Study & Language Tips",
    desc: "IELTS, PTE and spoken English tips straight from our trainers.",
  },
  {
    icon: CalendarDays,
    title: "Events & Seminars",
    desc: "Seminar dates, workshops and open-day announcements, never miss one.",
  },
];

// "Moments" grid ki images (apni images se replace karo, 6 rakhna sabse achha lagta hai)
const MOMENTS = [
  "/class1.jpeg",
  "/class2.jpeg",
  "/18_image.png",
  "/19_image.png",
  "/certificte.jpeg",
  "/24_image.png",
];

// Hashtag strip
const HASHTAGS = [
  "#StudyAbroad",
  "#IELTS",
  "#PTE",
  "#VisaGuidance",
  "#IILStudyAbroad",
  "#SpokenEnglish",
  "#GlobalDreams",
  "#Moradabad",
];

const INSTAGRAM_URL =
  SOCIAL_PROFILES.find((s) => s.name === "Instagram")?.url ??
  "https://www.instagram.com/iil.studyabroad";

const parent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const child = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: "easeOut" } },
};

// ────────────────────────────────────────────────────────────────
// SOCIAL MEDIA  →  route: /about/social-media
// ────────────────────────────────────────────────────────────────
export default function SocialMediaPage() {
  return (
    <div className="w-full overflow-x-hidden bg-white text-slate-800">
      <PageHero
        image="/study-banner.png"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Social Media" },
        ]}
        title="Stay Connected With IIL"
        subtitle="Follow us for visa updates, student success stories and everything happening at IIL."
      />

      {/* ────────────── PLATFORM CARDS ────────────── */}
      <section className="px-6 py-16 md:px-16 md:py-24">
        <Reveal>
          <span className="mx-auto block w-fit rounded-full bg-[#ff2f56]/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#ff2f56]">
            Join Our Community
          </span>
          <h2 className="mt-4 text-center text-3xl font-extrabold text-[#0b1c3d]">
            Find Us On Social Media
          </h2>
          <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-[#ff2f56] to-[#0F4C81]" />
          <p className="mx-auto mt-5 max-w-2xl text-center text-slate-600">
            Whether you are planning to study, work or settle abroad, our social
            channels keep you informed, inspired and one step ahead.
          </p>
        </Reveal>

        <motion.div
          variants={parent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2"
        >
          {SOCIAL_PROFILES.map(({ name, desc, url, Icon, gradient }) => (
            <motion.a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              variants={child}
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex items-center gap-5 overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-2xl"
            >
              {/* colour wash that slides in on hover */}
              <span
                className={`absolute inset-0 -translate-x-full bg-gradient-to-r ${gradient} transition-transform duration-500 ease-out group-hover:translate-x-0`}
              />

              <span
                className={`relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg transition-transform duration-500 group-hover:rotate-[360deg] group-hover:bg-white group-hover:from-white group-hover:to-white group-hover:text-slate-900`}
              >
                <Icon size={30} />
              </span>

              <span className="relative flex-1">
                <span className="block text-lg font-extrabold text-[#0b1c3d] transition-colors duration-300 group-hover:text-white">
                  {name}
                </span>
                <span className="mt-1 block text-sm text-slate-500 transition-colors duration-300 group-hover:text-white/85">
                  {desc}
                </span>
              </span>

              <ArrowUpRight
                size={22}
                className="relative shrink-0 text-slate-300 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
              />
            </motion.a>
          ))}
        </motion.div>
      </section>

      {/* ────────────── WHAT YOU'LL FIND ────────────── */}
      <section className="bg-slate-50 px-6 py-16 md:px-16 md:py-24">
        <Reveal>
          <p className="text-center text-sm font-semibold uppercase tracking-wide text-blue-700">
            Never Miss An Update
          </p>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-[#0b1c3d]">
            What You&apos;ll Find On Our Channels
          </h2>
          <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-[#ff2f56] to-[#0F4C81]" />
        </Reveal>

        <motion.div
          variants={parent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {CONTENT_TYPES.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              variants={child}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-xl"
            >
              {/* faded big number */}
              <span className="pointer-events-none absolute -right-2 -top-4 select-none text-7xl font-black text-slate-100 transition-colors duration-300 group-hover:text-[#ff2f56]/10">
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ff2f56]/10 text-[#ff2f56] transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-[#ff2f56] group-hover:text-white">
                <Icon size={26} />
              </span>
              <h3 className="relative font-bold text-[#0b1c3d]">{title}</h3>
              <p className="relative mt-2 text-sm text-slate-600">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ────────────── MOMENTS GRID ────────────── */}
      <section className="relative overflow-hidden bg-[#050b18] px-6 py-16 md:px-16 md:py-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[60%] -translate-x-1/2 rounded-full bg-blue-600/15 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-20 right-10 h-64 w-64 rounded-full bg-[#ff2f56]/10 blur-[110px]" />

        <Reveal>
          <p className="relative text-center text-sm font-semibold uppercase tracking-widest text-[#ff2f56]">
            From Our Feed
          </p>
          <h2 className="relative mt-2 text-center text-3xl font-extrabold text-white">
            Moments Worth Sharing
          </h2>
          <div className="relative mx-auto mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-[#ff2f56] to-[#0F4C81]" />
        </Reveal>

        <motion.div
          variants={parent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="relative mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3"
        >
          {MOMENTS.map((src, i) => (
            <motion.a
              key={src}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              variants={child}
              whileHover={{ y: -6 }}
              aria-label={`Open Instagram, moment ${i + 1}`}
              className="group relative aspect-square overflow-hidden rounded-2xl bg-slate-800 shadow-lg"
            >
              <img
                src={src}
                alt={`IIL moment ${i + 1}`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-t from-[#0a0f1f]/85 via-[#0a0f1f]/40 to-[#ff2f56]/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <FaInstagram size={30} className="translate-y-3 text-white transition-transform duration-300 group-hover:translate-y-0" />
                <span className="translate-y-3 text-sm font-semibold text-white transition-transform duration-300 group-hover:translate-y-0">
                  Follow @iil.studyabroad
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </section>

      {/* ────────────── HASHTAG MARQUEE ────────────── */}
      <section className="border-y border-slate-100 bg-white py-6">
        <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              className="social-marquee flex shrink-0 items-center gap-10 pr-10"
            >
              {[...HASHTAGS, ...HASHTAGS].map((tag, i) => (
                <span
                  key={`${copy}-${tag}-${i}`}
                  className="whitespace-nowrap text-xl font-extrabold text-[#0b1c3d]/70 transition-colors hover:text-[#ff2f56]"
                >
                  {tag}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ────────────── CTA ────────────── */}
      <section className="px-6 py-16 md:px-16">
        <Reveal>
          <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 overflow-hidden rounded-3xl bg-gradient-to-r from-[#ff2f56] to-[#0F4C81] px-6 py-12 text-center sm:px-12">
            <motion.div
              aria-hidden
              animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.3, 0.15] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-white"
            />
            <div className="relative">
              <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
                Prefer a quick chat instead?
              </h2>
              <p className="mt-2 text-sm text-white/80">
                Message our counsellors directly and get your questions answered.
              </p>
            </div>
            <div className="relative flex flex-wrap items-center justify-center gap-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-[#0b1c3d] shadow-lg transition hover:-translate-y-0.5 hover:shadow-2xl"
              >
                <FaWhatsapp size={18} className="text-green-500" />
                Chat On WhatsApp
              </a>
              <Link
                href="/enquiry"
                className="group inline-flex items-center gap-2 rounded-full border border-white/60 px-7 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                Enquire Now
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <style jsx global>{`
        @keyframes socialMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        .social-marquee {
          animation: socialMarquee 30s linear infinite;
        }
        .social-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <AboutFooter />
    </div>
  );
}