"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";

/* =========================
   Utils
========================= */
function isLeapYear(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
function daysInMonth(year: number, monthIndex0: number) {
  const days = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return days[monthIndex0];
}
function clampNonNegative(n: number) {
  return n < 0 ? 0 : n;
}
function pad2(n: number) {
  return String(n).padStart(2, "0");
}

/* =========================
   Arroz cayendo DENTRO del periódico
========================= */
function RiceRainInCard({ show, density = 140 }: { show: boolean; density?: number }) {
  const pieces = useMemo(() => {
    const colors = ["#f7f1e3", "#f3ead6", "#fffaf0", "#efe3c6"];
    return Array.from({ length: density }).map((_, i) => {
      const left = Math.random() * 100; // %
      const delay = Math.random() * 0.35; // s
      const dur = 1.6 + Math.random() * 1.3; // s
      const w = 3.5 + Math.random() * 4.5; // px
      const h = w * (2.0 + Math.random() * 1.4);
      const rot0 = Math.random() * 360;
      const spin = 260 + Math.random() * 700;
      const drift = (Math.random() - 0.5) * 220; // px
      const wobble = 8 + Math.random() * 18; // px
      const opacity = 0.55 + Math.random() * 0.45;
      const blur = Math.random() < 0.18 ? 0.7 : 0;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const topOffset = -12 - Math.random() * 10;
      return { i, left, delay, dur, w, h, rot0, spin, drift, wobble, opacity, blur, color, topOffset };
    });
  }, [show, density]);

  if (!show) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-[40] overflow-hidden">
      <style>{`
        @keyframes riceCardFall {
          0%   { transform: translate3d(var(--x), var(--y0), 0) rotate(var(--r)); opacity: 0; }
          12%  { opacity: var(--o); }
          55%  { transform: translate3d(calc(var(--x) + var(--wob)), 55%, 0) rotate(calc(var(--r) + var(--spin) * 0.55)); }
          100% { transform: translate3d(calc(var(--x) * -1), 120%, 0) rotate(calc(var(--r) + var(--spin))); opacity: 0; }
        }
      `}</style>

      {pieces.map((p) => (
        <span
          key={p.i}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: `${p.topOffset}%`,
            width: `${p.w}px`,
            height: `${p.h}px`,
            background: p.color,
            opacity: p.opacity,
            filter: p.blur ? `blur(${p.blur}px)` : undefined,
            animation: `riceCardFall ${p.dur}s cubic-bezier(.12,.72,.22,.98) forwards`,
            animationDelay: `${p.delay}s`,
            borderRadius: "999px",
            boxShadow: "0 1px 0 rgba(0,0,0,0.10), 0 2px 14px rgba(0,0,0,0.06)",
            ...( {
              ["--x" as any]: `${p.drift}px`,
              ["--wob" as any]: `${(Math.random() < 0.5 ? -1 : 1) * p.wobble}px`,
              ["--r" as any]: `${p.rot0}deg`,
              ["--spin" as any]: `${p.spin}deg`,
              ["--o" as any]: `${p.opacity}`,
              ["--y0" as any]: `-${40 + Math.random() * 30}px`,
            } as any ),
          }}
        />
      ))}
    </div>
  );
}

