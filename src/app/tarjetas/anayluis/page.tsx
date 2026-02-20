'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

type Place = {
  title: string;
  subtitle: string;
  address: string;
  mapUrl: string;
  image: string;
  time?: string;
};

type TimelineItem = {
  time: string;
  title: string;
  note?: string;
  icon?: string;
};

type PolaroidPerson = {
  name: string;
  role: string;
  photo: string;
  tilt?: number;
};

type PolaroidGroup = {
  title: string;
  people: PolaroidPerson[];
};

type QuizQuestion = {
  id: string;
  text: string;
  answer: 'novia' | 'novio' | 'ambos';
};

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}

/** ===================== DATA ===================== */
const WEDDING = {
  brand: 'SI, FOREVER',
  couple: { bride: 'Valeria', groom: 'Sebastián' },
  dateISO: '2026-09-12T17:00:00-05:00',

  cover: {
    titleTop: 'Invitación',
    headline: 'Zarpamos hacia nuestro “Sí”',
    subline: 'Una celebración con alma de viaje y corazón de hogar',
    coverImage: 'https://i.pinimg.com/736x/6f/5d/88/6f5d88c62da7cdf45febe19b37e74cce.jpg',
    openButtonText: 'Abrir invitación',
    // RECOMENDADO: renombra tu archivo a algo sin espacios y en minúsculas:
    // /public/audio/kurt-la-mujer-perfecta.mp3
    // y usa esta ruta:
    songUrl: '/audio/Kurt - La Mujer Perfecta (Lyric Video) [1].MP3',
  },

  hero: {
    locationLine: 'Cartagena • 12 de Septiembre, 2026',
    tagline: 'Nos casamos y queremos que seas parte de nuestro gran viaje.',
  },

  ceremony: {
    title: 'Ceremonia',
    subtitle: 'Iglesia',
    address: 'Catedral Basílica, Calle 11 #5-26, Cartagena',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Catedral+Bas%C3%ADlica+Cartagena',
    image: 'https://i.pinimg.com/736x/43/98/7a/43987a5cd27d8ae7a89d25dbb07debbd.jpg',
    time: '5:00 PM',
  } satisfies Place,

  reception: {
    title: 'Recepción',
    subtitle: 'Fiesta',
    address: 'Salón Bahía, Av. del Mar #1-23, Cartagena',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Sal%C3%B3n+Bah%C3%ADa+Cartagena',
    image: 'https://i.pinimg.com/1200x/c5/5e/94/c55e94f4e368dc9f8322d955f72bf9f2.jpg',
    time: '7:00 PM',
  } satisfies Place,

  gallery: {
    images: [
      'https://i.pinimg.com/1200x/b1/4a/30/b14a3063bf722e2c5846c9e5963946c3.jpg',
      'https://i.pinimg.com/736x/f5/25/8c/f5258c8b600dad438ca7da786a1ff3bb.jpg',
      'https://i.pinimg.com/1200x/0b/ef/86/0bef861a3ffb06bfef67c7f8c1a49bf6.jpg',
      'https://i.pinimg.com/1200x/c4/6d/46/c46d4679fa85eb8ecd924bd4c49e8bf0.jpg',
    ],
  },

  verse: {
    reference: '1 Corintios 13:4–7',
    text:
      'El amor es paciente, es bondadoso… todo lo disculpa, todo lo cree, todo lo espera, todo lo soporta.',
  },

  itinerary: [
    { time: '4:30 PM', title: 'Abordaje (llegada de invitados)', note: 'Te esperamos con calma y sonrisas', icon: '🧭' },
    { time: '5:00 PM', title: 'Ceremonia', note: 'Nuestro “Sí, acepto”', icon: '⛪' },
    { time: '6:10 PM', title: 'Fotos y brindis', note: 'Momento para abrazos y recuerdos', icon: '📸' },
    { time: '7:00 PM', title: 'Recepción', note: '¡A celebrar en alta mar!', icon: '🛳️' },
    { time: '9:30 PM', title: 'Pastel', note: 'Un dulce capítulo', icon: '🍰' },
  ] satisfies TimelineItem[],

  song: {
    title: 'La Mujer Perfecta',
    artist: 'Kurt',
    note: 'Se reproduce al abrir la invitación ',
    spotifyUrl: 'https://open.spotify.com/search/Kurt%20La%20Mujer%20Perfecta',
  },

  polaroids: [
    {
      title: 'Nuestros Padres',
      people: [
        { role: 'Padre de la novia', name: 'Carlos Ramírez', photo: 'https://i.pinimg.com/1200x/db/d5/7b/dbd57bd9617241f52c0c6f6f44a7de23.jpg', tilt: -4 },
        { role: 'Madre de la novia', name: 'Mariana López', photo: 'https://i.pinimg.com/736x/00/b4/a5/00b4a58426afeb87ecb439d32e67e2de.jpg', tilt: 3 },
        { role: 'Padre del novio', name: 'Javier Torres', photo: 'https://i.pinimg.com/736x/66/2c/2b/662c2bd785f08ad5abce2468c6d1726c.jpg', tilt: 5 },
        { role: 'Madre del novio', name: 'Patricia Gómez', photo: 'https://i.pinimg.com/1200x/b9/8c/12/b98c1264d22cece72e4f5810d0f29a30.jpg', tilt: -3 },
      ],
    },
    {
      title: 'Nuestros Padrinos',
      people: [
        { role: 'Padrinos de anillos', name: 'Andrea & Felipe', photo: 'https://i.pinimg.com/1200x/dc/26/69/dc266963b6e9344dd854be6654181516.jpg', tilt: 2 },
        { role: 'Padrinos de brindis', name: 'Sofía & Daniel', photo: 'https://i.pinimg.com/1200x/4e/1d/d0/4e1dd07bb8da8a230503272ac4963b41.jpg', tilt: -2 },
      ],
    },
  ] satisfies PolaroidGroup[],

  gifts: [
    { label: 'Amazon', url: 'https://www.amazon.com/', note: 'Lista de regalos (ejemplo)' },
    { label: 'Casaideas', url: 'https://www.casaideas.com.co/', note: 'Mesa de regalos (ejemplo)' },
    { label: 'Nequi', url: '#', note: 'Nequi: 300 000 0000' },
  ],

  rsvp: {
    title: 'Confirmación de asistencia',
    note: 'Por favor confirma tu asistencia por WhatsApp. Puedes enviar a la novia o al novio.',
    bridePhone: '573001112233',
    groomPhone: '573009998877',
    defaultMessage:
      'Hola! Confirmo mi asistencia a su boda. ✨\n\nNombre: {NOMBRE}\nAsistiré: {ASISTE}\nPersonas: {CANT}\nRestricciones/alergias: {ALERGIAS}\nMensaje: {MENSAJE}',
  },

  quiz: {
    title: '¿Qué tanto nos conoces?',
    subtitle: 'Marca quién crees que aplica: Novia, Novio o Ambos. ¡Suma puntos!',
    cover: 'https://i.pinimg.com/1200x/33/c4/d2/33c4d21f800312495080e721329c3b7e.jpg',
    questions: [
      { id: 'q1', text: '¿Quién dio el primer paso?', answer: 'novio' },
      { id: 'q2', text: '¿A quién le toma más tiempo estar listo?', answer: 'novia' },
      { id: 'q3', text: '¿Quién dijo “te amo” primero?', answer: 'ambos' },
      { id: 'q4', text: '¿Quién cocina mejor?', answer: 'novio' },
      { id: 'q5', text: '¿Quién es más romántico?', answer: 'novia' },
      { id: 'q6', text: '¿Quién planea mejor los viajes?', answer: 'ambos' },
      { id: 'q7', text: '¿Quién es el más desordenado?', answer: 'novio' },
      { id: 'q8', text: '¿Quién pagó la cuenta en la primera cita?', answer: 'novio' },
    ] satisfies QuizQuestion[],
  },
};
/** =============================================== */

