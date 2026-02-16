"use client";

import { useState } from "react";

interface FruverCardProps {
  backgroundImage: string;
  businessImage: string;
  profileImage: string;
  businessName: string;
  description: string;
  phone?: string;
}

export default function Page() {
  return (
    <FruverCard
      backgroundImage="https://i.pinimg.com/1200x/9f/7e/ef/9f7eefab25a3dd80034aa5e74c1bcf03.jpg"
      businessImage="https://i.pinimg.com/1200x/d0/e7/1a/d0e71adbddf79e1e39044d7770fec6a3.jpg"
      profileImage="https://i.pinimg.com/1200x/2a/40/6c/2a406c739ede8af504861b61c141afa8.jpg"
      businessName="Fruver La Huerta 🍓"
      description="Frutas y verduras frescas todos los días. Calidad premium y entregas rápidas."
      phone="+57 310 2345742"
    />
  );
}

function FruverCard({
  backgroundImage,
  businessImage,
  profileImage,
  businessName,
  description,
  phone,
}: FruverCardProps) {
  const [pedido, setPedido] = useState("");

  const cleanPhone = phone ? phone.replace(/\D/g, "") : "";

  const handleEnviar = () => {
    if (!pedido.trim() || !cleanPhone) return;

    const mensaje = `Hola 🍓 *${businessName}*\n\nQuiero hacer el siguiente pedido:\n\n${pedido}\n\n🚚 Servicio a domicilio`;

    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
      mensaje
    )}`;

    window.open(url, "_blank");
  };

  const isDisabled = !pedido.trim();

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-6 py-20 relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* CARD */}
      <div
        className="relative z-10 w-full max-w-md rounded-[32px]
        bg-white/20 backdrop-blur-xl
        border border-white/30
        shadow-[0_30px_100px_rgba(0,0,0,0.6)]
        overflow-hidden"
      >
        {/* Business Image */}
        <div
          className="h-52 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${businessImage})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative px-8 pb-10 pt-20 text-white">
          {/* Profile */}
          <div className="absolute -top-12 left-8">
            <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-white/40 shadow-lg">
              <img
                src={profileImage}
                alt="Perfil"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Name */}
          <h2 className="text-2xl font-semibold tracking-tight">
            {businessName}
          </h2>

          {/* Description */}
          <p className="mt-3 text-sm text-white/90 leading-relaxed">
            {description}
          </p>

          {/* Servicio */}
          <div className="mt-4 bg-white/20 backdrop-blur-md rounded-xl py-2 text-center border border-white/30">
            <p className="text-white font-medium">
              🚚 Servicio a domicilio disponible
            </p>
          </div>

          {/* Pedido */}
          <div className="mt-6">
            <label className="block text-white font-medium mb-2">
              Escribe tu pedido:
            </label>

            <textarea
              value={pedido}
              onChange={(e) => setPedido(e.target.value)}
              placeholder="Ej: 2kg papa, 1kg tomate, 6 bananos..."
              className="w-full h-28 p-4 rounded-xl
                bg-white/20 backdrop-blur-md
                border border-white/30
                text-white placeholder-white/70
                focus:outline-none focus:ring-2 focus:ring-yellow-400
                resize-none"
            />
          </div>

          {/* WhatsApp Button */}
          <button
            onClick={handleEnviar}
            disabled={isDisabled}
            className={`mt-6 w-full rounded-full px-6 py-3 text-sm font-semibold
              transition duration-300
              ${
                isDisabled
                  ? "bg-white/20 text-white/60 cursor-not-allowed"
                  : "bg-yellow-400 text-black hover:bg-yellow-300"
              }`}
          >
            Enviar Pedido por WhatsApp 📲
          </button>
        </div>
      </div>
    </div>
  );
}
