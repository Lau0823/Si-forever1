"use client";

import React, { useEffect, useMemo, useState } from "react";

/* ---------------- TYPES ---------------- */

type TabKey = "cancion" | "dresscode" | "lugar" | "itinerario" | "regalos";

const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: "cancion", label: "Canción", icon: <IconMusic /> },
  { key: "dresscode", label: "Dress code", icon: <IconHanger /> },
  { key: "lugar", label: "Lugar", icon: <IconPin /> },
  { key: "itinerario", label: "Itinerario", icon: <IconClock /> },
  { key: "regalos", label: "Regalos", icon: <IconGift /> },
];

/* ---------------- PAGE ---------------- */

export default function Page() {
  // ✅ CAMBIA ESTO
  const couple = { one: "JULIANA", two: "ESTEBAN" };
  const eventDateISO = "2026-02-14T16:00:00-05:00"; // Bogotá -05:00
  const eventDate = useMemo(() => new Date(eventDateISO), [eventDateISO]);

  // ✅ Banners + fotos (se mantiene el estilo glass / irreverente)
  const PHOTOS = {
    banner1:
      "https://i.pinimg.com/1200x/1d/40/53/1d405397ef63af5f31d327778a3c86e2.jpg",
    banner2:
      "https://i.pinimg.com/736x/6f/89/f3/6f89f3a099d84749ff585328fc149620.jpg",
    cards: [
      "https://i.pinimg.com/736x/3b/0b/3e/3b0b3e875c7d88bd74e4c31036f86b78.jpg",
      "https://i.pinimg.com/736x/6f/89/f3/6f89f3a099d84749ff585328fc149620.jpg",
    ],
  };

  const prettyDate = useMemo(() => {
    const d = eventDate.toLocaleDateString("es-CO", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const t = eventDate.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });
    return { d, t };
  }, [eventDate]);

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50">
      {/* ✨ fondo sutil para jerarquía */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_20%_0%,rgba(255,255,255,0.10),transparent_60%),radial-gradient(50%_45%_at_85%_15%,rgba(255,255,255,0.08),transparent_60%),radial-gradient(55%_45%_at_50%_90%,rgba(255,255,255,0.05),transparent_60%)]" />
        <div className="absolute inset-0 bg-neutral-950/40" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-10">
        {/* ✅ HERO 1 */}
        <BannerHero
          imageSrc={PHOTOS.banner1}
          title="FOREVER"
          subtitle="El amor es el viaje más lindo."
          badge="Invitación"
          couple={couple}
          eventDate={eventDate}
          showCoupleAndCountdown
          metaRight={`${prettyDate.d} · ${prettyDate.t}`}
        />

        {/* ✅ ENTRE BANNERS: mejor jerarquía + diagramación */}
        <section className="mt-6 md:mt-10">
          {/* Encabezado de sección (jerarquía) */}
          <div className="mb-4 flex flex-col gap-3 md:mb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.45em] text-white/55">
                Información rápida
              </p>
              <h2 className="mt-2 font-serif text-2xl tracking-wide md:text-4xl">
                Todo lo esencial, sin perder el mood
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-white/70 md:text-base">
                Confirma asistencia, deja una canción, revisa dress code, lugar, itinerario y regalos.
              </p>
            </div>

            
          </div>

          {/* Layout más editorial:
              - Desktop: izquierda “mosaico + highlight card”
              - derecha: RSVP + Tabs en stack
          */}
          <div className="grid gap-5 md:grid-cols-[1fr_440px] md:gap-6">
            {/* LEFT */}
            <div className="space-y-5 md:space-y-6">
              {/* Mosaico más pro: 1 grande + 1 vertical */}
              <PhotoMosaic images={PHOTOS.cards} />

              {/* Card highlight: ayuda a jerarquía y “aire” */}
              <GlassCard>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.45em] text-white/55">
                      Nota de los novios
                    </p>
                    <h3 className="mt-2 font-serif text-xl tracking-wide md:text-2xl">
                      “Que lo simple se sienta increíble.”
                    </h3>
                    <p className="mt-2 text-sm text-white/70">
                      Queremos que disfrutes sin preocuparte: aquí está todo lo importante.
                    </p>
                  </div>

                  <span className="hidden md:inline-flex items-center rounded-2xl border border-white/15 bg-white/10 px-3 py-2 text-[10px] tracking-[0.35em] text-white/75 backdrop-blur">
                    INFO
                  </span>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <Stat label="Evento" value="Boda" />
                  <Stat label="Ciudad" value="Bogotá" />
                </div>
              </GlassCard>
            </div>

            {/* RIGHT */}
            <div className="space-y-5 md:space-y-6">
              <GlassCardRSVP />
              <InfoTabs />
            </div>
          </div>
        </section>

        {/* ✅ HERO 2 */}
        <div className="mt-6 md:mt-10">
          <BannerHero
            imageSrc={PHOTOS.banner2}
            title="NOS CASAMOS"
            subtitle="Acompáñanos a celebrar."
            badge="Detalles"
            couple={couple}
            eventDate={eventDate}
            showCoupleAndCountdown={false}
            metaRight={`${prettyDate.d} · ${prettyDate.t}`}
          />
        </div>

        <footer className="mt-10 pb-4 pt-6 text-center text-xs text-white/55">
          Hecho con amor ♥
        </footer>
      </div>
    </main>
  );
}

