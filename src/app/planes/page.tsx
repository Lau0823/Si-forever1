"use client";

import { useEffect, useState } from "react";

type Plan = {
  name: string;
  features: string[];
  featured?: boolean;
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
      name: "Plan Aura",
      features: [
        "Diseño digital premium",
        "Mapa ceremonia y recepción",
        "Dress code sugerido",
        "Cuenta regresiva",
        "Itinerario",
        "Link de regalos",
        "RSVP por WhatsApp",
      ],
    },
    {
      name: "Plan Romance",
      featured: true,
      features: [
        "Todo lo del Plan Aura",
        "Canción personalizada",
        "Banner protagonista",
        "Formulario sugerir canciones",
        "Confirmación automatizada",
        "Diseño editorial elegante",
      ],
    },
    {
      name: "Plan Grand Love",
      features: [
        "Todo lo del Plan Romance",
        "Diseño 100% exclusivo",
        "Animaciones avanzadas",
        "Base de datos RSVP descargable",
        "Soporte prioritario",
        "Ajustes ilimitados",
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

  const openWhatsApp = (plan: string) => {
    const message = `Hola, quiero cotizar el ${plan} 💍`;
    const url = `https://wa.me/573102345742?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <main className="relative min-h-screen bg-neutral-100 overflow-hidden px-6 py-24">
      {/* Animaciones */}
      <style jsx global>{`
        @keyframes heartfall {
          0% {
            transform: translateY(-40px) rotate(0deg);
          }
          100% {
            transform: translateY(120vh) rotate(15deg);
          }
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

      {/* Header */}
      <div className="text-center mb-16 relative z-10">
        <h1 className="text-4xl font-semibold text-gray-900">
          Elige tu experiencia
        </h1>
        <p className="text-gray-600 mt-3">
          Invitaciones digitales premium para bodas inolvidables
        </p>
      </div>

      {/* Cards */}
      <div className="relative z-10 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-3xl p-8 transition duration-300 hover:-translate-y-2 ${
              plan.featured
                ? "text-white shadow-2xl"
                : "bg-white/40 backdrop-blur-xl border border-white/50 shadow-xl text-red-800"
            }`}
            style={
              plan.featured
                ? {
                    backgroundImage:
                      "url('https://i.pinimg.com/736x/db/1b/b3/db1bb39ce65e36e3068a300cffac44b3.jpg')", // ← AQUÍ PONES TU IMAGEN
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : {}
            }
          >
            {/* Overlay rojo oscuro elegante */}
            {plan.featured && (
              <div className="absolute inset-0 bg-[#7a0f1c]/90 rounded-3xl"></div>
            )}

            <div className="relative z-10">
              {plan.featured && (
                <div className="mb-4 text-xs bg-white/20 px-3 py-1 rounded-full inline-block">
                  Más elegido
                </div>
              )}

              <h3 className="text-2xl font-semibold mb-6">
                {plan.name}
              </h3>

              <ul className="space-y-3 mb-8 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>

              <button
                onClick={() => openWhatsApp(plan.name)}
                className={`w-full py-3 rounded-xl font-semibold transition ${
                  plan.featured
                    ? "bg-white text-[#7a0f1c] hover:bg-gray-100"
                    : "bg-red-700 text-white hover:bg-red-800"
                }`}
              >
                Cotizar
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}