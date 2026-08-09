import { motion } from "motion/react";

const PRINCIPLES = [
  {
    title: "no templates",
    body: "every layout is built for your brand from zero — nothing pulled from a component kit and reskinned.",
  },
  {
    title: "no account managers",
    body: "you talk to whoever's actually writing the code or making ur design, every time.",
  },
  {
    title: "no 40-slide decks",
    body: "we show you working builds, not mockups pretending to be progress.",
  },
  {
    title: "no ghosting",
    body: "updates are short and they show up. that's the whole policy.",
  },
];

const FACTS = [
  { key: "based", value: "Karachi, PK" },
  { key: "stack", value: "React · TypeScript · Tailwind · Node" },
  { key: "status", value: "actively shipping" },
  { key: "reply time", value: "< 24h, always" },
];

export default function About() {
  return (
    <section
      className="mx-13 border-x-2 border-b-2 border-black/10 py-20 px-10"
      id="about"
    >
      <div className="w-full relative grid md:grid-cols-2 gap-8 items-start border-2 border-black/10 p-8 rounded-[8px]">
        <div className="flex flex-col justify-center">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl font-meow font-extrabold text-[#1C1C1C] leading-tight"
          >
            not another <span className="text-[#5D00FF]">agency</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.12, duration: 0.5 }}
            className="mt-4 text-sm font-mono text-black/80 leading-relaxed max-w-md"
          >
            most agencies sell you a process. we skip straight to the build.
            here's how we actually work:
          </motion.p>

          <div className="mt-8 flex flex-col gap-6">
            {PRINCIPLES.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.09, duration: 0.4 }}
                className="flex gap-3"
              >
                <span className="text-[#CFFF04] font-mono text-sm mt-0.5 shrink-0 w-5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-mono text-sm font-bold text-[#1C1C1C]">
                    {p.title}
                  </p>
                  <p className="font-mono text-xs text-black/60 mt-0.5 leading-relaxed">
                    {p.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 32, rotate: 1.5 }}
          whileInView={{ opacity: 1, x: 0, rotate: 1.5 }}
          animate={{ y: [0, -8, 0] }} // Continuous soft floating
          whileHover={{ 
            scale: 1.03, 
            rotate: 0, 
            boxShadow: "0 30px 60px -15px rgba(0,0,0,0.15)", // Soft modern shadow
            y: -5
          }}
          whileTap={{ 
            scale: 0.98,
            boxShadow: "0 10px 20px -10px rgba(0,0,0,0.1)"
          }}
          transition={{ 
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            default: { type: "spring", stiffness: 300, damping: 20 } 
          }}
          viewport={{ once: true, margin: "-80px" }}
          className="relative bg-white border border-black/5 rounded-md shadow-2xl shadow-black/5 p-8 font-mono cursor-pointer overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-[#5D00FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div
            className="absolute -top-[1px] left-0 right-0 h-2 bg-white"
            style={{
              maskImage:
                "repeating-linear-gradient(110deg, transparent 0 4px, black 4px 8px)",
              WebkitMaskImage:
                "repeating-linear-gradient(110deg, transparent 0 4px, black 4px 8px)",
            }}
          />

          <div className="flex items-center justify-between border-b border-dashed border-black/15 pb-3 mb-4 relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1C1C1C]">
              build receipt
            </span>
            <span className="text-[10px] text-black/40">no. 0048</span>
          </div>

          <div className="flex flex-col gap-2.5 relative z-10">
            {FACTS.map((f) => (
              <motion.div 
                key={f.key} 
                className="flex items-baseline justify-between text-xs group/row"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <span className="text-black/50 uppercase tracking-wide group-hover/row:text-[#5D00FF] transition-colors">
                  {f.key}
                </span>
                <span className="flex-1 border-b border-dotted border-black/20 mx-2 group-hover/row:border-[#5D00FF]/40 transition-colors" />
                <span className="text-[#1C1C1C] font-bold text-right">
                  {f.value}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="border-t border-dashed border-black/15 mt-5 pt-4 relative z-10">
            <p className="text-[11px] text-black/60 leading-relaxed">
              started because most agencies hand you the same five templates
              with your logo swapped in. we design from a blank canvas —
              slower to start, impossible to mistake for anyone else's site.
            </p>
          </div>

          <div className="mt-5 flex items-center justify-between relative z-10 group/scanner">
            <div className="relative flex gap-[2px] py-1 cursor-crosshair">
              <motion.div 
                className="absolute left-0 right-0 h-[2px] bg-[#CFFF04] shadow-[0_0_8px_#CFFF04] opacity-0 group-hover/scanner:opacity-100 pointer-events-none z-20"
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              {Array.from({ length: 24 }).map((_, i) => (
                <motion.span
                  key={i}
                  whileHover={{ scaleY: 1.4, backgroundColor: "#5D00FF" }}
                  className="bg-[#1C1C1C] origin-bottom transition-colors duration-200"
                  style={{ width: i % 3 === 0 ? 2 : 1, height: 20 }}
                />
              ))}
            </div>
            <span className="text-[9px] uppercase tracking-widest text-black/30">
              no returns
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}