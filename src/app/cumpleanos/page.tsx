"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Sora, Plus_Jakarta_Sans } from "next/font/google";

const headingFont = Sora({ subsets: ["latin"], weight: ["600", "700"] });
const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type Invitation = {
  id: string;
  title: string;
  style: string;
  image: string;
  tag?: string;
};

const INVITATIONS_BDAY: Invitation[] = [
  {
    id: "bday-glow",
    title: "Glow Birthday",
    style: "Party • Luces",
    tag: "Más vendido",
    image: "https://i.pinimg.com/1200x/63/d4/18/63d41838ed19a4dfcd9e3380d70b938e.jpg",
  },
  {
    id: "bday-minimal",
    title: "Minimal Cake",
    style: "Minimal • Clean",
    tag: "Nuevo",
    image: "https://i.pinimg.com/1200x/6d/16/c2/6d16c2e7ef60cda366ea8ce9852bc145.jpg",
  },
  {
    id: "bday-noir",
    title: "Noir Celebration",
    style: "B&N • Editorial",
    image: "https://i.pinimg.com/736x/58/41/af/5841afd7bf94c835cdb3ec802598e2ad.jpg",
  },
  {
    id: "bday-rosa",
    title: "Black Party",
    style: "Black • Chic",
    image: "https://i.pinimg.com/1200x/7a/ed/70/7aed70046201858fa66a8c3bf317f1da.jpg",
  },
  {
    id: "bday-kids",
    title: "Kids Fun",
    style: "Color • Cute",
    image: "https://i.pinimg.com/736x/6d/c4/d9/6dc4d99d91dbd3045a4f1f9786c61950.jpg",
  },
  {
    id: "bday-gold",
    title: "Golden Night",
    style: "Gold • Elegante",
    image: "https://i.pinimg.com/1200x/5d/2d/6b/5d2d6b5c30d0eafc9203a18bd4f995ad.jpg",
  },
];

function GlassButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={[
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold",
        "bg-white/14 text-white ring-1 ring-white/25 backdrop-blur",
        "hover:bg-white/18 active:scale-[0.99] transition",
        className,
      ].join(" ")}
    >
      {children}
    </a>
  );
}

