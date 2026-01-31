import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-black">
      <TopBar title="Cristiana" />

      <Hero
        image="https://i.pinimg.com/736x/a2/09/de/a209def8fcdd702e0fcbed3b5dec9d51.jpg"
        kicker="Invitación editorial"
        title="Cristiana"
        subtitle="Nos casamos"
      />

      <Body
        names="Cristiana & Su Prometido"
        date="12 · Oct · 2026"
        time="5:00 PM"
        place="Lugar por definir"
        city="Bogotá, CO"
      />
    </main>
  );
}

function TopBar({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-black/10 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          ← Home
        </Link>
        <div className="text-sm font-semibold tracking-tight">{title}</div>
        <Link
          href="/#catalogo"
          className="text-sm font-semibold text-black/70 hover:text-black"
        >
          Catálogo
        </Link>
      </div>
    </header>
  );
}

function Hero({
  image,
  kicker,
  title,
  subtitle,
}: {
  image: string;
  kicker: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section className="relative h-[72vh] w-full overflow-hidden">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-end px-6 pb-12 text-white">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/80">
            {kicker}
          </p>
          <h1 className="mt-3 text-4xl font-light leading-tight sm:text-6xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-white/85 sm:text-base">{subtitle}</p>
        </div>
      </div>
    </section>
  );
}

function Body({
  names,
  date,
  time,
  place,
  city,
}: {
  names: string;
  date: string;
  time: string;
  place: string;
  city: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <div className="grid gap-5 md:grid-cols-3">
        <InfoCard label="Los novios" value={names} />
        <InfoCard label="Fecha" value={date} />
        <InfoCard label="Hora" value={time} />
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <Block
          title="Ceremonia & Recepción"
          desc={`${place} · ${city}`}
        />
        <Block
          title="Dress code"
          desc="Formal / Black tie (editable)"
        />
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <a
          href="#"
          className="inline-flex items-center justify-center rounded-full bg-black px-7 py-3 text-sm font-semibold text-white hover:opacity-90"
        >
          Confirmar asistencia
        </a>
        <a
          href="#"
          className="inline-flex items-center justify-center rounded-full border border-black/15 px-7 py-3 text-sm font-semibold text-black/80 hover:bg-black/5"
        >
          Ver ubicación
        </a>
      </div>

      <footer className="mt-14 border-t border-black/10 pt-8 text-center text-xs text-black/45">
        © {new Date().getFullYear()} Sí, Forever
      </footer>
    </section>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
      <p className="text-xs uppercase tracking-[0.3em] text-black/50">
        {label}
      </p>
      <p className="mt-3 text-lg font-semibold">{value}</p>
    </div>
  );
}

function Block({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-black/60">{desc}</p>
      <div className="mt-6 h-[180px] rounded-2xl border border-black/10 bg-black/[0.03]" />
    </div>
  );
}
