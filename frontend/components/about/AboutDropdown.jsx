"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Users, GitBranch, Share2, Briefcase, ArrowRight } from "lucide-react";

const ITEMS = [
  { label: "About Us", href: "/about", Icon: Users },
  { label: "Our Branches", href: "/about/branches", Icon: GitBranch },
  { label: "Social Media", href: "/about/social-media", Icon: Share2 },
  { label: "Career", href: "/about/career", Icon: Briefcase },
];

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.25 } },
};

/**
 * Navbar ke "About" link ki jagah ye component lagao:
 *   <AboutDropdown className="text-sm font-medium text-white hover:text-[#ff2f56]" />
 *
 * Desktop: hover pe khulta hai. Touch devices: tap se toggle.
 * `className` sirf trigger button par lagta hai, taaki tumhare navbar ke other links jaisa dikhe.
 */
export default function AboutDropdown({ label = "About", className = "" }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);
  const wrapRef = useRef(null);
  const pathname = usePathname();

  const show = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  // chhota delay: cursor button se menu tak jaate waqt menu band na ho
  const hide = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  // route badalte hi band
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape + bahar click par band
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
      clearTimeout(closeTimer.current);
    };
  }, []);

  const sectionActive = pathname?.startsWith("/about");

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`flex items-center gap-1 ${className} ${
          sectionActive ? "text-[#ff2f56]" : ""
        }`}
      >
        {label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          // outer div = position (pt-3 hover-gap bridge), inner motion.div = animation
          <div className="absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-3">
            <motion.div
              role="menu"
              initial={{ opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative origin-top rounded-2xl border border-slate-100 bg-white p-2 shadow-[0_20px_50px_rgba(2,6,23,0.18)]"
            >
              {/* caret */}
              <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-slate-100 bg-white" />

              <motion.ul variants={list} initial="hidden" animate="show" className="relative">
                {ITEMS.map(({ label: text, href, Icon }) => {
                  const active = pathname === href;
                  return (
                    <motion.li key={href} variants={item}>
                      <Link
                        href={href}
                        role="menuitem"
                        className={`group flex items-center gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-slate-50 ${
                          active ? "bg-slate-50" : ""
                        }`}
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110 group-hover:border-[#ff2f56] group-hover:bg-[#ff2f56]/5 group-hover:text-[#ff2f56]">
                          <Icon size={20} />
                        </span>
                        <span
                          className={`flex-1 text-[15px] font-bold transition-colors group-hover:text-[#ff2f56] ${
                            active ? "text-[#ff2f56]" : "text-slate-900"
                          }`}
                        >
                          {text}
                        </span>
                        <ArrowRight
                          size={16}
                          className="-translate-x-2 text-[#ff2f56] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                        />
                      </Link>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}