"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaPlaneDeparture,
  FaClipboardCheck,
  FaCommentDots,
  FaLanguage,
  FaCheckCircle,
  FaWhatsapp,
} from "react-icons/fa";
import { whatsappLink } from "@/data/siteInfo";
import SectionHead from "./SectionHead";

const GOALS = [
  {
    id: "abroad",
    icon: FaPlaneDeparture,
    label: "I want to study abroad",
    title: "Study abroad guidance",
    text: "Tell us your course interest, budget and preferred country. We help with course and university selection, applications, documents and visa filing, and we explain honestly what suits your profile.",
    points: [
      "A profile discussion before you commit to anything",
      "Guidance on whether an English test like IELTS or PTE is needed",
      "Help with documents and application steps",
      "Visa filing support. The final decision always rests with the embassy.",
    ],
    primary: { label: "Explore visa services", href: "/visa/study" },
    ask: "Hi, I want to study abroad. Please guide me.",
  },
  {
    id: "exam",
    icon: FaClipboardCheck,
    label: "I need an English test score",
    title: "IELTS, PTE, OET and CELPIP",
    text: "Preparation across listening, reading, writing and speaking. If you are unsure which exam to take, we help you compare them for your target university or country.",
    points: [
      "Practice with exam-style tasks",
      "Practice and feedback on each section",
      "Guidance on choosing the right test",
      "Ask the team about current batches and fees",
    ],
    primary: { label: "See exam courses", href: "/academy/course" },
    ask: "Hi, I need help preparing for an English test. Please share details.",
  },
  {
    id: "speak",
    icon: FaCommentDots,
    label: "I want to speak English confidently",
    title: "Spoken English",
    text: "For beginners to advanced learners, with a focus on confidence, vocabulary, pronunciation and everyday conversation. Interview preparation is also offered.",
    points: [
      "Beginners are welcome",
      "Speaking activities in every class",
      "Interview preparation",
      "Online and offline options. Please confirm for your batch.",
    ],
    primary: { label: "See Spoken English", href: "/academy/course" },
    ask: "Hi, I want to improve my spoken English. Please share batch details.",
  },
  {
    id: "language",
    icon: FaLanguage,
    label: "I want to learn a foreign language",
    title: "German and French",
    text: "Whether it is for study, work, a career move or simple interest, we help you choose a starting point that suits you.",
    points: [
      "Ask the team about levels and batches",
      "Regular practice in class",
      "Ask about exam preparation for your language",
      "Helpful if you plan to study or work abroad",
    ],
    primary: { label: "See language courses", href: "/academy/course" },
    ask: "Hi, I want to learn a foreign language. Please share details.",
  },
];

export default function PathFinder() {
  const [active, setActive] = useState(GOALS[0].id);
  const goal = GOALS.find((g) => g.id === active);

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-[#0F4C81]/5 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow="Find your starting point"
          title="Not sure where"
          accent="to begin?"
          desc="Pick the option that sounds most like you. We will show you what to expect and how to take the first step."
        />

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Options */}
          <div className="space-y-3 lg:col-span-2">
            {GOALS.map((g) => {
              const Icon = g.icon;
              const on = g.id === active;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setActive(g.id)}
                  className={`flex w-full items-center gap-4 rounded-2xl border p-5 text-left transition-all duration-300 ${
                    on
                      ? "border-[#0F4C81] bg-[#0F4C81] text-white shadow-xl shadow-[#0F4C81]/25 lg:translate-x-2"
                      : "border-slate-200 bg-white text-slate-800 hover:border-[#0F4C81]/40 hover:shadow-md"
                  }`}
                >
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl ${
                      on ? "bg-white/15 text-white" : "bg-[#0F4C81]/10 text-[#0F4C81]"
                    }`}
                  >
                    <Icon />
                  </span>
                  <span className="flex-1 text-base font-semibold sm:text-lg">{g.label}</span>
                  <span aria-hidden className={`text-xl transition-transform ${on ? "translate-x-1" : ""}`}>
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* Result */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="h-full rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-lg sm:p-10"
              >
                <p className="text-sm font-semibold text-[#ff2f56]">Here is what we suggest</p>
                <h3 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">{goal.title}</h3>
                <p className="mt-4 text-lg leading-relaxed text-slate-600">{goal.text}</p>

                <ul className="mt-6 space-y-3">
                  {goal.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-slate-700">
                      <FaCheckCircle className="mt-1 h-4 w-4 shrink-0 text-[#0F4C81]" />
                      {p}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={goal.primary.href}
                    className="inline-flex items-center justify-center rounded-full bg-[#0F4C81] px-7 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#0c3d69]"
                  >
                    {goal.primary.label}
                  </Link>
                  <a
                    href={whatsappLink(goal.ask)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-green-500 px-7 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-green-600"
                  >
                    <FaWhatsapp className="h-5 w-5" />
                    Ask on WhatsApp
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}