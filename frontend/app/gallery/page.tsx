"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import AppointmentSection from "@/components/AppointmentSection";
import { gallery, GALLERY_CATS, type GalleryItem } from "@/data/gallery";
import { testimonials } from "@/data/testimonials";
import { SITE } from "@/data/siteInfo";

const ROT = [-2.2, 1.6, -1, 2.4, -1.8, 1.2, -2.6, 0.8];
const TAPE = ["bg-amber-200/80", "bg-sky-200/80", "bg-rose-200/80", "bg-emerald-200/80"];
const PAGE = 9;
const url = (s: string) => encodeURI(s);

const CAT_INFO: Record<string, { blurb: string; ring: string; chip: string }> = {
  Classroom: { blurb: "Real classes, real practice", ring: "from-sky-500 to-blue-700", chip: "bg-sky-50 text-sky-700" },
  Events: { blurb: "Celebrations and get-togethers", ring: "from-rose-500 to-orange-500", chip: "bg-rose-50 text-rose-700" },
  Achievements: { blurb: "Certificates and proud scores", ring: "from-amber-400 to-yellow-600", chip: "bg-amber-50 text-amber-700" },
};

/* ---------- hero: tilted, endlessly moving photo wall ---------- */
const WORDS = ["classes", "celebrations", "certificates", "confidence"];

