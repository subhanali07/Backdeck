import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useMotionValue,
  useSpring,
} from "motion/react";
import launchit from "../assets/launchit-logo.svg";

const LINKS = [
  { label: "work", href: "#work" },
  { label: "services", href: "#services" },
  { label: "contact", href: "#contact" },
];

/* ---------- terminal-bracket nav link ---------- */
function BracketLink({
  label,
  href,
  active,
  containerHover,
  onClick,
}: {
  label: string;
  href: string;
  active: boolean;
  containerHover: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const [hover, setHover] = useState(false);
  const lit = hover || active;

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative px-1 py-1.5 font-mono text-sm flex items-center hover:cursor-pointer"
    >
      <motion.span
        animate={{ x: lit ? 0 : 6, opacity: lit ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="text-[#CFFF04] mr-0.5"
      >
        [
      </motion.span>
      <span
        className={`transition-colors duration-200 ${
          lit
            ? "text-[#CFFF04]"
            : containerHover
            ? "text-white/50"
            : "text-[#1C1C1C]/60"
        }`}
      >
        /{label}
      </span>
      <motion.span
        animate={{ x: lit ? 0 : -6, opacity: lit ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="text-[#CFFF04] ml-0.5"
      >
        ]
      </motion.span>
    </a>
  );
}

/* ---------- magnetic terminal-style CTA ---------- */
function MagneticCTA({
  children,
  onClick,
  href,
}: {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  href: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 14, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 14, mass: 0.4 });

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.6);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className="relative ml-4 pl-4 pr-5 py-1.5 rounded-[6px] font-mono text-sm font-bold text-[#1C1C1C] bg-[#CFFF04] overflow-hidden group shrink-0 flex items-center gap-2"
    >
      <span className="relative z-10 flex items-center gap-1.5">
        {children}
        <span className="inline-block w-[2px] h-[13px] bg-[#1C1C1C] lit-caret" />
      </span>
    </motion.a>
  );
}

/* ---------- command palette ---------- */
const COMMANDS = [
  { label: "work", desc: "see what we've shipped", href: "#work" },
  { label: "services", desc: "what we actually do", href: "#services" },
  { label: "contact", desc: "let's talk", href: "#contact" },
  { label: "home", desc: "back to the top", href: "#home" },
];

function CommandPalette({
  open,
  onClose,
  onNavigate,
}: {
  open: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = COMMANDS.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (open) {
      setQuery("");
      setIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => setIndex(0), [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") return onClose();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, filtered.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    }
    if (e.key === "Enter" && filtered[index]) {
      onNavigate(filtered[index].href);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-[18vh] px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#1C1C1C] rounded-[10px] border border-[#CFFF04]/20 shadow-2xl shadow-black/50 overflow-hidden font-mono"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
              <span className="text-[#CFFF04] text-sm">/</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="jump to..."
                className="flex-1 bg-transparent outline-none text-white text-sm placeholder:text-white/30"
              />
              <span className="text-[10px] text-white/25 border border-white/10 rounded px-1.5 py-0.5">
                esc
              </span>
            </div>

            <div className="max-h-64 overflow-y-auto py-1.5">
              {filtered.length === 0 && (
                <div className="px-4 py-6 text-center text-white/30 text-xs">
                  no route found for "{query}"
                </div>
              )}
              {filtered.map((cmd, i) => (
                <button
                  key={cmd.href}
                  onClick={() => {
                    onNavigate(cmd.href);
                    onClose();
                  }}
                  onMouseEnter={() => setIndex(i)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors duration-100 ${
                    i === index ? "bg-[#CFFF04]/10" : ""
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`text-sm ${
                        i === index ? "text-[#CFFF04]" : "text-white/80"
                      }`}
                    >
                      /{cmd.label}
                    </span>
                    <span className="text-white/30 text-xs">{cmd.desc}</span>
                  </span>
                  {i === index && (
                    <span className="text-[#CFFF04] text-xs">↵</span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const Navbar = () => {
  const [containerHover, setContainerHover] = useState(false);
  const [active, setActive] = useState<string>("#home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [sweepKey, setSweepKey] = useState(0);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 24));

  useEffect(() => {
    const sections = ["#home", "#services", "#work", "#contact"]
      .map((id) => document.querySelector(id))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || paletteOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, paletteOpen]);

  // global "/" shortcut to open the command palette
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;
      if (e.key === "/" && !isTyping) {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    scrollTo(href);
  };

  return (
    <>
      <style>{`
        @keyframes lit-blink {
          0%, 45% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .lit-caret { animation: lit-blink 1s steps(1) infinite; }
        @keyframes lit-sweep {
          0% { transform: translateX(-100%); opacity: 0.6; }
          100% { transform: translateX(220%); opacity: 0; }
        }
        .lit-sweep-line { animation: lit-sweep 700ms ease-out forwards; }
      `}</style>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onNavigate={scrollTo}
      />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 z-50 w-full px-13 py-5"
      >
        <motion.div
          animate={{ paddingTop: scrolled ? 6 : 4, paddingBottom: scrolled ? 6 : 4 }}
          transition={{ duration: 0.3 }}
          className={`flex items-center justify-between transition-shadow duration-300 ${
            scrolled ? "drop-shadow-[0_4px_20px_rgba(0,0,0,0.08)]" : ""
          }`}
        >
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="group relative bg-[#e7e7e7] p-1 rounded-[8px] shrink-0"
            whileHover="hover"
          >
            <div className="flex items-center gap-2 bg-white rounded-[7px] pl-2 pr-3 py-1 transition-colors duration-200 group-hover:bg-[#dddada]">
              <motion.img
                src={launchit}
                className="w-auto h-9 rounded-[6px]"
                variants={{ hover: { rotate: -6, scale: 1.04 } }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              />
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#CFFF04] opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-[#CFFF04]" />
              </span>
            </div>
          </motion.a>

          {/* Desktop nav */}
          <motion.div
            onMouseEnter={() => {
              setContainerHover(true);
              setSweepKey((k) => k + 1);
            }}
            onMouseLeave={() => setContainerHover(false)}
            animate={{ backgroundColor: containerHover ? "#1C1C1C" : "#e7e7e7" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="hidden sm:flex items-center px-4 py-1.5 rounded-[8px] relative overflow-hidden gap-1"
          >
            {containerHover && (
              <span
                key={sweepKey}
                className="lit-sweep-line pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[#CFFF04]/25 to-transparent"
              />
            )}

            {containerHover && (
              <span className="font-mono text-[10px] text-white/30 mr-1 select-none">
                $
              </span>
            )}

            {LINKS.map((link) => (
              <BracketLink
                key={link.href}
                label={link.label}
                href={link.href}
                active={active === link.href}
                containerHover={containerHover}
                onClick={(e) => handleNavClick(e, link.href)}
              />
            ))}

            {/* command palette trigger — the GOAT touch */}
            <button
              onClick={() => setPaletteOpen(true)}
              className={`ml-1 flex items-center gap-1.5 px-2.5 py-1 rounded-[5px] border font-mono text-[11px] transition-colors duration-200 ${
                containerHover
                  ? "border-white/15 text-white/40 hover:text-[#CFFF04] hover:border-[#CFFF04]/40"
                  : "border-black/10 text-black/30"
              }`}
              title="Press / to search"
            >
              <span>press</span>
              <span
                className={`px-1.5 rounded ${
                  containerHover ? "bg-white/10" : "bg-black/5"
                }`}
              >
                /
              </span>
            </button>

            <MagneticCTA href="#contact" onClick={(e) => handleNavClick(e, "#contact")}>
              let's talk
            </MagneticCTA>
          </motion.div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="sm:hidden flex flex-col items-center justify-center gap-[5px] bg-[#e7e7e7] size-11 rounded-[8px] shrink-0"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[2px] bg-[#1C1C1C] rounded-full"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-[2px] bg-[#1C1C1C] rounded-full"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[2px] bg-[#1C1C1C] rounded-full"
            />
          </button>
        </motion.div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#1C1C1C] sm:hidden flex flex-col items-center justify-center gap-2"
          >
            {LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i, duration: 0.4 }}
                className="font-mono text-3xl text-white/90 hover:text-[#CFFF04] transition-colors duration-200 py-3"
              >
                <span className="text-[#CFFF04]/70 mr-2">/</span>
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * LINKS.length, duration: 0.4 }}
              className="mt-6 px-8 py-3 rounded-full bg-[#CFFF04] text-[#1C1C1C] font-mono font-bold text-sm"
            >
              let's talk →
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;