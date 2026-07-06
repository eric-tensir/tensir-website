"use client";

import { createContext, useContext, useState } from "react";

// ————————————————————————————————————————————
// TENSIR — shared shell (nav, footer, buttons, mark, contact context)
// Dark theme: near-black, light ink, crimson accent only.
// ————————————————————————————————————————————

// Two-font system (loaded in layout.jsx via next/font): Space Grotesk for
// display and body, IBM Plex Mono for data/code accents (labels, kickers).
export const MONO = "var(--font-mono), ui-monospace, SFMono-Regular, Menlo, monospace";
export const SANS = "var(--font-display), ui-sans-serif, system-ui, sans-serif";
export const DISPLAY = "var(--font-display), ui-sans-serif, sans-serif";

export const BG = "#0B0F13";
export const PANEL = "#10151B";
export const INK_LIGHT = "#F2F1ED";

// Tensir mark — master geometry. Shard palette brightened for the dark bg;
// FRAG remains the site-wide crimson accent used outside the mark.
export const SHARD_DARK = "#8A2B22";
export const SHARD = "#E05548";
export const FRAG = "#CB433A";

// Cracks, gaps, and the center hole are cut out via mask (black = removed),
// so the site background shows through — nothing is painted white.
export function TensirMark({ size = 28, id = "m" }) {
  const mask = `tensir-${id}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-label="Tensir">
      <mask id={mask}>
        <rect width="100" height="100" fill="#fff" />
        <polygon points="90.1,57.1 78.7,71.6 66.6,84.7 22.9,83.3 13.2,64.0 35.4,29.3 64.3,17.9 87.2,18.9" fill="#000" />
        <polygon points="84.7,61.0 105.5,63.3 106.4,54.3 85.6,52.1" fill="#000" />
        <polygon points="72.0,71.8 101.7,96.7 107.5,89.8 77.7,64.9" fill="#000" />
        <polygon points="60.8,81.2 68.7,107.0 77.3,104.4 69.5,78.6" fill="#000" />
        <polygon points="23.7,76.6 -3.8,100.5 2.0,107.3 29.6,83.4" fill="#000" />
        <polygon points="17.0,58.5 -6.9,64.1 -4.8,72.9 19.1,67.2" fill="#000" />
        <polygon points="42.1,30.0 8.5,-7.5 1.8,-1.5 35.4,36.0" fill="#000" />
        <polygon points="67.7,23.7 73.5,-5.0 64.6,-6.8 58.9,21.9" fill="#000" />
        <polygon points="87.3,25.6 107.3,2.5 100.5,-3.4 80.5,19.7" fill="#000" />
      </mask>
      <g mask={`url(#${mask})`}>
        <rect width="100" height="100" fill={SHARD_DARK} />
        <polygon points="22.9,83.3 3.6,100.0 0.0,100.0 0.0,67.1 13.2,64.0" fill={SHARD} />
        <polygon points="13.2,64.0 0.0,67.1 0.0,0.0 9.2,0.0 35.4,29.3" fill={SHARD} />
        <polygon points="35.4,29.3 9.2,0.0 67.9,0.0 64.3,17.9" fill={SHARD} />
        <polygon points="64.3,17.9 67.9,0.0 100.0,0.0 100.0,4.1 87.2,18.9" fill={SHARD} />
      </g>
    </svg>
  );
}

// ————— Contact modal context (modal UI lands in the next pass) —————
const ContactCtx = createContext(() => {});
export const useContact = () => useContext(ContactCtx);

// ————— CTA button — mono, hairline border, crimson arrow, crimson fill on hover —————
export function Cta({ children, onClick, href }) {
  const cls =
    "group inline-flex items-center gap-2.5 rounded-md border border-white/25 px-4 py-2.5 " +
    "text-xs uppercase tracking-[0.15em] text-white whitespace-nowrap cursor-pointer " +
    "transition-colors duration-150 ease-out hover:border-[#CB433A] hover:bg-[#CB433A] hover:text-[#0B0F13]";
  const arrow = (
    <svg
      width="13"
      height="13"
      viewBox="0 0 16 16"
      fill="none"
      className="text-[#CB433A] group-hover:text-[#0B0F13] transition-colors duration-150"
    >
      <path d="M2 8 H13 M9 3.5 L13.5 8 L9 12.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
  if (href) {
    return (
      <a href={href} className={cls} style={{ fontFamily: MONO }}>
        {children}
        {arrow}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={cls} style={{ fontFamily: MONO }}>
      {children}
      {arrow}
    </button>
  );
}

const NAV_LINKS = [
  { label: "Mission", href: "/mission" },
  { label: "Careers", href: "/careers" },
  { label: "Platform", href: "/platform" },
];

function Nav() {
  const openContact = useContact();

  return (
    <header
      className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-md"
      style={{ backgroundColor: "rgba(11,15,19,0.88)" }}
    >
      <div className="flex items-center justify-between px-4 md:px-10 h-[76px]">
        <a href="/" className="flex items-center gap-4">
          <TensirMark size={64} id="nav" />
          <span
            className="text-4xl font-semibold leading-none tracking-tight"
            style={{ fontFamily: DISPLAY, color: INK_LIGHT }}
          >
            Tensir
          </span>
        </a>
        <nav className="right-axis flex items-center gap-6 md:gap-9">
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm lg:text-lg font-medium uppercase tracking-[0.18em] text-white/60 hover:text-white transition-colors duration-150"
                style={{ fontFamily: DISPLAY }}
              >
                {l.label}
              </a>
            ))}
          </div>
          <Cta onClick={openContact}>Contact us</Cta>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="px-4 md:px-10 py-12 flex flex-col md:flex-row md:items-center justify-between gap-10">
        <div className="flex items-center gap-8">
          <TensirMark size={36} id="footer" />
          <nav className="flex items-center gap-6 md:gap-8">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-xs uppercase tracking-[0.18em] text-white/60 hover:text-white transition-colors duration-150"
                style={{ fontFamily: MONO }}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-6 text-[13px] text-white/60" style={{ fontFamily: MONO }}>
          <a href="mailto:contact@tensir.ai" className="hover:text-white transition-colors duration-150">
            contact@tensir.ai
          </a>
          <a
            href="https://www.linkedin.com/company/tensir"
            aria-label="Tensir on LinkedIn"
            className="hover:text-white transition-colors duration-150"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
            </svg>
          </a>
        </div>
      </div>
      <div
        className="border-t border-white/10 px-4 md:px-10 py-4 text-[11px] text-white/35"
        style={{ fontFamily: MONO }}
      >
        © Tensir SASU. All rights reserved.
      </div>
    </footer>
  );
}

export function Shell({ children, heroOverlap = false }) {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <ContactCtx.Provider value={() => setContactOpen(true)}>
      <div className="min-h-screen antialiased" style={{ backgroundColor: BG, color: INK_LIGHT, fontFamily: SANS }}>
        <Nav />
        <main className={heroOverlap ? "-mt-[76px]" : ""}>{children}</main>
        <Footer />
        {/* Contact modal mounts here in the next pass; contactOpen: {String(contactOpen)} */}
      </div>
    </ContactCtx.Provider>
  );
}
