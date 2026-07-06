"use client";

import { MONO, DISPLAY } from "./site";

export function PagePlaceholder({ title, note }) {
  return (
    <section className="px-4 md:px-10 pt-16 md:pt-24 pb-24 min-h-[60vh] flex flex-col justify-center">
      <h1
        className="font-semibold tracking-tight leading-none"
        style={{ fontFamily: DISPLAY, fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
      >
        {title}
      </h1>
      <p className="mt-8 text-sm text-white/45 max-w-xl" style={{ fontFamily: MONO }}>
        {note}
      </p>
    </section>
  );
}
