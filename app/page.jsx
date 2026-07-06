"use client";

import { useEffect, useState } from "react";
import { Shell, Cta, useContact, MONO, DISPLAY, FRAG } from "./components/site";

// ————————————————————————————————————————————
// TENSIR — landing v3
// Dark, full-bleed, freeform-grade rhythm. Crimson accent only.
// Video: placeholder block, swap the hero background for <video> later.
// ————————————————————————————————————————————

const t = {
  hero: ["Compounding", "simulations"],
  sub: "Compute logistics for chemistry R&D",
  sectionTitle: "Core concepts of Tensir",
  heads: ["Build pipelines", "Unify compute", "Forecast budget", "Trace provenance", "Speedup workflow"],
  bodies: [
    "custom sequence to answer this : do we keep working on this compound or trash it ??",
    "qpu gpu, ai models — cloud on prem (my take: sporadic forever). there you see the whole arena.",
    "(personal opinion : the best) l'argent, le cash, la thune, le fric. chemistry compute is expensive, see exactly where it goes !",
    "the biography, the records, the life story.",
    "provide your teams with the best prod tools.",
  ],
  industries: ["Pharma", "Chemicals", "Energy", "Semiconductors", "Aerospace", "Nuclear", "Robotics"],
  quote: "“Some interesting things happen once fragments are able to stack.”",
  founder: "Eric — Founder, Tensir",
};

// Hand sketches — white strokes on #0B0F13, pre-matched to the site bg.
// Order follows t.heads.
const SKETCHES = [
  "/sketches/02_gates_v1_white_on_dark.png",
  "/sketches/03_molecule_v1_white_on_dark.png",
  "/sketches/04_budget_v1_white_on_dark.png",
  "/sketches/01_pipeline_v1_white_on_dark.png",
  "/sketches/05_hierarchy_v1_white_on_dark.png",
];

