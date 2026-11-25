"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import PageHero from "../../../components/about/PageHero";
import Reveal from "../../../components/about/Reveal";
import AboutFooter from "../../../components/about/AboutFooter";
import { BRANCHES } from "../../../data/aboutData";

const INSTITUTE_IMAGE = "/Your Gateway to a Global Future.png";
const INSTITUTE_CAPTION = "";


const GALLERY_SLIDES = [
  { src: "/class1.jpeg", title: "Learning Together" },
  { src: "/class2.jpeg", title: "Inside Our Classrooms" },
  { src: "/18_image.png", title: "Meet The Team" },
  { src: "/19_image.png", title: "Moments At IIL" },
  { src: "/certificte.jpeg", title: "Our Achievements" },
];
const SLIDE_MS = 4500; 
const TICK_MS = 50;

const slideVariants = {
  enter: (d) => ({ opacity: 0, x: d * 70, scale: 1.04 }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (d) => ({
    opacity: 0,
    x: d * -70,
    scale: 0.98,
    transition: { duration: 0.5 },
  }),
};


function BranchSlideshow() {
  const total = GALLERY_SLIDES.length;
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const goTo = (i, d) => {
    setDir(d ?? (i > index ? 1 : -1));
    setIndex((i + total) % total);
    setProgress(0);
  };

 
  useEffect(() => {
    if (paused || reduceMotion || total < 2) return;
    const t = setInterval(
      () => setProgress((p) => p + (100 * TICK_MS) / SLIDE_MS),
      TICK_MS
    );
    return () => clearInterval(t);
  }, [paused, reduceMotion, total]);


  useEffect(() => {
    if (progress >= 100) {
      setDir(1);
      setIndex((i) => (i + 1) % total);
      setProgress(0);
    }
  }, [progress, total]);

  if (total === 0) return null;
  const current = GALLERY_SLIDES[index];

  return (
    <div
      className="mx-auto"
      style={{ width: "min(100%, calc(60vh * 1.7778))", minWidth: "min(100%, 340px)" }}
    >
      <div
        className="group relative aspect-[4/3] overflow-hidden rounded-3xl bg-black shadow-[0_30px_80px_rgba(0,0,0,0.5)] sm:aspect-video"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence initial={false} custom={dir}>
          <motion.div
            key={index}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            {/* blurred backdrop with slow zoom */}
            <motion.img
              aria-hidden
              src={current.src}
              alt=""
              initial={{ scale: 1.1 }}
              animate={{ scale: 1.25 }}
              transition={{ duration: SLIDE_MS / 1000 + 1, ease: "linear" }}
              className="absolute inset-0 h-full w-full object-cover opacity-60 blur-2xl"
            />
            <div className="absolute inset-0 bg-black/30" />
            {/* actual image: poori dikhti hai */}
            <img
              src={current.src}
              alt={current.title}
              className="relative h-full w-full object-contain"
            />
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />

        {/* caption */}
        <motion.p
          key={`cap-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="absolute bottom-6 left-6 right-6 text-lg font-bold text-white drop-shadow-lg sm:bottom-8 sm:left-8 sm:text-2xl"
        >
          {current.title}
        </motion.p>

        {/* counter */}
        <div className="absolute right-5 top-4 flex items-baseline gap-1 text-white drop-shadow-lg sm:right-8 sm:top-6">
          <motion.span
            key={`num-${index}`}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-extrabold sm:text-4xl"
          >
            {String(index + 1).padStart(2, "0")}
          </motion.span>
          <span className="text-sm font-semibold text-white/60">
            / {String(total).padStart(2, "0")}
          </span>
        </div>

        {/* arrows */}
        {total > 1 && (
          <>
            <motion.button
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => goTo(index - 1, -1)}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-[#ff2f56] sm:left-5 sm:opacity-0 sm:group-hover:opacity-100"
            >
              <ChevronLeft size={22} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => goTo(index + 1, 1)}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-[#ff2f56] sm:right-5 sm:opacity-0 sm:group-hover:opacity-100"
            >
              <ChevronRight size={22} />
            </motion.button>
          </>
        )}

        {/* progress bar */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20">
          <div
            className="h-full bg-gradient-to-r from-[#ff2f56] to-[#0F4C81]"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>

      {/* thumbnails */}
      {total > 1 && (
        <div className="mt-5 flex justify-center gap-3 overflow-x-auto pb-2">
          {GALLERY_SLIDES.map((s, i) => (
            <motion.button
              key={s.src}
              onClick={() => goTo(i)}
              whileHover={{ y: -4 }}
              animate={{ scale: i === index ? 1.08 : 1, opacity: i === index ? 1 : 0.55 }}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-14 w-20 shrink-0 overflow-hidden rounded-lg transition-shadow sm:h-16 sm:w-24 ${
                i === index ? "ring-2 ring-[#ff2f56] ring-offset-2 ring-offset-[#050b18]" : ""
              }`}
            >
              <img src={s.src} alt="" className="h-full w-full object-cover" />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// OUR BRANCHES  →  route: /about/branches
// Branch add karna ho to data/aboutData.js ke BRANCHES me ek object add karo.
// ────────────────────────────────────────────────────────────────
export default function BranchesPage() {
  const [activeId, setActiveId] = useState(BRANCHES[0].id);
  const branch = BRANCHES.find((b) => b.id === activeId) ?? BRANCHES[0];

  const details = [
    { Icon: MapPin, text: branch.address, align: "items-start" },
    { Icon: Mail, text: branch.email, align: "items-center" },
    { Icon: Clock, text: branch.hours, align: "items-center" },
    { Icon: Phone, text: branch.phone, align: "items-center" },
  ];

  return (
    <div className="w-full overflow-x-hidden bg-white text-slate-800">
      <PageHero
        image="/study-banner.png"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Our Branches" },
        ]}
        title="Moradabad"
        subtitle="Visit us for one-to-one guidance on study visas, work permits and language coaching."
      />

      {/* ────────────── INSTITUTE IMAGE ────────────── */}
      <section className="px-6 pb-4 pt-16 md:px-16 md:pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="group relative mx-auto max-w-5xl overflow-hidden rounded-3xl shadow-2xl"
        >
          {/* poori image dikhti hai, crop nahi hoti */}
          <img
            src={INSTITUTE_IMAGE}
            alt="Our institute"
            className="block h-auto w-full"
          />

          {/* hover par halki shine sweep */}
          <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-all duration-1000 group-hover:translate-x-[400%] group-hover:opacity-100" />
        </motion.div>

        {INSTITUTE_CAPTION && (
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-3xl text-center text-sm font-medium text-slate-500 sm:text-base">
              {INSTITUTE_CAPTION}
            </p>
          </Reveal>
        )}
      </section>

      {/* ────────────── SLIDESHOW ────────────── */}
      <section className="relative mt-16 overflow-hidden bg-[#050b18] px-6 py-16 md:px-16 md:py-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[60%] -translate-x-1/2 rounded-full bg-blue-600/15 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-20 right-10 h-64 w-64 rounded-full bg-[#ff2f56]/10 blur-[110px]" />

        <Reveal>
          <p className="relative text-center text-sm font-semibold uppercase tracking-widest text-[#ff2f56]">
            Life At IIL
          </p>
          <h2 className="relative mt-2 text-center text-3xl font-extrabold text-white">
            A Glimpse Inside Our Institute
          </h2>
          <div className="relative mx-auto mb-10 mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-[#ff2f56] to-[#0F4C81]" />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative">
            <BranchSlideshow />
          </div>
        </Reveal>
      </section>

      <section className="bg-slate-50 px-6 py-16 md:px-16 md:py-24">
        <Reveal>
          <p className="text-center text-sm font-semibold uppercase tracking-wide text-blue-700">
            We are Professional Experts in Immigration Visa
          </p>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-[#0b1c3d]">
            Our Offices
          </h2>
          <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-[#ff2f56] to-[#0F4C81]" />
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-[240px_1fr]">
          {/* ── office selector ── */}
          <Reveal x={-30} y={0}>
            <div className="overflow-hidden rounded-xl bg-[#0b2a4a] shadow-lg">
              <div className="px-5 py-4 font-semibold text-white">Select Office</div>
              <div className="relative">
                {BRANCHES.map((b) => {
                  const active = b.id === activeId;
                  return (
                    <button
                      key={b.id}
                      onClick={() => setActiveId(b.id)}
                      className="relative w-full px-5 py-4 text-left font-medium text-white"
                    >
                      {active && (
                        <motion.span
                          layoutId="branch-active"
                          className="absolute inset-0 bg-[#123a6b]"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      {active && (
                        <motion.span
                          layoutId="branch-bar"
                          className="absolute inset-y-0 left-0 w-1 bg-[#ff2f56]"
                        />
                      )}
                      <span className="relative flex items-center gap-2">
                        <MapPin
                          size={16}
                          className={active ? "text-[#ff2f56]" : "text-white/50"}
                        />
                        {b.city}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* ── office details ── */}
          <Reveal x={30} y={0} delay={0.1}>
            <AnimatePresence mode="wait">
              <motion.div
                key={branch.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl bg-white p-6 shadow-sm"
              >
                <h3 className="flex items-center gap-2 text-lg font-bold text-[#0b1c3d]">
                  <motion.span
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  >
                    <MapPin size={18} className="text-pink-500" />
                  </motion.span>
                  {branch.title}
                </h3>

                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{ show: { transition: { staggerChildren: 0.08 } } }}
                  className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2"
                >
                  {details.map(({ Icon, text, align }) => (
                    <motion.p
                      key={text}
                      variants={{
                        hidden: { opacity: 0, y: 12 },
                        show: { opacity: 1, y: 0 },
                      }}
                      className={`flex gap-2 rounded-lg p-2 transition-colors hover:bg-slate-50 ${align}`}
                    >
                      <Icon
                        size={16}
                        className={`shrink-0 text-blue-700 ${
                          align === "items-start" ? "mt-0.5" : ""
                        }`}
                      />
                      {text}
                    </motion.p>
                  ))}
                </motion.div>

                <div className="mt-6 h-64 w-full overflow-hidden rounded-lg">
                  <iframe
                    title={`${branch.city} office map`}
                    className="h-full w-full border-0"
                    loading="lazy"
                    src={`https://www.google.com/maps?q=${branch.mapQuery}&output=embed`}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>
      </section>

      <AboutFooter />
    </div>
  );
}