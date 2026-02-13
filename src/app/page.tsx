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

const INVITATIONS: Invitation[] = [
  {
    id: "lauyantonio",
    title: "Eterna Complicidad",
    style: "Editorial • Fotografía",
    tag: "Más vendido",
    image:
      "https://i.pinimg.com/736x/3b/0b/3e/3b0b3e875c7d88bd74e4c31036f86b78.jpg",
  },
  {
    id: "camiloyjohana",
    title: "Votos en Blanco",
    style: "Minimal • Clean",
    tag: "Nuevo",
    image:
      "https://i.pinimg.com/736x/23/99/ec/2399ec56b1d6da2e55ee2426bd61897d.jpg",
  },
  {
    id: "cartadeamor",
    title: "Carta de Amor",
    style: "Papel • Moderno",
    image:
      "https://i.pinimg.com/736x/46/96/80/469680bec8a2451d909321f0b218554e.jpg",
  },
  {
    id: "anayluis",
    title: "Promesa Eterna",
    style: "B&N • Editorial",
    image:
      "https://i.pinimg.com/1200x/62/0a/af/620aaf9b82dc047deccd9c39ad588fc5.jpg",
  },
  {
    id: "manuelypau",
    title: "Siempre Nosotros",
    style: "Romántico • Claro",
    image:
      "https://i.pinimg.com/736x/8c/49/af/8c49afce47e2c3e68ebae5020284c2c5.jpg",
  },
  {
    id: "juanylucia",
    title: "Raíces del Amor",
    style: "Natural • Editorial",
    image:
      "https://i.pinimg.com/1200x/28/80/b0/2880b0579a6b1f3280266cb423e98f05.jpg",
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

/* ===== Medios de pago dark/glass (misma estética) ===== */
function PaymentCardDark({
  title,
  subtitle,
  badge,
}: {
  title: string;
  subtitle: string;
  badge?: string;
}) {
  return (
    <div className="relative group z-20">
      <div className="pointer-events-none absolute -inset-1 rounded-[28px] bg-white/10 blur-2xl opacity-25 transition group-hover:opacity-55" />
      <div className="relative rounded-[28px] border border-white/12 bg-white/10 p-7 backdrop-blur-2xl shadow-[0_30px_90px_-60px_rgba(0,0,0,0.9)] transition duration-300 group-hover:-translate-y-1 group-hover:bg-white/14">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="text-xl font-semibold">{title}</h4>
            <p className="mt-2 text-sm text-white/75">{subtitle}</p>
          </div>
          {badge && (
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80">
              {badge}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function DarkBgSection({
  id,
  title,
  subtitle,
  bgImage,
  children,
}: {
  id: string;
  title: string;
  subtitle: string;
  bgImage: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative overflow-hidden text-white">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 z-[1] bg-black/55" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-[#f6e7d2]/10 via-transparent to-[#f6e7d2]/8" />
      <div className="pointer-events-none absolute inset-0 z-[3]">
        <div className="absolute -top-44 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[#f6e7d2]/10 blur-3xl" />
        <div className="absolute -bottom-44 right-[-160px] h-[560px] w-[560px] rounded-full bg-[#f6e7d2]/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 text-center">
          <span className="text-xs tracking-widest text-white/70">SI, FOREVER</span>
          <h2 className={`${headingFont.className} mt-5 text-3xl sm:text-4xl`}>
            {title}
          </h2>
          <p className="mt-4 text-sm text-white/75">{subtitle}</p>
        </div>

        {children}
      </div>
    </section>
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

  // ✅ Menú actualizado (Planes vuelve a ser ruta y agregamos Tarjetas de presentación)
  const NAV_ITEMS = useMemo(
    () => [
      { label: "Catálogo", href: "#catalogo" },
      { label: "Planes", href: "/planes" },
      { label: "Medios de pago", href: "#medios-de-pago" },
      { label: "Tarjetas de presentación", href: "/tarjetas-presentacion" },
      { label: "15 años", href: "/15-anos" },
      { label: "Cumpleaños", href: "/cumpleanos" },
      { label: "Contacto", href: "/contacto" },
    ],
    []
  );

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
    const id = setInterval(() => setBgIndex((i) => (i + 1) % HERO_BGS.length), 6500);
    return () => clearInterval(id);
  }, [HERO_BGS.length]);

  const TINT =
    "linear-gradient(120deg, rgba(255,173,204,0.22), rgba(195,185,255,0.12), rgba(0,0,0,0.06))";

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

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 text-sm text-white/80 md:flex">
            {NAV_ITEMS.map((item) =>
              item.href.startsWith("#") ? (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="hover:text-white transition"
                >
                  {item.label}
                </button>
              ) : (
                <Link key={item.label} href={item.href} className="hover:text-white transition">
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#catalogo"
              className="hidden rounded-full bg-white/14 px-5 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-white/20 backdrop-blur hover:bg-white/18 md:inline-flex"
            >
              Ver diseños
            </a>

            {/* Hamburger */}
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

        {/* Mobile drawer */}
        {menuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <button
              aria-label="Cerrar menú"
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 bg-black/55"
            />
            <div className="absolute right-0 top-0 h-full w-[86%] max-w-sm border-l border-white/10 bg-black/35 backdrop-blur-2xl">
              <div className="flex items-center justify-between px-6 py-5">
                <div className={`${headingFont.className} text-sm font-semibold`}>
                  {brand}
                </div>
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
                  {NAV_ITEMS.map((item) =>
                    item.href.startsWith("#") ? (
                      <button
                        key={item.label}
                        onClick={() => handleNavClick(item.href)}
                        className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-white/85 hover:bg-white/10 transition"
                      >
                        <span>{item.label}</span>
                        <span className="text-white/50">→</span>
                      </button>
                    ) : (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 hover:bg-white/10 transition"
                      >
                        <span>{item.label}</span>
                        <span className="text-white/50">→</span>
                      </Link>
                    )
                  )}
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
                    onClick={() => handleNavClick("#catalogo")}
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
              style={{ backgroundImage: `url(${src})`, opacity: i === bgIndex ? 1 : 0 }}
            />
          ))}
        </div>

        <div className="absolute inset-0" style={{ backgroundImage: TINT }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/18 via-black/5 to-black/55" />

        <div className="pointer-events-none absolute inset-0 flex items-start justify-center pt-20 md:pt-24">
          <p
            className={`${headingFont.className} select-none text-center leading-none tracking-tight`}
            style={{ fontSize: "clamp(4rem, 14vw, 11rem)", color: "rgba(255,255,255,0.14)" }}
          >
            FOREVER
          </p>
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pb-20 pt-28 text-center md:pt-32">
          <p className="text-xs tracking-[0.35em] text-white/80">{hero.kicker}</p>
          <h1 className={`${headingFont.className} mt-4 text-4xl leading-tight md:text-6xl`}>
            {hero.title}
          </h1>
          <p className="mt-5 max-w-2xl text-sm text-white/85 md:text-base">{hero.subtitle}</p>

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
              Catálogo
            </p>
            <h2 className={`${headingFont.className} mt-4 text-3xl sm:text-4xl text-black`}>
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

      {/* MEDIOS DE PAGO (glass + bg) */}
      <DarkBgSection
        id="medios-de-pago"
        title="Medios de pago"
        subtitle="Pagos rápidos y seguros para separar tu invitación."
        bgImage="https://i.pinimg.com/736x/6f/89/f3/6f89f3a099d84749ff585328fc149620.jpg"
      >
        <div className="grid gap-6 md:grid-cols-3">
          <PaymentCardDark title="Nequi" subtitle="Transferencia inmediata" badge="Popular" />
          <PaymentCardDark title="Daviplata" subtitle="Pago rápido desde tu celular" badge="Fácil" />
          <PaymentCardDark title="PSE" subtitle="Pago seguro desde tu banco" badge="Seguro" />
        </div>
      </DarkBgSection>

      {/* FOOTER */}
      <footer id="contacto" className="bg-white text-center text-sm text-black/50">
        <div className="border-t border-black/10 py-12">
          © {year} {brand} · Invitaciones de boda
        </div>
      </footer>
    </main>
  );
}
