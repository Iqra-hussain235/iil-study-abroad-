"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Globe, GraduationCap, Award, ArrowRight, Phone, Mail,
  MapPin, Shield, Briefcase, Plane, Heart, Users, Sparkles,
  TrendingUp, Send, X, Building, MessageCircle, CheckCircle,
  Compass, FileText, Wallet, Landmark, Sun, BookOpen, Languages
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

const PolandPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [imgError, setImgError] = useState({ hero: false, about: false });
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "Poland",
    qualification: "",
    course: "",
    message: "",
  });

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      e.stopPropagation();
      setLoading(true);

      try {
        const purpose = `${formData.qualification} - ${formData.course}`;
        const payload = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          purpose: purpose,
          message: formData.message,
          visaType: "Study Visa",
          country: "Poland",
        };

        const response = await fetch("/api/enquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          setShowPopup(true);
          setFormData({
            name: "",
            email: "",
            phone: "",
            country: "Poland",
            qualification: "",
            course: "",
            message: "",
          });
        } else {
          alert("Something went wrong. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to submit. Please check your connection.");
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

      {/* ── Floating WhatsApp ── */}
      <a
        href={whatsappLink("Hi, I'm interested in studying in Poland. Please share more information.")}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[999] flex items-center gap-2 bg-[#25D366] text-white px-4 py-3.5 rounded-full shadow-xl hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="hidden sm:inline font-semibold text-sm pr-1">WhatsApp Us</span>
      </a>

      {/* ── Success Popup ── */}
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
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Your enquiry has been received. Our team will get in touch with you shortly.
            </p>
            <div className="flex gap-3">
              <a
                href={whatsappLink("Hi, I just submitted an enquiry for Poland Study Visa. Please assist me further.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#25D366] text-white px-4 py-3 rounded-lg hover:bg-[#1ebe57] transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <button
                onClick={closePopup}
                className="flex-1 bg-red-700 text-white px-4 py-3 rounded-lg hover:bg-red-800 transition-colors font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-red-800 via-red-700 to-rose-900 text-white overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-rose-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-red-300/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                <Globe className="w-4 h-4" />
                Study Visa Guidance
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Study in{" "}
                <span className="block text-rose-200">Poland</span>
              </h1>
              <p className="text-lg text-red-100 leading-relaxed max-w-xl">
                Discover high-quality education in the heart of Central Europe. Poland offers affordable tuition, 
                English-taught programs, EU membership benefits, and a rich cultural heritage for international 
                students seeking world-class education.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToSection("enquiry")}
                  className="bg-white text-red-800 px-8 py-4 rounded-xl font-semibold hover:bg-red-50 hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-lg"
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

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                {[
                  { icon: Building, bold: `${YEARS_EXPERIENCE}+ Years`, sub: "Guiding Students" },
                  { icon: GraduationCap, bold: "Expert Team", sub: "Professional Guidance" },
                  { icon: Award, bold: "Top Universities", sub: "Global Education" },
                ].map(({ icon: Icon, bold, sub }, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-base leading-tight">{bold}</p>
                      <p className="text-xs text-red-200">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right – image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-red-900">
                {!imgError.hero ? (
                  <Image
                    src="/poland.png"
                    alt="Study in Poland"
                    width={600}
                    height={400}
                    className="w-full h-[400px] object-cover"
                    priority
                    onError={() => handleImgError('hero')}
                  />
                ) : (
                  <div className="w-full h-[400px] bg-gradient-to-br from-red-800 to-rose-900 flex items-center justify-center">
                    <Building className="w-32 h-32 text-white/20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/40 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Compass className="w-6 h-6 text-red-600" />
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

      {/* ══════════════════════════════════════════
          ABOUT
      ══════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-gray-100">
              {!imgError.about ? (
                <Image
                  src="/poland-image.png"
                  alt="Poland Landscape"
                  width={600}
                  height={400}
                  className="w-full h-[400px] object-cover"
                  onError={() => handleImgError('about')}
                />
              ) : (
                <div className="w-full h-[400px] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <Building className="w-32 h-32 text-gray-400" />
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium">
                <Landmark className="w-4 h-4" />
                About Poland
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Discover Poland
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Poland is a large country in Central Europe with a long Baltic Sea coastline. It is a democratic 
                country with a stable, robust economy and a member of both NATO and the European Union. With a rich 
                history dating back over a thousand years, Poland offers a unique blend of historical charm and modern 
                development that makes it an attractive destination for international students.
              </p>
              <p className="text-gray-600 leading-relaxed">
                The country boasts a well-developed education system that follows international standards, with 
                hundreds of higher education institutions offering programs in English. Poland's central location 
                in Europe provides easy access to neighboring countries, while its affordable cost of living makes 
                it an excellent choice for students seeking quality education without excessive financial burden.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Polish cities like Warsaw, Krakow, and Wroclaw are vibrant student hubs with rich cultural scenes, 
                modern infrastructure, and welcoming communities. The country's strong academic tradition, combined 
                with its growing economy, creates excellent opportunities for both academic and professional growth.
              </p>

              {/* Quick facts */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { val: "Warsaw", lbl: "Capital City" },
                  { val: "Polish Zloty", lbl: "Currency" },
                  { val: "Polish & English", lbl: "Languages" },
                  { val: "Central Europe", lbl: "Location" },
                ].map(({ val, lbl }, i) => (
                  <div key={i} className="bg-gray-50 p-4 rounded-xl hover:bg-red-50 transition-colors">
                    <p className="font-bold text-xl text-red-700">{val}</p>
                    <p className="text-sm text-gray-500">{lbl}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHY POLAND
      ══════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Study in Poland?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Key reasons international students choose Poland for higher education
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Wallet,
                title: "Affordable Education",
                desc: "Poland offers high-quality education at a fraction of the cost compared to many other European countries. Tuition fees and living expenses are budget-friendly for international students.",
              },
              {
                icon: Globe,
                title: "EU Member Country",
                desc: "As a member of the European Union, Poland provides access to European standards of education and the ability to travel freely across Schengen countries during your studies.",
              },
              {
                icon: Languages,
                title: "English-Taught Programs",
                desc: "Many Polish universities offer programs taught entirely in English, making it accessible for international students from all over the world without language barriers.",
              },
              {
                icon: GraduationCap,
                title: "Quality Education System",
                desc: "Poland's education system follows international standards with strong academic traditions. Degrees are recognized across the EU and worldwide, opening global career opportunities.",
              },
              {
                icon: Landmark,
                title: "Rich Cultural Heritage",
                desc: "Poland has a rich cultural heritage with historic cities like Krakow, Warsaw, and Gdansk. Students can explore centuries of European history while pursuing their education.",
              },
              {
                icon: Heart,
                title: "Safe & Welcoming",
                desc: "Poland is known for being safe and welcoming to international students. The country has a vibrant student community with people from all over the world.",
              },
              {
                icon: TrendingUp,
                title: "Growing Economy",
                desc: "Poland has one of the fastest-growing economies in Europe, offering excellent career opportunities and internships for students during and after their studies.",
              },
              {
                icon: Shield,
                title: "Central European Location",
                desc: "Located in the heart of Europe, Poland provides easy access to neighboring countries like Germany, Czech Republic, Slovakia, and Austria for travel and exploration.",
              },
              {
                icon: BookOpen,
                title: "Diverse Course Options",
                desc: "From medicine and engineering to arts and humanities, Polish universities offer a wide range of courses at undergraduate, postgraduate, and doctoral levels.",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-200 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-6 h-6 text-red-700" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HOW WE HELP
      ══════════════════════════════════════════ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How We Support You
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Our team guides you at every step — from choosing the right university to visa preparation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Compass,
                title: "Course & University Guidance",
                desc: "Personalised recommendations based on your academic background, budget, and career goals.",
              },
              {
                icon: FileText,
                title: "Documentation Support",
                desc: "Help organising and reviewing all documents your admission and visa application will need.",
              },
              {
                icon: Shield,
                title: "Visa File Preparation",
                desc: "Guidance on preparing a genuine, complete visa application as per current requirements.",
              },
              {
                icon: Heart,
                title: "Pre-Departure Assistance",
                desc: "Practical guidance on travel, accommodation, and settling in once your visa is approved.",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl border border-gray-100 hover:border-red-200 hover:bg-red-50/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-red-700" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* CTA nudge */}
          <div className="mt-12 bg-red-50 border border-red-100 rounded-2xl p-8 max-w-3xl mx-auto text-center">
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              For detailed information about visa requirements, documents, eligible universities,
              and current intake dates —{" "}
              <span className="font-semibold text-red-800">
                speak directly with our team.
              </span>
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => scrollToSection("enquiry")}
                className="bg-red-700 text-white px-7 py-3 rounded-xl font-semibold hover:bg-red-800 hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                Send an Enquiry <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={whatsappLink("Hi, I want to know more about studying in Poland.")}
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

      {/* ══════════════════════════════════════════
          ENQUIRY FORM
      ══════════════════════════════════════════ */}
      <section id="enquiry" className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <div className="grid lg:grid-cols-2">

              {/* Left – contact info */}
              <div className="bg-red-700 p-8 lg:p-12 text-white">
                <h2 className="text-3xl font-bold mb-3">Apply for Poland Study Visa</h2>
                <p className="text-red-100 mb-8 text-sm leading-relaxed">
                  Fill out the form and our team will reach out to guide you through the entire process.
                </p>

                <div className="space-y-5">
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="flex items-center gap-4 hover:translate-x-1 transition-transform"
                  >
                    <div className="w-11 h-11 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-red-200">Call Us</p>
                      <p className="font-semibold text-sm">{PHONE_NUMBER}</p>
                    </div>
                  </a>

                  <a
                    href={whatsappLink("Hi, I'm interested in studying in Poland. Please share more information.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 hover:translate-x-1 transition-transform"
                  >
                    <div className="w-11 h-11 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-red-200">WhatsApp Us</p>
                      <p className="font-semibold text-sm">{PHONE_NUMBER}</p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${EMAIL}`}
                    className="flex items-center gap-4 hover:translate-x-1 transition-transform"
                  >
                    <div className="w-11 h-11 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-red-200">Email Us</p>
                      <p className="font-semibold text-sm">{EMAIL}</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-red-200">Visit Us</p>
                      <p className="font-semibold text-sm leading-relaxed">{ADDRESS}</p>
                    </div>
                  </div>
                </div>

                {/* Experience + socials */}
                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="flex items-center gap-3 mb-5">
                    <Award className="w-7 h-7 text-yellow-400 shrink-0" />
                    <div>
                      <p className="font-bold">{YEARS_EXPERIENCE}+ Years Experience</p>
                      <p className="text-xs text-red-200">Guiding students on their study abroad journey</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Instagram */}
                    <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                      className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    </a>
                    {/* Facebook */}
                    <a href={SOCIALS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                      className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                    </a>
                    {/* LinkedIn */}
                    <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                      className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                    {/* YouTube */}
                    <a href={SOCIALS.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                      className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right – form */}
              <div className="p-8 lg:p-12">
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name" name="name" type="text" required autoComplete="name"
                      placeholder="Enter your full name"
                      value={formData.name} onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-gray-900 placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email" name="email" type="email" required autoComplete="email"
                      placeholder="Enter your email address"
                      value={formData.email} onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-gray-900 placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="phone" name="phone" type="tel" required autoComplete="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone} onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-gray-900 placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="qualification" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Current Qualification <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="qualification" name="qualification" required
                      value={formData.qualification} onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-gray-900"
                    >
                      <option value="">Select qualification</option>
                      <option value="12th">12th Standard / High School</option>
                      <option value="bachelor">Bachelor's Degree</option>
                      <option value="master">Master's Degree</option>
                      <option value="diploma">Diploma</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Preferred Course <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="course" name="course" required
                      value={formData.course} onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-gray-900"
                    >
                      <option value="">Select course</option>
                      <option value="engineering">Engineering</option>
                      <option value="medicine">Medicine / Healthcare</option>
                      <option value="business">Business / Management</option>
                      <option value="it">IT / Computer Science</option>
                      <option value="economics">Economics / Finance</option>
                      <option value="humanities">Humanities / Social Sciences</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <input type="hidden" name="country" value={formData.country} />

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="message" name="message" rows={3} autoComplete="off"
                      placeholder="Tell us about your study plans..."
                      value={formData.message} onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all resize-none text-gray-900 placeholder-gray-400"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-700 text-white py-4 rounded-lg font-semibold hover:bg-red-800 active:bg-red-900 transition-colors flex items-center justify-center gap-2 text-lg shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Enquiry <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <a
                    href={whatsappLink("Hi, I'm interested in studying in Poland. Please share more information.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] text-white py-4 rounded-lg font-semibold hover:bg-[#1ebe57] transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" /> Or Chat on WhatsApp
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          BOTTOM BANNER
      ══════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-r from-red-800 via-red-700 to-rose-900 text-white py-16 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Start Your Journey to{" "}
            <span className="text-rose-200">Poland</span>
          </h2>
          <p className="text-lg text-red-100 mb-8">
            Let IIL guide you toward world-class Polish education and career opportunities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => scrollToSection("enquiry")}
              className="bg-white text-red-800 px-8 py-4 rounded-xl font-semibold hover:bg-red-50 hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              Apply Now <ArrowRight className="w-5 h-5" />
            </button>
            <Link
              href="/visa/study"
              className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors"
            >
              Back to Countries
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default PolandPage;