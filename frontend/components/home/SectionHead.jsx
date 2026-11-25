"use client";

import { motion } from "framer-motion";

export default function SectionHead({ eyebrow, title, accent, desc, align = "center" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-12 max-w-3xl sm:mb-14 ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-[#0F4C81]/15 bg-[#0F4C81]/5 px-4 py-1.5 text-sm font-semibold text-[#0F4C81]">
        <span className="h-2 w-2 rounded-full bg-[#ff2f56]" />
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
        {title}
        {accent && (
          <>
            {" "}
            <span className="bg-gradient-to-r from-[#ff2f56] to-[#0F4C81] bg-clip-text text-transparent">
              {accent}
            </span>
          </>
        )}
      </h2>
      {desc && (
        <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">{desc}</p>
      )}
    </motion.div>
  );
}