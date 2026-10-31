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

function AustraliaFlag({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="48" fill="white" stroke="#e5e7eb" strokeWidth="2"/>
      <rect x="10" y="10" width="80" height="80" fill="#012169"/>
      <rect x="10" y="46" width="80" height="8" fill="white"/>
      <rect x="46" y="10" width="8" height="80" fill="white"/>
      <rect x="10" y="48" width="80" height="4" fill="#C8102E"/>
      <rect x="48" y="10" width="4" height="80" fill="#C8102E"/>
      <path fill="white" d="M10 10 L30 10 L10 30 Z"/>
      <path fill="#C8102E" d="M10 10 L25 10 L10 25 Z"/>
      <path fill="white" d="M10 90 L30 90 L10 70 Z"/>
      <path fill="#C8102E" d="M10 90 L25 90 L10 75 Z"/>
      <path fill="white" d="M90 10 L70 10 L90 30 Z"/>
      <path fill="#C8102E" d="M90 10 L75 10 L90 25 Z"/>
      <path fill="white" d="M90 90 L70 90 L90 70 Z"/>
      <path fill="#C8102E" d="M90 90 L75 90 L90 75 Z"/>
      <path fill="white" d="M50 18 L52 26 L60 26 L54 31 L56 39 L50 34 L44 39 L46 31 L40 26 L48 26 Z"/>
    </svg>
  );
}

const AustraliaPRPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [imgError, setImgError] = useState({ hero: false, about: false });
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "Australia",
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
          country: "Australia",
        };
        const res = await fetch("/api/enquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Failed to submit");

        setShowPopup(true);
        setFormData({ name: "", email: "", phone: "", country: "Australia", purpose: "", message: "" });
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
        href={whatsappLink("Hi, I am interested in Australia Permanent Residency. Please share more information.")}
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
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Your enquiry has been received. Our team will get in touch with you shortly.
            </p>
            <div className="flex gap-3">
              <a
                href={whatsappLink("Hi, I just submitted an enquiry for Australia Permanent Residency. Please assist me further.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#25D366] text-white px-4 py-3 rounded-lg hover:bg-[#1ebe57] transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <button
                onClick={closePopup}
                className="flex-1 bg-teal-700 text-white px-4 py-3 rounded-lg hover:bg-teal-800 transition-colors font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════
          HERO SECTION — TEAL/CYAN THEME (Australia PR)
          ═══════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-teal-900 via-cyan-800 to-slate-800 text-white overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-300/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                <Target className="w-4 h-4" />
                Permanent Residency
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Australia<br /><span className="text-cyan-200">Permanent Residency</span>
              </h1>
              <p className="text-lg text-cyan-100 leading-relaxed max-w-xl">
                Build your future in Australia with permanent residency. Live, work, and study anywhere in Australia with full access to Medicare, education, and a pathway to citizenship.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToSection("enquiry")}
                  className="bg-white text-teal-900 px-8 py-4 rounded-xl font-semibold hover:bg-cyan-50 hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-lg"
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
                  { icon: Award, bold: "185,000 Places", sub: "2026-27 Program" },
                  { icon: Shield, bold: "Trusted Support", sub: "End-to-End Guidance" },
                ].map(({ icon: Icon, bold, sub }, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-base leading-tight">{bold}</p>
                      <p className="text-xs text-cyan-200">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-teal-900">
                {!imgError.hero ? (
                  <Image
                    src="/permanent residency australia.png"
                    alt="Australia Permanent Residency"
                    width={600}
                    height={400}
                    className="w-full h-[400px] object-contain object-center"
                    priority
                    onError={() => handleImgError('hero')}
                  />
                ) : (
                  <div className="w-full h-[400px] bg-gradient-to-br from-teal-800 to-cyan-900 flex items-center justify-center">
                    <Target className="w-32 h-32 text-white/20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 to-transparent" />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Australia</div>
                  <div className="text-lg font-bold text-teal-700">PERMANENT RESIDENCY</div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <Compass className="w-6 h-6 text-teal-600" />
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
          ABOUT AUSTRALIA PR SECTION
          ═══════════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gray-100">
              {!imgError.about ? (
                <Image
                  src="/permanent residency about australia.png"
                  alt="Life in Australia"
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
              <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium">
                <Target className="w-4 h-4" />
                About Australia PR
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Your Pathway to a New Life in Australia
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Australian Permanent Residency gives you the right to live, work, and settle in Australia permanently with no visa conditions or employer restrictions. The Australian government has confirmed 185,000 PR places for 2026-27, with over 70% reserved for skilled migrants across healthcare, engineering, IT, construction, and trades.
              </p>
              <p className="text-gray-600 leading-relaxed">
                As a PR holder, you gain access to Medicare from day one, free state schooling for your children, and the ability to sponsor family members. After four years of residency, you can apply for Australian citizenship. Whether through skilled independent visas, state nomination, or employer sponsorship, Australia offers multiple pathways to permanent residency.
              </p>
              <p className="text-gray-600 leading-relaxed">
                With IIL&apos;s expert guidance, your PR application process becomes smooth and strategic. Our team helps you navigate the points-based system, skills assessments, and EOI submissions to maximise your chances of success.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { val: "Canberra", lbl: "Capital" },
                  { val: "AUD", lbl: "Currency" },
                  { val: "English", lbl: "Language" },
                  { val: "Oceania", lbl: "Location" },
                ].map(({ val, lbl }, i) => (
                  <div key={i} className="bg-gray-50 p-4 rounded-xl hover:bg-teal-50 transition-colors">
                    <p className="font-bold text-xl text-teal-700">{val}</p>
                    <p className="text-sm text-gray-500">{lbl}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          WHY AUSTRALIA PR SECTION
          ═══════════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Australia Permanent Residency?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Key benefits that make Australia PR one of the world&apos;s most sought-after migration pathways
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Briefcase,
                title: "Work Freedom",
                desc: "Work for any employer across Australia with no restrictions. Average annual salary exceeds AUD 106,000 for skilled professionals.",
              },
              {
                icon: Heart,
                title: "Medicare Access",
                desc: "Full access to Australia&apos;s world-class public healthcare system from the day your PR is granted.",
              },
              {
                icon: BookOpen,
                title: "Free Education",
                desc: "Children can attend Australian public schools for free, receiving world-class education from primary to secondary level.",
              },
              {
                icon: Users,
                title: "Family Sponsorship",
                desc: "Sponsor eligible family members including parents, partners, and dependent children to join you in Australia.",
              },
              {
                icon: Award,
                title: "Citizenship Pathway",
                desc: "Apply for Australian citizenship after four years of permanent residency, including full voting and passport rights.",
              },
              {
                icon: Globe,
                title: "Quality of Life",
                desc: "Safe cities, multicultural communities, clean environment, and excellent work-life balance ranked among the world&apos;s best.",
              },
              {
                icon: Wallet,
                title: "Social Security",
                desc: "Access to Centrelink benefits, parental leave, and pension schemes after meeting qualifying periods.",
              },
              {
                icon: GraduationCap,
                title: "Higher Education",
                desc: "PR holders pay domestic tuition fees at Australian universities, significantly lower than international student rates.",
              },
              {
                icon: Star,
                title: "Travel Flexibility",
                desc: "Five-year travel facility allows you to enter and leave Australia freely. Renew through Resident Return Visa.",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-teal-200 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-6 h-6 text-teal-700" />
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
                desc: "Free points calculation and visa subclass recommendation based on your age, skills, qualifications, and experience.",
              },
              {
                icon: FileText,
                title: "Skills Assessment",
                desc: "Guidance through ACS, Engineers Australia, VETASSESS, and other assessing authorities for your occupation.",
              },
              {
                icon: Shield,
                title: "EOI & Application",
                desc: "Strategic EOI submission through SkillSelect and complete visa application management with document review.",
              },
              {
                icon: Heart,
                title: "Post-Grant Support",
                desc: "Assistance with Medicare enrolment, tax file number, bank setup, and job search after your PR is granted.",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl border border-gray-100 hover:border-teal-200 hover:bg-teal-50/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-teal-700" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 bg-teal-50 border border-teal-100 rounded-2xl p-8 max-w-3xl mx-auto text-center">
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              For detailed information about PR requirements, points test, skills assessment, and processing timelines — <span className="font-semibold text-teal-800">speak directly with our team.</span>
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => scrollToSection("enquiry")}
                className="bg-teal-700 text-white px-7 py-3 rounded-xl font-semibold hover:bg-teal-800 hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                Send an Enquiry <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={whatsappLink("Hi, I want to know more about Australia Permanent Residency.")}
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
              <div className="bg-teal-900 p-8 lg:p-12 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg border-4 border-white/30">
                    <AustraliaFlag className="w-full h-full" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">Australia</h2>
                    <p className="text-teal-100">Permanent Residency</p>
                  </div>
                </div>
                <p className="text-teal-100 mb-8 text-sm leading-relaxed">
                  Fill out the form and our experts will guide you through the entire Australia PR process from assessment to grant.
                </p>
                <div className="space-y-5">
                  <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-4 hover:translate-x-1 transition-transform">
                    <div className="w-11 h-11 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-teal-200">Call Us</p>
                      <p className="font-semibold text-sm">{PHONE_NUMBER}</p>
                    </div>
                  </a>
                  <a href={whatsappLink("Hi, I am interested in Australia Permanent Residency. Please share more information.")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:translate-x-1 transition-transform">
                    <div className="w-11 h-11 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-teal-200">WhatsApp Us</p>
                      <p className="font-semibold text-sm">{PHONE_NUMBER}</p>
                    </div>
                  </a>
                  <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 hover:translate-x-1 transition-transform">
                    <div className="w-11 h-11 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-teal-200">Email Us</p>
                      <p className="font-semibold text-sm">{EMAIL}</p>
                    </div>
                  </a>
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-teal-200">Visit Us</p>
                      <p className="font-semibold text-sm leading-relaxed">{ADDRESS}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="flex items-center gap-3 mb-5">
                    <Award className="w-7 h-7 text-teal-300 shrink-0" />
                    <div>
                      <p className="font-bold">{YEARS_EXPERIENCE}+ Years Experience</p>
                      <p className="text-xs text-teal-200">Guiding professionals to Australian PR</p>
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
                    <input id="name" name="name" type="text" required autoComplete="name" placeholder="Enter your full name" value={formData.name} onChange={handleInputChange} className={`w-full px-4 py-3 border-2 ${formErrors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-teal-500 focus:border-teal-500'} rounded-lg outline-none transition-all text-gray-900 placeholder-gray-400`} />
                    {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email <span className="text-red-500">*</span></label>
                    <input id="email" name="email" type="email" required autoComplete="email" placeholder="Enter your email address" value={formData.email} onChange={handleInputChange} className={`w-full px-4 py-3 border-2 ${formErrors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-teal-500 focus:border-teal-500'} rounded-lg outline-none transition-all text-gray-900 placeholder-gray-400`} />
                    {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">Phone <span className="text-red-500">*</span></label>
                    <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="Enter your phone number" value={formData.phone} onChange={handleInputChange} className={`w-full px-4 py-3 border-2 ${formErrors.phone ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-teal-500 focus:border-teal-500'} rounded-lg outline-none transition-all text-gray-900 placeholder-gray-400`} />
                    {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                  </div>
                  <div>
                    <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-1.5">PR Pathway Interest <span className="text-red-500">*</span></label>
                    <select id="purpose" name="purpose" required value={formData.purpose} onChange={handleInputChange} className={`w-full px-4 py-3 border-2 ${formErrors.purpose ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-teal-500 focus:border-teal-500'} rounded-lg outline-none transition-all text-gray-900`}>
                      <option value="">Select pathway</option>
                      <option value="subclass-189">Skilled Independent (Subclass 189)</option>
                      <option value="subclass-190">Skilled Nominated (Subclass 190)</option>
                      <option value="subclass-491">Skilled Work Regional (Subclass 491)</option>
                      <option value="subclass-186">Employer Nomination (Subclass 186)</option>
                      <option value="subclass-482">Skills in Demand (Subclass 482)</option>
                      <option value="partner-visa">Partner Visa (Subclass 820/801)</option>
                      <option value="other">Other / Not Sure</option>
                    </select>
                    {formErrors.purpose && <p className="text-red-500 text-xs mt-1">{formErrors.purpose}</p>}
                  </div>
                  <input type="hidden" name="country" value={formData.country} />
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                    <textarea id="message" name="message" rows={3} autoComplete="off" placeholder="Tell us about your PR requirements..." value={formData.message} onChange={handleInputChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all resize-none text-gray-900 placeholder-gray-400" />
                  </div>
                  <button type="submit" disabled={loading} className="w-full bg-teal-700 text-white py-4 rounded-lg font-semibold hover:bg-teal-800 active:bg-teal-950 transition-colors flex items-center justify-center gap-2 text-lg shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed">
                    {loading ? (
                      <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</>
                    ) : (
                      <>Submit Enquiry <Send className="w-5 h-5" /></>
                    )}
                  </button>
                  <a href={whatsappLink("Hi, I am interested in Australia Permanent Residency. Please share more information.")} target="_blank" rel="noopener noreferrer" className="w-full bg-[#25D366] text-white py-4 rounded-lg font-semibold hover:bg-[#1ebe57] transition-colors flex items-center justify-center gap-2">
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
      <section className="relative bg-gradient-to-r from-teal-900 via-cyan-800 to-slate-800 text-white py-16 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Start Your Journey to <span className="text-cyan-200">Australia PR</span>
          </h2>
          <p className="text-lg text-cyan-100 mb-8">
            Let IIL guide you toward Australian permanent residency. Contact us today for a free eligibility assessment!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => scrollToSection("enquiry")} className="bg-white text-teal-900 px-8 py-4 rounded-xl font-semibold hover:bg-cyan-50 hover:scale-105 transition-all duration-300 flex items-center gap-2">
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

export default AustraliaPRPage;