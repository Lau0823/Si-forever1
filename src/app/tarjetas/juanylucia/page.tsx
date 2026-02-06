"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

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

export default function Page() {
  const coupleName = "MANUEL & PAULA";
  const cityLine = "Villavicencio · Meta · Colombia";
  const venueName = "Finca Palo & Rosa";
  const venueAddress = "Villavicencio — Vereda Apiay / vía Puerto López";
  const weddingDateLabel = "10 de mayo 2026";
  const ceremonyTimeLabel = "4:00 p.m.";

  // ✅ Usa uno de estos 2:
  // 1) RECOMENDADO: renombra tu archivo a: public/audio/song.mp3
  const audioSrc = "/audio/manuel.MP3";

  // 2) Si NO puedes renombrar, comenta el de arriba y usa este (con %20 para espacios):
  // const audioSrc =
  //   "/audio/Conocerte%20Es%20Amarte%20-%20Su%20Presencia%20-%20Jesus%20Freak%20%20Video%20Oficial.MP3";

  const targetDate = useMemo(() => new Date("2026-05-10T16:00:00-05:00"), []);
  const rsvpPhone = "57XXXXXXXXXX"; // <-- tu número

  const mapsQuery = useMemo(
    () => encodeURIComponent(`${venueName}, ${venueAddress}`),
    [venueName, venueAddress]
  );

  // ✅ fix hydration
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
    const onError = () => setAudioError("No se pudo cargar el audio. Revisa la ruta o el nombre.");

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

      // ✅ fuerza carga antes de reproducir
      audio.load();

      // si está muteado por algo, lo quitamos
      audio.muted = false;

      if (audio.paused) {
        await audio.play(); // el click ya habilita reproducción
      } else {
        audio.pause();
      }
    } catch {
      setAudioError(
        "Tu navegador bloqueó la reproducción. Verifica que el archivo exista en /public/audio y que la ruta sea correcta."
      );
    }
  };

  // ===== Countdown =====
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

  const submitRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `RSVP — ${coupleName}\n\n` +
        `Respuesta: ${rsvp === "si" ? "ASISTO" : "NO ASISTO"}\n` +
        `Nombre: ${form.nombre}\n` +
        `WhatsApp: ${form.whatsapp || "-"}\n` +
        `Asistentes: ${rsvp === "si" ? form.asistentes : "0"}\n` +
        `Mensaje: ${form.mensaje || "-"}\n\n` +
        `Evento: ${weddingDateLabel} · ${ceremonyTimeLabel}\n` +
        `Lugar: ${venueName} — ${venueAddress}`
    );

    window.open(`https://wa.me/${rsvpPhone}?text=${text}`, "_blank");
  };

  const gratitudeText =
    "Gracias a nuestros padres, amigos y familiares por su amor y apoyo. Y a todos nuestros invitados, gracias por asistir y compartir este día con nosotros. Con amor, Manuel y Paula.";

  const bibleVerseText =
    "Mejores son dos que uno; porque tienen mejor paga de su trabajo. Porque si cayeren, el uno levantará a su compañero; pero ¡ay del solo! que cuando cayere, no habrá segundo que lo levante. También si dos durmieren juntos, se calentarán mutuamente; mas ¿cómo se calentará uno solo? Y si alguno prevaleciere contra uno, dos le resistirán; y cordón de tres dobleces no se rompe pronto.";
  const bibleVerseRef = "Eclesiastés 4:9-12 RVR1960";

  const editorialTitle = "El mejor día de nuestras vidas";
  const editorialBody =
    "Hoy compartimos una noticia que nos llena de alegría: vamos a casarnos. Queremos celebrarlo contigo, con una tarde llena de amor, música y momentos inolvidables.";

  const schedule = [
    { time: "3:30 p.m.", label: "Llegada de invitados" },
    { time: "4:00 p.m.", label: "Ceremonia" },
    { time: "5:30 p.m.", label: "Cóctel" },
    { time: "7:00 p.m.", label: "Recepción" },
    { time: "8:30 p.m.", label: "Primer baile" },
    { time: "9:30 p.m.", label: "Cena" },
    { time: "10:30 p.m.", label: "Corte del pastel" },
    { time: "1:00 a.m.", label: "Despedida" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 text-neutral-900">
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-10">
        <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
          <header className="border-b border-neutral-200 p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-700">
                  <span>Invitación</span>
                  <span className="h-1 w-1 rounded-full bg-neutral-400" />
                  <span>{weddingDateLabel}</span>
                </div>

                <h1 className="mt-3 font-serif text-3xl tracking-wide md:text-5xl">
                  {coupleName}
                </h1>
                <p className="mt-2 text-sm text-neutral-600">{cityLine}</p>
              </div>

              {/* Música */}
              <div className="flex flex-col gap-2 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={toggleMusic}
                    className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800"
                  >
                    {playing ? "Pausar" : "▶ Reproducir"}
                  </button>

                  <div className="min-w-[160px]">
                    <p className="text-xs font-medium text-neutral-600">Nuestra canción</p>
                    <p className="text-sm text-neutral-900">Dale play 🤍</p>
                  </div>
                </div>

                {audioError ? (
                  <p className="text-xs text-red-600">{audioError}</p>
                ) : (
                  <p className="text-xs text-neutral-500">
                    disfruta
                  </p>
                )}

                <audio
                  ref={audioRef}
                  src={audioSrc}
                  loop
                  preload="auto"
                  playsInline
                  crossOrigin="anonymous"
                />
              </div>
            </div>
          </header>

          <section className="p-6 md:p-8">
            <div className="grid gap-6 md:grid-cols-[1.2fr_.8fr] md:items-start">
              <div className="space-y-4">
                {/* ✅ FOTO sin cortar caras */}
                <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 p-3">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-neutral-100">
                    {/* Foto: /public/couple.jpg */}
                    <Image
                      src="/manuel.jpeg"
                      alt="Foto de la pareja"
                      fill
                      className="object-cover object-[50%_20%]"
                      priority
                    />
                  </div>
                  <p className="mt-2 text-xs text-neutral-500">
                    (La foto ahora no se recorta: se ajusta completa.)
                  </p>
                </div>

                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
                  <h2 className="font-serif text-2xl">{editorialTitle}</h2>
                  <p className="mt-2 text-sm leading-6 text-neutral-700">{editorialBody}</p>
                </div>
              </div>

              <aside className="space-y-4">
                <div className="rounded-2xl border border-neutral-200 bg-white p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600">
                      Cuenta regresiva
                    </p>
                    <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs text-neutral-700">
                      {mounted ? (cd.done ? "¡Hoy!" : "Falta") : "Cargando"}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-4 gap-2">
                    {[
                      { label: "Días", value: mounted ? cd.days : 0 },
                      { label: "Horas", value: mounted ? cd.hours : 0 },
                      { label: "Min", value: mounted ? cd.minutes : 0 },
                      { label: "Seg", value: mounted ? cd.seconds : 0 },
                    ].map((x) => (
                      <div
                        key={x.label}
                        className="rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-center"
                      >
                        <div className="text-2xl font-semibold tabular-nums text-neutral-900">
                          {pad2(x.value)}
                        </div>
                        <div className="mt-1 text-[11px] text-neutral-600">{x.label}</div>
                      </div>
                    ))}
                  </div>

                  <p className="mt-3 text-sm text-neutral-700">
                    {weddingDateLabel} · {ceremonyTimeLabel}
                  </p>
                </div>

                <div className="rounded-2xl border border-neutral-200 bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600">
                    Lugar
                  </p>
                  <p className="mt-2 font-serif text-xl text-neutral-900">{venueName}</p>
                  <p className="mt-1 text-sm text-neutral-700">{venueAddress}</p>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800"
                  >
                    Ver en Google Maps
                  </a>
                </div>

                <div className="rounded-2xl border border-neutral-200 bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600">
                    Nota
                  </p>
                  <p className="mt-2 text-sm leading-6 text-neutral-700">{gratitudeText}</p>
                </div>
              </aside>
            </div>
          </section>

          <section className="grid gap-4 border-t border-neutral-200 p-6 md:grid-cols-2 md:p-8">
            <div className="rounded-2xl border border-neutral-200 bg-white p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600">
                    Calendario
                  </p>
                  <p className="mt-1 text-sm text-neutral-700">
                    Marca el <span className="font-semibold text-neutral-900">10 de mayo</span>.
                  </p>
                </div>
                <span className="text-xs text-neutral-600">
                  {monthNamesEs[calMonthIndex0]} {calYear}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-7 gap-2 text-center">
                {["L", "Ma", "Mi", "J", "V", "S", "D"].map((d, i) => (
                  <div key={`${d}-${i}`} className="text-[11px] text-neutral-500">
                    {d}
                  </div>
                ))}

                {calendarCells.map((cell, idx) => (
                  <div key={`cell-${idx}`} className="h-10">
                    {cell.day ? (
                      <div
                        className={`mx-auto flex h-10 w-10 items-center justify-center rounded-xl text-sm ${
                          cell.isHighlight
                            ? "bg-neutral-900 text-white"
                            : "border border-neutral-200 bg-neutral-50 text-neutral-800"
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
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600">
                Itinerario
              </p>

              <div className="mt-3 space-y-2">
                {schedule.map((s) => (
                  <div
                    key={`${s.time}-${s.label}`}
                    className="flex items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm"
                  >
                    <span className="font-semibold text-neutral-900">{s.time}</span>
                    <span className="text-neutral-700">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600">
                Código de vestimenta
              </p>

              <p className="mt-2 text-sm text-neutral-700">
                <span className="font-semibold text-neutral-900">Vestimenta moderada</span>
                <br />
                Hombres: Traje formal · Mujeres: Vestido de cóctel
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600">
                RSVP
              </p>
              <p className="mt-2 text-sm text-neutral-700">
                Confirma por WhatsApp si asistes o no.
              </p>

              <form onSubmit={submitRsvp} className="mt-4 space-y-3">
                <div className="flex flex-wrap items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-3">
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

                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-widest text-neutral-600">
                      Nombre
                    </label>
                    <input
                      value={form.nombre}
                      onChange={onChange("nombre")}
                      required
                      className="mt-1 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-900"
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-widest text-neutral-600">
                      WhatsApp
                    </label>
                    <input
                      value={form.whatsapp}
                      onChange={onChange("whatsapp")}
                      className="mt-1 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-900"
                      placeholder="+57 300 000 0000"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-widest text-neutral-600">
                      Asistentes
                    </label>
                    <select
                      value={form.asistentes}
                      onChange={onChange("asistentes")}
                      disabled={rsvp === "no"}
                      className="mt-1 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-900 disabled:opacity-60"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-widest text-neutral-600">
                      Mensaje
                    </label>
                    <input
                      value={form.mensaje}
                      onChange={onChange("mensaje")}
                      className="mt-1 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-900"
                      placeholder="Ej: ¡Qué emoción! 🙌"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full rounded-xl bg-neutral-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                >
                  Enviar confirmación por WhatsApp
                </button>
              </form>
            </div>

            <div className="md:col-span-2 rounded-2xl border border-neutral-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600">
                Lectura
              </p>
              <p className="mt-2 text-sm leading-6 text-neutral-700">{bibleVerseText}</p>
              <p className="mt-3 text-sm font-semibold text-neutral-900">{bibleVerseRef}</p>
            </div>
          </section>

          <footer className="border-t border-neutral-200 p-6 text-center text-xs text-neutral-500">
            Con amor, {coupleName} · {weddingDateLabel} · {cityLine}
          </footer>
        </div>
      </div>
    </main>
  );
}
