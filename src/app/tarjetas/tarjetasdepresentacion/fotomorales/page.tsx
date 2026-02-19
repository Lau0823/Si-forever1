"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
  return <MainExperience />;
}

/* ===============================
   EXPERIENCE SCREEN
================================== */

function MainExperience() {
  const [started, setStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleStart = async () => {
    try {
      if (audioRef.current) {
        audioRef.current.volume = 0.5;
        await audioRef.current.play();
      }
      setStarted(true);
    } catch (error) {
      setStarted(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/Amigos.MP3" loop preload="auto" />

      <AnimatePresence>
        {!started && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black z-50 overflow-hidden"
          >
            {/* LOGO COMO FONDO GLASS */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <img
                src="/logofm.jpeg"
                className="w-[500px] blur-sm"
              />
            </div>

            <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" />

            <div className="relative z-10 text-center space-y-16">
              <h1 className="text-4xl md:text-5xl tracking-[14px] font-light text-white">
                FM FOTO MORALES
              </h1>

              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStart}
                className="px-16 py-5 rounded-full border border-white/30 bg-white/10 backdrop-blur-2xl text-white tracking-[8px] hover:bg-white hover:text-black transition-all duration-500 shadow-2xl"
              >
                ENTRAR
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {started && <FotomoralesCard />}
    </>
  );
}

/* ===============================
   CONFETTI LED REDONDO
================================== */

function Confetti() {
  const pieces = Array.from({ length: 50 });
  const colors = ["#facc15", "#22d3ee", "#f472b6", "#4ade80", "#fb923c"];

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {pieces.map((_, i) => {
        const color = colors[Math.floor(Math.random() * colors.length)];
        return (
          <motion.div
            key={i}
            initial={{
              y: -20,
              x: Math.random() * window.innerWidth,
              opacity: 1,
            }}
            animate={{
              y: window.innerHeight + 20,
              opacity: 0,
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              ease: "easeOut",
            }}
            className="absolute rounded-full"
            style={{
              width: 8,
              height: 8,
              backgroundColor: color,
              boxShadow: `0 0 12px ${color}`,
            }}
          />
        );
      })}
    </div>
  );
}

/* ===============================
   MAIN CARD
================================== */

function FotomoralesCard() {
  const phone = "3107788099";
  const cleanPhone = phone.replace(/\D/g, "");
  const whatsappBase = `https://wa.me/57${cleanPhone}`;

  const services = [
    "GRADOS",
    "PROMS",
    "QUINCE AÑOS",
    "BODAS",
    "TOGAS Y BIRRETES",
  ];

  const gallery = [
    "/toga.jpeg",
    "/fm3.jpeg",
    "/fm1.jpeg",
    "/fm2.jpeg",
    "/fm4.jpeg",
    "/fm5.jpeg",
    
  ];

  const [selectedService, setSelectedService] = useState(services[0]);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const visibleImages = gallery.slice(startIndex, startIndex + 4);

  const whatsappUrl = `${whatsappBase}?text=${encodeURIComponent(
    `Hola 👋 quiero cotizar el servicio de ${selectedService}`
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex items-center justify-center relative px-4 py-20 overflow-hidden"
    >
      {showConfetti && <Confetti />}

      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black" />

      <div className="relative z-10 w-full max-w-6xl rounded-3xl bg-white/10 backdrop-blur-3xl border border-white/20 shadow-2xl p-6 sm:p-14 text-white">

        {/* PERFIL */}
        <div className="flex flex-col items-center text-center">
          <div className="w-28 h-28 rounded-full overflow-hidden border border-white shadow-xl">
            <img src="/logofm.jpeg" className="w-full h-full object-cover" />
          </div>

          <h2 className="text-4xl tracking-[10px] font-light mt-6">
            FOTO MORALES
          </h2>
        </div>

        {/* GALERÍA VERTICAL MÁS ANCHA */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {visibleImages.map((src, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => setSelectedImage(src)}
            >
              <img
                src={src}
                className="w-full aspect-[3/4] object-cover transition duration-700 group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>

        {/* CARRUSEL TEXTO MEJORADO */}
        <div className="mt-20 overflow-hidden border-t border-white/10 pt-6">
          <motion.div
            animate={{ x: ["100%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
            className="whitespace-nowrap text-yellow-400 tracking-widest text-sm"
          >
            ✨ PAGA FÁCIL POR NEQUI • BANCOLOMBIA • ESCANEA NUESTRO CÓDIGO QR • TRANSFERENCIAS SEGURAS ✨
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="rounded-2xl bg-white/5 p-6 text-center hover:scale-105 transition">
              <img src="/bc.jpeg" className="w-56 mx-auto rounded-xl" />
            </div>

            <div className="rounded-2xl bg-white/5 p-6 text-center hover:scale-105 transition">
              <img src="/qrnequi.jpeg" className="w-56 mx-auto rounded-xl" />
            </div>
          </div>
        </div>

      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage}
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
              className="max-h-[90vh] rounded-2xl shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
