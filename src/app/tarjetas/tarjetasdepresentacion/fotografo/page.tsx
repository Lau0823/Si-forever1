"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
  return (
    <PhotographerCard
      backgroundImage="https://i.pinimg.com/736x/b9/fb/4e/b9fb4e70ca132d974e9a4717e77f8b68.jpg"
      profileImage="/i.png"
      name="Juan Felipe Morales"
      specialty="Fotografía Profesional & Cinematografía"
      phone="3173159272"
      instagram="juanmoralesfotografo"
    />
  );
}

interface PhotographerCardProps {
  backgroundImage: string;
  profileImage: string;
  name: string;
  specialty: string;
  phone: string;
  instagram: string;
}

function PhotographerCard({
  backgroundImage,
  profileImage,
  name,
  specialty,
  phone,
  instagram,
}: PhotographerCardProps) {
  const cleanPhone = phone.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/57${cleanPhone}`;

  const images = [
    "/quince.png",
    "/novios.png",
    "/caballo.png",
    "/pareja.png",
    "/image.png",
  ];

  const specialties = [
    "Bodas",
    "15 Años",
    "Maternidad",
    "Lifestyle",
    "Editorial",
  ];

  const [index, setIndex] = useState(0);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative px-4 sm:px-6 py-16"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="
          relative z-10
          w-full max-w-lg
          rounded-3xl
          bg-white/10
          backdrop-blur-2xl
          border border-white/20
          shadow-[0_30px_100px_rgba(0,0,0,0.7)]
          p-6 sm:p-8
          text-white
        "
      >
        {/* Perfil */}
        <div className="flex flex-col items-center">
          <motion.div
            whileHover={{ scale: 1.08 }}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-white/40 shadow-xl"
          >
            <img
              src={profileImage}
              alt="Fotógrafo"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <h2 className="mt-6 text-xl sm:text-2xl font-light tracking-widest text-center">
            {name}
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-white/70 text-center tracking-wide">
            {specialty}
          </p>

          {/* Badge elegante */}
          <div className="mt-3 text-[10px] sm:text-xs tracking-[3px] text-white/50">
            RESERVAS ABIERTAS 2026
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent my-6" />

        {/* Carrusel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={images[index]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full h-48 sm:h-64 object-cover rounded-2xl"
            />
          </AnimatePresence>

          {/* Dots */}
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

        {/* Especialidades */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {specialties.map((item) => (
            <span
              key={item}
              className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/20"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Contacto */}
        <div className="space-y-3 text-center mt-6">
          <a
            href={whatsappUrl}
            target="_blank"
            className="block py-3 rounded-full border border-white/30 hover:bg-yellow-400 hover:text-black transition-all duration-500 text-sm tracking-widest"
          >
            WhatsApp
          </a>

          <a
            href={`https://instagram.com/${instagram}`}
            target="_blank"
            className="block py-3 rounded-full border border-white/30 hover:bg-yellow-400 hover:text-black transition-all duration-500 text-sm tracking-widest"
          >
            Instagram
          </a>
        </div>

        <p className="text-center text-[10px] text-white/40 mt-8 tracking-[3px]">
          EST. 2026
        </p>
      </motion.div>
    </div>
  );
}
