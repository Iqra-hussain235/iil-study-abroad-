"use client";

import React from "react";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { ArrowRight, ChevronDown, Quote, Sparkles } from "lucide-react";

// ────────────────────────────────────────────────────────────────
// DATA (events, images aur per-event quote pehle jaisa hi hai)
// ────────────────────────────────────────────────────────────────
const events = [
  {
    id: 1,
    title: "Beyond the Ordinary",
    description:
      "An outing with the learner where learning is not limit but also a social engagement with each other by exploring more.",
    image: "/images/img7.jpeg",
    quote:
      "Every journey opens new doors to adventure, learning, and unforgettable memories.",
  },
  {
    id: 2,
    title: "Events That Shape Futures",
    description:
      "A successful seminar with the future assistant of doctor to make their life more bright in Abroad As knowledge shouldn’t have to keep, it should have to aware who are not.",
    image: "/images/img2.jpeg",
    quote:
      "Beautiful celebrations are remembered for the emotions they leave behind.",
  },
  {
    id: 3,
    title: "Where Memories Begin",
    description:
      "An outing where student shared their enjoyable gesture with their trainer who always stand by them.",
    image: "/images/img3.jpeg",
    quote:
      "Adventure begins where comfort ends and the best stories are created outside.",
  },
  {
    id: 4,
    title: "Learning Beyond Classrooms",
    description:
      "An event where kids had been welcomed and we always look after the creatives where it exists.",
    image: "/images/img4.jpeg",
    quote:
      "The quiet of nature and shared moments create the most peaceful memories.",
  },
  {
    id: 5,
    title: "Experiences That Educate",
    description:
      "An event of Independence Day when we recall our duties and make our younger ones recalled to being united.",
    image: "/images/img5.jpeg",
    quote:
      "Campus life is filled with moments that turn into stories remembered forever.",
  },
  {
    id: 6,
    title: "Travel, Learn, Grow",
    description:
      "An exposure of the day where all spoke in an open area where we tried to give experience of real life challenges overcome.",
    image: "/images/img6.jpeg",
    quote:
      "Strong teams are built through shared challenges, laughter, and unforgettable moments.",
  },
];

// ── Naya content: yahan apne hisaab se text badal sakte ho ──

// Intro section (hero ke neeche)
const INTRO_HEADING = "More Than Classrooms, More Than Lessons";
const INTRO_PARAGRAPHS = [
  "At IIL, we believe real learning happens when students step out, speak up and connect. That is why our calendar is filled with outings, seminars, celebrations and open-air sessions, each one designed to build confidence, friendships and a global mindset.",
  "Every event you see below is a chapter from our students' journey. Scroll down, enjoy the memories, and imagine yourself in the next one.",
];

// Events ke beech aane wale quote bands (2 quotes = 2 bands)
const QUOTES = [
  {
    quote: "Learning never stops at the classroom door. It only gets more beautiful outside.",
    by: "Team IIL",
  },
  {
    quote: "Memories are the real certificates of a life lived with courage and curiosity.",
    by: "Team IIL",
  },
];

// Scrolling theme strip
const THEMES = [
  "Seminars",
  "Outings",
  "Celebrations",
  "Workshops",
  "Open-Air Sessions",
  "Cultural Moments",
  "Learning Trips",
];

// Closing section
const CLOSING_HEADING = "Be Part Of Our Next Story";
const CLOSING_TEXT =
  "Every great memory starts with a single yes. Join IIL, learn with the best, and let your journey abroad begin with moments you will never forget.";

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

