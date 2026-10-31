"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Globe, Award, ArrowRight, Phone, Mail,
  MapPin, Shield, Heart, Users, Send, X,
  MessageCircle, CheckCircle, Compass, FileText,
  Baby, Home, Briefcase, BookOpen, Clock, Star,
  Landmark, FileCheck, GraduationCap, Plane,
  TrendingUp, Wallet, HeartHandshake, Ring, Sparkles,
  Facebook, Twitter, Instagram, Youtube, Linkedin
} from "lucide-react";

const PHONE_NUMBER = "+91-8630048365";
const WHATSAPP_NUMBER = "918630048365";
const EMAIL = "Contact@iilstudyabroad.com";
const ADDRESS = "Near MIT College, Wave Cinema Road, Moradabad, Uttar Pradesh, India";
const YEARS_EXPERIENCE = "9";
const SOCIALS = {
  instagram: "https://www.instagram.com/iil.studyabroad",
  facebook: "https://www.facebook.com/iiLstudyabroad",
  linkedin: "https://www.linkedin.com/company/iilstudyabroad/",
  youtube: "https://youtube.com/@iil.studyabroad",
};

const whatsappLink = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

function UKFlag({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="48" fill="white" stroke="#e5e7eb" strokeWidth="2"/>
      <clipPath id="ukClip">
        <circle cx="50" cy="50" r="48"/>
      </clipPath>
      <g clipPath="url(#ukClip)">
        <rect x="10" y="10" width="80" height="80" fill="#012169"/>
        <path d="M10 10 L90 90 M90 10 L10 90" stroke="white" strokeWidth="12"/>
        <path d="M10 10 L90 90 M90 10 L10 90" stroke="#C8102E" strokeWidth="6"/>
        <path d="M50 10 L50 90 M10 50 L90 50" stroke="white" strokeWidth="18"/>
        <path d="M50 10 L50 90 M10 50 L90 50" stroke="#C8102E" strokeWidth="10"/>
      </g>
    </svg>
  );
}

function FacebookIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}
function XIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}
function InstagramIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}
function YoutubeIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}
function LinkedinIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}
function WhatsAppIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.134 1.585 5.934L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