/* ---------------- BANNER HERO ---------------- */

function BannerHero({
  imageSrc,
  title,
  subtitle,
  badge,
  couple,
  eventDate,
  showCoupleAndCountdown,
  metaRight,
}: {
  imageSrc: string;
  title: string;
  subtitle: string;
  badge?: string;
  couple: { one: string; two: string };
  eventDate: Date;
  showCoupleAndCountdown?: boolean;
  metaRight?: string;
}) {
  const initials = useMemo(() => {
    const a = (couple.one?.trim()?.[0] || "A").toUpperCase();
    const b = (couple.two?.trim()?.[0] || "B").toUpperCase();
    return `${a} · ${b}`;
  }, [couple.one, couple.two]);

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10">
      <img
        src={imageSrc}
        alt="Foto banner"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
      <div className="absolute inset-0 [box-shadow:inset_0_0_180px_rgba(0,0,0,0.75)]" />

      {/* ✨ Top bar (mejora jerarquía visual del banner) */}
      <div className="relative z-10 flex items-center justify-between gap-3 px-5 pt-5 md:px-8 md:pt-7 lg:px-10">
        <div className="inline-flex flex-wrap items-center gap-3">
          <span className="font-serif text-xs tracking-[0.45em] text-white/85">
            {initials}
          </span>
          <span className="h-px w-10 bg-white/30" />
          {badge ? (
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] tracking-[0.35em] text-white/80 backdrop-blur">
              {badge.toUpperCase()}
            </span>
          ) : null}
        </div>

        {metaRight ? (
          <span className="hidden md:inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] tracking-[0.35em] text-white/75 backdrop-blur">
            {metaRight}
          </span>
        ) : null}
      </div>

      <div className="relative z-10 px-5 pb-5 pt-4 md:px-8 md:pb-8 md:pt-6 lg:px-10">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          {/* Left: title */}
          <div className="space-y-3">
            <h1 className="font-serif text-4xl tracking-[0.18em] md:text-6xl">
              {title}
            </h1>
            <p className="max-w-xl text-sm text-white/80 md:text-base">
              {subtitle}
            </p>
          </div>

          {/* Right: couple + countdown (más “editorial”, no pega raro en mobile) */}
          {showCoupleAndCountdown ? (
            <div className="md:justify-self-end">
              <div className="rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl md:p-5">
                <p className="text-[10px] uppercase tracking-[0.45em] text-white/60">
                  Los novios
                </p>
                <p className="mt-2 font-serif text-2xl tracking-[0.12em] md:text-3xl">
                  {couple.one} <span className="text-white/80">♥</span> {couple.two}
                </p>

                <div className="my-4 h-px w-full bg-white/10" />

                <p className="text-[10px] uppercase tracking-[0.45em] text-white/60">
                  Cuenta regresiva
                </p>
                <div className="mt-2">
                  <CountdownPills eventDate={eventDate} />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* ---------------- GLASS CARD WRAPPER ---------------- */

function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-xl md:p-7">
      {children}
    </div>
  );
}

/* ---------------- MOSAIC (MEJOR DIAGRAMACIÓN) ---------------- */

function PhotoMosaic({ images }: { images: string[] }) {
  const a = images[0];
  const b = images[1];

  return (
    <div className="grid gap-3 md:grid-cols-[1.25fr_0.75fr]">
      <div className="relative overflow-hidden rounded-3xl border border-white/10">
        <img
          src={a}
          alt="Foto grande"
          className="h-[280px] w-full object-cover md:h-[420px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[10px] tracking-[0.35em] text-white/80 backdrop-blur">
            MOMENT
          </span>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-white/10">
        <img
          src={b}
          alt="Foto vertical"
          className="h-[280px] w-full object-cover md:h-[420px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[10px] tracking-[0.35em] text-white/80 backdrop-blur">
            VIBE
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- COUNTDOWN ---------------- */

function CountdownPills({ eventDate }: { eventDate: Date }) {
  const [mounted, setMounted] = useState(false);
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0, done: false });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;

    const tick = () => {
      const diff = eventDate.getTime() - Date.now();
      if (diff <= 0) {
        setT({ d: 0, h: 0, m: 0, s: 0, done: true });
        return;
      }
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setT({ d, h, m, s, done: false });
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [mounted, eventDate]);

  return (
    <div className="flex flex-wrap gap-2">
      <Pill label="DÍAS" value={mounted ? String(t.d) : "—"} />
      <Pill label="HRS" value={mounted ? String(t.h) : "—"} />
      <Pill label="MIN" value={mounted ? String(t.m) : "—"} />
      <Pill label="SEG" value={mounted ? String(t.s) : "—"} />
      {mounted && t.done ? (
        <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[10px] tracking-[0.28em] text-white/80 backdrop-blur">
          HOY ✨
        </span>
      ) : null}
    </div>
  );
}

function Pill({ label, value }: { label: string; value: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[10px] tracking-[0.28em] text-white/85 backdrop-blur">
      <span className="text-white/60">{label}</span>
      <span className="tabular-nums text-white">{value}</span>
    </div>
  );
}

/* ---------------- SMALL PIECES ---------------- */

function MiniChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] tracking-[0.35em] text-white/70 backdrop-blur">
      {children}
    </span>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-black/20 px-4 py-3">
      <p className="text-[10px] uppercase tracking-[0.35em] text-white/55">{label}</p>
      <p className="mt-1 font-serif text-lg tracking-wide text-white/90">{value}</p>
    </div>
  );
}

/* ---------------- RSVP CARD (GLASS) ---------------- */

function GlassCardRSVP() {
  const [sending, setSending] = React.useState(false);
  const [hasPlusOne, setHasPlusOne] = React.useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const payload = {
      nombre: String(fd.get("name") ?? ""),
      whatsapp: String(fd.get("phone") ?? ""),
      asistencia: String(fd.get("attendance") ?? "yes"),
      invitados: String(fd.get("guests") ?? ""),
      conAcompanante: hasPlusOne,
      acompanante: hasPlusOne ? String(fd.get("plusOneName") ?? "") : "",
      nota: String(fd.get("note") ?? ""),
    };

    setSending(true);
    setTimeout(() => {
      setSending(false);
      console.log("RSVP payload:", payload);
      alert("¡RSVP guardado! ✅ (conecta tu API aquí)");
      e.currentTarget.reset();
      setHasPlusOne(false);
    }, 700);
  }

  return (
    <div className="rounded-3xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-xl md:p-7">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl tracking-wide md:text-3xl">Confirmar asistencia</h2>
          <p className="mt-2 text-sm text-white/70">
            Por favor confirma para ayudarnos con la organización.
          </p>
        </div>

        <span className="hidden md:inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-black/20 px-3 py-2 text-[10px] tracking-[0.35em] text-white/75">
          <IconCheck />
          RSVP
        </span>
      </div>

      <div className="my-5 h-px w-full bg-white/10" />

      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="grid gap-3 md:grid-cols-2">
          <Field name="name" placeholder="Nombre" required />
          <Field name="phone" placeholder="WhatsApp" />
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <select
            name="attendance"
            className="w-full rounded-2xl border border-white/15 bg-black/25 px-4 py-3 text-sm outline-none focus:border-white/35"
            defaultValue="yes"
          >
            <option value="yes">Sí, asistiré</option>
            <option value="no">No podré</option>
          </select>

          <Field name="guests" placeholder="N° de invitados" inputMode="numeric" />
        </div>

        <div className="rounded-2xl border border-white/15 bg-black/25 p-4">
          <label className="flex items-center justify-between gap-3">
            <span className="text-sm text-white/85">¿Traes acompañante?</span>
            <button
              type="button"
              onClick={() => setHasPlusOne((v) => !v)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                hasPlusOne
                  ? "bg-white text-black"
                  : "border border-white/25 bg-white/5 text-white/85 hover:bg-white/10"
              }`}
            >
              {hasPlusOne ? "Sí" : "No"}
            </button>
          </label>

          {hasPlusOne && (
            <div className="mt-3">
              <Field name="plusOneName" placeholder="Nombre del acompañante" />
            </div>
          )}
        </div>

        <textarea
          name="note"
          className="w-full rounded-2xl border border-white/15 bg-black/25 px-4 py-3 text-sm outline-none placeholder:text-white/50 focus:border-white/35"
          placeholder="Nota (alergias, comentarios, etc.)"
          rows={3}
        />

        <button
          type="submit"
          disabled={sending}
          className="w-full rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90 disabled:opacity-60"
        >
          {sending ? "Enviando..." : "Enviar confirmación"}
        </button>

        <p className="text-xs text-white/55">Luego conectas esto a WhatsApp / Google Sheets / API.</p>
      </form>
    </div>
  );
}

/* ---------------- INFO TABS (GLASS) ---------------- */

function InfoTabs() {
  const [active, setActive] = React.useState<TabKey>("cancion");

  return (
    <div className="rounded-3xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-xl md:p-7">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl tracking-wide md:text-3xl">Información</h2>
          <p className="mt-2 text-sm text-white/70">Todo lo importante en un solo lugar.</p>
        </div>

        <span className="hidden md:inline-flex rounded-full border border-white/15 bg-black/20 px-3 py-2 text-[10px] tracking-[0.35em] text-white/70">
          DETAILS
        </span>
      </div>

      <div className="my-5 h-px w-full bg-white/10" />

      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => {
          const isActive = tab.key === active;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActive(tab.key)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs tracking-widest transition ${
                isActive
                  ? "bg-white text-black"
                  : "border border-white/30 bg-white/5 text-white/85 hover:bg-white/10"
              }`}
            >
              <span className={isActive ? "text-black" : "text-white"}>{tab.icon}</span>
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mt-5 rounded-2xl border border-white/15 bg-black/25 p-4">
        {active === "cancion" && <TabSong />}
        {active === "dresscode" && <TabDresscode />}
        {active === "lugar" && <TabLugar />}
        {active === "itinerario" && <TabItinerario />}
        {active === "regalos" && <TabRegalos />}
      </div>
    </div>
  );
}

/* ---------------- TAB CONTENT ---------------- */

function TabSong() {
  const [sending, setSending] = React.useState(false);

  function handleSong(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const payload = {
      cancion: String(fd.get("song") ?? ""),
      artista: String(fd.get("artist") ?? ""),
      quien: String(fd.get("by") ?? ""),
    };

    setSending(true);
    setTimeout(() => {
      setSending(false);
      console.log("Song payload:", payload);
      alert("¡Sugerencia enviada! 🎶 (conecta tu API aquí)");
      e.currentTarget.reset();
    }, 700);
  }

  return (
    <form className="space-y-3" onSubmit={handleSong}>
      <div className="flex items-center gap-2 text-white/85">
        <span className="text-white">
          <IconMusic />
        </span>
        <p className="text-sm">Deja tu sugerencia de canción:</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Field name="song" placeholder="Canción" required />
        <Field name="artist" placeholder="Artista" required />
      </div>

      <Field name="by" placeholder="Tu nombre (opcional)" />

      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/15 disabled:opacity-60"
      >
        {sending ? "Enviando..." : "Enviar sugerencia"}
      </button>
    </form>
  );
}

function TabDresscode() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-white/85">
        <span className="text-white">
          <IconHanger />
        </span>
        <p className="text-sm">Elegante (semi-formal). Tonos claros recomendados.</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/75">
        <ul className="space-y-2">
          <li className="flex gap-2">
            <IconDot />
            <span>Hombres: camisa + pantalón vestir (traje opcional)</span>
          </li>
          <li className="flex gap-2">
            <IconDot />
            <span>Mujeres: vestido midi/largo o conjunto elegante</span>
          </li>
          <li className="flex gap-2">
            <IconDot />
            <span>Evitar: tenis deportivos, jeans rotos</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function TabLugar() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-white/85">
        <span className="text-white">
          <IconPin />
        </span>
        <div>
          <p className="text-sm font-semibold text-white">Club Los Lagartos</p>
          <p className="text-xs text-white/65">Ubicación del evento</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/5">
        <div className="p-3 text-xs tracking-widest text-white/70">MAPA</div>

        <div className="aspect-[16/10] w-full">
          <iframe
            title="Mapa Club Los Lagartos"
            className="h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=Club%20Los%20Lagartos&output=embed"
          />
        </div>
      </div>

      <a
        href="https://www.google.com/maps?q=Club%20Los%20Lagartos"
        target="_blank"
        rel="noreferrer"
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
      >
        <span className="text-black">
          <IconPin />
        </span>
        Abrir en Google Maps
      </a>
    </div>
  );
}

function TabItinerario() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-white/85">
        <span className="text-white">
          <IconClock />
        </span>
        <p className="text-sm">Un vistazo rápido al día:</p>
      </div>

      <div className="space-y-2 text-sm text-white/80">
        <Row time="4:00 PM" label="Ceremonia" />
        <Row time="5:00 PM" label="Cóctel" />
        <Row time="6:30 PM" label="Recepción" />
        <Row time="9:00 PM" label="Fiesta" />
      </div>
    </div>
  );
}

function TabRegalos() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-white/85">
        <span className="text-white">
          <IconGift />
        </span>
        <p className="text-sm">Gracias por acompañarnos 💛</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/75">
        Lluvia de sobres o transferencia.
        <br />
        (Pones aquí tus datos / link)
      </div>
    </div>
  );
}

/* ---------------- SMALL UI ---------------- */

function Row({ time, label }: { time: string; label: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <span className="text-xs tracking-widest text-white/70">{time}</span>
      <span className="text-sm text-white/85">{label}</span>
    </div>
  );
}

function Field(props: React.InputHTMLAttributes<HTMLInputElement> & { name: string }) {
  return (
    <input
      {...props}
      className={[
        "w-full rounded-2xl border border-white/15 bg-black/25 px-4 py-3 text-sm outline-none",
        "placeholder:text-white/50 focus:border-white/35",
        props.className ?? "",
      ].join(" ")}
    />
  );
}

/* ---------------- ICONS ---------------- */

function IconMusic() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M9 18V6l12-2v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function IconHanger() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 7a2 2 0 0 1 2 2c0 1-1 1.5-2 2l-1 .7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M3 19l9-6 9 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 19h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconPin() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconGift() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="7" width="20" height="5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="4" y="12" width="16" height="10" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7v15" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconDot() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <circle cx="5" cy="5" r="2" fill="currentColor" />
    </svg>
  );
}
