"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaGraduationCap, FaChalkboardTeacher, FaCheckSquare, FaGlobe } from "react-icons/fa";

export default function Academy() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      
      {/* HERO SECTION */}
      <div className="relative py-24 px-6 text-center flex flex-col items-center justify-center min-h-[50vh] bg-white border-b border-slate-200">
        <div className="absolute top-[-20%] left-1/4 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[150px] opacity-40 pointer-events-none"></div>
        <div className="absolute top-[-10%] right-1/4 w-[400px] h-[400px] bg-rose-100 rounded-full blur-[150px] opacity-40 pointer-events-none"></div>
        
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="relative z-10"
        >
          <div className="mb-6 inline-flex p-4 rounded-full bg-blue-50 border border-blue-200 shadow-sm text-[#0F4C81]">
            <FaGraduationCap className="text-4xl text-[#0F4C81]" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
            Shape Your Future
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Learn languages, prepare for critical exams, and build your professional career with our elite academy programs.
          </p>

          <Link href="/academy/course">
            <motion.div 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="inline-block mt-8 bg-gradient-to-r from-[#ff2f56] to-[#0F4C81] px-8 py-3.5 rounded-full text-white font-bold text-base shadow-md hover:shadow-lg transition-all"
            >
              Explore Academy Courses
            </motion.div>
          </Link>
        </motion.div>
      </div>

      {/* COURSE CATEGORIES */}
      <div className="px-6 py-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-slate-900 mb-12">
          Academic Tracks
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          
          <motion.div 
            whileHover={{ y: -8 }}
            className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-300 transition-all"
          >
            <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
              <FaGlobe className="text-2xl text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Language Mastery</h3>
            <p className="text-slate-600 text-sm leading-relaxed">English, German, and French courses crafted for fluency and cultural understanding.</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -8 }}
            className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all"
          >
             <div className="bg-emerald-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
              <FaCheckSquare className="text-2xl text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Exam Preparation</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Rigorous training for international certifications: IELTS, PTE, OET, and more.</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -8 }}
            className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl hover:border-amber-300 transition-all"
          >
            <div className="bg-amber-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
              <FaChalkboardTeacher className="text-2xl text-amber-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Skill Development</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Communication, interview preparation, and corporate readiness programs.</p>
          </motion.div>

        </div>
      </div>

    </div>
  );
}