/** ===================== FIX HYDRATION: COUNTDOWN ===================== */
function useCountdown(targetISO: string) {
  const target = useMemo(() => new Date(targetISO).getTime(), [targetISO]);

  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<number>(0);

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

/** ===================== UI PARTS ===================== */
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur">
      {children}
    </span>
  );
}

function SectionTitle({ kicker, title, note }: { kicker?: string; title: string; note?: string }) {
  return (
    <div className="mb-6">
      {kicker ? <div className="text-xs tracking-[0.2em] uppercase text-slate-500">{kicker}</div> : null}
      <h2 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">{title}</h2>
      {note ? <p className="mt-2 max-w-2xl text-slate-600">{note}</p> : null}
    </div>
  );
}

function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]', className)}>
      {children}
    </div>
  );
}

function CountdownBlock({ label, value }: { label: string; value: number }) {
  const v = value.toString().padStart(2, '0');
  return (
    <div className="flex flex-col items-center rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur">
      <div className="text-2xl font-semibold text-white sm:text-3xl">{v}</div>
      <div className="mt-1 text-[11px] tracking-[0.2em] uppercase text-white/80">{label}</div>
    </div>
  );
}

function PlaceCard({ place }: { place: Place }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-44 w-full sm:h-52">
        <Image src={place.image} alt={place.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent" />
        <div className="absolute left-4 top-4 flex gap-2">
          <Badge>{place.subtitle}</Badge>
          {place.time ? <Badge>{place.time}</Badge> : null}
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
            className="shrink-0 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 active:scale-[0.99]"
          >
            Cómo llegar
          </a>
        </div>
      </div>
    </Card>
  );
}

