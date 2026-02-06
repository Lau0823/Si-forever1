"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Sora, Plus_Jakarta_Sans } from "next/font/google";

const headingFont = Sora({ subsets: ["latin"], weight: ["600", "700"] });
const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// ✅ Botón glass reutilizable (acepta /#catalogo y /#contacto)
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
      className={cx(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold",
        "bg-white/14 text-white ring-1 ring-white/25 backdrop-blur",
        "hover:bg-white/18 active:scale-[0.99] transition",
        className
      )}
    >
      {children}
    </a>
  );
}

export default function ContactPage() {
  const brand = "Sí, Forever";

  // ✅ WhatsApp (tu número)
  const phoneE164 = "57" + "31202345742";

  const HERO_BGS = useMemo(
    () => [
      "https://i.pinimg.com/736x/72/74/8e/72748ebad522415a3fa42a7b31cf1122.jpg",
      "https://i.pinimg.com/736x/6f/89/f3/6f89f3a099d84749ff585328fc149620.jpg",
      "https://i.pinimg.com/736x/8b/b9/04/8bb9041d34d2559140c5b000c4d5e79f.jpg",
    ],
    []
  );

  const tint =
    "linear-gradient(120deg, rgba(255,173,204,0.22), rgba(195,185,255,0.12), rgba(0,0,0,0.06))";

  // UI state
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState<"cotizar" | "duda" | "soporte">("cotizar");
  const [mensaje, setMensaje] = useState("");

  const defaultMsg = useMemo(() => {
    const base =
      tipo === "cotizar"
        ? "Hola 💗 Quiero cotizar una invitación digital con Sí, Forever."
        : tipo === "duda"
          ? "Hola 💗 Tengo una pregunta sobre las invitaciones."
          : "Hola 💗 Necesito ayuda con una invitación que ya compré.";
    return base;
  }, [tipo]);

  const finalText = useMemo(() => {
    const nameLine = nombre.trim() ? `Soy ${nombre.trim()}.\n` : "";
    const body = (mensaje.trim() || defaultMsg).trim();
    return `${nameLine}${body}`;
  }, [nombre, mensaje, defaultMsg]);

  const whatsappHref = useMemo(() => {
    const encoded = encodeURIComponent(finalText);
    return `https://wa.me/${phoneE164}?text=${encoded}`;
  }, [finalText, phoneE164]);

  return (
    <main className={cx(bodyFont.className, "text-white")}>
      {/* ✅ Scroll suave para anclas */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* NAV */}
      <header className="fixed left-0 right-0 top-0 z-40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className={cx(headingFont.className, "text-sm font-semibold tracking-tight")}
          >
            {brand}
          </Link>

          {/* ✅ IMPORTANTE: SIEMPRE volver al HOME + ancla */}
          <nav className="hidden items-center gap-8 text-sm text-white/80 md:flex">
            <a href="/#catalogo" className="hover:text-white">
              Catálogo
            </a>
            <a href="/#contacto" className="hover:text-white">
              Contacto
            </a>
          </nav>

          {/* ✅ Ver diseños -> HOME + catálogo */}
          <a
            href="/#catalogo"
            className="rounded-full bg-white/14 px-5 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-white/20 backdrop-blur hover:bg-white/18"
          >
            Ver diseños
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-[100svh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BGS[1]})` }}
        />
        <div className="absolute inset-0" style={{ backgroundImage: tint }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/18 via-black/8 to-black/65" />

        <div className="pointer-events-none absolute inset-0 flex items-start justify-center pt-20 md:pt-24">
          <p
            className={cx(headingFont.className, "select-none text-center leading-none tracking-tight")}
            style={{
              fontSize: "clamp(4rem, 14vw, 11rem)",
              color: "rgba(255,255,255,0.14)",
            }}
          >
            CONTACTO
          </p>
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pb-20 pt-28 text-center md:pt-32">
          <p className="text-xs tracking-[0.35em] text-white/80">SÍ, FOREVER</p>

          <h1 className={cx(headingFont.className, "mt-4 text-4xl leading-tight md:text-6xl")}>
            Hablemos por WhatsApp
          </h1>

          <p className="mt-5 max-w-2xl text-sm text-white/85 md:text-base">
            Te respondemos rápido 💗 Cuéntanos tu idea y te ayudamos a elegir el estilo perfecto.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-black shadow-sm hover:bg-white/90 active:scale-[0.99] transition"
            >
              Abrir chat
            </button>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-white/14 px-7 py-3 text-sm font-semibold text-white ring-1 ring-white/25 backdrop-blur hover:bg-white/18 active:scale-[0.99] transition"
            >
              Ir directo a WhatsApp →
            </a>

            {/* ✅ Ver catálogo -> HOME + ancla */}
            <GlassButton href="/#catalogo">Ver catálogo</GlassButton>
          </div>

          <div className="mt-8 text-xs text-white/70">
            {/* ✅ bajar al catálogo del HOME */}
            <a
              href="/#catalogo"
              className="rounded-full bg-white/12 px-4 py-2 ring-1 ring-white/20 backdrop-blur hover:bg-white/20"
            >
              ↓ Ver catálogo
            </a>
          </div>

          <div className="mt-10 w-full max-w-3xl rounded-[32px] bg-white/10 p-6 ring-1 ring-white/20 backdrop-blur-xl md:p-8">
            <div className="grid gap-6 text-left md:grid-cols-3">
              <div>
                <p className="text-xs tracking-[0.3em] text-white/75">RESPUESTA</p>
                <p className={cx(headingFont.className, "mt-2 text-xl")}>Rápida</p>
                <p className="mt-2 text-sm text-white/80">
                  Normalmente contestamos en minutos (horario hábil).
                </p>
              </div>

              <div>
                <p className="text-xs tracking-[0.3em] text-white/75">PERSONALIZACIÓN</p>
                <p className={cx(headingFont.className, "mt-2 text-xl")}>A tu estilo</p>
                <p className="mt-2 text-sm text-white/80">
                  Foto, colores, texto, lugar, itinerario y música.
                </p>
              </div>

              <div>
                <p className="text-xs tracking-[0.3em] text-white/75">NÚMERO</p>
                <p className={cx(headingFont.className, "mt-2 text-xl")}>WhatsApp</p>
                <p className="mt-2 text-sm text-white/80">+57 312 023 45742</p>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL */}
        {open && (
          <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 backdrop-blur-sm md:items-center"
            role="dialog"
            aria-modal="true"
            aria-label="Contacto WhatsApp"
            onClick={() => setOpen(false)}
          >
            <div
              className="w-full max-w-2xl overflow-hidden rounded-[28px] bg-white/10 ring-1 ring-white/25 backdrop-blur-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/15 px-6 py-4">
                <div>
                  <p className="text-xs tracking-[0.35em] text-white/70">SÍ, FOREVER</p>
                  <p className={cx(headingFont.className, "mt-1 text-xl")}>Escribe tu mensaje</p>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-white/15 transition"
                >
                  Cerrar
                </button>
              </div>

              <div className="px-6 py-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-white/75">Tu nombre (opcional)</label>
                    <input
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Ej: Laura"
                      className="mt-2 w-full rounded-2xl bg-white/10 px-4 py-3 text-sm text-white ring-1 ring-white/20 outline-none placeholder:text-white/40 focus:ring-white/35"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-white/75">¿Qué necesitas?</label>
                    <select
                      value={tipo}
                      onChange={(e) => setTipo(e.target.value as any)}
                      className="mt-2 w-full rounded-2xl bg-white/10 px-4 py-3 text-sm text-white ring-1 ring-white/20 outline-none focus:ring-white/35"
                    >
                      <option className="text-black" value="cotizar">
                        Cotizar
                      </option>
                      <option className="text-black" value="duda">
                        Pregunta
                      </option>
                      <option className="text-black" value="soporte">
                        Soporte
                      </option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-xs font-semibold text-white/75">
                    Mensaje{" "}
                    <span className="ml-2 text-white/50 font-normal">
                      (si lo dejas vacío, usamos uno automático)
                    </span>
                  </label>
                  <textarea
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    rows={5}
                    placeholder={defaultMsg}
                    className="mt-2 w-full resize-none rounded-2xl bg-white/10 px-4 py-3 text-sm text-white ring-1 ring-white/20 outline-none placeholder:text-white/40 focus:ring-white/35"
                  />
                </div>

                <div className="mt-4 rounded-2xl bg-white/8 p-4 ring-1 ring-white/15">
                  <p className="text-xs tracking-[0.35em] text-white/60">VISTA PREVIA</p>
                  <p className="mt-2 whitespace-pre-line text-sm text-white/90">{finalText}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-white/15 px-6 py-4 md:flex-row md:justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setMensaje("");
                    setNombre("");
                    setTipo("cotizar");
                  }}
                  className="rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-white/15 transition"
                >
                  Limpiar
                </button>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-black shadow-sm hover:bg-white/90 active:scale-[0.99] transition"
                >
                  Enviar por WhatsApp →
                </a>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="bg-white text-center text-sm text-black/50">
        <div className="border-t border-black/10 py-12">
          © {new Date().getFullYear()} {brand}
          <span className="mx-2">·</span>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-black/20 underline-offset-4 hover:decoration-black/50"
          >
            WhatsApp
          </a>
        </div>
      </footer>
    </main>
  );
}
