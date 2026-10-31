"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaStar, FaGoogle } from "react-icons/fa";
import { testimonials } from "../data/testimonials";
import { SITE } from "../data/siteInfo";

const googleOnes = testimonials.filter((t) => t.source === "Google");
const gridReviews = googleOnes.filter((t) => !t.text.endsWith("…")).slice(0, 4);

// Google's own "review topics" snapshot (counts can change over time)
const MENTIONS = [
  { label: "IELTS preparation", n: 46 },
  { label: "Spoken English", n: 15 },
  { label: "German classes", n: 10 },
  { label: "PTE classes", n: 6 },
];

const short = (s) => (s.length > 110 ? s.slice(0, 110).trimEnd() + "…" : s);

function Row({ items, reverse, reduce }) {
  const list = [...items, ...items];
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <motion.div
        className="flex w-max gap-4"
        animate={reduce ? undefined : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 70, ease: "linear", repeat: Infinity }}
      >
        {list.map((t, i) => (
          <div key={t.name + i} className="w-80 shrink-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex gap-0.5">
                {[...Array(t.rating)].map((_, k) => (
                  <FaStar key={k} className="h-3.5 w-3.5 text-amber-400" />
                ))}
              </div>
              <FaGoogle className="h-4 w-4 text-slate-300" />
            </div>
            <p className="text-sm leading-relaxed text-slate-700">“{short(t.text)}”</p>
            <p className="mt-3 text-sm font-semibold text-slate-900">{t.name}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function GoogleReviews({ showCards = true }) {
  const reduce = useReducedMotion();
  const half = Math.ceil(googleOnes.length / 2);

  return (
    <section className="border-y border-slate-200 bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="mb-3 text-3xl font-bold text-slate-900 sm:text-4xl">What Google says about us</h2>
          <p className="text-base text-slate-600 sm:text-lg">Public reviews from our students on Google.</p>
        </div>

        <div className="mx-auto mb-8 flex w-fit items-center gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
          <FaGoogle className="h-7 w-7 text-[#0F4C81]" />
          <div className="h-10 w-px bg-slate-200" />
          <div className="flex items-center gap-3">
            <span className="text-3xl font-extrabold text-slate-900">{SITE.googleRating}</span>
            <div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="h-3.5 w-3.5 text-amber-400" />
                ))}
              </div>
              <span className="text-xs text-slate-500">{SITE.googleReviews} Google reviews</span>
            </div>
          </div>
        </div>

        <div className="mx-auto mb-12 flex max-w-3xl flex-wrap items-center justify-center gap-2">
          <span className="mr-1 text-sm text-slate-500">Students often mention:</span>
          {MENTIONS.map((m) => (
            <span key={m.label} className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-1.5 text-sm font-medium text-[#0F4C81]">
              {m.label}
              <span className="rounded-full bg-[#0F4C81] px-2 py-0.5 text-xs text-white">{m.n}</span>
            </span>
          ))}
        </div>

        {showCards ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {gridReviews.map((r, i) => (
              <motion.article
                key={r.name + i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-3 flex gap-0.5">
                  {[...Array(r.rating)].map((_, k) => (
                    <FaStar key={k} className="h-3.5 w-3.5 text-amber-400" />
                  ))}
                </div>
                <p className="line-clamp-6 flex-1 text-sm leading-relaxed text-slate-700">{r.text}</p>
                <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0F4C81] font-semibold text-white">{r.name[0]}</div>
                  <p className="text-sm font-semibold text-slate-900">{r.name}</p>
                  <FaGoogle className="ml-auto h-4 w-4 text-slate-400" />
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <Row items={googleOnes.slice(0, half)} reduce={reduce} />
            <Row items={googleOnes.slice(half)} reverse reduce={reduce} />
          </div>
        )}

        <div className="mt-10 text-center">
          <a
            href="https://www.google.com/search?q=iil+moradabad"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#0F4C81] px-6 py-3 text-sm font-semibold text-[#0F4C81] transition-colors hover:bg-[#0F4C81] hover:text-white"
          >
            <FaGoogle className="h-4 w-4" />
            See all reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}