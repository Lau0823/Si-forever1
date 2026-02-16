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

  // 🔹 QR dinámicos
  const nequiQR = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Nequi%20${cleanPhone}`;
  const daviplataQR = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Daviplata%20${cleanPhone}`;

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-6 py-20 relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 w-full max-w-md rounded-[32px]
        bg-white/95 backdrop-blur-xl
        shadow-[0_30px_100px_rgba(0,0,0,0.6)]
        overflow-hidden"
      >
        {/* Imagen negocio */}
        <div
          className="h-52 bg-cover bg-center"
          style={{ backgroundImage: `url(${businessImage})` }}
        />

        <div className="relative px-8 pb-10 pt-20 text-black">
          {/* Perfil */}
          <div className="absolute -top-12 left-8">
            <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
              <img
                src={profileImage}
                alt="Perfil"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <h2 className="text-2xl font-bold">{businessName}</h2>

          <p className="mt-3 text-sm text-gray-800">
            {description}
          </p>

          <div className="mt-4 bg-green-700 rounded-xl py-2 text-center">
            <p className="text-white font-semibold">
              🚚 Servicio a domicilio disponible
            </p>
          </div>

          {/* Pedido */}
          <div className="mt-6">
            <label className="block font-semibold mb-2">
              Escribe tu pedido:
            </label>

            <textarea
              value={pedido}
              onChange={(e) => setPedido(e.target.value)}
              placeholder="Ej: 2kg papa, 1kg tomate, 6 bananos..."
              className="w-full h-28 p-4 rounded-xl
                bg-gray-100
                border border-gray-300
                text-black placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-yellow-400
                resize-none"
            />
          </div>

          <button
            onClick={handleEnviar}
            disabled={isDisabled}
            className={`mt-6 w-full rounded-full px-6 py-3 text-sm font-semibold
              transition duration-300
              ${
                isDisabled
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-yellow-400 text-black hover:bg-yellow-300"
              }`}
          >
            Enviar Pedido por WhatsApp 📲
          </button>

          {/* Pagos con QR */}
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4 text-center">
              Métodos de Pago
            </h3>

            <div className="flex justify-center gap-8">
              <div className="text-center">
                <img
                  src={nequiQR}
                  alt="QR Nequi"
                  className="w-28 h-28 mx-auto"
                />
                <p className="text-sm mt-2 font-semibold">Nequi</p>
              </div>

              <div className="text-center">
                <img
                  src={daviplataQR}
                  alt="QR Daviplata"
                  className="w-28 h-28 mx-auto"
                />
                <p className="text-sm mt-2 font-semibold">Daviplata</p>
              </div>
            </div>

            <p className="text-center mt-6 font-bold text-green-800">
              📞 {phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
