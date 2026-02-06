"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type RsvpStatus = "SI" | "NO";
type ItineraryItem = { time: string; title: string; note?: string };

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function getCountdown(targetMs: number) {
  const now = Date.now();
  const diff = Math.max(0, targetMs - now);

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { diff, days, hours, minutes, seconds };
}

export default function Page() {
  const data = useMemo(
    () => ({
      topBannerUrl:
        "https://i.pinimg.com/1200x/62/0a/af/620aaf9b82dc047deccd9c39ad588fc5.jpg",
      mainBannerUrl:
        "https://i.pinimg.com/736x/0a/6e/0b/0a6e0b406fd69414ccee40042ae7f48d.jpg",

      couple: "Ana & Luis",
      subtitle: "¡Nos casamos y queremos celebrarlo contigo!",
      weddingISO: "2027-06-05T17:00:00-05:00",
      dateLine: "Sábado 05.06.2027 · 5:00 PM",

      venueName: "Hacienda Santana",
      address: "Km 8.0 vía Cota",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Hacienda%20Santana%20Cota",

      rsvpDeadline: "25 de mayo 2027",

      // ✅ Recomendado: renombrar tu mp3 y ponerlo en /public/audio/
      songSrc: "/audio/manuel.MP3",
      songTitle: "Hasta viejitos",
      songArtist: "Alejo Gonzales",
    }),
    []
  );

  const itinerary: ItineraryItem[] = [
    { time: "5:00 PM", title: "Ceremonia", note: "Llegar 15 min antes" },
    { time: "6:00 PM", title: "Cóctel" },
    { time: "7:30 PM", title: "Recepción" },
    { time: "9:00 PM", title: "Baile" },
  ];

  // Countdown
  const targetMs = useMemo(() => new Date(data.weddingISO).getTime(), [data.weddingISO]);
  const [count, setCount] = useState(() => getCountdown(targetMs));

  useEffect(() => {
    const t = setInterval(() => setCount(getCountdown(targetMs)), 1000);
    return () => clearInterval(t);
  }, [targetMs]);

  const isEventTime = count.diff === 0;

  // Audio
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = async () => {
    const a = audioRef.current;
    if (!a) return;

    try {
      if (a.paused) {
        await a.play();
        setPlaying(true);
      } else {
        a.pause();
        setPlaying(false);
      }
    } catch {
      setPlaying(false);
    }
  };

  const stopAudio = () => {
    const a = audioRef.current;
    if (!a) return;
    a.pause();
    a.currentTime = 0;
    setPlaying(false);
  };

  // RSVP
  const [status, setStatus] = useState<RsvpStatus>("SI");
  const [name, setName] = useState("");
  const [guests, setGuests] = useState(1);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [okMsg, setOkMsg] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const submitRsvp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOkMsg(null);
    setErrMsg(null);

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, name, guests, notes }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Error enviando RSVP");
      }

      setOkMsg("¡Listo! Tu asistencia quedó registrada.");
      setName("");
      setGuests(1);
      setNotes("");
      setStatus("SI");
    } catch (err: any) {
      setErrMsg(err?.message ?? "No se pudo enviar el RSVP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <div className="mx-auto max-w-5xl px-4 py-10 space-y-6">
        {/* ✅ CUENTA REGRESIVA ARRIBA DE TODO */}
        <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold tracking-[0.35em] text-neutral-600">
                {isEventTime ? "¡HOY ES EL DÍA!" : "CUENTA REGRESIVA"}
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-tight">
                {data.couple}
              </h2>
              <p className="mt-1 text-sm text-neutral-700">{data.dateLine}</p>
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              <CountdownTopBox label="DÍAS" value={String(count.days)} />
              <CountdownTopBox label="HORAS" value={pad2(count.hours)} />
              <CountdownTopBox label="MIN" value={pad2(count.minutes)} />
              <CountdownTopBox label="SEG" value={pad2(count.seconds)} />
            </div>
          </div>
        </section>

        {/* Banner superior */}
        <section className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
          <div className="relative h-[220px] w-full sm:h-[260px]">
            <Image
              src={data.topBannerUrl}
              alt="Foto superior"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 1024px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
              <p className="text-xs font-semibold tracking-[0.35em] text-white/90">
                MOMENTOS
              </p>
              <p className="mt-2 max-w-2xl text-sm text-white/90">
                No somos perfectos, pero somos tú y yo.
              </p>
            </div>
          </div>
        </section>

        {/* Banner principal */}
        <section className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
          <div className="relative h-[460px] w-full sm:h-[600px]">
            <Image
              src={data.mainBannerUrl}
              alt="Banner boda"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 1024px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-10">
              <p className="text-xs font-semibold tracking-[0.35em] text-white/90">
                INVITACIÓN
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-5xl">
                {data.couple}
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-white/90 sm:text-base">
                {data.subtitle}
              </p>

              <p className="mt-2 text-sm font-semibold text-white/90">
                {data.dateLine}
              </p>

              {/* Player */}
              <div className="mt-4 w-full max-w-2xl rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs tracking-[0.3em] text-white/80">CANCIÓN</p>
                    <p className="mt-1 text-base font-extrabold text-white">
                      {data.songTitle}
                    </p>
                    <p className="text-sm text-white/80">{data.songArtist}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={togglePlay}
                      className="rounded-full border border-white/80 bg-white/10 px-5 py-2 text-sm font-extrabold text-white hover:bg-white/20"
                    >
                      {playing ? "Pausar" : "Reproducir"}
                    </button>

                    <button
                      onClick={stopAudio}
                      className="rounded-full border border-white/40 bg-transparent px-5 py-2 text-sm font-bold text-white/90 hover:bg-white/10"
                    >
                      Detener
                    </button>
                  </div>
                </div>

                <audio
                  ref={audioRef}
                  src={data.songSrc}
                  preload="metadata"
                  controls
                  onEnded={() => setPlaying(false)}
                  className="mt-3 w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Details / Itinerario / RSVP */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* DETAILS */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm lg:col-span-1">
            <h2 className="text-2xl font-black tracking-tight">Los Detalles</h2>

            {/* ✅ DRESS CODE COMPLETO + COLORES */}
            <div className="mt-5 rounded-2xl border border-neutral-900 bg-white p-4">
              <p className="text-xs tracking-[0.3em] text-neutral-600">DRESS CODE</p>

              <p className="mt-2 text-base font-extrabold text-neutral-900">
                Mujeres: <span className="font-black">vestido de cóctel</span>{" "}
                <span className="text-neutral-700">(tonos otoño)</span>
              </p>

              <p className="mt-1 text-base font-extrabold text-neutral-900">
                Hombres: <span className="font-black">traje formal</span>
              </p>

              <p className="mt-3 text-sm text-neutral-700">
                Paleta sugerida (pastel / otoño suave):
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <ColorDot name="Rosa empolvado" className="bg-rose-200" />
             <ColorDot name="Mostaza suave" className="bg-amber-200" />
              <ColorDot name="Oliva suave" className="bg-lime-200" />
                <ColorDot name="Lavanda" className="bg-violet-200" />
                
              </div>

              <p className="mt-3 text-xs text-neutral-500">
                *Evitar blanco (reservado para la novia).
              </p>
            </div>

            {/* Lugar */}
            <div className="mt-4 rounded-2xl border border-neutral-900 bg-white p-4">
              <p className="text-xs tracking-[0.3em] text-neutral-600">LUGAR</p>
              <p className="mt-1 text-lg font-extrabold">{data.venueName}</p>
              <p className="mt-1 text-sm text-neutral-700">{data.address}</p>

              <a
                href={data.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex w-fit items-center justify-center rounded-full border border-neutral-900 px-4 py-2 text-sm font-bold hover:bg-neutral-900 hover:text-white"
              >
                Ver en Google Maps →
              </a>
            </div>
          </section>

          {/* ITINERARIO */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="text-2xl font-black tracking-tight">Itinerario</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {itinerary.map((item) => (
                <div
                  key={item.time + item.title}
                  className="rounded-2xl border border-neutral-900 bg-white p-4"
                >
                  <p className="text-xs tracking-[0.3em] text-neutral-600">{item.time}</p>
                  <p className="mt-1 text-lg font-extrabold">{item.title}</p>
                  {item.note ? (
                    <p className="mt-1 text-sm text-neutral-700">{item.note}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </section>

          {/* RSVP */}
          <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm lg:col-span-3">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 className="text-2xl font-black tracking-tight">RSVP</h2>
              <p className="text-sm text-neutral-700">
                Confirma antes del <span className="font-extrabold">{data.rsvpDeadline}</span>
              </p>
            </div>

            <form onSubmit={submitRsvp} className="mt-6 grid gap-4 md:grid-cols-12">
              <div className="md:col-span-3">
                <p className="text-xs tracking-[0.3em] text-neutral-600">ASISTENCIA</p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setStatus("SI")}
                    className={
                      "rounded-2xl border px-3 py-2 text-sm font-bold " +
                      (status === "SI"
                        ? "border-neutral-900 bg-neutral-900 text-white"
                        : "border-neutral-900 bg-white hover:bg-neutral-50")
                    }
                  >
                    Asistiré
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus("NO")}
                    className={
                      "rounded-2xl border px-3 py-2 text-sm font-bold " +
                      (status === "NO"
                        ? "border-neutral-900 bg-neutral-900 text-white"
                        : "border-neutral-900 bg-white hover:bg-neutral-50")
                    }
                  >
                    No podré
                  </button>
                </div>
              </div>

              <div className="md:col-span-4">
                <Field label="Nombre y apellido">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-2xl border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-900"
                    placeholder="Ej: Laura Frontvita"
                  />
                </Field>
              </div>

              <div className="md:col-span-2">
                <Field label="Invitados">
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full rounded-2xl border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-900"
                  />
                </Field>
              </div>

              <div className="md:col-span-3">
                <Field label="Notas (opcional)">
                  <input
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full rounded-2xl border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-900"
                    placeholder="Alergias, etc."
                  />
                </Field>
              </div>

              <div className="md:col-span-12 flex flex-wrap items-center justify-between gap-3">
                <button
                  disabled={loading}
                  className="rounded-2xl border border-neutral-900 bg-neutral-900 px-6 py-3 text-sm font-extrabold text-white hover:opacity-90 disabled:opacity-60"
                >
                  {loading ? "Enviando..." : "Confirmar asistencia"}
                </button>

                <div className="text-sm">
                  {okMsg ? <span className="font-semibold">{okMsg}</span> : null}
                  {errMsg ? <span className="font-semibold text-red-600">{errMsg}</span> : null}
                </div>
              </div>
            </form>
          </section>
        </div>

        <footer className="text-center text-xs text-neutral-500">Hecho con ♥</footer>
      </div>
    </main>
  );
}

function CountdownTopBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-[64px] rounded-2xl border border-neutral-200 bg-neutral-50 p-3 text-center">
      <div className="text-2xl font-black text-neutral-900 sm:text-3xl">{value}</div>
      <div className="mt-1 text-[10px] font-semibold tracking-[0.35em] text-neutral-600">
        {label}
      </div>
    </div>
  );
}

function ColorDot({ name, className }: { name: string; className: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-semibold text-neutral-700">
      <span className={`h-3 w-3 rounded-full border border-neutral-300 ${className}`} />
      {name}
    </span>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs tracking-[0.3em] text-neutral-600">{label.toUpperCase()}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