export default function CumpleanosPage() {
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);

  const brand = "Sí, Forever";

  const hero = {
    bigWord: "BDAY",
    kicker: "INVITACIONES DIGITALES",
    title: "Tarjetas premium para cumpleaños",
    subtitle:
      "Estética editorial + moderna, fondo dinámico y botones glass. Diseños listos para personalizar con fotos, datos y música.",
    ctaPrimary: "Cotizar ahora",
    ctaSecondary: "Ver catálogo",
  };

  const whatsappLink =
    "https://wa.me/573102345742?text=Hola%20%F0%9F%8E%89%20Quiero%20cotizar%20una%20invitaci%C3%B3n%20digital%20para%20cumplea%C3%B1os%20con%20S%C3%AD%2C%20Forever";

  // ✅ carrusel de fondos (cumple vibes)
  const HERO_BGS = useMemo(
    () => [
      "https://i.pinimg.com/736x/42/fd/d8/42fdd87489b3eb4154ca808fd5a5b729.jpg",
      "https://i.pinimg.com/736x/ba/e8/48/bae84865535342fdd68b9112ab7f9a99.jpg",
      "https://i.pinimg.com/736x/65/ff/06/65ff066290798e4950ac9f242a90d19d.jpg",
    ],
    []
  );

  const [bgIndex, setBgIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setBgIndex((i) => (i + 1) % HERO_BGS.length), 6500);
    return () => clearInterval(id);
  }, [HERO_BGS.length]);

  const TINT =
    "linear-gradient(120deg, rgba(255,173,204,0.22), rgba(195,185,255,0.12), rgba(0,0,0,0.06))";

  const NAV_ITEMS = useMemo(
    () => [
      { label: "Inicio", href: "/" },
      { label: "Planes", href: "/planes" },
      { label: "Medios de pago", href: "/#medios-de-pago" },
      { label: "Tarjetas de presentación", href: "/tarjetasdepresentacion" },
      { label: "15 años", href: "/quince" },
      { label: "Cumpleaños", href: "/cumpleanos" },
      { label: "Contacto", href: "/contacto" },
    ],
    []
  );

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <main className={`${bodyFont.className} text-white`}>
      {/* NAV */}
      <header className="fixed left-0 right-0 top-0 z-40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className={`${headingFont.className} text-sm font-semibold tracking-tight`}
          >
            {brand}
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-white/80 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link key={item.label} href={item.href} className="hover:text-white transition">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#catalogo"
              className="hidden rounded-full bg-white/14 px-5 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-white/20 backdrop-blur hover:bg-white/18 md:inline-flex"
            >
              Ver diseños
            </a>

            <button
              type="button"
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 p-2 backdrop-blur hover:bg-white/15 transition md:hidden"
            >
              <div className="flex h-5 w-5 flex-col items-center justify-center gap-1.5">
                <span className="h-[2px] w-5 rounded-full bg-white/90" />
                <span className="h-[2px] w-5 rounded-full bg-white/70" />
                <span className="h-[2px] w-5 rounded-full bg-white/90" />
              </div>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <button
              aria-label="Cerrar menú"
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 bg-black/55"
            />
            <div className="absolute right-0 top-0 h-full w-[86%] max-w-sm border-l border-white/10 bg-black/35 backdrop-blur-2xl">
              <div className="flex items-center justify-between px-6 py-5">
                <div className={`${headingFont.className} text-sm font-semibold`}>{brand}</div>
                <button
                  aria-label="Cerrar menú"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full border border-white/15 bg-white/10 p-2 hover:bg-white/15 transition"
                >
                  <div className="relative h-5 w-5">
                    <span className="absolute left-1/2 top-1/2 h-[2px] w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-white/90" />
                    <span className="absolute left-1/2 top-1/2 h-[2px] w-5 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-white/90" />
                  </div>
                </button>
              </div>

              <div className="px-6 pb-6">
                <div className="h-px w-full bg-white/10" />
                <nav className="mt-6 flex flex-col gap-1">
                  {NAV_ITEMS.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 hover:bg-white/10 transition"
                    >
                      <span>{item.label}</span>
                      <span className="text-white/50">→</span>
                    </Link>
                  ))}
                </nav>

                <div className="mt-6 grid gap-3">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90 transition"
                  >
                    Cotizar ahora
                  </a>

                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      const el = document.querySelector("#catalogo");
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/15 transition"
                  >
                    Ver catálogo
                  </button>
                </div>

                <p className="mt-6 text-xs text-white/55">
                  Menú · {year} · {brand}
                </p>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative min-h-[100svh] overflow-hidden">
        <div className="absolute inset-0">
          {HERO_BGS.map((src, i) => (
            <div
              key={src}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
              style={{
                backgroundImage: `url(${src})`,
                opacity: i === bgIndex ? 1 : 0,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0" style={{ backgroundImage: TINT }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/18 via-black/5 to-black/55" />

        <div className="pointer-events-none absolute inset-0 flex items-start justify-center pt-20 md:pt-24">
          <p
            className={`${headingFont.className} select-none text-center leading-none tracking-tight`}
            style={{
              fontSize: "clamp(4rem, 14vw, 11rem)",
              color: "rgba(255,255,255,0.14)",
            }}
          >
            {hero.bigWord}
          </p>
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pb-20 pt-28 text-center md:pt-32">
          <p className="text-xs tracking-[0.35em] text-white/80">{hero.kicker}</p>

          <h1 className={`${headingFont.className} mt-4 text-4xl leading-tight md:text-6xl`}>
            {hero.title}
          </h1>

          <p className="mt-5 max-w-2xl text-sm text-white/85 md:text-base">
            {hero.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-black shadow-sm hover:bg-white/90 active:scale-[0.99] transition"
            >
              {hero.ctaPrimary}
            </a>

            <GlassButton href="#catalogo">{hero.ctaSecondary}</GlassButton>
          </div>

          <div className="mt-7 flex items-center justify-center gap-2">
            {HERO_BGS.map((_, i) => (
              <button
                key={i}
                aria-label={`Ir al fondo ${i + 1}`}
                onClick={() => setBgIndex(i)}
                className={[
                  "h-2.5 w-2.5 rounded-full ring-1 ring-white/35 transition",
                  i === bgIndex ? "bg-white" : "bg-white/25 hover:bg-white/40",
                ].join(" ")}
              />
            ))}
            <span className="ml-2 text-xs text-white/60">Fondo</span>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/75">
          <a
            href="#catalogo"
            className="rounded-full bg-white/12 px-4 py-2 ring-1 ring-white/20 backdrop-blur hover:bg-white/20"
          >
            ↓ Ver catálogo
          </a>
        </div>
      </section>

      {/* CATÁLOGO */}
      <section id="catalogo" className="relative overflow-hidden bg-white">
        <div className="relative mx-auto max-w-7xl px-6 py-20">
          <div className="mb-12 text-center">
            <p className="text-2xl uppercase text-black font-mono font-semibold">
              CUMPLEAÑOS
            </p>
            <h2 className={`${headingFont.className} mt-4 text-3xl sm:text-4xl text-black`}>
              Elige tu estilo
            </h2>
            <p className="mt-4 text-black">
              Diseños listos para personalizar con fotos, música y datos de tu celebración.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INVITATIONS_BDAY.map((item) => (
              <article
                key={item.id}
                className="group relative min-h-[440px] overflow-hidden rounded-[32px] shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/45 to-black/80" />

                {item.tag && (
                  <div className="absolute left-5 top-5">
                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/30 backdrop-blur">
                      {item.tag}
                    </span>
                  </div>
                )}

                <div className="relative flex h-full flex-col justify-end p-5">
                  <p className="text-xs tracking-[0.3em] text-white/75">
                    {item.style.toUpperCase()}
                  </p>

                  <h3 className={`${headingFont.className} mt-2 text-2xl`}>
                    {item.title}
                  </h3>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href={`/tarjetas/${item.id}`}
                      className="inline-flex w-full items-center justify-center rounded-full bg-white/18 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/30 backdrop-blur hover:bg-white/25 transition"
                    >
                      Ver demo
                    </Link>

                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full items-center justify-center rounded-full bg-white/18 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/30 backdrop-blur hover:bg-white/25 transition"
                    >
                      Cotizar →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white text-center text-sm text-black/50">
        <div className="border-t border-black/10 py-12">
          © {year} {brand} · Invitaciones de cumpleaños
        </div>
      </footer>
    </main>
  );
}
