"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import AboutDropdown from "../components/about/AboutDropdown";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/academy/course", label: "Courses" },
  { href: "/events", label: "Event" },
  { href: "/contact", label: "Contact" },
];

// Mobile menu ke About submenu ke liye (desktop dropdown ka apna list AboutDropdown.jsx me hai)
const aboutItems = [
  { key: "aboutUs", label: "About Us", href: "/about" },
  { key: "branches", label: "Our Branches", href: "/about/branches" },
  { key: "socialMedia", label: "Social Media", href: "/about/social-media" },
  { key: "career", label: "Career", href: "/about/career" },
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
  const [mobileVisaOpen, setMobileVisaOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const pathname = usePathname();
  const visaCloseTimeoutRef = useRef(null);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setMobileVisaOpen(false);
    setMobileAboutOpen(false);
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
      <nav className="fixed top-0 left-0 right-0 w-full z-50 border-b border-white/10 bg-[#0F4C81]/95 text-white shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
        <div className="absolute left-20 top-4 hidden text-2xl opacity-80 animate-plane lg:block">✈️</div>

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
          {/* Logo */}
          <Link href="/" className="flex min-w-0 items-center gap-3 sm:gap-4">
            <div className="relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/10 p-1 shadow-[0_18px_45px_-20px_rgba(255,255,255,0.8)] transition-transform duration-500 hover:scale-110 animate-logo-zoom">
              <img
                src="/logo1.jpeg"
                alt="International Institute Of Language logo"
                className="h-11 w-11 rounded-full object-cover sm:h-14 sm:w-14"
              />
            </div>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-base font-extrabold text-white sm:text-xl">
                International Institute
              </p>
              <p className="truncate text-base font-extrabold text-white sm:text-xl">
                Of Languages & Study Abroad
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

            {/* About: hover dropdown (About Us, Our Branches, Social Media, Career) */}
            <AboutDropdown className="transition hover:text-red-300" />

            <div
              className="relative"
              onMouseEnter={openVisaMenu}
              onMouseLeave={closeVisaMenu}
            >
              <Link
                href="/visa/study"
                className={`transition hover:text-red-300 ${
                  pathname.startsWith("/visa") ? "text-red-300" : ""
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
                      {visaItems.map((item) => (
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
            <Link
              href="/enquiry"
              className="rounded-full bg-red-500 px-5 py-2 text-white shadow-[0_15px_30px_-15px_rgba(255,47,86,0.7)] transition duration-300 hover:-translate-y-0.5 hover:bg-red-600"
            >
              Enquiry
            </Link>
          </div>

          {/* Mobile / tablet controls */}
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
                <p className="text-sm font-bold uppercase tracking-widest text-slate-200">Menu</p>
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
                        pathname === link.href ? "bg-white/10 text-red-300" : "text-white/90"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile: About (expandable) */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.05 }}
                >
                  <div
                    className={`rounded-xl transition hover:bg-white/10 ${
                      pathname.startsWith("/about") ? "bg-white/10" : ""
                    }`}
                  >
                    <div className="flex items-center">
                      <Link
                        href="/about"
                        onClick={closeMenu}
                        className={`flex-1 rounded-xl px-4 py-3.5 text-base font-semibold transition hover:text-red-300 ${
                          pathname.startsWith("/about") ? "text-red-300" : "text-white/90"
                        }`}
                      >
                        About
                      </Link>
                      <button
                        type="button"
                        onClick={() => setMobileAboutOpen((prev) => !prev)}
                        aria-label={mobileAboutOpen ? "Collapse about menu" : "Expand about menu"}
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
                          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-0.5 px-2 pb-2 pt-0.5">
                            {aboutItems.map((item) => (
                              <Link
                                key={item.key}
                                href={item.href}
                                onClick={closeMenu}
                                className={`block rounded-xl px-4 py-2.5 pl-6 text-sm font-semibold transition hover:bg-white/10 hover:text-red-300 ${
                                  // "/about" sirf exact match pe active, warna har sub-page par About Us bhi highlight hota
                                  pathname === item.href ||
                                  (item.href !== "/about" && pathname.startsWith(`${item.href}/`))
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

                {/* Mobile: Visa (expandable) */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (NAV_LINKS.length + 1) * 0.05 }}
                >
                  <div
                    className={`rounded-xl transition hover:bg-white/10 ${
                      pathname.startsWith("/visa") ? "bg-white/10" : ""
                    }`}
                  >
                    <div className="flex items-center">
                      <Link
                        href="/visa/study"
                        onClick={closeMenu}
                        className={`flex-1 rounded-xl px-4 py-3.5 text-base font-semibold transition hover:text-red-300 ${
                          pathname.startsWith("/visa") ? "text-red-300" : "text-white/90"
                        }`}
                      >
                        Visa
                      </Link>
                      <button
                        type="button"
                        onClick={() => setMobileVisaOpen((prev) => !prev)}
                        aria-label={mobileVisaOpen ? "Collapse visa menu" : "Expand visa menu"}
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
                          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-0.5 px-2 pb-2 pt-0.5">
                            {visaItems.map((item) => (
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








// "use client";

// import { useState, useEffect, useCallback, useRef } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";

// const NAV_LINKS = [
//   { href: "/", label: "Home" },
//   { href: "/services", label: "Services" },
//   { href: "/academy/course", label: "Courses" },
//   { href: "/events", label: "Event" },
//   { href: "/contact", label: "Contact" },
// ];

// const visaItems = [
//   { key: "study", label: "Study Visa" },
//   { key: "visitor", label: "Visitor Visa" },
//   { key: "work", label: "Work Visa" },
//   { key: "dependent", label: "Dependent Visa" },
//   { key: "spouse", label: "Spouse Visa" },
//   { key: "pr", label: "Permanent Residency" },
//   { key: "packages", label: "Tour Package" },
// ];

// const VISA_CLOSE_DELAY_MS = 180;

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [visaMenuOpen, setVisaMenuOpen] = useState(false);
//   const pathname = usePathname();
//   const visaCloseTimeoutRef = useRef(null);

//   const closeMenu = useCallback(() => {
//     setMenuOpen(false);
//   }, []);

//   const openVisaMenu = useCallback(() => {
//     if (visaCloseTimeoutRef.current) {
//       clearTimeout(visaCloseTimeoutRef.current);
//       visaCloseTimeoutRef.current = null;
//     }
//     setVisaMenuOpen(true);
//   }, []);

//   const closeVisaMenu = useCallback(() => {
//     visaCloseTimeoutRef.current = setTimeout(() => {
//       setVisaMenuOpen(false);
//       visaCloseTimeoutRef.current = null;
//     }, VISA_CLOSE_DELAY_MS);
//   }, []);

//   useEffect(() => {
//     closeMenu();
//   }, [pathname, closeMenu]);

//   useEffect(() => {
//     return () => {
//       if (visaCloseTimeoutRef.current) clearTimeout(visaCloseTimeoutRef.current);
//     };
//   }, []);

//   useEffect(() => {
//     document.body.style.overflow = menuOpen ? "hidden" : "";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [menuOpen]);

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === "Escape") closeMenu();
//     };
//     if (menuOpen) {
//       window.addEventListener("keydown", handleKeyDown);
//     }
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [menuOpen, closeMenu]);

//   return (
//     <>
//       <nav className="fixed top-0 left-0 right-0 w-full z-50 border-b border-slate-200/80 bg-white/95 text-slate-800 shadow-sm backdrop-blur-md">
//         <div className="absolute left-20 top-4 hidden text-2xl opacity-90 animate-plane lg:block">✈️</div>

//         <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-3.5">
//           {/* Logo */}
//           <Link href="/" className="flex min-w-0 items-center gap-3 sm:gap-4">
//             <div className="relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100 p-0.5 border border-slate-200 shadow-sm transition-transform duration-500 hover:scale-105 animate-logo-zoom">
//               <img
//                 src="/logo1.jpeg"
//                 alt="International Institute Of Language logo"
//                 className="h-11 w-11 rounded-full object-cover sm:h-12 sm:w-12"
//               />
//             </div>
//             <div className="min-w-0 leading-tight">
//               <p className="truncate text-base font-extrabold text-slate-900 sm:text-lg">
//                 International Institute
//               </p>
//               <p className="truncate text-sm font-extrabold text-[#0F4C81] sm:text-base">
//                 Of Languages & Study Abroad
//               </p>
//             </div>
//           </Link>

//           {/* Desktop navigation */}
//           <div className="hidden items-center gap-6 text-sm font-semibold text-slate-700 lg:flex xl:gap-8">
//             {NAV_LINKS.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className={`transition-colors hover:text-[#0F4C81] ${
//                   pathname === link.href ? "text-[#0F4C81] font-bold" : ""
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             ))}

//             <Link
//               href="/about"
//               className={`transition-colors hover:text-[#0F4C81] ${
//                 pathname.startsWith("/about") ? "text-[#0F4C81] font-bold" : ""
//               }`}
//             >
//               About
//             </Link>

//             <div
//               className="relative"
//               onMouseEnter={openVisaMenu}
//               onMouseLeave={closeVisaMenu}
//             >
//               <Link
//                 href="/visa/study"
//                 className={`flex items-center gap-1 transition-colors hover:text-[#0F4C81] ${
//                   pathname.startsWith("/visa") ? "text-[#0F4C81] font-bold" : ""
//                 }`}
//               >
//                 Visa
//                 <FiChevronDown className="h-4 w-4" />
//               </Link>

//               <AnimatePresence>
//                 {visaMenuOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -8 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -8 }}
//                     transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
//                     className="absolute left-0 top-full z-50 pt-2"
//                   >
//                     <div className="w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/70">
//                       {visaItems.map((item) => (
//                         <Link
//                           key={item.key}
//                           href={`/visa/${item.key}`}
//                           className="block rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-[#0F4C81]"
//                         >
//                           {item.label}
//                         </Link>
//                       ))}
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             <Link
//               href="/enquiry"
//               className="rounded-full bg-gradient-to-r from-[#ff2f56] to-[#0F4C81] px-5 py-2 text-white font-semibold shadow-md shadow-red-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
//             >
//               Enquiry
//             </Link>
//           </div>

//           {/* Mobile / tablet controls */}
//           <div className="flex items-center gap-2 lg:hidden">
//             <Link
//               href="/enquiry"
//               className="rounded-full bg-gradient-to-r from-[#ff2f56] to-[#0F4C81] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:opacity-95 sm:px-4 sm:py-2 sm:text-sm"
//             >
//               Enquire
//             </Link>
//             <button
//               type="button"
//               onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
//               aria-label={menuOpen ? "Close menu" : "Open menu"}
//               aria-expanded={menuOpen}
//               className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C81]"
//             >
//               {menuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile menu overlay + panel */}
//       <AnimatePresence>
//         {menuOpen && (
//           <>
//             <motion.div
//               key="overlay"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.25 }}
//               className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm lg:hidden"
//               onClick={closeMenu}
//               aria-hidden="true"
//             />

//             <motion.aside
//               key="panel"
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "spring", damping: 28, stiffness: 320 }}
//               className="fixed right-0 top-0 z-[70] flex h-full w-[min(100vw,320px)] flex-col border-l border-slate-200 bg-white shadow-2xl lg:hidden text-slate-800"
//               role="dialog"
//               aria-modal="true"
//               aria-label="Mobile navigation"
//             >
//               <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
//                 <p className="text-sm font-bold uppercase tracking-widest text-slate-700">Menu</p>
//                 <button
//                   type="button"
//                   onClick={closeMenu}
//                   aria-label="Close menu"
//                   className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100"
//                 >
//                   <FiX className="h-5 w-5" />
//                 </button>
//               </div>

