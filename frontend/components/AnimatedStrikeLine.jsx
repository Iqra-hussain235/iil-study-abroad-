"use client";

import { motion } from "framer-motion";

export default function AnimatedStrikeLine({
  className = "",
  align = "center",
  width = "w-40 sm:w-56",
  color = "from-[#ff2f56] via-amber-400 to-[#0F4C81]",
}) {
  const alignmentClass =
    align === "left"
      ? "justify-start"
      : align === "right"
      ? "justify-end"
      : "justify-center";

  return (
    <div className={`flex items-center gap-2 ${alignmentClass} ${className}`}>
      {/* Leading subtle line if centered */}
      {align === "center" && (
        <span className="h-[1px] w-6 sm:w-10 bg-gradient-to-r from-transparent to-slate-300" />
      )}

      {/* Main Track with traveling animated streak beam */}
      <div
        className={`relative h-[3px] ${width} overflow-hidden rounded-full bg-slate-200/90 shadow-sm`}
      >
        {/* Continuous animated moving beam (the animated strike line) */}
        <motion.div
          className={`absolute inset-y-0 w-24 sm:w-32 bg-gradient-to-r ${color} rounded-full`}
          animate={{ x: ["-100%", "260%"] }}
          transition={{
            repeat: Infinity,
            duration: 2.2,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Trailing subtle line */}
      <span className="h-[1px] w-6 sm:w-10 bg-gradient-to-l from-transparent to-slate-300" />
    </div>
  );
}

