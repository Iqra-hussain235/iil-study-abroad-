"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiMessageSquare,
  FiHelpCircle,
  FiImage,
} from "react-icons/fi";
import AboutDropdown from "../components/about/AboutDropdown";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/academy/course", label: "Courses" },
  { href: "/events", label: "Event" },
  { href: "/contact", label: "Contact" },
];

const ABOUT_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/about/branches", label: "Our Branches" },
  { href: "/about/social-media", label: "Social Media" },
  { href: "/about/career", label: "Career" },
];

const VISA_LINKS = [
  { key: "study", label: "Study Visa" },
  { key: "visitor", label: "Visitor Visa" },
  { key: "work", label: "Work Visa" },
  { key: "dependent", label: "Dependent Visa" },
  { key: "spouse", label: "Spouse Visa" },
  { key: "pr", label: "Permanent Residency" },
  { key: "packages", label: "Tour Package" },
];

const MORE_LINKS = [
  { href: "/testimonials", label: "Testimonials", Icon: FiMessageSquare },
  { href: "/faqs", label: "FAQs", Icon: FiHelpCircle },
  { href: "/gallery", label: "Gallery", Icon: FiImage },
];

const MENU_CLOSE_DELAY_MS = 180;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visaMenuOpen, setVisaMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileVisaOpen, setMobileVisaOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

  const pathname = usePathname();
  const visaCloseTimeoutRef = useRef(null);
  const moreCloseTimeoutRef = useRef(null);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setMobileAboutOpen(false);
    setMobileVisaOpen(false);
    setMobileMoreOpen(false);
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
    }, MENU_CLOSE_DELAY_MS);
  }, []);

  const openMoreMenu = useCallback(() => {
    if (moreCloseTimeoutRef.current) {
      clearTimeout(moreCloseTimeoutRef.current);
      moreCloseTimeoutRef.current = null;
    }
    setMoreMenuOpen(true);
  }, []);

  const closeMoreMenu = useCallback(() => {
    moreCloseTimeoutRef.current = setTimeout(() => {
      setMoreMenuOpen(false);
      moreCloseTimeoutRef.current = null;
    }, MENU_CLOSE_DELAY_MS);
  }, []);

  useEffect(() => {
    closeMenu();
    setVisaMenuOpen(false);
    setMoreMenuOpen(false);
  }, [pathname, closeMenu]);

  useEffect(() => {
    return () => {
      if (visaCloseTimeoutRef.current) {
        clearTimeout(visaCloseTimeoutRef.current);
      }
      if (moreCloseTimeoutRef.current) {
        clearTimeout(moreCloseTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeMenu();
    };

    if (menuOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen, closeMenu]);

  const isAboutActive = pathname.startsWith("/about");
  const isVisaActive = pathname.startsWith("/visa");
  const isMoreActive = MORE_LINKS.some((link) => pathname.startsWith(link.href));

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 w-full border-b border-white/10 bg-[#0F4C81]/95 text-white shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
        <div className="absolute left-20 top-4 hidden text-2xl opacity-80 animate-plane lg:block">
          ✈️
        </div>

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
          {/* Logo */}
          <Link href="/" className="flex min-w-0 items-center gap-3 sm:gap-4">
            <div className="relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/10 p-1 shadow-[0_18px_45px_-20px_rgba(255,255,255,0.8)] transition-transform duration-500 hover:scale-110 animate-logo-zoom">
              <img
                src="/logo1.jpeg"
                alt="International Institute Of Languages logo"
                className="h-11 w-11 rounded-full object-cover sm:h-14 sm:w-14"
              />
            </div>

            <div className="min-w-0 leading-tight">
              <p className="truncate text-base font-extrabold text-white sm:text-xl">
                International Institute
              </p>
              <p className="truncate text-base font-extrabold text-white sm:text-xl">
                Of Languages &amp; Study Abroad
              </p>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-6 text-sm font-semibold text-white/90 lg:flex xl:gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition hover:text-red-300 ${
                  pathname === link.href ? "text-red-300" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* About dropdown */}
            <AboutDropdown className="transition hover:text-red-300" />

            {/* Visa dropdown */}
            <div
              className="relative"
              onMouseEnter={openVisaMenu}
              onMouseLeave={closeVisaMenu}
            >
              <Link
                href="/visa/study"
                className={`transition hover:text-red-300 ${
                  isVisaActive ? "text-red-300" : ""
                }`}
              >
                Visa
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
                    <div className="w-56 overflow-hidden rounded-3xl border border-white/10 bg-[#0F4C81]/95 p-2 shadow-2xl shadow-slate-950/20">
                      {VISA_LINKS.map((item) => (
                        <Link
                          key={item.key}
                          href={`/visa/${item.key}`}
                          className="block rounded-2xl px-4 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10 hover:text-red-300"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* More links appear individually on very wide screens */}
            {MORE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hidden transition hover:text-red-300 2xl:block ${
                  pathname.startsWith(link.href) ? "text-red-300" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* More dropdown on smaller desktop screens */}
            <div
              className="relative 2xl:hidden"
              onMouseEnter={openMoreMenu}
              onMouseLeave={closeMoreMenu}
            >
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={moreMenuOpen}
                onClick={() => setMoreMenuOpen((prev) => !prev)}
                className={`flex items-center gap-1 transition hover:text-red-300 ${
                  isMoreActive ? "text-red-300" : ""
                }`}
              >
                More
                <FiChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    moreMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {moreMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute right-0 top-full z-50 pt-2"
                  >
                    <div className="w-56 overflow-hidden rounded-3xl border border-white/10 bg-[#0F4C81]/95 p-2 shadow-2xl shadow-slate-950/20">
                      {MORE_LINKS.map(({ href, label, Icon }) => (
                        <Link
                          key={href}
                          href={href}
                          className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10 hover:text-red-300"
                        >
                          <Icon className="h-4 w-4" />
                          {label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/enquiry"
              className="rounded-full bg-red-500 px-5 py-2 text-white shadow-[0_15px_30px_-15px_rgba(255,47,86,0.7)] transition duration-300 hover:-translate-y-0.5 hover:bg-red-600"
            >
              Enquiry
            </Link>
          </div>

          {/* Mobile and tablet controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/enquiry"
              className="rounded-full bg-red-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg transition hover:bg-red-600 sm:px-4 sm:py-2 sm:text-sm"
            >
              Enquire
            </Link>

            <button
              type="button"
              onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            >
              {menuOpen ? (
                <FiX className="h-5 w-5" />
              ) : (
                <FiMenu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay and sidebar */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[60] bg-slate-950/70 backdrop-blur-sm lg:hidden"
              onClick={closeMenu}
              aria-hidden="true"
            />

            <motion.aside
              key="panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed right-0 top-0 z-[70] flex h-full w-[min(100vw,320px)] flex-col border-l border-white/10 bg-[#0F4C81] shadow-2xl lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <p className="text-sm font-bold uppercase tracking-widest text-slate-200">
                  Menu
                </p>

                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-5">
                {/* Main links */}
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
                      className={`block rounded-xl px-4 py-3.5 text-base font-semibold transition hover:bg-white/10 ${
                        pathname === link.href
                          ? "bg-white/10 text-red-300"
                          : "text-white/90"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {/* About expandable menu */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.05 }}
                >
                  <div
                    className={`rounded-xl transition hover:bg-white/10 ${
                      isAboutActive ? "bg-white/10" : ""
                    }`}
                  >
                    <div className="flex items-center">
                      <Link
                        href="/about"
                        onClick={closeMenu}
                        className={`flex-1 rounded-xl px-4 py-3.5 text-base font-semibold transition hover:text-red-300 ${
                          isAboutActive ? "text-red-300" : "text-white/90"
                        }`}
                      >
                        About
                      </Link>

                      <button
                        type="button"
                        onClick={() => setMobileAboutOpen((prev) => !prev)}
                        aria-label={
                          mobileAboutOpen
                            ? "Collapse about menu"
                            : "Expand about menu"
                        }
                        aria-expanded={mobileAboutOpen}
                        className="mr-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white/90 transition hover:bg-white/10 hover:text-red-300"
                      >
                        <FiChevronDown
                          className={`h-5 w-5 transition-transform duration-200 ${
                            mobileAboutOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>

                    <AnimatePresence initial={false}>
                      {mobileAboutOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.22,
                            ease: [0.4, 0, 0.2, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-0.5 px-2 pb-2 pt-0.5">
                            {ABOUT_LINKS.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={closeMenu}
                                className={`block rounded-xl px-4 py-2.5 pl-6 text-sm font-semibold transition hover:bg-white/10 hover:text-red-300 ${
                                  pathname === item.href ||
                                  (item.href !== "/about" &&
                                    pathname.startsWith(`${item.href}/`))
                                    ? "text-red-300"
                                    : "text-white/80"
                                }`}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                {/* Visa expandable menu */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: (NAV_LINKS.length + 1) * 0.05,
                  }}
                >
                  <div
                    className={`rounded-xl transition hover:bg-white/10 ${
                      isVisaActive ? "bg-white/10" : ""
                    }`}
                  >
                    <div className="flex items-center">
                      <Link
                        href="/visa/study"
                        onClick={closeMenu}
                        className={`flex-1 rounded-xl px-4 py-3.5 text-base font-semibold transition hover:text-red-300 ${
                          isVisaActive ? "text-red-300" : "text-white/90"
                        }`}
                      >
                        Visa
                      </Link>

                      <button
                        type="button"
                        onClick={() => setMobileVisaOpen((prev) => !prev)}
                        aria-label={
                          mobileVisaOpen
                            ? "Collapse visa menu"
                            : "Expand visa menu"
                        }
                        aria-expanded={mobileVisaOpen}
                        className="mr-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white/90 transition hover:bg-white/10 hover:text-red-300"
                      >
                        <FiChevronDown
                          className={`h-5 w-5 transition-transform duration-200 ${
                            mobileVisaOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>

                    <AnimatePresence initial={false}>
                      {mobileVisaOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.22,
                            ease: [0.4, 0, 0.2, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-0.5 px-2 pb-2 pt-0.5">
                            {VISA_LINKS.map((item) => (
                              <Link
                                key={item.key}
                                href={`/visa/${item.key}`}
                                onClick={closeMenu}
                                className={`block rounded-xl px-4 py-2.5 pl-6 text-sm font-semibold transition hover:bg-white/10 hover:text-red-300 ${
                                  pathname === `/visa/${item.key}` ||
                                  pathname.startsWith(`/visa/${item.key}/`)
                                    ? "text-red-300"
                                    : "text-white/80"
                                }`}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                {/* More expandable menu */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: (NAV_LINKS.length + 2) * 0.05,
                  }}
                >
                  <div
                    className={`rounded-xl transition hover:bg-white/10 ${
                      isMoreActive ? "bg-white/10" : ""
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setMobileMoreOpen((prev) => !prev)}
                      aria-expanded={mobileMoreOpen}
                      className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold text-white/90 transition hover:text-red-300"
                    >
                      More
                      <FiChevronDown
                        className={`h-5 w-5 transition-transform duration-200 ${
                          mobileMoreOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {mobileMoreOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.22,
                            ease: [0.4, 0, 0.2, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-0.5 px-2 pb-2 pt-0.5">
                            {MORE_LINKS.map(({ href, label, Icon }) => (
                              <Link
                                key={href}
                                href={href}
                                onClick={closeMenu}
                                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 pl-6 text-sm font-semibold transition hover:bg-white/10 hover:text-red-300 ${
                                  pathname.startsWith(href)
                                    ? "text-red-300"
                                    : "text-white/80"
                                }`}
                              >
                                <Icon className="h-4 w-4" />
                                {label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </nav>

              <div className="border-t border-white/10 p-5">
                <Link
                  href="/enquiry"
                  onClick={closeMenu}
                  className="flex w-full items-center justify-center rounded-full bg-red-500 px-6 py-3.5 text-base font-semibold text-white shadow-[0_15px_30px_-15px_rgba(255,47,86,0.7)] transition hover:bg-red-600"
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
