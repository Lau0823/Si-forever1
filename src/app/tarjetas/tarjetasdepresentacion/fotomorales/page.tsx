"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * ✅ LISTO CON TU VIDEO:
 * https://www.youtube.com/watch?si=VCTrKoT2GaMtsTBN&v=1EHX_Ndo_TA&feature=youtu.be
 * -> YOUTUBE_ID = "1EHX_Ndo_TA"
 *
 * ✅ Botones: GLASS + hover amarillo (yellow-400)
 * ✅ Landing: solo logo de fondo + botón Entrar
 * ✅ Tarjeta: video + galería + modal + pagos con 2 QRs + audio dock
 */

const LANDING_BG =
  "/logofm.jpeg";

const PHONE_DISPLAY = "310 7788099";
const WHATSAPP_E164 = "57310 7788099";
const INSTAGRAM_URL = "https://www.instagram.com/fotomorales_?igsh=cnk3d2J3ZHlwMGdy";

// ✅ Tu video
const YOUTUBE_ID = "tDOTJUUf1II";

const AUDIO_SRC = "/audio/Bruno Mars - Just the way you are  Sub EspañolInglés.MP3";

// ✅ QR: rutas locales (public) o URLs
const QR_NEQUI = "/qrnequi.jpeg";
const QR_BANCOLOMBIA = "/qr.jpeg";

type Service = { key: string; title: string; short: string; details: string[] };
const SERVICES: Service[] = [
  {
    key: "grados",
    title: "GRADOS",
    short: "Retratos limpios y elegantes.",
    details: ["Retrato individual + familia", "Cobertura del acto", "Entrega digital"],
  },
  {
    key: "proms",
    title: "PROMS",
    short: "Fotos grupales con estilo cinematográfico.",
    details: ["Dirección de poses", "Iluminación portable", "Entrega rápida"],
  },
  {
    key: "quince",
    title: "QUINCE AÑOS",
    short: "Concepto + narrativa visual.",
    details: ["Sesión temática", "Cobertura evento", "Edición premium"],
  },
  {
    key: "bodas",
    title: "BODAS",
    short: "Cobertura completa estilo editorial.",
    details: ["Momentos reales", "Edición premium", "Entrega en alta calidad"],
  },
  {
    key: "eventos",
    title: "EVENTOS",
    short: "Eventos sociales y corporativos.",
    details: ["Ambiente + detalle", "Galería privada", "Entrega optimizada para redes"],
  },
];

type GalleryItem = { src: string; label: string };
const GALLERY: GalleryItem[] = [
  { src: "/toga.jpeg", label: "GRADOS" },
  { src: "/fm3.jpeg", label: "PROMS" },
 { src: "/fm1.jpeg", label: "PROMS" },
 { src: "/fm2.jpeg", label: "PROMS" },
 { src: "/fm4.jpeg", label: "PROMS" },
 { src: "/fm5.jpeg", label: "PROMS" },
];

export default function Page() {
  return <MainExperience />;
}

/* ================== GLASS BUTTON STYLES ================== */

const GLASS_BTN =
  "inline-flex items-center justify-center text-center rounded-full py-3 px-5 text-xs font-semibold tracking-widest " +
  "border border-white/25 bg-white/10 backdrop-blur-2xl text-white " +
  "shadow-[0_18px_70px_rgba(0,0,0,0.45)] " +
  "hover:bg-yellow-400 hover:text-black hover:border-yellow-400 " +
  "active:scale-[0.99] transition-all duration-500";

const GLASS_ICON_BTN =
  "h-10 w-10 rounded-full border border-white/10 bg-white/10 backdrop-blur-2xl text-white " +
  "hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all duration-500";

/* ================== MAIN EXPERIENCE ================== */

