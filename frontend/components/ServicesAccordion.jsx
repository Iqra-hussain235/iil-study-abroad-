"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { buildEnquiryUrl } from "@/utils/serviceEnquiry";

const accordionVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.28, ease: "easeIn" },
  },
};

const panelVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.98,
    transition: { duration: 0.3 },
  },
};

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

function EnquireButton({ service, level, category, accent, className = "" }) {
  const href = buildEnquiryUrl({ service, level, category });

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold text-white transition-all hover:scale-105 hover:shadow-md sm:text-sm ${className}`}
      style={{
        background: `linear-gradient(135deg, ${accent}, #0F4C81)`,
        boxShadow: `0 4px 14px -3px rgba(15, 76, 129, 0.35)`,
      }}
    >
      Enquire About This Course
    </Link>
  );
}

function Chevron({ open, accent }) {
  return (
    <motion.span
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.25 }}
      style={{ color: accent }}
    >
      <FiChevronDown className="h-5 w-5" />
    </motion.span>
  );
}

function LevelGrid({ service, categoryTitle, accent }) {
  return (
    <motion.div
      variants={gridVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-3 pt-4 sm:grid-cols-2"
    >
      {service.levels.map((level) => (
        <motion.div
          key={level}
          variants={itemVariants}
          whileHover={{ scale: 1.02, y: -2 }}
          className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-300 hover:shadow-md"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {service.title}
            </p>
            <p className="mt-0.5 text-base font-bold text-slate-900">{level}</p>
          </div>
          <EnquireButton
            service={service.title}
            level={level}
            category={categoryTitle}
            accent={accent}
            className="w-full"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

function CoachingServiceItem({ service, categoryTitle, accent }) {
  const [open, setOpen] = useState(false);
  const hasLevels = service.levels.length > 0;

  if (!hasLevels) {
    return (
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.01 }}
        className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5"
      >
        <span className="text-base font-bold text-slate-900">{service.title}</span>
        <EnquireButton
          service={service.title}
          category={categoryTitle}
          accent={accent}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={itemVariants}
      layout
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left transition hover:bg-slate-50 sm:px-5"
        aria-expanded={open}
      >
        <div>
          <span className="text-base font-bold text-slate-900">{service.title}</span>
          <p className="mt-0.5 text-xs text-slate-500 font-medium">
            {service.levels.length} programme{service.levels.length !== 1 ? "s" : ""} available
          </p>
        </div>
        <Chevron open={open} accent={accent} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="levels"
            variants={accordionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden"
          >
            <div className="border-t border-slate-100 bg-slate-50/50 px-4 pb-5 sm:px-5">
              <LevelGrid
                service={service}
                categoryTitle={categoryTitle}
                accent={accent}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function VisaServiceGrid({ services, categoryTitle, accent }) {
  return (
    <motion.div
      variants={gridVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-3 sm:grid-cols-2"
    >
      {services.map((service) => (
        <motion.div
          key={service.id}
          variants={itemVariants}
          whileHover={{ scale: 1.02, y: -2 }}
          className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-300 hover:shadow-md sm:p-5"
        >
          <p className="text-base font-bold text-slate-900">{service.title}</p>
          <EnquireButton
            service={service.title}
            category={categoryTitle}
            accent={accent}
            className="w-full"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

export function ServiceDetailPanel({ category }) {
  if (!category) return null;

  return (
    <motion.div
      key={category.id}
      layout
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50/50 shadow-xl"
    >
      <div
        className={`relative overflow-hidden border-b border-slate-200 bg-gradient-to-r from-slate-900 via-[#0F4C81] to-slate-900 px-5 py-6 sm:px-7 sm:py-7 text-white`}
      >
        <div className="relative z-10">
          <p
            className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300"
          >
            Programmes
          </p>
          <h3 className="mt-1 text-xl font-extrabold text-white sm:text-2xl">{category.title}</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-200">{category.desc}</p>
        </div>
      </div>

      <motion.div
        variants={gridVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3 p-4 sm:p-6"
      >
        {category.type === "coaching" ? (
          category.services.map((service) => (
            <CoachingServiceItem
              key={service.id}
              service={service}
              categoryTitle={category.title}
              accent={category.accent}
            />
          ))
        ) : (
          <VisaServiceGrid
            services={category.services}
            categoryTitle={category.title}
            accent={category.accent}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

export default function ServicesAccordion({ categories, selectedId }) {
  const selected = categories.find((c) => c.id === selectedId);

  return (
    <AnimatePresence mode="wait">
      {selected && <ServiceDetailPanel key={selected.id} category={selected} />}
    </AnimatePresence>
  );
}
