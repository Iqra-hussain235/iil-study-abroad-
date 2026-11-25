"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaChalkboardTeacher, FaLaptop, FaPassport, FaCheckCircle } from "react-icons/fa";
import SectionHead from "./SectionHead";

const CARDS = [
  {
    icon: FaChalkboardTeacher,
    title: "In-house Coaching",
    tag: "At our Moradabad centre",
    text: "Classroom-based language and exam preparation at our Moradabad centre.",
    points: [
      "IELTS, PTE, OET and CELPIP preparation",
      "Spoken English and interview preparation",
      "German and French language classes",
    ],
    href: "/academy/course",
    cta: "See our courses",
    color: "#0F4C81",
  },
  {
    icon: FaLaptop,
    title: "Online Coaching",
    tag: "Learn from any city",
    text: "Live and flexible online classes for students who cannot attend in person. Please confirm available batches for your course.",
    points: [
      "Live sessions with trainers",
      "Study from home or while travelling",
      "Ask the team which courses run online",
    ],
    href: "/academy/course",
    cta: "Ask about online batches",
    color: "#7c3aed",
  },
  {
    icon: FaPassport,
    title: "Visa Assistance",
    tag: "Study, work and more",
    text: "Step-by-step guidance from choosing a course and country to preparing documents and filing your visa application.",
    points: [
      "Course and university guidance",
      "Document checking and application help",
      "Visa filing support and preparation",
    ],
    href: "/visa/study",
    cta: "Explore visa services",
    color: "#ff2f56",
  },
];

export default function HomeExpertise() {
  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow="Our expertise"
          title="Training and guidance,"
          accent="all under one roof"
          desc="Whether you need a better English score, a new language or a clear path to study abroad, you can start with one conversation."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {CARDS.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.article
                key={c.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-2xl"
              >
                <span
                  className="absolute inset-x-0 top-0 h-1.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: c.color }}
                />
                <div
                  className="absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-[0.07] transition-transform duration-500 group-hover:scale-150"
                  style={{ background: c.color }}
                />

                <div
                  className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-lg"
                  style={{ background: c.color }}
                >
                  <Icon className="h-7 w-7" />
                </div>

                <p className="text-sm font-semibold" style={{ color: c.color }}>
                  {c.tag}
                </p>
                <h3 className="mt-1 text-2xl font-extrabold text-slate-900">{c.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-600">{c.text}</p>

                <ul className="mt-6 flex-1 space-y-3">
                  {c.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-slate-700">
                      <FaCheckCircle className="mt-1 h-4 w-4 shrink-0" style={{ color: c.color }} />
                      {p}
                    </li>
                  ))}
                </ul>

                <Link
                  href={c.href}
                  className="mt-8 inline-flex items-center gap-2 font-semibold transition-all group-hover:gap-3"
                  style={{ color: c.color }}
                >
                  {c.cta} <span aria-hidden>→</span>
                </Link>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/services"
            className="rounded-full border border-slate-300 bg-white px-8 py-3.5 font-semibold text-slate-800 transition hover:border-[#0F4C81] hover:text-[#0F4C81]"
          >
            View all services
          </Link>
          <Link
            href="/enquiry"
            className="rounded-full bg-gradient-to-r from-[#ff2f56] to-[#0F4C81] px-8 py-3.5 font-semibold text-white shadow-lg shadow-[#ff2f56]/20 transition hover:-translate-y-0.5"
          >
            Start your enquiry
          </Link>
        </div>
      </div>
    </section>
  );
}