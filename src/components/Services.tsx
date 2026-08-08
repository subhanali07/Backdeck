import React from "react";
import { cn } from "@/lib/utils";
import { Marquee } from "./ui/marquee";
import { Meteors } from "./ui/meteors";
import { ShineBorder } from "./ui/shine-border";
import { BorderBeam } from "./ui/border-beam";

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
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
      className="mx-13 border-x-2 border-black/10 py-20 px-10 border-2"
      id="services"
    >

      <div className="w-full relative grid md:grid-cols-2 gap-8 items-start border-2 border-black/10 p-8 rounded-[8px]">
        <div className="flex relative flex-col justify-center">

          <h2 className="text-5xl font-meow font-extrabold text-[#1C1C1C] leading-tight">
            our <span className="text-[#4d03cf]">services</span>
          </h2>
          <p className="mt-4 text-sm font-mono text-black/80 leading-relaxed max-w-md">
            we don't do decks and delays. every engagement ships something real
            — fast, and built to your brand, not a template.
          </p>
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:20s]">
              {" "}
              {firstRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s]">
              {secondRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
            <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
            <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
          </div>
        </div>

        <div className="relative overflow-hidden bg-[#1C1C1C] rounded-[8px] pb-40 p-10 shadow-2xl shadow-black/40">
          <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[length:18px_18px]" />

          <h3 className="relative text-white  font-meow text-4xl font-bold mb-8">
            what's <span className="text-[#CFFF04]">included</span>?
          </h3>

          <ul className="relative space-y-5">
            {services.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-[#CFFF04] font-mono text-lg mt-0.5 shrink-0 w-5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-white/85 text-sm font-mono leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Services;
