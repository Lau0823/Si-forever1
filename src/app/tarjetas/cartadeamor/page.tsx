"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";

const serif = Playfair_Display({ subsets: ["latin"], weight: ["500", "600", "700"] });
const sans = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function WeddingInviteCardStyle() {
  // ✅ CAMBIA ESTO
  const couple = { one: "Laura", two: "Antonio" };
  const eventDateISO = "2026-02-14T16:00:00-05:00";
  const eventDate = useMemo(() => new Date(eventDateISO), [eventDateISO]);

  // ✅ Imágenes
  const PHOTOS = {
    heroLeftBg: "https://i.pinimg.com/736x/46/96/80/469680bec8a2451d909321f0b218554e.jpg",
    heroRightPhoto: "https://i.pinimg.com/736x/46/96/80/469680bec8a2451d909321f0b218554e.jpg",
    bannerTwo: "https://i.pinimg.com/736x/46/96/80/469680bec8a2451d909321f0b218554e.jpg",
  };

  // ✅ Links
  const mapsLink = "https://maps.google.com/?q=Hacienda+El+Rosal";
  const nequiNumber = "3001234567";
  const nequiWhatsapp = `https://wa.me/57${nequiNumber}?text=${encodeURIComponent(
    `Hola 💗 quiero hacer una donación para ${couple.one} & ${couple.two}. Mi aporte es: $_____. Nequi: ${nequiNumber}`
  )}`;

  // ✅ Lista de regalos para MODAL
  const giftIdeas = useMemo(
    () => [
      "Lavadora",
      "Secadora",
      "Aspiradora",
      "Plancha",
      "TV Smart",
      "Ropa de cama matrimonial",
      "Licuadora",
      "Juego de ollas",
    ],
    []
  );

  // ✅ Iniciales para estilo naipe
  const initials = useMemo(() => {
    const a = (couple.one?.trim()?.[0] || "A").toUpperCase();
    const b = (couple.two?.trim()?.[0] || "B").toUpperCase();
    return `${a}${b}`;
  }, [couple.one, couple.two]);

  // ❤️ Lluvia de corazones
  const hearts = useMemo(
    () => [
      { left: "4%", delay: "0s", dur: "9s", size: 10, op: 0.22 },
      { left: "8%", delay: "1.2s", dur: "11s", size: 14, op: 0.26 },
      { left: "12%", delay: "2.0s", dur: "12s", size: 12, op: 0.22 },
      { left: "16%", delay: "0.8s", dur: "10s", size: 18, op: 0.25 },
      { left: "20%", delay: "1.7s", dur: "13s", size: 11, op: 0.2 },
      { left: "24%", delay: "2.6s", dur: "9.8s", size: 15, op: 0.26 },
      { left: "28%", delay: "0.3s", dur: "12.5s", size: 12, op: 0.22 },
      { left: "32%", delay: "1.4s", dur: "10.6s", size: 10, op: 0.18 },
      { left: "36%", delay: "2.4s", dur: "11.8s", size: 16, op: 0.24 },
      { left: "40%", delay: "0.6s", dur: "13.2s", size: 12, op: 0.2 },
      { left: "44%", delay: "1.0s", dur: "9.6s", size: 14, op: 0.24 },
      { left: "48%", delay: "2.8s", dur: "12.8s", size: 11, op: 0.2 },
      { left: "52%", delay: "0.2s", dur: "11.1s", size: 18, op: 0.26 },
      { left: "56%", delay: "1.9s", dur: "10.2s", size: 12, op: 0.2 },
      { left: "60%", delay: "2.2s", dur: "13.4s", size: 15, op: 0.24 },
      { left: "64%", delay: "0.9s", dur: "12s", size: 10, op: 0.18 },
      { left: "68%", delay: "1.5s", dur: "9.9s", size: 14, op: 0.24 },
      { left: "72%", delay: "2.9s", dur: "12.6s", size: 11, op: 0.2 },
      { left: "76%", delay: "0.4s", dur: "10.8s", size: 16, op: 0.25 },
      { left: "80%", delay: "1.8s", dur: "13.1s", size: 12, op: 0.2 },
      { left: "84%", delay: "2.5s", dur: "11.6s", size: 14, op: 0.24 },
      { left: "88%", delay: "0.7s", dur: "12.9s", size: 10, op: 0.18 },
      { left: "92%", delay: "2.1s", dur: "10.4s", size: 15, op: 0.24 },
      { left: "96%", delay: "1.1s", dur: "13.6s", size: 12, op: 0.2 },
    ],
    []
  );

  // Countdown
  const [mounted, setMounted] = useState(false);
  const [countdown, setCountdown] = useState({ d: 0, h: 0, m: 0, s: 0, done: false });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const tick = () => {
      const diff = eventDate.getTime() - Date.now();
      if (diff <= 0) {
        setCountdown({ d: 0, h: 0, m: 0, s: 0, done: true });
        return;
      }
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setCountdown({ d, h, m, s, done: false });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [mounted, eventDate]);

  const datePretty = useMemo(() => {
    const d = eventDate.toLocaleDateString("es-CO", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    const t = eventDate.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });
    return { d, t };
  }, [eventDate]);

  // RSVP + Song (form único)
  const [rsvp, setRsvp] = useState({ name: "", guests: "1", attending: "yes", note: "" });
  const [song, setSong] = useState({ title: "", artist: "" });

  // ✅ Toggle para desplegar form de canción (en la card)
  const [songOpen, setSongOpen] = useState(false);

  // ✅ Modal de regalos
  const [giftModalOpen, setGiftModalOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setGiftModalOpen(false);
    };
    if (giftModalOpen) {
      window.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [giftModalOpen]);

  return (
    <main className={`${sans.className} min-h-screen bg-[#f6f4f1] text-[#111]`}>
      {/* HEART RAIN */}
      <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
        {hearts.map((h, i) => (
          <span
            key={i}
            className="heart-fall"
            style={
              {
                left: h.left,
                animationDelay: h.delay,
                animationDuration: h.dur,
                fontSize: `${h.size}px`,
                opacity: h.op,
              } as React.CSSProperties
            }
          >
            ♥
          </span>
        ))}
      </div>

      {/* MODAL REGALOS */}
      {giftModalOpen ? (
        <div className="modalOverlay" role="dialog" aria-modal="true" aria-label="Lista de regalos">
          <button className="modalBackdrop" onClick={() => setGiftModalOpen(false)} aria-label="Cerrar" />
          <div className="modalCard">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.35em] text-black/55">Lista de regalos</p>
                <h3 className={`${serif.className} mt-2 text-2xl font-semibold`}>
                  Cositas para el hogar <span className="text-[#b21d2a]">♥</span>
                </h3>
                <p className="mt-2 text-sm text-black/60">Elige una y escríbenos para coordinar.</p>
              </div>

              <button type="button" className="iconBtn" onClick={() => setGiftModalOpen(false)} aria-label="Cerrar modal">
                ✕
              </button>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {giftIdeas.map((g) => (
                <div key={g} className="giftItem">
                  <span className="text-[#b21d2a]">♥</span>
                  <span className="text-sm font-semibold text-black/80">{g}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={nequiWhatsapp}
                target="_blank"
                rel="noreferrer"
                className="outline-btn flex-1 rounded-full px-6 py-3 text-center text-sm font-semibold"
              >
                Donar por Nequi →
              </a>

              <a
                href={`https://wa.me/57${nequiNumber}?text=${encodeURIComponent(
                  `Hola 💌 Quiero ayudar con un regalo para ${couple.one} & ${couple.two}. Mi regalo es: ____`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="outline-btn flex-1 rounded-full px-6 py-3 text-center text-sm font-semibold"
              >
                Elegí un regalo (WhatsApp)
              </a>
            </div>

            <div className="mt-6">
              <button type="button" className="outline-btn w-full rounded-full px-6 py-3 text-sm font-semibold" onClick={() => setGiftModalOpen(false)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 pb-12 pt-8 sm:pt-10">
        {/* ✅ PRIMERO: BANNER HERO */}
        <section className="overflow-hidden rounded-[34px] ring-1 ring-[#b21d2a]/15 bg-white shadow-[0_22px_90px_rgba(0,0,0,0.11)]">
          <div className="relative">
            <img src={PHOTOS.bannerTwo} alt="Banner" className="h-[430px] w-full object-cover sm:h-[520px] lg:h-[620px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
            <div className="absolute inset-0 p-6 sm:p-10 lg:p-12 flex items-end">
              <div className="w-full">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-[11px] uppercase tracking-[0.35em] text-white/80">Invitación digital</div>
                  <div className="inline-flex rounded-full bg-white/15 px-4 py-2 text-[11px] font-semibold text-white/85 ring-1 ring-white/15 backdrop-blur-xl">
                    {mounted ? `${datePretty.d} · ${datePretty.t}` : "—"}
                  </div>
                </div>

                <h1 className={`${serif.className} mt-6 text-white text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05]`}>
                  {couple.one} <span className="text-white/90">♥</span> {couple.two}
                </h1>

                <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/85">
                  Nos encantaría que nos acompañes en el inicio de nuestra historia.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <HeroPill label="Días" value={mounted ? (countdown.done ? "0" : String(countdown.d)) : "—"} />
                  <HeroPill label="Horas" value={mounted ? (countdown.done ? "0" : String(countdown.h)) : "—"} />
                  <HeroPill label="Min" value={mounted ? (countdown.done ? "0" : String(countdown.m)) : "—"} />
                  <HeroPill label="Seg" value={mounted ? (countdown.done ? "0" : String(countdown.s)) : "—"} />
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a href="#rsvp" className="outline-btn heroBtn flex-1 rounded-full px-6 py-3 text-center text-sm font-semibold">
                    Confirmar asistencia
                  </a>
                  <a href="#info" className="outline-btn heroBtn flex-1 rounded-full px-6 py-3 text-center text-sm font-semibold">
                    Ver detalles
                  </a>
                  <button type="button" onClick={() => setGiftModalOpen(true)} className="red-btn flex-1 rounded-full px-6 py-3 text-center text-sm font-semibold">
                    Ver lista de regalos ♥
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ✅ TODAS LAS CARDS COMO NAIPE (y una invertida roja) */}
        <section className="mt-7 grid gap-5 lg:grid-cols-2">
          {/* Card 1 */}
          <PlayingCard initials={initials} variant="default">
            <p className="text-[11px] uppercase tracking-[0.35em] text-black/55">Detalles rápidos</p>
            <h2 className={`${serif.className} mt-4 text-3xl sm:text-4xl font-semibold leading-[1.1]`}>
              {couple.one} <span className="text-[#b21d2a]">♥</span> {couple.two}
            </h2>
            <p className="mt-4 text-sm text-black/65 max-w-md">
              Una invitación inspirada en naipes, minimal y moderna.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setSongOpen((v) => !v)}
                className="outline-btn flex-1 rounded-full px-6 py-3 text-center text-sm font-semibold"
              >
                {songOpen ? "Cerrar sugerencia" : "Sugerir canción"}
              </button>

              <button
                type="button"
                onClick={() => setGiftModalOpen(true)}
                className="outline-btn flex-1 rounded-full px-6 py-3 text-center text-sm font-semibold"
              >
                Regalos
              </button>
            </div>

            {/* ✅ Form de canción: SOLO AQUÍ (una sola vez) */}
            {songOpen ? (
              <div className="mt-6 rounded-[22px] bg-white/60 p-5 ring-1 ring-black/10">
                <p className="text-[11px] uppercase tracking-[0.35em] text-black/55">Playlist</p>
                <h3 className={`${serif.className} mt-2 text-2xl font-semibold`}>Sugiérenos una canción</h3>
                <p className="mt-2 text-sm text-black/65">Queremos bailar contigo 💃🕺</p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <Field label="Canción" value={song.title} onChange={(v) => setSong((p) => ({ ...p, title: v }))} placeholder="Ej: Perfect" />
                  <Field label="Artista" value={song.artist} onChange={(v) => setSong((p) => ({ ...p, artist: v }))} placeholder="Ej: Ed Sheeran" />
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={`https://wa.me/57${nequiNumber}?text=${encodeURIComponent(
                      `Canción sugerida 🎵\nCanción: ${song.title || "(sin título)"}\nArtista: ${song.artist || "(sin artista)"}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="outline-btn flex-1 rounded-full px-6 py-3 text-center text-sm font-semibold"
                  >
                    Enviar sugerencia
                  </a>
                  <a href={mapsLink} target="_blank" rel="noreferrer" className="outline-btn flex-1 rounded-full px-6 py-3 text-center text-sm font-semibold">
                    Ver ubicación
                  </a>
                </div>
              </div>
            ) : null}
          </PlayingCard>

          {/* ✅ Card 2 (invertida) */}
          <PlayingCard initials={initials} variant="inverted">
            <p className="text-[11px] uppercase tracking-[0.35em] text-white/80">Tarjeta especial</p>
            <h3 className={`${serif.className} mt-4 text-3xl sm:text-4xl font-semibold leading-[1.1] text-white`}>
              Todo al rojo <span className="text-white/90">♥</span>
            </h3>
            <p className="mt-4 text-sm text-white/85 max-w-md">
              
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <a href="#rsvp" className="inv-btn rounded-full px-6 py-3 text-center text-sm font-semibold">
                RSVP
              </a>
              <button type="button" onClick={() => setGiftModalOpen(true)} className="inv-btn rounded-full px-6 py-3 text-center text-sm font-semibold">
                Regalos ♥
              </button>
            </div>

            <div className="mt-6 rounded-[22px] bg-white/10 p-5 ring-1 ring-white/15">
              <p className="text-[11px] uppercase tracking-[0.35em] text-white/80">Tip</p>
              <p className="mt-2 text-sm text-white/85">
                Puedes usar esta como “highlight” para una sección premium (por ejemplo: Dress code / Itinerario).
              </p>
            </div>
          </PlayingCard>
        </section>

        {/* INFO (todas como naipe) */}
        <section id="info" className="mt-10 grid gap-5 lg:grid-cols-3">
          <PlayingCard initials={initials} variant="default">
            <InfoInner title="Lugar" subtitle="Dónde será" icon="📍">
              <div className="text-sm text-black/70">
                Hacienda El Rosal <br />
                Medellín, Colombia
              </div>
              <div className="mt-4">
                <a href={mapsLink} target="_blank" rel="noreferrer" className="outline-btn inline-flex rounded-full px-5 py-3 text-sm font-semibold">
                  Ver en Maps
                </a>
              </div>
            </InfoInner>
          </PlayingCard>

          <PlayingCard initials={initials} variant="default">
            <InfoInner title="Dress Code" subtitle="Cómo ir" icon="👗">
              <div className="text-sm text-black/70">
                Formal / elegante <br />
                <span className="text-black/55">Evitar blanco y rojo intenso</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="chip">Tonos neutros</span>
                <span className="chip">Pasteles</span>
                <span className="chip">Negro elegante</span>
              </div>
            </InfoInner>
          </PlayingCard>

          <PlayingCard initials={initials} variant="default">
            <InfoInner title="Itinerario" subtitle="Horario" icon="⏳">
              <ul className="text-sm text-black/70 space-y-2">
                <li className="flex items-center justify-between"><span>Ceremonia</span><span className="font-semibold text-black/70">4:00 pm</span></li>
                <li className="flex items-center justify-between"><span>Brindis</span><span className="font-semibold text-black/70">5:00 pm</span></li>
                <li className="flex items-center justify-between"><span>Recepción</span><span className="font-semibold text-black/70">6:00 pm</span></li>
                <li className="flex items-center justify-between"><span>Fiesta</span><span className="font-semibold text-black/70">8:00 pm</span></li>
              </ul>
            </InfoInner>
          </PlayingCard>
        </section>

        {/* RSVP (naipe) */}
        <section className="mt-10">
          <PlayingCard initials={initials} variant="default">
            <div id="rsvp" className="p-0">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.35em] text-black/55">RSVP</p>
                  <h3 className={`${serif.className} mt-3 text-2xl sm:text-3xl font-semibold`}>Confirma tu asistencia</h3>
                </div>
                <span className="rounded-full bg-[#b21d2a]/10 px-4 py-2 text-[11px] font-semibold text-[#b21d2a] ring-1 ring-[#b21d2a]/20">
                  {mounted && countdown.done ? "Hoy" : "Evento"}
                </span>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <Field label="Nombre" value={rsvp.name} onChange={(v) => setRsvp((p) => ({ ...p, name: v }))} placeholder="Tu nombre" />
                <Field label="Número de invitados" value={rsvp.guests} onChange={(v) => setRsvp((p) => ({ ...p, guests: v }))} placeholder="1" />

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-black/60 mb-2">¿Asistes?</label>
                  <div className="flex flex-wrap gap-2">
                    <button className={`toggle ${rsvp.attending === "yes" ? "toggleOn" : ""}`} onClick={() => setRsvp((p) => ({ ...p, attending: "yes" }))} type="button">
                      Sí, allá estaré
                    </button>
                    <button className={`toggle ${rsvp.attending === "no" ? "toggleOn" : ""}`} onClick={() => setRsvp((p) => ({ ...p, attending: "no" }))} type="button">
                      No puedo asistir
                    </button>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-black/60 mb-2">Nota (opcional)</label>
                  <textarea
                    value={rsvp.note}
                    onChange={(e) => setRsvp((p) => ({ ...p, note: e.target.value }))}
                    placeholder="Alergias, mensaje para los novios, etc."
                    className="w-full rounded-2xl bg-white/70 px-4 py-3 text-sm text-black/80 ring-1 ring-[#b21d2a]/15 outline-none focus:ring-[#b21d2a]/30"
                    rows={3}
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`https://wa.me/57${nequiNumber}?text=${encodeURIComponent(
                    `RSVP 💌\nNombre: ${rsvp.name || "(sin nombre)"}\nInvitados: ${rsvp.guests}\nAsiste: ${
                      rsvp.attending === "yes" ? "Sí" : "No"
                    }\nNota: ${rsvp.note || "-"}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="outline-btn flex-1 rounded-full px-6 py-3 text-center text-sm font-semibold"
                >
                  Enviar RSVP
                </a>

                <button type="button" onClick={() => setGiftModalOpen(true)} className="red-btn flex-1 rounded-full px-6 py-3 text-center text-sm font-semibold">
                  Lista de regalos ♥
                </button>
              </div>

              <p className="mt-4 text-xs text-black/50">
                
              </p>
            </div>
          </PlayingCard>
        </section>

        <footer className="mt-10 pb-10 pt-10 text-center text-sm text-black/55">
          Con amor, <span className="font-semibold text-black/70">{couple.one} & {couple.two}</span> ♥
        </footer>
      </div>

      {/* GLOBAL STYLES */}
      <style jsx global>{`
        :root {
          --red: #b21d2a;
          --redRing: rgba(178, 29, 42, 0.28);
        }

        /* ✅ BOTÓN outline */
        .outline-btn {
          background: rgba(255, 255, 255, 0.55);
          border: 1px solid var(--redRing);
          color: rgba(17, 17, 17, 0.82);
          box-shadow: 0 10px 26px rgba(0, 0, 0, 0.07);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          transition: transform 0.12s ease, background 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
        }
        .outline-btn:hover {
          background: rgba(255, 255, 255, 0.75);
          border-color: rgba(178, 29, 42, 0.45);
          box-shadow: 0 16px 40px rgba(178, 29, 42, 0.12);
        }
        .outline-btn:active {
          transform: scale(0.985);
        }

        /* ✅ botón rojo (solo regalos) */
        .red-btn {
          background: var(--red);
          color: rgba(255, 255, 255, 0.98);
          border: 1px solid rgba(255, 255, 255, 0.24);
          box-shadow: 0 16px 42px rgba(178, 29, 42, 0.22);
          transition: transform 0.12s ease, filter 0.2s ease, box-shadow 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .red-btn:hover {
          filter: brightness(1.06);
          box-shadow: 0 18px 52px rgba(178, 29, 42, 0.28);
        }
        .red-btn:active {
          transform: scale(0.985);
        }

        /* hero buttons */
        .heroBtn {
          background: rgba(255, 255, 255, 0.16);
          border-color: rgba(255, 255, 255, 0.22);
          color: rgba(255, 255, 255, 0.95);
        }
        .heroBtn:hover {
          background: rgba(255, 255, 255, 0.22);
          border-color: rgba(255, 255, 255, 0.32);
          box-shadow: 0 16px 42px rgba(0, 0, 0, 0.22);
        }

        /* ✅ INVERTED buttons for inverted card */
        .inv-btn {
          background: rgba(255, 255, 255, 0.92);
          color: rgba(178, 29, 42, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.35);
          box-shadow: 0 14px 34px rgba(0, 0, 0, 0.18);
          transition: transform 0.12s ease, filter 0.2s ease, box-shadow 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
        }
        .inv-btn:hover {
          filter: brightness(1.02);
          box-shadow: 0 18px 44px rgba(0, 0, 0, 0.22);
        }
        .inv-btn:active {
          transform: scale(0.985);
        }

        /* Inputs focus */
        input:focus-visible,
        textarea:focus-visible,
        button:focus-visible,
        a:focus-visible {
          outline: none;
          box-shadow: 0 0 0 4px rgba(178, 29, 42, 0.18);
        }

        .chip {
          font-size: 12px;
          padding: 10px 14px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.65);
          border: 1px solid rgba(17, 17, 17, 0.1);
          color: rgba(17, 17, 17, 0.62);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }

        .toggle {
          border-radius: 9999px;
          padding: 10px 14px;
          font-size: 12px;
          font-weight: 700;
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(17, 17, 17, 0.12);
          color: rgba(17, 17, 17, 0.62);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          transition: background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .toggle:hover {
          background: rgba(255, 255, 255, 0.8);
          border-color: rgba(178, 29, 42, 0.28);
        }
        .toggleOn {
          background: rgba(178, 29, 42, 0.1);
          border-color: rgba(178, 29, 42, 0.28);
          color: rgba(178, 29, 42, 0.92);
          box-shadow: 0 10px 26px rgba(178, 29, 42, 0.08);
        }

        /* ❤️ heart rain */
        .heart-fall {
          position: absolute;
          top: -40px;
          color: rgba(178, 29, 42, 0.95);
          animation-name: heartFall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          filter: drop-shadow(0 14px 20px rgba(178, 29, 42, 0.12));
          user-select: none;
          will-change: transform, opacity;
        }
        @keyframes heartFall {
          0% {
            transform: translate3d(0, -40px, 0) rotate(-10deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translate3d(34px, 110vh, 0) rotate(22deg);
            opacity: 0;
          }
        }

        /* ✅ MODAL */
        .modalOverlay {
          position: fixed;
          inset: 0;
          z-index: 50;
          display: grid;
          place-items: center;
          padding: 18px;
        }
        .modalBackdrop {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          border: 0;
        }
        .modalCard {
          position: relative;
          width: min(760px, 100%);
          border-radius: 28px;
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid rgba(178, 29, 42, 0.18);
          box-shadow: 0 28px 120px rgba(0, 0, 0, 0.25);
          padding: 20px;
        }
        @media (min-width: 640px) {
          .modalCard {
            padding: 26px;
          }
        }
        .iconBtn {
          height: 38px;
          width: 38px;
          border-radius: 9999px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          background: rgba(255, 255, 255, 0.7);
          display: grid;
          place-items: center;
          color: rgba(0, 0, 0, 0.75);
        }
        .iconBtn:hover {
          border-color: rgba(178, 29, 42, 0.28);
          box-shadow: 0 12px 28px rgba(178, 29, 42, 0.12);
        }

        .giftItem {
          display: flex;
          gap: 10px;
          align-items: center;
          padding: 12px 14px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.72);
          border: 1px solid rgba(0, 0, 0, 0.08);
        }

        @media (prefers-reduced-motion: reduce) {
          .heart-fall {
            animation: none !important;
            display: none !important;
          }
          .outline-btn,
          .red-btn,
          .inv-btn,
          .toggle {
            transition: none !important;
          }
        }
      `}</style>
    </main>
  );
}

/** ✅ PlayingCard: todas las cards con look de naipe + iniciales */
function PlayingCard({
  initials,
  variant,
  children,
}: {
  initials: string;
  variant: "default" | "inverted";
  children: React.ReactNode;
}) {
  const isInv = variant === "inverted";

  return (
    <div className={`cardBase ${isInv ? "cardInv" : "cardDef"}`}>
      {/* marco */}
      <div className={`cardFrame ${isInv ? "cardFrameInv" : "cardFrameDef"}`} />
      <div className={`cardFrame2 ${isInv ? "cardFrame2Inv" : "cardFrame2Def"}`} />

      {/* corners like playing card */}
      <div className={`corner cornerTL ${isInv ? "cornerInv" : ""}`}>
        <div className="cornerTxt">{initials}</div>
        <div className="cornerSuit">♥</div>
      </div>
      <div className={`corner cornerBR ${isInv ? "cornerInv" : ""}`}>
        <div className="cornerTxt">{initials}</div>
        <div className="cornerSuit">♥</div>
      </div>

      {/* center faint mark */}
      <div className={`centerMark ${isInv ? "centerMarkInv" : ""}`}>
        <span className={`${serif.className} centerInitials`}>{initials}</span>
        <span className="centerHeart">♥</span>
      </div>

      <div className="relative z-10 p-7 sm:p-10">{children}</div>

      <style jsx>{`
        .cardBase {
          position: relative;
          overflow: hidden;
          border-radius: 34px;
          box-shadow: 0 22px 90px rgba(0, 0, 0, 0.11);
        }
        .cardDef {
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid rgba(17, 17, 17, 0.1);
        }
        .cardInv {
          background: #b21d2a;
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 26px 110px rgba(178, 29, 42, 0.18);
        }

        .cardFrame {
          position: absolute;
          inset: 16px;
          border-radius: 28px;
          pointer-events: none;
        }
        .cardFrameDef {
          border: 1px solid rgba(178, 29, 42, 0.35);
        }
        .cardFrameInv {
          border: 1px solid rgba(255, 255, 255, 0.25);
        }

        .cardFrame2 {
          position: absolute;
          inset: 22px;
          border-radius: 22px;
          pointer-events: none;
        }
        .cardFrame2Def {
          border: 1px solid rgba(0, 0, 0, 0.05);
        }
        .cardFrame2Inv {
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .corner {
          position: absolute;
          z-index: 5;
          font-weight: 700;
          font-size: 12px;
          line-height: 1;
          letter-spacing: 0.06em;
          color: rgba(0, 0, 0, 0.7);
          user-select: none;
        }
        .cornerInv {
          color: rgba(255, 255, 255, 0.9);
        }
        .cornerTL {
          top: 18px;
          left: 18px;
        }
        .cornerBR {
          bottom: 18px;
          right: 18px;
          text-align: right;
          transform: rotate(180deg);
        }
        .cornerTxt {
          font-size: 12px;
        }
        .cornerSuit {
          font-size: 14px;
          color: ${isInv ? "rgba(255,255,255,0.92)" : "rgba(178,29,42,0.92)"};
          margin-top: 6px;
        }

        .centerMark {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          opacity: 0.075;
          pointer-events: none;
        }
        .centerMarkInv {
          opacity: 0.12;
        }
        .centerInitials {
          font-size: 96px;
          color: ${isInv ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.9)"};
          letter-spacing: 0.06em;
        }
        .centerHeart {
          margin-top: -10px;
          font-size: 22px;
          color: ${isInv ? "rgba(255,255,255,0.92)" : "rgba(178,29,42,0.92)"};
        }

        @media (min-width: 1024px) {
          .centerInitials {
            font-size: 110px;
          }
        }
      `}</style>
    </div>
  );
}

function HeroPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-full bg-white/15 px-4 py-2 text-[11px] font-semibold text-white ring-1 ring-white/15 backdrop-blur-xl">
      <span className="mr-2 text-white/70">{label}</span>
      <span className="tabular-nums text-white/95">{value}</span>
    </div>
  );
}

function InfoInner({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.35em] text-black/55">{subtitle}</p>
          <h3 className={`${serif.className} mt-3 text-2xl font-semibold`}>{title}</h3>
        </div>
        <div className="text-xl">{icon}</div>
      </div>
      <div className="mt-5">{children}</div>
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-black/60 mb-2">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl bg-white/70 px-4 py-3 text-sm text-black/80 ring-1 ring-black/10 outline-none focus:ring-[#b21d2a]/30"
      />
    </div>
  );
}
