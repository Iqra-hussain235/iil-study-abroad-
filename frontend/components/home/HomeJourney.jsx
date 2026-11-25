"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import SectionHead from "./SectionHead";

const STEPS = [
  {
    title: "Talk to us",
    text: "Share your goals, your course interest, your budget and the countries you are considering. A clear starting conversation saves time later.",
  },
  {
    title: "Choose your course and country",
    text: "We discuss options that match your profile and explain the entry requirements, so you can decide with real information.",
  },
  {
    title: "Prepare your English test",
    text: "If your course needs IELTS, PTE or a similar test, you can prepare with us while the rest of your file is taking shape.",
  },
  {
    title: "Shortlist and apply",
    text: "We help you shortlist institutions and complete applications, and we check that each form is filled in carefully.",
  },
  {
    title: "Documents and finances",
    text: "We guide you on the documents commonly needed and help you keep them organised, complete and consistent.",
  },
  {
    title: "Visa filing and departure",
    text: "We help prepare your visa application and guide you on the next steps. The decision is made by the embassy or immigration authority.",
  },
];

const DOCS = [
  "Valid passport",
  "Academic marksheets and certificates",
  "English test score (IELTS, PTE or similar)",
  "Statement of purpose (SOP)",
  "Recommendation letters, where asked",
  "Updated CV or resume",
  "Financial documents",
  "Passport-size photographs",
];

export default function HomeJourney() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const [done, setDone] = useState({});

  const count = DOCS.filter((d) => done[d]).length;
  const pct = Math.round((count / DOCS.length) * 100);

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow="Your journey"
          title="From first question to"
          accent="your departure"
          desc="Studying abroad has many moving parts. Here is how we walk through them with you, one step at a time."
        />

        {/* Timeline */}
        <div ref={ref} className="relative mx-auto max-w-5xl">
          <div className="absolute left-5 top-0 h-full w-0.5 bg-slate-200 md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
            className="absolute left-5 top-0 h-full w-0.5 bg-gradient-to-b from-[#ff2f56] to-[#0F4C81] md:left-1/2 md:-translate-x-1/2"
          />

          {STEPS.map((s, i) => (
            <div
              key={s.title}
              className={`relative mb-10 flex last:mb-0 md:mb-14 ${i % 2 ? "md:justify-end" : "md:justify-start"}`}
            >
              <span className="absolute left-5 top-6 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-4 border-[#0F4C81] bg-white text-sm font-extrabold text-[#0F4C81] shadow md:left-1/2">
                {i + 1}
              </span>
              <motion.div
                initial={{ opacity: 0, x: i % 2 ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="ml-14 w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl md:ml-0 md:w-[calc(50%-3rem)]"
              >
                <h3 className="text-xl font-extrabold text-slate-900">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-600">{s.text}</p>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Checklist */}
        <div className="mt-24 grid items-center gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#0F4C81]/15 bg-[#0F4C81]/5 px-4 py-1.5 text-sm font-semibold text-[#0F4C81]">
              <span className="h-2 w-2 rounded-full bg-[#ff2f56]" />
              Try it yourself
            </span>
            <h3 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              How ready are your documents?
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Tick the documents you already have. These are commonly asked for by
              universities and visa offices, but the exact list depends on your country,
              course and profile.
            </p>
            <p className="mt-3 text-slate-600">
              Not sure what you are missing? Bring this list along and our counsellors
              will confirm what applies to your case.
            </p>
            <Link
              href="/enquiry"
              className="mt-7 inline-flex items-center justify-center rounded-full bg-[#0F4C81] px-7 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#0c3d69]"
            >
              Check my profile with a counsellor
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg sm:p-8"
          >
            <div className="mb-5 flex items-center justify-between">
              <p className="font-bold text-slate-900">Your checklist</p>
              <p className="text-sm font-semibold text-[#0F4C81]">
                {count} of {DOCS.length} ready
              </p>
            </div>
            <div className="mb-6 h-2.5 overflow-hidden rounded-full bg-slate-200">
              <motion.div
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-[#ff2f56] to-[#0F4C81]"
              />
            </div>

            <ul className="space-y-2.5">
              {DOCS.map((d) => {
                const on = !!done[d];
                return (
                  <li key={d}>
                    <button
                      type="button"
                      onClick={() => setDone((s) => ({ ...s, [d]: !s[d] }))}
                      className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${
                        on
                          ? "border-[#0F4C81]/30 bg-[#0F4C81]/5 text-slate-500"
                          : "border-slate-200 bg-white text-slate-800 hover:border-[#0F4C81]/40"
                      }`}
                    >
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition ${
                          on ? "border-[#0F4C81] bg-[#0F4C81] text-white" : "border-slate-300"
                        }`}
                      >
                        {on && <FaCheck className="h-3 w-3" />}
                      </span>
                      <span className={on ? "line-through" : ""}>{d}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {count === DOCS.length && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
              >
                Well organised. Bring these along when you meet our counsellor and we will
                confirm what your destination needs.
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}