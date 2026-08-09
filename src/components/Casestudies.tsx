import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import subhan from "../assets/subhan.mp4";
import aleeza from "../assets/aleeza.mp4";
import paperbags from "../assets/paperbags.mp4";
import naqsh from "../assets/resume-builder.mp4";

const CASE_STUDIES = [
  {
    id: "subhanportfolio",
    title: "Subhan — Portfolio",
    tag: "Personal Site",
    year: "2026",
    video: subhan,
    color: "#CFFF04",
    metrics: [
      { label: "load time", value: "0.8s" },
      { label: "lighthouse", value: "100" },
    ],
    desc: "A highly interactive, non-templated portfolio built with React, Tailwind, and Framer Motion.",
  },
  {
    id: "aleezaportfolio",
    title: "Aleeza — Portfolio",
    tag: "Personal Site",
    year: "2026",
    video: aleeza,
    color: "#FF2E91",
    metrics: [
      { label: "conversion", value: "+42%" },
      { label: "animations", value: "60fps" },
    ],
    desc: "Sleek, modern digital presence focusing on typography and seamless transitions.",
  },
  {
    id: "ecommercesite",
    title: "Paperbags — Ecommerce",
    tag: "Product Store",
    year: "2026",
    video: paperbags,
    color: "#5D00FF",
    metrics: [
      { label: "sales velocity", value: "3x" },
      { label: "uptime", value: "99.9%" },
    ],
    desc: "A high-performance storefront designed from a blank canvas to maximize checkout speed.",
  },
  {
    id: "naqshresume",
    title: "Naqsh — Resume Builder",
    tag: "Web App",
    year: "2026",
    video: naqsh,
    color: "#CFFF04",
    metrics: [
      { label: "users", value: "10k+" },
      { label: "exports", value: "50k" },
    ],
    desc: "A complex SaaS tool masking its underlying complexity with a beautifully minimal UI.",
  },
];

// Interactive 3D Card Component
function InteractiveCard({ study, index }: { study: typeof CASE_STUDIES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Smooth spring physics for the tilt
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative flex flex-col md:flex-row gap-6 bg-white rounded-xl p-6 border border-black/5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] transition-shadow duration-500 cursor-pointer"
    >
      {/* Soft gradient sheen on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-transparent via-transparent to-black/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Video Container with Parallax Lift */}
      <motion.div 
        style={{ transform: "translateZ(30px)" }}
        className="w-full md:w-1/2 h-64 rounded-lg overflow-hidden bg-[#1C1C1C] relative"
      >
        <video
          src={study.video}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Animated Laser Scanner */}
        <motion.div 
          className="absolute left-0 right-0 h-[2px] shadow-[0_0_12px_currentColor] opacity-0 group-hover:opacity-100 pointer-events-none z-20"
          style={{ backgroundColor: study.color, color: study.color }}
          animate={{ y: [0, 256, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Content Container */}
      <motion.div 
        style={{ transform: "translateZ(40px)" }}
        className="w-full md:w-1/2 flex flex-col justify-center"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: study.color }} />
          <span className="text-[10px] font-mono text-black/40 uppercase tracking-widest">{study.tag} · {study.year}</span>
        </div>
        
        <h3 className="text-4xl font-meow font-bold text-[#1C1C1C] mb-4 group-hover:text-black transition-colors">
          {study.title}
        </h3>
        
        <p className="text-sm font-mono text-black/60 leading-relaxed mb-8">
          {study.desc}
        </p>

        {/* Dynamic Metrics */}
        <div className="grid grid-cols-2 gap-4 mt-auto border-t border-dashed border-black/10 pt-4">
          {study.metrics.map((metric, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-xl font-bold text-[#1C1C1C]">{metric.value}</span>
              <span className="text-[10px] font-mono text-black/40 uppercase">{metric.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

const CaseStudies = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.main 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#fafafa] overflow-hidden"
    >
      {/* Background Dot Pattern */}
      <div className="fixed inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_1px_1px,#1C1C1C_1px,transparent_0)] bg-[length:24px_24px] pointer-events-none" />

      <section className="relative max-w-6xl mx-auto px-6 py-32 z-10">
        
        {/* Header Setup */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 border-b border-black/10 pb-8">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-[11px] font-mono text-black/40 hover:text-[#5D00FF] transition-colors mb-8 uppercase tracking-widest">
              <span>←</span> back to main
            </Link>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-7xl md:text-8xl font-meow font-extrabold text-[#1C1C1C] leading-tight"
            >
              case <span className="text-[#5D00FF]">studies</span>
            </motion.h1>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-sm font-mono text-black/60 max-w-xs mt-6 md:mt-0 md:text-right"
          >
            deep dives into the logic, design, and builds behind our favorite shipped products.
          </motion.p>
        </div>

        {/* Case Studies Stack */}
        <div className="flex flex-col gap-12 perspective-[2000px]">
          {CASE_STUDIES.map((study, index) => (
            <InteractiveCard key={study.id} study={study} index={index} />
          ))}
        </div>

      </section>
    </motion.main>
  );
};

export default CaseStudies;