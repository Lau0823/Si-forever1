"use client";

import React from "react";
import Link from "next/link";

type Invitation = {
  id: string;
  title: string;
  style: string;
  image: string;
};

const INVITATIONS: Invitation[] = [
  {
    id: "editorial-01",
    title: "Editorial Sunset",
    style: "Editorial • Fotografía",
    image:
      "https://i.pinimg.com/736x/a2/09/de/a209def8fcdd702e0fcbed3b5dec9d51.jpg",
  },
  {
    id: "minimal-02",
    title: "Minimal White",
    style: "Minimal • Clean",
    image:
      "https://i.pinimg.com/736x/85/e9/b8/85e9b807b795b8e1627490b99bdd8770.jpg",
  },
  {
    id: "paper-03",
    title: "Paper Mood",
    style: "Papel • Moderno",
    image:
      "https://i.pinimg.com/1200x/87/6d/9e/876d9eebc4e83837649c3ecee68980fb.jpg",
  },
  {
    id: "bw-04",
    title: "Black & White",
    style: "B&N • Editorial",
    image:
      "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "soft-05",
    title: "Soft Romance",
    style: "Romántico • Claro",
    image:
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "nature-06",
    title: "Nature Lovers",
    style: "Natural • Editorial",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80",
  },
];

export default function HomePage() {
  return (
    <main className="bg-white text-black">
      {/* NAVBAR */}
      <header className="sticky top-0 z-30 border-b border-black/10 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 font-serif text-5xl tracking-wide md:text-6xl">
          <Link href="/" className="text-sm font-semibold tracking-tight">
            Sí, Forever
          </Link>

          <nav className="hidden gap-8 text-sm text-black/70 md:flex">
            <a href="#catalogo" className="hover:text-black">
              Catálogo
            </a>
            <a href="#contacto" className="hover:text-black">
              Contacto
            </a>
          </nav>

          <a
            href="#catalogo"
            className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Ver diseños
          </a>
        </div>
      </header>

      {/* HERO EDITORIAL */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2000&q=80"
          alt="Pareja editorial"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
          <div className="max-w-2xl text-white">
            <p className="mb-4 text-xs tracking-[0.3em] uppercase">
              Save the date
            </p>

            <h1 className="text-4xl font-light leading-tight sm:text-6xl">
              Invitaciones de boda
              <br />
              <span className="font-semibold">editoriales & modernas</span>
            </h1>

            <p className="mt-6 text-sm text-white/80 sm:text-base">
              Diseños minimalistas inspirados en fotografía, moda y revistas.
            </p>

            <a
              href="#catalogo"
              className="mt-8 inline-block rounded-full bg-white px-8 py-3 text-sm font-semibold text-black hover:bg-white/90"
            >
              Explorar catálogo
            </a>
          </div>
        </div>
      </section>

      {/* CATALOGO */}
      <section id="catalogo" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-black/50">
            Catálogo
          </p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Elige tu estilo
          </h2>
          <p className="mt-4 text-black/60">
            Seis diseños base totalmente personalizables.
          </p>
        </div>

        {/* GRID 3X */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INVITATIONS.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm transition hover:shadow-lg"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-5">
                <p className="text-xs uppercase tracking-widest text-black/50">
                  {item.style}
                </p>
                <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>

                <div className="mt-4 flex gap-3">
                  {/* ✅ SOLO CAMBIO: Ver demo ahora va a /tarjetas/[id] */}
                  <Link
                    href={`/tarjetas/lauyantonio`}
                    className="flex-1 rounded-full border border-black/15 px-4 py-2 text-center text-sm hover:bg-black/5"
                  >
                    Ver demo
                  </Link>

                  <button className="flex-1 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
                    Elegir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer
        id="contacto"
        className="border-t border-black/10 py-12 text-center text-sm text-black/50"
      >
        © {new Date().getFullYear()} Sí, Forever · Invitaciones de boda
      </footer>
    </main>
  );
}
