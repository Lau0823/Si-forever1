'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

/** =========================================================
 *  SI, FOREVER — Invitación Premium (Montaña / Exploración)
 *  ✅ Dress code visible (sección + chip en hero)
 *  ✅ “Canción sugerida” ahora es interactiva:
 *     - Invitado escribe su canción + artista
 *     - Se genera botón para enviar por WhatsApp (a novia/novio)
 *     - Se muestra preview de lo escrito
 *  ✅ Audio solo inicia tras click en “Abrir invitación”
 *  ✅ Hydration-safe countdown
 * ========================================================= */

type Place = {
  title: string;
  subtitle: string;
  address: string;
  time?: string;
  mapUrl: string;
  image: string;
};
type TimelineItem = { time: string; title: string; note?: string; icon?: string };
type PersonPhoto = { name: string; role: string; photo: string };
type GiftItem = { label: string; url: string; note?: string; icon?: string };
type QuizQ = { id: string; question: string; options: string[]; correctIndex: number };

function cn(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(' ');
}

/** ====================== EDITA AQUÍ ====================== */
const INVITE = {
  brand: 'SI, FOREVER',
  couple: { bride: 'Valeria', groom: 'Sebastián' },

  // ✅ canción de los novios (se reproduce al abrir)
  songUrl: '/audio/Bruno Mars - Just the way you are  Sub EspañolInglés.MP3',

  // WhatsApp RSVP / sugerencias
  whatsapp: {
    bridePhone: '573001112233',
    groomPhone: '573009998877',
  },

  dateISO: '2026-09-12T17:00:00-05:00',
  locationLine: 'Montañas • 12 de Septiembre, 2026',
  themeTag: 'Exploración en la montaña',

  globalBgImage: 'https://i.pinimg.com/1200x/ad/04/a0/ad04a07509c8e35d4df89ce377669bb6.jpg',

  pine: {
    solid: '#0F3D2E',
    dark: '#0B2E22',
  },

  cover: {
    photo: 'https://i.pinimg.com/736x/09/6e/04/096e0464efb6986d96d342229adf89e8.jpg',
    badge: 'Una aventura comienza…',
    headline: 'Un día en la montaña, explorando nuestro “Sí”',
    subline: 'Camina con nosotros en este capítulo: naturaleza, amor y destino.',
    buttonText: 'Abrir invitación',
  },

  banner: {
    photo: 'https://i.pinimg.com/736x/c5/9c/f2/c59cf2f4c0c67fc4fc3746d5a0e7c527.jpg',
    tagline: 'Nos haría muy feliz tenerte en este día.',
    // ✅ aquí mostramos dresscode en hero + sección
    dresscodeTitle: 'Dress code',
    dresscodeText: 'Elegante-cómodo (tonos tierra / neutros)',
    dresscodeTips: [' Zapatos cómodos (terreno natural)', ' Trae algo ligero por el clima', ' Evitar blanco total'],
  },

  ceremony: {
    title: 'Ceremonia',
    subtitle: 'Capilla / Mirador',
    address: 'Mirador Alto del Bosque, Km 8 vía La Montaña',
    time: '5:00 PM',
    mapUrl: 'https://www.google.com/maps?client=opera-gx&hs=U6V&sca_esv=2827ae63164125c3&output=search&q=mirador+la+calera&source=lnms&fbs=ADc_l-bpk8W4E-qsVlOvbGJcDwpn60DczFdcvPnuv8WQohHLTVlJczjYHjSUbzKnD50j85qqpSXTzGFAYlMMh9MYEJ9F0YmMIWqbOh-GCZlGfkbLZBX1U4tRs--6PBXXc0UiurO6HBYDl1Z8_FgoB4YuVZ7wfv773tQT-0mGPYEVuqvFfl8aw-0JrN_YE5M-GsmW6JHhzpqXa9PnQpIdpLYJOhXTTMiQzA&entry=mc&ved=1t:200715&ictx=111',
    image: 'https://i.pinimg.com/1200x/9b/80/99/9b8099d3bed0c36c1c9f3673dc22cd49.jpg',
  } satisfies Place,

  reception: {
    title: 'Recepción',
    subtitle: 'Fogata & Fiesta',
    address: 'Cabaña Bosque Azul, Salón Principal',
    time: '7:00 PM',
    mapUrl: 'https://www.google.com/maps/place/Bahía+Centro+De+Convenciones/@4.6777071,-74.1744689,12z/data=!4m10!1m2!2m1!1ssalon+social++La+Calera!3m6!1s0x8e3f9070e34f4f4b:0x344fe5bd5a69cf2c!8m2!3d4.6777071!4d-74.0220336!15sChdzYWxvbiBzb2NpYWwgIExhIENhbGVyYVoYIhZzYWxvbiBzb2NpYWwgbGEgY2FsZXJhkgELZXZlbnRfdmVudWWaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVTjJaMHRJWTBObkVBReABAPoBBAgAEEc!16s%2Fg%2F1tr8mmst?entry=ttu&g_ep=EgoyMDI2MDIxNy4wIKXMDSoASAFQAw%3D%3D',
    image: 'https://i.pinimg.com/736x/30/5a/c0/305ac0d54fe119fc966bbb1ae2992b93.jpg',
  } satisfies Place,

  coupleCarousel: [
    'https://i.pinimg.com/736x/f5/25/8c/f5258c8b600dad438ca7da786a1ff3bb.jpg',
    'https://i.pinimg.com/1200x/b1/4a/30/b14a3063bf722e2c5846c9e5963946c3.jpg',
    'https://i.pinimg.com/1200x/0b/ef/86/0bef861a3ffb06bfef67c7f8c1a49bf6.jpg',
    'https://i.pinimg.com/1200x/c4/6d/46/c46d4679fa85eb8ecd924bd4c49e8bf0.jpg',
  ],

  verse: {
    reference: 'Eclesiastés 4:9–10',
    text: 'Mejores son dos que uno… porque si caen, el uno levantará a su compañero.',
  },

  gratitude: {
    title: 'Gracias',
    text: 'Gracias por acompañarnos. Tu presencia hace esta aventura aún más especial.',
  },

  itinerary: [
    { time: '4:30 PM', title: 'Llegada', note: 'Bienvenida y fotos en el mirador', icon: '' },
    { time: '5:00 PM', title: 'Ceremonia', note: 'Nuestro “Sí” entre montañas', icon: '' },
    { time: '6:00 PM', title: 'Brindis', note: 'Un momento para abrazos', icon: '' },
    { time: '7:00 PM', title: 'Recepción', note: 'Cena + fogata + música', icon: '' },
    { time: '9:00 PM', title: 'Fiesta', note: 'Bailamos bajo las estrellas', icon: '' },
  ] satisfies TimelineItem[],

  gifts: [
    { label: 'Nevera', icon: '', url: 'https://www.nequi.com.co/', note: 'Regalo sugerido' },
    { label: 'Lavadora', icon: '', url: 'https://www.nequi.com.co/', note: 'Regalo sugerido' },
    { label: 'Plancha', icon: '', url: 'https://www.nequi.com.co/', note: 'Regalo sugerido' },
    { label: 'Licuadora', icon: '', url: 'https://www.nequi.com.co/', note: 'Regalo sugerido' },
    { label: 'Sala', icon: '', url: 'https://www.nequi.com.co/', note: 'Regalo sugerido' },
    { label: 'Comedor', icon: '', url: 'https://www.nequi.com.co/', note: 'Regalo sugerido' },
    { label: 'Nequi', icon: '', url: 'https://www.nequi.com.co/', note: 'Nequi: 300 000 0000' },
  ] satisfies GiftItem[],

  hallOfFame: [
    {
      title: 'Nuestros Padres',
      tagline: 'Los que nos enseñaron a amar',
      people: [
        { role: 'Padre de la novia', name: 'Carlos Ramírez', photo: 'https://i.pinimg.com/736x/c2/50/fb/c250fb721fba731f1342d25dc3c88c4e.jpg' },
        { role: 'Madre de la novia', name: 'Mariana López', photo: 'https://i.pinimg.com/736x/00/b4/a5/00b4a58426afeb87ecb439d32e67e2de.jpg' },
        { role: 'Padre del novio', name: 'Javier Torres', photo: 'https://i.pinimg.com/736x/9f/ce/2b/9fce2b3660f683443d27f8465f71891a.jpg' },
        { role: 'Madre del novio', name: 'Patricia Gómez', photo: 'https://i.pinimg.com/1200x/b9/8c/12/b98c1264d22cece72e4f5810d0f29a30.jpg' },
      ],
    },
    {
      title: 'Nuestros Padrinos',
      tagline: 'Nuestros cómplices de este “Sí”',
      people: [
        { role: 'Padrinos de anillos', name: 'Andrea & Felipe', photo: 'https://i.pinimg.com/1200x/dc/26/69/dc266963b6e9344dd854be6654181516.jpg' },
        { role: 'Padrinos de brindis', name: 'Sofía & Daniel', photo: 'https://i.pinimg.com/1200x/4e/1d/d0/4e1dd07bb8da8a230503272ac4963b41.jpg' },
      ],
    },
    {
      title: 'Damas de Honor',
      tagline: 'Las que nos acompañan en la aventura',
      people: [
        { role: 'Dama de honor', name: 'Camila', photo: 'https://i.pinimg.com/736x/4c/cc/7a/4ccc7ac4966981f7a84ec6f2f1cd0ac1.jpg' },
        { role: 'Dama', name: 'Sofía', photo: 'https://i.pinimg.com/1200x/39/35/d6/3935d6e4bfb5bb4c9a47f0e58b1aa9de.jpg' },
        { role: 'Dama', name: 'Valentina', photo: 'https://i.pinimg.com/1200x/60/21/b9/6021b9666196d94f6dfcf15b10d715e5.jpg' },
      ],
    },
  ] as Array<{ title: string; tagline: string; people: PersonPhoto[] }>,

  quiz: {
    title: '¿Qué tanto conoces nuestra historia?',
    subtitle: '4 preguntas rápidas — ¡a ver si te la sabes! ',
    questions: [
      { id: 'q1', question: '¿En qué año nos cuadramos?', options: ['2018', '2020', '2022'], correctIndex: 1 },
      { id: 'q2', question: '¿Dónde fue nuestra primera cita?', options: ['Café', 'Cine', 'Parque'], correctIndex: 0 },
      { id: 'q3', question: '¿Cuándo me pidió ser su esposa?', options: ['En un viaje', 'En una cena', 'En la montaña'], correctIndex: 2 },
      { id: 'q4', question: '¿Cuál es nuestro plan soñado?', options: ['Vivir en playa', 'Viajar por el mundo', 'Tener una cabaña'], correctIndex: 1 },
    ] satisfies QuizQ[],
  },
};
/** ======================================================= */

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/** Hydration-safe countdown */
function useCountdown(targetISO: string) {
  const target = useMemo(() => new Date(targetISO).getTime(), [targetISO]);
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(0);

  useEffect(() => {
    setMounted(true);
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const diff = mounted ? Math.max(0, target - now) : 0;
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, done: mounted ? diff === 0 : false, mounted };
}

function Badge({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs backdrop-blur',
        dark ? 'border-slate-900/15 bg-white/70 text-slate-900' : 'border-white/28 bg-white/10 text-white'
      )}
    >
      {children}
    </span>
  );
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-3xl border border-slate-900/10 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.08)]', className)}>
      {children}
    </div>
  );
}

