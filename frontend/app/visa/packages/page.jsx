"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin, Phone, Mail, Globe, Award, ArrowRight, CheckCircle,
  Plane, Compass, MessageCircle
} from "lucide-react";

/* ─── Social SVG Icons ─── */
function FacebookIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
function XIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function InstagramIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}
function YoutubeIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}
function LinkedinIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
function WhatsAppIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.134 1.585 5.934L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ─── Scroll Reveal Hook ─── */
function useScrollReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

const countries = [
  { name: "Dubai", code: "AE" },
  { name: "Thailand", code: "TH" },
  { name: "Singapore", code: "SG" },
  { name: "Malaysia", code: "MY" },
  { name: "Maldives", code: "MV" },
  { name: "Turkey", code: "TR" },
  { name: "Sri Lanka", code: "LK" },
  { name: "Bali", code: "ID" },
  { name: "Europe", code: "EU" },
  { name: "Mauritius", code: "MU" },
];

export default function TourPackagesPage() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", country: "", travelDate: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroPhone, setHeroPhone] = useState("");
  const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setShowWhatsAppPopup(true);
    setTimeout(() => setSubmitted(false), 4000);
    setTimeout(() => setShowWhatsAppPopup(false), 6000);
  };

  const scrollToForm = () => {
    document.getElementById("enquiry-form")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [heroRef, heroVis] = useScrollReveal();
  const [formRef, formVis] = useScrollReveal();

  return (
    <div className="min-h-screen bg-white text-slate-800 overflow-x-hidden">

      {/* ═══ NAVBAR ═══ */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200" : "bg-white shadow-sm"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 leading-tight">International Institute of Languages</h1>
                <p className="text-xs text-gray-600">& Study Abroad</p>
              </div>
            </div>
            <a href="tel:+918630048365" className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-black transition-colors text-sm font-medium">
              <Phone className="w-4 h-4" />+91-8630048365
            </a>
          </div>
        </div>
      </nav>

      {/* ═══ HERO SECTION WITH IMAGE ═══ */}
      <section ref={heroRef} className="relative min-h-[600px] lg:min-h-[680px] flex items-center overflow-hidden pt-16 lg:pt-20 bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900" />
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-800/30 via-transparent to-rose-900/20" />

        {/* Decorative orbs */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-rose-500/8 rounded-full blur-3xl" />
        <div className="absolute top-32 left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl" />

        <div className="absolute inset-0 opacity-[0.02]" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px'}} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className={`transition-all duration-1000 ${heroVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 text-sm font-medium text-rose-300 mb-5">
                <Plane className="w-4 h-4" />
                Tour Packages
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Explore The World<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-orange-400">With IIL</span>
              </h1>
              <p className="text-lg text-slate-300 mb-8 max-w-lg leading-relaxed">
                Discover amazing destinations with our curated tour packages. From scenic getaways to cultural experiences, we make your travel dreams a reality.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2.5">
                  <div className="text-rose-300 font-bold text-lg">15+</div>
                  <div className="text-slate-400 text-xs">Destinations</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2.5">
                  <div className="text-rose-300 font-bold text-lg">Expert</div>
                  <div className="text-slate-400 text-xs">Travel Planning</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2.5">
                  <div className="text-rose-300 font-bold text-lg">Trusted</div>
                  <div className="text-slate-400 text-xs">Since 2015</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                <div className="flex-1 flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden">
                  <div className="flex items-center gap-1 px-3 py-3 border-r border-white/10">
                    <span className="text-lg">🇮🇳</span>
                    <span className="text-sm text-white/80">+91</span>
                  </div>
                  <input type="tel" placeholder="Enter phone number" value={heroPhone} onChange={(e) => setHeroPhone(e.target.value)} className="flex-1 bg-transparent text-white placeholder:text-white/40 px-4 py-3 outline-none text-sm" />
                </div>
                <button onClick={scrollToForm} className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-rose-600/25">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-500" defaultChecked />
                <span>I agree to receive promotional SMS, Email, WhatsApp & RCS messages.</span>
              </div>
            </div>

            <div className={`relative transition-all duration-1000 delay-300 ${heroVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/30 border-4 border-white/10">
                {/* TOUR PACKAGES IMAGE */}
                <Image 
                  src="/tour-packages.png" 
                  alt="Tour Packages" 
                  width={600} 
                  height={400} 
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl p-4 border border-gray-100 hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                    <Compass className="w-5 h-5 text-rose-600" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Explore World</div>
                    <div className="text-xs text-slate-500">Discover new destinations</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ENQUIRY FORM ═══ */}
      <section id="enquiry-form" ref={formRef} className="relative py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-1000 ${formVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl shadow-slate-200/50">

              {/* LEFT: Info Panel */}
              <div className="bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 p-8 lg:p-12 flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Book Your<br /><span className="text-rose-300">Tour Package</span></h2>
                  <p className="text-slate-300 mb-8 leading-relaxed">
                    Fill out the form and our travel experts will help you plan the perfect trip.
                  </p>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-rose-300" />
                      </div>
                      <div>
                        <div className="text-slate-400 text-sm">Call Us</div>
                        <div className="text-white font-semibold text-lg">+91-8630048365</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-rose-300" />
                      </div>
                      <div>
                        <div className="text-slate-400 text-sm">Email Us</div>
                        <div className="text-white font-semibold text-lg">Contact@iilstudyabroad.com</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-rose-300" />
                      </div>
                      <div>
                        <div className="text-slate-400 text-sm">Visit Us</div>
                        <div className="text-white font-semibold text-lg">Near MIT College, Wave Cinema Road, Moradabad</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-12 pt-8 border-t border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                      <Award className="w-6 h-6 text-rose-300" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">9+ Years Experience</div>
                      <div className="text-slate-400 text-sm">Trusted Travel Partner</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: Form */}
              <div className="bg-white p-8 lg:p-12">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Thank You!</h3>
                    <p className="text-slate-500">We have received your enquiry. Our team will contact you soon.</p>

                    {showWhatsAppPopup && (
                      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                        <p className="text-green-700 text-sm font-medium mb-3">Want faster response? Chat with us on WhatsApp!</p>
                        <a href="https://wa.me/918630048365" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                          <WhatsAppIcon className="w-5 h-5" />
                          Chat on WhatsApp
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                      <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all" placeholder="Enter your full name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
                      <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all" placeholder="Enter your email" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number *</label>
                      <div className="flex items-center bg-white border border-slate-200 rounded-xl overflow-hidden focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/20 transition-all">
                        <div className="flex items-center gap-1 px-3 py-3 border-r border-slate-200">
                          <span className="text-lg">🇮🇳</span><span className="text-sm text-slate-500">+91</span>
                        </div>
                        <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="flex-1 bg-transparent px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none" placeholder="Enter your phone number" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Destination *</label>
                      <select name="country" value={formData.country} onChange={handleChange} required className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all appearance-none cursor-pointer">
                        <option value="">Select a destination</option>
                        {countries.map((c) => (<option key={c.code} value={c.name} className="bg-white">{c.name}</option>))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Planned Travel Date</label>
                      <input type="date" name="travelDate" value={formData.travelDate} onChange={handleChange} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                      <textarea name="message" rows={4} value={formData.message} onChange={handleChange} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all resize-none" placeholder="Tell us about your travel plans..." />
                    </div>
                    <button type="submit" className="w-full bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-2">
                      Submit Enquiry <ArrowRight className="w-5 h-5" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FLOATING WHATSAPP ═══ */}
      <a href="https://wa.me/918630048365" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 hover:shadow-green-500/40 group"
        title="Chat on WhatsApp">
        <WhatsAppIcon className="w-7 h-7 text-white" />
        <span className="absolute right-16 bg-slate-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Chat on WhatsApp</span>
      </a>

      {/* ═══ FOOTER (BLACK) ═══ */}
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
                <div className="flex items-center gap-2 text-sm text-slate-400"><MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" /><span>Near MIT College, Wave Cinema Road, Moradabad, Uttar Pradesh, India</span></div>
                <div className="flex items-center gap-2 text-sm text-slate-400"><Phone className="w-4 h-4 text-gray-500 flex-shrink-0" /><span>+91-8630048365</span></div>
                <div className="flex items-center gap-2 text-sm text-slate-400"><Phone className="w-4 h-4 text-green-500 flex-shrink-0" /><span>+91-8630048365 (WhatsApp)</span></div>
              </div>
              <div className="flex items-center gap-3 mt-6">
                <a href="https://www.facebook.com/iil.studyabroad" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-800 text-white flex items-center justify-center hover:bg-blue-600 transition-all duration-300 hover:scale-110"><FacebookIcon className="w-4 h-4" /></a>
                <a href="https://twitter.com/iilstudyabroad" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-800 text-white flex items-center justify-center hover:bg-slate-700 transition-all duration-300 hover:scale-110"><XIcon className="w-4 h-4" /></a>
                <a href="https://www.instagram.com/iil.studyabroad" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-800 text-white flex items-center justify-center hover:bg-pink-600 transition-all duration-300 hover:scale-110"><InstagramIcon className="w-4 h-4" /></a>
                <a href="https://youtube.com/@iil.studyabroad" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-800 text-white flex items-center justify-center hover:bg-red-600 transition-all duration-300 hover:scale-110"><YoutubeIcon className="w-4 h-4" /></a>
                <a href="https://www.linkedin.com/company/iilstudyabroad/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-800 text-white flex items-center justify-center hover:bg-blue-700 transition-all duration-300 hover:scale-110"><LinkedinIcon className="w-4 h-4" /></a>
                <a href="https://wa.me/918630048365" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-800 text-white flex items-center justify-center hover:bg-green-600 transition-all duration-300 hover:scale-110"><WhatsAppIcon className="w-4 h-4" /></a>
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
}