function GalleryTwoPerView({ images }: { images: string[] }) {
  const pages = useMemo(() => {
    const p: string[][] = [];
    for (let i = 0; i < images.length; i += 2) p.push(images.slice(i, i + 2));
    return p;
  }, [images]);

  const [page, setPage] = useState(0);
  const canPrev = page > 0;
  const canNext = page < pages.length - 1;

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-medium text-slate-900">Momentos de nuestro viaje</div>
          <div className="mt-1 text-xs text-slate-500">Cambia con las flechas</div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => canPrev && setPage((p) => p - 1)}
            className={cn(
              'rounded-xl border px-3 py-2 text-sm font-medium transition',
              canPrev ? 'border-slate-200 bg-white text-slate-900 hover:bg-slate-50' : 'border-slate-200/60 bg-slate-50 text-slate-400 cursor-not-allowed'
            )}
            aria-label="Anterior"
          >
            ←
          </button>
          <button
            onClick={() => canNext && setPage((p) => p + 1)}
            className={cn(
              'rounded-xl border px-3 py-2 text-sm font-medium transition',
              canNext ? 'border-slate-200 bg-white text-slate-900 hover:bg-slate-50' : 'border-slate-200/60 bg-slate-50 text-slate-400 cursor-not-allowed'
            )}
            aria-label="Siguiente"
          >
            →
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {pages[page]?.map((src, idx) => (
          <div key={`${src}-${idx}`} className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image src={src} alt="Foto de la pareja" fill className="object-cover" sizes="50vw" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {pages.map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            className={cn('h-2 w-2 rounded-full transition', i === page ? 'bg-slate-900' : 'bg-slate-300 hover:bg-slate-400')}
            aria-label={`Ir a página ${i + 1}`}
          />
        ))}
      </div>
    </Card>
  );
}

