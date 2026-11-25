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
  FiBookOpen,
  FiMapPin,
  FiBriefcase,
  FiUsers,
  FiHeart,
  FiHome,
  FiCompass,
} from "react-icons/fi";

import AboutDropdown from "../components/about/AboutDropdown";


// Main navigation links
const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/academy/course", label: "Courses" },
  { href: "/events", label: "Event" },
  { href: "/contact", label: "Contact" },
];

// About navigation links
const ABOUT_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/about/branches", label: "Our Branches" },
  { href: "/about/social-media", label: "Social Media" },
  { href: "/about/career", label: "Career" },
];

// Visa navigation links
const VISA_LINKS = [
  { href: "/visa/study", label: "Study Visa", Icon: FiBookOpen },
  { href: "/visa/visitor", label: "Visitor Visa", Icon: FiMapPin },
  { href: "/visa/work", label: "Work Visa", Icon: FiBriefcase },
  { href: "/visa/dependent", label: "Dependent Visa", Icon: FiUsers },
  { href: "/visa/spouse", label: "Spouse Visa", Icon: FiHeart },
  { href: "/visa/pr", label: "Permanent Residency", Icon: FiHome },
  { href: "/visa/packages", label: "Tour Package", Icon: FiCompass },
];

// More navigation links
const MORE_LINKS = [
  {
    href: "/testimonials",
    label: "Testimonials",
    Icon: FiMessageSquare,
  },
  {
    href: "/faqs",
    label: "FAQs",
    Icon: FiHelpCircle,
  },
  {
    href: "/gallery",
    label: "Gallery",
    Icon: FiImage,
  },
];

// Check active route, including nested routes
const isRouteActive = (pathname, href) => {
  if (href === "/") return pathname === "/";

  return pathname === href || pathname.startsWith(`${href}/`);
};

