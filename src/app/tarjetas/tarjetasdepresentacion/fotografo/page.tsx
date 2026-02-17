"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
  return (
    <PhotographerCard
      backgroundImage="https://i.pinimg.com/736x/b9/fb/4e/b9fb4e70ca132d974e9a4717e77f8b68.jpg"
      profileImage="/i.png"
      name="Juan Felipe Morales"
      phone="3173159272"
      instagram="juanmoralesfotografo"
    />
  );
}

interface PhotographerCardProps {
  backgroundImage: string;
  profileImage: string;
  name: string;
  phone: string;
  instagram: string;
}

function PhotographerCard({
  backgroundImage,
  profileImage,
  name,
  phone,
  instagram,
}: PhotographerCardProps) {
  const cleanPhone = phone.replace(/\D/g, "");
  const whatsappBase = `https://wa.me/57${cleanPhone}`;

  const services = [
    "Bodas",
    "XV Años",
    "Eventos Sociales",
    "Maternidad",
    "Editorial",
  ];

  const [selectedService, setSelectedService] = useState(services[0]);

  const whatsappUrl = `${whatsappBase}?text=${encodeURIComponent(
    `Hola Juan 👋 quiero reservar el servicio de ${selectedService}`
  )}`;

  const images = [
    "/quince.png",
    "/novios.png",
    "/caballo.png",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // 🔥 Contador animado premium
  const Counter = ({ value }: { value: number }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const duration = 1500;
      const increment = value / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [value]);

    return <span>{count}</span>;
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4 py-16"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-xl rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_30px_120px_rgba(0,0,0,0.8)] p-6 sm:p-10 text-white"
      >
        {/* Perfil */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            whileHover={{ scale: 1.08 }}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-yellow-400/40 shadow-lg"
          >
            <img
              src={profileImage}
              alt="Fotógrafo"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <h2 className="mt-6 text-xl sm:text-2xl font-light tracking-widest">
            {name}
          </h2>

          <p className="text-sm text-white/70 mt-2">
            Fotógrafo de bodas & videógrafo cinematográfico
          </p>

          {/* Estadísticas animadas */}
          <div className="flex justify-center gap-8 mt-6 text-center">
            <div>
              <p className="text-yellow-400 font-semibold text-lg drop-shadow-[0_0_8px_rgba(255,215,0,0.7)]">
                <Counter value={562} />
              </p>
              <p className="text-xs text-white/50">Publicaciones</p>
            </div>

            <div>
              <p className="text-yellow-400 font-semibold text-lg drop-shadow-[0_0_8px_rgba(255,215,0,0.7)]">
                <Counter value={2779} />
              </p>
              <p className="text-xs text-white/50">Seguidores</p>
            </div>

            <div>
              <p className="text-yellow-400 font-semibold text-lg drop-shadow-[0_0_8px_rgba(255,215,0,0.7)]">
                <Counter value={2539} />
              </p>
              <p className="text-xs text-white/50">Seguidos</p>
            </div>
          </div>

          <p className="text-xs text-white/60 mt-4 leading-relaxed">
           
            JF Producciones <br />
            Experiencia +300 bodas & XV años
          </p>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent my-6" />

        {/* Carrusel cinematográfico */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={images[index]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full h-56 sm:h-72 object-cover rounded-2xl"
            />
          </AnimatePresence>

          <div className="flex justify-center mt-4 gap-2">
            {images.map((_, i) => (
              <div
                key={i}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  i === index
                    ? "bg-yellow-400 scale-110"
                    : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Selector de servicio */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {services.map((service) => (
            <button
              key={service}
              onClick={() => setSelectedService(service)}
              className={`px-4 py-2 text-xs rounded-full border transition-all duration-300 ${
                selectedService === service
                  ? "bg-yellow-400 text-black border-yellow-400"
                  : "border-white/30 hover:bg-yellow-400 hover:text-black"
              }`}
            >
              {service}
            </button>
          ))}
        </div>

        {/* Botones */}
        <div className="space-y-3 mt-8 text-center">
          <a
            href={whatsappUrl}
            target="_blank"
            className="block py-3 rounded-full bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition-all duration-300"
          >
            Reservar Servicio
          </a>

          <a
            href={`https://www.instagram.com/${instagram}/`}
            target="_blank"
            className="block py-3 rounded-full border border-white/30 hover:bg-yellow-400 hover:text-black transition-all duration-300"
          >
            Instagram
          </a>
        </div>

        <p className="text-center text-[10px] text-white/40 mt-8 tracking-[3px]">
          CINEMATIC EXPERIENCE
        </p>
      </motion.div>
    </div>
  );
}
