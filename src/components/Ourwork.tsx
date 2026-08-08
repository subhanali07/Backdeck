import React, { useRef } from "react";
import aleeza from "../assets/aleeza.mp4";
import danibhai from "../assets/danibhoi.mp4";
import subhan from "../assets/subhan.mp4";
import naqsh from "../assets/resume-builder.mp4";
import paperbags from "../assets/paperbags.mp4";
import {
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";

function ProjectMedia({
  title,
  video,
}: {
  title: string;
  video: { src: string };
}) {
  return (
    <div className="flex h-56 w-full items-center justify-center overflow-hidden bg-black sm:h-64">
      <video
        src={video.src}
        aria-label={title}
        className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
    </div>
  );
}

function MagneticArrow() {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 16, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 250, damping: 16, mass: 0.3 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div onMouseMove={handleMove} onMouseLeave={reset} className="p-2 -m-2">
      <motion.span
        ref={ref}
        style={{ x: sx, y: sy }}
        className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 group-hover:bg-[#CFFF04] group-hover:text-black group-hover:border-[#CFFF04] group-hover:rotate-45"
      >
        <ArrowUpRight size={16} />
      </motion.span>
    </div>
  );
}

const VIDEOS: Record<string, { src: string }> = {
  subhanportfolio: { src: subhan },
  aleezaportfolio: { src: aleeza },
  daniyalportfolio: { src: danibhai },
  ecommercesite: { src: paperbags },
  naqshresume: { src: naqsh },
};

const PROJECTS = [
  { key: "subhanportfolio", title: "Subhan — Portfolio", tag: "Personal site", year: "2026" },
  { key: "aleezaportfolio", title: "Aleeza — Portfolio", tag: "Personal site", year: "2026" },
  { key: "daniyalportfolio", title: "Daniyal — Portfolio", tag: "Personal site", year: "2026" },
  { key: "ecommercesite", title: "Paperbags — Ecommerce", tag: "Product store", year: "2026" },
  { key: "naqshresume", title: "Naqsh — Resume Builder", tag: "Web app", year: "2026" },
];

const Ourwork = () => {
  return (
    <section
      className="mx-13 border-x-2 border-b-2 border-black/10 py-20 px-10 overflow-hidden"
      id="work"
    >
      <div className="flex items-end justify-between border-b-2 border-black/10 pb-8 mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-8xl font-meow font-extrabold text-[#1C1C1C] leading-tight"
        >
          our <span className="text-[#ff2e91]">work</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="hidden sm:block text-sm font-mono text-black/60 max-w-xs text-right"
        >
          a few things we've shipped recently — real builds, real clients.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {PROJECTS.map((project, i) => (
          <motion.a
            key={project.key}
            href="#"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.99 }}
            className="group relative block overflow-hidden rounded-[9px] border-2 border-black/10 bg-[#1C1C1C] transition-[border-color,box-shadow] duration-300 hover:border-[#CFFF04]/40 hover:shadow-2xl hover:shadow-black/20"
          >
            <div className="relative">
              <ProjectMedia title={project.title} video={VIDEOS[project.key]} />

              <motion.span
                initial={{ opacity: 0, x: -6 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="pointer-events-none absolute top-3 left-3 font-mono text-[11px] text-white/0 group-hover:text-[#CFFF04]/80 transition-all duration-300"
              >
                {String(i + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
              </motion.span>

              <span className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-sm px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#CFFF04] opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-[#CFFF04]" />
                </span>
                <span className="text-[9px] font-mono text-white/70 tracking-wide">
                  live
                </span>
              </span>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="flex items-center justify-between border-t-2 border-white/10 bg-[#1C1C1C] px-5 py-4">
              <div className="overflow-hidden">
                <motion.h3
                  initial={{ y: 0 }}
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="text-white font-meow font-bold text-base leading-tight"
                >
                  {project.title}
                </motion.h3>
                <p className="text-white/40 font-mono text-[11px] mt-1 uppercase tracking-wider">
                  {project.tag} · {project.year}
                </p>
              </div>

              <MagneticArrow />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default Ourwork;