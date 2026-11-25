"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Marquee({ items, reverse = false, duration = 45, repeat = 3 }) {
  const reduce = useReducedMotion();
  const half = Array.from({ length: repeat }, () => items).flat();
  const list = [...half, ...half];

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#071f3a] via-[#0F4C81] to-[#071f3a] py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#071f3a] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#071f3a] to-transparent" />
      <motion.div
        className="flex w-max"
        animate={reduce ? undefined : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {list.map((item, i) => (
          <span
            key={i}
            className="mr-4 shrink-0 rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-base font-semibold text-white backdrop-blur-sm"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}