// Text ko word-by-word animate karta hai
function AnimatedWords({ text, className = "" }) {
  return (
    <motion.span
      variants={wordParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className={className}
    >
      {text.split(" ").map((word, i) => (
        <motion.span key={i} variants={wordChild} className="mr-[0.25em] inline-block">
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

const contentParent = { hidden: {}, show: { transition: { staggerChildren: 0.14 } } };
const contentChild = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// ────────────────────────────────────────────────────────────────
// QUOTE BAND (events ke beech)
// ────────────────────────────────────────────────────────────────
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
          <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-pink-300">
            {by}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────
// ONE EVENT ROW (image + content, alternating)
// ────────────────────────────────────────────────────────────────
function EventRow({ event, index }) {
  const isEven = index % 2 === 0;
  const number = String(index + 1).padStart(2, "0");

  return (
    <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -60 : 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`group relative ${!isEven ? "md:order-2" : ""}`}
      >
        {/* offset decorative frame */}
        <div
          className={`absolute h-full w-full rounded-[28px] border-2 border-[#ff2f56]/40 transition-transform duration-500 ${
            isEven
              ? "-bottom-4 -right-4 group-hover:translate-x-1 group-hover:translate-y-1"
              : "-bottom-4 -left-4 group-hover:-translate-x-1 group-hover:translate-y-1"
          }`}
        />
        <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-xl">
          <img
            src={event.image}
            alt={event.title}
            className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-96 md:h-[460px]"
          />
          {/* number badge */}
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-1 text-sm font-extrabold text-[#0F4C81] shadow backdrop-blur">
            {number}
          </span>
          {/* shine sweep on hover */}
          <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-all duration-1000 group-hover:translate-x-[400%] group-hover:opacity-100" />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        variants={contentParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className={`relative ${!isEven ? "md:order-1" : ""}`}
      >
        {/* big faded number */}
        <span
          aria-hidden
          className="pointer-events-none absolute -top-10 right-0 select-none text-[7rem] font-black leading-none text-slate-200/70 md:-top-14 md:text-[9rem]"
        >
          {number}
        </span>

        <motion.span
          variants={contentChild}
          className="relative mb-3 inline-block text-xs font-bold uppercase tracking-[3px] text-[#ff2f56]"
        >
          Featured Event
        </motion.span>

        <motion.h2
          variants={contentChild}
          className="relative mb-3 text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl"
        >
          {event.title}
        </motion.h2>

        <motion.div
          variants={{
            hidden: { scaleX: 0 },
            show: { scaleX: 1, transition: { duration: 0.7 } },
          }}
          className="relative mb-5 h-1 w-16 origin-left rounded-full bg-gradient-to-r from-[#ff2f56] to-[#0F4C81]"
        />

        <motion.p
          variants={contentChild}
          className="relative mb-6 text-base leading-relaxed text-slate-600 sm:text-lg"
        >
          {event.description}
        </motion.p>

        <motion.p
          variants={contentChild}
          className="relative border-l-4 border-[#0F4C81] pl-4 text-base font-semibold italic text-[#0F4C81]"
        >
          {event.quote}
        </motion.p>
      </motion.div>
    </div>
  );
}

// events ko 2-2 ke groups me todte hain taaki beech me quote bands aa sakein
const GROUPS = [events.slice(0, 2), events.slice(2, 4), events.slice(4, 6)];

// ────────────────────────────────────────────────────────────────
// PAGE
// ────────────────────────────────────────────────────────────────
export default function EventShowcasePage() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen overflow-hidden bg-slate-50 font-sans text-slate-900">
      {/* scroll progress bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed left-0 right-0 top-0 z-[55] h-1 origin-left bg-gradient-to-r from-[#ff2f56] to-[#0F4C81]"
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white px-6 py-24 text-center md:px-16 md:py-32">
        <motion.div
          aria-hidden
          animate={{ y: [0, -24, 0], x: [0, 14, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute left-10 top-10 h-40 w-40 rounded-full bg-blue-100/60 opacity-70 blur-3xl"
        />
        <motion.div
          aria-hidden
          animate={{ y: [0, 26, 0], x: [0, -18, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute bottom-10 right-10 h-52 w-52 rounded-full bg-rose-100/50 opacity-60 blur-3xl"
        />

        {/* floating sparkles */}
        <motion.div
          aria-hidden
          animate={{ y: [0, -14, 0], rotate: [0, 12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute left-[12%] top-1/3 hidden text-[#ff2f56]/50 md:block"
        >
          <Sparkles size={34} />
        </motion.div>
        <motion.div
          aria-hidden
          animate={{ y: [0, 16, 0], rotate: [0, -14, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute right-[14%] top-1/4 hidden text-[#0F4C81]/40 md:block"
        >
          <Sparkles size={26} />
        </motion.div>

        <motion.span
          initial={{ opacity: 0, y: -16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative mb-4 inline-block rounded-full border border-blue-200/80 bg-blue-100/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#0F4C81]"
        >
          Explore Experiences
        </motion.span>

        <h1 className="relative mb-6 text-4xl font-extrabold leading-tight text-slate-900 md:text-6xl">
          <AnimatedWords text="Events That Create" />
          <br />
          <AnimatedWords text="Beautiful Memories" className="text-[#0F4C81]" />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="relative mx-auto max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg"
        >
          From adventure trips to special celebrations, discover experiences
          crafted to make every moment unforgettable. Every event tells a story,
          and every journey becomes a memory worth keeping.
        </motion.p>

        {/* scroll cue */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="relative mt-10 flex justify-center text-[#ff2f56]"
        >
          <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* Intro paragraphs */}
      <section className="px-6 py-20 md:px-16">
        <div className="relative mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ff2f56]/10 text-[#ff2f56]">
              <Quote size={26} />
            </span>
            <h2 className="text-3xl font-extrabold text-[#0b1c3d] md:text-4xl">
              {INTRO_HEADING}
            </h2>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-[#ff2f56] to-[#0F4C81]" />
          </Reveal>

          <div className="mt-8 space-y-5">
            {INTRO_PARAGRAPHS.map((text, i) => (
              <Reveal key={i} delay={0.1 + i * 0.12}>
                <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
                  {text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Events + quote bands in between */}
      {GROUPS.map((group, g) => (
        <React.Fragment key={g}>
          <section className="mx-auto max-w-7xl space-y-20 px-6 py-12 md:space-y-28 md:px-12 md:py-16">
            {group.map((event, i) => (
              <EventRow key={event.id} event={event} index={g * 2 + i} />
            ))}
          </section>

          {g < QUOTES.length && <QuoteBand quote={QUOTES[g].quote} by={QUOTES[g].by} />}
        </React.Fragment>
      ))}

      {/* Theme marquee */}
      <section className="mt-16 border-y border-slate-200 bg-white py-6">
        <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              className="events-marquee flex shrink-0 items-center gap-10 pr-10"
            >
              {[...THEMES, ...THEMES].map((theme, i) => (
                <span
                  key={`${copy}-${theme}-${i}`}
                  className="flex items-center gap-10 whitespace-nowrap text-xl font-extrabold text-[#0b1c3d]/70"
                >
                  {theme}
                  <Sparkles size={18} className="text-[#ff2f56]" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-6 py-20 md:px-16">
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
                Join Us
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

      <style jsx global>{`
        @keyframes eventsMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        .events-marquee {
          animation: eventsMarquee 32s linear infinite;
        }
        .events-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Footer (pehle jaisa hi) */}
      <footer className="mt-10 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-16">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <h3 className="mb-1 text-xl font-bold text-slate-900">
                International Institute Of Language
              </h3>
              <p className="text-sm text-slate-600">
                Professional guidance for study abroad, visas, and language exams.
              </p>
            </div>

            <div className="flex gap-6 text-sm font-semibold text-slate-700">
              <a
                href="https://www.linkedin.com/company/iilstudyabroad"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0F4C81]"
              >
                LinkedIn
              </a>
              <a
                href="https://www.facebook.com/iiLstudyabroad"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0F4C81]"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/iil.studyabroad"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0F4C81]"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 py-6 text-center">
          <p className="text-xs text-slate-500">
            © 2026 International Institute Of Language. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}