"use client";

import { motion } from "framer-motion";
import { FaCalendarCheck, FaWpforms, FaPhoneAlt, FaHandshake } from "react-icons/fa";
import { SITE } from "@/data/siteInfo";

const STEPS = [
  { icon: FaWpforms, title: "Fill the form", text: "Share your name, contact details and what you are looking for." },
  { icon: FaPhoneAlt, title: "We contact you", text: "Our team reaches out to confirm a suitable time." },
  { icon: FaHandshake, title: "Meet or talk", text: "Discuss your plan with a counsellor, at the centre or by phone." },
];

export default function HomeAppointment() {
  // Link comes from data/siteInfo.js  ->  appointmentUrl: "https://forms.gle/..."
  const url = SITE.appointmentUrl;
  if (!url) return null;

  return (
    <section className="bg-white pb-20 sm:pb-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-white to-blue-50 p-8 shadow-xl sm:p-12"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#ff2f56]/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[#0F4C81]/10 blur-3xl" />
          <span className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-[#ff2f56] to-[#0F4C81]" />

          <div className="relative grid items-center gap-10 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <motion.span
                animate={{ rotate: [0, -6, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff2f56] to-[#0F4C81] text-white shadow-lg shadow-[#0F4C81]/25"
              >
                <FaCalendarCheck className="h-7 w-7" />
              </motion.span>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Prefer to meet a counsellor?
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                Book an appointment using our short form. It helps our team understand
                what you need before you speak to us.
              </p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff2f56] to-[#0F4C81] px-8 py-4 font-semibold text-white shadow-lg shadow-[#ff2f56]/20 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                Book an appointment <span aria-hidden>→</span>
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:col-span-3">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                    className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#0F4C81]/10 text-[#0F4C81]">
                      <Icon />
                    </span>
                    <p className="font-bold text-slate-900">{s.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{s.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}