function VerseCard({ reference, text }: { reference: string; text: string }) {
  return (
    <Card className="relative overflow-hidden p-6">
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-slate-900/5" />
      <div className="absolute -left-20 -bottom-20 h-56 w-56 rounded-full bg-slate-900/5" />
      <div className="relative">
        <div className="text-xs tracking-[0.2em] uppercase text-slate-500">Versículo</div>
        <p className="mt-3 text-lg font-medium leading-relaxed text-slate-900 sm:text-xl">“{text}”</p>
        <div className="mt-3 text-sm font-semibold text-slate-700">{reference}</div>
      </div>
    </Card>
  );
}

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <Card className="p-5">
      <ol className="space-y-4">
        {items.map((it, i) => (
          <li key={`${it.time}-${i}`} className="flex gap-4">
            <div className="mt-1 flex w-16 shrink-0 flex-col items-start">
              <div className="text-sm font-semibold text-slate-900">{it.time}</div>
              <div className="mt-1 h-px w-12 bg-slate-200" />
            </div>

            <div className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-base font-semibold text-slate-900">
                <span className="mr-2">{it.icon ?? '🗺️'}</span>
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

/** POLAROID */
function Polaroid({ person }: { person: PolaroidPerson }) {
  const tilt = person.tilt ?? 0;
  return (
    <div className="group">
      <div
        className="rounded-3xl border border-slate-200 bg-white p-3 shadow-[0_12px_40px_rgba(15,23,42,0.08)] transition will-change-transform group-hover:-translate-y-0.5"
        style={{ transform: `rotate(${tilt}deg)` }}
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100">
          <Image src={person.photo} alt={person.name} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
          <div className="absolute inset-0 ring-1 ring-inset ring-black/5" />
        </div>

        <div className="px-2 pb-2 pt-3">
          <div className="text-sm font-semibold text-slate-900">{person.name}</div>
          <div className="mt-1 text-xs text-slate-600">{person.role}</div>
          <div className="mt-2 h-1 w-10 rounded-full bg-slate-900/10" />
        </div>
      </div>
    </div>
  );
}

function PolaroidSection({ groups }: { groups: PolaroidGroup[] }) {
  return (
    <div className="grid gap-4">
      {groups.map((g) => (
        <Card key={g.title} className="p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="text-base font-semibold text-slate-900">{g.title}</div>
            <div className="text-xs text-slate-500">Fotos estilo polaroid</div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {g.people.map((p) => (
              <Polaroid key={`${p.role}-${p.name}`} person={p} />
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

/** RSVP WhatsApp */
function buildWhatsAppUrl(phone: string, message: string) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${text}`;
}

function RSVP({
  bridePhone,
  groomPhone,
  title,
  note,
  defaultMessage,
}: {
  bridePhone: string;
  groomPhone: string;
  title: string;
  note: string;
  defaultMessage: string;
}) {
  const [name, setName] = useState('');
  const [attend, setAttend] = useState<'Sí' | 'No' | 'Tal vez'>('Sí');
  const [count, setCount] = useState(1);
  const [allergies, setAllergies] = useState('');
  const [msg, setMsg] = useState('¡Qué emoción acompañarlos!');

  const renderedMessage = useMemo(() => {
    return defaultMessage
      .replace('{NOMBRE}', name || 'Invitado')
      .replace('{ASISTE}', attend)
      .replace('{CANT}', String(count))
      .replace('{ALERGIAS}', allergies || 'N/A')
      .replace('{MENSAJE}', msg || '—');
  }, [allergies, attend, count, defaultMessage, msg, name]);

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-lg font-semibold text-slate-900">{title}</div>
          <p className="mt-1 text-sm text-slate-600">{note}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-700">
        
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">Tu nombre</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Escribe tu nombre"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">¿Asistirás?</label>
              <select
                value={attend}
                onChange={(e) => setAttend(e.target.value as any)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900"
              >
                <option>Sí</option>
                <option>No</option>
                <option>Tal vez</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">Personas</label>
              <input
                type="number"
                min={1}
                max={10}
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">Alergias / restricciones</label>
            <input
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              placeholder="Ej: sin gluten, vegetariano..."
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">Mensaje</label>
            <textarea
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              rows={4}
              className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900"
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">Vista previa</div>
            <pre className="mt-2 whitespace-pre-wrap break-words rounded-xl bg-white p-3 text-sm text-slate-800">{renderedMessage}</pre>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href={buildWhatsAppUrl(bridePhone, renderedMessage)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Enviar a la novia 💬
            </a>

            <a
              href={buildWhatsAppUrl(groomPhone, renderedMessage)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              Enviar al novio 💬
            </a>
          </div>

          <div className="text-xs text-slate-500">WhatsApp abre el chat con el texto listo. Solo presiona “Enviar”.</div>
        </div>
      </div>
    </Card>
  );
}

/** QUIZ */
function KnowUsQuiz({
  brideName,
  groomName,
  cover,
  title,
  subtitle,
  questions,
}: {
  brideName: string;
  groomName: string;
  cover?: string;
  title: string;
  subtitle: string;
  questions: QuizQuestion[];
}) {
  const [answers, setAnswers] = useState<Record<string, QuizQuestion['answer'] | undefined>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => {
    let s = 0;
    for (const q of questions) {
      if (!submitted) continue;
      if (answers[q.id] && answers[q.id] === q.answer) s += 1;
    }
    return s;
  }, [answers, questions, submitted]);

  const total = questions.length;

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        {cover ? (
          <div className="relative h-52 w-full sm:h-64">
            <Image src={cover} alt="Portada juego" fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
            <div className="absolute left-5 top-5 flex gap-2">
              <Badge>Juego</Badge>
              <Badge>Crucero Edition</Badge>
            </div>
            <div className="absolute bottom-5 left-5 right-5">
              <div className="text-2xl font-semibold text-white sm:text-3xl">{title}</div>
              <div className="mt-1 text-sm text-white/85">{subtitle}</div>
            </div>
          </div>
        ) : (
          <div className="p-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>Juego</Badge>
              <Badge>Crucero Edition</Badge>
            </div>
            <div className="mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">{title}</div>
            <div className="mt-1 text-sm text-slate-600">{subtitle}</div>
          </div>
        )}
      </div>

      <div className="relative p-5">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.06),transparent_55%),linear-gradient(0deg,rgba(120,53,15,0.08),rgba(120,53,15,0.08))]" />
        <div className="absolute inset-0 -z-10 opacity-[0.18] [background-image:linear-gradient(90deg,rgba(15,23,42,0.08)_1px,transparent_1px),linear-gradient(rgba(15,23,42,0.08)_1px,transparent_1px)] [background-size:18px_18px]" />

        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="text-sm font-semibold text-slate-900">Adivina quién</div>
          {submitted ? (
            <div className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white">
              Puntos: {score}/{total}
            </div>
          ) : (
            <div className="text-sm text-slate-600">Responde y luego “Calificar”</div>
          )}
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-900/10 bg-white/60 backdrop-blur">
          <div className="grid grid-cols-[1fr,100px,100px,100px] items-center gap-2 border-b border-slate-900/10 bg-white/70 px-3 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
            <div>Pregunta</div>
            <div className="text-center">{brideName}</div>
            <div className="text-center">{groomName}</div>
            <div className="text-center">Ambos</div>
          </div>

          <div className="divide-y divide-slate-900/10">
            {questions.map((q, idx) => {
              const selected = answers[q.id];
              const isCorrect = submitted && selected === q.answer;
              const isWrong = submitted && selected && selected !== q.answer;

              return (
                <div
                  key={q.id}
                  className={cn(
                    'grid grid-cols-[1fr,100px,100px,100px] items-center gap-2 px-3 py-3',
                    idx % 2 === 0 ? 'bg-white/40' : 'bg-white/55'
                  )}
                >
                  <div className="pr-2 text-sm text-slate-900">
                    <span className="mr-2 text-slate-500">{idx + 1}.</span>
                    {q.text}
                    {submitted ? (
                      <span
                        className={cn(
                          'ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold',
                          isCorrect ? 'bg-emerald-600/10 text-emerald-700' : isWrong ? 'bg-rose-600/10 text-rose-700' : 'bg-slate-900/5 text-slate-700'
                        )}
                      >
                        {isCorrect ? '✔' : isWrong ? '✖' : '—'}
                      </span>
                    ) : null}
                  </div>

                  {(['novia', 'novio', 'ambos'] as const).map((opt) => (
                    <div key={opt} className="flex justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          if (submitted) return;
                          setAnswers((prev) => ({ ...prev, [q.id]: opt }));
                        }}
                        className={cn(
                          'h-9 w-9 rounded-full border transition',
                          selected === opt ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-900/20 bg-white/70 text-slate-800 hover:bg-white'
                        )}
                        aria-label={`${q.text} - ${opt}`}
                      >
                        
                      </button>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-slate-600"></div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setAnswers({});
                setSubmitted(false);
              }}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              Reiniciar
            </button>

            <button onClick={() => setSubmitted(true)} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
              Calificar
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}

/** ===================== PAGE ===================== */
export default function WeddingInvitePage() {
  const { brand, couple, dateISO, cover, hero, ceremony, reception, gallery, verse, itinerary, song, polaroids, gifts, rsvp, quiz } =
    WEDDING;

  const [opened, setOpened] = useState(false);

  // Audio
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Countdown (hydration-safe)
  const countdown = useCountdown(dateISO);

  // Avoid locale mismatch for date formatting
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const weddingDatePretty = useMemo(() => {
    if (!mounted) return '';
    const d = new Date(dateISO);
    return d.toLocaleString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  }, [dateISO, mounted]);

  const openInvitation = async () => {
    setOpened(true);

    // Reproduce música DESPUÉS del click (permitido por el navegador)
    const a = audioRef.current;
    if (!a) return;

    try {
      await a.play();
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

  const safeDays = countdown.mounted ? countdown.days : 0;
  const safeHours = countdown.mounted ? countdown.hours : 0;
  const safeMinutes = countdown.mounted ? countdown.minutes : 0;
  const safeSeconds = countdown.mounted ? countdown.seconds : 0;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Audio (invisible) */}
      <audio ref={audioRef} src={cover.songUrl} preload="auto" />

      {/* ===================== PORTADA ===================== */}
      {!opened ? (
        <section className="relative min-h-screen overflow-hidden">
          <div className="absolute inset-0">
            <Image src={cover.coverImage} alt="Portada crucero" fill className="object-cover" priority sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/40 to-slate-950/80" />
          </div>

          <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 py-14">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{brand}</Badge>
              <Badge>Tema Crucero</Badge>
              <Badge>{hero.locationLine}</Badge>
            </div>

            <div className="mt-6 max-w-3xl">
              <div className="text-xs tracking-[0.25em] uppercase text-white/85">{cover.titleTop}</div>
              <h1 className="mt-3 text-4xl font-semibold text-white sm:text-6xl">
                {couple.bride} <span className="text-white/70">&</span> {couple.groom}
              </h1>
              <p className="mt-3 text-base text-white/85 sm:text-lg">{cover.headline}</p>
              <p className="mt-2 max-w-2xl text-sm text-white/75">{cover.subline}</p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  onClick={openInvitation}
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100 active:scale-[0.99]"
                >
                  {cover.openButtonText} 
                </button>

                <div className="text-xs text-white/70"></div>
              </div>

              <div className="mt-10 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                <div className="text-sm font-semibold text-white/90">{countdown.done ? '¡Hoy zarpamos!' : 'Cuenta regresiva para zarpar'}</div>
                <div className="mt-4 grid grid-cols-4 gap-3">
                  <CountdownBlock label="DÍAS" value={safeDays} />
                  <CountdownBlock label="HRS" value={safeHours} />
                  <CountdownBlock label="MIN" value={safeMinutes} />
                  <CountdownBlock label="SEG" value={safeSeconds} />
                </div>
                <div className="mt-4 text-xs text-white/75">{mounted ? `📅 ${weddingDatePretty}` : '📅 Cargando fecha…'}</div>
              </div>
            </div>

            <div className="mt-10 text-xs text-white/60"></div>
          </div>
        </section>
      ) : null}

      {/* ===================== INVITACIÓN ===================== */}
      {opened ? (
        <>
          <section className="relative overflow-hidden">
            <div className="absolute inset-0">
              <Image src={cover.coverImage} alt="Crucero / viajes" fill className="object-cover" priority sizes="100vw" />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/35 to-slate-50" />
            </div>

            <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-10 sm:pb-14 sm:pt-14">
              <div className="flex flex-col gap-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>{brand}</Badge>
                    <Badge>{hero.locationLine}</Badge>
                  </div>

                  <button
                    onClick={toggleAudio}
                    className="rounded-2xl border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-white/15"
                    aria-label="Control música"
                  >
                    {isPlaying ? 'Pausar música ⏸️' : 'Reproducir música ▶️'}
                  </button>
                </div>

                <div className="max-w-3xl">
                  <h2 className="mt-2 text-4xl font-semibold text-white sm:text-6xl">
                    {couple.bride} <span className="text-white/70">&</span> {couple.groom}
                  </h2>
                  <p className="mt-3 max-w-2xl text-base text-white/85 sm:text-lg">{hero.tagline}</p>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <Badge>{mounted ? `📅 ${weddingDatePretty}` : '📅 Cargando…'}</Badge>
                    <Badge>🧳 Dress code: Elegante</Badge>
                    <Badge>🛟 Tema: Crucero</Badge>
                  </div>
                </div>

                <div className="mt-1 w-full max-w-xl">
                  <div className="mb-3 text-sm font-semibold text-white/90">{countdown.done ? '¡Hoy zarpamos!' : 'Cuenta regresiva'}</div>
                  <div className="grid grid-cols-4 gap-3">
                    <CountdownBlock label="DÍAS" value={safeDays} />
                    <CountdownBlock label="HRS" value={safeHours} />
                    <CountdownBlock label="MIN" value={safeMinutes} />
                    <CountdownBlock label="SEG" value={safeSeconds} />
                  </div>
                </div>

                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <a href="#lugares" className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100">
                    Ver ubicación ⛵
                  </a>
                  <a
                    href="#rsvp"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/15"
                  >
                    Confirmar asistencia 💬
                  </a>
                </div>
              </div>
            </div>
          </section>

          <div className="mx-auto max-w-6xl px-4 pb-16">
            {/* Lugares */}
            <section id="lugares" className="-mt-6 scroll-mt-20 sm:-mt-10">
              <SectionTitle kicker="Ubicaciones" title="Ceremonia & Recepción" note="Todo listo para navegar juntos hacia una noche inolvidable." />
              <div className="grid gap-4 md:grid-cols-2">
                <PlaceCard place={WEDDING.ceremony} />
                <PlaceCard place={WEDDING.reception} />
              </div>
            </section>

            {/* Galería + Versículo */}
            <section className="mt-12 grid gap-4 lg:grid-cols-2">
              <div>
                <SectionTitle kicker="Recuerdos" title="Nuestra galería" note="Dos fotos por vista, con flechitas para cambiar." />
                <GalleryTwoPerView images={gallery.images} />
              </div>
              <div className="lg:pt-[52px]">
                <VerseCard reference={verse.reference} text={verse.text} />
              </div>
            </section>

            {/* Itinerario + Canción */}
            <section className="mt-12 grid gap-4 lg:grid-cols-2">
              <div>
                <SectionTitle kicker="Ruta del día" title="Itinerario" note="Un plan clarito para que no te pierdas nada." />
                <Timeline items={itinerary} />
              </div>

              <div>
                <SectionTitle kicker="Música" title="Canción de los novios" note={song.note} />
                <Card className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-lg font-semibold text-slate-900">
                        {song.title} <span className="text-slate-400">—</span> {song.artist}
                      </div>
                      <div className="mt-2 text-sm text-slate-600">La música inició al abrir la invitación. Puedes controlarla arriba.</div>
                    </div>
                    <a href={song.spotifyUrl} target="_blank" rel="noreferrer" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
                      Spotify ↗
                    </a>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <button onClick={toggleAudio} className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">
                      {isPlaying ? 'Pausar ⏸️' : 'Reproducir ▶️'}
                    </button>
                    <button
                      onClick={() => {
                        const a = audioRef.current;
                        if (!a) return;
                        a.currentTime = 0;
                        a.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
                      }}
                      className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                    >
                      Reiniciar 🔁
                    </button>
                  </div>
                </Card>
              </div>
            </section>

            {/* Polaroids */}
            <section className="mt-12">
              <SectionTitle kicker="Familia" title="Padres & Padrinos" note="Con fotos estilo polaroid (premium)." />
              <PolaroidSection groups={polaroids} />
            </section>

            {/* Regalos */}
            <section className="mt-12">
              <SectionTitle kicker="Regalos" title="Lista de regalos" note="Tu presencia es el mejor regalo, pero si deseas obsequiarnos algo, aquí tienes opciones." />
              <Card className="p-5">
                <div className="grid gap-3 sm:grid-cols-3">
                  {gifts.map((g) => (
                    <a key={g.label} href={g.url} target="_blank" rel="noreferrer" className="group rounded-2xl border border-slate-200 bg-white p-4 transition hover:bg-slate-50">
                      <div className="flex items-center justify-between">
                        <div className="text-base font-semibold text-slate-900">{g.label}</div>
                        <div className="text-slate-400 transition group-hover:translate-x-0.5">↗</div>
                      </div>
                      {g.note ? <div className="mt-2 text-sm text-slate-600">{g.note}</div> : null}
                    </a>
                  ))}
                </div>
              </Card>
            </section>

            {/* RSVP */}
            <section id="rsvp" className="mt-12 scroll-mt-20">
              <SectionTitle kicker="RSVP" title="Confirma tu asistencia" note="Con un mensaje listo para enviar por WhatsApp." />
              <RSVP bridePhone={rsvp.bridePhone} groomPhone={rsvp.groomPhone} title={rsvp.title} note={rsvp.note} defaultMessage={rsvp.defaultMessage} />
            </section>

            {/* Quiz */}
            <section id="quiz" className="mt-12 scroll-mt-20">
              <SectionTitle kicker="Juego" title="¿Qué tanto nos conoces?" note="Inspirado en “Adivina quién”, estilo kraft + viajero." />
              <KnowUsQuiz brideName="NOVIA" groomName="NOVIO" cover={quiz.cover} title={quiz.title} subtitle={quiz.subtitle} questions={quiz.questions} />
            </section>

            <footer className="mt-14 rounded-2xl border border-slate-200 bg-white p-6 text-center">
              <div className="text-sm text-slate-600">
                Hecho con ♥ por <span className="font-semibold text-slate-900">{brand}</span> — Tarjetas digitales premium
              </div>
              <div className="mt-2 text-xs text-slate-500">Portada + música + WhatsApp RSVP + polaroids = invitación “shareable”.</div>
            </footer>
          </div>
        </>
      ) : null}
    </main>
  );
}