// ————— Expandable door band — smooth grid-rows height animation, no navigation —————
function Door({ label, children }) {
  const [open, setOpen] = useState(false);
  return (
    <section className="border-t border-white/10">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group w-full right-axis-row px-4 md:px-10 py-10 md:py-14 text-left cursor-pointer"
      >
        <span className="flex items-center justify-between gap-6">
          <span
            className={
              "text-[1.75rem] md:text-[2.5rem] font-semibold tracking-tight leading-tight transition-colors duration-150 " +
              (open ? "text-[#CB433A]" : "group-hover:text-[#CB433A]")
            }
            style={{ fontFamily: DISPLAY }}
          >
            {label}
          </span>
          <span
            className={
              "shrink-0 flex items-center justify-center w-11 h-11 md:w-13 md:h-13 rounded-md border transition-all duration-300 " +
              (open ? "border-[#CB433A] rotate-180" : "border-white/20 group-hover:border-[#CB433A]")
            }
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#CB433A]">
              <path d="M3 5.5 L8 10.5 L13 5.5" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </span>
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-500 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden min-h-0">
          <div className="right-axis-row px-4 md:px-10 pb-12 md:pb-16">
            <div>{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DoorTeaser({ children }) {
  return (
    <p className="text-sm md:text-base leading-6 text-white/50 max-w-xl" style={{ fontFamily: MONO }}>
      {children}
    </p>
  );
}

export default function TensirLanding() {
  return (
    <Shell heroOverlap>
      <Landing />
    </Shell>
  );
}

function Landing() {
  const openContact = useContact();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const tm = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(tm);
  }, []);

  return (
    <>
      {/* ————— HERO — full-viewport video placeholder, text bottom-aligned ————— */}
      <section className="relative flex flex-col min-h-[100svh]">
        {/* Video placeholder background. Swap for:
            <video autoPlay muted loop playsInline src="/hero.mp4" className="absolute inset-0 w-full h-full object-cover" />
        */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "#090D11",
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.035) 0 1px, transparent 1px 32px)," +
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.035) 0 1px, transparent 1px 32px)",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs tracking-widest uppercase text-white/30 px-6 text-center" style={{ fontFamily: MONO }}>
              [ 30s product capture — autoplay muted loop ]
            </span>
          </div>
          <span
            className="absolute top-[92px] left-4 md:left-10 flex items-center gap-2 text-[10px] text-white/40"
            style={{ fontFamily: MONO }}
          >
            <span className="inline-block w-2 h-2 rounded-full" style={{ background: FRAG }} />
            REC
          </span>
          <span className="absolute top-[92px] right-4 md:right-10 text-[10px] text-white/40" style={{ fontFamily: MONO }}>
            00:30
          </span>
        </div>

        <div
          className="relative z-10 mt-auto w-full px-4 md:px-10 pb-14 md:pb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-10"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateY(10px)",
            transition: "opacity 700ms ease, transform 700ms ease",
          }}
        >
          <div>
            <h1
              className="font-semibold leading-[1.02]"
              style={{ fontFamily: DISPLAY, fontSize: "clamp(2.75rem, 7vw, 5.25rem)", letterSpacing: "-0.02em" }}
            >
              {t.hero[0]}
              <br />
              {t.hero[1]}
            </h1>
            <p className="mt-6 text-[13px] uppercase tracking-[0.22em] text-white/60" style={{ fontFamily: MONO }}>
              {t.sub}
            </p>
          </div>
          <div className="shrink-0 pb-2">
            <Cta onClick={openContact}>Contact us</Cta>
          </div>
        </div>
      </section>

      {/* ————— CORE CONCEPTS ————— */}
      <section className="border-t border-white/10">
        <div className="px-4 md:px-10 py-8 md:py-10 border-b border-white/10">
          <h2 className="text-2xl md:text-[2rem] font-semibold tracking-tight" style={{ fontFamily: DISPLAY }}>
            {t.sectionTitle}
          </h2>
        </div>
        <div>
          {t.heads.map((head, i) => (
            <div key={head} className="flex flex-col md:flex-row md:items-center border-b border-white/10 last:border-b-0">
              <div className="flex-1 min-w-0 px-4 md:px-10 pt-8 md:py-12">
                <span className="text-xs uppercase tracking-[0.2em] text-white/45" style={{ fontFamily: MONO }}>
                  {head}
                </span>
                <p className="mt-4 text-lg md:text-[1.375rem] font-medium leading-[1.45] tracking-tight text-white/90 max-w-2xl">
                  {t.bodies[i]}
                </p>
              </div>
              <div className="shrink-0 px-4 pt-8 pb-6 md:w-[460px] md:border-l md:border-white/10 md:px-8 md:py-8">
                <img src={SKETCHES[i]} alt="" loading="lazy" className="w-full max-w-[420px] h-auto md:max-w-none" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ————— PLATFORM DOOR ————— */}
      <Door label="Tour the platform">
        <DoorTeaser>[ platform walkthrough — coming soon ]</DoorTeaser>
        <div className="mt-8">
          <Cta onClick={openContact}>Contact us for access</Cta>
        </div>
      </Door>

      {/* ————— FOUNDER QUOTE ————— */}
      <section className="border-t border-white/10">
        <div className="px-4 md:px-10 py-24 md:py-36">
          <blockquote className="max-w-4xl border-l-2 pl-6 md:pl-12" style={{ borderColor: FRAG }}>
            <p
              className="text-[1.625rem] md:text-[2.25rem] font-medium italic tracking-tight leading-[1.25]"
              style={{ fontFamily: DISPLAY }}
            >
              {t.quote}
            </p>
            <footer className="mt-8 text-xs uppercase tracking-[0.2em] text-white/45" style={{ fontFamily: MONO }}>
              {t.founder}
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ————— MISSION DOOR ————— */}
      <Door label="Discover our mission">
        <DoorTeaser>[ mission statement — coming soon ]</DoorTeaser>
      </Door>

      {/* ————— INDUSTRIES MARQUEE ————— */}
      <section className="border-t border-white/10 overflow-hidden">
        <style>{`
          @keyframes tensir-marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .tensir-marquee-track {
            display: flex;
            width: max-content;
            animation: tensir-marquee 30s linear infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .tensir-marquee-track { animation: none; }
          }
        `}</style>
        <div className="py-9 md:py-11">
          <div className="tensir-marquee-track">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                aria-hidden={copy === 1}
                className="flex shrink-0 items-center text-xs md:text-sm tracking-[0.2em] uppercase text-white/55"
                style={{ fontFamily: MONO }}
              >
                {t.industries.map((name) => (
                  <span key={`${copy}-${name}`} className="whitespace-nowrap px-7 flex items-center gap-7">
                    {name}
                    <span className="inline-block w-1.5 h-1.5" style={{ background: FRAG }} />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ————— CAREERS DOOR ————— */}
      <Door label="Explore careers">
        <DoorTeaser>[ open roles — coming soon ]</DoorTeaser>
      </Door>
    </>
  );
}
