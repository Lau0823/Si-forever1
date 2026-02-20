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
      extraNote: "Si desean agregar canción personalizada tiene un valor adicional de $30.000",
      items: [
        "Banner con foto y nombre de los novios",
        "FECHA DE LA BODA",
        "TABLERO cuenta regresiva / días, horas, minutos y segundos (interactivo)",
        "Itinerario",
        "Lugar de la boda (Google maps)",
        "Confirmación de asistencia con botón de WhatsApp",
        "Código de vestuario",
        "Lista de regalos",
        "Canción sugerida PARA EL DÍA DE LA BODA",
      ],
    },
    {
      title: "Intermedio",
      subtitle: "Más elegido",
      price: "$249.900",
      oldPrice: "$329.900",
      featured: true,
      items: [
        "TABLERO cuenta regresiva / días, horas, minutos y segundos (interactivo)",
        "Itinerario",
        "Lugar de la boda (Google maps)",
        "Confirmación de asistencia con botón de WhatsApp",
        "Código de vestuario",
        "Lista de regalos",
        "Canción sugerida PARA EL DÍA DE LA BODA",
        "Lluvia de animación (corazones, pétalos, arroz, confeti)",
        "Botón abrir invitación + canción mientras se visualiza la tarjeta",
        "Mini galería de nuestra historia o padres y padrinos",
        "+ Versículo",
      ],
    },
    {
      title: "Premium",
      subtitle: "Experiencia completa",
      price: "$349.900",
      oldPrice: "$449.900",
      items: [
        "TABLERO cuenta regresiva / días, horas, minutos y segundos (interactivo)",
        "Itinerario",
        "Lugar de la boda (Google maps)",
        "Confirmación de asistencia con botón de WhatsApp",
        "Código de vestuario",
        "Lista de regalos",
        "Canción sugerida PARA EL DÍA DE LA BODA",
        "Lluvia de animación (corazones, pétalos, arroz, confeti)",
        "Botón abrir invitación + canción mientras se visualiza la tarjeta",
        "Galería de nuestra historia",
        "Galería fotos padres, padrinos y damas + dedicatoria",
        "+ Versículo + frase",
        "Juego interactivo acerca de la pareja",
      ],
    },
  ];

  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const generateHearts = () =>
      Array.from({ length: 25 }).map((_, i) => ({
        id: `${i}-${Math.random()}`,
        left: Math.random() * 100,
        size: 12 + Math.random() * 18,
        duration: 6 + Math.random() * 6,
        delay: Math.random() * 4,
        opacity: 0.3 + Math.random() * 0.4,
      }));

    setHearts(generateHearts());
    const interval = setInterval(() => {
      setHearts(generateHearts());
    }, 9000);

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
    <main className="relative min-h-screen bg-neutral-100 overflow-hidden px-6 py-24">
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
      <div className="absolute inset-0 pointer-events-none">
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

      <section className="relative z-10 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.title}
            className={`relative rounded-3xl p-8 transition hover:-translate-y-2 ${
              plan.featured
                ? "bg-[#7a0f1c] text-white shadow-2xl scale-105"
                : "bg-white/40 backdrop-blur-xl border border-white/50 text-red-800 shadow-xl"
            }`}
          >
            {plan.featured && (
              <div className="mb-4 text-xs bg-white/20 px-3 py-1 rounded-full inline-block">
                Más elegido
              </div>
            )}

            <h3 className="text-2xl font-semibold mb-2">
              {plan.title}{" "}
              <span className="text-sm opacity-80">
                {plan.subtitle}
              </span>
            </h3>

            {/* Precio con rebaja */}
            <p className="text-sm line-through opacity-70">
              {plan.oldPrice}
            </p>
            <p className="text-3xl font-bold mb-6">
              {plan.price}
            </p>

            <ul className="space-y-3 text-sm mb-6">
              {plan.items.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>

            {plan.extraNote && (
              <p className="text-xs font-medium mb-4">
                {plan.extraNote}
              </p>
            )}

            <button
              onClick={() => openWhatsApp(plan.title)}
              className={`w-full py-3 rounded-xl font-semibold transition ${
                plan.featured
                  ? "bg-white text-[#7a0f1c] hover:bg-gray-100"
                  : "bg-red-700 text-white hover:bg-red-800"
              }`}
            >
              Cotizar
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}