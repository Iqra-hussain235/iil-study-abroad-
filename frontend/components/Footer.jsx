"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaLinkedin, FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Courses", href: "/academy/course" },
  { label: "Event", href: "/events" },
  { label: "Contact", href: "/contact" },
  { label: "About Us", href: "/about/aboutUs" },
];

const visaLinks = [
  { label: "Study Visa", href: "/visa/study" },
  { label: "Visitor Visa", href: "/visa/visitor" },
  { label: "Work Visa", href: "/visa/work" },
  { label: "Permanent Residency", href: "/visa/pr" },
];

const socialLinks = [
  {
    url: "https://www.linkedin.com/company/iilstudyabroad/",
    Icon: FaLinkedin,
    hoverClass: "hover:bg-blue-600 hover:text-white",
  },
  {
    url: "https://www.facebook.com/iiLstudyabroad",
    Icon: FaFacebook,
    hoverClass: "hover:bg-blue-600 hover:text-white",
  },
  {
    url: "https://www.instagram.com/iil.studyabroad",
    Icon: FaInstagram,
    hoverClass: "hover:bg-gradient-to-tr hover:from-red-500 hover:to-orange-400 hover:text-white",
  },
];

const WHATSAPP_NUMBER = "918630048365";
const WHATSAPP_MESSAGE = "Hi, I'm interested in your services. Please share more information.";

export default function Footer() {
  const openLink = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const openWhatsApp = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <footer className="relative overflow-hidden bg-slate-900 text-slate-300 border-t border-slate-800">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-40">
          <div className="absolute -top-[20%] left-[10%] h-[40%] w-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[5%] h-[40%] w-[40%] rounded-full bg-[#ff2f56]/5 blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
        >
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-3">
                <img
                  src="/01_logo.png"
                  alt="International Institute Of Language logo"
                  className="h-12 w-12 rounded-full object-cover border border-white/20 bg-white"
                />
                <p className="text-base font-extrabold leading-tight text-white">
                  International Institute
                  <br />
                  Of Languages &amp; Study Abroad
                </p>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                Empowering students to achieve their global dreams through
                quality education, language training, and expert guidance.
              </p>

              <div className="mt-5 flex gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.Icon;
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => openLink(social.url)}
                      className={`flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-800/80 text-slate-300 transition hover:-translate-y-1 ${social.hoverClass}`}
                    >
                      <Icon size={16} />
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={openWhatsApp}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-800/80 text-slate-300 transition hover:-translate-y-1 hover:bg-green-500 hover:text-white"
                >
                  <FaWhatsapp size={16} />
                </button>
              </div>
            </div>

            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-white">
                Quick Links
              </p>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-white">
                Visa Services
              </p>
              <ul className="space-y-3">
                {visaLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-white">
                Contact Us
              </p>
              <ul className="space-y-4 text-sm text-slate-400">
                <li className="flex items-start gap-3">
                  <FiMapPin className="mt-0.5 shrink-0 text-blue-400" />
                  <span>Near MIT College, Wave Cinema Road, Moradabad, Uttar Pradesh, India</span>
                </li>
                <li className="flex items-center gap-3">
                  <FiPhone className="shrink-0 text-blue-400" />
                  <span>+91-8630048365</span>
                </li>
                <li className="flex items-center gap-3">
                  <FiMail className="shrink-0 text-blue-400" />
                  <span>Contact@iilstudyabroad.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <FiClock className="shrink-0 text-blue-400" />
                  <span>Mon - Sat: 10:00 AM - 7:00 PM</span>
                </li>
              </ul>

              <Link
                href="/enquiry"
                className="mt-5 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff2f56] to-[#0F4C81] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                Enquire Now
              </Link>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-slate-800 pt-6 text-center text-xs text-slate-500 sm:flex-row sm:text-left">
            <p>© 2026 International Institute Of Language. All rights reserved.</p>
            <div className="flex gap-4">
              <span className="cursor-pointer hover:text-slate-300">Privacy Policy</span>
              <span className="cursor-pointer hover:text-slate-300">Terms &amp; Conditions</span>
            </div>
          </div>
        </motion.div>
      </footer>

      {/* Glowing floating WhatsApp button */}
      <button
        type="button"
        onClick={openWhatsApp}
        className="whatsapp-glow fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-2xl transition-transform duration-300 hover:scale-110"
        title="Chat on WhatsApp"
      >
        <FaWhatsapp size={30} className="text-white" />
      </button>

      <style jsx global>{`
        @keyframes whatsapp-pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.6), 0 0 20px rgba(37, 211, 102, 0.5);
          }
          70% {
            box-shadow: 0 0 0 14px rgba(37, 211, 102, 0), 0 0 25px rgba(37, 211, 102, 0.6);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0), 0 0 20px rgba(37, 211, 102, 0.5);
          }
        }
        .whatsapp-glow {
          animation: whatsapp-pulse 2.2s infinite;
        }
      `}</style>
    </>
  );
}
