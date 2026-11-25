"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import { SITE, whatsappLink } from "@/data/siteInfo";
import SectionHead from "./SectionHead";

const FAQS = [
  {
    q: "I am a complete beginner. Can I join Spoken English?",
    a: "Yes, beginners are welcome. Our team will understand your current level and suggest a suitable batch.",
  },
  {
    q: "Should I choose IELTS or PTE?",
    a: "Both are widely accepted, but requirements differ by university and country. Check what your target institution accepts, and our team can help you compare the two for your plan.",
  },
  {
    q: "Can you guarantee a band score or a visa?",
    a: "No. Your score depends on your own practice and the exam day, and visa decisions are made only by the embassy or immigration authority. We guide and prepare you carefully, but we never promise an outcome.",
  },
  {
    q: "Are online classes available?",
    a: "We offer both offline and online options. Please confirm availability for your chosen course when you contact us.",
  },
  {
    q: "How do I take admission?",
    a: "Call or message us, or visit the centre. Our team will explain the course, available batches and fee, and guide you through the admission steps.",
  },
];

export function FaqPreview() {
  const [open, setOpen] = useState(-1);

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 lg:sticky lg:top-28 lg:self-start"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#0F4C81]/15 bg-[#0F4C81]/5 px-4 py-1.5 text-sm font-semibold text-[#0F4C81]">
            <span className="h-2 w-2 rounded-full bg-[#ff2f56]" />
            Quick answers
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Questions students{" "}
            <span className="bg-gradient-to-r from-[#ff2f56] to-[#0F4C81] bg-clip-text text-transparent">
              ask us most
            </span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            Here are a few of the most common questions. Our FAQ page has many more, with
            a search box that understands full sentences.
          </p>
          <Link
            href="/faqs"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#0F4C81] px-7 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#0c3d69]"
          >
            See all FAQs <span aria-hidden>→</span>
          </Link>
        </motion.div>

        <div className="space-y-3 lg:col-span-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className={`overflow-hidden rounded-2xl border bg-white transition-colors ${
                  isOpen ? "border-[#0F4C81]/40 shadow-lg" : "border-slate-200"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-lg font-bold text-slate-900">{f.q}</span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg font-bold transition-all ${
                      isOpen ? "rotate-45 bg-[#0F4C81] text-white" : "bg-slate-100 text-[#0F4C81]"
                    }`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="px-6 pb-6 leading-relaxed text-slate-600">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function EnquiryMap() {
  const [form, setForm] = useState({ name: "", phone: "", interest: "Study abroad", message: "" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const text =
      `Hi, I am ${form.name || "a student"}.\n` +
      `Interested in: ${form.interest}\n` +
      `Phone: ${form.phone || "-"}\n` +
      (form.message ? `Message: ${form.message}` : "");
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
  };

  const tel = `tel:${SITE.phone.replace(/[^+\d]/g, "")}`;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    "International Institute of Languages and Study Abroad, Ram Ganga Vihar Phase 2, Moradabad"
  )}&output=embed`;

  const input =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#0F4C81] focus:ring-4 focus:ring-[#0F4C81]/10";

  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow="Get in touch"
          title="Let’s talk about"
          accent="your plan"
          desc="Send us a few details and your message opens in WhatsApp, ready to send. Or call, or simply visit us."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg sm:p-9"
          >
            <h3 className="text-2xl font-extrabold text-slate-900">Send an enquiry</h3>
            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">Your name</label>
                <input required value={form.name} onChange={set("name")} className={input} placeholder="Full name" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">Phone number</label>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={set("phone")}
                  className={input}
                  placeholder="Your mobile number"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">I am interested in</label>
                <select value={form.interest} onChange={set("interest")} className={input}>
                  <option>Study abroad</option>
                  <option>IELTS</option>
                  <option>PTE</option>
                  <option>CELPIP</option>
                  <option>OET</option>
                  <option>Spoken English</option>
                  <option>German</option>
                  <option>French</option>
                  <option>Interview preparation</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Message <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={set("message")}
                  className={input}
                  placeholder="Tell us a little about your plan"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-green-500/25 transition hover:-translate-y-0.5 hover:bg-green-600"
            >
              <FaWhatsapp className="h-5 w-5" />
              Send on WhatsApp
            </button>
            <p className="mt-3 text-center text-xs text-slate-500">
              This opens WhatsApp with your details filled in. Nothing is sent until you press send there.
            </p>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-lg">
              <iframe
                title="IIL Moradabad on Google Maps"
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-72 w-full border-0 sm:h-80"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={tel}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0F4C81]/10 text-[#0F4C81]">
                  <FaPhoneAlt />
                </span>
                <span>
                  <span className="block text-xs text-slate-500">Call us</span>
                  <span className="font-bold text-slate-900">{SITE.phone}</span>
                </span>
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ff2f56]/10 text-[#ff2f56]">
                  <FaEnvelope />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-slate-500">Email us</span>
                  <span className="block truncate font-bold text-slate-900">{SITE.email}</span>
                </span>
              </a>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5">
              <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <FaMapMarkerAlt />
              </span>
              <span>
                <span className="block text-xs text-slate-500">Visit us</span>
                <span className="font-semibold text-slate-900">{SITE.address}</span>
                <span className="mt-1 block text-sm text-slate-500">
                  Please call before visiting to confirm timings.
                </span>
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}