"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  Globe2,
  Users,
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import PageHero from "../../components/about/PageHero";
import Reveal from "../../components/about/Reveal";
import AboutFooter from "../../components/about/AboutFooter";
import { COUNTRIES } from "../../data/aboutData";

// ── Placeholder data — swap these out for the real content/images ──
const GALLERY_IMAGES = [
  "/class1.jpeg", // pehle "class1.jpeg" tha (leading slash missing), fix kiya
  "/18_image.png",
  "/19_image.png",
  "/section image (study visa).png",
  "/certificte.jpeg",
];

const COACHING_TABS = [
  { label: "IELTS", color: "bg-blue-900" },
  { label: "PTE", color: "bg-pink-500" },
  { label: "TOEFL", color: "bg-teal-600" },
  { label: "Spoken English", color: "bg-pink-400" },
];

const FACULTY_MEMBERS = [
  {
    name: "Maaz Khan",
    designation: "Director and Expert Trainer",
    image: "/18_image.png",
  },
  {
    name: "Aaliya Roshni",
    designation: "French and Spoken English Trainer",
    image: "/24_image.png",
  },
  {
    name: "Bushra Abdullah",
    designation: "German and English Trainer",
    image: "/23_image.png",
  },
  {
    name: "Milan Kumar",
    designation: "Marketing Manager",
    image: "/images/Mr. Andhera.png",
  },
];

const WHY_CHOOSE = [
  {
    icon: CheckCircle2,
    title: "Certified Consultants",
    desc: "Registered and certified immigration consultancy with proven track record",
  },
  {
    icon: Globe2,
    title: "Global Network",
    desc: "Partnerships with top universities across 20+ countries worldwide",
  },
  {
    icon: Users,
    title: "Expert Team",
    desc: "Dedicated counsellors with years of field experience",
  },
];

const COACHING_POINTS = [
  "Extra grammar improvement classes",
  "Multimedia classes with modern facilities",
  "Up-to-date library of study material",
  "Weekly mock tests for practice analysis",
];

const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const staggerChild = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

