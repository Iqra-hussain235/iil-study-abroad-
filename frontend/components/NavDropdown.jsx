"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown, FiArrowRight } from "react-icons/fi";

const CLOSE_DELAY_MS = 180;

/**
 * One dropdown design for the whole navbar (Visa, More, and About if you want it).
 * items: [{ href, label, Icon }]
 * href:  optional. If given, the label itself is a link (like Visa -> /visa/study).
 */
export default function NavDropdown({
  label,
  href,
  items,
  active = false,
  columns = 1,
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const timer = useRef(null);
  const pathname = usePathname();

  const show = useCallback(() => {
    clearTimeout(timer.current);
    setOpen(true);
  }, []);
  const hide = useCallback(() => {
    timer.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => () => clearTimeout(timer.current), []);

  const triggerCls = `flex items-center gap-1 transition hover:text-red-300 ${
    active || open ? "text-red-300" : ""
  }`;
  const chevron = (
    <FiChevronDown className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
  );

  return (
    <div className={`relative ${className}`} onMouseEnter={show} onMouseLeave={hide}>
      {href ? (
        <Link href={href} className={triggerCls}>
          {label}
          {chevron}
        </Link>
      ) : (
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className={triggerCls}
        >
          {label}
          {chevron}
        </button>
      )}

      <AnimatePresence>
        {open && (
          <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4">
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              style={{ transformOrigin: "top center" }}
              role="menu"
              className={`relative rounded-3xl bg-white p-2.5 shadow-2xl shadow-slate-950/25 ring-1 ring-black/5 ${
                columns === 2 ? "w-[min(92vw,580px)]" : "w-[min(92vw,300px)]"
              }`}
            >
              {/* little pointer under the label */}
              <span className="absolute -top-1.5 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 rounded-sm bg-white" />

              <div className={`relative grid gap-1 ${columns === 2 ? "grid-cols-2" : ""}`}>
                {items.map(({ href: to, label: text, Icon }) => {
                  const here = pathname === to;
                  return (
                    <Link
                      key={to}
                      href={to}
                      role="menuitem"
                      className={`group flex items-center gap-4 rounded-2xl p-2.5 pr-4 transition-colors ${
                        here ? "bg-rose-50" : "hover:bg-rose-50"
                      }`}
                    >
                      <span
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-white transition-colors group-hover:border-rose-300 group-hover:text-[#ff2f56] ${
                          here ? "border-rose-300 text-[#ff2f56]" : "border-slate-200 text-slate-700"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span
                        className={`flex-1 text-base font-semibold transition-colors group-hover:text-[#ff2f56] ${
                          here ? "text-[#ff2f56]" : "text-slate-900"
                        }`}
                      >
                        {text}
                      </span>
                      <FiArrowRight
                        className={`h-4 w-4 text-[#ff2f56] transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 ${
                          here ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"
                        }`}
                      />
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}