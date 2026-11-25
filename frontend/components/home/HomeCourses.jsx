"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionHead from "./SectionHead";

const COURSES = [
  {
    mark: "Hello",
    name: "Spoken English",
    text: "Build speaking confidence, vocabulary and pronunciation. Ask our team which batch suits your level.",
    tag: "English",
    color: "#2563eb",
  },
  {
    mark: "IELTS",
    name: "IELTS",
    text: "Preparation for the IELTS exam across listening, reading, writing and speaking.",
    tag: "English exam",
    color: "#e11d48",
  },
  {
    mark: "PTE",
    name: "PTE",
    text: "Preparation for the computer-based PTE exam.",
    tag: "English exam",
    color: "#ea580c",
  },
  {
    mark: "OET",
    name: "OET",
    text: "English exam preparation for healthcare professionals planning to work abroad.",
    tag: "English exam",
    color: "#059669",
  },
  {
    mark: "CELPIP",
    name: "CELPIP",
    text: "Preparation for the CELPIP English test, which is commonly linked with Canada.",
    tag: "English exam",
    color: "#0891b2",
  },
  {
    mark: "Hallo",
    name: "German",
    text: "German language classes for study, work or travel plans.",
    tag: "Language",
    color: "#7c3aed",
  },
  {
    mark: "Bonjour",
    name: "French",
    text: "French language classes with speaking practice.",
    tag: "Language",
    color: "#0F4C81",
  },
  {
    mark: "Interview",
    name: "Interview Preparation",
    text: "Practice for admission and job interviews, with speaking and confidence building.",
    tag: "Skills",
    color: "#d97706",
  },
  {
    mark: "TESOL",
    name: "TESOL / TEFL",
    text: "Training for people who want to teach English.",
    tag: "Teacher training",
    color: "#db2777",
  },
];

export default function HomeCourses() {
  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow="Our courses"
          title="Choose the course"
          accent="that fits your goal"
          desc="English, exam preparation, German, French and interview skills. Pick one and ask our team about the current batch."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((c, i) => (
            <motion.article
              key={c.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-2xl"
            >
              <div
                className="mb-5 flex h-24 items-center justify-center rounded-2xl text-3xl font-extrabold text-white transition-transform duration-500 group-hover:scale-[1.03]"
                style={{ background: `linear-gradient(135deg, ${c.color}, ${c.color}bb)` }}
              >
                {c.mark}
              </div>
              <span
                className="inline-block rounded-full px-3 py-1 text-xs font-semibold"
                style={{ background: `${c.color}14`, color: c.color }}
              >
                {c.tag}
              </span>
              <h3 className="mt-3 text-xl font-extrabold text-slate-900">{c.name}</h3>
              <p className="mt-2 leading-relaxed text-slate-600">{c.text}</p>
              <Link
                href="/academy/course"
                className="mt-5 inline-flex items-center gap-2 font-semibold transition-all group-hover:gap-3"
                style={{ color: c.color }}
              >
                Learn more <span aria-hidden>→</span>
              </Link>
            </motion.article>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-slate-500">
          Batches, timings and fees can change. Please contact our team to confirm what is
          currently available for your course.
        </p>
      </div>
    </section>
  );
}