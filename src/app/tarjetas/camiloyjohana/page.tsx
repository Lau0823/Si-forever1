"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Sora, Plus_Jakarta_Sans } from "next/font/google";

const headingFont = Sora({ subsets: ["latin"], weight: ["600", "700"] });
const bodyFont = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

type Countdown = { days: number; hours: number; minutes: number; seconds: number };

function getCountdown(target: Date): Countdown {
  const now = new Date().getTime();
  const diff = Math.max(0, target.getTime() - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

function Pill({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-rose-100 bg-white/70 px-4 py-3 shadow-sm backdrop-blur">
      {/* value puede ser number o "--" */}
      <span className="text-2xl font-semibold text-rose-900 tabular-nums">{value}</span>
      <span className="text-[11px] tracking-wide text-rose-700/80">{label.toUpperCase()}</span>
    </div>
  );
}

function Card({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle?: string;
  icon?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-rose-100 bg-white p-5 shadow-sm md:p-7">
      {/* glow sakura */}
      <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-rose-100/50 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-12 -bottom-12 h-44 w-44 rounded-full bg-pink-100/40 blur-3xl" />

      <div className="relative">
        <div className="flex items-start gap-3">
          {icon ? (
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-rose-100 bg-rose-50 text-lg shadow-sm">
              {icon}
            </div>
          ) : null}

          <div className="min-w-0">
            <h2 className={`${headingFont.className} text-xl text-rose-950 md:text-2xl`}>{title}</h2>
            {subtitle ? <p className="mt-1 text-sm text-rose-900/70">{subtitle}</p> : null}
          </div>
        </div>

        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}

function Input({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-sm text-rose-900/80">{label}</span>
      <input
        {...props}
        className="mt-1 w-full rounded-2xl border border-rose-200 bg-white px-4 py-3 text-rose-950 placeholder:text-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-300"
      />
    </label>
  );
}

function TextArea({
  label,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-sm text-rose-900/80">{label}</span>
      <textarea
        {...props}
        className="mt-1 min-h-[110px] w-full rounded-2xl border border-rose-200 bg-white px-4 py-3 text-rose-950 placeholder:text-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-300"
      />
    </label>
  );
}

/**
 * ✅ PARA PEGAR LINK DE PINTEREST:
 * Pega una URL pública en `src`.
 * Ejemplo: "https://i.pinimg.com/564x/xx/yy/zz.jpg"
 */
function ImageTile({
  src,
  ratio = "landscape",
  caption,
}: {
  src?: string;
  ratio?: "square" | "portrait" | "landscape";
  caption?: string;
}) {
  const ratios = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[16/9]",
  } as const;

  return (
    <figure className="w-full">
      <div
        className={[
          "relative w-full overflow-hidden rounded-3xl border border-rose-100 bg-rose-50 shadow-sm",
          ratios[ratio],
        ].join(" ")}
      >
        {src ? (
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-[1.03]"
            style={{ backgroundImage: `url(${src})` }}
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center px-4 text-center">
            <div className="rounded-2xl border border-rose-100 bg-white/70 px-4 py-3 shadow-sm backdrop-blur">
              <p className="text-sm font-medium text-rose-400"></p>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-white/35 via-transparent to-transparent" />
      </div>

      {caption ? <figcaption className="mt-2 text-xs text-rose-900/60">{caption}</figcaption> : null}
    </figure>
  );
}

export default function Page() {
  // ✅ Edita datos del evento
  const couple = { a: "Camilo", b: "Johana" };
  const event = {
    dateISO: "2026-06-20T17:00:00",
    dateText: "20 de junio, 2026 • 5:00 p.m.",
    placeName: "Hacienda Sakura",
    address: "Km 5 vía… (Cota)",
    mapsLink: "https://maps.google.com", // opcional
  };

  // ✅✅✅ AQUÍ PEGAS EL LINK DE PINTEREST DEL BANNER (foto de los novios)
  // Ejemplo: "https://i.pinimg.com/564x/xx/yy/zz.jpg"
  const bannerImagePinterestLink = "https://i.pinimg.com/736x/c2/a7/0a/c2a70a0e02cbfe2b23070bff79aa39e9.jpg";

  // ✅✅✅ AQUÍ PEGAS LINKS DE PINTEREST PARA LAS IMÁGENES QUE SE USAN EN EL DRESS CODE (2 imágenes)
  const dressCodePinterest = {
    img1: "https://i.pinimg.com/736x/52/cd/46/52cd469e8aff08002715190d987c97c7.jpg", 
    img2: "https://i.pinimg.com/1200x/44/dc/2e/44dc2e87f733f1e5820a792ba9fd831f.jpg", 
  };

  // Countdown state
  const targetDate = useMemo(() => new Date(event.dateISO), [event.dateISO]);
  const [countdown, setCountdown] = useState<Countdown>(() => getCountdown(targetDate));

  // ✅ FIX Hydration: solo mostramos countdown real cuando el cliente montó
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setCountdown(getCountdown(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  // Form (demo)
  const [song, setSong] = useState({ name: "", artist: "", note: "" });

  function submit(label: string) {
    alert(`${label} enviado ✅ (demo)\nLuego lo conectas a tu API/Sheets/DB.`);
  }

  return (
    <main className={`${bodyFont.className} relative min-h-screen bg-white text-rose-950`}>
      {/* 🌸 Petals layer */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="petal absolute -top-10 h-3 w-5"
            style={{
              left: `${(i * 100) / 20}%`,
              animationDelay: `${i * 0.55}s`,
              animationDuration: `${10 + (i % 7)}s`,
              transform: `rotate(${(i * 19) % 360}deg)`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl border border-rose-200 bg-rose-50 shadow-sm" />
          <div>
            <p className="text-xs tracking-wide text-rose-900/70">INVITACIÓN</p>
            <p className={`${headingFont.className} text-lg leading-none text-rose-950`}>Boda  C&J</p>
          </div>
        </div>

        <a
          href="#cards"
          className="rounded-full bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700"
        >
          Ver información
        </a>
      </header>

      {/* ✅ BANNER + COUNTDOWN */}
      <section className="mx-auto max-w-6xl px-4 pb-10 md:pb-14">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-rose-100 bg-white shadow-sm">
          <div className="relative h-[460px] md:h-[560px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                // ✅ si no pones link, se ve un fondo sakura suave
                backgroundImage: bannerImagePinterestLink
                  ? `url(${bannerImagePinterestLink})`
                  : "radial-gradient(circle at 20% 20%, rgba(251,207,232,0.55), transparent 55%), radial-gradient(circle at 80% 30%, rgba(253,164,175,0.35), transparent 55%), linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0.95))",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/35 to-white/10" />

            <div aria-hidden className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-rose-200/25 blur-3xl" />
            <div aria-hidden className="absolute -right-24 top-24 h-64 w-64 rounded-full bg-pink-200/20 blur-3xl" />

            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
              <p className="text-xs md:text-sm tracking-[0.25em] text-rose-900/70">NOS CASAMOS</p>
              <h1 className={`${headingFont.className} mt-2 text-4xl md:text-6xl text-rose-950`}>
                {couple.a} &amp; {couple.b}
              </h1>
              <p className="mt-2 text-base md:text-lg text-rose-950/80">{event.dateText}</p>

              {/* ✅ Countdown sin hydration error */}
              <div className="mt-6 flex flex-wrap gap-3">
                {mounted ? (
                  <>
                    <Pill label="Días" value={countdown.days} />
                    <Pill label="Horas" value={countdown.hours} />
                    <Pill label="Min" value={countdown.minutes} />
                    <Pill label="Seg" value={countdown.seconds} />
                  </>
                ) : (
                  <>
                    <Pill label="Días" value="--" />
                    <Pill label="Horas" value="--" />
                    <Pill label="Min" value="--" />
                    <Pill label="Seg" value="--" />
                  </>
                )}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#cards"
                  className="rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-rose-700"
                >
                  Ver información
                </a>
              </div>

              {!bannerImagePinterestLink ? (
                <p className="mt-4 text-xs text-rose-900/60">
                   <span className="font-mono"></span>
                </p>
              ) : null}
            </div>
          </div>

          <div className="h-1 w-full bg-gradient-to-r from-rose-100 via-rose-200 to-rose-100" />
        </div>
      </section>

      {/* ✅ GRID DE 2 CARDS */}
      <section id="cards" className="mx-auto w-full max-w-6xl px-4 pb-12">
        <div className="grid gap-5 md:grid-cols-2">
          {/* 1) Sugerir canción */}
          <Card title="Sugerir canción" subtitle="Ayúdanos a armar la playlist 🎶" icon="🎵">
            <form
              className="grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                submit("Canción");
              }}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="Canción"
                  placeholder="Ej: Perfect"
                  value={song.name}
                  onChange={(e) => setSong((s) => ({ ...s, name: e.target.value }))}
                  required
                />
                <Input
                  label="Artista"
                  placeholder="Ej: Ed Sheeran"
                  value={song.artist}
                  onChange={(e) => setSong((s) => ({ ...s, artist: e.target.value }))}
                  required
                />
              </div>
              <TextArea
                label="Nota (opcional)"
                placeholder="¿Por qué la recomiendas?"
                value={song.note}
                onChange={(e) => setSong((s) => ({ ...s, note: e.target.value }))}
              />

              <button className="rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-rose-700">
                Enviar sugerencia
              </button>
            </form>
          </Card>

          {/* 2) Lugar */}
          <Card title="Lugar" subtitle="Dónde será la celebración 📍" icon="📍">
            <div className="grid gap-4">
              <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4">
                <p className={`${headingFont.className} text-lg text-rose-950`}>{event.placeName}</p>
                <p className="mt-1 text-sm text-rose-900/70">{event.address}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href={event.mapsLink || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-rose-200 bg-white px-5 py-3 text-center text-sm font-semibold text-rose-900 shadow-sm hover:bg-rose-50"
                >
                  Abrir en Maps
                </a>
                <a
                  href="#"
                  className="rounded-full border border-rose-200 bg-white px-5 py-3 text-center text-sm font-semibold text-rose-900 shadow-sm hover:bg-rose-50"
                >
                  Cómo llegar
                </a>
              </div>

              <p className="text-xs text-rose-900/60">
                (Opcional)
              </p>
            </div>
          </Card>

          {/* 3) Itinerario */}
          <Card title="Itinerario" subtitle="Horarios del día 🕊️" icon="🗓️">
            <div className="grid gap-3">
              {[
                { time: "5:00 p.m.", label: "Llegada de invitados" },
                { time: "5:30 p.m.", label: "Ceremonia" },
                { time: "6:15 p.m.", label: "Brindis & fotos" },
                { time: "7:30 p.m.", label: "Cena" },
                { time: "9:00 p.m.", label: "Fiesta" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-rose-300" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-rose-950">{item.time}</p>
                    <p className="text-sm text-rose-900/70">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* 4) Dress code */}
          <Card title="Dress code" subtitle="Vístete con nuestra vibra ✨" icon="👗">
            <div className="grid gap-4">
              <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4">
                <p className={`${headingFont.className} text-lg text-rose-950`}>Formal elegante</p>
                <p className="mt-1 text-sm text-rose-900/70">
                  Tonos pastel, nude y rosados suaves. Evitar blanco.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {["bg-rose-100", "bg-rose-200", "bg-pink-100", "bg-amber-50", "bg-neutral-100"].map((c) => (
                  <div key={c} className={`h-10 w-10 rounded-2xl border border-rose-100 ${c}`} />
                ))}
              </div>

              {/* ✅ Aquí van los links de Pinterest del dress code */}
              <div className="grid gap-4 sm:grid-cols-2">
                <ImageTile
                  ratio="portrait"
                  src={dressCodePinterest.img1 || undefined}
                  caption="SUGERIDO"
                />
                <ImageTile
                  ratio="portrait"
                  src={dressCodePinterest.img2 || undefined}
                  caption="SUGERIDO"
                />
              </div>
            </div>
          </Card>

          {/* 5) Regalos */}
          <Card title="Regalos" subtitle="Opciones para apoyarnos 💗" icon="🎁">
            <div className="grid gap-4">
              <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4">
                <p className={`${headingFont.className} text-lg text-rose-950`}>Lluvia de sobres</p>
                <p className="mt-1 text-sm text-rose-900/70">
                  Nuestro mejor regalo es tu presencia. Si deseas apoyarnos, tendremos un espacio para sobres el día del evento.
                </p>
              </div>

              <details className="rounded-2xl border border-rose-100 bg-white p-4">
                <summary className="cursor-pointer text-sm font-semibold text-rose-900">Ver datos (opcional)</summary>
                <div className="mt-3 grid gap-2 text-sm text-rose-900/70">
                  <p>
                    <span className="font-medium text-rose-950">Banco:</span> —
                  </p>
                  <p>
                    <span className="font-medium text-rose-950">Cuenta:</span> —
                  </p>
                  <p>
                    <span className="font-medium text-rose-950">Nombre:</span> —
                  </p>
                </div>
              </details>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-4 pb-12">
        <div className="rounded-[2.25rem] border border-rose-100 bg-white p-8 text-center shadow-sm">
          <p className={`${headingFont.className} text-2xl text-rose-950`}>Gracias por ser parte de nuestra historia 🌸</p>
          <p className="mt-2 text-sm text-rose-900/70"></p>
        </div>
      </footer>

      {/* CSS global inline */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        .petal {
          background: radial-gradient(circle at 30% 30%, rgba(251, 207, 232, 0.95), rgba(244, 114, 182, 0.35));
          border: 1px solid rgba(251, 113, 133, 0.15);
          border-radius: 9999px;
          opacity: 0.6;
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          filter: blur(0.2px);
        }
        @keyframes fall {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          100% {
            transform: translate3d(40px, 110vh, 0) rotate(260deg);
            opacity: 0;
          }
        }
      `}</style>
    </main>
  );
}
