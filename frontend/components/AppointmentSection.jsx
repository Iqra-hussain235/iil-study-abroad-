"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCalendarCheck,
  FaClipboardList,
  FaWhatsapp,
  FaPhoneAlt,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { SITE, whatsappLink } from "../data/siteInfo";

const TABS = [
  { id: "appointment", label: "Book an appointment", Icon: FaCalendarCheck },
  { id: "enquiry", label: "Send an enquiry", Icon: FaClipboardList },
];

const STEPS = [
  "Fill in the short form",
  "Our team contacts you to confirm",
  "Get your questions answered, including fees and batch details",
];

const embedUrl = `${SITE.appointmentUrl}${
  SITE.appointmentUrl.includes("?") ? "&" : "?"
}embedded=true`;

function AppointmentPanel() {
  const [loaded, setLoaded] = useState(false);
  return (
    <div>
      <div className="relative h-[620px] overflow-hidden rounded-xl bg-slate-50">
        {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-sm text-slate-500">
            <span className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-[#0F4C81]" />
            Loading the appointment form...
          </div>
        )}
        <iframe
          src={embedUrl}
          title="Book an appointment"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        >
          Loading...
        </iframe>
      </div>
      <a
        href={SITE.appointmentUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-2 px-1 text-sm font-medium text-[#0F4C81] hover:underline"
      >
        Form not loading? Open it in a new tab <FaExternalLinkAlt className="h-3 w-3" />
      </a>
    </div>
  );
}

function EnquiryPanel() {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-10 text-center">
      <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-[#0F4C81]">
        <FaClipboardList className="h-7 w-7" />
      </span>
      <h3 className="text-2xl font-bold text-slate-900">Prefer to send a quick enquiry?</h3>
      <p className="mt-3 max-w-md text-slate-600">
        Tell us the course or country you are interested in. Our team will get
        back to you with the details.
      </p>
      <Link
        href="/enquiry"
        className="mt-7 rounded-full bg-red-500 px-8 py-3 font-semibold text-white shadow-lg shadow-red-500/25 transition-transform hover:-translate-y-0.5"
      >
        Open the enquiry form
      </Link>
      <div className="mt-5 flex flex-wrap justify-center gap-3 text-sm">
        <a
          href={whatsappLink("Hi, I would like to make an enquiry.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-2 font-medium text-slate-700 transition-colors hover:border-[#25D366] hover:text-[#1a9f4d]"
        >
          <FaWhatsapp /> WhatsApp
        </a>
        <a
          href={`tel:${SITE.phone}`}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-2 font-medium text-slate-700 transition-colors hover:border-[#0F4C81] hover:text-[#0F4C81]"
        >
          <FaPhoneAlt className="h-3 w-3" /> Call us
        </a>
      </div>
    </div>
  );
}

export default function AppointmentSection({ defaultTab = "appointment" }) {
  const [tab, setTab] = useState(defaultTab);

  return (
    <section id="appointment" className="scroll-mt-28 px-4 py-20 sm:px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b2f52] via-[#0F4C81] to-[#14598f] text-white shadow-2xl shadow-blue-900/20">
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-red-400/20 blur-3xl" />

        <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:p-12">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <span className="mb-4 w-fit rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-100">
              Get in touch
            </span>
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
              Book an appointment, or send us an enquiry
            </h2>
            <p className="mt-4 max-w-md text-blue-100">
              Choose whichever is easier for you. Our team will explain the
              course, fees and batches for your plan.
            </p>
            <ol className="mt-8 space-y-4">
              {STEPS.map((s, i) => (
                <li key={s} className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-[#0F4C81]">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-blue-50">{s}</span>
                </li>
              ))}
            </ol>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl bg-white p-3 text-slate-900 shadow-2xl"
          >
            <div role="tablist" aria-label="Appointment or enquiry" className="relative mb-3 flex rounded-xl bg-slate-100 p-1">
              {TABS.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  role="tab"
                  type="button"
                  aria-selected={tab === id}
                  onClick={() => setTab(id)}
                  className={`relative z-10 flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-3 text-sm font-semibold transition-colors ${
                    tab === id ? "text-[#0F4C81]" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tab === id && (
                    <motion.span
                      layoutId="appt-tab-pill"
                      className="absolute inset-0 -z-10 rounded-lg bg-white shadow"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                {tab === "appointment" ? <AppointmentPanel /> : <EnquiryPanel />}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}