"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
  const [started, setStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Fade in suave
  const fadeInAudio = () => {
    if (!audioRef.current) return;

    audioRef.current.volume = 0;
    let volume = 0;
    const fade = setInterval(() => {
      if (!audioRef.current) return;

      if (volume < 0.6) {
        volume += 0.05;
        audioRef.current.volume = volume;
      } else {
        clearInterval(fade);
      }
    }, 200);
  };

  const handleStart = async () => {
    if (!audioRef.current) {
      setStarted(true);
      return;
    }

    try {
      audioRef.current.currentTime = 0;
      await audioRef.current.play();
      fadeInAudio();
      setStarted(true);
    } catch (error) {
      console.log("Audio bloqueado:", error);
      setStarted(true);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/manuel.mp3"
        loop
        preload="auto"
      />

      <AnimatePresence>
        {!started && (
          <motion.div
            className="fixed inset-0 bg-black flex flex-col items-center justify-center text-white z-50 text-center px-6"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h1
              initial={{ opacity: 0, letterSpacing: "0px" }}
              animate={{ opacity: 1, letterSpacing: "10px" }}
              transition={{ duration: 2 }}
              className="text-4xl font-light mb-6 tracking-widest"
            >
              FOTO MORALES
            </motion.h1>

            <p className="text-white/60 text-sm tracking-widest mb-10 max-w-md">
              Fotografía premium para momentos inolvidables.
            </p>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="px-12 py-4 border border-yellow-400 text-yellow-400 rounded-full tracking-[6px] hover:bg-yellow-400 hover:text-black transition-all duration-500"
            >
              ENTRAR
            </motion.button>

            <p className="text-xs text-white/30 mt-12 tracking-[4px]">
              GRADOS · BODAS · QUINCE AÑOS · EVENTOS
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {started && <FotomoralesCard />}
    </>
  );
}

function FotomoralesCard() {
  const backgroundImage =
    "https://i.pinimg.com/736x/3a/b3/32/3ab332c5828b78dbf351ca909c92fa42.jpg";
  const profileImage =
    "https://i.pinimg.com/736x/bf/56/18/bf561847d27a2890ab1277db34d732de.jpg";

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4 py-20"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 60 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-4xl rounded-3xl bg-white/10 backdrop-blur-3xl border border-white/20 shadow-[0_60px_140px_rgba(0,0,0,0.95)] p-8 text-white text-center"
      >
        <div className="w-28 h-28 rounded-full overflow-hidden border border-yellow-400/40 mx-auto mb-6">
          <img
            src={profileImage}
            alt="Perfil"
            className="w-full h-full object-cover"
          />
        </div>

        <h2 className="text-4xl tracking-[10px] font-light mb-4">
          FOTO MORALES
        </h2>

        <p className="text-white/60 text-sm mb-8">
          Transformamos momentos en recuerdos eternos.
        </p>

        <div className="space-y-4">
          <a
            href="https://wa.me/573173159272"
            target="_blank"
            className="block py-3 rounded-full bg-yellow-400 text-black font-semibold tracking-widest hover:bg-yellow-300 transition-all duration-500"
          >
            COTIZAR POR WHATSAPP
          </a>

          <a
            href="https://www.instagram.com/juanmoralesfotografo/"
            target="_blank"
            className="block py-3 rounded-full border border-white/30 hover:bg-yellow-400 hover:text-black transition-all duration-500 tracking-widest"
          >
            VER INSTAGRAM
          </a>
        </div>

        <p className="text-[10px] text-white/40 mt-10 tracking-[5px]">
          EXPERIENCIAS QUE SE RECUERDAN PARA SIEMPRE
        </p>
      </motion.div>
    </div>
  );
}