const UKSpousePage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [imgError, setImgError] = useState({ hero: false, about: false });
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "United Kingdom",
    purpose: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }, [formErrors]);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Full name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (formData.phone.replace(/\D/g, "").length < 10) {
      errors.phone = "Phone number must be at least 10 digits";
    }
    if (!formData.purpose) errors.purpose = "Please select a purpose";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!validateForm()) return;
      setLoading(true);

      try {
        const payload = {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          purpose: formData.purpose,
          message: formData.message.trim(),
          visaType: "Spouse Visa",
          country: "United Kingdom",
        };
        const res = await fetch("/api/enquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Failed to submit");

        setShowPopup(true);
        setFormData({ name: "", email: "", phone: "", country: "United Kingdom", purpose: "", message: "" });
        setFormErrors({});
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again or contact us on WhatsApp.");
      } finally {
        setLoading(false);
      }
    },
    [formData]
  );

  const closePopup = useCallback(() => setShowPopup(false), []);

  const handleImgError = (key) => {
    setImgError((prev) => ({ ...prev, [key]: true }));
  };

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ═══ FLOATING WHATSAPP ═══ */}
      <a
        href={whatsappLink("Hi, I'm interested in UK Spouse Visa. Please share more information.")}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[999] flex items-center gap-2 bg-[#25D366] text-white px-4 py-3.5 rounded-full shadow-xl hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="hidden sm:inline font-semibold text-sm pr-1">WhatsApp Us</span>
      </a>

      {/* ═══ SUCCESS POPUP ═══ */}
      {showPopup && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={closePopup}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Your enquiry has been received. Our team will get in touch with you shortly.
            </p>
            <div className="flex gap-3">
              <a
                href={whatsappLink("Hi, I just submitted an enquiry for UK Spouse Visa. Please assist me further.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#25D366] text-white px-4 py-3 rounded-lg hover:bg-[#1ebe57] transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <button
                onClick={closePopup}
                className="flex-1 bg-amber-800 text-white px-4 py-3 rounded-lg hover:bg-amber-900 transition-colors font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ HERO SECTION — UK AMBER THEME ═══ */}
      <section className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-stone-800 text-white overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-stone-300/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                <HeartHandshake className="w-4 h-4" />
                Spouse Reunification
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Spouse Visa<br /><span className="text-amber-200">United Kingdom</span>
              </h1>
              <p className="text-lg text-amber-100 leading-relaxed max-w-xl">
                Reunite with your partner in the UK. The UK spouse visa allows you to live,
                work, and build your future together in the United Kingdom with a clear pathway to settlement.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToSection("enquiry")}
                  className="bg-white text-amber-900 px-8 py-4 rounded-xl font-semibold hover:bg-amber-50 hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-lg"
                >
                  Enquire Now <ArrowRight className="w-5 h-5" />
                </button>
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" /> Call Us
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-6 pt-2">
                {[
                  { icon: Users, bold: `${YEARS_EXPERIENCE}+ Years`, sub: "Guiding Couples" },
                  { icon: Award, bold: "Expert Team", sub: "Professional Guidance" },
                  { icon: Shield, bold: "Trusted Support", sub: "Visa Assistance" },
                ].map(({ icon: Icon, bold, sub }, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-base leading-tight">{bold}</p>
                      <p className="text-xs text-amber-200">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-amber-900">
                {!imgError.hero ? (
                  <Image
                    src="/spouse-visa-uk-about.png"
                    alt="UK Spouse Visa"
                    width={600}
                    height={400}
                    className="w-full h-[400px] object-contain object-center"
                    priority
                    onError={() => handleImgError('hero')}
                  />
                ) : (
                  <div className="w-full h-[400px] bg-gradient-to-br from-amber-800 to-stone-800 flex items-center justify-center">
                    <HeartHandshake className="w-32 h-32 text-white/20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/40 to-transparent" />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">United Kingdom</div>
                  <div className="text-lg font-bold text-amber-700">SPOUSE VISA</div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <Compass className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">Personalised Guidance</p>
                    <p className="text-xs text-gray-500">From Application to Visa</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ABOUT UK SPOUSE VISA SECTION ═══ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gray-100">
              {!imgError.about ? (
                <Image
                  src="/spouse-visa-uk.png"
                  alt="Couple in UK"
                  width={600}
                  height={400}
                  className="w-full h-[400px] object-contain object-center"
                  onError={() => handleImgError('about')}
                />
              ) : (
                <div className="w-full h-[400px] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <HeartHandshake className="w-32 h-32 text-gray-400" />
                </div>
              )}
            </div>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium">
                <HeartHandshake className="w-4 h-4" />
                About Spouse Visa
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Reunite with Your Partner in the UK
              </h2>
              <p className="text-gray-600 leading-relaxed">
                The UK spouse visa (also known as the partner visa) allows you to join your husband,
                wife, civil partner, or unmarried partner who is settled in the UK. This visa is designed
                to keep families together and provides a clear route to permanent settlement.
              </p>
              <p className="text-gray-600 leading-relaxed">
                With the UK spouse visa, your partner can live and work in the UK, access the NHS,
                and study. After five years on this visa, you may be eligible to apply for Indefinite
                Leave to Remain (ILR), leading to British citizenship.
              </p>
              <p className="text-gray-600 leading-relaxed">
                At IIL, we provide end-to-end support for your UK spouse visa application. Our experienced
                team ensures your paperwork is complete, your financial requirements are met, and your
                application is submitted correctly for the best chance of success.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { val: "London", lbl: "Capital" },
                  { val: "GBP", lbl: "Currency" },
                  { val: "English", lbl: "Language" },
                  { val: "Europe", lbl: "Location" },
                ].map(({ val, lbl }, i) => (
                  <div key={i} className="bg-gray-50 p-4 rounded-xl hover:bg-amber-50 transition-colors">
                    <p className="font-bold text-xl text-amber-700">{val}</p>
                    <p className="text-sm text-gray-500">{lbl}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHY UK SPOUSE VISA SECTION ═══ */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose UK Spouse Visa?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Key reasons couples choose the United Kingdom for reunification
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Briefcase,
                title: "Work Rights",
                desc: "Your spouse can work full-time in the UK without restrictions once the visa is granted.",
              },
              {
                icon: Heart,
                title: "NHS Access",
                desc: "Spouses gain access to the UK's National Health Service, one of the world's best healthcare systems.",
              },
              {
                icon: BookOpen,
                title: "Study Opportunities",
                desc: "Spouses can study at UK universities and institutions with access to world-class education.",
              },
              {
                icon: Shield,
                title: "Path to Settlement",
                desc: "After 5 years on a spouse visa, you can apply for Indefinite Leave to Remain (ILR).",
              },
              {
                icon: Award,
                title: "British Citizenship",
                desc: "ILR holders can apply for British citizenship after meeting the residency requirements.",
              },
              {
                icon: Globe,
                title: "Quality of Life",
                desc: "The UK offers excellent infrastructure, multicultural society, and strong worker protections.",
              },
              {
                icon: Wallet,
                title: "Dual Income",
                desc: "Both partners can contribute to household income, improving your standard of living in the UK.",
              },
              {
                icon: GraduationCap,
                title: "Education for Kids",
                desc: "Children can attend UK state schools, receiving high-quality education free of charge.",
              },
              {
                icon: Star,
                title: "Cultural Diversity",
                desc: "The UK is home to diverse communities, making it welcoming for couples from all backgrounds.",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-200 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-6 h-6 text-amber-700" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW WE HELP SECTION ═══ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How We Support You
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Our team guides you at every step — from understanding visa requirements to preparing your application
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Compass,
                title: "Visa Guidance",
                desc: "Personalised advice on the right UK spouse visa category based on your relationship and circumstances.",
              },
              {
                icon: FileText,
                title: "Documentation Support",
                desc: "Help organising marriage certificates, relationship proof, financial evidence, and all required documents.",
              },
              {
                icon: Shield,
                title: "Application Review",
                desc: "Thorough review of your application to ensure completeness and accuracy before submission to UKVI.",
              },
              {
                icon: Heart,
                title: "Settlement Assistance",
                desc: "Practical guidance on relocating to the UK, including housing, banking, NHS registration, and local services.",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl border border-gray-100 hover:border-amber-200 hover:bg-amber-50/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-amber-700" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 bg-amber-50 border border-amber-100 rounded-2xl p-8 max-w-3xl mx-auto text-center">
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              For detailed information about visa requirements, documents, eligibility criteria,
              and processing timelines — <span className="font-semibold text-amber-800">speak directly with our team.</span>
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => scrollToSection("enquiry")}
                className="bg-amber-800 text-white px-7 py-3 rounded-xl font-semibold hover:bg-amber-900 hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                Send an Enquiry <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={whatsappLink("Hi, I want to know more about UK Spouse Visa.")}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white px-7 py-3 rounded-xl font-semibold hover:bg-[#1ebe57] transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ENQUIRY FORM SECTION ═══ */}
      <section id="enquiry" className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <div className="grid lg:grid-cols-2">
              <div className="bg-amber-900 p-8 lg:p-12 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg">
                    <UKFlag className="w-full h-full" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">United Kingdom</h2>
                    <p className="text-amber-100">Spouse Visa</p>
                  </div>
                </div>
                <p className="text-amber-100 mb-8 text-sm leading-relaxed">
                  Fill out the form and our experts will guide you through the entire UK spouse visa process.
                </p>
                <div className="space-y-5">
                  <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-4 hover:translate-x-1 transition-transform">
                    <div className="w-11 h-11 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-amber-200">Call Us</p>
                      <p className="font-semibold text-sm">{PHONE_NUMBER}</p>
                    </div>
                  </a>
                  <a href={whatsappLink("Hi, I'm interested in UK Spouse Visa. Please share more information.")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:translate-x-1 transition-transform">
                    <div className="w-11 h-11 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-amber-200">WhatsApp Us</p>
                      <p className="font-semibold text-sm">{PHONE_NUMBER}</p>
                    </div>
                  </a>
                  <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 hover:translate-x-1 transition-transform">
                    <div className="w-11 h-11 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-amber-200">Email Us</p>
                      <p className="font-semibold text-sm">{EMAIL}</p>
                    </div>
                  </a>
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-amber-200">Visit Us</p>
                      <p className="font-semibold text-sm leading-relaxed">{ADDRESS}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="flex items-center gap-3 mb-5">
                    <Award className="w-7 h-7 text-amber-300 shrink-0" />
                    <div>
                      <p className="font-bold">{YEARS_EXPERIENCE}+ Years Experience</p>
                      <p className="text-xs text-amber-200">Guiding couples on their visa journey</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                    </a>
                    <a href={SOCIALS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    </a>
                    <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                    </a>
                    <a href={SOCIALS.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-8 lg:p-12">
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                    <input id="name" name="name" type="text" required autoComplete="name" placeholder="Enter your full name" value={formData.name} onChange={handleInputChange} className={`w-full px-4 py-3 border-2 ${formErrors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-amber-500 focus:border-amber-500'} rounded-lg outline-none transition-all text-gray-900 placeholder-gray-400`} />
                    {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email <span className="text-red-500">*</span></label>
                    <input id="email" name="email" type="email" required autoComplete="email" placeholder="Enter your email address" value={formData.email} onChange={handleInputChange} className={`w-full px-4 py-3 border-2 ${formErrors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-amber-500 focus:border-amber-500'} rounded-lg outline-none transition-all text-gray-900 placeholder-gray-400`} />
                    {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">Phone <span className="text-red-500">*</span></label>
                    <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="Enter your phone number" value={formData.phone} onChange={handleInputChange} className={`w-full px-4 py-3 border-2 ${formErrors.phone ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-amber-500 focus:border-amber-500'} rounded-lg outline-none transition-all text-gray-900 placeholder-gray-400`} />
                    {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                  </div>
                  <div>
                    <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-1.5">Purpose of Application <span className="text-red-500">*</span></label>
                    <select id="purpose" name="purpose" required value={formData.purpose} onChange={handleInputChange} className={`w-full px-4 py-3 border-2 ${formErrors.purpose ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-amber-500 focus:border-amber-500'} rounded-lg outline-none transition-all text-gray-900`}>
                      <option value="">Select purpose</option>
                      <option value="spouse-visa">Spouse Visa (Married Partner)</option>
                      <option value="unmarried-partner">Unmarried Partner Visa</option>
                      <option value="civil-partner">Civil Partner Visa</option>
                      <option value="fiancé-visa">Fiancé Visa (6 months)</option>
                      <option value="proposed-civil-partner">Proposed Civil Partner Visa</option>
                      <option value="other">Other</option>
                    </select>
                    {formErrors.purpose && <p className="text-red-500 text-xs mt-1">{formErrors.purpose}</p>}
                  </div>
                  <input type="hidden" name="country" value={formData.country} />
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                    <textarea id="message" name="message" rows={3} autoComplete="off" placeholder="Tell us about your spouse visa requirements..." value={formData.message} onChange={handleInputChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all resize-none text-gray-900 placeholder-gray-400" />
                  </div>
                  <button type="submit" disabled={loading} className="w-full bg-amber-800 text-white py-4 rounded-lg font-semibold hover:bg-amber-900 active:bg-amber-950 transition-colors flex items-center justify-center gap-2 text-lg shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed">
                    {loading ? (
                      <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</>
                    ) : (
                      <>Submit Enquiry <Send className="w-5 h-5" /></>
                    )}
                  </button>
                  <a href={whatsappLink("Hi, I'm interested in UK Spouse Visa. Please share more information.")} target="_blank" rel="noopener noreferrer" className="w-full bg-[#25D366] text-white py-4 rounded-lg font-semibold hover:bg-[#1ebe57] transition-colors flex items-center justify-center gap-2">
                    <MessageCircle className="w-5 h-5" /> Or Chat on WhatsApp
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BOTTOM BANNER SECTION ═══ */}
      <section className="relative bg-gradient-to-r from-amber-900 via-amber-800 to-stone-800 text-white py-16 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Reunite with Your Partner in <span className="text-amber-200">the UK</span>
          </h2>
          <p className="text-lg text-amber-100 mb-8">
            Let IIL guide you toward bringing your spouse to the United Kingdom. Contact us today!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => scrollToSection("enquiry")} className="bg-white text-amber-900 px-8 py-4 rounded-xl font-semibold hover:bg-amber-50 hover:scale-105 transition-all duration-300 flex items-center gap-2">
              Apply Now <ArrowRight className="w-5 h-5" />
            </button>
            <Link href="/visa/spouse" className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors">
              Back to Countries
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER — PRESERVED AS-IS ═══ */}
      <footer className="bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="mb-4">
                <Image src="/IIL-logo.png" alt="IIL Logo" width={120} height={60} className="h-12 w-auto object-contain" onError={(e) => { e.target.style.display = "none"; }} />
                <div className="mt-2">
                  <h3 className="text-lg font-bold text-white">International Institute</h3>
                  <h3 className="text-lg font-bold text-white">of Languages</h3>
                  <p className="text-gray-400 text-sm font-semibold">& Study Abroad</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">Your trusted partner for study abroad dreams. 9 years of excellence in immigration and visa consulting services.</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-400"><MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" /><span>{ADDRESS}</span></div>
                <div className="flex items-center gap-2 text-sm text-slate-400"><Phone className="w-4 h-4 text-gray-500 flex-shrink-0" /><span>{PHONE_NUMBER}</span></div>
                <div className="flex items-center gap-2 text-sm text-slate-400"><Phone className="w-4 h-4 text-green-500 flex-shrink-0" /><span>{PHONE_NUMBER} (WhatsApp)</span></div>
              </div>
              <div className="flex items-center gap-3 mt-6">
                <a href="https://www.facebook.com/iil.studyabroad" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-800 text-white flex items-center justify-center hover:bg-blue-600 transition-all duration-300 hover:scale-110"><FacebookIcon className="w-4 h-4" /></a>
                <a href="https://twitter.com/iilstudyabroad" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-800 text-white flex items-center justify-center hover:bg-slate-700 transition-all duration-300 hover:scale-110"><XIcon className="w-4 h-4" /></a>
                <a href="https://www.instagram.com/iil.studyabroad" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-800 text-white flex items-center justify-center hover:bg-pink-600 transition-all duration-300 hover:scale-110"><InstagramIcon className="w-4 h-4" /></a>
                <a href="https://youtube.com/@iil.studyabroad" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-800 text-white flex items-center justify-center hover:bg-red-600 transition-all duration-300 hover:scale-110"><YoutubeIcon className="w-4 h-4" /></a>
                <a href="https://www.linkedin.com/company/iilstudyabroad/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-800 text-white flex items-center justify-center hover:bg-blue-700 transition-all duration-300 hover:scale-110"><LinkedinIcon className="w-4 h-4" /></a>
                <a href={whatsappLink("Hi, I'm interested in Spouse Visa services.")} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-800 text-white flex items-center justify-center hover:bg-green-600 transition-all duration-300 hover:scale-110"><WhatsAppIcon className="w-4 h-4" /></a>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Important Links</h3>
              <ul className="space-y-3">
                {["About Us", "Contact Us", "Career", "Our Branches", "FAQ's", "Testimonials", "Terms & Conditions"].map((label) => (
                  <li key={label}><span className="text-slate-400 text-sm hover:text-white transition-colors cursor-default">{label}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Visa</h3>
              <ul className="space-y-3">
                {["Study Visa", "Visitor Visa", "Work Visa", "Dependent Visa", "Spouse Visa", "Permanent Residency", "Tour Visa"].map((label) => (
                  <li key={label}><span className="text-slate-400 text-sm hover:text-white transition-colors cursor-default">{label}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Coaching</h3>
              <ul className="space-y-3">
                {["About Our Courses", "Inhouse Courses", "Online Courses", "Practice Pack"].map((label) => (
                  <li key={label}><span className="text-slate-400 text-sm hover:text-white transition-colors cursor-default">{label}</span></li>
                ))}
              </ul>
              <h3 className="text-white font-semibold mt-6 mb-4 uppercase text-sm tracking-wider">Resources</h3>
              <ul className="space-y-3">
                {["Articles", "Test Prep Material", "English Assessment", "CRS Calculator"].map((label) => (
                  <li key={label}><span className="text-slate-400 text-sm hover:text-white transition-colors cursor-default">{label}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-slate-500 text-sm">&copy; 2026 International Institute of Language. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UKSpousePage;