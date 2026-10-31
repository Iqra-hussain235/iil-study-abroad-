"use client";

import { motion } from "framer-motion";
import { FaStar, FaGoogle, FaHeart } from "react-icons/fa";

const reviews = [
  {
    name: "Mohammad Anas",
    initial: "M",
    color: "from-blue-500 to-indigo-600",
    time: "5 months ago",
    text: "The best IELTS coaching in all over Moradabad for serious students. The trainers provide excellent guidance for listening, reading, writing and speaking. The study material and personal attention helped me improve my band score and confidence. Thank you IILSTUDYABROAD.",
  },
  {
    name: "Anonymous",
    initial: "A",
    color: "from-purple-500 to-pink-600",
    time: "3 months ago",
    text: "I am really thankful to this institute for helping me improve my English and confidence. Maaz Sir's PTE classes are very structured and easy to understand. Bushra Ma'am is very supportive and teaches in a simple, practical way.",
  },
  {
    name: "Kaif Khan",
    initial: "K",
    color: "from-emerald-500 to-teal-600",
    time: "6 months ago",
    text: "I had an amazing experience at IIL Moradabad — truly the best IELTS institute here. The trainers are highly professional and focus on each student individually. The infrastructure is modern and the environment is very positive.",
  },
  {
    name: "Mohd Ali Saifi",
    initial: "M",
    color: "from-amber-500 to-orange-600",
    time: "8 months ago",
    text: "Best study abroad consultancy in Moradabad. Best English language institute in Moradabad.",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function GoogleReviews() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24 border-b border-slate-100">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <motion.div
          className="absolute left-[8%] top-[15%] h-[28%] w-[28%] rounded-full bg-blue-100/40 blur-[110px]"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[10%] right-[8%] h-[28%] w-[28%] rounded-full bg-amber-100/30 blur-[110px]"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <span className="inline-block rounded-full bg-blue-100/80 border border-blue-200/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#0F4C81] mb-3">
            Trusted By Our Students
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
            What Google Says About Us
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Real reviews from real students, verified on Google.
          </p>
        </motion.div>

        {/* Rating badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-14 flex w-fit items-center gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-md text-slate-900"
        >
          <FaGoogle className="h-8 w-8 text-[#4285F4]" />
          <div className="h-10 w-px bg-slate-200" />
          <div className="flex items-center gap-2">
            <span className="text-3xl font-extrabold text-slate-900">4.8</span>
            <div className="flex flex-col">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="h-3.5 w-3.5 text-amber-400" />
                ))}
              </div>
              <span className="text-xs text-slate-500 mt-0.5 font-medium">327 Google Reviews</span>
            </div>
          </div>
        </motion.div>

        {/* Review cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={container}
        >
          {reviews.map((review) => (
            <motion.div
              key={review.name}
              variants={cardVariant}
              whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
              className="group relative flex flex-col rounded-2xl border border-slate-200 bg-slate-50/70 p-6 shadow-sm transition-all hover:bg-white hover:border-blue-300 hover:shadow-lg"
            >
              <div className="relative z-10 flex items-center gap-3 mb-4">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${review.color} text-white font-bold text-lg shadow-md`}
                >
                  {review.initial}
                </div>
                <div>
                  <p className="text-slate-900 font-bold text-sm">{review.name}</p>
                  <p className="text-slate-500 text-xs font-medium">{review.time}</p>
                </div>
                <FaGoogle className="ml-auto h-4 w-4 text-[#4285F4]" />
              </div>

              <div className="relative z-10 flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="h-3.5 w-3.5 text-amber-400" />
                ))}
              </div>

              <p className="relative z-10 text-slate-600 text-sm leading-relaxed line-clamp-6">
                {review.text}
              </p>

              <div className="relative z-10 mt-auto pt-4 flex items-center gap-1.5 text-slate-500">
                <FaHeart className="h-3 w-3 text-rose-500" />
                <span className="text-xs font-medium">Verified Google Review</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <a
            href="https://www.google.com/search?q=iil+moradabad"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-400 hover:shadow-md"
          >
            <FaGoogle className="h-4 w-4 text-[#4285F4]" />
            See All Reviews on Google
          </a>
        </motion.div>
      </div>
    </section>
  );
}
