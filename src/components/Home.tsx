import React from "react";
import { motion } from "motion/react";
import launchit from "../assets/launchit-logo.svg";
import LaunchSequence from "./kindavideo";

const headline = [
  "Your",
  "competitors",
  "are",
  "still",
  "sketching.",
  "We",
  "already",
];

export default function Home() {
  return (
    <>
      <div className="border-t-2 border-black/10 mt-20"></div>

      <section
        className="mx-13 border-x-2 h-screen border-black/10 relative overflow-hidden"
        id="home"
      >
        {/* faint dot texture — ties into the terminal cards elsewhere */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_1px_1px,#1C1C1C_1px,transparent_0)] bg-[length:22px_22px]" />

        <div className="relative flex p-7 border-b-2 border-black/10">
          <div className="justify-start max-w-xl">
            {/* logo */}
            <motion.img
              src={launchit}
              className="rounded-2xl"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            />

            {/* terminal status badge */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-3 py-1"
            >
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#CFFF04] opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-[#CFFF04]" />
              </span>
              <span className="font-mono text-[11px] text-black/50">
                currently shipping for 3 clients
              </span>
            </motion.div>

            {/* headline — staggered word reveal */}
            <h1 className="text-5xl mt-4 font-meow font-extrabold leading-tight">
              {headline.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.05, duration: 0.4, ease: "easeOut" }}
                  className="inline-block mr-[0.28em]"
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + headline.length * 0.05, duration: 0.4 }}
                className="relative inline-block text-[#FF2E91]/80"
              >
                shipped
                <motion.svg
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                  className="absolute left-0 -bottom-1 w-full h-3"
                >
                  <motion.path
                    d="M2 8 C 25 2, 75 2, 98 8"
                    stroke="#CFFF04"
                    strokeWidth="5"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.9, duration: 0.5, ease: "easeInOut" }}
                  />
                </motion.svg>
              </motion.span>{" "}
              products.
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="font-mono m-2 mt-4 text-sm text-black/70 leading-relaxed"
            >
              we've been on deadline(always). and we have always delivered.
              working with AI Startups to early stage YC and Venture Capital
              has been our goto.
            </motion.p>

            {/* buttons — cleaned up, consistent lime-fill language */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.25, duration: 0.4 }}
              className="mt-7 flex gap-4 items-center"
            >
              <a
                href="#contact"
                className="group relative overflow-hidden flex items-center justify-center gap-2 bg-[#1C1C1C] w-fit px-6 py-3 rounded-[7px] text-xs text-white font-mono font-bold border border-transparent hover:border-[#CFFF04] transition-colors duration-300 hover:cursor-pointer"
              >
                <span className="absolute inset-x-0 bottom-0 h-0 bg-[#CFFF04] transition-all duration-300 ease-out group-hover:h-full" />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-[#1C1C1C]">
                  Let's do a call
                </span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>

              <a
                href="#work"
                className="group relative overflow-hidden flex items-center justify-center w-fit px-6 py-3 rounded-[7px] text-xs font-mono font-bold border border-black/15 hover:border-[#1C1C1C] transition-colors duration-300 hover:cursor-pointer"
              >
                <span className="absolute inset-x-0 bottom-0 h-0 bg-[#1C1C1C] transition-all duration-300 ease-out group-hover:h-full" />
                <span className="relative z-10 text-[#1C1C1C] transition-colors duration-300 group-hover:text-white">
                  View Work
                </span>
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-120 w-580 ml-20 rounded-[9px] overflow-hidden border border-black/10"
          >
            <LaunchSequence />
          </motion.div>
        </div>
      </section>
    </>
  );
}