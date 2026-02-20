"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";

type PanelKey = "asistencia" | "dresscode" | "lugar" | "itinerario";

const cards: Array<{ key: PanelKey; title: string; desc: string; action: string; icon: string }> = [
  {
    key: "asistencia",
    title: "Confirmar Asistencia",
    desc: "Confírmanos tu presencia para preparar todo con amor.",
    action: "Confirmar",
    icon: "✅",
  },
  {
    key: "dresscode",
    title: "Dress Code",
    desc: "Elegante — tonos neutros y pasteles.",
    action: "Ver paleta",
    icon: "👗",
  },
  { key: "lugar", title: "Lugar", desc: "Dirección y cómo llegar al evento.", action: "Ver mapa", icon: "📍" },
  { key: "itinerario", title: "Itinerario", desc: "Horario del gran día, paso a paso.", action: "Ver agenda", icon: "⏳" },
];

function clampNonNegative(n: number) {
  return n < 0 ? 0 : n;
}
function isLeapYear(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
function daysInMonth(year: number, monthIndex0: number) {
  const days = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return days[monthIndex0];
}

/** =========================
 *  Pétalos/Flores (canvas) — romántico con glow suave
 *  ========================= */
function TechPetals({ density = 26, className = "" }: { density?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const resize = () => {
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    type P = {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      rot: number;
      vrot: number;
      glow: number;
      a: number;
      phase: number;
      hueBase: number;
    };

    const petals: P[] = Array.from({ length: density }).map(() => ({
      x: rand(0, window.innerWidth),
      y: rand(-window.innerHeight, window.innerHeight),
      r: rand(7, 16),
      vx: rand(-0.22, 0.28),
      vy: rand(0.28, 0.85),
      rot: rand(0, Math.PI * 2),
      vrot: rand(-0.01, 0.01),
      glow: rand(8, 16),
      a: rand(0.09, 0.2),
      phase: rand(0, Math.PI * 2),
      hueBase: Math.random() < 0.55 ? rand(330, 360) : rand(0, 22), // rosa/champagne
    }));

    const draw = (p: P) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);

      const hue = p.hueBase % 360;

      ctx.shadowColor = `hsla(${hue}, 85%, 72%, ${p.a})`;
      ctx.shadowBlur = p.glow;

      const g = ctx.createRadialGradient(0, -p.r * 0.5, 1, 0, 0, p.r * 1.6);
      g.addColorStop(0, `hsla(${hue}, 95%, 92%, ${p.a})`);
      g.addColorStop(1, `hsla(${(hue + 18) % 360}, 80%, 72%, ${p.a * 0.9})`);

      ctx.fillStyle = g;

      ctx.beginPath();
      ctx.moveTo(0, -p.r);
      ctx.quadraticCurveTo(p.r * 0.95, -p.r * 0.05, 0, p.r);
      ctx.quadraticCurveTo(-p.r * 0.95, -p.r * 0.05, 0, -p.r);
      ctx.closePath();
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.strokeStyle = `hsla(${(hue + 8) % 360}, 90%, 96%, ${p.a * 0.6})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      ctx.restore();
    };

    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (const p of petals) {
        p.phase += 0.01;
        p.x += p.vx + Math.sin(p.phase) * 0.22;
        p.y += p.vy;
        p.rot += p.vrot;

        if (p.y > window.innerHeight + 40) {
          p.y = -40;
          p.x = rand(0, window.innerWidth);
        }
        if (p.x < -60) p.x = window.innerWidth + 60;
        if (p.x > window.innerWidth + 60) p.x = -60;

        draw(p);
      }

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [density]);

  return <canvas ref={ref} className={`pointer-events-none fixed inset-0 z-0 opacity-80 ${className}`} aria-hidden="true" />;
}

/** =========================
 *  Dock música premium (dentro tarjeta)
 *  ========================= */
function MusicDock({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [t, setT] = useState({ current: 0, duration: 0 });

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onCanPlay = () => setReady(true);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTime = () => setT({ current: audio.currentTime || 0, duration: audio.duration || 0 });

    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onTime);

    return () => {
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onTime);
    };
  }, []);

  const togglePlay = async () => {
    const a = audioRef.current;
    if (!a) return;
    try {
      if (a.paused) await a.play();
      else a.pause();
    } catch {}
  };

  const toggleMute = () => {
    const a = audioRef.current;
    if (!a) return;
    a.muted = !a.muted;
    setMuted(a.muted);
  };

  const pct = t.duration > 0 ? Math.min(100, (t.current / t.duration) * 100) : 0;
  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const r = Math.floor(s % 60);
    return `${m}:${String(r).padStart(2, "0")}`;
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="metadata" />
      <div className="fixed bottom-4 left-1/2 z-50 w-[min(560px,calc(100%-24px))] -translate-x-1/2">
        <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-3 text-white shadow-2xl backdrop-blur-2xl">
          <div className="pointer-events-none absolute inset-0 opacity-70">
            <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-pink-300/15 blur-3xl" />
            <div className="absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-rose-200/15 blur-3xl" />
          </div>

          <div className="relative flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlay}
              className="grid h-11 w-11 place-items-center rounded-2xl bg-white/90 text-black transition hover:bg-white active:scale-[0.98]"
              aria-label={playing ? "Pausar música" : "Reproducir música"}
            >
              <span className="text-base">{playing ? "❚❚" : "▶︎"}</span>
            </button>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <p className="truncate text-sm font-semibold">Nuestra canción</p>
                <p className="text-xs text-white/70">
                  {fmt(t.current)} / {t.duration ? fmt(t.duration) : "--:--"}
                </p>
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/15">
                <div className="h-full rounded-full bg-white/70 transition-[width]" style={{ width: `${pct}%` }} />
              </div>

              {!ready && <p className="mt-2 text-xs text-white/60">Cargando audio…</p>}
            </div>

            <button
              type="button"
              onClick={toggleMute}
              className="grid h-11 w-11 place-items-center rounded-2xl border border-white/20 bg-white/5 text-white/90 transition hover:bg-white/10 active:scale-[0.98]"
              aria-label={muted ? "Activar sonido" : "Silenciar"}
            >
              <span className="text-sm">{muted ? "🔇" : "🔊"}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/** =========================
 *  Intro con VIDEO MP4 (fondo) + botón "Abrir invitación"
 *  El audio del video inicia AL TOCAR el botón.
 *  ========================= */
function IntroGateVideo({
  onEnter,
  videoSrc,
  coupleName,
}: {
  onEnter: () => void;
  videoSrc: string;
  coupleName: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [pressed, setPressed] = useState(false);

  const enter = async () => {
    setPressed(true);

    const v = videoRef.current;
    if (v) {
      try {
        v.muted = false; // habilita audio
        v.volume = 1;
        await v.play(); // reproduce con sonido (permitido por click)
      } catch {}
    }

    window.setTimeout(() => onEnter(), 780);
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <video
        ref={videoRef}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />

      {/* overlay glass rosado */}
      <div className="absolute inset-0 -z-10 bg-white/10" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/15 via-white/5 to-white/15" />

      <TechPetals density={30} className="opacity-55" />

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/18 blur-3xl" />
        <div className="absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-white/14 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-white/90 backdrop-blur-xl">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/80" />
          Invitación digital premium
        </div>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white drop-shadow-sm sm:text-6xl">
          {coupleName || ""}
        </h1>

        <p className="mt-4 max-w-xl text-white/85 sm:text-lg"></p>

        {/* ✅ aquí se bajó un poquito con mt-12 */}
        <button
          type="button"
          onClick={enter}
          className={[
            "mt-20 w-full max-w-sm rounded-[28px] border border-white/25 bg-white/15 px-6 py-5",
            "shadow-[0_25px_80px_rgba(0,0,0,0.18)] backdrop-blur-2xl transition",
            "hover:bg-white/20 active:scale-[0.99]",
            "relative overflow-hidden",
          ].join(" ")}
        >
          <div className="pointer-events-none absolute inset-0 opacity-65">
            <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-white/18 blur-2xl" />
            <div className="absolute -right-24 -bottom-24 h-56 w-56 rounded-full bg-white/14 blur-2xl" />
          </div>

          <div className="relative flex items-center justify-between gap-4">
            <div className="text-left">
              <p className="text-lg font-semibold text-white">Abrir invitación</p>
              <p className="mt-1 text-sm text-white/80"></p>
            </div>

            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/90 text-black">▶︎</div>
          </div>

          <div className="relative mt-4 h-1.5 overflow-hidden rounded-full bg-white/20">
            <div className="h-full w-2/3 rounded-full bg-white/70" />
          </div>
        </button>
      </div>

      <div
        className={[
          "pointer-events-none absolute inset-0 z-20 bg-white transition-opacity duration-700",
          pressed ? "opacity-100" : "opacity-0",
        ].join(" ")}
      />
    </div>
  );
}

export default function Home() {
  const [entered, setEntered] = useState(false);

  // Datos
  const coupleName = "";
  const weddingCity = "Villavicencio, Colombia";
  const weddingDateLabel = "10 · 05 · 2026";

  /**
   * ✅ IMPORTANTE:
   * Los archivos en /public NO deberían tener espacios/[] en el nombre.
   * Renómbralo a algo simple como: public/video/intro.mp4
   * y usa: "/video/intro.mp4"
   *
   * Si lo dejas con espacios, a veces falla. Si NO lo vas a renombrar:
   * usa encodeURI en el src (más abajo).
   */
  const rawIntroVideo = "/PREWEDDING VIDEO 2021  Filmed in spanish beach  4K [1].MP4";
  const introVideo = useMemo(() => encodeURI(rawIntroVideo), [rawIntroVideo]);

  // Música dentro de la tarjeta (dock)
  const cardAudio = "/audio/manuel.MP3";

  // Cuenta regresiva
  const targetDate = useMemo(() => new Date("2026-05-10T16:00:00-05:00"), []);
  const [countdown, setCountdown] = useState(() => clampNonNegative(targetDate.getTime() - Date.now()));

  useEffect(() => {
    if (!entered) return;
    const id = window.setInterval(() => setCountdown(clampNonNegative(targetDate.getTime() - Date.now())), 1000);
    return () => window.clearInterval(id);
  }, [entered, targetDate]);

  const cd = useMemo(() => {
    const totalSeconds = Math.floor(countdown / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { days, hours, minutes, seconds, done: countdown === 0 };
  }, [countdown]);

  // Calendario
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

  const calendar = useMemo(() => {
    const firstDay = new Date(calYear, calMonthIndex0, 1).getDay();
    const startOffset = (firstDay + 6) % 7;
    const total = daysInMonth(calYear, calMonthIndex0);
    const cells: Array<{ day: number | null; isHighlight?: boolean }> = [];
    for (let i = 0; i < startOffset; i++) cells.push({ day: null });
    for (let d = 1; d <= total; d++) cells.push({ day: d, isHighlight: d === highlightedDay });
    while (cells.length % 7 !== 0) cells.push({ day: null });
    return cells;
  }, [calYear, calMonthIndex0, highlightedDay]);

  // Accordion
  const [open, setOpen] = useState<PanelKey | null>(null);
  const toggleOpen = (k: PanelKey) => setOpen((prev) => (prev === k ? null : k));

  // Form
  const [form, setForm] = useState({ nombre: "", whatsapp: "", asistentes: "1", mensaje: "" });
  const onChange =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = "573102345742";
    const text = encodeURIComponent(
      `Hola! Confirmo asistencia.\n\nNombre: ${form.nombre}\nWhatsApp: ${form.whatsapp}\nAsistentes: ${form.asistentes}\nMensaje: ${form.mensaje || "-"}`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  };

  const mapsQuery = useMemo(() => encodeURIComponent("Villavicencio, Meta, Colombia"), []);

  // ✅ INTRO con video MP4
  if (!entered) {
    return <IntroGateVideo onEnter={() => setEntered(true)} videoSrc={introVideo} coupleName={coupleName} />;
  }

  // Foto dentro de tarjeta
  const heroImage = "https://i.pinimg.com/736x/52/cd/46/52cd469e8aff08002715190d987c97c7.jpg";

  return (
    <main className="min-h-screen">
      <div
        className="fixed inset-0 -z-30 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://i.pinimg.com/1200x/ad/04/a0/ad04a07509c8e35d4df89ce377669bb6.jpg')",
        }}
      />
      <div className="fixed inset-0 -z-20 bg-black/25" />

      <TechPetals density={18} className="-z-10 opacity-45" />
      <MusicDock src={cardAudio} />

      <div className="mx-auto max-w-6xl px-5 py-10 md:py-14 text-white">
        <header className="mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white/90 backdrop-blur-md">
            <span className="text-sm"></span>
            <span className="h-1 w-1 rounded-full bg-white/60" />
            <span className="text-sm">Estilo glass</span>
          </div>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Una invitación que la deje sin palabras
          </h1>
          <p className="mt-3 max-w-2xl text-white/80 md:text-lg">
            Música, foto y toda la info del gran día en un solo lugar.
          </p>

          <div className="mt-5 inline-flex w-full flex-col gap-3 rounded-3xl border border-white/20 bg-white/10 p-5 text-white backdrop-blur-xl sm:max-w-xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-white/70">Cuenta regresiva</p>
                <p className="mt-1 text-base font-semibold">
                  {weddingDateLabel} — {weddingCity}
                </p>
              </div>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/80">
                {cd.done ? "¡Hoy!" : "Falta"}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[
                { label: "Días", value: cd.days },
                { label: "Horas", value: cd.hours },
                { label: "Min", value: cd.minutes },
                { label: "Seg", value: cd.seconds },
              ].map((x) => (
                <div key={x.label} className="rounded-2xl border border-white/15 bg-white/5 px-3 py-3 text-center">
                  <div className="text-2xl font-semibold tabular-nums">{String(x.value).padStart(2, "0")}</div>
                  <div className="mt-1 text-[11px] text-white/70">{x.label}</div>
                </div>
              ))}
            </div>

            <p className="text-xs text-white/70">{cd.done ? "¡Es hoy! 💍✨" : "¡Guarda la fecha! 🤍"}</p>
          </div>
        </header>

        <section className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl md:p-7">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10" />

          <div className="relative grid gap-6 md:grid-cols-[1.2fr_.8fr] md:items-center">
            <div>
              <h2 className="text-2xl font-semibold text-white md:text-3xl">{coupleName}</h2>
              <p className="mt-2 text-white/80">
                Villavicencio nos verá decir “sí” y queremos que tú seas parte de este día.
              </p>
              <div className="mt-4 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-md">
                <p className="text-sm text-white/80"></p>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-lg">
                <Image src={heroImage} alt="Foto de la pareja" fill className="object-cover" priority />
              </div>

              <div className="pointer-events-none absolute -bottom-3 -left-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-xs text-white/80 backdrop-blur-md">
                {weddingDateLabel}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 md:mt-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* CARD 1: Asistencia */}
            <article className="rounded-3xl border border-white/20 bg-white/10 text-white backdrop-blur-xl transition hover:bg-white/15">
              <button type="button" onClick={() => toggleOpen("asistencia")} className="w-full rounded-3xl p-5 text-left">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold">{cards[0].title}</h3>
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/80">
                    {open === "asistencia" ? "Cerrar" : "Abrir"}
                  </span>
                </div>
                <p className="mt-2 text-sm text-white/80">{cards[0].desc}</p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="rounded-2xl bg-white/90 px-4 py-2 text-sm font-medium text-black">{cards[0].action}</span>
                  <span className="text-xs text-white/70">{open === "asistencia" ? "↑" : "↓"}</span>
                </div>
              </button>

              <div className={`grid overflow-hidden px-5 transition-all duration-300 ${open === "asistencia" ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr] pb-0"}`}>
                <div className="min-h-0">
                  <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                    <p className="text-sm text-white/80">Completa tus datos (se abrirá WhatsApp).</p>

                    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                      <div>
                        <label className="text-xs text-white/70">Nombre</label>
                        <input
                          value={form.nombre}
                          onChange={onChange("nombre")}
                          required
                          className="mt-1 w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/50 outline-none backdrop-blur-md focus:border-white/40"
                          placeholder="Tu nombre completo"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-white/70">WhatsApp</label>
                        <input
                          value={form.whatsapp}
                          onChange={onChange("whatsapp")}
                          className="mt-1 w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/50 outline-none backdrop-blur-md focus:border-white/40"
                          placeholder="+57 300 000 0000"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-white/70">Número de asistentes</label>
                        <select
                          value={form.asistentes}
                          onChange={onChange("asistentes")}
                          className="mt-1 w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white outline-none backdrop-blur-md focus:border-white/40"
                        >
                          <option className="text-black" value="1">1</option>
                          <option className="text-black" value="2">2</option>
                          <option className="text-black" value="3">3</option>
                          <option className="text-black" value="4">4</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs text-white/70">Mensaje (opcional)</label>
                        <textarea
                          value={form.mensaje}
                          onChange={onChange("mensaje")}
                          rows={3}
                          className="mt-1 w-full resize-none rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/50 outline-none backdrop-blur-md focus:border-white/40"
                          placeholder="Ej: ¡Qué emoción! Ahí estaremos 🥹"
                        />
                      </div>

                      <button type="submit" className="w-full rounded-2xl bg-white/90 px-4 py-3 text-sm font-medium text-black transition hover:bg-white">
                        Enviar confirmación
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </article>

            {/* CARD 2: Dresscode */}
            <article className="rounded-3xl border border-white/20 bg-white/10 text-white backdrop-blur-xl transition hover:bg-white/15">
              <button type="button" onClick={() => toggleOpen("dresscode")} className="w-full rounded-3xl p-5 text-left">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold">{cards[1].title}</h3>
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/80">
                    {open === "dresscode" ? "Cerrar" : "Abrir"}
                  </span>
                </div>
                <p className="mt-2 text-sm text-white/80">{cards[1].desc}</p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="rounded-2xl bg-white/90 px-4 py-2 text-sm font-medium text-black">{cards[1].action}</span>
                  <span className="text-xs text-white/70">{open === "dresscode" ? "↑" : "↓"}</span>
                </div>
              </button>

              <div className={`grid overflow-hidden px-5 transition-all duration-300 ${open === "dresscode" ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr] pb-0"}`}>
                <div className="min-h-0">
                  <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                    <p className="text-sm text-white/80">
                      Dress code: <span className="text-white">Elegante</span>. Tonos sugeridos:
                    </p>

                    <div className="mt-4 grid grid-cols-5 gap-2">
                      {[
                        { name: "Champagne", hex: "#E9D8B4" },
                        { name: "Beige", hex: "#DCC7A1" },
                        { name: "Blush", hex: "#E7B7B2" },
                        { name: "Sage", hex: "#A7B8A8" },
                        { name: "Ivory", hex: "#F4F1EA" },
                      ].map((col) => (
                        <div key={col.hex} className="text-center">
                          <div className="h-10 w-full rounded-xl border border-white/20" style={{ backgroundColor: col.hex }} title={col.name} />
                          <div className="mt-1 text-[10px] text-white/70">{col.hex}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 space-y-2 text-sm text-white/80">
                      <p>✨ Recomendado: trajes, vestidos largos o midi, lino, satín, tonos suaves.</p>
                      <p>🚫 Evitar: blanco total, neones y estampados muy fuertes.</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* CALENDARIO */}
            <div className="sm:col-span-2 lg:col-span-2 rounded-3xl border border-white/20 bg-white/10 p-5 text-white backdrop-blur-xl">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">Guárdalo en tu calendario</h3>
                  <p className="mt-1 text-sm text-white/80">
                    {weddingCity} — <span className="text-white">{weddingDateLabel}</span>
                  </p>
                </div>
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/80">
                  {monthNamesEs[calMonthIndex0]} {calYear}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-7 gap-2 text-center">
                {["L", "Ma", "Mi", "J", "V", "S", "D"].map((d, i) => (
                  <div key={`${d}-${i}`} className="text-[11px] text-white/70">{d}</div>
                ))}

                {calendar.map((cell, idx) => (
                  <div key={`cell-${idx}`} className="h-10">
                    {cell.day ? (
                      <div
                        className={`mx-auto flex h-10 w-10 items-center justify-center rounded-2xl text-sm ${
                          cell.isHighlight ? "bg-white/90 text-black shadow-sm" : "border border-white/15 bg-white/5 text-white/85"
                        }`}
                      >
                        {cell.day}
                      </div>
                    ) : (
                      <div className="h-10 w-10" />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-white/15 bg-white/5 p-4 text-sm text-white/85">
                <p>
                  <span className="font-semibold text-white">Domingo 10 de mayo</span> — ¡Te esperamos!
                </p>
              </div>
            </div>

            {/* CARD 3: Lugar */}
            <article className="rounded-3xl border border-white/20 bg-white/10 text-white backdrop-blur-xl transition hover:bg-white/15">
              <button type="button" onClick={() => toggleOpen("lugar")} className="w-full rounded-3xl p-5 text-left">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold">{cards[2].title}</h3>
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/80">
                    {open === "lugar" ? "Cerrar" : "Abrir"}
                  </span>
                </div>
                <p className="mt-2 text-sm text-white/80">{cards[2].desc}</p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="rounded-2xl bg-white/90 px-4 py-2 text-sm font-medium text-black">{cards[2].action}</span>
                  <span className="text-xs text-white/70">{open === "lugar" ? "↑" : "↓"}</span>
                </div>
              </button>

              <div className={`grid overflow-hidden px-5 transition-all duration-300 ${open === "lugar" ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr] pb-0"}`}>
                <div className="min-h-0">
                  <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                    <p className="text-sm text-white/80">
                      <span className="text-white">Ubicación</span> — {weddingCity}
                    </p>

                    <div className="mt-3 rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur-md">
                      <p className="text-sm text-white/90">Lugar del evento</p>
                      <p className="text-xs text-white/70">(cambia aquí por la dirección exacta)</p>
                    </div>

                    <div className="mt-4">
                      <a
                        className="block w-full rounded-2xl bg-white/90 px-4 py-3 text-center text-sm font-medium text-black transition hover:bg-white"
                        href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Abrir en Google Maps
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* CARD 4: Itinerario */}
            <article className="rounded-3xl border border-white/20 bg-white/10 text-white backdrop-blur-xl transition hover:bg-white/15">
              <button type="button" onClick={() => toggleOpen("itinerario")} className="w-full rounded-3xl p-5 text-left">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold">{cards[3].title}</h3>
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/80">
                    {open === "itinerario" ? "Cerrar" : "Abrir"}
                  </span>
                </div>
                <p className="mt-2 text-sm text-white/80">{cards[3].desc}</p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="rounded-2xl bg-white/90 px-4 py-2 text-sm font-medium text-black">{cards[3].action}</span>
                  <span className="text-xs text-white/70">{open === "itinerario" ? "↑" : "↓"}</span>
                </div>
              </button>

              <div className={`grid overflow-hidden px-5 transition-all duration-300 ${open === "itinerario" ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr] pb-0"}`}>
                <div className="min-h-0">
                  <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                    <p className="text-sm text-white/80">Horario del gran día:</p>

                    <div className="mt-4 space-y-3">
                      {[
                        { time: "3:30 PM", label: "Llegada de invitados" },
                        { time: "4:00 PM", label: "Ceremonia" },
                        { time: "5:00 PM", label: "Fotos" },
                        { time: "6:00 PM", label: "Recepción" },
                        { time: "7:30 PM", label: "Cena" },
                        { time: "9:00 PM", label: "Fiesta" },
                      ].map((item) => (
                        <div key={`${item.time}-${item.label}`} className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-md">
                          <div className="min-w-[72px] rounded-xl bg-white/90 px-3 py-2 text-center text-xs font-semibold text-black">{item.time}</div>
                          <div className="text-sm text-white/90">{item.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <footer className="mt-10 text-center text-xs text-white/70">Hecho con ♥ usando Tailwind + Next.js (glassmorphism).</footer>
      </div>
    </main>
  );
}