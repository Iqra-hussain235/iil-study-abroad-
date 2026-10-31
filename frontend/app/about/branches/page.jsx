"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import PageHero from "../../../components/about/PageHero";
import Reveal from "../../../components/about/Reveal";
import AboutFooter from "../../../components/about/AboutFooter";
import { BRANCHES } from "../../../data/aboutData";

// ── Institute image (apni image public/ folder me rakho aur naam yahan likho) ──
const INSTITUTE_IMAGE = "/Your Gateway to a Global Future.png";
// Image ke neeche chhota caption chahiye to likho, nahi chahiye to "" rehne do.
const INSTITUTE_CAPTION = "";

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
        title="Our Branches"
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