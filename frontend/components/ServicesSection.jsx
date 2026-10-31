"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ServiceCategoryCards from "@/components/ServiceCategoryCards";
import { MAIN_SERVICE_CATEGORIES } from "@/data/servicesData";

export default function ServicesSection({
  id = "services",
  showCta = true,
  animateOnView = true,
  className = "",
}) {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <section
      id={id}
      className={`relative scroll-mt-10 overflow-hidden py-20 sm:py-24 bg-slate-50/70 text-slate-900 border-t border-b border-slate-100 ${className}`}
    >
      {/* Background aesthetics */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-[5%] top-[8%] h-[35%] w-[35%] rounded-full bg-blue-100/40 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[5%] h-[40%] w-[40%] rounded-full bg-rose-100/30 blur-[120px]" />
        <div className="absolute left-[40%] top-[50%] h-[25%] w-[25%] rounded-full bg-sky-100/40 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            {...(animateOnView
              ? { whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }
              : { animate: { opacity: 1, y: 0 } })}
            transition={{ duration: 0.5 }}
            className="mb-3 inline-block"
          >
            <span className="rounded-full bg-blue-100/80 border border-blue-200/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#0F4C81]">
              Our Expertise
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            {...(animateOnView
              ? { whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }
              : { animate: { opacity: 1, y: 0 } })}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl"
          >
            Leading & Reliable{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F4C81] to-[#ff2f56]">
              Immigration Experts
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            {...(animateOnView
              ? { whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }
              : { animate: { opacity: 1, y: 0 } })}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base leading-relaxed text-slate-600 md:text-lg"
          >
            Professional coaching, visa support, and comprehensive language training
            built to ensure your global journey starts flawlessly.
          </motion.p>
        </div>

        {/* Premium cards with inline expand */}
        <ServiceCategoryCards
          categories={MAIN_SERVICE_CATEGORIES}
          selectedId={selectedId}
          onSelect={setSelectedId}
          animateOnView={animateOnView}
        />

        {/* CTA */}
        {showCta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            {...(animateOnView
              ? { whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }
              : { animate: { opacity: 1, y: 0 } })}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5"
          >
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-3.5 text-base font-semibold text-slate-800 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-400 hover:shadow-md"
            >
              View All Services
            </Link>
            <Link
              href="/enquiry"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff2f56] to-[#0F4C81] px-8 py-3.5 text-base font-semibold text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              Start Your Enquiry
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
