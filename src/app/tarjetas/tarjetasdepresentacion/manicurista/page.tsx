"use client";

import { useState } from "react";

interface ManicuristaCardProps {
  backgroundImage: string;
  businessImage: string;
  profileImage: string;
  businessName: string;
  description: string;
  phone?: string;
  nequiQr: string;
  daviQr: string;
}

export default function Page() {
  return (
    <ManicuristaCard
      backgroundImage="https://i.pinimg.com/736x/68/b0/b7/68b0b7f098d216fb295305534c85f1e0.jpg"
      businessImage="https://i.pinimg.com/736x/68/b0/b7/68b0b7f098d216fb295305534c85f1e0.jpg"
      profileImage="https://i.pinimg.com/1200x/0a/78/44/0a7844550d3f068d696ea713f516c736.jpg"
      businessName="Juliana Garcia"
      description="Uñas acrílicas, semipermanente, diseños artísticos y pedicure spa con estilo."
      phone="+57 3222507820"
      nequiQr="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=nequi-3101234567"
      daviQr="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=davi-3101234567"
    />
  );
}

function ManicuristaCard({
  backgroundImage,
  businessImage,
  profileImage,
  businessName,
  description,
  phone,
  nequiQr,
  daviQr,
}: ManicuristaCardProps) {
  const services = [
    "Uñas acrílicas",
    "Semipermanente",
    "Press On Personalizadas",
    "Pedicure Spa",
    "Diseños Artísticos",
  ];

  const [selectedService, setSelectedService] = useState(services[0]);

  // WhatsApp URL armada
  const cleanPhone = phone ? phone.replace(/\D/g, "") : "";
  const message = `Hola 💖 quiero reservar: ${selectedService}`;
  const whatsappUrl = cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
    : "#";

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-16"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay suave pastel */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200/60 to-rose-200/60 backdrop-blur-sm" />

      <div
        className="relative z-10 w-full max-w-md 
        bg-white/30 backdrop-blur-2xl border border-white/40 
        rounded-3xl shadow-lg"
      >
        {/* Header / Imagen del negocio */}
        <div
          className="h-52 bg-cover bg-center relative rounded-t-3xl"
          style={{ backgroundImage: `url(${businessImage})` }}
        >
          <div className="absolute inset-0 bg-white/30" />
        </div>

        <div className="relative px-6 pb-8 pt-20">

          {/* Perfil redondo */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-pink-300 shadow-xl">
              <img
                src={profileImage}
                alt="Perfil"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Nombre */}
          <h2 className="text-center text-2xl font-semibold text-black">
            {businessName}
          </h2>

          <p className="mt-2 text-center text-sm text-black leading-relaxed">
            {description}
          </p>

          {/* Lista de servicios */}
          <div className="mt-6 space-y-3">
            {services.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedService(s)}
                className={`w-full text-left px-4 py-3 rounded-xl border
                  transition
                  ${
                    selectedService === s
                      ? "bg-rose-300 text-black border-rose-300"
                      : "bg-white/30 text-black border-white/40 hover:bg-rose-200/70 hover:border-rose-200"
                  }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Botón WhatsApp */}
          {cleanPhone && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 block text-center rounded-full px-6 py-3 text-sm font-semibold
                bg-pink-400 text-white hover:bg-pink-300 transition"
            >
              Reservar por WhatsApp
            </a>
          )}

          {/* Pagos */}
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-white text-center mb-4">
              Métodos de pago
            </h3>

            <div className="grid grid-cols-2 gap-4 px-4">

              {/* Nequi */}
              <div
                className="bg-white/40 backdrop-blur-lg border border-white/50 
                rounded-2xl p-3 text-center shadow-md"
              >
                <p className="text-xs font-medium text-white/90 mb-2">
                  Nequi
                </p>
                <div className="bg-white/30 backdrop-blur-md rounded-lg p-2">
                  <img
                    src={nequiQr}
                    alt="QR Nequi"
                    className="w-20 h-20 mx-auto"
                  />
                </div>
                <p className="mt-2 text-sm text-white/90 font-medium">
                  {phone}
                </p>
              </div>

              {/* Daviplata */}
              <div
                className="bg-white/40 backdrop-blur-lg border border-white/50 
                rounded-2xl p-3 text-center shadow-md"
              >
                <p className="text-xs font-medium text-white/90 mb-2">
                  Daviplata
                </p>
                <div className="bg-white/30 backdrop-blur-md rounded-lg p-2">
                  <img
                    src={daviQr}
                    alt="QR Daviplata"
                    className="w-20 h-20 mx-auto"
                  />
                </div>
                <p className="mt-2 text-sm text-white/90 font-medium">
                  {phone}
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
