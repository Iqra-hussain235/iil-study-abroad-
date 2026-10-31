"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Globe, Award, ArrowRight, Phone, Mail,
  MapPin, Shield, Heart, Users, Send, X,
  MessageCircle, CheckCircle, Compass, FileText,
  Briefcase, BookOpen, Clock, Star,
  GraduationCap, Plane, Wallet, Target
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

function CanadaFlag({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="48" fill="white" stroke="#e5e7eb" strokeWidth="2"/>
      <rect x="10" y="10" width="20" height="80" fill="#D52B1E"/>
      <rect x="70" y="10" width="20" height="80" fill="#D52B1E"/>
      <rect x="30" y="10" width="40" height="80" fill="white"/>
      <path fill="#D52B1E" d="M50 22 L53 30 L58 28 L55 35 L60 35 L56 40 L60 42 L55 45 L58 50 L53 48 L55 55 L50 52 L45 55 L47 48 L42 50 L45 45 L40 42 L44 40 L40 35 L45 35 L42 28 L47 30 Z"/>
      <rect x="48" y="52" width="4" height="12" fill="#D52B1E"/>
    </svg>
  );
}

const CanadaPRPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [imgError, setImgError] = useState({ hero: false, about: false });
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "Canada",
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
    if (!formData.purpose) errors.purpose = "Please select a PR pathway";
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
          visaType: "Permanent Residency",
          country: "Canada",
        };
        const res = await fetch("/api/enquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Failed to submit");

        setShowPopup(true);
        setFormData({ name: "", email: "", phone: "", country: "Canada", purpose: "", message: "" });
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

      {/* ═══════════════════════════════════════
          FLOATING WHATSAPP
          ═══════════════════════════════════════ */}
      <a
        href={whatsappLink("Hi, I am interested in Canada Permanent Residency. Please share more information.")}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[999] flex items-center gap-2 bg-[#25D366] text-white px-4 py-3.5 rounded-full shadow-xl hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="hidden sm:inline font-semibold text-sm pr-1">WhatsApp Us</span>
      </a>

      {/* ═══════════════════════════════════════
          SUCCESS POPUP
          ═══════════════════════════════════════ */}
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
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Your enquiry has been received. Our team will get in touch with you shortly.
            </p>
            <div className="flex gap-3">
              <a
                href={whatsappLink("Hi, I just submitted an enquiry for Canada Permanent Residency. Please assist me further.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#25D366] text-white px-4 py-3 rounded-lg hover:bg-[#1ebe57] transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <button
                onClick={closePopup}
                className="flex-1 bg-indigo-700 text-white px-4 py-3 rounded-lg hover:bg-indigo-800 transition-colors font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════
          HERO SECTION — INDIGO/PURPLE THEME (Canada PR)
          ═══════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-purple-800 to-slate-800 text-white overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-rose-300/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                <Target className="w-4 h-4" />
                Permanent Residency
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Canada<br /><span className="text-purple-200">Permanent Residency</span>
              </h1>
              <p className="text-lg text-purple-100 leading-relaxed max-w-xl">
                Build your future in Canada with permanent residency. Live, work, and settle anywhere in Canada with access to universal healthcare, free education, and a clear pathway to citizenship.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToSection("enquiry")}
                  className="bg-white text-indigo-900 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-lg"
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
                  { icon: Users, bold: `${YEARS_EXPERIENCE}+ Years`, sub: "PR Expertise" },
                  { icon: Award, bold: "500,000+", sub: "PR Targets 2026" },
                  { icon: Shield, bold: "Trusted Support", sub: "End-to-End Guidance" },
                ].map(({ icon: Icon, bold, sub }, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-base leading-tight">{bold}</p>
                      <p className="text-xs text-purple-200">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-indigo-900">
                {!imgError.hero ? (
                  <Image
                    src="/permanent residency canada.png"
                    alt="Canada Permanent Residency"
                    width={600}
                    height={400}
                    className="w-full h-[400px] object-contain object-center"
                    priority
                    onError={() => handleImgError('hero')}
                  />
                ) : (
                  <div className="w-full h-[400px] bg-gradient-to-br from-indigo-800 to-purple-900 flex items-center justify-center">
                    <Target className="w-32 h-32 text-white/20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent" />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Canada</div>
                  <div className="text-lg font-bold text-indigo-700">PERMANENT RESIDENCY</div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Compass className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">Personalised Guidance</p>
                    <p className="text-xs text-gray-500">From Assessment to PR Grant</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          ABOUT CANADA PR SECTION
          ═══════════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gray-100">
              {!imgError.about ? (
                <Image
                  src="/pr canada image.png"
                  alt="Life in Canada"
                  width={600}
                  height={400}
                  className="w-full h-[400px] object-contain object-center"
                  onError={() => handleImgError('about')}
                />
              ) : (
                <div className="w-full h-[400px] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <Target className="w-32 h-32 text-gray-400" />
                </div>
              )}
            </div>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium">
                <Target className="w-4 h-4" />
                About Canada PR
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Your Pathway to a New Life in Canada
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Canadian Permanent Residency gives you the right to live, work, and settle anywhere in Canada permanently. Canada has set an ambitious target of over 500,000 new permanent residents annually, with Express Entry and Provincial Nominee Programs (PNP) being the primary pathways for skilled workers.
              </p>
              <p className="text-gray-600 leading-relaxed">
                As a Canadian PR holder, you gain access to universal healthcare (Medicare), free public education for your children, and social benefits. After three years of residency, you can apply for Canadian citizenship. Whether through Express Entry, PNP, or family sponsorship, Canada offers multiple pathways to permanent residency.
              </p>
              <p className="text-gray-600 leading-relaxed">
                With IIL&apos;s expert guidance, your PR application process becomes smooth and strategic. Our team helps you navigate the Comprehensive Ranking System (CRS), language tests, and document preparation to maximise your chances of success.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { val: "Ottawa", lbl: "Capital" },
                  { val: "CAD", lbl: "Currency" },
                  { val: "English/French", lbl: "Language" },
                  { val: "North America", lbl: "Location" },
                ].map(({ val, lbl }, i) => (
                  <div key={i} className="bg-gray-50 p-4 rounded-xl hover:bg-indigo-50 transition-colors">
                    <p className="font-bold text-xl text-indigo-700">{val}</p>
                    <p className="text-sm text-gray-500">{lbl}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          WHY CANADA PR SECTION
          ═══════════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Canada Permanent Residency?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Key benefits that make Canada PR one of the world&apos;s most popular immigration pathways
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Briefcase,
                title: "Work Freedom",
                desc: "Work for any employer across all provinces and territories. Average annual salary exceeds CAD 65,000 for skilled professionals.",
              },
              {
                icon: Heart,
                title: "Universal Healthcare",
                desc: "Access Canada&apos;s world-class public healthcare system at no cost through provincial health insurance plans.",
              },
              {
                icon: BookOpen,
                title: "Free Education",
                desc: "Children can attend Canadian public schools for free from kindergarten through grade 12, receiving world-class education.",
              },
              {
                icon: Users,
                title: "Family Sponsorship",
                desc: "Sponsor eligible family members including parents, grandparents, partners, and dependent children to join you in Canada.",
              },
              {
                icon: Award,
                title: "Citizenship Pathway",
                desc: "Apply for Canadian citizenship after just three years of permanent residency, with full voting and passport rights.",
              },
              {
                icon: Globe,
                title: "Quality of Life",
                desc: "Safe cities, multicultural communities, stunning natural beauty, and excellent work-life balance ranked globally.",
              },
              {
                icon: Wallet,
                title: "Social Benefits",
                desc: "Access to Employment Insurance, Canada Child Benefit, Old Age Security, and other federal/provincial programs.",
              },
              {
                icon: GraduationCap,
                title: "Higher Education",
                desc: "PR holders pay domestic tuition fees at Canadian universities and colleges, significantly lower than international rates.",
              },
              {
                icon: Star,
                title: "Travel Flexibility",
                desc: "Five-year PR card allows you to travel freely. Renew easily by meeting residency obligations.",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-6 h-6 text-indigo-700" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          HOW WE HELP SECTION
          ═══════════════════════════════════════ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How We Support You
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Our team guides you at every step — from eligibility assessment to PR visa grant
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Compass,
                title: "Eligibility Assessment",
                desc: "Free CRS score calculation and pathway recommendation based on your age, education, language skills, and work experience.",
              },
              {
                icon: FileText,
                title: "Profile Creation",
                desc: "Expert guidance through Express Entry profile creation, ECA (WES), and language test preparation (IELTS/CELPIP).",
              },
              {
                icon: Shield,
                title: "ITI & Application",
                desc: "Strategic ITA response and complete visa application management with meticulous document review.",
              },
              {
                icon: Heart,
                title: "Post-Grant Support",
                desc: "Assistance with SIN number, health card, bank setup, job search, and settlement services after your PR is granted.",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-indigo-700" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 bg-indigo-50 border border-indigo-100 rounded-2xl p-8 max-w-3xl mx-auto text-center">
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              For detailed information about PR requirements, CRS scoring, language tests, and processing timelines — <span className="font-semibold text-indigo-800">speak directly with our team.</span>
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => scrollToSection("enquiry")}
                className="bg-indigo-700 text-white px-7 py-3 rounded-xl font-semibold hover:bg-indigo-800 hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                Send an Enquiry <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={whatsappLink("Hi, I want to know more about Canada Permanent Residency.")}
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

      {/* ═══════════════════════════════════════
          ENQUIRY FORM SECTION
          ═══════════════════════════════════════ */}
      <section id="enquiry" className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <div className="grid lg:grid-cols-2">
              <div className="bg-indigo-900 p-8 lg:p-12 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg border-4 border-white/30">
                    <CanadaFlag className="w-full h-full" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">Canada</h2>
                    <p className="text-indigo-100">Permanent Residency</p>
                  </div>
                </div>
                <p className="text-indigo-100 mb-8 text-sm leading-relaxed">
                  Fill out the form and our experts will guide you through the entire Canada PR process from assessment to grant.
                </p>
                <div className="space-y-5">
                  <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-4 hover:translate-x-1 transition-transform">
                    <div className="w-11 h-11 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-indigo-200">Call Us</p>
                      <p className="font-semibold text-sm">{PHONE_NUMBER}</p>
                    </div>
                  </a>
                  <a href={whatsappLink("Hi, I am interested in Canada Permanent Residency. Please share more information.")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:translate-x-1 transition-transform">
                    <div className="w-11 h-11 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-indigo-200">WhatsApp Us</p>
                      <p className="font-semibold text-sm">{PHONE_NUMBER}</p>
                    </div>
                  </a>
                  <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 hover:translate-x-1 transition-transform">
                    <div className="w-11 h-11 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-indigo-200">Email Us</p>
                      <p className="font-semibold text-sm">{EMAIL}</p>
                    </div>
                  </a>
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-indigo-200">Visit Us</p>
                      <p className="font-semibold text-sm leading-relaxed">{ADDRESS}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="flex items-center gap-3 mb-5">
                    <Award className="w-7 h-7 text-indigo-300 shrink-0" />
                    <div>
                      <p className="font-bold">{YEARS_EXPERIENCE}+ Years Experience</p>
                      <p className="text-xs text-indigo-200">Guiding professionals to Canadian PR</p>
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
                    <input id="name" name="name" type="text" required autoComplete="name" placeholder="Enter your full name" value={formData.name} onChange={handleInputChange} className={`w-full px-4 py-3 border-2 ${formErrors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-indigo-500 focus:border-indigo-500'} rounded-lg outline-none transition-all text-gray-900 placeholder-gray-400`} />
                    {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email <span className="text-red-500">*</span></label>
                    <input id="email" name="email" type="email" required autoComplete="email" placeholder="Enter your email address" value={formData.email} onChange={handleInputChange} className={`w-full px-4 py-3 border-2 ${formErrors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-indigo-500 focus:border-indigo-500'} rounded-lg outline-none transition-all text-gray-900 placeholder-gray-400`} />
                    {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">Phone <span className="text-red-500">*</span></label>
                    <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="Enter your phone number" value={formData.phone} onChange={handleInputChange} className={`w-full px-4 py-3 border-2 ${formErrors.phone ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-indigo-500 focus:border-indigo-500'} rounded-lg outline-none transition-all text-gray-900 placeholder-gray-400`} />
                    {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                  </div>
                  <div>
                    <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-1.5">PR Pathway Interest <span className="text-red-500">*</span></label>
                    <select id="purpose" name="purpose" required value={formData.purpose} onChange={handleInputChange} className={`w-full px-4 py-3 border-2 ${formErrors.purpose ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-indigo-500 focus:border-indigo-500'} rounded-lg outline-none transition-all text-gray-900`}>
                      <option value="">Select pathway</option>
                      <option value="express-entry">Express Entry (FSW/CEC/FST)</option>
                      <option value="pnp">Provincial Nominee Program (PNP)</option>
                      <option value="family">Family Sponsorship</option>
                      <option value="business">Business Immigration</option>
                      <option value="other">Other / Not Sure</option>
                    </select>
                    {formErrors.purpose && <p className="text-red-500 text-xs mt-1">{formErrors.purpose}</p>}
                  </div>
                  <input type="hidden" name="country" value={formData.country} />
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                    <textarea id="message" name="message" rows={3} autoComplete="off" placeholder="Tell us about your PR requirements..." value={formData.message} onChange={handleInputChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none text-gray-900 placeholder-gray-400" />
                  </div>
                  <button type="submit" disabled={loading} className="w-full bg-indigo-700 text-white py-4 rounded-lg font-semibold hover:bg-indigo-800 active:bg-indigo-950 transition-colors flex items-center justify-center gap-2 text-lg shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed">
                    {loading ? (
                      <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</>
                    ) : (
                      <>Submit Enquiry <Send className="w-5 h-5" /></>
                    )}
                  </button>
                  <a href={whatsappLink("Hi, I am interested in Canada Permanent Residency. Please share more information.")} target="_blank" rel="noopener noreferrer" className="w-full bg-[#25D366] text-white py-4 rounded-lg font-semibold hover:bg-[#1ebe57] transition-colors flex items-center justify-center gap-2">
                    <MessageCircle className="w-5 h-5" /> Or Chat on WhatsApp
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BOTTOM BANNER SECTION
          ═══════════════════════════════════════ */}
      <section className="relative bg-gradient-to-r from-indigo-900 via-purple-800 to-slate-800 text-white py-16 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Start Your Journey to <span className="text-purple-200">Canada PR</span>
          </h2>
          <p className="text-lg text-purple-100 mb-8">
            Let IIL guide you toward Canadian permanent residency. Contact us today for a free eligibility assessment!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => scrollToSection("enquiry")} className="bg-white text-indigo-900 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 hover:scale-105 transition-all duration-300 flex items-center gap-2">
              Apply Now <ArrowRight className="w-5 h-5" />
            </button>
            <Link href="/visa/pr" className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors">
              Back to Countries
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CanadaPRPage;