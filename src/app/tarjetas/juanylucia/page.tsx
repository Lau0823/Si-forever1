"use client";

import { useEffect, useState } from "react";

type Plan = {
  title: string;
  subtitle: string;
  price: string;
  oldPrice: string;
  items: string[];
  featured?: boolean;
  extraNote?: string;
};

type Heart = {
  id: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
};

export default function Page() {
  const plans: Plan[] = [
    {
      title: "Básico",
      subtitle: "(Aura)",
      price: "$129.900",
      oldPrice: "$179.900",
      extraNote: "Agregar canción personalizada por $30.000 adicionales",
      items: [
        "Banner con foto y nombre de los novios",
        "Fecha de la boda",
        "Tablero cuenta regresiva interactivo",
        "Itinerario",
        "Lugar de la boda",
        "Confirmación con botón WhatsApp",
        "Código de vestuario",
        "Lista de regalos",
      ],
    },
    {
      title: "Intermedio",
      subtitle: "Más elegido",
      price: "$249.900",
      oldPrice: "$329.900",
      featured: true,
      items: [
        "Todo lo del plan Básico",
        "Canción sugerida para el día de la boda",
        "Lluvia de animación (corazones, pétalos, arroz, confeti)",
        "Botón abrir invitación + canción",
        "Mini galería historia o padres y padrinos",
        "Versículo especial",
      ],
    },
    {
      title: "Premium",
      subtitle: "Experiencia completa",
      price: "$349.900",
      oldPrice: "$449.900",
      items: [
        "Todo lo del plan Intermedio",
        "Galería completa nuestra historia",
        "Galería fotos padres, padrinos y damas + dedicatoria",
        "Versículo + frase personalizada",
        "Juego interactivo acerca de la pareja",
      ],
    },
  ];

  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const generateHearts = () =>
      Array.from({ length: 28 }).map((_, i) => ({
        id: `${i}-${Math.random()}`,
        left: Math.random() * 100,
        size: 12 + Math.random() * 20,
        duration: 6 + Math.random() * 7,
        delay: Math.random() * 4,
        opacity: 0.25 + Math.random() * 0.5,
      }));

    setHearts(generateHearts());
    const interval = setInterval(() => setHearts(generateHearts()), 9000);
    return () => clearInterval(interval);
  }, []);

  const openWhatsApp = (planTitle: string) => {
    const message = `Hola, quiero cotizar el plan ${planTitle} 💍`;
    const url = `https://wa.me/573102345742?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-100 px-6 py-24">
      <style jsx global>{`
        @keyframes heartfall {
          0% { transform: translateY(-40px) rotate(0deg); }
          100% { transform: translateY(120vh) rotate(18deg); }
        }
        .heart {
          position: absolute;
          top: -40px;
          animation-name: heartfall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>

      {/* Lluvia de corazones */}
      <div className="pointer-events-none absolute inset-0">
        {hearts.map((h) => (
          <span
            key={h.id}
            className="heart text-red-700"
            style={{
              left: `${h.left}%`,
              fontSize: `${h.size}px`,
              animationDuration: `${h.duration}s`,
              animationDelay: `${h.delay}s`,
              opacity: h.opacity,
            }}
          >
            ♥
          </span>
        ))}
      </div>

      <header className="relative z-10 text-center mb-14">
        <h1 className="text-4xl font-semibold text-neutral-900">
          Elige tu plan
        </h1>
        <p className="mt-3 text-sm text-neutral-600">
          Promoción especial por tiempo limitado 💍
        </p>
      </header>

      <section className="relative z-10 mx-auto grid max-w-6xl gap-7 md:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.title}
            className={`relative rounded-3xl p-7 transition hover:-translate-y-2 ${
              plan.featured
                ? "shadow-2xl"
                : "shadow-xl border border-white/50"
            }`}
          >
            {plan.featured ? (
              <>
                <div className="absolute inset-0 rounded-3xl bg-[#7a0f1c]" />
              </>
            ) : (
              <>
                <div className="absolute inset-0 rounded-3xl bg-white/40 backdrop-blur-xl" />
                <div className="absolute inset-0 rounded-3xl ring-1 ring-white/60" />
              </>
            )}

            <div className="relative z-10">
              {plan.featured && (
                <div className="mb-4 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                  Más elegido
                </div>
              )}

              <h3
                className={`text-2xl font-semibold ${
                  plan.featured ? "text-white" : "text-red-800"
                }`}
              >
                {plan.title}{" "}
                <span className="text-sm opacity-80">
                  {plan.subtitle}
                </span>
              </h3>

              {/* Precio con rebaja */}
              <div className="mt-4">
                <p
                  className={`text-sm line-through ${
                    plan.featured ? "text-white/70" : "text-red-600"
                  }`}
                >
                  {plan.oldPrice}
                </p>
                <p
                  className={`text-3xl font-bold ${
                    plan.featured ? "text-white" : "text-red-700"
                  }`}
                >
                  {plan.price}
                </p>
              </div>

              {/* Lista */}
              <ul
                className={`mt-6 space-y-3 text-sm ${
                  plan.featured ? "text-white/90" : "text-red-900/80"
                }`}
              >
                {plan.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span
                      className={`mt-2 h-1.5 w-1.5 rounded-full ${
                        plan.featured ? "bg-white" : "bg-red-700"
                      }`}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Nota extra básico */}
              {plan.extraNote && (
                <p className="mt-4 text-xs text-red-600 font-medium">
                  {plan.extraNote}
                </p>
              )}

              <button
                onClick={() => openWhatsApp(plan.title)}
                className={`mt-7 w-full rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  plan.featured
                    ? "bg-white text-[#7a0f1c] hover:bg-white/95"
                    : "bg-red-700 text-white hover:bg-red-800"
                }`}
              >
                Cotizar
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}