// ────────────────────────────────────────────────────────────────
// ABOUT US PAGE (default export)  →  route: /about
// ────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [slide, setSlide] = useState(0);

  const nextSlide = () => setSlide((s) => (s + 1) % GALLERY_IMAGES.length);
  const prevSlide = () =>
    setSlide((s) => (s - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);

  return (
    <div className="w-full overflow-x-hidden bg-white text-slate-800">
      {/* ────────────────── HERO ────────────────── */}
      <PageHero
        image="/study-banner.png"
        crumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        title={
          <>
            International Institute Of Languages
            <br className="hidden sm:block" /> &amp; Study Abroad
          </>
        }
        subtitle="Empowering students to achieve their global dreams through quality education, language training, and expert guidance."
      />

      {/* ────────────────── BEST IMMIGRATION & VISA CONSULTANTS ────────────────── */}
      <section className="px-6 py-16 md:px-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <Reveal x={-40} y={0}>
            <span className="inline-block rounded-full bg-[#ff2f56]/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#ff2f56]">
              About IIL
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-[#0b1c3d] sm:text-4xl">
              Best Immigration And Visa Consultants
            </h2>
            <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-[#ff2f56] to-[#0F4C81]" />
            <p className="mt-5 text-slate-600">
              There are lots of students in India who dream of studying,
              working or living abroad. But it is not as easy as it seems. It
              requires hard work and proper guidance. Today, it is a challenge
              for students to search for a trustworthy study visa consultant.
            </p>
            <p className="mt-4 text-slate-600">
              Here at International Institute Of Languages &amp; Study Abroad
              (IIL), we promise to provide accurate advice about study visas,
              work permits, visitor visas, and PR related to your profile. IIL
              is a registered and certified immigration consultancy
              established in Moradabad.
            </p>
            <p className="mt-4 border-l-4 border-[#ff2f56] pl-4 font-semibold text-[#0b1c3d]">
              We have tie-ups with highly reputed professionals, colleges, and
              universities in Canada, Australia, New Zealand, the USA/UK,
              Portugal, Ireland, Poland, Singapore, Cyprus, Sweden, Germany,
              France, and many more countries.
            </p>
          </Reveal>

          <Reveal x={40} y={0} delay={0.15}>
            <div className="group relative">
              {/* offset decorative frame */}
              <div className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl border-2 border-[#ff2f56]/40 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1" />
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <img
                  src="/images/consulting.webp"
                  alt="Consultation"
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ────────────────── COUNTRIES MARQUEE ────────────────── */}
      <section className="border-y border-slate-100 bg-slate-50 py-6">
        <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="about-marquee flex shrink-0 items-center gap-10 pr-10">
            {[...COUNTRIES, ...COUNTRIES].map((c, i) => (
              <span
                key={`${c}-${i}`}
                className="flex items-center gap-10 whitespace-nowrap text-lg font-bold text-[#0b1c3d]/70"
              >
                {c}
                <Globe2 size={18} className="text-[#ff2f56]" />
              </span>
            ))}
          </div>
          <div
            aria-hidden
            className="about-marquee flex shrink-0 items-center gap-10 pr-10"
          >
            {[...COUNTRIES, ...COUNTRIES].map((c, i) => (
              <span
                key={`dup-${c}-${i}`}
                className="flex items-center gap-10 whitespace-nowrap text-lg font-bold text-[#0b1c3d]/70"
              >
                {c}
                <Globe2 size={18} className="text-[#ff2f56]" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────── PHOTO CAROUSEL ────────────────── */}
      <section className="relative overflow-hidden bg-[#050b18] px-6 py-16 md:px-16">
        <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-[60%] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[110px]" />
        <Reveal>
          <h2 className="relative mb-10 text-center text-2xl font-bold text-white sm:text-3xl">
            Moments From IIL
          </h2>
        </Reveal>
        <div className="relative mx-auto flex max-w-5xl items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            aria-label="Previous photo"
            className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#ff2f56]"
          >
            <ChevronLeft size={20} />
          </motion.button>

          <div className="flex w-full max-w-3xl gap-4 overflow-hidden py-4">
            <AnimatePresence mode="popLayout" initial={false}>
              {[0, 1, 2].map((offset) => {
                const idx = (slide + offset) % GALLERY_IMAGES.length;
                return (
                  <motion.img
                    key={idx}
                    layout
                    initial={{ opacity: 0, x: 60, scale: 0.9 }}
                    animate={{
                      opacity: offset === 1 ? 1 : 0.6,
                      x: 0,
                      scale: offset === 1 ? 1.05 : 1,
                    }}
                    exit={{ opacity: 0, x: -60, scale: 0.9 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    src={GALLERY_IMAGES[idx]}
                    alt={`Gallery ${idx + 1}`}
                    className={`h-48 flex-1 rounded-xl object-cover shadow-lg sm:h-56 ${
                      offset === 1 ? "" : "hidden sm:block"
                    }`}
                  />
                );
              })}
            </AnimatePresence>
          </div>

          <motion.button
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            aria-label="Next photo"
            className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#ff2f56]"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>
        <div className="relative mt-6 flex justify-center gap-2">
          {GALLERY_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === slide ? "w-6 bg-[#ff2f56]" : "w-1.5 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ────────────────── WHY CHOOSE IIL ────────────────── */}
      <section className="px-6 py-16 md:px-16">
        <Reveal>
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b2545] to-[#123a6b] px-6 py-12 sm:px-12">
            <motion.div
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-dashed border-white/10"
            />
            <h2 className="relative mb-10 text-center text-2xl font-bold text-white sm:text-3xl">
              Why Choose IIL?
            </h2>
            <motion.div
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="relative grid gap-6 sm:grid-cols-3"
            >
              {WHY_CHOOSE.map(({ icon: Icon, title, desc }) => (
                <motion.div
                  key={title}
                  variants={staggerChild}
                  whileHover={{ y: -8 }}
                  className="rounded-2xl border border-white/5 bg-white/5 p-6 text-center backdrop-blur-sm transition-colors hover:border-pink-400/40 hover:bg-white/10"
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Icon className="mx-auto mb-4 h-9 w-9 text-pink-400" />
                  </motion.div>
                  <h3 className="mb-2 font-bold text-white">{title}</h3>
                  <p className="text-sm text-blue-100">{desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Reveal>
      </section>

      {/* ────────────────── COACHING PROGRAMS ────────────────── */}
      <section className="px-6 py-16 md:px-16 md:py-24">
        <Reveal>
          <h2 className="mb-10 text-center text-3xl font-extrabold text-[#0b1c3d]">
            Our Language Coaching Programs
          </h2>
        </Reveal>
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <Reveal x={-40} y={0}>
            <div className="mb-6 flex flex-wrap gap-3">
              {COACHING_TABS.map((tab, i) => (
                <motion.button
                  key={tab.label}
                  onClick={() => setActiveTab(i)}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ scale: activeTab === i ? 1.08 : 1 }}
                  className={`rounded-full px-5 py-2 text-sm font-semibold text-white transition ${tab.color} ${
                    activeTab === i ? "ring-2 ring-offset-2 ring-blue-400" : "opacity-80"
                  }`}
                >
                  {tab.label}
                </motion.button>
              ))}
            </div>
            <p className="text-slate-600">
              IIL has centres in Moradabad to prepare you for the language
              ability tests. Our IELTS, PTE, and spoken English trainers
              possess incomparable expertise and teaching skills. We have a
              team of IDP and British Council-certified faculty.
            </p>
            <p className="mt-4 text-slate-600">
              We have designed the curriculum and followed the teaching
              techniques that are suitable for every student. We offer online
              and offline coaching, allowing them to get the desired band
              score.
            </p>
            <motion.ul
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-6 space-y-3"
            >
              {COACHING_POINTS.map((point) => (
                <motion.li
                  key={point}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0 },
                  }}
                  className="flex items-center gap-3 text-slate-700"
                >
                  <Star size={16} className="shrink-0 fill-pink-500/20 text-pink-500" />
                  {point}
                </motion.li>
              ))}
            </motion.ul>
          </Reveal>

          <Reveal x={40} y={0} delay={0.15}>
            <div className="group relative overflow-hidden rounded-2xl shadow-xl">
              <img
                src="/class2.jpeg"
                alt="Coaching class"
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b1c3d]/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ────────────────── FACULTY & TRAINERS ────────────────── */}
      <section className="bg-slate-50 px-6 py-16 md:px-16 md:py-24">
        <Reveal>
          <h2 className="mb-3 text-center text-3xl font-extrabold text-[#0b1c3d]">
            Meet Our Faculty &amp; Trainers
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-center text-slate-600">
            Certified, experienced trainers dedicated to helping you reach your
            target score and your goals abroad.
          </p>
        </Reveal>
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {FACULTY_MEMBERS.map((member) => (
            <motion.div
              key={member.name}
              variants={staggerChild}
              whileHover={{ y: -8 }}
              className="group overflow-hidden rounded-2xl bg-white text-center shadow-sm transition-shadow hover:shadow-xl"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#ff2f56] to-[#0F4C81] transition-transform duration-500 group-hover:scale-x-100" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-[#0b1c3d]">{member.name}</h3>
                <p className="mt-1 text-sm font-medium text-pink-500">
                  {member.designation}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ────────────────── FLAGS VIDEO + QUOTE ────────────────── */}
      <section className="relative h-[55vh] min-h-[360px] w-full overflow-hidden bg-black">
        <div className="absolute inset-0 h-full w-full">
          <iframe
            className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 scale-150"
            src="https://www.youtube-nocookie.com/embed/31s-kuyS5eM?autoplay=1&mute=1&loop=1&playlist=31s-kuyS5eM&controls=0&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1"
            title="Flags background video"
            allow="autoplay; encrypted-media"
            frameBorder="0"
          />
        </div>
        {/* Startup cover — hides the brief YouTube UI flash, fades out after load */}
        <div className="absolute inset-0 z-[5] animate-[fadeOutCover_2.5s_ease-out_forwards] bg-black" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
          <motion.p
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="max-w-2xl text-2xl font-bold italic text-white sm:text-3xl"
          >
            "Your dreams don't have a border — and neither should your future."
          </motion.p>
        </div>
      </section>

      {/* ────────────────── CTA → BRANCHES ────────────────── */}
      <section className="px-6 py-16 md:px-16">
        <Reveal>
          <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 overflow-hidden rounded-3xl bg-gradient-to-r from-[#ff2f56] to-[#0F4C81] px-6 py-12 text-center sm:flex-row sm:justify-between sm:px-12 sm:text-left">
            <motion.div
              aria-hidden
              animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.3, 0.15] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-white"
            />
            <div className="relative">
              <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
                Visit us or talk to a counsellor
              </h2>
              <p className="mt-2 text-sm text-white/80">
                Find our office details, timings and location map.
              </p>
            </div>
            <Link
              href="/about/branches"
              className="group relative inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-[#0b1c3d] shadow-lg transition hover:-translate-y-0.5 hover:shadow-2xl"
            >
              Our Branches
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>
      </section>

      <style jsx global>{`
        @keyframes fadeOutCover {
          0% { opacity: 1; }
          70% { opacity: 1; }
          100% { opacity: 0; visibility: hidden; }
        }
        @keyframes aboutMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        .about-marquee {
          animation: aboutMarquee 35s linear infinite;
        }
        .about-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* ────────────────── FOOTER ────────────────── */}
      <AboutFooter />
    </div>
  );
}