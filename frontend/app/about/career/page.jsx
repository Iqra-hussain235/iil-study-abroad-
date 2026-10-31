"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Playfair_Display } from "next/font/google";
import { Briefcase, Clock, MapPin, Search, Send, TrendingUp, Users, Heart } from "lucide-react";
import PageHero from "../../../components/about/PageHero";
import Reveal from "../../../components/about/Reveal";
import AboutFooter from "../../../components/about/AboutFooter";
import { APPLY_EMAIL, JOBS } from "../../../data/aboutData";

// Perks ka text placeholder hai, apne hisaab se badal lena.
const PERKS = [
  {
    icon: TrendingUp,
    title: "Grow With Us",
    desc: "Learn visa and language-training work hands-on from experienced seniors.",
  },
  {
    icon: Users,
    title: "Friendly Team",
    desc: "A supportive team that cares about students and about each other.",
  },
  {
    icon: Heart,
    title: "Meaningful Work",
    desc: "Help students and families turn their dreams of going abroad into reality.",
  },
];

// ── Banner + motivational paragraph (apna content yahin badlo) ──
// 1) Apni banner image public/ folder me rakho aur niche ka naam wahi kar do.
const CAREER_BANNER = "/Languages for a Brighter Tomorrow.png";
// 2) Banner ke upar chhota caption chahiye to likho, nahi chahiye to "" rehne do.
const BANNER_CAPTION = "";
// 3) Apna motivational paragraph yahan likho. Har string ek alag paragraph banega.
const MOTIVATION_PARAGRAPHS = [
  "Every big dream begins with one brave step. The path abroad is never easy, but the right people beside you make every mile lighter.",
  "Here, your growth matters as much as your goals. Come as you are, learn with us, and build a career you will be proud of.",
];

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

// Banner image: poori image dikhti hai (crop nahi hoti). Height image ke
// aspect ratio se apne aap set hoti hai, har screen size par fit rehti hai.
function CareerBanner() {
  return (
    <section className="px-6 pb-4 md:px-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="group relative mx-auto max-w-6xl overflow-hidden rounded-3xl shadow-2xl"
      >
        <img
          src={CAREER_BANNER}
          alt="Careers at IIL"
          className="block h-auto w-full"
        />

        {/* hover par halki shine sweep (image crop/zoom nahi hoti) */}
        <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-all duration-1000 group-hover:translate-x-[400%] group-hover:opacity-100" />

        {BANNER_CAPTION && (
          <>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0f1f]/70 via-transparent to-transparent" />
            <p
              className={`${playfair.className} absolute bottom-6 left-6 right-6 text-xl font-medium italic text-white sm:text-3xl`}
            >
              {BANNER_CAPTION}
            </p>
          </>
        )}
      </motion.div>
    </section>
  );
}

const parent = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const child = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ────────────────────────────────────────────────────────────────
// CAREER  →  route: /about/career
// Jobs data/aboutData.js ke JOBS array se aate hain (abhi placeholder).
// "Apply Now" mailto link kholta hai (APPLY_EMAIL par), backend ki zaroorat nahi.
// ────────────────────────────────────────────────────────────────
export default function CareerPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return JOBS;
    return JOBS.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q) ||
        j.desc.toLowerCase().includes(q)
    );
  }, [query]);

  const applyHref = (job) =>
    `mailto:${APPLY_EMAIL}?subject=${encodeURIComponent(
      `Application for ${job.title}`
    )}&body=${encodeURIComponent(
      "Hello,\n\nI would like to apply for this position. My resume is attached.\n\nName:\nPhone:\nExperience:\n"
    )}`;

  return (
    <div className="w-full overflow-x-hidden bg-white text-slate-800">
      <PageHero
        image="/study-banner.png"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Career" },
        ]}
        title="Empowering Dreams, Building Careers"
        subtitle="We're not just hiring. We're investing in people who want to make a difference and grow with us."
      />

      {/* ────────────── WHY JOIN ────────────── */}
      <section className="px-6 py-16 md:px-16">
        <motion.div
          variants={parent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3"
        >
          {PERKS.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={child}
              whileHover={{ y: -8 }}
              className="group rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-xl"
            >
              <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ff2f56]/10 text-[#ff2f56] transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-[#ff2f56] group-hover:text-white">
                <Icon size={26} />
              </span>
              <h3 className="font-bold text-[#0b1c3d]">{title}</h3>
              <p className="mt-2 text-sm text-slate-600">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ────────────── BANNER IMAGE ────────────── */}
      <CareerBanner />

      {/* ────────────── MOTIVATIONAL PARAGRAPH ────────────── */}
      <section className="px-6 py-16 md:px-16 md:py-20">
        <div className="relative mx-auto max-w-3xl text-center">
          <motion.span
            aria-hidden
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 0.12, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`${playfair.className} pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 select-none text-[9rem] leading-none text-[#ff2f56]`}
          >
            “
          </motion.span>

          <div className="relative space-y-6">
            {MOTIVATION_PARAGRAPHS.map((text, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <p
                  className={`${playfair.className} text-xl font-normal italic leading-relaxed text-[#0b1c3d] sm:text-2xl md:text-[1.7rem] md:leading-[1.7]`}
                >
                  {text}
                </p>
              </Reveal>
            ))}
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mt-10 h-1 w-24 origin-center rounded-full bg-gradient-to-r from-[#ff2f56] to-[#0F4C81]"
          />
        </div>
      </section>

      {/* ────────────── OPENINGS ────────────── */}
      <section className="bg-slate-50 px-6 py-16 md:px-16 md:py-24">
        <Reveal>
          <h2 className="text-center text-3xl font-extrabold text-[#0b1c3d]">
            Current Openings
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
            Didn&apos;t find the right role? Send your resume to{" "}
            <a
              href={`mailto:${APPLY_EMAIL}`}
              className="font-semibold text-[#ff2f56] underline-offset-4 hover:underline"
            >
              {APPLY_EMAIL}
            </a>
            .
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mx-auto mt-8 max-w-xl">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by role or location"
              className="w-full rounded-full border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm shadow-sm outline-none transition focus:border-[#ff2f56] focus:shadow-[0_0_0_4px_rgba(255,47,86,0.12)]"
            />
          </div>
        </Reveal>

        <motion.div layout className="mx-auto mt-10 grid max-w-5xl gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((job) => (
              <motion.article
                key={job.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl"
              >
                <span className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-gradient-to-b from-[#ff2f56] to-[#0F4C81] transition-transform duration-500 group-hover:scale-y-100" />

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="flex items-center gap-2 text-lg font-extrabold text-[#0b1c3d]">
                      <Briefcase size={18} className="text-[#ff2f56]" />
                      {job.title}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
                      <span className="flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-blue-700">
                        <MapPin size={12} /> {job.location}
                      </span>
                      <span className="flex items-center gap-1 rounded-full bg-pink-50 px-3 py-1 text-pink-600">
                        <Clock size={12} /> {job.experience}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                        {job.type}
                      </span>
                    </div>
                    <p className="mt-3 max-w-2xl text-sm text-slate-600">{job.desc}</p>
                  </div>

                  <a
                    href={applyHref(job)}
                    className="group/btn inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff2f56] to-[#0F4C81] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(255,47,86,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(255,47,86,0.4)]"
                  >
                    Apply Now
                    <Send
                      size={15}
                      className="transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5"
                    />
                  </a>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-10 text-center text-slate-500"
            >
              No openings match your search.
            </motion.p>
          )}
        </motion.div>
      </section>

      <AboutFooter />
    </div>
  );
}