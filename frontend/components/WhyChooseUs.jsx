"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaUserTie,
  FaGlobeAmericas,
  FaPassport,
  FaBookOpen,
  FaUsers,
  FaHeadset,
} from "react-icons/fa";

const reasons = [
  {
    icon: FaUserTie,
    title: "Expert Guidance",
    desc: "Personalized support from experienced counselors.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: FaGlobeAmericas,
    title: "Global Destinations",
    desc: "Multiple countries, endless opportunities.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: FaPassport,
    title: "Visa Assistance",
    desc: "End-to-end visa support and guidance.",
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    icon: FaBookOpen,
    title: "Language Training",
    desc: "Learn from certified trainers with modern methods.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: FaUsers,
    title: "High Success Rate",
    desc: "Proven track record with 95% visa success rate.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: FaHeadset,
    title: "24/7 Support",
    desc: "We are always here to assist you at every step.",
    color: "text-cyan-600",
    bg: "bg-cyan-50",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-slate-50/70 py-20 sm:py-24 border-b border-slate-100">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-[10%] top-[10%] h-[30%] w-[30%] rounded-full bg-blue-100/50 blur-[100px]" />
        <div className="absolute bottom-[5%] right-[10%] h-[30%] w-[30%] rounded-full bg-rose-100/30 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="inline-block rounded-full bg-blue-100/80 border border-blue-200/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#0F4C81] mb-3">
            Why Choose Us?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Built for Your Global Success
          </h2>
          <p className="mt-3 text-base text-slate-600 max-w-xl mx-auto">
            Comprehensive immigration consulting, expert test preparation, and certified language coaching designed to achieve your ambitions.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-5">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition-all hover:border-blue-300 hover:shadow-lg"
              >
                <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full ${reason.bg} border border-slate-100`}>
                  <Icon className={`h-6 w-6 ${reason.color}`} />
                </div>
                <h3 className="mb-2 text-sm font-bold text-slate-900 sm:text-base">
                  {reason.title}
                </h3>
                <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
                  {reason.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
