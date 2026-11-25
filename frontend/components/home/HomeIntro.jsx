"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { FaStar, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import { SITE, whatsappLink } from "@/data/siteInfo";

const GREETINGS = [
  { word: "Hello", lang: "English" },
  { word: "Hallo", lang: "German" },
  { word: "Bonjour", lang: "French" },
];

const APPROACH = [
  {
    title: "Speak from day one",
    text: "Students often describe the classes as practical and focused on speaking.",
  },
  {
    title: "Personal attention",
    text: "Students often mention that trainers focus on each learner individually.",
  },
  {
    title: "Honest guidance",
    text: "We explain what is possible for your profile, and we never promise results we cannot control.",
  },
];

function CountUp({ to, decimals = 0, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / 1400, 1);
      setV(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {v.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function HomeIntro() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % GREETINGS.length), 2400);
    return () => clearInterval(t);
  }, []);

  const stats = [
    { n: Number(SITE.yearsExperience), suffix: "+", label: "Years of experience" },
    { n: Number(SITE.googleRating), decimals: 1, suffix: "", label: "Google rating" },
    { n: Number(SITE.googleReviews), suffix: "+", label: "Google reviews" },
    { n: 2, suffix: "", label: "Foreign languages taught" },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#0F4C81]/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#ff2f56]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-5 flex h-16 items-end gap-3">
              <AnimatePresence mode="wait">
                <motion.span
                  key={GREETINGS[i].word}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.4 }}
                  className="bg-gradient-to-r from-[#ff2f56] to-[#0F4C81] bg-clip-text text-5xl font-extrabold leading-none text-transparent sm:text-6xl"
                >
                  {GREETINGS[i].word}
                </motion.span>
              </AnimatePresence>
              <span className="pb-1 text-sm font-medium text-slate-400">
                in {GREETINGS[i].lang}
              </span>
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Learn the language.
              <br />
              Open the door abroad.
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              International Institute of Languages &amp; Study Abroad is a language
              training and overseas education centre in Moradabad. We teach Spoken
              English, IELTS, PTE, OET, CELPIP, German and French, and we guide
              students through course selection, applications and visa filing.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              With {SITE.yearsExperience}+ years of experience, our focus is simple:
              clear information, regular practice and a team you can
              ask when you have a question.
            </p>

            <ul className="mt-8 space-y-5">
              {APPROACH.map((a, idx) => (
                <motion.li
                  key={a.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex gap-4"
                >
                  <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0F4C81] text-sm font-bold text-white">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="font-bold text-slate-900">{a.title}</p>
                    <p className="mt-0.5 text-slate-600">{a.text}</p>
                  </div>
                </motion.li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/academy/course"
                className="inline-flex items-center justify-center rounded-full bg-[#0F4C81] px-7 py-3.5 font-semibold text-white shadow-lg shadow-[#0F4C81]/25 transition hover:-translate-y-0.5 hover:bg-[#0c3d69]"
              >
                Explore our courses
              </Link>
              <a
                href={whatsappLink("Hi, I would like to know more about your courses.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-green-500 hover:text-green-600"
              >
                <FaWhatsapp className="h-5 w-5" />
                Talk to our team
              </a>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-lg"
          >
            <div className="absolute -inset-4 rotate-3 rounded-[2.2rem] bg-gradient-to-br from-[#ff2f56]/20 to-[#0F4C81]/25" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border-4 border-white shadow-2xl shadow-slate-900/15">
              <Image
                src="/class1.jpeg"
                alt="Students in a class at IIL Moradabad"
                fill
                sizes="(max-width: 1024px) 90vw, 520px"
                className="object-cover"
              />
            </div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-4 top-10 rounded-2xl border border-slate-100 bg-white px-5 py-3 shadow-xl sm:-left-8"
            >
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, k) => (
                  <FaStar key={k} className="h-3.5 w-3.5" />
                ))}
              </div>
              <p className="mt-1 text-sm font-bold text-slate-900">
                {SITE.googleRating} on Google
              </p>
              <p className="text-xs text-slate-500">{SITE.googleReviews}+ reviews</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-3 bottom-10 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-5 py-3 shadow-xl sm:-right-8"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ff2f56]/10 text-[#ff2f56]">
                <FaMapMarkerAlt />
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900">Moradabad</p>
                <p className="text-xs text-slate-500">Ram Ganga Vihar, Phase 2</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s, idx) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-4xl font-extrabold text-[#0F4C81] sm:text-5xl">
                <CountUp to={s.n} decimals={s.decimals || 0} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm text-slate-500">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}