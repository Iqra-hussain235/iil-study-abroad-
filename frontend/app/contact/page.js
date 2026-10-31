"use client";

import { useState } from "react";
import API from "@/services/api";

export default function Contact() {
  const [data, setData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    try {
      await API.post("/contact", data);
      setStatus("Thank you! Your message has been submitted.");
      setData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("Unable to submit right now. Please try again later.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-[#0F4C81] bg-blue-100/80 border border-blue-200/80 px-4 py-1.5 rounded-full mb-3">
              Contact Center
            </span>
            <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900">
              Get in touch with International Institute Of Language
            </h1>
            <p className="mt-4 max-w-2xl text-slate-600">
              Send your details and our team will reach out to you with complete study abroad, visa, and language support.
            </p>

            <div className="mt-8 space-y-5">
              <div>
                <label className="text-sm font-semibold text-slate-700">Name</label>
                <input
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#0F4C81] focus:ring-2 focus:ring-blue-100"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">Email</label>
                <input
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#0F4C81] focus:ring-2 focus:ring-blue-100"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">Message</label>
                <textarea
                  value={data.message}
                  onChange={(e) => setData({ ...data, message: e.target.value })}
                  className="mt-2 h-40 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#0F4C81] focus:ring-2 focus:ring-blue-100"
                  placeholder="Share your enquiry or preferred course"
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="mt-6 w-full rounded-full bg-gradient-to-r from-[#ff2f56] to-[#0F4C81] py-3.5 px-6 font-semibold text-white shadow-md transition-all hover:opacity-95 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              Submit Enquiry
            </button>
            {status && <p className="mt-4 text-sm font-medium text-emerald-600">{status}</p>}
          </section>

          <aside className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Contact Details</h2>
              <p className="mt-3 text-slate-600">Near MIT College, Wave Cinema Road, Moradabad</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#ff2f56]">Phone</p>
              <p className="mt-1 text-lg font-bold text-slate-900">+91 8445955365</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#ff2f56]">Email</p>
              <p className="mt-1 text-lg font-bold text-slate-900">support@ILL.com</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-slate-600">
              <h3 className="font-bold text-slate-900">Office Hours</h3>
              <p className="mt-2">Mon - Sat: 09:00 AM - 07:00 PM</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
