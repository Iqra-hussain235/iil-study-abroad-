"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import PageHero from "../../../components/about/PageHero";
import Reveal from "../../../components/about/Reveal";
import AboutFooter from "../../../components/about/AboutFooter";
import { SOCIAL_PROFILES } from "../../../data/aboutData";

const parent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const child = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: "easeOut" } },
};

// ────────────────────────────────────────────────────────────────
// SOCIAL MEDIA  →  route: /about/social-media
// ────────────────────────────────────────────────────────────────
export default function SocialMediaPage() {
  return (
    <div className="w-full overflow-x-hidden bg-white text-slate-800">
      <PageHero
        image="/Languages for a Brighter Tomorrow.png"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Social Media" },
        ]}
        title="Stay Connected With IIL"
        subtitle="Follow us for visa updates, student success stories and everything happening at IIL."
      />

      <section className="px-6 py-16 md:px-16 md:py-24">
        <Reveal>
          <h2 className="text-center text-3xl font-extrabold text-[#0b1c3d]">
            Find Us On Social Media
          </h2>
          <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-[#ff2f56] to-[#0F4C81]" />
        </Reveal>

        <motion.div
          variants={parent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2"
        >
          {SOCIAL_PROFILES.map(({ name, desc, url, Icon, gradient }) => (
            <motion.a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              variants={child}
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex items-center gap-5 overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-2xl"
            >
              {/* colour wash that slides in on hover */}
              <span
                className={`absolute inset-0 -translate-x-full bg-gradient-to-r ${gradient} transition-transform duration-500 ease-out group-hover:translate-x-0`}
              />

              <span
                className={`relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg transition-transform duration-500 group-hover:rotate-[360deg] group-hover:bg-white group-hover:from-white group-hover:to-white group-hover:text-slate-900`}
              >
                <Icon size={30} />
              </span>

              <span className="relative flex-1">
                <span className="block text-lg font-extrabold text-[#0b1c3d] transition-colors duration-300 group-hover:text-white">
                  {name}
                </span>
                <span className="mt-1 block text-sm text-slate-500 transition-colors duration-300 group-hover:text-white/85">
                  {desc}
                </span>
              </span>

              <ArrowUpRight
                size={22}
                className="relative shrink-0 text-slate-300 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
              />
            </motion.a>
          ))}
        </motion.div>
      </section>

      <AboutFooter />
    </div>
  );
}