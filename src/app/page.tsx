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
  image: string; // ✅ pega aquí links de Pinterest (si son públicos)
  tag?: string;
};

const INVITATIONS: Invitation[] = [
  {
    id: "lauyantonio",
    title: "Eterna Complicidad",
    style: "Editorial • Fotografía",
    tag: "Más vendido",
    image: "https://i.pinimg.com/736x/3b/0b/3e/3b0b3e875c7d88bd74e4c31036f86b78.jpg",
  },
  {
    id: "camiloyjohana",
    title: "Votos en Blanco",
    style: "Minimal • Clean",
    tag: "Nuevo",
    image: "https://i.pinimg.com/736x/23/99/ec/2399ec56b1d6da2e55ee2426bd61897d.jpg",
  },
  {
    id: "cartadeamor",
    title: "Carta de Amor",
    style: "Papel • Moderno",
    image: "https://i.pinimg.com/736x/46/96/80/469680bec8a2451d909321f0b218554e.jpg",
  },
  {
    id: "bw-04",
    title: "Promesa Eterna",
    style: "B&N • Editorial",
    image: "https://i.pinimg.com/1200x/3e/73/f0/3e73f05acd2bfc40b8b78cb19a010097.jpg",
  },
  {
    id: "soft-05",
    title: "Siempre Nosotros",
    style: "Romántico • Claro",
    image: "https://i.pinimg.com/1200x/ba/29/90/ba2990b11237ab6ba0c5add970ea48b8.jpg",
  },
  {
    id: "nature-06",
    title: "Raíces del Amor",
    style: "Natural • Editorial",
    image: "https://i.pinimg.com/1200x/38/c2/29/38c2293e0a5f704b8bf92866c1c655d5.jpg",
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

export default function HomePage() {
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);

  const brand = "Sí, Forever";

  const hero = {
    bigWord: "FOREVER",
    kicker: "INVITACIONES DIGITALES",
    title: "Tarjetas premium para bodas",
    subtitle:
      "Femenino + editorial + moderno. Fondo dinámico y botones glass, pero con un hero limpio y estético.",
    ctaPrimary: "Cotizar ahora",
    ctaSecondary: "Ver catálogo",
  };

  const whatsappLink =
    "https://wa.me/573102345742?text=Hola%20%F0%9F%92%97%20Quiero%20cotizar%20una%20invitaci%C3%B3n%20digital%20con%20S%C3%AD%2C%20Forever";

  // ✅ Carrusel de backgrounds (pon 3–5 imágenes)
  const HERO_BGS = useMemo(
    () => [
      "https://i.pinimg.com/736x/72/74/8e/72748ebad522415a3fa42a7b31cf1122.jpg",
      "https://i.pinimg.com/736x/6f/89/f3/6f89f3a099d84749ff585328fc149620.jpg",
      "https://i.pinimg.com/736x/8b/b9/04/8bb9041d34d2559140c5b000c4d5e79f.jpg",
    ],
    []
  );

  const [bgIndex, setBgIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setBgIndex((i) => (i + 1) % HERO_BGS.length),
      6500
    );
    return () => clearInterval(id);
  }, [HERO_BGS.length]);

  const TINT =
    "linear-gradient(120deg, rgba(255,173,204,0.22), rgba(195,185,255,0.12), rgba(0,0,0,0.06))";

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
            <a href="#catalogo" className="hover:text-white">
              Catálogo
            </a>
            <a href="#contacto" className="hover:text-white">
              Contacto
            </a>
          </nav>

          <a
            href="#catalogo"
            className="rounded-full bg-white/14 px-5 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-white/20 backdrop-blur hover:bg-white/18"
          >
            Ver diseños
          </a>
        </div>
      </header>

      {/* HERO (SIN CARD) */}
      <section className="relative min-h-[100svh] overflow-hidden">
        {/* background carousel */}
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

        {/* tint */}
        <div className="absolute inset-0" style={{ backgroundImage: TINT }} />
        {/* vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/18 via-black/5 to-black/55" />

        {/* big word */}
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

        {/* content (centrado y limpio) */}
        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pb-20 pt-28 text-center md:pt-32">
          <p className="text-xs tracking-[0.35em] text-white/80">
            {hero.kicker}
          </p>

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

          {/* dots */}
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

        {/* scroll hint */}
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
           {/* CATÁLOGO */}
      <section
        id="catalogo"
        className="relative overflow-hidden bg-white"
      >
        <div className="relative mx-auto max-w-7xl px-6 py-20">
          <div className="mb-12 text-center">
   ,
            <p className=" text-2xl uppercase  text-black font-mono  font-semibold">
              Catálogo
            </p>
            <h2
              className={`${headingFont.className} mt-4 text-3xl sm:text-4xl`}
            >
              Elige tu estilo
            </h2>
            <p className="mt-4 text-black">
              Diseños listos para personalizar con tus fotos y datos.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INVITATIONS.map((item) => (
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
      <footer id="contacto" className="bg-white text-center text-sm text-black/50">
        <div className="border-t border-black/10 py-12">
          © {year} {brand} · Invitaciones de boda
        </div>
      </footer>
    </main>
  );
}