//               <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-5">
//                 {NAV_LINKS.map((link, index) => (
//                   <motion.div
//                     key={link.href}
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.05 }}
//                   >
//                     <Link
//                       href={link.href}
//                       onClick={closeMenu}
//                       className={`block rounded-xl px-4 py-3 text-base font-semibold transition ${
//                         pathname === link.href ? "bg-blue-50 text-[#0F4C81] font-bold" : "text-slate-700 hover:bg-slate-50"
//                       }`}
//                     >
//                       {link.label}
//                     </Link>
//                   </motion.div>
//                 ))}

//                 <motion.div
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: NAV_LINKS.length * 0.05 }}
//                 >
//                   <Link
//                     href="/about"
//                     onClick={closeMenu}
//                     className={`block rounded-xl px-4 py-3 text-base font-semibold transition ${
//                       pathname.startsWith("/about") ? "bg-blue-50 text-[#0F4C81] font-bold" : "text-slate-700 hover:bg-slate-50"
//                     }`}
//                   >
//                     About
//                   </Link>
//                 </motion.div>

//                 <motion.div
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: (NAV_LINKS.length + 1) * 0.05 }}
//                 >
//                   <Link
//                     href="/visa/study"
//                     onClick={closeMenu}
//                     className={`block rounded-xl px-4 py-3 text-base font-semibold transition ${
//                       pathname.startsWith("/visa") ? "bg-blue-50 text-[#0F4C81] font-bold" : "text-slate-700 hover:bg-slate-50"
//                     }`}
//                   >
//                     Visa Services
//                   </Link>
//                 </motion.div>
//               </nav>

//               <div className="border-t border-slate-200 p-5">
//                 <Link
//                   href="/enquiry"
//                   onClick={closeMenu}
//                   className="flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#ff2f56] to-[#0F4C81] px-6 py-3.5 text-base font-semibold text-white shadow-md transition hover:opacity-95"
//                 >
//                   Start Enquiry
//                 </Link>
//               </div>
//             </motion.aside>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }
