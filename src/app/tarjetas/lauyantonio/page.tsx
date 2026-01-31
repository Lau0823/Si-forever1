"use client";

import React from "react";

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
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50">
      <div className="mx-auto grid min-h-screen max-w-6xl grid-rows-2 gap-4 px-4 py-6 md:gap-6 md:px-6 md:py-10">
        {/* TOMA 1 */}
        <SectionPhoto
          title="FOREVER"
          subtitle="El amor es el viaje más lindo."
          initials="J · E · L"
          badge="Invitación"
          imageSrc="https://i.pinimg.com/736x/3b/0b/3e/3b0b3e875c7d88bd74e4c31036f86b78.jpg"
          align="right"
        >
          <GlassCardRSVP />
        </SectionPhoto>

        {/* TOMA 2 */}
        <SectionPhoto
          title="NOS CASAMOS"
          subtitle="Acompáñanos a celebrar."
          initials="J · E · L"
          badge="Detalles"
          imageSrc="https://i.pinimg.com/736x/6f/89/f3/6f89f3a099d84749ff585328fc149620.jpg"
          align="left"
        >
          <InfoTabs />
        </SectionPhoto>
      </div>
    </main>
  );
}

/* ---------------- SECTION PHOTO ---------------- */

function SectionPhoto({
  title,
  subtitle,
  initials,
  badge,
  imageSrc,
  align,
  children,
}: {
  title: string;
  subtitle: string;
  initials: string;
  badge?: string;
  imageSrc: string;
  align: "left" | "right";
  children: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10">
      <img
        src={imageSrc}
        alt="Foto"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/10" />
      <div className="absolute inset-0 [box-shadow:inset_0_0_160px_rgba(0,0,0,0.7)]" />

      <div className="relative z-10 flex h-full flex-col justify-between p-5 md:p-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-3">
            <span className="font-serif text-xs tracking-[0.45em] text-white/85">
              {initials}
            </span>
            <span className="h-px w-10 bg-white/30" />
            {badge && (
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] tracking-[0.35em] text-white/80 backdrop-blur">
                {badge.toUpperCase()}
              </span>
            )}
          </div>

          <h1 className="font-serif text-4xl tracking-[0.18em] md:text-6xl">
            {title}
          </h1>

          <p className="font-sans text-sm text-white/80 md:text-base">
            {subtitle}
          </p>
        </div>

        <div
          className={`mt-6 flex ${
            align === "right" ? "justify-end" : "justify-start"
          }`}
        >
          <div className="w-full max-w-lg">{children}</div>
        </div>
      </div>
    </section>
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
          <h2 className="font-serif text-2xl tracking-wide md:text-3xl">
            Confirmar asistencia
          </h2>
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

        {/* ACOMPAÑANTE */}
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

        <p className="text-xs text-white/55">
          Luego conectas esto a WhatsApp / Google Sheets / API.
        </p>
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
          <h2 className="font-serif text-2xl tracking-wide md:text-3xl">
            Información
          </h2>
          <p className="mt-2 text-sm text-white/70">
            Todo lo importante en un solo lugar.
          </p>
        </div>

        <span className="hidden md:inline-flex rounded-full border border-white/15 bg-black/20 px-3 py-2 text-[10px] tracking-[0.35em] text-white/70">
          DETAILS
        </span>
      </div>

      <div className="my-5 h-px w-full bg-white/10" />

      {/* TABS */}
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
              <span className={isActive ? "text-black" : "text-white"}>
                {tab.icon}
              </span>
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* CONTENT PANEL (ALL GLASS) */}
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

      {/* MAP GLASS */}
      <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/5">
        <div className="p-3 text-xs tracking-widest text-white/70">
          MAPA
        </div>

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

function Field(
  props: React.InputHTMLAttributes<HTMLInputElement> & { name: string }
) {
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

/* ---------------- ICONS (WHITE SVG) ---------------- */

function IconMusic() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 18V6l12-2v12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function IconHanger() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 7a2 2 0 0 1 2 2c0 1-1 1.5-2 2l-1 .7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M3 19l9-6 9 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 19h14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconPin() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 6v6l4 2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
      <path
        d="M20 6 9 17l-5-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
