"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/academy/course", label: "Courses" },
  { href: "/events", label: "Event" },
  { href: "/contact", label: "Contact" },
];

const visaItems = [
  { key: "study", label: "Study Visa" },
  { key: "visitor", label: "Visitor Visa" },
  { key: "work", label: "Work Visa" },
  { key: "dependent", label: "Dependent Visa" },
  { key: "spouse", label: "Spouse Visa" },
  { key: "pr", label: "Permanent Residency" },
  { key: "packages", label: "Tour Package" },
];

const VISA_CLOSE_DELAY_MS = 180;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visaMenuOpen, setVisaMenuOpen] = useState(false);
  const pathname = usePathname();
  const visaCloseTimeoutRef = useRef(null);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const openVisaMenu = useCallback(() => {
    if (visaCloseTimeoutRef.current) {
      clearTimeout(visaCloseTimeoutRef.current);
      visaCloseTimeoutRef.current = null;
    }
    setVisaMenuOpen(true);
  }, []);

  const closeVisaMenu = useCallback(() => {
    visaCloseTimeoutRef.current = setTimeout(() => {
      setVisaMenuOpen(false);
      visaCloseTimeoutRef.current = null;
    }, VISA_CLOSE_DELAY_MS);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    return () => {
      if (visaCloseTimeoutRef.current) clearTimeout(visaCloseTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    if (menuOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen, closeMenu]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 w-full z-50 border-b border-slate-200/80 bg-white/95 text-slate-800 shadow-sm backdrop-blur-md">
        <div className="absolute left-20 top-4 hidden text-2xl opacity-90 animate-plane lg:block">✈️</div>

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-3.5">
          {/* Logo */}
          <Link href="/" className="flex min-w-0 items-center gap-3 sm:gap-4">
            <div className="relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100 p-0.5 border border-slate-200 shadow-sm transition-transform duration-500 hover:scale-105 animate-logo-zoom">
              <img
                src="/logo1.jpeg"
                alt="International Institute Of Language logo"
                className="h-11 w-11 rounded-full object-cover sm:h-12 sm:w-12"
              />
            </div>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-base font-extrabold text-slate-900 sm:text-lg">
                International Institute
              </p>
              <p className="truncate text-sm font-extrabold text-[#0F4C81] sm:text-base">
                Of Languages & Study Abroad
              </p>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-6 text-sm font-semibold text-slate-700 lg:flex xl:gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors hover:text-[#0F4C81] ${
                  pathname === link.href ? "text-[#0F4C81] font-bold" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/about"
              className={`transition-colors hover:text-[#0F4C81] ${
                pathname.startsWith("/about") ? "text-[#0F4C81] font-bold" : ""
              }`}
            >
              About
            </Link>

            <div
              className="relative"
              onMouseEnter={openVisaMenu}
              onMouseLeave={closeVisaMenu}
            >
              <Link
                href="/visa/study"
                className={`flex items-center gap-1 transition-colors hover:text-[#0F4C81] ${
                  pathname.startsWith("/visa") ? "text-[#0F4C81] font-bold" : ""
                }`}
              >
                Visa
                <FiChevronDown className="h-4 w-4" />
              </Link>

              <AnimatePresence>
                {visaMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute left-0 top-full z-50 pt-2"
                  >
                    <div className="w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/70">
                      {visaItems.map((item) => (
                        <Link
                          key={item.key}
                          href={`/visa/${item.key}`}
                          className="block rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-[#0F4C81]"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/enquiry"
              className="rounded-full bg-gradient-to-r from-[#ff2f56] to-[#0F4C81] px-5 py-2 text-white font-semibold shadow-md shadow-red-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Enquiry
            </Link>
          </div>

          {/* Mobile / tablet controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/enquiry"
              className="rounded-full bg-gradient-to-r from-[#ff2f56] to-[#0F4C81] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:opacity-95 sm:px-4 sm:py-2 sm:text-sm"
            >
              Enquire
            </Link>
            <button
              type="button"
              onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81]"
            >
              {menuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay + panel */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm lg:hidden"
              onClick={closeMenu}
              aria-hidden="true"
            />

            <motion.aside
              key="panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed right-0 top-0 z-[70] flex h-full w-[min(100vw,320px)] flex-col border-l border-slate-200 bg-white shadow-2xl lg:hidden text-slate-800"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <p className="text-sm font-bold uppercase tracking-widest text-slate-700">Menu</p>
                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-5">
                {NAV_LINKS.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className={`block rounded-xl px-4 py-3 text-base font-semibold transition ${
                        pathname === link.href ? "bg-blue-50 text-[#0F4C81] font-bold" : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.05 }}
                >
                  <Link
                    href="/about"
                    onClick={closeMenu}
                    className={`block rounded-xl px-4 py-3 text-base font-semibold transition ${
                      pathname.startsWith("/about") ? "bg-blue-50 text-[#0F4C81] font-bold" : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    About
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (NAV_LINKS.length + 1) * 0.05 }}
                >
                  <Link
                    href="/visa/study"
                    onClick={closeMenu}
                    className={`block rounded-xl px-4 py-3 text-base font-semibold transition ${
                      pathname.startsWith("/visa") ? "bg-blue-50 text-[#0F4C81] font-bold" : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    Visa Services
                  </Link>
                </motion.div>
              </nav>

              <div className="border-t border-slate-200 p-5">
                <Link
                  href="/enquiry"
                  onClick={closeMenu}
                  className="flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#ff2f56] to-[#0F4C81] px-6 py-3.5 text-base font-semibold text-white shadow-md transition hover:opacity-95"
                >
                  Start Enquiry
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
