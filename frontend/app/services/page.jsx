"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowRight, ClipboardList, Compass, GraduationCap, Minus, Plane, Plus, Star } from "lucide-react";
import Footer from "@/components/Footer";
import ServicesSection from "@/components/ServicesSection";
import {
  COACHING_SERVICES,
  MAIN_SERVICE_CATEGORIES,
  VISA_SERVICES,
} from "@/data/servicesData";

// ────────────────────────────────────────────────────────────────
// NAYA CONTENT: yahan apne hisaab se text badal sakte ho
// (numbers, program list aur FAQ answers servicesData se apne aap aate hain)
// ────────────────────────────────────────────────────────────────

const STEPS = [
  {
    icon: Compass,
    title: "Free Counselling",
    desc: "Tell us your goals. Our counsellors understand your profile and suggest the right path.",
  },
  {
    icon: ClipboardList,
    title: "Plan & Enrol",
    desc: "Pick the right course or visa route and get a clear, step-by-step plan.",
  },
  {
    icon: GraduationCap,
    title: "Train & Prepare",
    desc: "Learn with expert trainers, practise with mock tests and prepare with confidence.",
  },
  {
    icon: Plane,
    title: "Fly With Confidence",
    desc: "With documentation and interview support done, your journey abroad begins.",
  },
];

// Pehle About page par jo points the, wahi (client ka apna content)
const WHY_POINTS = [
  "Extra grammar improvement classes",
  "Multimedia classes with modern facilities",
  "Up-to-date library of study material",
  "Weekly mock tests for practice analysis",
];

const QUOTES = [
  { quote: "Every new language you learn opens one more door to the world.", by: "Team IIL" },
  { quote: "The right guidance turns a big dream into a simple plan.", by: "Team IIL" },
];

const CLOSING_HEADING = "Ready To Start Your Journey?";
const CLOSING_TEXT =
  "Tell us where you want to go and what you want to achieve. Our team will guide you from the first class to the final flight.";

// Data se bani cheezein
const coachingTitles = COACHING_SERVICES.map((s) => s.title);
const coachingCategories = MAIN_SERVICE_CATEGORIES.filter((c) => c.type === "coaching");

const STATS = [
  { value: COACHING_SERVICES.length, label: "Coaching Programs" },
  { value: VISA_SERVICES.length, label: "Visa Services" },
  { value: coachingCategories.length, label: "Ways To Learn" },
  { value: MAIN_SERVICE_CATEGORIES.length, label: "Service Categories" },
];

const FAQS = [
  {
    q: "Which exams and languages do you prepare students for?",
    a: `We offer coaching for ${coachingTitles.join(", ")}.`,
  },
  {
    q: "Do you offer online classes?",
    a: "Yes. Along with in-house coaching, we offer live and flexible online coaching so you can prepare from anywhere at your own pace.",
  },
  {
    q: "Do you help with visa applications?",
    a: `Yes. Our visa assistance covers ${VISA_SERVICES.map((v) => v.title).join(
      ", "
    )}, including documentation, application procedure and interview preparation.`,
  },
  {
    q: "How can I get started?",
    a: "Fill in our enquiry form or contact us directly. Our counsellors will get back to you and guide you on the next steps.",
  },
];

