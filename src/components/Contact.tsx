import React, {  useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, useMotionValue, useSpring } from "motion/react";

function MagneticSubmit({
  children,
  disabled,
}: {
  children: React.ReactNode;
  disabled?: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 15, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 220, damping: 15, mass: 0.35 });

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type="submit"
      disabled={disabled}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.97 }}
      className="group relative w-full overflow-hidden rounded-[7px] bg-[#1C1C1C] px-6 py-3 font-mono text-sm font-bold text-white disabled:opacity-40 disabled:pointer-events-none"
    >
      <span className="absolute inset-x-0 bottom-0 h-0 bg-[#CFFF04] transition-all duration-300 ease-out group-hover:h-full" />
      <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 group-hover:text-[#1C1C1C]">
        {children}
      </span>
    </motion.button>
  );
}

const CHANNELS = [
  { label: "email", value: "subhanali200823@gmail.com", href: "mailto:subhanali200823@gmail.com" },
  { label: "twitter", value: "subhanali070", href: "https://x.com/subhanali070" },
  { label: "github", value: "/subhanali", href: "https://github.com/subhanali07" },
];

const BUDGETS = ["< $1", "$1k – 5k", "$5k – 15k", "$15k+"];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [budget, setBudget] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSending(true);

  try {
    await emailjs.send(
      "service_58gxogh",
      "template_q47zgmb",
      {
        name: form.name,
        email: form.email,
        message: form.message,
        budget: budget || "Not specified",
      },
      {
        publicKey: "maekE75_R0ehdJ20-",
      }
    );

    setSubmitted(true);
  }  catch (error: any) {
  console.error("Email failed:", error);
  console.error("Status:", error?.status);
  console.error("Text:", error?.text);

  alert(`Failed to send message: ${error?.text || "Unknown error"}`);
} finally {
  setSending(false);
}
};

  return (
    <section
      className="mx-13 border-x-2 border-b-2 border-black/10 py-20 px-10"
      id="contact"
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
            let's <span className="text-[#FF2E91]">talk</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.12, duration: 0.5 }}
            className="mt-4 text-sm font-mono text-black/80 leading-relaxed max-w-md"
          >
            no forms that vanish into a black hole. tell us what you're
            building — we actually reply.
          </motion.p>

          <div className="mt-8 flex flex-col">
            {CHANNELS.map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                className="group grid grid-cols-[1.5rem_5.5rem_1fr] items-center gap-3 py-2.5 border-b border-black/[0.06] last:border-b-0"
              >
                <span className="text-[#1c1c1c] font-mono ">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[#5d00ff] font-mono uppercase  font-bold text-[12px] tracking-wider">
                  {c.label}
                </span>
                <span className="text-[#1C1C1C] font-mono  border-b border-transparent group-hover:border-[#1C1C1C] transition-colors duration-200 w-fit">
                  {c.value}
                </span>
              </motion.a>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden bg-[#1C1C1C] rounded-[8px] shadow-lg shadow-black/20 p-8"
        >
          <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[length:18px_18px] pointer-events-none" />

          <form onSubmit={handleSubmit} className="relative flex flex-col gap-5">
            {!submitted ? (
              <>
                <Field
                  label="name"
                  value={form.name}
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                  placeholder="your name"
                  delay={0.15}
                />
                <Field
                  label="email"
                  value={form.email}
                  onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                  placeholder="you@company.com"
                  type="email"
                  delay={0.22}
                />
                <Field
                  label="message"
                  value={form.message}
                  onChange={(v) => setForm((f) => ({ ...f, message: v }))}
                  placeholder="what are you building?"
                  textarea
                  delay={0.29}
                />

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                  className="flex flex-col gap-2 font-mono"
                >
                  <span className="text-[11px] uppercase tracking-wider text-white/35">
                    budget
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {BUDGETS.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBudget(b)}
                        className={`px-3 py-1.5 rounded-full text-xs border transition-colors duration-200 ${
                          budget === b
                            ? "bg-[#CFFF04] border-[#CFFF04] text-[#1C1C1C] font-bold"
                            : "border-white/15 text-white/50 hover:border-white/30 hover:text-white/80"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  <MagneticSubmit disabled={sending}>
                    {sending ? "sending..." : "send message"}
                    {!sending && <span>→</span>}
                  </MagneticSubmit>
                </motion.div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="py-8 flex flex-col items-center text-center gap-2"
              >
                <span className="text-4xl font-meow font-extrabold text-white">
                  sent<span className="text-[#CFFF04]">.</span>
                </span>
                <span className="text-white/40 text-xs font-mono">
                  we'll reply within 24h — the launchit team
                </span>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  textarea = false,
  delay = 0,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  textarea?: boolean;
  delay?: number;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <motion.label
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className="flex flex-col gap-1.5 font-mono"
    >
      <span
        className="text-[11px] uppercase tracking-wider transition-colors duration-200"
        style={{ color: focused ? "#CFFF04" : "rgba(255,255,255,0.35)" }}
      >
        {label}
      </span>
      {textarea ? (
        <textarea
          required
          rows={3}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="bg-transparent border-b border-white/15 focus:border-[#CFFF04] outline-none text-white text-sm py-1.5 resize-none placeholder:text-white/20 transition-colors duration-200"
        />
      ) : (
        <input
          required
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="bg-transparent border-b border-white/15 focus:border-[#CFFF04] outline-none text-white text-sm py-1.5 placeholder:text-white/20 transition-colors duration-200"
        />
      )}
    </motion.label>
  );
}