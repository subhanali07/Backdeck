import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Marquee } from "./ui/marquee";

const reviews = [
  {
    name: "Ayesha K.",
    username: "@ayeshak",
    body: "Turned our homepage around in 6 days flat. No decks, no fluff, just shipped.",
    color: "#CFFF04",
  },
  {
    name: "Marcus T.",
    username: "@marcust",
    body: "Finally an agency that gets AI startups. Understood our positioning faster than we did.",
    color: "#FF2E91",
  },
  {
    name: "Priya N.",
    username: "@priyan",
    body: "Demo signups doubled the first week after launch. Worth every rupee.",
    color: "#5D00FF",
  },
  {
    name: "Elias W.",
    username: "@eliasw",
    body: "Fast, opinionated, pushed back when our idea was bad. Exactly what we needed.",
    color: "#CFFF04",
  },
  {
    name: "Sana R.",
    username: "@sanar",
    body: "Communicated like engineers, not account managers. Refreshing.",
    color: "#FF2E91",
  },
  {
    name: "Daniel O.",
    username: "@danielo",
    body: "Handed off a messy Figma file, got back a production build a week later.",
    color: "#5D00FF",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  name,
  username,
  body,
  color,
}: {
  name: string;
  username: string;
  body: string;
  color: string;
}) => {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-[8px] border p-4 font-mono transition-all duration-200",
        "border-black/10 bg-white hover:bg-black/[0.02] hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/5"
      )}
    >
      <div className="flex flex-row items-center gap-2.5">
        <div
          className="flex items-center justify-center size-8 rounded-full text-[11px] font-bold text-[#1C1C1C] shrink-0"
          style={{ backgroundColor: color }}
        >
          {initials}
        </div>
        <div className="flex flex-col">
          <figcaption className="text-xs font-bold text-[#1C1C1C]">
            {name}
          </figcaption>
          <p className="text-[11px] text-black/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-3 text-xs text-black/70 leading-relaxed">
        {body}
      </blockquote>
    </figure>
  );
};

const services = [
  "Custom Websites",
  "Backend & API architecture",
  "Product Redesign",
  "Ongoing support & iteration",
];

const Services = () => {
  return (
    <section
      className="mx-13 border-2 border-black/10 py-20 px-10 overflow-hidden"
      id="services"
    >
      <div className="w-full relative grid md:grid-cols-2 gap-8 items-start border-2 border-black/10 p-8 rounded-[8px]">
        <div className="flex relative flex-col justify-center">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl font-meow font-extrabold text-[#1C1C1C] leading-tight"
          >
            our <span className="text-[#4d03cf]">services</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.12, duration: 0.5 }}
            className="mt-4 text-sm font-mono text-black/80 leading-relaxed max-w-md"
          >
            we don't do decks and delays. every engagement ships something real
            — fast, and built to your brand, not a template.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative flex w-full flex-col items-center justify-center overflow-hidden mt-8"
          >
            <Marquee pauseOnHover className="[--duration:20s]">
              {firstRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s] mt-4">
              {secondRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white to-transparent" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden bg-[#1C1C1C] rounded-[8px] shadow-lg shadow-black/20"
        >
          <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[length:18px_18px] pointer-events-none" />

          <div className="relative flex items-center gap-2 px-4 py-3 border-b border-white/10">
            {["#FF2E91", "#CFFF04", "#5D00FF"].map((c, i) => (
              <motion.span
                key={c}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.1, type: "spring", stiffness: 400 }}
                className="size-2.5 rounded-full"
                style={{ backgroundColor: c }}
              />
            ))}
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="ml-2 text-[11px] tracking-wide text-white/40 font-mono"
            >
              launchit — scope.json
            </motion.span>
          </div>

          <div className="relative p-10">
            <motion.h3
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="text-white font-meow text-3xl font-bold mb-8"
            >
              what's <span className="text-[#CFFF04]">included</span>?
            </motion.h3>

            <ul className="space-y-5">
              {services.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.65 + i * 0.1, duration: 0.4, ease: "easeOut" }}
                  className="flex items-start gap-3"
                >
                  <motion.span
                    initial={{ color: "rgba(255,255,255,0.3)" }}
                    whileInView={{ color: "#CFFF04" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.75 + i * 0.1, duration: 0.3 }}
                    className="font-mono text-sm mt-0.5 shrink-0 w-5"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </motion.span>
                  <span className="text-white/85 text-sm font-mono leading-relaxed">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.1, duration: 0.4 }}
              className="mt-8 pt-5 border-t border-white/10 flex items-center gap-2"
            >
              <span className="size-1.5 rounded-full bg-[#CFFF04] animate-pulse" />
              <span className="text-[11px] font-mono text-white/40">
                scoped per project — nothing generic
              </span>
            </motion.div>

            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 0.4 }}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              className="group relative mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-[7px] border border-[#CFFF04]/30 px-6 py-3 font-mono text-sm font-bold text-white transition-colors duration-300 hover:text-[#1C1C1C] hover:cursor-pointer"
            >
              <span className="absolute inset-x-0 bottom-0 h-0 bg-[#CFFF04] transition-all duration-300 ease-out group-hover:h-full" />
              <span className="relative z-10">let's discuss</span>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;