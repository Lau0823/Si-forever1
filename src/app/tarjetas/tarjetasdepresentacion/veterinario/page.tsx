"use client";

import { useState } from "react";

interface VeterinarioCardProps {
  backgroundImage: string;
  businessImage: string;
  profileImage: string;
  businessName: string;
  description: string;
  phone?: string;
  nequiNumber: string;
  daviNumber: string;
  nequiQr: string;
  daviQr: string;
}

export default function Page() {
  return (
    <VeterinarioCard
      backgroundImage="https://i.pinimg.com/736x/47/9c/11/479c11d9c0d810a2d285ed6ae0ea6a9b.jpg"
      businessImage="https://i.pinimg.com/736x/9d/da/71/9dda713c78bac9fbe59fc38cb7316663.jpg"
      profileImage="https://i.pinimg.com/1200x/3b/54/68/3b5468f44adc6f9dd6abf34b8cdf0652.jpg"
      businessName=" Centro medico Veterinario "
      description="Servicios veterinarios profesionales ."
      phone="+57 310 234 5742"
      nequiNumber="3102345742"
      daviNumber="3102345742"
      nequiQr="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=nequi-3102345742"
      daviQr="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=davi-3102345742"
    />
  );
}

function VeterinarioCard({
  backgroundImage,
  businessImage,
  profileImage,
  businessName,
  description,
  phone,
  nequiNumber,
  daviNumber,
  nequiQr,
  daviQr,
}: VeterinarioCardProps) {
  const services = [
    "Vacunación",
    "Desparasitación",
    "Peluquería",
    "Consulta general",
    "Cirugía programada",
  ];

  const [selectedService, setSelectedService] = useState(services[0]);

  const cleanPhone = phone ? phone.replace(/\D/g, "") : "";

  const whatsappMessage = `Hola, quiero reservar el servicio de ${selectedService}.`;
  const whatsappLink = cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
        whatsappMessage
      )}`
    : "#";

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-16 relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black/70" />

      <div
        className="relative z-10 w-full max-w-md md:max-w-lg 
        bg-white/10 backdrop-blur-3xl 
        border border-white/20
        rounded-[32px] 
        shadow-[0_20px_60px_rgba(0,0,0,0.5)] 
        overflow-hidden text-white"
      >
        {/* Imagen negocio */}
        <div
          className="h-52 md:h-64 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${businessImage})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative px-6 md:px-8 pb-10 pt-20">

          {/* Foto perfil */}
          <div className="absolute -top-12 left-6 md:left-8">
            <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-yellow-400 shadow-lg">
              <img
                src={profileImage}
                alt="Perfil"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <h2 className="text-2xl font-semibold">
            {businessName}
          </h2>

          <p className="mt-3 text-sm text-white/80 leading-relaxed">
            {description}
          </p>

          {phone && (
            <p className="mt-4 text-sm font-medium">
              📞 {phone}
            </p>
          )}

          {/* SERVICIOS */}
          <div className="mt-6 space-y-3">
            <p className="text-sm font-semibold text-yellow-400">
              ¿Qué servicio deseas reservar?
            </p>

            {services.map((service) => (
              <button
                key={service}
                onClick={() => setSelectedService(service)}
                className={`w-full text-left px-4 py-3 rounded-xl transition 
                backdrop-blur-md border
                ${
                  selectedService === service
                    ? "bg-yellow-400 text-black border-yellow-400"
                    : "bg-white/10 text-white border-white/20 hover:bg-yellow-400 hover:text-black hover:border-yellow-400"
                }`}
              >
                {service}
              </button>
            ))}
          </div>

          {/* BOTÓN RESERVA */}
          {cleanPhone && (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="mt-6 w-full inline-flex items-center justify-center 
              rounded-full px-6 py-3 text-sm font-semibold
              bg-yellow-400 text-black
              hover:bg-yellow-300
              transition duration-300 shadow-lg"
            >
              Reservar por WhatsApp
            </a>
          )}

          {/* PAGOS */}
          <div className="mt-10">
            <h3 className="text-sm font-semibold text-yellow-400 mb-4">
              Métodos de pago
            </h3>

            <div className="grid grid-cols-2 gap-4">

              {/* NEQUI */}
              <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-4 text-center shadow-md hover:border-yellow-400 transition">
                <p className="text-xs font-semibold mb-3">
                  Nequi
                </p>
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-3">
                  <img
                    src={nequiQr}
                    alt="QR Nequi"
                    className="w-24 h-24 mx-auto"
                  />
                </div>
                <p className="mt-3 text-sm font-medium">
                  {nequiNumber}
                </p>
              </div>

              {/* DAVIPLATA */}
              <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-4 text-center shadow-md hover:border-yellow-400 transition">
                <p className="text-xs font-semibold mb-3">
                  Daviplata
                </p>
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-3">
                  <img
                    src={daviQr}
                    alt="QR Daviplata"
                    className="w-24 h-24 mx-auto"
                  />
                </div>
                <p className="mt-3 text-sm font-medium">
                  {daviNumber}
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