function SectionTitle({ kicker, title, note }: { kicker?: string; title: string; note?: string }) {
  return (
    <div className="mb-6">
      {kicker ? <div className="text-xs tracking-[0.22em] uppercase text-slate-500">{kicker}</div> : null}
      <h2 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">{title}</h2>
      {note ? <p className="mt-2 max-w-2xl text-slate-600">{note}</p> : null}
    </div>
  );
}

/** BG global rosadito + natural */
function GlobalBackgroundMountain({ src }: { src: string }) {
  return (
    <div className="fixed inset-0 -z-40">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${src}')` }} />
      <div className="absolute inset-0 bg-gradient-to-b from-rose-50/45 via-white/40 to-white/75" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(15,61,46,0.14),transparent_55%),radial-gradient(circle_at_bottom,rgba(244,63,94,0.10),transparent_60%)]" />
      <div className="absolute inset-0 [box-shadow:inset_0_0_130px_rgba(15,23,42,0.10)]" />
    </div>
  );
}

function SoftFloatParticles() {
  const mounted = useMounted();
  const [p, setP] = useState<Array<{ id: string; left: number; size: number; dur: number; delay: number; op: number; blur: number }>>([]);

  useEffect(() => {
    if (!mounted) return;
    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    setP(
      Array.from({ length: 10 }).map((_, i) => ({
        id: `pf-${i}-${Math.random().toString(16).slice(2)}`,
        left: rand(0, 100),
        size: rand(8, 18),
        dur: rand(14, 22),
        delay: rand(0, 7),
        op: rand(0.08, 0.18),
        blur: rand(0.4, 1.0),
      }))
    );
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      <style>{`
        @keyframes driftUp {
          0% { transform: translate3d(0, 12vh, 0); opacity: 0; }
          10% { opacity: var(--op); }
          100% { transform: translate3d(0, -112vh, 0); opacity: 0; }
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 -z-30 overflow-hidden">
        {p.map((x) => (
          <div
            key={x.id}
            className="absolute -bottom-16"
            style={{
              left: `${x.left}%`,
              width: `${x.size}px`,
              height: `${x.size}px`,
              filter: `blur(${x.blur}px)`,
              animation: `driftUp ${x.dur}s linear ${x.delay}s infinite`,
              // @ts-expect-error css var
              '--op': x.op,
            }}
          >
            <div className="h-full w-full rounded-full bg-white/80 shadow-[0_18px_55px_rgba(15,61,46,0.10)]" />
          </div>
        ))}
      </div>
    </>
  );
}

function GlassLite({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl border border-white/25',
        'bg-white/8 backdrop-blur-xl',
        'shadow-[0_22px_80px_rgba(15,23,42,0.14)]',
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-28 -top-28 h-72 w-72 rounded-full bg-rose-200/18 blur-3xl" />
        <div className="absolute -right-28 -bottom-28 h-80 w-80 rounded-full bg-emerald-200/14 blur-3xl" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

function CountdownPill({ label, value }: { label: string; value: number }) {
  const v = value.toString().padStart(2, '0');
  return (
    <div className="rounded-2xl border border-white/22 bg-white/10 px-3 py-2 text-center text-white backdrop-blur">
      <div className="text-xl font-semibold tabular-nums sm:text-2xl">{v}</div>
      <div className="mt-1 text-[10px] tracking-[0.2em] uppercase text-white/80">{label}</div>
    </div>
  );
}

function PlaceCard({ place }: { place: Place }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full sm:h-56">
        <Image src={place.image} alt={place.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-slate-950/10 to-transparent" />
        <div className="absolute left-4 top-4 flex gap-2">
          <Badge dark>{place.subtitle}</Badge>
          {place.time ? <Badge dark>{place.time}</Badge> : null}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{place.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{place.address}</p>
          </div>

          <a
            href={place.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 rounded-full bg-emerald-950 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-900 active:scale-[0.99]"
          >
            Cómo llegar
          </a>
        </div>
      </div>
    </Card>
  );
}

/** Hall of fame */
function FamePerson({ p, index }: { p: PersonPhoto; index: number }) {
  const medal = index % 3 === 0 ? '' : index % 3 === 1 ? '' : '';
  return (
    <div className="group relative overflow-hidden rounded-[28px] border border-slate-900/10 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.10)] transition hover:-translate-y-0.5">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute -left-20 -top-24 h-56 w-56 rounded-full bg-emerald-200/35 blur-3xl" />
        <div className="absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-rose-200/25 blur-3xl" />
      </div>

      <div className="p-4">
        <div className="relative rounded-[22px] border border-slate-900/10 bg-gradient-to-b from-emerald-50 to-white p-3">
          <div className="relative mx-auto aspect-square w-full max-w-[220px] overflow-hidden rounded-full border-[10px] border-white shadow-[0_18px_50px_rgba(15,23,42,0.12)]">
            <Image src={p.photo} alt={p.name} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/5" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.55),transparent_55%)]" />
          </div>

          <div className="mx-auto -mt-3 w-[min(220px,100%)]">
            <div className="rounded-2xl border border-slate-900/10 bg-white px-4 py-3 text-center shadow-sm">
              <div className="text-sm font-semibold text-slate-900">{p.name}</div>
              <div className="mt-0.5 text-xs text-slate-600">{p.role}</div>
            </div>
          </div>

          <div className="mt-3 rounded-2xl border border-emerald-900/10 bg-gradient-to-r from-emerald-50 via-emerald-100/60 to-emerald-50 px-4 py-2">
            <div className="flex items-center justify-between text-xs font-semibold text-emerald-950/80">
              <span>Hall of Fame</span>
              <span>{medal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HallOfFame({ groups }: { groups: typeof INVITE.hallOfFame }) {
  return (
    <Card className="relative overflow-hidden p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(15,61,46,0.10),transparent_55%),linear-gradient(0deg,rgba(15,61,46,0.04),rgba(15,61,46,0.04))]" />
      <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(90deg,rgba(15,23,42,0.08)_1px,transparent_1px),linear-gradient(rgba(15,23,42,0.08)_1px,transparent_1px)] [background-size:18px_18px]" />

      <div className="relative">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs tracking-[0.22em] uppercase text-slate-500">Familia & Amigos</div>
            <h3 className="mt-2 text-2xl font-semibold text-slate-900">Hall of Fame</h3>
            <p className="mt-2 max-w-2xl text-slate-600">Las personas que hacen esta aventura posible </p>
          </div>
          <div className="rounded-2xl border border-slate-900/10 bg-white/70 px-4 py-3 text-xs text-slate-700">Acento verde pino 🌲</div>
        </div>

        <div className="mt-6 grid gap-6">
          {groups.map((g) => (
            <div key={g.title} className="rounded-3xl border border-slate-900/10 bg-white/75 p-5 backdrop-blur">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-lg font-semibold text-slate-900">{g.title}</div>
                  <div className="text-sm text-slate-600">{g.tagline}</div>
                </div>
                <div className="mt-3 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-900/10 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-950 sm:mt-0">
                  <span className="h-2 w-2 rounded-full bg-emerald-700" />
                  Destacados
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {g.people.map((p, idx) => (
                  <FamePerson key={`${p.role}-${p.name}`} p={p} index={idx} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

/** Carrusel pareja */
function CoupleCarousel({ images }: { images: string[] }) {
  const [i, setI] = useState(0);
  const total = images.length;
  const prev = () => setI((x) => (x - 1 + total) % total);
  const next = () => setI((x) => (x + 1) % total);

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <div className="relative aspect-[16/10] w-full">
          <Image src={images[i]} alt="Foto pareja" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent" />
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
          <div className="rounded-full border border-white/25 bg-white/10 px-3 py-2 text-xs font-semibold text-white backdrop-blur">
            {i + 1} / {total}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={prev}
              className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-white/15 active:scale-[0.99]"
              aria-label="Anterior"
            >
              ←
            </button>
            <button
              type="button"
              onClick={next}
              className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-white/15 active:scale-[0.99]"
              aria-label="Siguiente"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-4 gap-2">
          {images.slice(0, 4).map((src, idx) => {
            const active = idx === i;
            return (
              <button
                key={`${src}-${idx}`}
                type="button"
                onClick={() => setI(idx)}
                className={cn(
                  'relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-inset transition',
                  active ? 'ring-emerald-900/35' : 'ring-slate-900/10 hover:ring-emerald-900/20'
                )}
                aria-label={`Ir a foto ${idx + 1}`}
              >
                <Image src={src} alt="Miniatura" fill className="object-cover" sizes="25vw" />
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

/** Versículo + agradecimiento */
function VerseAndThanks({
  verseRef,
  verseText,
  thanksTitle,
  thanksText,
}: {
  verseRef: string;
  verseText: string;
  thanksTitle: string;
  thanksText: string;
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="relative overflow-hidden p-6">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10" />
        <div className="absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-rose-500/10" />
        <div className="relative">
          <div className="text-xs tracking-[0.22em] uppercase text-slate-500">Versículo</div>
          <p className="mt-3 text-lg font-medium leading-relaxed text-slate-900 sm:text-xl">“{verseText}”</p>
          <div className="mt-3 text-sm font-semibold text-emerald-950">{verseRef}</div>
        </div>
      </Card>

      <div className="rounded-3xl border border-emerald-950/10 bg-emerald-950 p-6 text-white shadow-[0_22px_70px_rgba(15,61,46,0.20)]">
        <div className="text-xs tracking-[0.22em] uppercase text-white/70">Mensaje</div>
        <h3 className="mt-2 text-xl font-semibold">{thanksTitle}</h3>
        <p className="mt-2 text-white/80">{thanksText}</p>

        <div className="mt-4 rounded-2xl border border-white/15 bg-white/10 p-4 text-sm text-white/85">
          Aventura + amor + bosque 
        </div>
      </div>
    </div>
  );
}

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <Card className="p-5">
      <ol className="space-y-4">
        {items.map((it, idx) => (
          <li key={`${it.time}-${idx}`} className="flex gap-4">
            <div className="mt-1 w-16 shrink-0">
              <div className="text-sm font-semibold text-slate-900">{it.time}</div>
              <div className="mt-1 h-px w-12 bg-slate-200" />
            </div>
            <div className="flex-1 rounded-2xl border border-emerald-900/10 bg-emerald-50/60 p-4">
              <div className="text-base font-semibold text-slate-900">
                <span className="mr-2">{it.icon ?? ''}</span>
                {it.title}
              </div>
              {it.note ? <div className="mt-1 text-sm text-slate-600">{it.note}</div> : null}
            </div>
          </li>
        ))}
      </ol>
    </Card>
  );
}

function Gifts({ items }: { items: GiftItem[] }) {
  return (
    <Card className="p-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((g) => (
          <a
            key={g.label}
            href={g.url}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl border border-emerald-900/10 bg-white p-4 transition hover:bg-emerald-50"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-50 text-emerald-950 ring-1 ring-inset ring-emerald-900/10">
                  {g.icon ?? ''}
                </span>
                <div className="text-base font-semibold text-slate-900">{g.label}</div>
              </div>
              <div className="text-emerald-950/50 transition group-hover:translate-x-0.5">↗</div>
            </div>
            {g.note ? <div className="mt-2 text-sm text-slate-600">{g.note}</div> : null}
          </a>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-emerald-900/10 bg-emerald-50 p-4 text-sm text-emerald-950">
        Si prefieres, también puedes apoyarnos por <span className="font-semibold">Nequi</span>. ¡Gracias! 
      </div>
    </Card>
  );
}

/** ====== NUEVO: Canción sugerida (invitado escribe y envía por WhatsApp) ====== */
function buildWhatsAppUrl(phone: string, message: string) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${text}`;
}

function SongSuggestion({
  bridePhone,
  groomPhone,
}: {
  bridePhone: string;
  groomPhone: string;
}) {
  const [guestName, setGuestName] = useState('');
  const [songName, setSongName] = useState('');
  const [artist, setArtist] = useState('');
  const [note, setNote] = useState('¡Esta canción me recuerda a ustedes!');

  const message = useMemo(() => {
    const n = guestName?.trim() || 'Invitado';
    const s = songName?.trim() || '(sin título)';
    const a = artist?.trim() || '(sin artista)';
    const x = note?.trim() || '-';
    return `Hola! Soy ${n} \n\nMi canción sugerida para su boda es:\n ${s} — ${a}\n\nMensaje: ${x}\n\n#SugerenciaDeCanción`;
  }, [artist, guestName, note, songName]);

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-xs tracking-[0.22em] uppercase text-slate-500">Música</div>
          <div className="mt-2 text-xl font-semibold text-slate-900">Deja tu canción sugerida</div>
          <div className="mt-1 text-sm text-slate-600">El invitado escribe y se envía por WhatsApp a la novia o al novio.</div>
        </div>

        <div className="rounded-2xl border border-emerald-900/10 bg-emerald-50 px-4 py-3 text-xs text-emerald-950">
          Tip: esto sube engagement y “shareability”
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">Tu nombre</label>
            <input
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Ej: Laura"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-950"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">Canción</label>
              <input
                value={songName}
                onChange={(e) => setSongName(e.target.value)}
                placeholder="Ej: Perfect"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-950"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">Artista</label>
              <input
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="Ej: Ed Sheeran"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-950"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">Mensaje (opcional)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-950"
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl border border-emerald-900/10 bg-emerald-50 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-950">Vista previa</div>
            <pre className="mt-2 whitespace-pre-wrap break-words rounded-xl bg-white p-3 text-sm text-slate-800">
              {message}
            </pre>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href={buildWhatsAppUrl(bridePhone, message)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-emerald-950 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-900"
            >
              Enviar a la novia 
            </a>
            <a
              href={buildWhatsAppUrl(groomPhone, message)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-emerald-950/20 bg-white px-5 py-3 text-sm font-semibold text-emerald-950 hover:bg-emerald-50"
            >
              Enviar al novio 
            </a>
          </div>

          <div className="text-xs text-slate-500">
            WhatsApp abre el chat con el texto listo. El invitado solo presiona “Enviar”.
          </div>
        </div>
      </div>
    </Card>
  );
}

/** Dress Code section */
function DressCode({
  title,
  text,
  tips,
}: {
  title: string;
  text: string;
  tips: string[];
}) {
  return (
    <Card className="p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-xs tracking-[0.22em] uppercase text-slate-500">{title}</div>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">Cómo venir</h3>
          <p className="mt-1 text-sm text-slate-600">{text}</p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-900/10 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-950">
          <span className="h-2 w-2 rounded-full bg-emerald-700" />
          Recomendación
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {tips.map((t) => (
          <div key={t} className="rounded-2xl border border-emerald-900/10 bg-emerald-50/60 p-4 text-sm text-emerald-950">
            {t}
          </div>
        ))}
      </div>
    </Card>
  );
}

/** Love quiz */
function LoveStoryQuiz({ quiz }: { quiz: typeof INVITE.quiz }) {
  const [answers, setAnswers] = useState<Record<string, number | undefined>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => {
    if (!submitted) return 0;
    return quiz.questions.reduce((acc, q) => acc + (answers[q.id] === q.correctIndex ? 1 : 0), 0);
  }, [answers, quiz.questions, submitted]);

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-xs tracking-[0.22em] uppercase text-slate-500">Juego</div>
          <div className="mt-2 text-xl font-semibold text-slate-900">{quiz.title}</div>
          <div className="mt-1 text-sm text-slate-600">{quiz.subtitle}</div>
        </div>

        <div className="rounded-2xl border border-emerald-900/10 bg-emerald-50 px-4 py-3 text-sm text-emerald-950">
          {submitted ? (
            <span className="font-semibold">
              Puntos: {score}/{quiz.questions.length}
            </span>
          ) : (
            'Responde y luego “Calificar”'
          )}
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {quiz.questions.map((q, idx) => {
          const chosen = answers[q.id];
          const correct = submitted && chosen === q.correctIndex;
          const wrong = submitted && chosen !== undefined && chosen !== q.correctIndex;

          return (
            <div key={q.id} className="rounded-3xl border border-slate-900/10 bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="text-sm font-semibold text-slate-900">
                  <span className="mr-2 text-slate-400">{idx + 1}.</span>
                  {q.question}
                </div>
                {submitted ? (
                  <div
                    className={cn(
                      'rounded-full px-3 py-1 text-xs font-semibold',
                      correct ? 'bg-emerald-600/10 text-emerald-700' : wrong ? 'bg-rose-600/10 text-rose-700' : 'bg-slate-900/5 text-slate-700'
                    )}
                  >
                    {correct ? '✔ Correcto' : wrong ? '✖ Ups' : '—'}
                  </div>
                ) : null}
              </div>

              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {q.options.map((opt, oi) => {
                  const active = chosen === oi;
                  const showCorrect = submitted && oi === q.correctIndex;

                  return (
                    <button
                      key={`${q.id}-${oi}`}
                      type="button"
                      onClick={() => {
                        if (submitted) return;
                        setAnswers((prev) => ({ ...prev, [q.id]: oi }));
                      }}
                      className={cn(
                        'rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition',
                        active ? 'border-emerald-950 bg-emerald-950 text-white' : 'border-slate-900/10 bg-white text-slate-900 hover:bg-emerald-50',
                        submitted && showCorrect && !active ? 'ring-2 ring-emerald-500/35' : ''
                      )}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => {
            setAnswers({});
            setSubmitted(false);
          }}
          className="rounded-full border border-emerald-900/10 bg-white px-5 py-3 text-sm font-semibold text-emerald-950 hover:bg-emerald-50"
        >
          Reiniciar
        </button>
        <button type="button" onClick={() => setSubmitted(true)} className="rounded-full bg-emerald-950 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-900">
          Calificar
        </button>
      </div>
    </Card>
  );
}

export default function MountainInvitePage() {
  const mounted = useMounted();
  const countdown = useCountdown(INVITE.dateISO);
  const [opened, setOpened] = useState(false);

  // Audio
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const weddingDatePretty = useMemo(() => {
    if (!mounted) return '';
    const d = new Date(INVITE.dateISO);
    return d.toLocaleString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  }, [mounted]);

  const safeDays = countdown.mounted ? countdown.days : 0;
  const safeHours = countdown.mounted ? countdown.hours : 0;
  const safeMinutes = countdown.mounted ? countdown.minutes : 0;
  const safeSeconds = countdown.mounted ? countdown.seconds : 0;

  const openInvitation = async () => {
    setOpened(true);
    const a = audioRef.current;
    if (!a) return;
    try {
      await a.play(); // ✅ solo por click
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const toggleAudio = async () => {
    const a = audioRef.current;
    if (!a) return;
    try {
      if (a.paused) {
        await a.play();
        setIsPlaying(true);
      } else {
        a.pause();
        setIsPlaying(false);
      }
    } catch {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onEnded = () => setIsPlaying(false);
    a.addEventListener('ended', onEnded);
    return () => a.removeEventListener('ended', onEnded);
  }, []);

  return (
    <main className="min-h-screen text-slate-900">
      <GlobalBackgroundMountain src={INVITE.globalBgImage} />
      <SoftFloatParticles />

      <audio ref={audioRef} src={INVITE.songUrl} preload="auto" />

      {/* PORTADA */}
      {!opened ? (
        <section className="relative min-h-screen overflow-hidden">
          <div className="absolute inset-0">
            <Image src={INVITE.cover.photo} alt="Portada montaña" fill className="object-cover" priority sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/55 via-slate-950/20 to-slate-950/45" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(15,61,46,0.18),transparent_55%),radial-gradient(circle_at_bottom,rgba(244,63,94,0.12),transparent_60%)]" />
          </div>

          <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 py-16 text-center">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge>{INVITE.brand}</Badge>
              <Badge>{INVITE.themeTag}</Badge>
              <Badge>{INVITE.locationLine}</Badge>
            </div>

            <h1 className="mt-6 text-4xl font-semibold text-white drop-shadow-sm sm:text-6xl">
              {INVITE.couple.bride} <span className="text-white/70">&</span> {INVITE.couple.groom}
            </h1>

            <p className="mt-4 max-w-2xl text-white/85 sm:text-lg">{INVITE.cover.headline}</p>
            <p className="mt-2 max-w-2xl text-sm text-white/75">{INVITE.cover.subline}</p>

            <div className="relative mt-10 w-[min(360px,calc(100%-20px))]">
              <GlassLite className="p-4">
                <button
                  type="button"
                  onClick={openInvitation}
                  className={cn(
                    'w-full rounded-full border border-white/25 bg-white/10 px-4 py-3 text-left text-white',
                    'backdrop-blur-md transition hover:bg-white/14 active:scale-[0.98]'
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] tracking-[0.22em] uppercase text-white/75">{INVITE.cover.badge}</div>
                      <div className="mt-1 text-base font-semibold">{INVITE.cover.buttonText}</div>
                      <div className="mt-1 text-xs text-white/80">Con música </div>
                    </div>

                    <div className="grid h-10 w-10 place-items-center rounded-full bg-emerald-950 text-white shadow-[0_14px_40px_rgba(15,61,46,0.22)]">
                      ▶︎
                    </div>
                  </div>
                </button>

                <div className="mt-4 grid grid-cols-4 gap-2">
                  <CountdownPill label="D" value={safeDays} />
                  <CountdownPill label="H" value={safeHours} />
                  <CountdownPill label="M" value={safeMinutes} />
                  <CountdownPill label="S" value={safeSeconds} />
                </div>

                <div className="mt-3 text-[11px] text-white/75">{mounted ? `📅 ${weddingDatePretty}` : '📅 Cargando…'}</div>
              </GlassLite>
            </div>
          </div>
        </section>
      ) : null}

      {/* INVITACIÓN */}
      {opened ? (
        <>
          <section className="relative overflow-hidden">
            <div className="absolute inset-0">
              <Image src={INVITE.banner.photo} alt="Banner pareja" fill className="object-cover" priority sizes="100vw" />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/55 via-slate-950/18 to-transparent" />
            </div>

            <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-10 sm:pb-14 sm:pt-14">
              <div className="flex flex-col gap-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>{INVITE.brand}</Badge>
                    <Badge>{INVITE.locationLine}</Badge>
                    <Badge>{INVITE.themeTag}</Badge>
                    {/* ✅ Dress code visible aquí */}
                    <Badge>🥾 {INVITE.banner.dresscodeText}</Badge>
                  </div>

                  <button
                    onClick={toggleAudio}
                    className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-white/15"
                    aria-label="Control música"
                  >
                    {isPlaying ? 'Pausar ⏸' : 'Música ▶'}
                  </button>
                </div>

                <div className="max-w-3xl">
                  <h2 className="mt-2 text-4xl font-semibold text-white sm:text-6xl">
                    {INVITE.couple.bride} <span className="text-white/70">&</span> {INVITE.couple.groom}
                  </h2>
                  <p className="mt-3 max-w-2xl text-base text-white/85 sm:text-lg">{INVITE.banner.tagline}</p>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <Badge>📅 {mounted ? weddingDatePretty : 'Cargando…'}</Badge>
                  </div>
                </div>

                <div className="mt-1 w-full max-w-xl rounded-3xl border border-white/20 bg-white/8 p-4 backdrop-blur-md">
                  <div className="mb-3 text-sm font-semibold text-white/90">{countdown.done ? '¡Es hoy! 🏔️💍' : 'Cuenta regresiva'}</div>
                  <div className="grid grid-cols-4 gap-2">
                    <CountdownPill label="D" value={safeDays} />
                    <CountdownPill label="H" value={safeHours} />
                    <CountdownPill label="M" value={safeMinutes} />
                    <CountdownPill label="S" value={safeSeconds} />
                  </div>
                </div>

                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#lugares"
                    className="inline-flex items-center justify-center rounded-full bg-emerald-950 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-900"
                  >
                    Ver lugares 
                  </a>
                  <a
                    href="#dress"
                    className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/15"
                  >
                    Dress code 
                  </a>
                  <a
                    href="#song"
                    className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/15"
                  >
                    Sugerir canción 
                  </a>
                </div>
              </div>
            </div>
          </section>

          <div className="mx-auto max-w-6xl px-4 pb-16">
            <section id="lugares" className="-mt-6 scroll-mt-20 sm:-mt-10">
              <SectionTitle kicker="Ubicaciones" title="Ceremonia & Recepción" note="Dos paradas de esta aventura: el “Sí” y la celebración." />
              <div className="grid gap-4 md:grid-cols-2">
                <PlaceCard place={INVITE.ceremony} />
                <PlaceCard place={INVITE.reception} />
              </div>
            </section>

            <section className="mt-12">
              <SectionTitle kicker="Fotos" title="Nuestra aventura en imágenes" note="Carrusel premium y shareable." />
              <CoupleCarousel images={INVITE.coupleCarousel} />
            </section>

            <section className="mt-12">
              <SectionTitle kicker="Amor" title="Un mensaje para el corazón" note="Versículo + agradecimiento con coherencia verde pino." />
              <VerseAndThanks
                verseRef={INVITE.verse.reference}
                verseText={INVITE.verse.text}
                thanksTitle={INVITE.gratitude.title}
                thanksText={INVITE.gratitude.text}
              />
            </section>

            {/* ✅ Dress code sección */}
            <section id="dress" className="mt-12 scroll-mt-20">
              <SectionTitle kicker="Guía" title="Dress code" note="Para que estés cómodo/a y en sintonía con la montaña." />
              <DressCode title={INVITE.banner.dresscodeTitle} text={INVITE.banner.dresscodeText} tips={INVITE.banner.dresscodeTips} />
            </section>

            <section className="mt-12">
              <SectionTitle kicker="Ruta del día" title="Itinerario" note="Para que no te pierdas nada." />
              <Timeline items={INVITE.itinerary} />
            </section>

            {/* ✅ Canción sugerida interactiva */}
            <section id="song" className="mt-12 scroll-mt-20">
              <SectionTitle kicker="Música" title="Sugerir canción" note="El invitado deja su recomendación y la envía por WhatsApp." />
              <SongSuggestion bridePhone={INVITE.whatsapp.bridePhone} groomPhone={INVITE.whatsapp.groomPhone} />
            </section>

            <section id="hall" className="mt-12 scroll-mt-20">
              <SectionTitle kicker="Equipo" title="Padres, Padrinos & Damas" note="Formato “Hall of Fame” premium con acento pino." />
              <HallOfFame groups={INVITE.hallOfFame} />
            </section>

            <section className="mt-12">
              <SectionTitle kicker="Regalos" title="Lista de regalos" note="Sugerencias tipo hogar + opción Nequi 💚" />
              <Gifts items={INVITE.gifts} />
            </section>

            <section id="juego" className="mt-12 scroll-mt-20">
              <SectionTitle kicker="Interacción" title="Juego: nuestra historia" note="4 preguntas rápidas que aumentan el engagement." />
              <LoveStoryQuiz quiz={INVITE.quiz} />
            </section>

            <footer className="mt-14 rounded-3xl border border-slate-900/10 bg-white/80 p-6 text-center backdrop-blur">
              <div className="text-sm text-slate-600">
                Hecho con ♥ por <span className="font-semibold text-emerald-950">{INVITE.brand}</span> — Tarjetas digitales premium
              </div>
              <div className="mt-2 text-xs text-slate-500">Glass suave + acento verde pino 🌲</div>
            </footer>
          </div>
        </>
      ) : null}
    </main>
  );
}