// ────────────────────────────────────────────────────────────────
// SMALL ANIMATION HELPERS
// ────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, x = 0, y = 30, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const wordParent = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const wordChild = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function AnimatedWords({ text }) {
  return (
    <motion.span variants={wordParent} initial="hidden" whileInView="show" viewport={{ once: true }}>
      {text.split(" ").map((word, i) => (
        <motion.span key={i} variants={wordChild} className="mr-[0.25em] inline-block">
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

const staggerParent = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const staggerChild = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-3xl text-center">
      <span className="mx-auto mb-3 block w-fit rounded-full bg-[#ff2f56]/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#ff2f56]">
        {eyebrow}
      </span>
      <h2 className="text-3xl font-extrabold text-[#0b1c3d] sm:text-4xl">{title}</h2>
      <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-[#ff2f56] to-[#0F4C81]" />
      {subtitle && <p className="mt-5 text-slate-600">{subtitle}</p>}
    </Reveal>
  );
}

// Number 0 se target tak ginta hai (jab screen par aaye)
function Counter({ to }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    let start;
    const duration = 1200;
    const tick = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return <span ref={ref}>{val}</span>;
}

function QuoteBand({ quote, by }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0b2545] to-[#123a6b] px-6 py-20 text-center md:px-16 md:py-28">
      <motion.div
        aria-hidden
        animate={{ y: [0, -22, 0], x: [0, 14, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-10 top-6 h-56 w-56 rounded-full bg-[#ff2f56]/20 blur-[80px]"
      />
      <motion.div
        aria-hidden
        animate={{ y: [0, 26, 0], x: [0, -16, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-blue-400/20 blur-[90px]"
      />
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/10"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 select-none text-[10rem] font-black leading-none text-white/5"
      >
        “
      </span>
      <div className="relative mx-auto max-w-3xl">
        <p className="text-2xl font-bold italic leading-snug text-white sm:text-3xl md:text-4xl">
          <AnimatedWords text={quote} />
        </p>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-8 h-1 w-20 origin-center rounded-full bg-gradient-to-r from-[#ff2f56] to-[#0F4C81]"
        />
        <Reveal delay={0.5}>
          <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-pink-300">{by}</p>
        </Reveal>
      </div>
    </section>
  );
}

function FaqItem({ q, a, open, onToggle }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-white transition-shadow ${
        open ? "border-[#ff2f56]/40 shadow-lg" : "border-slate-200 shadow-sm"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-bold text-[#0b1c3d]">{q}</span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
            open ? "bg-[#ff2f56] text-white" : "bg-slate-100 text-slate-600"
          }`}
        >
          {open ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="px-6 pb-5 text-slate-600">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// PAGE
// ────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      {/* Pehle jaisa hi: cards wala ServicesSection (Home page par bhi yahi use hota hai, isliye ise chhua nahi) */}
      <ServicesSection
        id="services-page"
        showCta={false}
        animateOnView={false}
        className="pt-8"
      />

      <div className="overflow-hidden">
        {/* ────────────── STATS ────────────── */}
        <section className="bg-white px-6 py-16 md:px-16">
          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-4"
          >
            {STATS.map(({ value, label }) => (
              <motion.div
                key={label}
                variants={staggerChild}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-xl"
              >
                <p className="bg-gradient-to-r from-[#ff2f56] to-[#0F4C81] bg-clip-text text-5xl font-black text-transparent">
                  <Counter to={value} />
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-600">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ────────────── PROGRAMS WE TEACH ────────────── */}
        <section className="bg-slate-50 px-6 py-16 md:px-16 md:py-24">
          <SectionHeading
            eyebrow="Language & Exam Coaching"
            title="Programs We Teach"
            subtitle="From English and foreign languages to every major proficiency test, find the program that fits your goal."
          />

          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {COACHING_SERVICES.map((svc) => (
              <motion.div
                key={svc.id}
                variants={staggerChild}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl"
              >
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#ff2f56] to-[#0F4C81] transition-transform duration-500 group-hover:scale-x-100" />
                <h3 className="text-lg font-extrabold text-[#0b1c3d] transition-colors group-hover:text-[#ff2f56]">
                  {svc.title}
                </h3>
                {svc.levels.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {svc.levels.map((lvl) => (
                      <span
                        key={lvl}
                        className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#0F4C81]"
                      >
                        {lvl}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-slate-500">Expert-led coaching</p>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* visa services chips */}
          <Reveal delay={0.1} className="mx-auto mt-14 max-w-4xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-[#0F4C81]">
              Visa Assistance
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {VISA_SERVICES.map((v, i) => (
                <motion.span
                  key={v.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="rounded-full bg-gradient-to-r from-[#ff2f56] to-[#0F4C81] px-5 py-2 text-sm font-semibold text-white shadow-md"
                >
                  {v.title}
                </motion.span>
              ))}
            </div>
          </Reveal>
        </section>

        <QuoteBand quote={QUOTES[0].quote} by={QUOTES[0].by} />

        {/* ────────────── HOW IT WORKS ────────────── */}
        <section className="bg-white px-6 py-16 md:px-16 md:py-24">
          <SectionHeading
            eyebrow="Simple Process"
            title="Your Journey, Step By Step"
            subtitle="No confusion, no guesswork. Here is how we take you from first question to final flight."
          />

          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="relative mx-auto grid max-w-6xl gap-6 md:grid-cols-4"
          >
            {/* connecting line (desktop) */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="pointer-events-none absolute left-[12%] right-[12%] top-12 hidden h-0.5 origin-left bg-gradient-to-r from-[#ff2f56] to-[#0F4C81] opacity-30 md:block"
            />
            {STEPS.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                variants={staggerChild}
                whileHover={{ y: -8 }}
                className="group relative rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-xl"
              >
                <span className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ff2f56]/10 text-[#ff2f56] transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-[#ff2f56] group-hover:text-white">
                  <Icon size={28} />
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#0F4C81] text-xs font-bold text-white">
                    {i + 1}
                  </span>
                </span>
                <h3 className="font-bold text-[#0b1c3d]">{title}</h3>
                <p className="mt-2 text-sm text-slate-600">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ────────────── WHY LEARN WITH IIL ────────────── */}
        <section className="bg-slate-50 px-6 py-16 md:px-16 md:py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
            <Reveal x={-40} y={0}>
              <div className="group relative">
                <div className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl border-2 border-[#ff2f56]/40 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1" />
                <div className="relative overflow-hidden rounded-2xl shadow-xl">
                  <img
                    src="/class2.jpeg"
                    alt="Learning at IIL"
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal x={40} y={0} delay={0.15}>
              <span className="inline-block rounded-full bg-[#ff2f56]/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#ff2f56]">
                Why IIL
              </span>
              <h2 className="mt-4 text-3xl font-extrabold text-[#0b1c3d] sm:text-4xl">
                Learn The Way That Works For You
              </h2>
              <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-[#ff2f56] to-[#0F4C81]" />
              <p className="mt-5 text-slate-600">
                Every student learns differently, so we combine experienced trainers,
                a well-planned curriculum and regular practice to help you reach your
                target score with confidence.
              </p>
              <p className="mt-4 text-slate-600">
                Choose in-house classes for a classroom experience or online coaching
                for flexibility, and get complete visa guidance alongside your
                preparation.
              </p>
              <motion.ul
                variants={staggerParent}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="mt-6 space-y-3"
              >
                {WHY_POINTS.map((p) => (
                  <motion.li
                    key={p}
                    variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}
                    className="flex items-center gap-3 text-slate-700"
                  >
                    <Star size={16} className="shrink-0 fill-pink-500/20 text-pink-500" />
                    {p}
                  </motion.li>
                ))}
              </motion.ul>
            </Reveal>
          </div>
        </section>

        <QuoteBand quote={QUOTES[1].quote} by={QUOTES[1].by} />

        {/* ────────────── FAQ ────────────── */}
        <section className="bg-white px-6 py-16 md:px-16 md:py-24">
          <SectionHeading
            eyebrow="Got Questions?"
            title="Frequently Asked Questions"
          />
          <div className="mx-auto max-w-3xl space-y-4">
            {FAQS.map((item, i) => (
              <Reveal key={item.q} delay={i * 0.08} y={20}>
                <FaqItem
                  q={item.q}
                  a={item.a}
                  open={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
                />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ────────────── CLOSING CTA ────────────── */}
        <section className="bg-slate-50 px-6 py-16 md:px-16">
          <Reveal>
            <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 overflow-hidden rounded-3xl bg-gradient-to-r from-[#ff2f56] to-[#0F4C81] px-6 py-14 text-center sm:px-12">
              <motion.div
                aria-hidden
                animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-white"
              />
              <div className="relative max-w-2xl">
                <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
                  {CLOSING_HEADING}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/85 sm:text-base">
                  {CLOSING_TEXT}
                </p>
              </div>
              <div className="relative flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/enquiry"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-[#0b1c3d] shadow-lg transition hover:-translate-y-0.5 hover:shadow-2xl"
                >
                  Start Your Enquiry
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/60 px-7 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </div>

      <Footer />
    </>
  );
}