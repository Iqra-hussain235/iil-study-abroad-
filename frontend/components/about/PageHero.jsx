"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function PageHero({
  title,
  subtitle,
  crumbs = [],
  image = "/study-banner.png",
}) {
  return (
    <section className="relative flex h-[60vh] min-h-[420px] w-full items-center justify-center overflow-hidden">
      <motion.img
        src={image}
        alt=""
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1f]/85 via-[#0a0f1f]/65 to-[#0a0f1f]/95" />

      {/* floating glow blobs */}
      <motion.div
        aria-hidden
        animate={{ y: [0, -24, 0], x: [0, 14, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-16 top-10 h-64 w-64 rounded-full bg-[#ff2f56]/20 blur-[90px]"
      />
      <motion.div
        aria-hidden
        animate={{ y: [0, 26, 0], x: [0, -18, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-blue-500/20 blur-[100px]"
      />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -90, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 160, damping: 14, delay: 0.1 }}
          className="mb-6 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-white shadow-[0_0_40px_rgba(255,47,86,0.35)]"
        >
          <img
            src="/IIL-logo.png"
            alt="IIL Logo"
            className="h-full w-full object-contain p-2"
          />
        </motion.div>

        {crumbs.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            aria-label="Breadcrumb"
            className="mb-4 flex flex-wrap items-center justify-center gap-1 text-xs font-medium text-blue-100/80"
          >
            {crumbs.map((c, i) => (
              <span key={c.label} className="flex items-center gap-1">
                {c.href ? (
                  <Link href={c.href} className="transition hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white">{c.label}</span>
                )}
                {i < crumbs.length - 1 && <ChevronRight size={12} />}
              </span>
            ))}
          </motion.nav>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-4 max-w-xl text-sm text-blue-100 sm:text-base"
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-6 h-1 w-24 origin-left rounded-full bg-gradient-to-r from-[#ff2f56] to-[#0F4C81]"
        />
      </div>
    </section>
  );
}