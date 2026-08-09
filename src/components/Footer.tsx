import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import {  Mail, ArrowUp } from "lucide-react";
import { FaGithub, FaTwitter } from "react-icons/fa";


const COLORS = {
  graphite: "#1C1C1C",
  indigo: "#5D00FF",
  pink: "#FF2E91",
  lime: "#CFFF04",
};

function Magnetic({
  children,
  strength = 0.3,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 16, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 250, damping: 16, mass: 0.3 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function BackToTopBadge() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const label = "SCROLL TO TOP • SCROLL TO TOP • ";
  const chars = label.split("");

  return (
    <Magnetic strength={0.35}>
      <button
        onClick={scrollTop}
        aria-label="Back to top"
        className="group relative flex size-24 items-center justify-center"
      >
        <motion.svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <defs>
            <path
              id="circlePath"
              d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
            />
          </defs>
          <text
            fontSize="8.2"
            fontFamily="monospace"
            fontWeight="700"
            letterSpacing="1.5"
            fill={COLORS.lime}
          >
            <textPath href="#circlePath">{chars.join("")}</textPath>
          </text>
        </motion.svg>

        <span className="relative flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] transition-colors duration-300 group-hover:bg-[#CFFF04] group-hover:border-[#CFFF04]">
          <ArrowUp
            size={16}
            className="text-white/70 transition-colors duration-300 group-hover:text-[#1C1C1C]"
          />
        </span>
      </button>
    </Magnetic>
  );
}

const NAV_LINKS = [
  { label: "work", href: "#work" },
  { label: "services", href: "#services" },
  { label: "about", href: "#about" },
  { label: "contact", href: "#contact" },
];

const SOCIALS = [
  { icon: Mail, href: "mailto:hello@launchit.dev", label: "email" },
  { icon: FaTwitter, href: "https://twitter.com", label: "twitter" },
  { icon: FaGithub, href: "https://github.com", label: "github" },
];

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const glowX = useSpring(mx, { stiffness: 120, damping: 20 });
  const glowY = useSpring(my, { stiffness: 120, damping: 20 });

  // subtle tilt on the massive headline, driven by the same pointer
  const tiltX = useTransform(my, [-200, 200], [4, -4]);
  const tiltY = useTransform(mx, [-200, 200], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <footer
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative mx-13 mb-10 overflow-hidden rounded-[9px] border border-white/10 bg-[#1C1C1C] px-10 pt-16 pb-8"
    >
      <motion.div
        className="pointer-events-none absolute h-[420px] w-[420px] rounded-full blur-[100px]"
        style={{
          left: glowX,
          top: glowY,
          x: "-50%",
          y: "-50%",
          background: `radial-gradient(circle, ${COLORS.indigo}33 0%, transparent 70%)`,
          opacity: hover ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />

      <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[length:22px_22px]" />

      <div className="relative z-10 flex flex-wrap items-start justify-between gap-10 pb-14 border-b border-white/10">
        <div className="flex flex-col gap-3">
          <span className="font-mono text-[11px] uppercase tracking-widest text-white/30">
            navigate
          </span>
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <Magnetic key={link.href} strength={0.15}>
                <a
                  href={link.href}
                  className="font-mono text-sm text-white/60 hover:text-[#CFFF04] transition-colors duration-200"
                >
                  /{link.label}
                </a>
              </Magnetic>
            ))}
            <Magnetic strength={0.15}>
              <Link
                to="/case-studies"
                className="font-mono text-sm text-white/60 hover:text-[#CFFF04] transition-colors duration-200"
              >
                /case-studies
              </Link>
            </Magnetic>
          </nav>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-mono text-[11px] uppercase tracking-widest text-white/30">
            connect
          </span>
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <Magnetic key={label} strength={0.4}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors duration-300 hover:border-[#CFFF04] hover:text-[#CFFF04]"
                >
                  <Icon size={15} />
                </a>
              </Magnetic>
            ))}
          </div>
        </div>

        

        <BackToTopBadge />
      </div>

      <div className="relative z-10 py-14 flex justify-center overflow-hidden">
        <motion.h2
          style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 800 }}
          className="select-none font-meow font-extrabold text-white leading-none text-center"
        >
          <span className="block text-[16vw] sm:text-[12vw] tracking-tight">
            launchit
            <span className="text-[#CFFF04]">.</span>
          </span>
        </motion.h2>
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-white/10 font-mono text-[10px] uppercase tracking-widest text-white/30">
        <span>© 2026 Launchit — all rights reserved</span>
        <span className="flex items-center gap-1.5">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#CFFF04] opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-[#CFFF04]" />
          </span>
          currently shipping
        </span>
      </div>
    </footer>
  );
}