function WallColumn({ pics, dir, secs, offset }: { pics: GalleryItem[]; dir: "up" | "down"; secs: number; offset: number }) {
  // repeat so the column is always tall enough, then double it for a seamless loop
  const base = [...pics, ...pics, ...pics].slice(0, Math.max(6, pics.length * 2));
  const loop = [...base, ...base];
  return (
    <div className="relative h-full overflow-hidden" style={{ marginTop: offset }}>
      <div
        className="iil-col flex flex-col gap-4"
        style={{ animation: `${dir === "up" ? "iilUp" : "iilDown"} ${secs}s linear infinite` }}
      >
        {loop.map((it, i) => (
          <div
            key={`${it.id}-${i}`}
            className="relative w-full shrink-0 overflow-hidden rounded-2xl bg-slate-200 shadow-xl ring-1 ring-white/60"
            style={{ aspectRatio: i % 3 === 0 ? "3 / 4" : i % 3 === 1 ? "1 / 1" : "4 / 5" }}
          >
            <Image src={url(it.src)} alt={it.caption} fill sizes="20vw" className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero({ count, albums, pics }: { count: number; albums: number; pics: GalleryItem[] }) {
  const reduce = useReducedMotion();
  const [w, setW] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setW((x) => (x + 1) % WORDS.length), 2200);
    return () => clearInterval(t);
  }, [reduce]);

  const cols = [0, 1, 2, 3].map((c) => pics.filter((_, i) => i % 4 === c));
  const conf: { dir: "up" | "down"; secs: number; offset: number }[] = [
    { dir: "up", secs: 55, offset: -40 },
    { dir: "down", secs: 70, offset: 30 },
    { dir: "up", secs: 62, offset: -10 },
    { dir: "down", secs: 80, offset: 50 },
  ];

  return (
    <section className="relative isolate min-h-[680px] overflow-hidden bg-white lg:min-h-[760px]">
      <style>{`
        @keyframes iilUp{from{transform:translateY(0)}to{transform:translateY(-50%)}}
        @keyframes iilDown{from{transform:translateY(-50%)}to{transform:translateY(0)}}
        @keyframes iilShine{to{background-position:200% center}}
        @media (prefers-reduced-motion: reduce){.iil-col{animation:none!important}}
      `}</style>

      {/* moving photo wall */}
      <div aria-hidden className="absolute inset-y-0 right-0 -z-10 w-full lg:w-[68%]">
        <div className="absolute inset-0 grid origin-center grid-cols-4 gap-4 [transform:rotate(-12deg)_scale(1.35)]">
          {cols.map((c, i) => (
            <WallColumn key={i} pics={c.length ? c : pics} {...conf[i]} />
          ))}
        </div>
      </div>

      {/* fades so the text stays readable and the page stays white */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white via-white/95 to-white/30 lg:via-white/80 lg:to-transparent" />
      <div className="absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-white to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-white to-transparent" />
      <div className="pointer-events-none absolute -left-32 top-1/3 -z-10 h-96 w-96 rounded-full bg-sky-300/30 blur-3xl" />

      <div className="relative mx-auto flex min-h-[680px] max-w-7xl flex-col justify-center px-6 pb-24 pt-32 lg:min-h-[760px]">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
          <Link href="/" className="mb-5 inline-block text-sm font-medium text-slate-500 transition-colors hover:text-[#0F4C81]">
            ← Back to Home
          </Link>
          <span className="mb-6 flex w-fit items-center gap-2 rounded-full border border-rose-200 bg-white/90 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#ff2f56] shadow-sm backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#ff2f56]" /> Our Gallery
          </span>

          <h1 className="text-6xl font-black leading-[0.95] tracking-tight text-slate-900 sm:text-7xl xl:text-8xl">
            Life at
            <span
              className="block bg-[linear-gradient(90deg,#ff2f56,#ff8a3d,#0F4C81,#ff2f56)] bg-[length:200%_auto] bg-clip-text pb-2 text-transparent"
              style={reduce ? undefined : { animation: "iilShine 6s linear infinite" }}
            >
              IIL Moradabad
            </span>
          </h1>

          <p className="mt-6 flex flex-wrap items-center gap-x-2 text-2xl font-bold text-slate-800 sm:text-3xl">
            Where
            <span className="relative inline-flex h-10 min-w-[11ch] overflow-hidden sm:h-11">
              <AnimatePresence mode="wait">
                <motion.span
                  key={WORDS[w]}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.45 }}
                  className="absolute left-0 text-[#0F4C81]"
                >
                  {WORDS[w]}
                </motion.span>
              </AnimatePresence>
            </span>
            come alive.
          </p>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
            Every photo here is a real moment from our centre: classes, speaking practice, certificates and celebrations with our students.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#wall" className="group rounded-full bg-gradient-to-r from-[#0F4C81] to-blue-600 px-8 py-4 font-semibold text-white shadow-xl shadow-blue-900/30 transition-transform hover:-translate-y-1">
              Explore the wall <span className="ml-1 inline-block transition-transform group-hover:translate-y-1">↓</span>
            </a>
            <a href="#appointment" className="rounded-full border border-slate-300 bg-white/90 px-8 py-4 font-semibold text-slate-800 shadow-sm backdrop-blur transition-colors hover:border-[#0F4C81] hover:text-[#0F4C81]">
              Book an appointment
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {[
              { n: count, t: "moments", c: "text-[#0F4C81]" },
              { n: albums, t: "albums", c: "text-[#ff2f56]" },
              { n: 3, t: "languages taught", c: "text-emerald-600" },
            ].map((x) => (
              <div key={x.t} className="flex items-baseline gap-2 rounded-full border border-slate-200 bg-white/90 px-5 py-2.5 shadow-sm backdrop-blur">
                <span className={`text-2xl font-extrabold ${x.c}`}>{x.n}</span>
                <span className="text-sm font-medium text-slate-600">{x.t}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* floating glass badges over the wall (big screens) */}
        <motion.div
          animate={reduce ? undefined : { y: [0, -14, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[8%] top-[24%] hidden rounded-2xl border border-white/70 bg-white/80 px-5 py-4 shadow-2xl backdrop-blur-md lg:block"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-[#ff2f56]">Certification day</p>
          <p className="mt-1 text-lg font-extrabold text-slate-900">German & English</p>
        </motion.div>
        <motion.div
          animate={reduce ? undefined : { y: [0, 14, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[22%] right-[28%] hidden rounded-2xl border border-white/70 bg-white/80 px-5 py-4 shadow-2xl backdrop-blur-md lg:block"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-[#0F4C81]">IELTS · PTE · OET</p>
          <p className="mt-1 text-lg font-extrabold text-slate-900">Speaking practice</p>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- auto-scrolling photo strip ---------- */
function Strip({ pics }: { pics: GalleryItem[] }) {
  const loop = [...pics, ...pics];
  return (
    <section aria-label="Photo strip" className="group relative overflow-hidden border-y border-slate-200 bg-white py-6">
      <style>{`@keyframes iilStrip{from{transform:translateX(0)}to{transform:translateX(-50%)}}
      @media (prefers-reduced-motion: reduce){.iil-strip{animation:none!important}}`}</style>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
      <div
        className="iil-strip flex w-max gap-4 group-hover:[animation-play-state:paused]"
        style={{ animation: `iilStrip ${Math.max(30, pics.length * 4)}s linear infinite` }}
      >
        {loop.map((it, i) => (
          <div key={`${it.id}-${i}`} className="relative h-36 w-52 shrink-0 overflow-hidden rounded-xl shadow-md ring-1 ring-slate-200 sm:h-44 sm:w-64">
            <Image src={url(it.src)} alt={it.caption} fill sizes="260px" className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- album cards ---------- */
function Albums({ good, onPick }: { good: GalleryItem[]; onPick: (c: string) => void }) {
  const cats = GALLERY_CATS.filter((c) => good.some((g) => g.cat === c));
  return (
    <section className="bg-white px-6 pb-4 pt-16">
      <div className="mx-auto max-w-7xl">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-[#ff2f56]">Albums</p>
        <h2 className="mt-3 text-center text-3xl font-extrabold text-slate-900 md:text-4xl">Pick a story to explore</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cats.map((c, i) => {
            const items = good.filter((g) => g.cat === c);
            const cover = items[0];
            const info = CAT_INFO[c] ?? CAT_INFO.Classroom;
            return (
              <motion.button
                key={c}
                type="button"
                onClick={() => onPick(c)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative h-72 overflow-hidden rounded-3xl text-left shadow-xl ring-1 ring-slate-200"
              >
                <Image src={url(cover.src)} alt={c} fill sizes="(min-width:768px) 33vw, 95vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                <span className={`absolute left-5 top-5 h-1.5 w-16 rounded-full bg-gradient-to-r ${info.ring}`} />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-2xl font-extrabold text-white">{c}</p>
                  <p className="mt-1 text-sm text-slate-200">{info.blurb}</p>
                  <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800">
                    {items.length} photos <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- one taped polaroid on the wall ---------- */
function Polaroid({ it, i, onOpen, onBad }: { it: GalleryItem; i: number; onOpen: () => void; onBad: (id: string) => void }) {
  const rot = ROT[i % ROT.length];
  const info = CAT_INFO[it.cat] ?? CAT_INFO.Classroom;
  return (
    <motion.div
      initial={{ opacity: 0, y: -24, rotate: rot * 3 }}
      whileInView={{ opacity: 1, y: 0, rotate: rot }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ type: "spring", stiffness: 140, damping: 14, delay: (i % 3) * 0.08 }}
      whileHover={{ rotate: 0, y: -8, scale: 1.03 }}
      className="relative mb-9 break-inside-avoid hover:z-10"
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open photo: ${it.caption}`}
        className="group relative block w-full cursor-zoom-in bg-white p-3 pb-4 text-left shadow-[0_10px_30px_-12px_rgba(15,23,42,0.35)] ring-1 ring-slate-200 transition-shadow hover:shadow-[0_26px_50px_-18px_rgba(15,76,129,0.45)]"
      >
        <span className={`absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-3 shadow-sm ${TAPE[i % TAPE.length]}`} />
        <motion.div layoutId={`pic-${it.id}`} className="relative overflow-hidden bg-slate-100" style={{ aspectRatio: `${it.w} / ${it.h}` }}>
          <Image
            src={url(it.src)}
            alt={it.caption}
            fill
            sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 95vw"
            onError={() => onBad(it.id)}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-slate-900/0 text-3xl text-white opacity-0 transition group-hover:bg-slate-900/30 group-hover:opacity-100">⤢</span>
        </motion.div>
        <span className="mt-3 flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-slate-800">{it.caption}</span>
          <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${info.chip}`}>{it.cat}</span>
        </span>
      </button>
    </motion.div>
  );
}

/* ---------- small helpers ---------- */
function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Heading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ff2f56]">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-900 md:text-5xl">{title}</h2>
      <span className="mx-auto mt-5 block h-1.5 w-20 rounded-full bg-gradient-to-r from-[#0F4C81] to-[#ff2f56]" />
      {text && <p className="mt-5 text-lg leading-relaxed text-slate-600">{text}</p>}
    </Reveal>
  );
}

/* ---------- story: three pillars ---------- */
const PILLARS = [
  { icon: "📖", title: "Learn", text: "Clear, step-by-step classes in English, German and French, and focused preparation for IELTS, PTE, OET, CELPIP and Duolingo.", tone: "from-sky-500 to-blue-700" },
  { icon: "🎤", title: "Practise", text: "Speaking sessions, one-to-one guidance and mock practice, so you walk into your test or interview with confidence.", tone: "from-violet-500 to-fuchsia-600" },
  { icon: "🏆", title: "Celebrate", text: "When a student finishes a course or reaches a target score, we celebrate it together. Many of the photos below come from those days.", tone: "from-amber-400 to-orange-500" },
];

function Story() {
  return (
    <section className="bg-white px-6 pt-20">
      <div className="mx-auto max-w-7xl">
        <Heading
          eyebrow="Our story in pictures"
          title="More than classes. A place to grow."
          text="International Institute Of Languages & Study Abroad in Moradabad teaches English, German and French, and helps students prepare for the tests and applications that open doors abroad. This gallery shows what that looks like day to day."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.12}>
              <div className="group h-full rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-2xl">
                <span className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${p.tone} text-2xl shadow-lg`}>{p.icon}</span>
                <h3 className="mt-6 text-2xl font-extrabold text-slate-900">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-600">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- spotlight rows: photo + text ---------- */
const SPOTS = [
  { id: "ceremony", eyebrow: "Certification day", title: "Where hard work turns into certificates", text: "Our German and English certification ceremony brings students, trainers and families together. It is the moment every learner works towards, and one we enjoy as much as they do.", points: ["German and English certification", "Students and trainers together", "Photos and memories to keep"] },
  { id: "speaking-session", eyebrow: "Speaking practice", title: "Confidence comes from speaking", text: "Speaking is where most learners need the most help. In our IELTS speaking sessions, students practise answering questions face to face and get feedback they can use straight away.", points: ["Face-to-face speaking practice", "Honest, personal feedback", "Ready for the real test"] },
  { id: "trainer-session", eyebrow: "In the classroom", title: "Trainers who teach, explain and encourage", text: "Our trainers take sessions on grammar, vocabulary, test strategy and communication. Students often tell us in their reviews that the teaching style is easy to follow and practical.", points: ["Practical teaching style", "Grammar, vocabulary and confidence", "Support for every level"] },
];

function Spotlights({ good }: { good: GalleryItem[] }) {
  return (
    <section className="bg-gradient-to-b from-white via-[#f3f8fd] to-white px-6 py-20">
      <div className="mx-auto max-w-7xl space-y-24">
        {SPOTS.map((s, i) => {
          const pic = good.find((g) => g.id === s.id);
          if (!pic) return null;
          const flip = i % 2 === 1;
          return (
            <div key={s.id} className="grid items-center gap-12 lg:grid-cols-2">
              <Reveal className={flip ? "lg:order-2" : ""}>
                <div className="relative mx-auto max-w-xl">
                  <div className={`absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br ${i === 1 ? "from-rose-200 to-orange-100" : i === 2 ? "from-violet-200 to-sky-100" : "from-sky-200 to-blue-100"} blur-xl`} />
                  <div className={`bg-white p-3 pb-4 shadow-2xl ring-1 ring-slate-200 ${flip ? "rotate-2" : "-rotate-2"}`}>
                    <div className="relative overflow-hidden bg-slate-100" style={{ aspectRatio: `${pic.w} / ${pic.h}` }}>
                      <Image src={url(pic.src)} alt={pic.caption} fill sizes="(min-width:1024px) 45vw, 95vw" className="object-cover" />
                    </div>
                    <p className="mt-3 text-center text-sm font-semibold text-slate-700">{pic.caption}</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.1} className={flip ? "lg:order-1" : ""}>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ff2f56]">{s.eyebrow}</p>
                <h3 className="mt-3 text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">{s.title}</h3>
                <p className="mt-5 text-lg leading-relaxed text-slate-600">{s.text}</p>
                <ul className="mt-6 space-y-3">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 font-semibold text-slate-800">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm text-emerald-600">✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- journey steps ---------- */
const STEPS = [
  { n: "01", title: "Talk to our team", text: "Tell us your goal: a test score, a language, or studying abroad. We listen first." },
  { n: "02", title: "Choose your course", text: "English, German, French, IELTS, PTE, OET, CELPIP, Duolingo, TESOL / TEFL or interview preparation." },
  { n: "03", title: "Learn and practise", text: "Classes, speaking sessions and one-to-one guidance with our trainers." },
  { n: "04", title: "Get visa and admission guidance", text: "Support with documents, applications and next steps for your study abroad plan." },
  { n: "05", title: "Celebrate your result", text: "Reach your goal, take your certificate and become part of our wall of memories." },
];

function Journey() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <Heading eyebrow="How it works" title="From first hello to your big day" text="Every photo on this page started with a simple first step. Here is how a student's journey with us usually goes." />
        <div className="relative">
          <div className="absolute bottom-0 left-6 top-0 w-0.5 bg-gradient-to-b from-[#0F4C81] via-sky-300 to-[#ff2f56] md:left-1/2 md:-translate-x-1/2" />
          <div className="space-y-10">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={0.05}>
                <div className={`relative flex items-start gap-6 md:gap-0 ${i % 2 ? "md:flex-row-reverse" : ""}`}>
                  <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0F4C81] to-blue-500 text-sm font-extrabold text-white shadow-lg ring-4 ring-white md:absolute md:left-1/2 md:-translate-x-1/2">
                    {s.n}
                  </span>
                  <div className={`flex-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-xl md:w-[45%] md:flex-none ${i % 2 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}`}>
                    <h3 className="text-xl font-extrabold text-slate-900">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-slate-600">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- what we teach ---------- */
const COURSES = ["English Proficiency", "French", "German", "IELTS", "PTE", "OET", "CELPIP", "Duolingo", "Teacher's Trainer", "TESOL / TEFL", "Interview Preparation"];

function WhatWeTeach() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0b3a63] via-[#0F4C81] to-[#1d6fb8] px-6 py-20">
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-rose-400/20 blur-3xl" />
      <div className="relative mx-auto max-w-5xl text-center">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-200">What we teach</p>
          <h2 className="mt-3 text-3xl font-extrabold text-white md:text-5xl">Every course you see here is taught here</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-blue-100">Language classes and test preparation under one roof, in Moradabad and online.</p>
        </Reveal>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {COURSES.map((c, i) => (
            <motion.span
              key={c}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 200, damping: 14 }}
              whileHover={{ y: -4, scale: 1.05 }}
              className="rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur"
            >
              {c}
            </motion.span>
          ))}
        </div>
        <Link href="/academy/course" className="mt-10 inline-block rounded-full bg-white px-8 py-3.5 font-semibold text-[#0F4C81] shadow-lg transition-transform hover:-translate-y-0.5">
          See all courses
        </Link>
      </div>
    </section>
  );
}

/* ---------- real words from students ---------- */
const QUOTE_NAMES = ["Aryan Agrawal", "Vinod Singh", "Mohd Ubaish"];

function Words() {
  const quotes = QUOTE_NAMES.map((n) => testimonials.find((t) => t.name === n)).filter(Boolean) as typeof testimonials;
  if (quotes.length === 0) return null;
  return (
    <section className="bg-slate-50 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <Heading eyebrow="In their words" title="What students say about us" text="Public reviews from our Google Business Profile, shared as written." />
        <div className="grid gap-6 md:grid-cols-3">
          {quotes.map((q, i) => (
            <Reveal key={q.name} delay={i * 0.12}>
              <figure className="relative h-full rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-2xl">
                <span className="absolute -top-5 left-8 flex h-10 w-10 items-center justify-center rounded-full bg-[#ff2f56] text-2xl font-serif text-white shadow-lg">“</span>
                <div className="text-amber-400" aria-label="5 out of 5 stars">★★★★★</div>
                <blockquote className="mt-3 leading-relaxed text-slate-700">{q.text}</blockquote>
                <figcaption className="mt-6 border-t border-slate-100 pt-4">
                  <p className="font-bold text-slate-900">{q.name}</p>
                  <p className="text-sm text-slate-500">{q.course} · Google review</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/testimonials" className="font-semibold text-[#0F4C81] underline-offset-4 hover:underline">
            Read more reviews →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- visit us ---------- */
function Visit() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="grid items-center gap-8 rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-[#eef5fc] p-8 shadow-xl md:grid-cols-[1.3fr_1fr] md:p-12">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ff2f56]">Visit us</p>
              <h2 className="mt-3 text-3xl font-extrabold text-slate-900 md:text-4xl">Come and see our centre for yourself</h2>
              <p className="mt-4 leading-relaxed text-slate-600">Photos are nice, but nothing beats meeting our team in person. Walk in, ask your questions and see a class in action.</p>
              <p className="mt-5 flex items-start gap-3 font-semibold text-slate-800"><span className="mt-0.5">📍</span>{SITE.address}</p>
            </div>
            <div className="space-y-3">
              <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`} className="flex items-center justify-center gap-2 rounded-full bg-[#0F4C81] px-6 py-3.5 font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5">
                📞 {SITE.phone}
              </a>
              <Link href="/contact" className="flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-800 transition-colors hover:border-[#0F4C81] hover:text-[#0F4C81]">
                Send us a message
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- page ---------- */
export default function GalleryPage() {
  const [active, setActive] = useState<string>("All");
  const [shown, setShown] = useState(PAGE);
  const [open, setOpen] = useState<number | null>(null);
  const [bad, setBad] = useState<string[]>([]);

  const good = useMemo(() => gallery.filter((g) => !bad.includes(g.id)), [bad]);
  const cats = GALLERY_CATS.filter((c) => good.some((g) => g.cat === c));
  const list = useMemo(() => (active === "All" ? good : good.filter((g) => g.cat === active)), [active, good]);
  const visible = list.slice(0, shown);
  const cur = open !== null ? list[open] : undefined;


  const markBad = (id: string) => setBad((b) => (b.includes(id) ? b : [...b, id]));
  const step = (d: 1 | -1) => setOpen((c) => (c === null ? c : (c + d + list.length) % list.length));

  const pickAlbum = (c: string) => {
    setActive(c);
    setShown(PAGE);
    document.getElementById("wall")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
  }, [open, list.length]);

  const arrow = "absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-2xl text-white backdrop-blur transition-colors hover:bg-white/30";

  return (
    <main className="overflow-x-hidden bg-white">
      <Hero count={good.length} albums={cats.length} pics={good} />
      <Strip pics={good} />
      <Story />
      <Albums good={good} onPick={pickAlbum} />
      <Spotlights good={good} />

      <section id="wall" className="relative scroll-mt-28 bg-gradient-to-b from-white via-slate-50 to-white px-6 py-16">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-[#ff2f56]">Memories</p>
          <h2 className="mt-3 text-center text-3xl font-extrabold text-slate-900 md:text-5xl">The memory wall</h2>
          <p className="mx-auto mb-8 mt-3 max-w-xl text-center text-slate-600">Click any photo to see it full size.</p>

          <div role="tablist" aria-label="Filter photos" className="mb-12 flex flex-wrap justify-center gap-2">
            {["All", ...cats].map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={active === c}
                onClick={() => {
                  setActive(c);
                  setShown(PAGE);
                }}
                className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-all ${
                  active === c
                    ? "border-[#0F4C81] bg-[#0F4C81] text-white shadow-lg shadow-blue-900/20"
                    : "border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-[#0F4C81] hover:text-[#0F4C81]"
                }`}
              >
                {c}
                <span className={`ml-2 text-xs ${active === c ? "text-blue-100" : "text-slate-400"}`}>
                  {c === "All" ? good.length : good.filter((g) => g.cat === c).length}
                </span>
              </button>
            ))}
          </div>

          <div key={active} className="columns-1 gap-8 px-2 sm:columns-2 lg:columns-3">
            {visible.map((it, i) => (
              <Polaroid key={it.id} it={it} i={i} onOpen={() => setOpen(i)} onBad={markBad} />
            ))}
          </div>

          {shown < list.length && (
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setShown((s) => s + PAGE)}
                className="rounded-full border-2 border-[#0F4C81] px-9 py-3 text-sm font-semibold text-[#0F4C81] transition-colors hover:bg-[#0F4C81] hover:text-white"
              >
                Load more photos ({list.length - shown} more)
              </button>
            </div>
          )}
        </div>
      </section>

      <Journey />
      <WhatWeTeach />
      <Words />
      <Visit />

      {/* closing band */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0b3a63] via-[#0F4C81] to-[#1d6fb8] px-6 py-16 text-center">
        <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-rose-400/20 blur-3xl" />
        <div className="relative mx-auto max-w-3xl">
          <h2 className="text-3xl font-extrabold text-white md:text-4xl">Want to be in our next photo?</h2>
          <p className="mx-auto mt-4 max-w-xl text-blue-100">
            Join our English, German, French and test-preparation classes and become part of the IIL family.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/enquiry" className="rounded-full bg-[#ff2f56] px-8 py-3.5 font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5">
              Start your enquiry
            </Link>
            <Link href="/academy/course" className="rounded-full border border-white/40 bg-white/10 px-8 py-3.5 font-semibold text-white backdrop-blur transition-colors hover:bg-white/20">
              Explore courses
            </Link>
          </div>
        </div>
      </section>

      <AppointmentSection />

      <AnimatePresence>
        {cur && open !== null && (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={cur.caption}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm"
          >
            <motion.div
              key={cur.id}
              layoutId={`pic-${cur.id}`}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) step(1);
                else if (info.offset.x > 80) step(-1);
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative overflow-hidden rounded-lg bg-black shadow-2xl"
            >
              <Image
                src={url(cur.src)}
                alt={cur.caption}
                width={cur.w}
                height={cur.h}
                sizes="92vw"
                priority
                style={{ width: "auto", height: "auto", maxWidth: "92vw", maxHeight: "76vh" }}
              />
            </motion.div>
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/15 px-5 py-2 text-sm font-medium text-white backdrop-blur">
              {cur.caption} · {open + 1} / {list.length}
            </p>
            <button type="button" aria-label="Close" onClick={(e) => { e.stopPropagation(); setOpen(null); }} className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-xl text-white backdrop-blur transition-colors hover:bg-red-500">✕</button>
            <button type="button" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); step(-1); }} className={`${arrow} left-4`}>‹</button>
            <button type="button" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); step(1); }} className={`${arrow} right-4`}>›</button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}