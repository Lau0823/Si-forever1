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
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* =========================
   Portada GLASS (Extra Extra) + BG editable atrás
========================= */
function GlassCover({
  coupleName,
  cityLine,
  weddingDateLabel,
  ceremonyTimeLabel,
  venueName,
  paperName,
  paperDate,
  paperRegion,
  onOpen,
  onDress,
  onGifts,
}: {
  coupleName: string;
  cityLine: string;
  weddingDateLabel: string;
  ceremonyTimeLabel: string;
  venueName: string;
  paperName: string;
  paperDate: string;
  paperRegion: string;
  onOpen: () => void;
  onDress: () => void;
  onGifts: () => void;
}) {
  return (
    <div className="relative overflow-hidden rounded-[34px] border border-black/10 bg-white shadow-[0_30px_90px_rgba(0,0,0,0.12)]">
      {/* BACK LAYER: BG + letras/patrón editable */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(0,0,0,0.06),transparent_55%),radial-gradient(circle_at_82%_30%,rgba(0,0,0,0.05),transparent_52%)]" />
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap select-none opacity-[0.07]">
          <div className="text-[120px] sm:text-[170px] font-black tracking-tight">
            SI FOREVER · SI FOREVER · SI FOREVER
          </div>
        </div>
      </div>

      {/* TOP STRIP minimal */}
      <div className="relative z-10 flex items-center justify-between px-5 py-4 text-[11px]">
        <span className="font-semibold tracking-[0.22em] uppercase text-black/60">{paperRegion}</span>
        <span className="font-semibold tracking-[0.18em] uppercase text-black/55">{paperDate}</span>
      </div>

      {/* GLASS CARD */}
      <div className="relative z-10 px-4 pb-7 sm:px-6 sm:pb-10">
        <div className="rounded-[30px] border border-white/45 bg-white/30 backdrop-blur-2xl shadow-[0_18px_60px_rgba(0,0,0,0.10)]">
          <div className="px-6 pt-7 text-center">
            <div className="font-serif text-4xl sm:text-5xl tracking-tight">{paperName}</div>
            <div className="mx-auto mt-4 h-px w-[min(720px,86vw)] bg-black/10" />
          </div>

          <div className="px-6 pb-7 pt-6 text-center sm:px-10 sm:pb-9">
            <div className="text-[11px] font-semibold tracking-[0.22em] uppercase text-black/60">{cityLine}</div>

            <h1 className="mt-3 text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-black">
              {coupleName}
            </h1>

            <div className="mt-2 font-serif text-xl sm:text-2xl tracking-wide text-black/80">Se casan</div>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <span className="rounded-full border border-black/10 bg-white/60 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] uppercase text-black/80">
                {weddingDateLabel}
              </span>
              <span className="rounded-full border border-black/10 bg-white/60 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] uppercase text-black/80">
                {ceremonyTimeLabel}
              </span>
              <span className="rounded-full border border-black/10 bg-white/60 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] uppercase text-black/80">
                {venueName}
              </span>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <button
                type="button"
                onClick={onOpen}
                className="rounded-full bg-black px-5 py-3 text-[12px] font-semibold tracking-[0.18em] uppercase text-white transition hover:bg-black/90 active:scale-[0.99]"
              >
                Abrir
              </button>

              <button
                type="button"
                onClick={onDress}
                className="rounded-full border border-black/15 bg-white/55 px-5 py-3 text-[12px] font-semibold tracking-[0.18em] uppercase text-black/80 backdrop-blur-xl transition hover:bg-white/70 active:scale-[0.99]"
              >
                Dress code
              </button>

              <button
                type="button"
                onClick={onGifts}
                className="rounded-full border border-black/15 bg-white/55 px-5 py-3 text-[12px] font-semibold tracking-[0.18em] uppercase text-black/80 backdrop-blur-xl transition hover:bg-white/70 active:scale-[0.99]"
              >
                Regalos
              </button>
            </div>

            <div className="mt-6 text-[11px] font-semibold tracking-[0.22em] uppercase text-black/45">
              Vista previa · Extra Extra
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================
   Arroz cayendo DENTRO del periódico (AUTO)
========================= */
function RiceRainInCard({ show, density = 160 }: { show: boolean; density?: number }) {
  const pieces = useMemo(() => {
    // más “blanco/perla” (lujo), no amarillo
    const colors = ["#ffffff", "#fbfbfb", "#f6f6f6", "#f1f1f1"];
    return Array.from({ length: density }).map((_, i) => {
      const left = Math.random() * 100;
      const delay = Math.random() * 0.35;
      const dur = 1.6 + Math.random() * 1.6;
      const w = 3.5 + Math.random() * 4.8;
      const h = w * (2.0 + Math.random() * 1.6);
      const rot0 = Math.random() * 360;
      const spin = 260 + Math.random() * 700;
      const drift = (Math.random() - 0.5) * 240;
      const wobble = 8 + Math.random() * 18;
      const opacity = 0.45 + Math.random() * 0.45;
      const blur = Math.random() < 0.18 ? 0.7 : 0;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const topOffset = -12 - Math.random() * 12;

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
            boxShadow: "0 1px 0 rgba(0,0,0,0.08), 0 10px 30px rgba(0,0,0,0.06)",
            ...({
              ["--x" as any]: `${p.drift}px`,
              ["--wob" as any]: `${(Math.random() < 0.5 ? -1 : 1) * p.wobble}px`,
              ["--r" as any]: `${p.rot0}deg`,
              ["--spin" as any]: `${p.spin}deg`,
              ["--o" as any]: `${p.opacity}`,
              ["--y0" as any]: `-${40 + Math.random() * 35}px`,
            } as any),
          }}
        />
      ))}
    </div>
  );
}