/* =========================
   Carrusel simple (4 fotos)
========================= */
function PhotoCarousel({ images, autoMs = 3800 }: { images: string[]; autoMs?: number }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!images.length) return;
    const id = window.setInterval(() => setIdx((p) => (p + 1) % images.length), autoMs);
    return () => window.clearInterval(id);
  }, [images.length, autoMs]);

  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  return (
    <div className="rounded-3xl border border-neutral-900/20 bg-[#fffdf6] p-3 shadow-[0_18px_50px_rgba(0,0,0,0.12)]">
      <div className="relative overflow-hidden rounded-2xl bg-neutral-100">
        <div className="relative aspect-[16/11]">
          <Image
            src={images[idx]}
            alt={`Foto ${idx + 1}`}
            fill
            className="object-cover object-[50%_20%]"
            priority={idx === 0}
          />
        </div>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-between p-2">
          <button
            type="button"
            onClick={prev}
            className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/45 bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/45"
            aria-label="Anterior"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/45 bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/45"
            aria-label="Siguiente"
          >
            ›
          </button>
        </div>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/40 bg-black/30 px-3 py-1 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIdx(i)}
                className={[
                  "h-2 w-2 rounded-full transition",
                  i === idx ? "bg-white" : "bg-white/45 hover:bg-white/80",
                ].join(" ")}
                aria-label={`Ir a foto ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs font-semibold tracking-[0.18em] uppercase text-neutral-800">
          Galería · 4 fotos
        </div>
        <div className="text-[11px] text-neutral-700">Flechas o cambio automático.</div>
      </div>
    </div>
  );
}

/* =========================
   Modal lista de regalos
========================= */
function GiftModal({
  open,
  onClose,
  gifts,
}: {
  open: boolean;
  onClose: () => void;
  gifts: string[];
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[95]">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/35 backdrop-blur-[2px]"
        aria-label="Cerrar"
      />

      <div className="relative mx-auto mt-16 w-[min(760px,92vw)]">
        <div className="paperTexture relative overflow-hidden rounded-[28px] border border-neutral-900/25 bg-[#fffdf7] shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
          <div className="flex items-center justify-between border-b border-neutral-900/15 px-5 py-4">
            <div>
              <div className="text-xs font-black tracking-[0.22em] uppercase text-neutral-800">
                Lista de regalos
              </div>
              <div className="mt-1 text-sm text-neutral-700">
                Si deseas bendecirnos, aquí tienes algunas ideas 
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-900/20 bg-[#fbf8f1] text-neutral-900 transition hover:bg-[#f3ead6]"
              aria-label="Cerrar modal"
            >
              ✕
            </button>
          </div>

          <div className="px-5 py-5">
            <div className="grid gap-3 sm:grid-cols-2">
              {gifts.map((g, i) => (
                <div
                  key={`${g}-${i}`}
                  className="rounded-2xl border border-neutral-900/15 bg-[#fbf8f1] px-4 py-4"
                >
                  <div className="text-xs font-extrabold tracking-[0.18em] uppercase text-neutral-800">
                    Opción {i + 1}
                  </div>
                  <div className="mt-2 text-base font-semibold text-neutral-900">{g}</div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-neutral-900/15 bg-white/70 p-4 text-sm text-neutral-700 leading-6">
              También puedes escribirnos para coordinar cualquier detalle. ¡Gracias por tu cariño!
            </div>
          </div>

          <div className="border-t border-neutral-900/15 px-5 py-4">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex w-full items-center justify-center rounded-full bg-neutral-900 px-4 py-4 text-sm font-extrabold tracking-[0.18em] uppercase text-white transition hover:bg-neutral-800"
            >
              Cerrar
            </button>
          </div>
        </div>

        <div className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-neutral-900/25 bg-[#fffdf7] px-4 py-2 text-[11px] font-semibold tracking-[0.22em] uppercase text-neutral-800 shadow-sm">
          Edición especial
        </div>

        <style>{`
          .paperTexture{
            background-image: radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px);
            background-size: 22px 22px;
            background-position: 0 0;
          }
        `}</style>
      </div>
    </div>
  );
}

/* =========================
   Page
========================= */
export default function Page() {
  // ===== Datos =====
  const coupleName = "MANUEL & PAULA";
  const cityLine = "Villavicencio · Meta · Colombia";
  const weddingDateLabel = "10 de mayo 2026";
  const ceremonyTimeLabel = "4:00 p.m.";
  const venueName = "Finca Palo & Rosa";
  const venueAddress = "Villavicencio — Vereda Apiay / vía Puerto López";

  // ✅ WhatsApp (dos números: novio / novia)
  const rsvpPhoneNovio = "573116533163"; // <-- cambia aquí
  const rsvpPhoneNovia = "57XXXXXXXXXX"; // <-- cambia aquí

  // ✅ Audio
  const audioSrc = "/audio/Kurt%20-%20La%20Mujer%20Perfecta%20(Lyric%20Video)%20%5B1%5D.MP3";

  // ✅ Fotos (4)
  const carouselImages = [
    "https://i.pinimg.com/1200x/28/80/b0/2880b0579a6b1f3280266cb423e98f05.jpg",
    "https://i.pinimg.com/736x/fc/8f/b0/fc8fb0ea308adb0c58d2cef9cac509b6.jpg",
    "https://i.pinimg.com/736x/80/95/67/809567eb5b3482007d54d1d0e1e1d025.jpg",
    "https://i.pinimg.com/1200x/06/a4/dd/06a4dd27969325bdec82d7f4ef09ed7a.jpg",
  ];

  const paperName = "llego el día";
  const paperDate = "SÁBADO · 10 MAYO, 2026";
  const paperRegion = "VILLAVICENCIO";
  const bigHeadline = coupleName;
  const subHeadline = "SE CASAN HOY";

  const historiaCorta = [
    { label: "Se conocieron", value: "Septiembre 2019 · en el trabajo" },
    { label: "Empezaron a salir", value: "Marzo 31, 2020" },
    { label: "Propuesta", value: "Diciembre 18, 2023" },
    { label: "Boda", value: "Mayo 10, 2026" },
  ];

  const itinerario = [
    { hora: "3:30 p.m.", evento: "Llegada de invitados" },
    { hora: "4:00 p.m.", evento: "Ceremonia" },
    { hora: "5:30 p.m.", evento: "Cóctel" },
    { hora: "7:00 p.m.", evento: "Recepción" },
    { hora: "8:30 p.m.", evento: "Primer baile" },
    { hora: "9:30 p.m.", evento: "Cena" },
    { hora: "10:30 p.m.", evento: "Corte del pastel" },
    { hora: "1:00 a.m.", evento: "Despedida" },
  ];

  const regalos = ["Nevera", "Plancha Air Fryer", "Lavadora", "Sala", "Comedor"];

  const tituloNota = "Querida familia y amigos";
  const cuerpoNota =
    "Gracias por acompañarnos y por ser parte de esta historia. Hoy comenzamos una nueva etapa y queremos celebrarla contigo: amor, música, abrazos y recuerdos para toda la vida.";

  // ✅ Versículo (parejas que se van a casar)
  const bibleVerseText =
    "Por encima de todo, vístanse de amor, que es el vínculo perfecto.";
  const bibleVerseRef = "Colosenses 3:14";

  const mapsQuery = useMemo(
    () => encodeURIComponent(`${venueName}, ${venueAddress}`),
    [venueName, venueAddress]
  );

  // ===== Fix hydration =====
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // ===== Música =====
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => setPlaying(false);
    const onError = () =>
      setAudioError("No se pudo cargar el audio. Revisa la ruta o el nombre del archivo.");

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      setAudioError(null);
      audio.load();
      audio.muted = false;
      if (audio.paused) await audio.play();
      else audio.pause();
    } catch {
      setAudioError(
        "Tu navegador bloqueó la reproducción. Verifica que el archivo exista en /public/audio y que la ruta sea correcta."
      );
    }
  };

  // ===== Cuenta regresiva =====
  const targetDate = useMemo(() => new Date("2026-05-10T16:00:00-05:00"), []);
  const [countdownMs, setCountdownMs] = useState<number>(0);

  useEffect(() => {
    if (!mounted) return;
    const tick = () => setCountdownMs(clampNonNegative(targetDate.getTime() - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [mounted, targetDate]);

  const cd = useMemo(() => {
    const totalSeconds = Math.floor(countdownMs / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { days, hours, minutes, seconds, done: mounted && countdownMs === 0 };
  }, [countdownMs, mounted]);

  // ===== Calendario =====
  const calYear = 2026;
  const calMonthIndex0 = 4;
  const highlightedDay = 10;

  const monthNamesEs = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const calendarCells = useMemo(() => {
    const firstDay = new Date(calYear, calMonthIndex0, 1).getDay();
    const startOffset = (firstDay + 6) % 7;
    const total = daysInMonth(calYear, calMonthIndex0);

    const cells: Array<{ day: number | null; isHighlight?: boolean }> = [];
    for (let i = 0; i < startOffset; i++) cells.push({ day: null });
    for (let d = 1; d <= total; d++) cells.push({ day: d, isHighlight: d === highlightedDay });
    while (cells.length % 7 !== 0) cells.push({ day: null });
    return cells;
  }, [calYear, calMonthIndex0, highlightedDay]);

  // ===== RSVP =====
  const [rsvp, setRsvp] = useState<"si" | "no">("si");
  const [form, setForm] = useState({
    nombre: "",
    whatsapp: "",
    asistentes: "1",
    mensaje: "",
  });

  const onChange =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const buildRsvpText = () =>
    encodeURIComponent(
      `RSVP — ${coupleName}\n\n` +
        `Respuesta: ${rsvp === "si" ? "ASISTO" : "NO ASISTO"}\n` +
        `Nombre: ${form.nombre}\n` +
        `WhatsApp: ${form.whatsapp || "-"}\n` +
        `Asistentes: ${rsvp === "si" ? form.asistentes : "0"}\n` +
        `Mensaje: ${form.mensaje || "-"}\n\n` +
        `Evento: ${weddingDateLabel} · ${ceremonyTimeLabel}\n` +
        `Lugar: ${venueName} — ${venueAddress}`
    );

  const submitRsvpTo = (phone: string) => (e: React.FormEvent) => {
    e.preventDefault();
    const text = buildRsvpText();
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  };

  // ===== Reveal + Arroz en carta =====
  const [revealed, setRevealed] = useState(false);
  const [riceInCard, setRiceInCard] = useState(false);

  // Modal regalos
  const [giftOpen, setGiftOpen] = useState(false);

  const onExtraExtra = async () => {
    const audio = audioRef.current;
    if (audio) {
      try {
        setAudioError(null);
        audio.load();
        audio.muted = false;
        await audio.play();
      } catch {
        setAudioError(
          "Tu navegador bloqueó la reproducción. Confirma que el audio exista en /public/audio y que la ruta sea correcta."
        );
      }
    }

    window.setTimeout(() => setRevealed(true), 200);

    setRiceInCard(true);
    window.setTimeout(() => setRiceInCard(false), 3200);
  };

  return (
    <main className="min-h-screen bg-[#efe6d2] text-neutral-900">
      {/* ===== Estilos vintage premium ===== */}
      <style>{`
        .stage { perspective: 1400px; }
        .paper {
          transform-style: preserve-3d;
          transform-origin: left center;
          backface-visibility: hidden;
          transition: transform 950ms cubic-bezier(.14,.82,.2,.98), filter 950ms cubic-bezier(.14,.82,.2,.98), opacity 950ms cubic-bezier(.14,.82,.2,.98);
        }
        .paperHidden { transform: rotateY(-92deg) translateX(-10px); filter: blur(10px); opacity: .2; }
        .paperShown { transform: rotateY(0deg) translateX(0px); filter: blur(0px); opacity: 1; }

        .fold:before{
          content:"";
          position:absolute;
          top:0; bottom:0;
          left:50%;
          width:2px;
          transform: translateX(-1px);
          background: rgba(0,0,0,0.16);
          opacity:.55;
          pointer-events:none;
        }
        .fold:after{
          content:"";
          position:absolute;
          top:0; bottom:0;
          left:50%;
          width:220px;
          transform: translateX(-50%);
          background: linear-gradient(to right, rgba(0,0,0,.16), rgba(0,0,0,0), rgba(0,0,0,.12));
          opacity:.18;
          pointer-events:none;
        }

        .paperTexture{
          background-color: #fbf6e8;
          background-image:
            radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.03), transparent 25%, rgba(0,0,0,0.03));
          background-size: 22px 22px, 100% 220px;
          background-position: 0 0, 0 0;
        }

        .ink { color: #1b1b1b; }
      `}</style>

      {/* Modal regalos */}
      <GiftModal open={giftOpen} onClose={() => setGiftOpen(false)} gifts={regalos} />

      {/* Audio */}
      <audio ref={audioRef} src={audioSrc} loop preload="auto" playsInline crossOrigin="anonymous" />

      {/* ===== Portada ===== */}
      {!revealed && (
        <div className="fixed inset-0 z-[90] bg-[#efe6d2] overflow-auto">
          <div className="min-h-screen grid place-items-start">
            <div className="w-full pt-10 sm:pt-12 md:pt-14 pb-10 grid place-items-center">
              <div className="relative w-[min(980px,92vw)]">
                <div className="paperTexture relative overflow-hidden rounded-[32px] border border-neutral-900/25 shadow-[0_30px_80px_rgba(0,0,0,0.12)]">
                  <div className="flex items-center justify-between border-b border-neutral-900/20 px-4 py-3 text-[11px] text-neutral-800 sm:px-6">
                    <span className="font-semibold tracking-[0.22em] uppercase">{paperRegion}</span>
                    <span className="font-semibold tracking-[0.18em] uppercase">{paperDate}</span>
                  </div>

                  <div className="px-4 pt-6 sm:px-6">
                    <div className="text-center font-serif text-4xl sm:text-6xl ink">{paperName}</div>
                    <div className="mt-4 border-t border-neutral-900/20" />
                  </div>

                  <div className="px-4 py-6 text-center sm:px-6">
                    <div className="font-black tracking-tight text-4xl sm:text-6xl md:text-7xl ink">
                      {bigHeadline}
                    </div>
                    <div className="mt-2 font-serif text-2xl sm:text-3xl tracking-wide ink">
                      {subHeadline}
                    </div>

                    <div className="mx-auto mt-6 max-w-2xl text-sm text-neutral-700">
                      Pulsa el botón para abrir el periódico de boda (flip), activar música y arroz dentro de la carta 🤍
                    </div>

                    <div className="mx-auto mt-6 max-w-xl rounded-3xl border border-neutral-900/15 bg-white/55 p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-[11px] font-black tracking-[0.2em] uppercase text-neutral-800">
                          Cuenta regresiva
                        </div>
                        <span className="rounded-full border border-neutral-900/20 bg-white/60 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] uppercase text-neutral-800">
                          {mounted ? (cd.done ? "¡HOY!" : "FALTA") : "CARGANDO"}
                        </span>
                      </div>

                      <div className="mt-3 grid grid-cols-4 gap-2">
                        {[
                          { label: "Días", value: mounted ? cd.days : 0 },
                          { label: "Horas", value: mounted ? cd.hours : 0 },
                          { label: "Min", value: mounted ? cd.minutes : 0 },
                          { label: "Seg", value: mounted ? cd.seconds : 0 },
                        ].map((x) => (
                          <div
                            key={x.label}
                            className="rounded-2xl border border-neutral-900/15 bg-white/70 p-3 text-center"
                          >
                            <div className="text-2xl font-black tabular-nums ink">{pad2(x.value)}</div>
                            <div className="mt-1 text-[11px] font-semibold tracking-[0.12em] uppercase text-neutral-700">
                              {x.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pb-8">
                    <div className="grid place-items-center px-4 sm:px-6">
                      <button
                        type="button"
                        onClick={onExtraExtra}
                        className="relative inline-flex items-center justify-center gap-3 rounded-full bg-neutral-900 px-8 py-4 text-sm sm:text-base font-extrabold tracking-[0.22em] uppercase text-white shadow-[0_18px_40px_rgba(0,0,0,0.25)] transition hover:bg-neutral-800 active:scale-[0.99]"
                      >
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10">
                          📰
                        </span>
                        ¡EXTRA! ¡EXTRA!
                        <span className="inline-block opacity-80">▶</span>
                      </button>

                      {audioError ? (
                        <p className="mt-3 text-xs text-red-600 text-center">{audioError}</p>
                      ) : (
                        <p className="mt-3 text-xs text-neutral-700 text-center">
                       
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== Periódico ===== */}
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="stage">
          <div
            className={[
              "paper fold paperTexture relative overflow-hidden rounded-[34px] border border-neutral-900/25 shadow-[0_25px_70px_rgba(0,0,0,0.14)]",
              revealed ? "paperShown" : "paperHidden",
            ].join(" ")}
          >
            <RiceRainInCard show={riceInCard} density={160} />

            <div className="flex flex-col gap-2 border-b border-neutral-900/20 px-4 py-3 text-[11px] text-neutral-800 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <span className="font-semibold tracking-[0.22em] uppercase">{paperRegion}</span>

              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-neutral-900/25 bg-white/60 px-3 py-1 font-semibold tracking-[0.18em] uppercase">
                  {weddingDateLabel}
                </span>
                <span className="rounded-full border border-neutral-900/25 bg-white/60 px-3 py-1 font-semibold tracking-[0.18em] uppercase">
                  {ceremonyTimeLabel}
                </span>
              </div>

              <span className="font-semibold tracking-[0.18em] uppercase">{paperDate}</span>
            </div>

            <header className="px-4 pt-6 sm:px-6">
              <div className="text-center font-serif text-4xl sm:text-6xl ink">{paperName}</div>

              <div className="mt-4 grid gap-3 border-y border-neutral-900/20 py-4 sm:grid-cols-3 sm:items-center">
                <div className="text-center text-[11px] font-semibold tracking-[0.22em] uppercase text-neutral-800 sm:text-left">
                  {cityLine}
                </div>
                <div className="text-center text-[11px] font-semibold tracking-[0.22em] uppercase text-neutral-800">
                  {venueName}
                </div>
                <div className="text-center text-[11px] font-semibold tracking-[0.22em] uppercase text-neutral-800 sm:text-right">
                  {venueAddress}
                </div>
              </div>

              <div className="py-6 text-center">
                <div className="font-black tracking-tight text-4xl sm:text-6xl md:text-7xl ink">
                  {coupleName}
                </div>
                <div className="mt-2 font-serif text-2xl sm:text-3xl tracking-wide ink">
                  ¡NOS CASAMOS HOY!
                </div>
              </div>
            </header>

            <section className="px-4 pb-8 sm:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_1.35fr_1fr]">
                <div className="space-y-6">
                  <div className="rounded-3xl border border-neutral-900/20 bg-white/55 p-5">
                    <div className="text-center text-xs font-black tracking-[0.22em] uppercase ink">
                      Historia corta
                    </div>

                    <div className="mt-4 space-y-4">
                      {historiaCorta.map((x) => (
                        <div key={x.label} className="text-center">
                          <div className="text-xs font-extrabold tracking-[0.12em] uppercase ink">
                            {x.label}
                          </div>
                          <div className="mt-1 text-sm text-neutral-700">{x.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-neutral-900/20 bg-white/55 p-5">
                    <div className="flex items-center justify-between">
                      <div className="text-[11px] font-black tracking-[0.2em] uppercase ink">
                        Calendario
                      </div>
                      <div className="text-[11px] font-semibold tracking-[0.18em] uppercase text-neutral-700">
                        {monthNamesEs[calMonthIndex0]} {calYear}
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-7 gap-1 text-center">
                      {["L", "Ma", "Mi", "J", "V", "S", "D"].map((d) => (
                        <div key={d} className="text-[10px] font-semibold text-neutral-700">
                          {d}
                        </div>
                      ))}
                      {calendarCells.map((cell, idx) => (
                        <div key={idx} className="h-8">
                          {cell.day ? (
                            <div
                              className={[
                                "mx-auto flex h-8 w-8 items-center justify-center rounded-xl text-xs",
                                cell.isHighlight
                                  ? "bg-neutral-900 text-white"
                                  : "border border-neutral-900/15 bg-white/60 ink",
                              ].join(" ")}
                            >
                              {cell.day}
                            </div>
                          ) : (
                            <div className="h-8 w-8" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-neutral-900/20 bg-white/55 p-5">
                    <div className="flex items-center justify-between">
                      <div className="text-[11px] font-black tracking-[0.2em] uppercase ink">
                        Cuenta regresiva
                      </div>
                      <span className="rounded-full border border-neutral-900/20 bg-white/60 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] uppercase ink">
                        {mounted ? (cd.done ? "¡HOY!" : "FALTA") : "CARGANDO"}
                      </span>
                    </div>

                    <div className="mt-3 grid grid-cols-4 gap-2">
                      {[
                        { label: "Días", value: mounted ? cd.days : 0 },
                        { label: "Horas", value: mounted ? cd.hours : 0 },
                        { label: "Min", value: mounted ? cd.minutes : 0 },
                        { label: "Seg", value: mounted ? cd.seconds : 0 },
                      ].map((x) => (
                        <div
                          key={x.label}
                          className="rounded-2xl border border-neutral-900/15 bg-white/70 p-3 text-center"
                        >
                          <div className="text-2xl font-black tabular-nums ink">{pad2(x.value)}</div>
                          <div className="mt-1 text-[11px] font-semibold tracking-[0.12em] uppercase text-neutral-700">
                            {x.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <PhotoCarousel images={carouselImages} />

                  <div className="rounded-3xl border border-neutral-900/20 bg-white/55 p-6">
                    <div className="text-center text-sm font-black tracking-[0.22em] uppercase ink">
                      {tituloNota}
                    </div>

                    <p className="mt-4 text-sm leading-7 text-neutral-800 md:columns-2 md:gap-8">
                      {cuerpoNota}
                    </p>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="button"
                        onClick={toggleMusic}
                        className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-3 text-xs font-extrabold tracking-[0.18em] uppercase text-white transition hover:bg-neutral-800"
                      >
                        {playing ? "Pausar música" : "▶ Reproducir música"}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setRiceInCard(true);
                          window.setTimeout(() => setRiceInCard(false), 2800);
                        }}
                        className="inline-flex items-center justify-center rounded-full border border-neutral-900/20 bg-white/70 px-5 py-3 text-xs font-extrabold tracking-[0.18em] uppercase ink transition hover:bg-white"
                      >
                        🎉 Lanzar arroz
                      </button>
                    </div>

                    {audioError && <p className="mt-3 text-xs text-red-600">{audioError}</p>}
                  </div>

                  {/* ✅ Versículo */}
                  <div className="rounded-3xl border border-neutral-900/20 bg-white/55 p-6">
                    <div className="text-center text-xs font-black tracking-[0.22em] uppercase ink">
                      Versículo
                    </div>
                    <p className="mt-3 text-center font-serif text-lg leading-7 text-neutral-800">
                      “{bibleVerseText}”
                    </p>
                    <p className="mt-3 text-center text-sm font-semibold text-neutral-900">
                      {bibleVerseRef}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="rounded-3xl border border-neutral-900/20 bg-white/55 p-5">
                    <div className="text-center text-xs font-black tracking-[0.22em] uppercase ink">
                      Itinerario
                    </div>

                    <div className="mt-4 grid gap-2">
                      {itinerario.map((x, i) => (
                        <div
                          key={`${x.hora}-${x.evento}-${i}`}
                          className="flex items-center justify-between gap-4 rounded-2xl border border-neutral-900/15 bg-white/70 px-4 py-3"
                        >
                          <div className="text-sm font-extrabold ink">{x.hora}</div>
                          <div className="text-sm text-neutral-800">{x.evento}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-neutral-900/20 bg-white/55 p-5">
                    <div className="text-center text-xs font-black tracking-[0.22em] uppercase ink">
                      Ubicación
                    </div>

                    <div className="mt-4 rounded-2xl border border-neutral-900/15 bg-white/70 p-4">
                      <div className="text-xs font-extrabold tracking-[0.18em] uppercase ink">
                        {venueName}
                      </div>
                      <div className="mt-2 text-sm text-neutral-700">{venueAddress}</div>
                    </div>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-neutral-900 px-4 py-4 text-xs font-extrabold tracking-[0.18em] uppercase text-white transition hover:bg-neutral-800"
                    >
                      Ver ubicación en Google Maps
                    </a>
                  </div>

                  <div className="rounded-3xl border border-neutral-900/20 bg-white/55 p-5">
                    <div className="text-center text-xs font-black tracking-[0.22em] uppercase ink">
                      Regalos
                    </div>

                    <p className="mt-3 text-sm text-neutral-700 leading-6 text-center">
                      Si deseas bendecirnos, mira nuestra lista sugerida.
                    </p>

                    <button
                      type="button"
                      onClick={() => setGiftOpen(true)}
                      className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-neutral-900 px-4 py-4 text-xs font-extrabold tracking-[0.18em] uppercase text-white transition hover:bg-neutral-800"
                    >
                      Ver lista de regalos
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* RSVP con 2 botones */}
            <section className="border-t border-neutral-900/20 bg-white/35 px-4 py-8 sm:px-6">
              <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-start">
                <div className="rounded-3xl border border-neutral-900/20 bg-white/60 p-6">
                  <div className="text-xs font-black tracking-[0.22em] uppercase ink">
                    Confirmación (RSVP)
                  </div>
                  <p className="mt-2 text-sm text-neutral-700 leading-6">
                    Confirma por WhatsApp. Elige si deseas confirmar con el novio o con la novia.
                  </p>

                  <div className="mt-4 rounded-2xl border border-neutral-900/15 bg-white/70 p-4">
                    <div className="flex flex-wrap items-center gap-4">
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="radio"
                          name="rsvp"
                          value="si"
                          checked={rsvp === "si"}
                          onChange={() => setRsvp("si")}
                        />
                        Asisto
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="radio"
                          name="rsvp"
                          value="no"
                          checked={rsvp === "no"}
                          onChange={() => setRsvp("no")}
                        />
                        No asisto
                      </label>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-neutral-900/20 bg-white/60 p-6">
                  <form className="grid gap-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="text-[11px] font-extrabold tracking-[0.18em] uppercase text-neutral-700">
                          Nombre
                        </label>
                        <input
                          value={form.nombre}
                          onChange={onChange("nombre")}
                          required
                          className="mt-1 w-full rounded-2xl border border-neutral-900/15 bg-white px-3 py-3 text-sm outline-none focus:border-neutral-900"
                          placeholder="Tu nombre completo"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-extrabold tracking-[0.18em] uppercase text-neutral-700">
                          WhatsApp
                        </label>
                        <input
                          value={form.whatsapp}
                          onChange={onChange("whatsapp")}
                          className="mt-1 w-full rounded-2xl border border-neutral-900/15 bg-white px-3 py-3 text-sm outline-none focus:border-neutral-900"
                          placeholder="+57 300 000 0000"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-extrabold tracking-[0.18em] uppercase text-neutral-700">
                          Asistentes
                        </label>
                        <select
                          value={form.asistentes}
                          onChange={onChange("asistentes")}
                          disabled={rsvp === "no"}
                          className="mt-1 w-full rounded-2xl border border-neutral-900/15 bg-white px-3 py-3 text-sm outline-none focus:border-neutral-900 disabled:opacity-60"
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-extrabold tracking-[0.18em] uppercase text-neutral-700">
                          Mensaje
                        </label>
                        <input
                          value={form.mensaje}
                          onChange={onChange("mensaje")}
                          className="mt-1 w-full rounded-2xl border border-neutral-900/15 bg-white px-3 py-3 text-sm outline-none focus:border-neutral-900"
                          placeholder="Ej: ¡Qué emoción! 🙌"
                        />
                      </div>
                    </div>

                    {/* ✅ 2 botones: novio / novia */}
                    <div className="mt-2 grid gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={(e) => submitRsvpTo(rsvpPhoneNovio)(e as any)}
                        className="inline-flex w-full items-center justify-center rounded-full bg-neutral-900 px-4 py-4 text-sm font-extrabold tracking-[0.14em] uppercase text-white transition hover:bg-neutral-800"
                      >
                        Confirmar con el novio
                      </button>

                      <button
                        type="button"
                        onClick={(e) => submitRsvpTo(rsvpPhoneNovia)(e as any)}
                        className="inline-flex w-full items-center justify-center rounded-full border border-neutral-900/20 bg-white px-4 py-4 text-sm font-extrabold tracking-[0.14em] uppercase text-neutral-900 transition hover:bg-neutral-50"
                      >
                        Confirmar con la novia
                      </button>
                    </div>

                    <p className="text-xs text-neutral-600 text-center">
                      (Recuerda poner el número real de la novia en <span className="font-mono">rsvpPhoneNovia</span>)
                    </p>
                  </form>
                </div>
              </div>
            </section>

            <footer className="border-t border-neutral-900/20 bg-white/20 px-4 py-6 text-center sm:px-6">
              <div className="text-xs font-extrabold tracking-[0.22em] uppercase text-neutral-800">
                Con amor, {coupleName}
              </div>
              <div className="mt-2 text-xs text-neutral-700">
                {weddingDateLabel} · {cityLine}
              </div>
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}