function MainExperience() {
  const [started, setStarted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const safePlay = async () => {
    try {
      if (!audioRef.current) return;
      audioRef.current.volume = 0.55;
      await audioRef.current.play();
    } catch {
      // autoplay puede ser bloqueado; el dock permite play manual
    }
  };

  const handleStart = async () => {
    setStarted(true);
    await safePlay();
  };

  const togglePlay = async () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) await safePlay();
    else audioRef.current.pause();
  };

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);

    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = muted;
  }, [muted]);

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src={AUDIO_SRC} type="audio/mpeg" />
      </audio>

      {/* ✅ LANDING: SOLO LOGO DE FONDO + BOTÓN ENTRAR */}
      <AnimatePresence>
        {!started && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-cover bg-center"
            style={{ backgroundImage: `url(${LANDING_BG})` }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />

            <motion.button
              type="button"
              onClick={handleStart}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              className={`${GLASS_BTN} px-16 py-5 text-sm`}
            >
              ENTRAR
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {started && (
        <>
          <AudioDock muted={muted} isPlaying={isPlaying} onToggleMute={() => setMuted((v) => !v)} onTogglePlay={togglePlay} />
          <FotomoralesCard />
        </>
      )}
    </>
  );
}

/* ================== CARD ================== */

function FotomoralesCard() {
  const cleanPhone = PHONE_DISPLAY.replace(/\D/g, "");
  const telHref = `tel:+57${cleanPhone}`;

  const [selectedServiceKey, setSelectedServiceKey] = useState(SERVICES[0].key);
  const selectedService = useMemo(
    () => SERVICES.find((s) => s.key === selectedServiceKey) ?? SERVICES[0],
    [selectedServiceKey]
  );

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const whatsappUrl = useMemo(() => {
    const message = `Hola 👋 quiero cotizar el servicio de ${selectedService.title} con FOTO MORALES`;
    return `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(message)}`;
  }, [selectedService.title]);

  return (
    <div className="min-h-screen bg-neutral-950 px-4 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl rounded-[34px] bg-white/5 border border-white/10 shadow-[0_60px_160px_rgba(0,0,0,0.85)] overflow-hidden">
        {/* HERO */}
        <div className="relative">
          <div className="h-44 sm:h-56 w-full bg-cover bg-center" style={{ backgroundImage: `url(${LANDING_BG})` }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/60 to-neutral-950" />
          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="text-white text-2xl sm:text-3xl font-semibold tracking-[0.22em]">FOTO MORALES</h1>
            <p className="mt-2 text-white/70 text-sm max-w-2xl">
              Fotografía premium para bodas, retratos y eventos. Estilo editorial y momentos reales.
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-10 text-white">
          {/* CTAs */}
          <div className="grid gap-3 sm:grid-cols-3">
            <a href={telHref} className={GLASS_BTN}>
               LLAMAR AHORA
            </a>

            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className={GLASS_BTN}>
               INSTAGRAM
            </a>

            <a href={whatsappUrl} target="_blank" rel="noreferrer" className={GLASS_BTN}>
               COTIZAR
            </a>
          </div>

          {/* SERVICES NAV */}
          <div className="mt-10">
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/55">Servicios</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {SERVICES.map((s) => {
                const active = selectedServiceKey === s.key;
                return (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setSelectedServiceKey(s.key)}
                    className={
                      (active
                        ? "bg-yellow-400 text-black border-yellow-400 "
                        : "bg-white/10 text-white border-white/20 ") +
                      "rounded-full px-4 py-2 text-[11px] font-semibold tracking-widest border backdrop-blur-xl " +
                      "hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all duration-500"
                    }
                  >
                    {s.title}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-xl font-semibold">{selectedService.title}</h3>
              <p className="mt-2 text-sm text-white/70">{selectedService.short}</p>

              <ul className="mt-4 space-y-2 text-sm text-white/75">
                {selectedService.details.map((d) => (
                  <li key={d} className="flex gap-3">
                    <span className="mt-[7px] h-2 w-2 rounded-full bg-yellow-400" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* MULTIMEDIA */}
          <div className="mt-10 grid gap-7 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/55">Video</p>

              <div className="mt-4 overflow-hidden rounded-3xl border border-white/10 bg-black/30 shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
                <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube.com/embed/${YOUTUBE_ID}`}
                    title="YouTube video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              <p className="mt-10 text-[10px] uppercase tracking-[0.35em] text-white/55">Galería</p>
              <p className="mt-2 text-sm text-white/70">Toca una foto para verla en grande.</p>

              <div className="mt-5 columns-2 sm:columns-3 gap-4 [column-fill:_balance]">
                {GALLERY.map((g, idx) => (
                  <button
                    key={`${g.src}-${idx}`}
                    type="button"
                    onClick={() => setSelectedImage(g.src)}
                    className="group mb-4 w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-left"
                  >
                    <div className="relative">
                      <img
                        src={g.src}
                        alt={g.label}
                        className="w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[11px] tracking-widest text-white ring-1 ring-white/15 backdrop-blur-xl group-hover:bg-yellow-400 group-hover:text-black group-hover:ring-yellow-400/60 transition-all duration-500">
                          {g.label}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* PAGOS */}
            <div className="lg:col-span-5">
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/55">Pagos</p>
              <h3 className="mt-2 text-2xl font-semibold">Escanea y paga en segundos</h3>
              <p className="mt-2 text-sm text-white/70">Nequi o Bancolombia por QR.</p>

              <div className="mt-5 grid gap-4">
                <QrCard title="Nequi" subtitle="Pago por QR" qrSrc={QR_NEQUI} />
                <QrCard title="Bancolombia" subtitle="Pago por QR" qrSrc={QR_BANCOLOMBIA} />
              </div>

              <div className="mt-6">
                <a
                  href={`https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(
                    "Hola 👋 ya hice el pago, te envío el comprobante."
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className={GLASS_BTN + " w-full"}
                >
                  ENVIAR COMPROBANTE POR WHATSAPP
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center text-xs text-white/50">
            © {new Date().getFullYear()} FOTO MORALES
          </div>
        </div>
      </div>

      {/* MODAL IMAGE */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-xl p-5 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Imagen ampliada"
          >
            <motion.div
              initial={{ scale: 0.92, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 10, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className={`${GLASS_ICON_BTN} absolute -top-3 -right-3 shadow-lg`}
                aria-label="Cerrar"
              >
                ✕
              </button>
              <img
                src={selectedImage}
                alt="Imagen ampliada"
                className="w-full max-h-[86vh] object-contain rounded-3xl shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- components ---------------- */

function AudioDock({
  muted,
  isPlaying,
  onToggleMute,
  onTogglePlay,
}: {
  muted: boolean;
  isPlaying: boolean;
  onToggleMute: () => void;
  onTogglePlay: () => void;
}) {
  return (
    <div className="fixed bottom-4 left-4 right-4 z-[70] mx-auto max-w-xl">
      <div className="rounded-full border border-white/10 bg-black/45 backdrop-blur-2xl px-3 py-2 shadow-[0_20px_80px_rgba(0,0,0,0.6)] flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.35em] text-white/60">Audio</p>
          <p className="text-xs text-white/85 truncate">
            Música de fondo · <span className="text-white/60">{isPlaying ? "Reproduciendo" : "Pausada"}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button type="button" onClick={onTogglePlay} className={GLASS_ICON_BTN} aria-label={isPlaying ? "Pausar" : "Reproducir"}>
            {isPlaying ? "❚❚" : "▶"}
          </button>
          <button type="button" onClick={onToggleMute} className={GLASS_ICON_BTN} aria-label={muted ? "Activar sonido" : "Silenciar"}>
            {muted ? "🔈" : "🔇"}
          </button>
        </div>
      </div>
    </div>
  );
}

function QrCard({ title, subtitle, qrSrc }: { title: string; subtitle: string; qrSrc: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_22px_90px_rgba(0,0,0,0.45)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.35em] text-white/55">{subtitle}</p>
          <h4 className="mt-2 text-xl font-semibold text-white">{title}</h4>
        </div>

        <span className="rounded-full bg-white/10 px-3 py-2 text-[10px] font-semibold tracking-widest text-white ring-1 ring-white/15 backdrop-blur-xl hover:bg-yellow-400 hover:text-black hover:ring-yellow-400/60 transition-all duration-500">
          QR
        </span>
      </div>

      <div className="mt-4 overflow-hidden rounded-3xl border border-white/10 bg-black/20">
        <img src={qrSrc} alt={`QR ${title}`} className="w-full h-52 object-cover" />
      </div>

      <p className="mt-3 text-sm text-white/70">Escanea con tu app y confirma el pago.</p>
    </div>
  );
}