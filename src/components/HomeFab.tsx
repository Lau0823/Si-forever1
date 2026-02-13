"use client";

import Link from "next/link";

export default function HomeFab() {
  return (
    <Link
      href="/"
      aria-label="Ir al inicio"
      className={[
        "fixed bottom-6 right-6 z-[60]",
        "inline-flex h-12 w-12 items-center justify-center rounded-full",
        "border border-white/20 bg-white/12 text-white backdrop-blur-xl",
        "shadow-[0_18px_60px_-35px_rgba(0,0,0,0.65)]",
        "transition hover:bg-white/18 active:scale-[0.98]",
      ].join(" ")}
    >
      {/* Casita (SVG) */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M3 10.5L12 3l9 7.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 9.8V21h14V9.8"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 21v-7h4v7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
