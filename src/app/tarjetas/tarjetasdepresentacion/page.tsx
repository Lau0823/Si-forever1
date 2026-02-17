"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Sora, Plus_Jakarta_Sans } from "next/font/google";

const headingFont = Sora({ subsets: ["latin"], weight: ["600", "700"] });
const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type BusinessCard = {
  slug: string;
  title: string;
  style: string;
  image: string;
  tag?: string;
};

const BUSINESS_CARDS: BusinessCard[] = [
  {
    slug: "veterinario",
    title: "Veterinario",
    style: "Clean • Profesional",
    tag: "Más vendido",
    image:
      "https://i.pinimg.com/1200x/86/1b/d9/861bd983707080c74cfdd63ae4f3161e.jpg",
  },
  {
    slug: "manicurista",
    title: "Manicurista",
    style: "Elegante • Glam",
    tag: "Nuevo",
    image:
      "https://i.pinimg.com/736x/68/b0/b7/68b0b7f098d216fb295305534c85f1e0.jpg",
  },
  {
    slug: "fruver",
    title: "Fruver",
    style: "Moderno • Social",
    image:
      "https://i.pinimg.com/736x/1a/a8/94/1aa89439ae9c29dceb1eb20c71879679.jpg",
  },
  {
    slug: "fotografo",
    title: "fotografo",
    style: "Minimal • Corporativo",
    image:
      "/image.png",
  },
  {
    slug: "artesana",
    title: "artesana",
    style: "Directo • Comercial",
    image:
      "https://i.pinimg.com/736x/03/f9/84/03f9841d2116e6336a389d0f0715a5f2.jpg",
  },
  {
    slug: "servicios",
    title: "Servicios",
    style: "Versátil • Profesional",
    image:
      "https://i.pinimg.com/1200x/6c/14/d4/6c14d4ff5ce77a9b0ad6ffb2fed4ad71.jpg",
  },
];

function GlassButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold bg-white/14 text-white ring-1 ring-white/25 backdrop-blur hover:bg-white/18 transition"
    >
      {children}
    </a>
  );
}

export default function TarjetasDePresentacionPage() {
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);

  const brand = "Sí, Forever";

  const hero = {
    kicker: "TARJETAS DIGITALES",
    title: "Tarjetas de presentación premium",
    subtitle:
      "Comparte tu negocio con estilo. WhatsApp, contacto y enlaces directos.",
    ctaPrimary: "Crear la mía",
    ctaSecondary: "Ver modelos",
  };

  const whatsappLink =
    "https://wa.me/573102345742?text=Hola%20Quiero%20crear%20una%20tarjeta%20de%20presentaci%C3%B3n%20digital";

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

  const HERO_BGS = [
    "https://i.pinimg.com/736x/6c/4c/36/6c4c36cc203d6c59bd1016324d16707d.jpg",
    "https://i.pinimg.com/736x/5f/8c/0c/5f8c0c43f8826d2b26db49f258a7e0fa.jpg",
  ];

  const [bgIndex, setBgIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setBgIndex((i) => (i + 1) % HERO_BGS.length),
      6500
    );
    return () => clearInterval(id);
  }, []);

  return (
    <main className={`${bodyFont.className} text-white`}>
      {/* NAVBAR */}
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
              <Link
                key={item.label}
                href={item.href}
                className="hover:text-white transition"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 p-2 backdrop-blur"
            aria-label="Abrir menú"
          >
            ☰
          </button>
        </div>

        {menuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 bg-black/60"
              aria-label="Cerrar menú"
            />
            <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-black/40 backdrop-blur-2xl border-l border-white/10 p-6">
              <div className="flex justify-between items-center mb-6">
                <span className="font-semibold">{brand}</span>
                <button onClick={() => setMenuOpen(false)} aria-label="Cerrar">
                  ✕
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-white/85 hover:text-white transition"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-8 grid gap-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90 transition"
                >
                  Cotizar ahora
                </a>
              </div>

              <p className="mt-6 text-xs text-white/55">
                Menú · {year} · {brand}
              </p>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative min-h-[100svh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{ backgroundImage: `url(${HERO_BGS[bgIndex]})` }}
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-[100svh] px-6">
          <p className="text-xs tracking-[0.3em] text-white/70">
            {hero.kicker}
          </p>
          <h1
            className={`${headingFont.className} mt-6 text-4xl md:text-6xl`}
          >
            {hero.title}
          </h1>
          <p className="mt-4 max-w-xl text-white/80">{hero.subtitle}</p>

          <div className="mt-8 flex gap-4 flex-wrap justify-center">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-black hover:bg-white/90 transition"
            >
              {hero.ctaPrimary}
            </a>

            <GlassButton href="#modelos">{hero.ctaSecondary}</GlassButton>
          </div>
        </div>
      </section>

      {/* MODELOS */}
      <section id="modelos" className="bg-white text-black py-20 px-6">
        <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BUSINESS_CARDS.map((item) => (
            <div
              key={item.slug}
              className="group relative rounded-[28px] overflow-hidden shadow-xl"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />

              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/90" />

              {item.tag && (
                <div className="absolute left-5 top-5">
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/25 backdrop-blur">
                    {item.tag}
                  </span>
                </div>
              )}

              <div className="absolute bottom-0 p-6 text-white w-full">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-sm text-white/70">{item.style}</p>

                <div className="mt-4">
                  <Link
                    href={`/tarjetas/tarjetasdepresentacion/${item.slug}`}
                    className="inline-flex w-full items-center justify-center rounded-full bg-white/15 px-5 py-2 text-sm font-semibold text-white ring-1 ring-white/30 backdrop-blur hover:bg-white/25 transition"
                  >
                    Ver
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-white text-center text-sm text-black/50 py-10">
        © {year} {brand} · Tarjetas de presentación digitales
      </footer>
    </main>
  );
}
