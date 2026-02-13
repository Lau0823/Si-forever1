"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Sora, Plus_Jakarta_Sans } from "next/font/google";

const headingFont = Sora({ subsets: ["latin"], weight: ["600", "700"] });
const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type CardModel = {
  id: string;
  title: string;
  style: string;
  image: string;
  tag?: string;
};

const BUSINESS_CARDS: CardModel[] = [
  {
    id: "business-minimal",
    title: "Minimal Pro",
    style: "Clean • Ejecutivo",
    tag: "Más vendido",
    image:
      "https://i.pinimg.com/736x/1f/01/04/1f010495feaea5b6f995fa0947695a3e.jpg",
  },
  {
    id: "business-dark",
    title: "Noir Business",
    style: "Dark • Elegante",
    image:
      "https://i.pinimg.com/736x/64/c9/8f/64c98fd0bec1aca61bfb8c7cbb6cdd97.jpg",
  },
  {
    id: "business-modern",
    title: "Modern Link",
    style: "Moderno • Social",
    tag: "Nuevo",
    image:
      "https://i.pinimg.com/736x/ca/af/a8/caafa8476e86fb72906ae1b72f0d7bff.jpg",
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

export default function BusinessCardsPage() {
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);

  const brand = "Sí, Forever";

  const hero = {
    bigWord: "PRO",
    kicker: "TARJETAS DIGITALES",
    title: "Tarjetas de presentación premium",
    subtitle:
      "Comparte tu negocio con estilo. Enlaces directos, redes sociales y contacto inmediato.",
    ctaPrimary: "Crear la mía",
    ctaSecondary: "Ver modelos",
  };

  const whatsappLink =
    "https://wa.me/573102345742?text=Hola%20Quiero%20crear%20una%20tarjeta%20de%20presentaci%C3%B3n%20digital";

  // ✅ NAVBAR IGUAL A LAS OTRAS
  const NAV_ITEMS = useMemo(
    () => [
      { label: "Inicio", href: "/" },
      { label: "Planes", href: "/planes" },
      { label: "Medios de pago", href: "/#medios-de-pago" },
      { label: "Tarjetas de presentación", href: "/tarjetas-presentacion" },
      { label: "15 años", href: "/15-anos" },
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
              <Link key={item.label} href={item.href} className="hover:text-white transition">
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 p-2 backdrop-blur"
          >
            ☰
          </button>
        </div>

        {menuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 bg-black/60"
            />
            <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-black/40 backdrop-blur-2xl border-l border-white/10 p-6">
              <div className="flex justify-between items-center mb-6">
                <span className="font-semibold">{brand}</span>
                <button onClick={() => setMenuOpen(false)}>✕</button>
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

          <h1 className={`${headingFont.className} mt-6 text-4xl md:text-6xl`}>
            {hero.title}
          </h1>

          <p className="mt-4 max-w-xl text-white/80">
            {hero.subtitle}
          </p>

          <div className="mt-8 flex gap-4 flex-wrap justify-center">
            <a
              href={whatsappLink}
              target="_blank"
              className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-black hover:bg-white/90 transition"
            >
              {hero.ctaPrimary}
            </a>

            <GlassButton href="#modelos">
              {hero.ctaSecondary}
            </GlassButton>
          </div>
        </div>
      </section>

      {/* MODELOS */}
      <section id="modelos" className="bg-white text-black py-20 px-6">
        <div className="max-w-7xl mx-auto grid gap-6 md:grid-cols-3">
          {BUSINESS_CARDS.map((item) => (
            <div
              key={item.id}
              className="relative rounded-[28px] overflow-hidden shadow-xl"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute bottom-0 p-6 text-white">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-sm text-white/70">{item.style}</p>
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
