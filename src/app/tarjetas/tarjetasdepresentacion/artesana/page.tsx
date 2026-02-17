"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
  return (
    <ArtisanCard
      backgroundImage="https://i.pinimg.com/736x/f5/55/65/f555653e4587f0ce825cbd5dce7bbd90.jpg"
      profileImage="https://i.pinimg.com/736x/03/f9/84/03f9841d2116e6336a389d0f0715a5f2.jpg"
      brandName="Artesana"
      description="Artesanías personalizadas hechas a mano 💛 Retratos, esferos y aretes únicos."
      phone="3222507820"
      instagram="arteconalma"
    />
  );
}

interface ArtisanCardProps {
  backgroundImage: string;
  profileImage: string;
  brandName: string;
  description: string;
  phone: string;
  instagram: string;
}

function ArtisanCard({
  backgroundImage,
  profileImage,
  brandName,
  description,
  phone,
  instagram,
}: ArtisanCardProps) {
  const cleanPhone = phone.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/57${cleanPhone}?text=${encodeURIComponent(
    "Hola 💛 quiero información sobre tus productos artesanales personalizados"
  )}`;

  const images = [
    "https://i.pinimg.com/1200x/cc/55/9a/cc559ac03ebb2a48d1e78cb3e9272432.jpg",
    "https://i.pinimg.com/1200x/3c/3b/d0/3c3bd0bfa5e6427cd96a9dc2449b49ad.jpg",
    "https://i.pinimg.com/736x/5a/10/cf/5a10cfbb2fad41087e615ed3c2b65e02.jpg",
    "https://i.pinimg.com/1200x/46/15/8f/46158fc682c3451ec2b303e42cfae58e.jpg",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4 py-16"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl p-8 text-white"
      >
        {/* PERFIL */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            whileHover={{ scale: 1.08 }}
            className="w-24 h-24 rounded-full overflow-hidden border border-yellow-400/40"
          >
            <img
              src={profileImage}
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <h2 className="mt-6 text-2xl font-light tracking-wide">
            {brandName}
          </h2>

          <p className="text-sm text-white/70 mt-3 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent my-6" />

        {/* CARRUSEL */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={images[index]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full h-60 object-cover rounded-2xl"
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

        {/* BOTONES */}
        <div className="space-y-3 mt-8 text-center">
          <a
            href={whatsappUrl}
            target="_blank"
            className="block py-3 rounded-full bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition-all duration-300"
          >
            WhatsApp
          </a>

          <a
            href={`https://www.instagram.com/arte_sana7820/`}
            target="_blank"
            className="block py-3 rounded-full border border-white/30 hover:bg-yellow-400 hover:text-black transition-all duration-300"
          >
            Instagram
          </a>
        </div>

        <p className="text-center text-[10px] text-white/40 mt-8 tracking-[3px]">
          HECHO CON AMOR ✨
        </p>
      </motion.div>
    </div>
  );
}
