// app/planes/page.tsx
import Image from "next/image";
import Link from "next/link";

function Bullet() {
  return (
    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/70 shrink-0" />
  );
}

function PlanCard({
  title,
  subtitle,
  price,
  oldPrice,
  features,
  highlight,
  href,
}: {
  title: string;
  subtitle: string;
  price: string;
  oldPrice?: string;
  features: string[];
  highlight?: boolean;
  href: string;
}) {
  return (
    <div className="relative group z-20">
      {/* Glow cálido sutil */}
      <div className="pointer-events-none absolute -inset-1 rounded-[32px] bg-white/10 blur-2xl opacity-30 transition group-hover:opacity-60" />

      <div
        className={[
          "relative rounded-[32px] border border-white/12 bg-white/10 p-8 backdrop-blur-2xl",
          "shadow-[0_30px_90px_-60px_rgba(0,0,0,0.9)]",
          "transition duration-300 group-hover:-translate-y-2 group-hover:bg-white/14",
          highlight ? "ring-1 ring-white/25" : "",
        ].join(" ")}
      >
        {highlight && (
          <div className="absolute -top-4 left-8 rounded-full bg-white px-4 py-1 text-xs font-medium text-black">
            Recomendado
          </div>
        )}

        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-2 text-sm text-white/75">{subtitle}</p>

        <div className="mt-6">
          {oldPrice ? (
            <p className="text-sm text-white/50 line-through">
              Antes {oldPrice}
            </p>
          ) : (
            <p className="text-sm text-white/50">&nbsp;</p>
          )}

          <p className="mt-1 text-3xl font-semibold">{price}</p>

          <span className="inline-block mt-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80">
            HOY
          </span>
        </div>

        <div className="mt-8 h-px w-full bg-white/12" />

        <ul className="mt-6 space-y-3 text-sm text-white/85">
          {features.map((item, idx) => (
            <li key={`${title}-${idx}`} className="flex items-start gap-3">
              <Bullet />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <Link
          href={href}
          className={[
            "mt-10 block w-full rounded-full py-3 text-center text-sm font-medium transition",
            highlight
              ? "bg-white text-black hover:bg-white/90"
              : "border border-white/20 bg-white/10 hover:bg-white/18",
          ].join(" ")}
        >
          Elegir plan
        </Link>
      </div>
    </div>
  );
}

export default function PlanesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      {/* 🖼 BG image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://i.pinimg.com/736x/4e/1b/ac/4e1bac6e5654a5f192c97d1a9049cec8.jpg"
          alt="Fondo Si Forever"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* 🌑 Overlay oscuro (pero suave) */}
      <div className="absolute inset-0 z-[1] bg-black/55" />

      {/* 🥂 Tinte romántico champagne */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-[#f6e7d2]/10 via-transparent to-[#f6e7d2]/8" />

      {/* ✨ Glow decorativo cálido */}
      <div className="pointer-events-none absolute inset-0 z-[3]">
        <div className="absolute -top-44 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[#f6e7d2]/10 blur-3xl" />
        <div className="absolute -bottom-44 right-[-160px] h-[560px] w-[560px] rounded-full bg-[#f6e7d2]/10 blur-3xl" />
      </div>

      {/* ✅ Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        {/* Back */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/85 backdrop-blur hover:bg-white/18 transition"
          >
            ← Volver al inicio
          </Link>
        </div>

        {/* Header */}
        <header className="mx-auto max-w-2xl text-center">
          <span className="text-xs tracking-widest text-white/70">
            SI, FOREVER
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight">
            Elige tu plan ideal
          </h1>
          <p className="mt-4 text-sm text-white/75">
            Invitaciones digitales elegantes y personalizadas para tu boda.
          </p>
        </header>

        {/* Cards */}
        <section className="mt-16 grid gap-10 md:grid-cols-3">
          <PlanCard
            title="Plan Premium"
            subtitle="La experiencia más completa y personalizada"
            oldPrice="$499.900"
            price="$349.900"
            highlight
            href="/planes/premium"
            features={[

              "Portada video carrusel",
              "Cuenta regresiva",
              "Cancion de Los Novios",
              "Lista de canciones",
               "Animaciones",
              "Nombre de los invitados (cada invitación personalizada)",
              "Mensajes y frases",
              "Itinerario",
              "Link de ubicación (evento, mapa)",
              "Dress Code",
              "Lista de regalos",
            
              "Sección compartir fotos",
              "Confirmación de asistencia personalizada con base datos y dashboard",
            ]}
          />

          <PlanCard
            title="Plan Oro"
            subtitle="Equilibrio perfecto entre diseño y precio"
            oldPrice="$360.000"
            price="$249.900"
            href="/planes/oro"
            features={[


              "Portada",
              "Cuenta regresiva",
              "Animaciones",
              "Cancion de Los Novios",
              "Lista de canciones",
              "Mensajes y frases",
              "Itinerario",
              "Link de ubicación (evento)",
              "Sección compartir fotos",
              "Dress Code",
              "Lista de regalos",
              "Confirmación de asistencia (WhatsApp)",
            ]}
          />

          <PlanCard
            title="Plan Básico"
            subtitle="Lo esencial para una invitación elegante"
            price="$129.900"
            href="/planes/basico"
            features={[
              "Portada carrusel",
              "cancion de los novios",
              "Mensajes y frases",
              "Cuenta regresiva",
              "Link de ubicación (evento)",
              "Galería con 4 fotos",
              "Dress Code",
              "Lista de regalos",
              "Confirmación de asistencia (WhatsApp)",
            ]}
          />
        </section>

        <footer className="mt-12 text-center text-xs text-white/60">
          · Si Forever
        </footer>
      </div>
    </main>
  );
}
