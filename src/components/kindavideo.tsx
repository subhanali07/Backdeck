import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, AnimatePresence } from "motion/react";


const COLORS = {
  graphite: "#1C1C1C",
  white: "#FFFFFF",
  indigo: "#5D00FF",
  pink: "#FF2E91",
  lime: "#CFFF04",
} as const;

type Phase = "terminal" | "pipeline" | "shipped" | "live";

const PHASES: Phase[] = ["terminal", "pipeline", "shipped", "live"];
const PHASE_DURATIONS: Record<Phase, number> = {
  terminal: 5200,
  pipeline: 3400,
  shipped: 2200,
  live: 5600,
};

interface SceneProps {
  active: boolean;
}

interface ScriptLine {
  text: string;
  color: string;
}

const SCRIPT: ScriptLine[] = [
  { text: "$ git push origin main", color: "#e5e5e5" },
  { text: "✓ compiled in 1.42s", color: COLORS.lime },
  { text: "✓ 48/48 tests passed", color: COLORS.lime },
  { text: "● deploying to production", color: COLORS.pink },
];

function TerminalScene({ active }: SceneProps) {
  const [lines, setLines] = useState<ScriptLine[]>([]);
  const [current, setCurrent] = useState("");

  useEffect(() => {
    if (!active) {
      setLines([]);
      setCurrent("");
      return;
    }
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    async function typeLine(entry: ScriptLine): Promise<void> {
      return new Promise((resolve) => {
        let i = 0;
        function step() {
          if (cancelled) return resolve();
          i++;
          setCurrent(entry.text.slice(0, i));
          if (i < entry.text.length) timeouts.push(setTimeout(step, 22));
          else timeouts.push(setTimeout(resolve, 260));
        }
        step();
      });
    }

    async function run() {
      for (const entry of SCRIPT) {
        await typeLine(entry);
        if (cancelled) return;
        setLines((prev) => [...prev, entry]);
        setCurrent("");
      }
    }
    run();
    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [active]);

  return (
    <div className="px-5 py-4 font-mono text-[13px] leading-6 h-full">
      {lines.map((l, i) => (
        <div key={i} style={{ color: l.color }}>
          {l.text}
        </div>
      ))}
      {current && (
        <div style={{ color: SCRIPT[lines.length]?.color }}>
          {current}
          <span className="inline-block w-[7px] h-[14px] bg-[#CFFF04] ml-[2px] align-middle animate-pulse" />
        </div>
      )}
    </div>
  );
}

const NODES = ["build", "test", "deploy", "live"] as const;

function PipelineScene({ active }: SceneProps) {
  const [lit, setLit] = useState(0);

  useEffect(() => {
    if (!active) {
      setLit(0);
      return;
    }
    const timeouts = NODES.map((_, i) =>
      setTimeout(() => setLit(i + 1), 400 + i * 650)
    );
    return () => timeouts.forEach(clearTimeout);
  }, [active]);

  return (
    <div className="flex items-center justify-center h-full px-8">
      <div className="flex items-center w-full max-w-[380px]">
        {NODES.map((label, i) => (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div
                className="size-9 rounded-full border-2 flex items-center justify-center transition-all duration-500"
                style={{
                  borderColor: i < lit ? COLORS.lime : "rgba(255,255,255,0.15)",
                  background: i < lit ? "rgba(207,255,4,0.12)" : "transparent",
                  boxShadow: i < lit ? `0 0 18px ${COLORS.lime}55` : "none",
                }}
              >
                {i < lit ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 12l5 5L20 6"
                      stroke={COLORS.lime}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <span className="size-1.5 rounded-full bg-white/25" />
                )}
              </div>
              <span
                className="text-[10px] font-mono uppercase tracking-wider transition-colors duration-500"
                style={{ color: i < lit ? COLORS.white : "rgba(255,255,255,0.3)" }}
              >
                {label}
              </span>
            </div>
            {i < NODES.length - 1 && (
              <div className="flex-1 h-[2px] mx-1 -mt-4 relative overflow-hidden bg-white/10">
                <div
                  className="absolute inset-y-0 left-0 transition-all duration-700 ease-out"
                  style={{
                    width: i < lit ? "100%" : "0%",
                    background: COLORS.lime,
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

interface BurstPiece {
  id: number;
  angle: number;
  dist: number;
  size: number;
  color: string;
  delay: number;
}

function ShippedScene({ active }: SceneProps) {
  const pieces = useRef<BurstPiece[]>(
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      angle: (360 / 18) * i + Math.random() * 12,
      dist: 90 + Math.random() * 70,
      size: 4 + Math.random() * 5,
      color: [COLORS.lime, COLORS.pink, COLORS.indigo, COLORS.white][i % 4],
      delay: Math.random() * 120,
    }))
  ).current;

  return (
    <div className="relative flex items-center justify-center h-full overflow-hidden">
      {active &&
        pieces.map((p) => {
          const rad = (p.angle * Math.PI) / 180;
          const x = Math.cos(rad) * p.dist;
          const y = Math.sin(rad) * p.dist;
          const burstStyle: CSSProperties & Record<"--tx" | "--ty", string> = {
            width: p.size,
            height: p.size,
            background: p.color,
            animationDelay: `${p.delay}ms`,
            "--tx": `${x}px`,
            "--ty": `${y}px`,
          };
          return (
            <span key={p.id} className="absolute rounded-[2px] lit-burst" style={burstStyle} />
          );
        })}
      <div className="relative flex flex-col items-center gap-1 lit-stamp">
        <span
          className="text-[34px] font-black tracking-tight"
          style={{ color: COLORS.white, fontFamily: "Arial Black, sans-serif" }}
        >
          shipped<span style={{ color: COLORS.lime }}>.</span>
        </span>
        <span className="text-[11px] font-mono text-white/40 tracking-widest uppercase">
          build #48 · 8.2s
        </span>
      </div>
    </div>
  );
}

function useCountUp(target: number, active: boolean, duration = 1200): number {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) {
      setVal(0);
      return;
    }
    let start: number | undefined;
    let raf: number;
    function step(ts: number) {
      if (start === undefined) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(progress * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return val;
}

function LiveScene({ active }: SceneProps) {
  const [clicked, setClicked] = useState(false);
  const deploys = useCountUp(128, active);
  const uptime = useCountUp(999, active);
  const speed = useCountUp(82, active);

  useEffect(() => {
    if (!active) {
      setClicked(false);
      return;
    }
    const t = setTimeout(() => setClicked(true), 1600);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10 bg-white/[0.02]">
        <span className="size-2 rounded-full bg-white/20" />
        <span className="size-2 rounded-full bg-white/20" />
        <span className="size-2 rounded-full bg-white/20" />
        <div className="ml-2 flex-1 h-5 rounded-full bg-white/[0.04] flex items-center px-3">
          <span className="text-[10px] font-mono text-white/30">launchit.xyz</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6 relative">
        <div
          className="absolute transition-all duration-[1400ms] ease-out pointer-events-none"
          style={{
            left: clicked ? "58%" : "20%",
            top: clicked ? "62%" : "30%",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M1 1l5.5 13 2-5.5L14 6.5z"
              fill={COLORS.white}
              stroke={COLORS.graphite}
              strokeWidth="1"
            />
          </svg>
          {clicked && (
            <span
              className="absolute -inset-3 rounded-full border-2 lit-ripple"
              style={{ borderColor: COLORS.lime }}
            />
          )}
        </div>

        <div className="flex gap-8">
          <Stat label="deploys" value={deploys} suffix="" color={COLORS.lime} />
          <Stat label="uptime" value={(uptime / 10).toFixed(1)} suffix="%" color={COLORS.pink} />
          <Stat label="avg ship" value={speed / 10} suffix="s" color="#9b7bff" />
        </div>
      </div>
    </div>
  );
}

interface StatProps {
  label: string;
  value: number | string;
  suffix: string;
  color: string;
}

function Stat({ label, value, suffix, color }: StatProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-2xl font-mono font-bold" style={{ color }}>
        {value}
        {suffix}
      </span>
      <span className="text-[9px] font-mono uppercase tracking-widest text-white/35">
        {label}
      </span>
    </div>
  );
}

export default function LaunchSequence() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const phase = PHASES[phaseIndex];

  useEffect(() => {
    const t = setTimeout(() => {
      setPhaseIndex((i) => (i + 1) % PHASES.length);
    }, PHASE_DURATIONS[phase]);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <div className="relative w-full h-full min-h-[420px] rounded-[9px] overflow-hidden bg-[#1C1C1C] flex flex-col">
      <style>{`
        @keyframes lit-burst-move {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0.3); opacity: 0; }
        }
        .lit-burst {
          top: 50%; left: 50%;
          animation: lit-burst-move 900ms cubic-bezier(0.2,0.8,0.3,1) forwards;
        }
        @keyframes lit-stamp-in {
          0% { transform: scale(0.6); opacity: 0; }
          60% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .lit-stamp { animation: lit-stamp-in 500ms cubic-bezier(0.2,0.8,0.3,1) forwards; }
        @keyframes lit-ripple-out {
          0% { transform: scale(0.4); opacity: 0.9; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .lit-ripple { animation: lit-ripple-out 700ms ease-out forwards; }
      `}</style>

      <div
        className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-20 blur-3xl transition-colors duration-1000"
        style={{
          background:
            phase === "shipped" ? COLORS.pink : phase === "live" ? COLORS.indigo : COLORS.lime,
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-10 blur-3xl"
        style={{ background: COLORS.pink }}
      />

      <div className="relative flex items-center gap-2 px-4 py-3 border-b border-white/10 z-10">
        <span className="size-2.5 rounded-full" style={{ background: COLORS.pink }} />
        <span className="size-2.5 rounded-full" style={{ background: COLORS.lime }} />
        <span className="size-2.5 rounded-full" style={{ background: COLORS.indigo }} />
        <span className="ml-3 text-[11px] tracking-wide text-white/40 font-mono capitalize">
          launchit — {phase}
        </span>
      </div>

      <div className="relative flex-1 z-10 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {phase === "terminal" && <TerminalScene active />}
            {phase === "pipeline" && <PipelineScene active />}
            {phase === "shipped" && <ShippedScene active />}
            {phase === "live" && <LiveScene active />}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative flex items-center justify-center gap-1.5 py-3 border-t border-white/10 z-10">
        {PHASES.map((p, i) => (
          <motion.button
            key={p}
            onClick={() => setPhaseIndex(i)}
            animate={{
              width: i === phaseIndex ? 18 : 6,
              backgroundColor: i === phaseIndex ? COLORS.lime : "rgba(255,255,255,0.15)",
            }}
            transition={{ duration: 0.3 }}
            className="h-1.5 rounded-full"
            aria-label={`Show ${p} scene`}
          />
        ))}
      </div>
    </div>
  );
}