// Shared desktop dropdown with delayed hover closing.
function NavDropdown({ label, href, items, columns = 1, active, className = "" }) {
  const [open, setOpen] = useState(false);
  const timer = useRef(null);
  const pathname = usePathname();
  const cancel = useCallback(() => {
    clearTimeout(timer.current);
    timer.current = null;
  }, []);
  const close = useCallback(() => {
    cancel();
    setOpen(false);
  }, [cancel]);
  useEffect(() => { close(); return cancel; }, [pathname, close, cancel]);
  const show = () => { cancel(); setOpen(true); };
  const scheduleClose = () => {
    cancel();
    timer.current = setTimeout(close, 180);
  };
  return (
    <div className={`relative ${className}`} onMouseEnter={show}
      onMouseLeave={scheduleClose}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) close(); }}
      onKeyDown={(e) => { if (e.key === "Escape") close(); }}>
      <div className={`flex items-center gap-1 whitespace-nowrap ${active ? "text-red-300" : ""}`}>
        {href && <Link href={href} onClick={close} className="transition hover:text-red-300">{label}</Link>}
        <button type="button" aria-label={`${label} menu`} aria-expanded={open}
          onClick={() => { cancel(); setOpen((prev) => !prev); }}
          className="flex items-center gap-1 transition hover:text-red-300">
          {!href && label}
          <FiChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="absolute right-0 top-full z-50 pt-2">
            <div className={`grid gap-1 rounded-3xl border border-white/10 bg-[#0F4C81]/95 p-2 shadow-2xl ${columns === 2 ? "w-[26rem] grid-cols-2" : "w-56 grid-cols-1"}`}>
              {items.map(({ href: itemHref, label: itemLabel, Icon }) => (
                <Link key={itemHref} href={itemHref} onClick={close}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition hover:bg-white/10 hover:text-red-300 ${isRouteActive(pathname, itemHref) ? "text-red-300" : "text-white/90"}`}>
                  {Icon && <Icon className="h-4 w-4 shrink-0" />}{itemLabel}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Reusable mobile expandable group
function MobileGroup({
  label,
  href,
  items,
  open,
  onToggle,
  delay,
  pathname,
  onNavigate,
}) {
  const anyActive = items.some((item) =>
    isRouteActive(pathname, item.href)
  );

  const IconButton = () => (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`${open ? "Collapse" : "Expand"} ${label} menu`}
      aria-expanded={open}
      className="mr-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white/90 transition hover:bg-white/10 hover:text-red-300"
    >
      <FiChevronDown
        className={`h-5 w-5 transition-transform duration-200 ${
          open ? "rotate-180" : ""
        }`}
      />
    </button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
    >
      <div
        className={`rounded-xl transition hover:bg-white/10 ${
          anyActive ? "bg-white/10" : ""
        }`}
      >
        <div className="flex items-center">
          {href ? (
            <Link
              href={href}
              onClick={onNavigate}
              className={`flex-1 rounded-xl px-4 py-3.5 text-base font-semibold transition hover:text-red-300 ${
                (anyActive || isRouteActive(pathname, href))
                  ? "text-red-300"
                  : "text-white/90"
              }`}
            >
              {label}
            </Link>
          ) : (
            <button
              type="button"
              onClick={onToggle}
              aria-expanded={open}
              className="flex flex-1 items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold text-white/90 transition hover:text-red-300"
            >
              {label}
              <FiChevronDown
                className={`h-5 w-5 transition-transform duration-200 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>
          )}

          {href && <IconButton />}
        </div>

        <AnimatePresence initial={false}>
          {open && (
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
                {items.map(({ href: itemHref, label: itemLabel, Icon }) => (
                  <Link
                    key={itemHref}
                    href={itemHref}
                    onClick={onNavigate}
                    className={`flex items-center gap-3 rounded-xl px-4 py-2.5 pl-6 text-sm font-semibold transition hover:bg-white/10 hover:text-red-300 ${
                      isRouteActive(pathname, itemHref)
                        ? "text-red-300"
                        : "text-white/80"
                    }`}
                  >
                    {Icon && <Icon className="h-4 w-4 shrink-0" />}
                    {itemLabel}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Mobile expandable menus
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileVisaOpen, setMobileVisaOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

  const pathname = usePathname();

  // Active route states
  const isVisaActive = pathname.startsWith("/visa");

  const isMoreActive = MORE_LINKS.some((link) =>
    isRouteActive(pathname, link.href)
  );

  // Close mobile navigation
  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setMobileAboutOpen(false);
    setMobileVisaOpen(false);
    setMobileMoreOpen(false);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  // Close the mobile panel when switching to desktop.
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const handleResize = () => { if (media.matches) closeMenu(); };
    media.addEventListener("change", handleResize);
    handleResize();
    return () => media.removeEventListener("change", handleResize);
  }, [closeMenu]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close menu using Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    if (menuOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen, closeMenu]);

  return (
    <>
      {/* ================= NAVBAR ================= */}

      <nav className="fixed left-0 right-0 top-0 z-50 w-full border-b border-white/10 bg-[#0F4C81]/95 text-white shadow-2xl shadow-slate-950/30 backdrop-blur-xl">

        {/* Animated airplane */}
        {/* <div className="pointer-events-none absolute left-20 top-4 hidden text-2xl opacity-80 animate-plane lg:block">
          ✈️
        </div> */}

        <div className="mx-auto flex max-w-[110rem] items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">

          {/* LOGO */}

          <Link
            href="/"
            className="flex min-w-0 items-center gap-3 sm:gap-4"
          >
            <div className="relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/10 p-1 shadow-[0_18px_45px_-20px_rgba(255,255,255,0.8)] transition-transform duration-500 hover:scale-110 animate-logo-zoom">
              <img
                src="/logo1.jpeg"
                alt="International Institute Of Languages logo"
                className="h-11 w-11 rounded-full object-cover sm:h-14 sm:w-14"
              />
            </div>

            <div className="min-w-0 leading-tight">
              <p className="truncate text-sm font-extrabold text-white sm:text-base lg:text-sm xl:text-lg 2xl:text-xl">
                International Institute
              </p>

              <p className="truncate text-sm font-extrabold text-white sm:text-base lg:text-sm xl:text-lg 2xl:text-xl">
                Of Languages &amp; Study Abroad
              </p>
            </div>
          </Link>

          {/* ================= DESKTOP NAVIGATION ================= */}

          <div className="hidden items-center shrink-0 gap-3 text-sm font-semibold text-white/90 lg:flex xl:gap-6 2xl:gap-8">

            {/* Main links */}

            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition hover:text-red-300 ${
                  isRouteActive(pathname, link.href)
                    ? "text-red-300"
                    : ""
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* About dropdown */}

            <AboutDropdown className="transition hover:text-red-300" />

            {/* Visa dropdown */}

            <NavDropdown
              label="Visa"
              href="/visa/study"
              items={VISA_LINKS}
              columns={2}
              active={isVisaActive}
            />

            {/* More links on 2XL screens */}

            {MORE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hidden transition hover:text-red-300 2xl:block ${
                  isRouteActive(pathname, link.href)
                    ? "text-red-300"
                    : ""
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* More dropdown on smaller desktop screens */}

            <NavDropdown
              label="More"
              items={MORE_LINKS}
              className="2xl:hidden"
              active={isMoreActive}
            />

            {/* Enquiry button */}

            <Link
              href="/enquiry"
              className="rounded-full bg-red-500 px-5 py-2 text-white shadow-[0_15px_30px_-15px_rgba(255,47,86,0.7)] transition duration-300 hover:-translate-y-0.5 hover:bg-red-600"
            >
              Enquiry
            </Link>
          </div>

          {/* ================= MOBILE CONTROLS ================= */}

          <div className="flex shrink-0 items-center gap-2 lg:hidden">

            <Link
              href="/enquiry"
              className="rounded-full bg-red-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg transition hover:bg-red-600 sm:px-4 sm:py-2 sm:text-sm"
            >
              Enquire
            </Link>

            <button
              type="button"
              onClick={() =>
                menuOpen ? closeMenu() : setMenuOpen(true)
              }
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

      {/* ================= MOBILE SIDEBAR ================= */}

      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Background overlay */}

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

            {/* Sidebar */}

            <motion.aside
              key="panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 28,
                stiffness: 320,
              }}
              className="fixed right-0 top-0 z-[70] flex h-full w-[min(100vw,320px)] flex-col border-l border-white/10 bg-[#0F4C81] shadow-2xl lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >

              {/* Sidebar header */}

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

              {/* Mobile navigation links */}

              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-5">

                {/* Main navigation */}

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
                        isRouteActive(pathname, link.href)
                          ? "bg-white/10 text-red-300"
                          : "text-white/90"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {/* About expandable menu */}

                <MobileGroup
                  label="About"
                  href="/about"
                  items={ABOUT_LINKS}
                  open={mobileAboutOpen}
                  onToggle={() =>
                    setMobileAboutOpen((prev) => !prev)
                  }
                  delay={NAV_LINKS.length * 0.05}
                  pathname={pathname}
                  onNavigate={closeMenu}
                />

                {/* Visa expandable menu */}

                <MobileGroup
                  label="Visa"
                  href="/visa/study"
                  items={VISA_LINKS}
                  open={mobileVisaOpen}
                  onToggle={() =>
                    setMobileVisaOpen((prev) => !prev)
                  }
                  delay={(NAV_LINKS.length + 1) * 0.05}
                  pathname={pathname}
                  onNavigate={closeMenu}
                />

                {/* More expandable menu */}

                <MobileGroup
                  label="More"
                  items={MORE_LINKS}
                  open={mobileMoreOpen}
                  onToggle={() =>
                    setMobileMoreOpen((prev) => !prev)
                  }
                  delay={(NAV_LINKS.length + 2) * 0.05}
                  pathname={pathname}
                  onNavigate={closeMenu}
                />

              </nav>

              {/* Sidebar footer */}

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