/* =========================
   HERO Banner (pantalla completa + scroll)
   - sin íconos
========================= */
function HeroBanner({
  images,
  autoMs = 4500,
  title,
  subtitle,
}: {
  images: string[];
  autoMs?: number;
  title: string;
  subtitle: string;
}) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!images.length) return;
    const id = window.setInterval(() => setIdx((p) => (p + 1) % images.length), autoMs);
    return () => window.clearInterval(id);
  }, [images.length, autoMs]);

  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden rounded-[34px] border border-black/10 shadow-[0_30px_90px_rgba(0,0,0,0.18)]">
      <div className="absolute inset-0">
        <Image src={images[idx]} alt={`Foto ${idx + 1}`} fill priority={idx === 0} className="object-cover" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/0 to-black/0" />

      <div className="relative z-10 flex h-full items-end p-5 sm:p-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] uppercase text-white/90 backdrop-blur-md">
            {subtitle}
          </div>

          <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-6xl">{title}</h2>

          <div className="mt-5 flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-white/10 text-white/90 backdrop-blur-md transition hover:bg-white/15 active:scale-[0.98]"
              aria-label="Anterior"
            >
              <span className="text-xl leading-none">‹</span>
            </button>

            <button
              type="button"
              onClick={next}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-white/10 text-white/90 backdrop-blur-md transition hover:bg-white/15 active:scale-[0.98]"
              aria-label="Siguiente"
            >
              <span className="text-xl leading-none">›</span>
            </button>

            <div className="ml-2 rounded-full border border-white/35 bg-white/10 px-3 py-2 text-[12px] font-semibold text-white/90 backdrop-blur-md tabular-nums">
              {idx + 1}/{images.length}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 right-5 z-10 rounded-full border border-white/35 bg-white/10 px-3 py-2 backdrop-blur-md">
        <div className="flex items-center gap-2">
          {images.map((_, i) => (
            <button
              key={`hero-dot-${i}`}
              type="button"
              onClick={() => setIdx(i)}
              className={cn("h-2 w-2 rounded-full transition", i === idx ? "bg-white" : "bg-white/45 hover:bg-white/80")}
              aria-label={`Ir a foto ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* sutil (menos “texto innecesario”) */}
      <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 z-10">
        <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-semibold tracking-[0.18em] uppercase text-white/75 backdrop-blur-md">
          Desliza
        </div>
      </div>
    </section>
  );
}

/* =========================
   Modal: Dress code + carrusel (editable + imágenes)
========================= */
type DressIdea = {
  title: string;
  note?: string;
  imageUrl?: string;
  imageFileUrl?: string;
};

function DressCodeIdeasModal({
  open,
  onClose,
  dressCodeTitle,
  dressCodeNote,
  ideas,
  setIdeas,
}: {
  open: boolean;
  onClose: () => void;
  dressCodeTitle: string;
  dressCodeNote: string;
  ideas: DressIdea[];
  setIdeas: React.Dispatch<React.SetStateAction<DressIdea[]>>;
}) {
  const [idx, setIdx] = useState(0);
  const [newIdea, setNewIdea] = useState({
    title: "",
    note: "",
    imageUrl: "",
    imageFileUrl: "",
  });

  useEffect(() => {
    if (!open) return;
    setIdx(0);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const hasIdeas = ideas.length > 0;
  const current = hasIdeas ? ideas[idx] : undefined;

  const prev = () => hasIdeas && setIdx((i) => (i - 1 + ideas.length) % ideas.length);
  const next = () => hasIdeas && setIdx((i) => (i + 1) % ideas.length);

  const onPickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const blobUrl = URL.createObjectURL(file);
    setNewIdea((p) => ({ ...p, imageFileUrl: blobUrl }));
  };

  const addIdea = () => {
    const t = newIdea.title.trim();
    if (!t) return;

    setIdeas((prevIdeas) => [
      ...prevIdeas,
      {
        title: t,
        note: newIdea.note.trim() || undefined,
        imageUrl: newIdea.imageUrl.trim() || undefined,
        imageFileUrl: newIdea.imageFileUrl || undefined,
      },
    ]);

    setTimeout(() => setIdx(ideas.length), 0);
    setNewIdea({ title: "", note: "", imageUrl: "", imageFileUrl: "" });
  };

  const removeCurrent = () => {
    if (!hasIdeas) return;
    const toRemove = ideas[idx];
    if (toRemove?.imageFileUrl) URL.revokeObjectURL(toRemove.imageFileUrl);

    setIdeas((prevIdeas) => prevIdeas.filter((_, i) => i !== idx));
    setIdx((i) => Math.max(0, i - 1));
  };

  return (
    <div className="fixed inset-0 z-[98]">
      <button type="button" onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" aria-label="Cerrar" />

      <div className="relative mx-auto mt-10 w-[min(980px,94vw)]">
        <div className="paperTexture relative overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_30px_90px_rgba(0,0,0,0.28)]">
          <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
            <div>
              <div className="text-xs font-semibold tracking-[0.20em] uppercase text-black/70">Dress code</div>
              <div className="mt-1 text-lg font-semibold text-black">{dressCodeTitle}</div>
              <div className="mt-1 text-sm text-black/70">{dressCodeNote}</div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/70 text-black/70 backdrop-blur-md transition hover:bg-white active:scale-[0.99]"
              aria-label="Cerrar modal"
            >
              <span className="text-xl leading-none">×</span>
            </button>
          </div>

          <div className="grid gap-5 px-5 py-5 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Carrusel */}
            <div className="rounded-[24px] border border-black/10 bg-white/70 p-4">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-black/70">Ideas</div>
                <div className="text-[11px] text-black/50 tabular-nums">{hasIdeas ? `${idx + 1}/${ideas.length}` : "0/0"}</div>
              </div>

              <div className="mt-4 relative overflow-hidden rounded-[18px] border border-black/10 bg-black/5">
                <div className="relative aspect-[16/10]">
                  {current?.imageUrl || current?.imageFileUrl ? (
                    current?.imageFileUrl ? (
                      <img src={current.imageFileUrl} alt={current.title} className="absolute inset-0 h-full w-full object-cover" />
                    ) : (
                      <Image src={current!.imageUrl!} alt={current!.title} fill className="object-cover" />
                    )
                  ) : (
                    <div className="absolute inset-0 grid place-items-center px-6 text-center">
                      <div className="text-sm font-semibold text-black">{current?.title || "Aún no hay ideas"}</div>
                      <div className="mt-2 text-sm text-black/60">{current?.note || "Agrega una idea con texto y opcional imagen."}</div>
                    </div>
                  )}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/0 to-black/0" />

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={prev}
                    disabled={!hasIdeas}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white/90 backdrop-blur-md transition hover:bg-white/20 disabled:opacity-40"
                    aria-label="Anterior"
                  >
                    <span className="text-xl leading-none">‹</span>
                  </button>

                  <button
                    type="button"
                    onClick={next}
                    disabled={!hasIdeas}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white/90 backdrop-blur-md transition hover:bg-white/20 disabled:opacity-40"
                    aria-label="Siguiente"
                  >
                    <span className="text-xl leading-none">›</span>
                  </button>
                </div>
              </div>

              {hasIdeas && (
                <div className="mt-4">
                  <div className="text-base font-semibold text-black">{current?.title}</div>
                  {current?.note && <div className="mt-1 text-sm text-black/70">{current.note}</div>}
                  <button
                    type="button"
                    onClick={removeCurrent}
                    className="mt-3 text-xs font-semibold tracking-[0.14em] uppercase text-black/60 hover:text-black"
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </div>

            {/* Form agregar */}
            <div className="rounded-[24px] border border-black/10 bg-white/70 p-4">
              <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-black/70">Agregar idea</div>

              <div className="mt-3 grid gap-3">
                <div>
                  <label className="text-[11px] font-semibold tracking-[0.14em] uppercase text-black/60">Título</label>
                  <input
                    value={newIdea.title}
                    onChange={(e) => setNewIdea((p) => ({ ...p, title: e.target.value }))}
                    className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-3 py-3 text-sm outline-none focus:border-black/30"
                    placeholder="Ej: Vestido largo en tonos neutros"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold tracking-[0.14em] uppercase text-black/60">Nota (opcional)</label>
                  <input
                    value={newIdea.note}
                    onChange={(e) => setNewIdea((p) => ({ ...p, note: e.target.value }))}
                    className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-3 py-3 text-sm outline-none focus:border-black/30"
                    placeholder="Ej: evitar blanco / evitar tenis"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold tracking-[0.14em] uppercase text-black/60">URL imagen (opcional)</label>
                  <input
                    value={newIdea.imageUrl}
                    onChange={(e) => setNewIdea((p) => ({ ...p, imageUrl: e.target.value }))}
                    className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-3 py-3 text-sm outline-none focus:border-black/30"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold tracking-[0.14em] uppercase text-black/60">Subir imagen (opcional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onPickImage}
                    className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-3 py-3 text-sm outline-none focus:border-black/30"
                  />

                  {newIdea.imageFileUrl && (
                    <div className="mt-2 overflow-hidden rounded-2xl border border-black/10">
                      <img src={newIdea.imageFileUrl} alt="Preview" className="h-40 w-full object-cover" />
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={addIdea}
                  className="mt-1 inline-flex w-full items-center justify-center rounded-full bg-black px-4 py-3 text-sm font-semibold tracking-[0.16em] uppercase text-white transition hover:bg-black/90 active:scale-[0.99]"
                  disabled={!newIdea.title.trim()}
                >
                  Guardar
                </button>

                <div className="text-xs text-black/55 leading-5">Tip: URL o subir imagen (solo sesión actual).</div>
              </div>
            </div>
          </div>

          <div className="border-t border-black/10 px-5 py-4">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex w-full items-center justify-center rounded-full border border-black/10 bg-white px-4 py-3 text-sm font-semibold tracking-[0.16em] uppercase text-black/80 transition hover:bg-black/[0.03] active:scale-[0.99]"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================
   Modal regalos
========================= */
function GiftModal({ open, onClose, gifts }: { open: boolean; onClose: () => void; gifts: string[] }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[95]">
      <button type="button" onClick={onClose} className="absolute inset-0 bg-black/35 backdrop-blur-[2px]" aria-label="Cerrar" />

      <div className="relative mx-auto mt-16 w-[min(820px,92vw)]">
        <div className="paperTexture relative overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_30px_90px_rgba(0,0,0,0.28)]">
          <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
            <div>
              <div className="text-xs font-semibold tracking-[0.20em] uppercase text-black/70">Regalos</div>
              <div className="mt-1 text-sm text-black/65">Si deseas bendecirnos, aquí tienes algunas ideas</div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/70 text-black/70 backdrop-blur-md transition hover:bg-white active:scale-[0.99]"
              aria-label="Cerrar modal"
            >
              <span className="text-xl leading-none">×</span>
            </button>
          </div>

          <div className="px-5 py-5">
            <div className="grid gap-3 sm:grid-cols-2">
              {gifts.map((g, i) => (
                <div key={`gift-${i}-${g}`} className="rounded-2xl border border-black/10 bg-white/75 px-4 py-4 shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
                  <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-black/60">Opción {i + 1}</div>
                  <div className="mt-2 text-base font-semibold text-black">{g}</div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-black/10 bg-white/70 p-4 text-sm leading-6 text-black/70">
              Si prefieres, también puedes apoyarnos con un detalle libre. Gracias 🤍
            </div>
          </div>

          <div className="border-t border-black/10 px-5 py-4">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex w-full items-center justify-center rounded-full bg-black px-4 py-4 text-sm font-semibold tracking-[0.16em] uppercase text-white transition hover:bg-black/90 active:scale-[0.99]"
            >
              Cerrar
            </button>
          </div>
        </div>
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

  // ✅ AUDIO: se dispara al abrir
  const audioSrc = "/audio/Río Roma - Caminar de Tu Mano (Official Video) ft. Fonseca [1].MP3";
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioError, setAudioError] = useState<string | null>(null);

  // WhatsApp (RSVP)
  const rsvpPhoneNovio = "573116533163";
  const rsvpPhoneNovia = "57XXXXXXXXXX";

  // WhatsApp sugerir canción
  const songPhone = rsvpPhoneNovio;

  // Banner (fotos)
  const bannerImages = [
    "https://i.pinimg.com/736x/80/95/67/809567eb5b3482007d54d1d0e1e1d025.jpg",
    "https://i.pinimg.com/1200x/06/a4/dd/06a4dd27969325bdec82d7f4ef09ed7a.jpg",
  ];

  // Periódico
  const paperName = "Edición de Boda";
  const paperDate = "SÁBADO · 10 MAYO, 2026";
  const paperRegion = "VILLAVICENCIO";

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
    "Qué alegría que estés aquí. Gracias por acompañarnos y por ser parte de esta historia. Hoy comenzamos una nueva etapa y queremos celebrarla contigo.";

  const bibleVerseText = "Por encima de todo, vístanse de amor, que es el vínculo perfecto.";
  const bibleVerseRef = "Colosenses 3:14";

  // Dress code
  const dressCodeTitle = "Formal / Cóctel";
  const dressCodeNote = "Tonos neutros y elegantes. Evitar blanco y tenis.";
  const [dressOpen, setDressOpen] = useState(false);
  const [dressIdeas, setDressIdeas] = useState<DressIdea[]>([
    { title: "Ella: vestido largo o midi", note: "Champagne, beige, terracota, verde oliva, negro." },
    { title: "Él: traje o blazer", note: "Camisa clara, zapatos formales. Corbata opcional." },
  ]);

  // ✅ Sugerir canción (card)
  const [song, setSong] = useState({ name: "", artist: "", link: "" });
  const sendSong = () => {
    const text = encodeURIComponent(
      `Sugerencia de canción 🎶\n\n` +
        `Canción: ${song.name || "-"}\n` +
        `Artista: ${song.artist || "-"}\n` +
        `Link: ${song.link || "-"}\n\n` +
        `Boda: ${coupleName} · ${weddingDateLabel}`
    );
    window.open(`https://wa.me/${songPhone}?text=${text}`, "_blank");
  };

  // Maps
  const mapsQuery = useMemo(() => encodeURIComponent(`${venueName}, ${venueAddress}`), [venueName, venueAddress]);

  // Hydration
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Cuenta regresiva
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

  // Calendario
  const calYear = 2026;
  const calMonthIndex0 = 4; // Mayo
  const highlightedDay = 10;

  const monthNamesEs = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

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

  // RSVP
  const [rsvp, setRsvp] = useState<"si" | "no">("si");
  const [form, setForm] = useState({ nombre: "", whatsapp: "", asistentes: "1", mensaje: "" });

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

  const sendWhatsApp = (phone: string) => {
    const text = buildRsvpText();
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  };

  // Reveal + Arroz
  const [revealed, setRevealed] = useState(false);
  const [riceInCard, setRiceInCard] = useState(false);

  useEffect(() => {
    if (!revealed) return;
    const id = window.setInterval(() => {
      setRiceInCard(true);
      window.setTimeout(() => setRiceInCard(false), 2200);
    }, 14000);
    return () => window.clearInterval(id);
  }, [revealed]);

  // Modal regalos
  const [giftOpen, setGiftOpen] = useState(false);

  // ✅ OPEN (Extra Extra)
  const onOpen = async () => {
    setRevealed(true);
    setRiceInCard(true);
    window.setTimeout(() => setRiceInCard(false), 2600);

    window.setTimeout(() => {
      const el = document.getElementById("hero-banner");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);

    const audio = audioRef.current;
    if (audio) {
      try {
        setAudioError(null);
        audio.muted = false;
        audio.currentTime = 0;
        await audio.play();
      } catch {
        setAudioError("Tu navegador bloqueó el audio automático. Verifica el archivo en /public/audio.");
      }
    }
  };

  // tokens UI
  const paperWrap =
    "paper fold paperTexture relative overflow-hidden rounded-[34px] border border-black/10 shadow-[0_25px_70px_rgba(0,0,0,0.12)]";
  const card = "rounded-[26px] border border-black/10 bg-white/70 shadow-[0_18px_55px_rgba(0,0,0,0.10)]";
  const kicker = "text-[11px] font-semibold tracking-[0.20em] uppercase text-black/70";

  const glassBtn =
    "inline-flex items-center justify-center rounded-full border border-black/10 bg-white/55 px-5 py-3 text-[12px] font-semibold tracking-[0.14em] uppercase text-black/80 backdrop-blur-xl transition hover:bg-white/70 active:scale-[0.99] disabled:opacity-60";
  const glassBtnDark =
    "inline-flex items-center justify-center rounded-full bg-black px-6 py-4 text-[12px] font-semibold tracking-[0.16em] uppercase text-white transition hover:bg-black/90 active:scale-[0.99]";

  const pill =
    "rounded-full border border-black/10 bg-white/65 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] uppercase text-black/80";

  return (
    <main className="min-h-screen bg-neutral-100 text-neutral-950">
      {/* ✅ AUDIO oculto */}
      <audio ref={audioRef} src={audioSrc} preload="auto" playsInline />

      {/* ===== Estilos ===== */}
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
          background: rgba(0,0,0,0.14);
          opacity:.42;
          pointer-events:none;
        }
        .fold:after{
          content:"";
          position:absolute;
          top:0; bottom:0;
          left:50%;
          width:220px;
          transform: translateX(-50%);
          background: linear-gradient(to right, rgba(0,0,0,.12), rgba(0,0,0,0), rgba(0,0,0,.10));
          opacity:.14;
          pointer-events:none;
        }
        /* ✅ blanco lujo */
        .paperTexture{
          background-color: #ffffff;
          background-image:
            radial-gradient(rgba(0,0,0,0.018) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.02), transparent 28%, rgba(0,0,0,0.02));
          background-size: 26px 26px, 100% 240px;
          background-position: 0 0, 0 0;
        }
        .innerGlow{
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.75),
            inset 0 -1px 0 rgba(0,0,0,0.05);
        }
      `}</style>

      <GiftModal open={giftOpen} onClose={() => setGiftOpen(false)} gifts={regalos} />

      <DressCodeIdeasModal
        open={dressOpen}
        onClose={() => setDressOpen(false)}
        dressCodeTitle={dressCodeTitle}
        dressCodeNote={dressCodeNote}
        ideas={dressIdeas}
        setIdeas={setDressIdeas}
      />

      {/* ===== Portada GLASS ===== */}
      {!revealed && (
        <div className="fixed inset-0 z-[90] overflow-auto bg-neutral-100">
          <div className="min-h-screen grid place-items-center px-4 py-10">
            <div className="w-[min(1040px,92vw)]">
              <GlassCover
                coupleName={coupleName}
                cityLine={cityLine}
                weddingDateLabel={weddingDateLabel}
                ceremonyTimeLabel={ceremonyTimeLabel}
                venueName={venueName}
                paperName={paperName}
                paperDate={paperDate}
                paperRegion={paperRegion}
                onOpen={onOpen}
                onDress={() => setDressOpen(true)}
                onGifts={() => setGiftOpen(true)}
              />
              {audioError && <p className="mt-3 text-xs text-red-600">{audioError}</p>}
            </div>
          </div>
        </div>
      )}

      {/* ===== Periódico ===== */}
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="stage">
          <div className={cn(paperWrap, "paper", revealed ? "paperShown" : "paperHidden")}>
            <RiceRainInCard show={riceInCard} density={170} />

            {/* Top strip */}
            <div className="flex flex-col gap-2 border-b border-black/10 px-4 py-3 text-[11px] sm:flex-row sm:items-center sm:justify-between">
              <span className="font-semibold tracking-[0.20em] uppercase text-black/60">{paperRegion}</span>

              <div className="flex flex-wrap items-center gap-2">
                <span className={pill}>{weddingDateLabel}</span>
                <span className={pill}>{ceremonyTimeLabel}</span>
              </div>

              <span className="font-semibold tracking-[0.16em] uppercase text-black/55">{paperDate}</span>
            </div>

            {/* Masthead */}
            <header className="px-4 pt-6">
              <div className="text-center font-serif text-5xl sm:text-6xl tracking-tight">{paperName}</div>

              <div className="mt-4 grid gap-3 border-y border-black/10 py-4 sm:grid-cols-3 sm:items-center">
                <div className="text-center text-[11px] font-semibold tracking-[0.20em] uppercase text-black/65 sm:text-left">{cityLine}</div>
                <div className="text-center text-[11px] font-semibold tracking-[0.20em] uppercase text-black/65">{venueName}</div>
                <div className="text-center text-[11px] font-semibold tracking-[0.20em] uppercase text-black/65 sm:text-right">{venueAddress}</div>
              </div>

              <div className="py-6 text-center">
                <div className="font-black tracking-tight text-4xl sm:text-6xl md:text-7xl">{coupleName}</div>
                <div className="mt-2 font-serif text-2xl sm:text-3xl tracking-wide text-black/80">CELEBRAMOS NUESTRO AMOR</div>

                <div className="mx-auto mt-5 w-[min(980px,92vw)] rounded-[22px] border border-black/10 bg-white/60 p-3 backdrop-blur-xl shadow-[0_22px_70px_rgba(0,0,0,0.10)]">
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <button type="button" onClick={() => setGiftOpen(true)} className={glassBtn}>
                      Regalos
                    </button>

                    <button type="button" onClick={() => setDressOpen(true)} className={glassBtn}>
                      Dress code
                    </button>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                      target="_blank"
                      rel="noreferrer"
                      className={glassBtn}
                    >
                      Ubicación
                    </a>
                  </div>
                </div>

                {audioError && <div className="mt-3 text-xs text-red-600">{audioError}</div>}
              </div>
            </header>

            {/* Banner full screen */}
            <div id="hero-banner" className="px-4 pb-8">
              <HeroBanner images={bannerImages} title={coupleName} subtitle={`${weddingDateLabel} · ${ceremonyTimeLabel}`} />
            </div>

            {/* Grid */}
            <section className="px-4 pb-8">
              <div className="grid gap-6 lg:grid-cols-[1fr_1.35fr_1fr]">
                {/* Izquierda */}
                <div className="space-y-6">
                  <div className={cn(card, "p-5")}>
                    <div className={cn(kicker, "text-center")}>Historia</div>
                    <div className="mt-4 space-y-4">
                      {historiaCorta.map((x, i) => (
                        <div key={`hist-${i}-${x.label}`} className="text-center">
                          <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-black/60">{x.label}</div>
                          <div className="mt-1 text-sm text-black/70">{x.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={cn(card, "p-5")}>
                    <div className="flex items-center justify-between">
                      <div className={kicker}>Calendario</div>
                      <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-black/55">
                        {monthNamesEs[calMonthIndex0]} {calYear}
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-7 gap-1 text-center">
                      {["L", "Ma", "Mi", "J", "V", "S", "D"].map((d) => (
                        <div key={`dow-${d}`} className="text-[10px] font-semibold text-black/55">
                          {d}
                        </div>
                      ))}
                      {calendarCells.map((cell, cidx) => (
                        <div key={`cal-${cidx}`} className="h-8">
                          {cell.day ? (
                            <div
                              className={cn(
                                "mx-auto flex h-8 w-8 items-center justify-center rounded-xl text-xs",
                                cell.isHighlight ? "bg-black text-white" : "border border-black/10 bg-white text-black/80"
                              )}
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

                  <div className={cn(card, "p-5")}>
                    <div className="flex items-center justify-between">
                      <div className={kicker}>Cuenta regresiva</div>
                      <span className={pill}>{mounted ? (cd.done ? "HOY" : "FALTA") : "..."}</span>
                    </div>

                    <div className="mt-3 grid grid-cols-4 gap-2">
                      {[
                        { label: "Días", value: mounted ? cd.days : 0 },
                        { label: "Horas", value: mounted ? cd.hours : 0 },
                        { label: "Min", value: mounted ? cd.minutes : 0 },
                        { label: "Seg", value: mounted ? cd.seconds : 0 },
                      ].map((x) => (
                        <div key={`cd-${x.label}`} className="rounded-2xl border border-black/10 bg-white p-3 text-center">
                          <div className="text-2xl font-black tabular-nums">{pad2(x.value)}</div>
                          <div className="mt-1 text-[11px] font-semibold tracking-[0.12em] uppercase text-black/55">{x.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Centro */}
                <div className="space-y-6">
                  <div className={cn(card, "p-6")}>
                    <div className={cn(kicker, "text-center")}>{tituloNota}</div>
                    <p className="mt-4 text-sm leading-7 text-black/75">{cuerpoNota}</p>
                  </div>

                  {/* Sugiere una canción */}
                  <div className={cn(card, "p-6")}>
                    <div className={cn(kicker, "text-center")}>Canción</div>
                    <p className="mt-3 text-sm text-black/65 leading-6 text-center">¿Qué canción no puede faltar?</p>

                    <div className="mt-4 grid gap-3">
                      <div>
                        <label className="text-[11px] font-semibold tracking-[0.14em] uppercase text-black/55">Canción</label>
                        <input
                          value={song.name}
                          onChange={(e) => setSong((p) => ({ ...p, name: e.target.value }))}
                          className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-3 py-3 text-sm outline-none focus:border-black/30"
                          placeholder="Ej: Perfect"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold tracking-[0.14em] uppercase text-black/55">Artista</label>
                        <input
                          value={song.artist}
                          onChange={(e) => setSong((p) => ({ ...p, artist: e.target.value }))}
                          className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-3 py-3 text-sm outline-none focus:border-black/30"
                          placeholder="Ej: Ed Sheeran"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold tracking-[0.14em] uppercase text-black/55">Link (opcional)</label>
                        <input
                          value={song.link}
                          onChange={(e) => setSong((p) => ({ ...p, link: e.target.value }))}
                          className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-3 py-3 text-sm outline-none focus:border-black/30"
                          placeholder="Spotify / YouTube"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={sendSong}
                        className="mt-1 inline-flex w-full items-center justify-center rounded-full bg-black px-4 py-3 text-sm font-semibold tracking-[0.16em] uppercase text-white transition hover:bg-black/90 active:scale-[0.99]"
                        disabled={!song.name.trim()}
                      >
                        Enviar
                      </button>
                    </div>
                  </div>

                  <div className={cn(card, "p-6")}>
                    <div className={cn(kicker, "text-center")}>Versículo</div>
                    <p className="mt-3 text-center font-serif text-lg leading-7 text-black/80">“{bibleVerseText}”</p>
                    <p className="mt-3 text-center text-sm font-semibold text-black">{bibleVerseRef}</p>
                  </div>
                </div>

                {/* Derecha */}
                <div className="space-y-6">
                  <div className={cn(card, "p-5")}>
                    <div className={cn(kicker, "text-center")}>Itinerario</div>
                    <div className="mt-4 grid gap-2">
                      {itinerario.map((x, i) => (
                        <div
                          key={`it-${i}-${x.hora}-${x.evento}`}
                          className="flex items-center justify-between gap-4 rounded-2xl border border-black/10 bg-white px-4 py-3"
                        >
                          <div className="text-sm font-semibold text-black">{x.hora}</div>
                          <div className="text-sm text-black/75">{x.evento}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={cn(card, "p-5")}>
                    <div className={cn(kicker, "text-center")}>Ubicación</div>

                    <div className="mt-4 rounded-2xl border border-black/10 bg-white p-4">
                      <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-black/65">{venueName}</div>
                      <div className="mt-2 text-sm text-black/70">{venueAddress}</div>
                    </div>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(glassBtn, "mt-4 w-full")}
                    >
                      Ver mapa
                    </a>
                  </div>

                  <div className={cn(card, "p-5")}>
                    <div className={cn(kicker, "text-center")}>Dress code</div>
                    <div className="mt-3 text-center">
                      <div className="text-lg font-semibold text-black">{dressCodeTitle}</div>
                      <p className="mt-2 text-sm text-black/65 leading-6">{dressCodeNote}</p>
                    </div>

                    <button type="button" onClick={() => setDressOpen(true)} className={cn(glassBtn, "mt-4 w-full")}>
                      Ver ideas
                    </button>
                  </div>

                  <div className={cn(card, "p-5")}>
                    <div className={cn(kicker, "text-center")}>Regalos</div>
                    <p className="mt-3 text-sm text-black/65 leading-6 text-center">Si deseas bendecirnos, mira la lista.</p>

                    <button type="button" onClick={() => setGiftOpen(true)} className={cn(glassBtn, "mt-4 w-full")}>
                      Ver lista
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* RSVP */}
            <section className="border-t border-black/10 bg-white/40 px-4 py-8">
              <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-start">
                <div className={cn(card, "p-6")}>
                  <div className={kicker}>Confirmación</div>
                  <p className="mt-2 text-sm text-black/65 leading-6">Completa tus datos y envía tu respuesta por WhatsApp.</p>

                  <div className="mt-4 rounded-2xl border border-black/10 bg-white p-4">
                    <div className="flex flex-wrap items-center gap-4">
                      <label className="flex items-center gap-2 text-sm">
                        <input type="radio" name="rsvp" value="si" checked={rsvp === "si"} onChange={() => setRsvp("si")} />
                        Asisto
                      </label>

                      <label className="flex items-center gap-2 text-sm">
                        <input type="radio" name="rsvp" value="no" checked={rsvp === "no"} onChange={() => setRsvp("no")} />
                        No asisto
                      </label>
                    </div>
                  </div>
                </div>

                <div className={cn(card, "p-6")}>
                  <form onSubmit={(e) => e.preventDefault()} className="grid gap-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="text-[11px] font-semibold tracking-[0.16em] uppercase text-black/55">Nombre</label>
                        <input
                          value={form.nombre}
                          onChange={onChange("nombre")}
                          required
                          className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-3 py-3 text-sm outline-none focus:border-black/30"
                          placeholder="Tu nombre completo"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold tracking-[0.16em] uppercase text-black/55">WhatsApp</label>
                        <input
                          value={form.whatsapp}
                          onChange={onChange("whatsapp")}
                          className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-3 py-3 text-sm outline-none focus:border-black/30"
                          placeholder="+57 300 000 0000"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold tracking-[0.16em] uppercase text-black/55">Asistentes</label>
                        <select
                          value={form.asistentes}
                          onChange={onChange("asistentes")}
                          disabled={rsvp === "no"}
                          className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-3 py-3 text-sm outline-none focus:border-black/30 disabled:opacity-60"
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold tracking-[0.16em] uppercase text-black/55">Mensaje</label>
                        <input
                          value={form.mensaje}
                          onChange={onChange("mensaje")}
                          className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-3 py-3 text-sm outline-none focus:border-black/30"
                          placeholder="Ej: ¡Qué emoción!"
                        />
                      </div>
                    </div>

                    <div className="mt-2 grid gap-3 sm:grid-cols-2">
                      <button type="button" onClick={() => sendWhatsApp(rsvpPhoneNovio)} className={glassBtn} disabled={!form.nombre.trim()}>
                        Enviar al novio
                      </button>

                      <button type="button" onClick={() => sendWhatsApp(rsvpPhoneNovia)} className={glassBtn} disabled={!form.nombre.trim()}>
                        Enviar a la novia
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </section>

            <footer className="border-t border-black/10 bg-white/30 px-4 py-6 text-center">
              <div className="text-xs font-semibold tracking-[0.20em] uppercase text-black/70">Con amor, {coupleName}</div>
              <div className="mt-2 text-xs text-black/55">
                {weddingDateLabel} · {cityLine}
              </div>
            </footer>
          </div>
        </div>
      </div>

      {/* ✅ botón discreto por si quieres volver a la portada */}
      {revealed && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[80]">
          <button
            type="button"
            onClick={() => setRevealed(false)}
            className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-black/70 backdrop-blur-xl shadow-sm hover:bg-white"
          >
            Portada
          </button>
        </div>
      )}
    </main>
  );
}