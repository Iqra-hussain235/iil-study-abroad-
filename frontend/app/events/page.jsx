"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const events = [
  {
    id: 1,
    title: "Beyond the Ordinary",
    description:
      "An outing with the learner where learning is not limit but also a social engagement with each other by exploring more.",
    image: "/images/img7.jpeg",
  },
  {
    id: 2,
    title: "Events That Shape Futures",
    description:
      "A successful seminar with the future assistant of doctor to make their life more bright in Abroad As knowledge shouldn’t have to keep, it should have to aware who are not.",
    image: "/images/img2.jpeg",
  },
  {
    id: 3,
    title: "Where Memories Begin",
    description:
      "An outing where student shared their enjoyable gesture with their trainer who always stand by them.",
    image: "/images/img3.jpeg",
  },
  {
    id: 4,
    title: "Learning Beyond Classrooms",
    description:
      "An event where kids had been welcomed and we always look after the creatives where it exists.",
    image: "/images/img4.jpeg",
  },
  {
    id: 5,
    title: "Experiences That Educate",
    description:
      "An event of Independence Day when we recall our duties and make our younger ones recalled to being united.",
    image: "/images/img5.jpeg",
  },
  {
    id: 6,
    title: "Travel, Learn, Grow",
    description:
      "An exposure of the day where all spoke in an open area where we tried to give experience of real life challenges overcome.",
    image: "/images/img6.jpeg",
  },
];

export default function EventShowcasePage() {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 overflow-hidden font-sans">
      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-16 text-center bg-white border-b border-slate-200 overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-blue-100/60 blur-3xl opacity-70 pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-52 h-52 rounded-full bg-rose-100/50 blur-3xl opacity-60 pointer-events-none" />

        <span className="inline-block rounded-full bg-blue-100/80 border border-blue-200/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#0F4C81] mb-4">
          Explore Experiences
        </span>

        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
          Events That Create
          <br />
          Beautiful Memories
        </h1>

        <p className="max-w-3xl mx-auto text-base md:text-lg text-slate-600 leading-relaxed">
          From adventure trips to special celebrations, discover experiences
          crafted to make every moment unforgettable. Every event tells a story,
          and every journey becomes a memory worth keeping.
        </p>
      </section>

      {/* Large Alternating Event Sections */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 space-y-24">
        {events.map((event, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              {/* Image */}
              <div className={`${!isEven ? "md:order-2" : ""}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-[28px] overflow-hidden shadow-xl border border-slate-200 bg-white"
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-[460px] object-cover"
                  />
                </motion.div>
              </div>

              {/* Content */}
              <div className={`${!isEven ? "md:order-1" : ""}`}>
                <span className="inline-block text-xs uppercase tracking-[3px] font-bold text-[#ff2f56] mb-3">
                  Featured Event
                </span>

                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-5 leading-tight">
                  {event.title}
                </h2>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
                  {event.description}
                </p>

                <p className="text-base font-semibold text-[#0F4C81] italic border-l-4 border-[#0F4C81] pl-4">
                  {event.id === 1
                    ? "Every journey opens new doors to adventure, learning, and unforgettable memories."
                    : event.id === 2
                    ? "Beautiful celebrations are remembered for the emotions they leave behind."
                    : event.id === 3
                    ? "Adventure begins where comfort ends and the best stories are created outside."
                    : event.id === 4
                    ? "The quiet of nature and shared moments create the most peaceful memories."
                    : event.id === 5
                    ? "Campus life is filled with moments that turn into stories remembered forever."
                    : "Strong teams are built through shared challenges, laughter, and unforgettable moments."}
                </p>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-10">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                International Institute Of Language
              </h3>
              <p className="text-slate-600 text-sm">
                Professional guidance for study abroad, visas, and language exams.
              </p>
            </div>

            <div className="flex gap-6 text-sm font-semibold text-slate-700">
              <a
                href="https://www.linkedin.com/company/iilstudyabroad"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0F4C81]"
              >
                LinkedIn
              </a>
              <a
                href="https://www.facebook.com/iiLstudyabroad"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0F4C81]"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/iil.studyabroad"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0F4C81]"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 py-6 text-center">
          <p className="text-slate-500 text-xs">
            © 2026 International Institute Of Language. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
