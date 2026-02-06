"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type PanelKey = "asistencia" | "dresscode" | "lugar" | "itinerario";

const cards: Array<{
  key: PanelKey;
  title: string;
  desc: string;
  action: string;
}> = [
  {
    key: "asistencia",
    title: "Confirmar Asistencia",
    desc: "Confírmanos tu presencia para preparar todo con amor.",
    action: "confirmar",
  },
  {
    key: "dresscode",
    title: "Dress Code",
    desc: "Elegante — tonos neutros y pasteles.",
    action: "Ver colores",
  },
  {
    key: "lugar",
    title: "Lugar",
    desc: "Dirección y cómo llegar al evento.",
    action: "Ver ubicación",
  },
  {
    key: "itinerario",
    title: "Itinerario",
    desc: "Horario del gran día, paso a paso.",
    action: "Ver horario",
  },
];

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

export default function Home() {
  // ===== Música =====
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => setPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (audio.paused) await audio.play();
      else audio.pause();
    } catch {}
  };

  // ===== Datos del evento =====
  const coupleName = "Manuel & Pau";
  const weddingCity = "Villavicencio, Colombia";
  const weddingDateLabel = "10 · 05 · 2026";

  // 👇 Cuenta regresiva (10 de mayo 2026, 4:00 PM hora Colombia)
  const targetDate = useMemo(() => new Date("2026-05-10T16:00:00-05:00"), []);

  const [countdown, setCountdown] = useState(() => {
    const diff = targetDate.getTime() - Date.now();
    return clampNonNegative(diff);
  });

  useEffect(() => {
    const id = window.setInterval(() => {
      const diff = targetDate.getTime() - Date.now();
      setCountdown(clampNonNegative(diff));
    }, 1000);

    return () => window.clearInterval(id);
  }, [targetDate]);

  const cd = useMemo(() => {
    const totalSeconds = Math.floor(countdown / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds, done: countdown === 0 };
  }, [countdown]);

  // Calendario: Mayo 2026, marca el día 10
  const calYear = 2026;
  const calMonthIndex0 = 4; // 0=Ene ... 4=Mayo
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
    const firstDay = new Date(calYear, calMonthIndex0, 1).getDay(); // 0=Dom
    const startOffset = (firstDay + 6) % 7; // Lunes=0 ... Domingo=6
    const total = daysInMonth(calYear, calMonthIndex0);

    const cells: Array<{ day: number | null; isHighlight?: boolean }> = [];

    for (let i = 0; i < startOffset; i++) cells.push({ day: null });
    for (let d = 1; d <= total; d++) cells.push({ day: d, isHighlight: d === highlightedDay });
    while (cells.length % 7 !== 0) cells.push({ day: null });

    return cells;
  }, [calYear, calMonthIndex0, highlightedDay]);

  // ===== Accordion Cards =====
  const [open, setOpen] = useState<PanelKey | null>(null);
  const toggleOpen = (k: PanelKey) => setOpen((prev) => (prev === k ? null : k));

  // ===== Form =====
  const [form, setForm] = useState({
    nombre: "",
    whatsapp: "",
    asistentes: "1",
    mensaje: "",
  });

  const onChange =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const phone = "57XXXXXXXXXX"; // <-- pon aquí el número destino (con código país)
    const text = encodeURIComponent(
      `Hola! Confirmo asistencia.\n\nNombre: ${form.nombre}\nWhatsApp: ${form.whatsapp}\nAsistentes: ${form.asistentes}\nMensaje: ${form.mensaje || "-"}`
    );

    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  };

  // ===== Maps =====
  const mapsQuery = useMemo(() => encodeURIComponent("Villavicencio, Meta, Colombia"), []);

  return (
    <main className="min-h-screen">
      {/* Background */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/1200x/ad/04/a0/ad04a07509c8e35d4df89ce377669bb6.jpg')",
        }}
      />
      {/* Overlay */}
      <div className="fixed inset-0 -z-10 bg-black/25" />

      <div className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        {/* Header */}
        <header className="mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white/90 backdrop-blur-md">
            <span className="text-sm">Tarjetas digitales para matrimonio</span>
            <span className="h-1 w-1 rounded-full bg-white/60" />
            <span className="text-sm">Estilo glass</span>
          </div>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Una invitación que la deje sin palabras
          </h1>
          <p className="mt-3 max-w-2xl text-white/80 md:text-lg">
            Música, foto y toda la info del gran día en un solo lugar.
          </p>

          {/* ✅ Cuenta regresiva (arriba, debajo del header) */}
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
                <div
                  key={x.label}
                  className="rounded-2xl border border-white/15 bg-white/5 px-3 py-3 text-center"
                >
                  <div className="text-2xl font-semibold tabular-nums">
                    {String(x.value).padStart(2, "0")}
                  </div>
                  <div className="mt-1 text-[11px] text-white/70">{x.label}</div>
                </div>
              ))}
            </div>

            <p className="text-xs text-white/70">
              {cd.done ? "¡Es hoy! 💍✨" : "¡Guarda la fecha y prepárate! 🤍"}
            </p>
          </div>
        </header>

        {/* Banner */}
        <section className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl md:p-7">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10" />

          <div className="relative grid gap-6 md:grid-cols-[1.2fr_.8fr] md:items-center">
            <div>
              <h2 className="text-2xl font-semibold text-white md:text-3xl">{coupleName}</h2>

              <p className="mt-2 text-white/80">
                Villavicencio nos verá decir “sí” y queremos que tú seas parte de este día.
              </p>

              {/* Music */}
              <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-md">
                <button
                  type="button"
                  onClick={toggleMusic}
                  className="rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-black transition hover:bg-white"
                >
                  {playing ? "❚❚ Pausar" : "▶︎ Reproducir"}
                </button>

                <span className="text-sm text-white/80">Nuestra canción</span>

                {/* ⚠️ Recomendado renombrar el mp3 sin espacios:
                    /public/audio/conocerte-es-amarte.mp3
                */}
                <audio
                  ref={audioRef}
                  src="/audio/Conocerte Es Amarte - Su Presencia - Jesus Freak  Video Oficial.MP3"
                  loop
                  preload="metadata"
                />
              </div>
            </div>

            {/* Photo */}
            <div className="relative">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-lg">
                <Image
                  src="https://i.pinimg.com/736x/8c/49/af/8c49afce47e2c3e68ebae5020284c2c5.jpg"
                  alt="Foto de la pareja"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="pointer-events-none absolute -bottom-3 -left-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-xs text-white/80 backdrop-blur-md">
                {weddingDateLabel}
              </div>
            </div>
          </div>
        </section>

        {/* Cards + Calendar in the middle */}
        <section className="mt-8 md:mt-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* CARD 1: Asistencia */}
            <article className="rounded-3xl border border-white/20 bg-white/10 text-white backdrop-blur-xl transition hover:bg-white/15">
              <button
                type="button"
                onClick={() => toggleOpen("asistencia")}
                className="w-full rounded-3xl p-5 text-left"
                aria-expanded={open === "asistencia"}
                aria-controls="panel-asistencia"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold">{cards[0].title}</h3>
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/80">
                    {open === "asistencia" ? "Cerrar" : "Abrir"}
                  </span>
                </div>
                <p className="mt-2 text-sm text-white/80">{cards[0].desc}</p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="rounded-2xl bg-white/90 px-4 py-2 text-sm font-medium text-black">
                    {cards[0].action}
                  </span>
                  <span className="text-xs text-white/70">{open === "asistencia" ? "↑" : "↓"}</span>
                </div>
              </button>

              <div
                id="panel-asistencia"
                className={`grid overflow-hidden px-5 transition-all duration-300 ${
                  open === "asistencia" ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr] pb-0"
                }`}
              >
                <div className="min-h-0">
                  <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                    <p className="text-sm text-white/80">
                      Completa tus datos (se abrirá WhatsApp para enviar la confirmación).
                    </p>

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
                          <option className="text-black" value="1">
                            1
                          </option>
                          <option className="text-black" value="2">
                            2
                          </option>
                          <option className="text-black" value="3">
                            3
                          </option>
                          <option className="text-black" value="4">
                            4
                          </option>
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

                      <button
                        type="submit"
                        className="w-full rounded-2xl bg-white/90 px-4 py-3 text-sm font-medium text-black transition hover:bg-white"
                      >
                        Enviar confirmación
                      </button>

                      <p className="text-xs text-white/60">
                        Tip: cambia el número destino en el código:{" "}
                        <span className="text-white/80">phone</span>.
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </article>

            {/* CARD 2: Dresscode */}
            <article className="rounded-3xl border border-white/20 bg-white/10 text-white backdrop-blur-xl transition hover:bg-white/15">
              <button
                type="button"
                onClick={() => toggleOpen("dresscode")}
                className="w-full rounded-3xl p-5 text-left"
                aria-expanded={open === "dresscode"}
                aria-controls="panel-dresscode"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold">{cards[1].title}</h3>
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/80">
                    {open === "dresscode" ? "Cerrar" : "Abrir"}
                  </span>
                </div>
                <p className="mt-2 text-sm text-white/80">{cards[1].desc}</p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="rounded-2xl bg-white/90 px-4 py-2 text-sm font-medium text-black">
                    {cards[1].action}
                  </span>
                  <span className="text-xs text-white/70">{open === "dresscode" ? "↑" : "↓"}</span>
                </div>
              </button>

              <div
                id="panel-dresscode"
                className={`grid overflow-hidden px-5 transition-all duration-300 ${
                  open === "dresscode" ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr] pb-0"
                }`}
              >
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
                          <div
                            className="h-10 w-full rounded-xl border border-white/20"
                            style={{ backgroundColor: col.hex }}
                            title={col.name}
                          />
                          <div className="mt-1 text-[10px] text-white/70">{col.hex}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 space-y-2 text-sm text-white/80">
                      <p>
                        ✨ Recomendado: trajes, vestidos largos o midi, lino, satín, tonos suaves.
                      </p>
                      <p>
                        🚫 Evitar: blanco total (reservado para la novia), neones y estampados muy
                        fuertes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* CALENDARIO en medio (entre la 2 y la 3) */}
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
                  <div key={`${d}-${i}`} className="text-[11px] text-white/70">
                    {d}
                  </div>
                ))}

                {calendar.map((cell, idx) => (
                  <div key={`cell-${idx}`} className="h-10">
                    {cell.day ? (
                      <div
                        className={`mx-auto flex h-10 w-10 items-center justify-center rounded-2xl text-sm ${
                          cell.isHighlight
                            ? "bg-white/90 text-black shadow-sm"
                            : "border border-white/15 bg-white/5 text-white/85"
                        }`}
                        title={cell.isHighlight ? "10 de mayo" : undefined}
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
                  <span className="font-semibold text-white">Domingo 10 de mayo</span> — ¡Te
                  esperamos!
                </p>
                <p className="mt-1 text-xs text-white/70">
                  (Si quieres, te agrego botón “Agregar a Google Calendar”.)
                </p>
              </div>
            </div>

            {/* CARD 3: Lugar */}
            <article className="rounded-3xl border border-white/20 bg-white/10 text-white backdrop-blur-xl transition hover:bg-white/15">
              <button
                type="button"
                onClick={() => toggleOpen("lugar")}
                className="w-full rounded-3xl p-5 text-left"
                aria-expanded={open === "lugar"}
                aria-controls="panel-lugar"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold">{cards[2].title}</h3>
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/80">
                    {open === "lugar" ? "Cerrar" : "Abrir"}
                  </span>
                </div>
                <p className="mt-2 text-sm text-white/80">{cards[2].desc}</p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="rounded-2xl bg-white/90 px-4 py-2 text-sm font-medium text-black">
                    {cards[2].action}
                  </span>
                  <span className="text-xs text-white/70">{open === "lugar" ? "↑" : "↓"}</span>
                </div>
              </button>

              <div
                id="panel-lugar"
                className={`grid overflow-hidden px-5 transition-all duration-300 ${
                  open === "lugar" ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr] pb-0"
                }`}
              >
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

                    <p className="mt-3 text-xs text-white/60">
                      Fecha: <span className="text-white/80">{weddingDateLabel}</span>
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* CARD 4: Itinerario */}
            <article className="rounded-3xl border border-white/20 bg-white/10 text-white backdrop-blur-xl transition hover:bg-white/15">
              <button
                type="button"
                onClick={() => toggleOpen("itinerario")}
                className="w-full rounded-3xl p-5 text-left"
                aria-expanded={open === "itinerario"}
                aria-controls="panel-itinerario"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold">{cards[3].title}</h3>
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/80">
                    {open === "itinerario" ? "Cerrar" : "Abrir"}
                  </span>
                </div>
                <p className="mt-2 text-sm text-white/80">{cards[3].desc}</p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="rounded-2xl bg-white/90 px-4 py-2 text-sm font-medium text-black">
                    {cards[3].action}
                  </span>
                  <span className="text-xs text-white/70">
                    {open === "itinerario" ? "↑" : "↓"}
                  </span>
                </div>
              </button>

              <div
                id="panel-itinerario"
                className={`grid overflow-hidden px-5 transition-all duration-300 ${
                  open === "itinerario" ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr] pb-0"
                }`}
              >
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
                        <div
                          key={`${item.time}-${item.label}`}
                          className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-md"
                        >
                          <div className="min-w-[72px] rounded-xl bg-white/90 px-3 py-2 text-center text-xs font-semibold text-black">
                            {item.time}
                          </div>
                          <div className="text-sm text-white/90">{item.label}</div>
                        </div>
                      ))}
                    </div>

                    <p className="mt-4 text-xs text-white/60">
                      Nos vemos en <span className="text-white/80">{weddingCity}</span> el{" "}
                      <span className="text-white/80">10 de mayo</span>.
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-10 text-center text-xs text-white/70">
          Hecho con ♥ usando Tailwind + Next.js (glassmorphism).
        </footer>
      </div>
    </main>
  );
}
