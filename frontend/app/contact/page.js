"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import API from "@/services/api";
import { SITE } from "@/data/siteInfo";
import AppointmentSection from "@/components/AppointmentSection";

function ContactContent({ showMap = false }) {
  const [data, setData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", text: "" });
    try {
      await API.post("/contact", data);
      setStatus({ type: "ok", text: "Thank you! Your message has been submitted." });
      setData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus({ type: "err", text: "Unable to submit right now. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  const tel = `tel:${SITE.phone.replace(/[^+\d]/g, "")}`;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    "International Institute of Languages and Study Abroad, Near MIT College, Moradabad"
  )}&output=embed`;

  const input =
    "mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0F4C81] focus:ring-4 focus:ring-[#0F4C81]/10";

  return (
    <>
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg sm:p-10"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ff2f56]">
                Contact Center
              </p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Get in touch with International Institute Of Languages
              </h2>
              <p className="mt-4 max-w-2xl text-slate-600">
                Send your details and our team will reach out to you with complete study abroad,
                visa, and language support.
              </p>

              <div className="mt-8 space-y-5">
                <div>
                  <label className="text-sm font-semibold text-slate-700">Name</label>
                  <input
                    required
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    className={input}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Email</label>
                  <input
                    required
                    type="email"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    className={input}
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700">Message</label>
                  <textarea
                    required
                    value={data.message}
                    onChange={(e) => setData({ ...data, message: e.target.value })}
                    className={`${input} h-40 resize-none`}
                    placeholder="Share your enquiry or preferred course"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full rounded-full bg-[#0F4C81] px-7 py-3.5 font-semibold text-white shadow-lg shadow-[#0F4C81]/25 transition hover:-translate-y-0.5 hover:bg-[#0c3d69] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit Enquiry"}
              </button>
              {status.text && (
                <p
                  className={`mt-4 text-sm font-medium ${
                    status.type === "ok" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {status.text}
                </p>
              )}
            </motion.form>

            {/* Details */}
            <motion.aside
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-5"
            >
              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg">
                <h3 className="text-2xl font-extrabold text-slate-900">Contact Details</h3>

                <div className="mt-6 space-y-5">
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <FaMapMarkerAlt />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff2f56]">Address</p>
                      <p className="mt-1 font-semibold text-slate-900">{SITE.address}</p>
                    </div>
                  </div>

                  <a href={tel} className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0F4C81]/10 text-[#0F4C81]">
                      <FaPhoneAlt />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff2f56]">Phone</p>
                      <p className="mt-1 font-semibold text-slate-900">{SITE.phone}</p>
                    </div>
                  </a>

                  <a href={`mailto:${SITE.email}`} className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ff2f56]/10 text-[#ff2f56]">
                      <FaEnvelope />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff2f56]">Email</p>
                      <p className="mt-1 break-all font-semibold text-slate-900">{SITE.email}</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-4">
                    <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                      <FaClock />
                    </span>
                    <div>
                      <p className="font-bold text-slate-900">Office Hours</p>
                      <p className="mt-1 text-slate-600">Mon - Sat: 09:00 AM - 07:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {showMap && (
                <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-lg">
                  <iframe
                    title="IIL Moradabad on Google Maps"
                    src={mapSrc}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-64 w-full border-0"
                  />
                </div>
              )}
            </motion.aside>
          </div>
        </div>
      </section>

      {!showMap && <AppointmentSection />}
    </>
  );
}

export default function ContactPage() {
  return <ContactContent />;
}























// "use client";

// import { useState } from "react";
// import API from "@/services/api";

// export default function Contact() {
//   const [data, setData] = useState({ name: "", email: "", message: "" });
//   const [status, setStatus] = useState("");

//   const handleSubmit = async () => {
//     try {
//       await API.post("/contact", data);
//       setStatus("Thank you! Your message has been submitted.");
//       setData({ name: "", email: "", message: "" });
//     } catch (error) {
//       setStatus("Unable to submit right now. Please try again later.");
//     }
//   };

//   return (
//     <main className="min-h-screen bg-slate-50 text-slate-900">
//       <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-16 sm:px-6 lg:px-8">
//         <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">
//           <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
//             <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-[#0F4C81] bg-blue-100/80 border border-blue-200/80 px-4 py-1.5 rounded-full mb-3">
//               Contact Center
//             </span>
//             <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">
//               Get in touch with International Institute Of Language
//             </h1>
//             <p className="mt-4 max-w-2xl text-slate-600">
//               Send your details and our team will reach out to you with complete study abroad, visa, and language support.
//             </p>

//             <div className="mt-8 space-y-5">
//               <div>
//                 <label className="text-sm font-semibold text-slate-700">Name</label>
//                 <input
//                   value={data.name}
//                   onChange={(e) => setData({ ...data, name: e.target.value })}
//                   className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#0F4C81] focus:ring-2 focus:ring-blue-100"
//                   placeholder="Your full name"
//                 />
//               </div>
//               <div>
//                 <label className="text-sm font-semibold text-slate-700">Email</label>
//                 <input
//                   value={data.email}
//                   onChange={(e) => setData({ ...data, email: e.target.value })}
//                   className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#0F4C81] focus:ring-2 focus:ring-blue-100"
//                   placeholder="you@example.com"
//                 />
//               </div>
//               <div>
//                 <label className="text-sm font-semibold text-slate-700">Message</label>
//                 <textarea
//                   value={data.message}
//                   onChange={(e) => setData({ ...data, message: e.target.value })}
//                   className="mt-2 h-40 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#0F4C81] focus:ring-2 focus:ring-blue-100"
//                   placeholder="Share your enquiry or preferred course"
//                 />
//               </div>
//             </div>

//             <button
//               onClick={handleSubmit}
//               className="mt-6 w-full rounded-full bg-gradient-to-r from-[#ff2f56] to-[#0F4C81] py-3.5 px-6 font-semibold text-white shadow-md transition-all hover:opacity-95 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               Submit Enquiry
//             </button>
//             {status && <p className="mt-4 text-sm font-medium text-emerald-600">{status}</p>}
//           </section>

//           <aside className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
//             <div>
//               <h2 className="text-2xl font-bold text-slate-900">Contact Details</h2>
//               <p className="mt-3 text-slate-600">Near MIT College, Wave Cinema Road, Moradabad</p>
//             </div>
//             <div>
//               <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#ff2f56]">Phone</p>
//               <p className="mt-1 text-lg font-bold text-slate-900">+91 8445955365</p>
//             </div>
//             <div>
//               <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#ff2f56]">Email</p>
//               <p className="mt-1 text-lg font-bold text-slate-900">support@ILL.com</p>
//             </div>
//             <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-slate-600">
//               <h3 className="font-bold text-slate-900">Office Hours</h3>
//               <p className="mt-2">Mon - Sat: 09:00 AM - 07:00 PM</p>
//             </div>
//           </aside>
//         </div>
//       </div>
//     </main>
//   );
// }
