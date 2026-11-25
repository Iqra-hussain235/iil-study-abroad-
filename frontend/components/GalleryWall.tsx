"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import AppointmentSection from "@/components/AppointmentSection";
export type GalleryItem = { id: string; src: string; caption: string; cat: string };

const ROT = [-2.2, 1.6, -1, 2.4, -1.8, 1.2, -2.6, 0.8];
const TAPE = ["bg-amber-200/80", "bg-sky-200/80", "bg-rose-200/80", "bg-emerald-200/80"];
const PAGE = 9;
const url = (s: string) => s;

/* ---------- hero: three floating polaroids ---------- */
function HeroCard({ it, className, delay, reduce }: { it: GalleryItem; className: string; delay: number; reduce: boolean | null }) {
  return (
    <div className={`absolute ${className}`}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay }}>
        <motion.div
          animate={reduce ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
          className="bg-white p-2.5 pb-3 shadow-2xl shadow-slate-900/15 ring-1 ring-slate-200"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url(it.src)} alt={it.caption} className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <p className="mt-2 text-center text-xs font-semibold text-slate-700">{it.caption}</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

function Hero({ count, albums, gallery }: { count: number; albums: number; gallery: GalleryItem[] }) {
  const reduce = useReducedMotion();
  const spots = ["left-0 top-10 w-64 -rotate-6", "right-0 top-0 w-60 rotate-6", "left-20 top-52 w-60 rotate-2"];
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#eaf3fb] via-white to-white px-6 pb-20 pt-32">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(#0F4C81_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_1.05fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Link href="/" className="mb-4 inline-block text-sm text-slate-500 transition-colors hover:text-[#0F4C81]">
            ← Back to Home
          </Link>
          <span className="mb-4 block w-fit rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#0F4C81]">
            Gallery
          </span>
          <h1 className="text-5xl font-extrabold leading-[1.05] text-slate-900 md:text-6xl">
            Life at <span className="text-red-500">IIL</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
            Classes, celebrations, certificates and the people who make our institute what it is.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#wall" className="rounded-full bg-[#0F4C81] px-7 py-3 font-semibold text-white shadow-lg shadow-blue-900/20 transition-transform hover:-translate-y-0.5">
              Explore the wall
            </a>
            <a href="#appointment" className="rounded-full border border-slate-300 bg-white px-7 py-3 font-semibold text-slate-800 transition-colors hover:border-[#0F4C81] hover:text-[#0F4C81]">
              Book an appointment
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-slate-700"><strong className="text-slate-900">{count}</strong> moments</span>
            <span className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-slate-700"><strong className="text-slate-900">{albums}</strong> albums</span>
          </div>
        </motion.div>

        <div className="relative mx-auto hidden h-[440px] w-full max-w-lg lg:block">
          {gallery.slice(0, 3).map((it, i) => (
            <HeroCard key={it.id} it={it} className={spots[i]} delay={0.2 + i * 0.15} reduce={reduce} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- one taped polaroid on the wall ---------- */
function Polaroid({ it, i, onOpen, onBad }: { it: GalleryItem; i: number; onOpen: () => void; onBad: (id: string) => void }) {
  const rot = ROT[i % ROT.length];
  return (
    <motion.div
      initial={{ opacity: 0, y: -24, rotate: rot * 3 }}
      whileInView={{ opacity: 1, y: 0, rotate: rot }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ type: "spring", stiffness: 140, damping: 14, delay: (i % 3) * 0.08 }}
      whileHover={{ rotate: 0, y: -8, scale: 1.03 }}
      className="relative mb-9 break-inside-avoid hover:z-10"
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open photo: ${it.caption}`}
        className="group relative block w-full cursor-zoom-in bg-white p-3 pb-4 text-left shadow-[0_10px_30px_-12px_rgba(15,23,42,0.35)] ring-1 ring-slate-200 transition-shadow hover:shadow-[0_26px_50px_-18px_rgba(15,76,129,0.45)]"
      >
        <span className={`absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-3 shadow-sm ${TAPE[i % TAPE.length]}`} />
        <motion.div layoutId={`pic-${it.id}`} className="relative overflow-hidden bg-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url(it.src)} alt={it.caption} loading="lazy" decoding="async" onError={() => onBad(it.id)} className="block h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </motion.div>
        <span className="mt-3 flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-slate-800">{it.caption}</span>
          <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-[#0F4C81]">{it.cat}</span>
        </span>
      </button>
    </motion.div>
  );
}

/* ---------- page ---------- */
export default function GalleryWall({ gallery }: { gallery: GalleryItem[] }) {
  const [active, setActive] = useState<string>("All");
  const [shown, setShown] = useState(PAGE);
  const [open, setOpen] = useState<number | null>(null);
  const [bad, setBad] = useState<string[]>([]);

  const good = useMemo(() => gallery.filter((g) => !bad.includes(g.id)), [bad]);
  const cats = Array.from(new Set(good.map((g) => g.cat)));
  const list = useMemo(() => (active === "All" ? good : good.filter((g) => g.cat === active)), [active, good]);
  const visible = list.slice(0, shown);
  const cur = open !== null ? list[open] : undefined;

  const markBad = (id: string) => setBad((b) => (b.includes(id) ? b : [...b, id]));
  const step = (d: 1 | -1) => setOpen((c) => (c === null ? c : (c + d + list.length) % list.length));

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, list.length]);

  const arrow = "absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-2xl text-white backdrop-blur transition-colors hover:bg-white/30";

  return (
    <main className="overflow-x-hidden bg-white">
      <Hero count={good.length} albums={cats.length} gallery={good} />

      <section id="wall" className="scroll-mt-28 bg-gradient-to-b from-slate-50 to-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-slate-900 md:text-4xl">The memory wall</h2>
          <p className="mx-auto mb-8 mt-2 max-w-xl text-center text-slate-600">Click any photo to see it full size.</p>

          <div role="tablist" aria-label="Filter photos" className="mb-12 flex flex-wrap justify-center gap-2">
            {["All", ...cats].map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={active === c}
                onClick={() => {
                  setActive(c);
                  setShown(PAGE);
                }}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  active === c ? "border-[#0F4C81] bg-[#0F4C81] text-white" : "border-slate-200 bg-white text-slate-700 hover:border-[#0F4C81] hover:text-[#0F4C81]"
                }`}
              >
                {c}
                <span className={`ml-2 text-xs ${active === c ? "text-blue-100" : "text-slate-400"}`}>
                  {c === "All" ? good.length : good.filter((g) => g.cat === c).length}
                </span>
              </button>
            ))}
          </div>

          <div key={active} className="columns-1 gap-8 px-2 sm:columns-2 lg:columns-3">
            {visible.map((it, i) => (
              <Polaroid key={it.id} it={it} i={i} onOpen={() => setOpen(i)} onBad={markBad} />
            ))}
          </div>

          {shown < list.length && (
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setShown((s) => s + PAGE)}
                className="rounded-full border border-[#0F4C81] px-8 py-3 text-sm font-semibold text-[#0F4C81] transition-colors hover:bg-[#0F4C81] hover:text-white"
              >
                Load more photos ({list.length - shown} more)
              </button>
            </div>
          )}
        </div>
      </section>

      <AppointmentSection />

      <AnimatePresence>
        {cur && open !== null && (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={cur.caption}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm"
          >
            <motion.div
              key={cur.id}
              layoutId={`pic-${cur.id}`}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) step(1);
                else if (info.offset.x > 80) step(-1);
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative overflow-hidden rounded-lg bg-black shadow-2xl"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url(cur.src)} alt={cur.caption} style={{ width: "auto", height: "auto", maxWidth: "92vw", maxHeight: "76vh" }} />
            </motion.div>
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/15 px-5 py-2 text-sm font-medium text-white backdrop-blur">
              {cur.caption} · {open + 1} / {list.length}
            </p>
            <button type="button" aria-label="Close" onClick={(e) => { e.stopPropagation(); setOpen(null); }} className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-xl text-white backdrop-blur transition-colors hover:bg-red-500">✕</button>
            <button type="button" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); step(-1); }} className={`${arrow} left-4`}>‹</button>
            <button type="button" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); step(1); }} className={`${arrow} right-4`}>›</button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}