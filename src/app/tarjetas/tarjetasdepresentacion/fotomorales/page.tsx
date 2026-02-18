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

  const handleStart = () => {
    setStarted(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      <AnimatePresence>
        {!started && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-cover bg-center z-50"
            style={{
              backgroundImage:
                "url(https://i.pinimg.com/736x/3a/b3/32/3ab332c5828b78dbf351ca909c92fa42.jpg)",
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            <div className="relative z-10 text-center">
              <h1 className="text-4xl md:text-5xl tracking-[12px] font-light text-white mb-16">
                FOTO MORALES
              </h1>

              <button
                onClick={handleStart}
                className="px-16 py-5 rounded-full border border-white/30 bg-white/10 backdrop-blur-2xl text-white tracking-[8px] hover:bg-yellow-400 hover:text-black transition-all duration-500"
              >
                ENTRAR
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {started && <FotomoralesCard />}
    </>
  );
}

/* ===============================
   MAIN CARD
================================== */

function FotomoralesCard() {
  const phone = "3173159272";
  const cleanPhone = phone.replace(/\D/g, "");
  const whatsappBase = `https://wa.me/57${cleanPhone}`;

  const services = [
    "GRADOS",
    "PROMS",
    "QUINCE AÑOS",
    "BODAS",
    "EVENTOS ESPECIALES",
  ];

  const gallery = [
    { src: "https://i.pinimg.com/736x/4a/a8/17/4aa817a331b82530c10af20aceafeabd.jpg", label: "GRADOS" },
    { src: "https://i.pinimg.com/736x/6c/c8/04/6cc8041f1fd609403a8f759d32fc1906.jpg", label: "PROMS" },
    { src: "https://i.pinimg.com/1200x/ab/1f/e9/ab1fe9fa2bc6bbc35fe6f918b3c946d3.jpg", label: "QUINCE AÑOS" },
    { src: "https://i.pinimg.com/1200x/07/4a/f1/074af19376f100b5f2b9b74c852512aa.jpg", label: "BODAS" },
    { src: "https://i.pinimg.com/736x/10/2b/33/102b3376adc8443c4a5369474a0eb9b6.jpg", label: "EVENTOS" },
    { src: "https://i.pinimg.com/736x/1b/5b/69/1b5b699b19507277d628a45e00c418fc.jpg", label: "PRODUCCIÓN" },
  ];

  const [selectedService, setSelectedService] = useState(services[0]);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const visibleImages = gallery.slice(startIndex, startIndex + 4);

  const next = () => {
    if (startIndex + 4 < gallery.length) {
      setStartIndex(startIndex + 4);
    }
  };

  const prev = () => {
    if (startIndex - 4 >= 0) {
      setStartIndex(startIndex - 4);
    }
  };

  const whatsappUrl = `${whatsappBase}?text=${encodeURIComponent(
    `Hola 👋 quiero cotizar el servicio de ${selectedService} con FOTO MORALES`
  )}`;

  /* ===============================
     CONTADOR ANIMADO
  ================================== */

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
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4 py-20"
      style={{
        backgroundImage:
          "url(https://i.pinimg.com/736x/3a/b3/32/3ab332c5828b78dbf351ca909c92fa42.jpg)",
      }}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-lg" />

      <div className="relative z-10 w-full max-w-6xl rounded-3xl bg-white/10 backdrop-blur-3xl border border-white/20 shadow-[0_60px_140px_rgba(0,0,0,0.95)] p-6 sm:p-14 text-white">

        {/* HEADER */}
        <div className="text-center">
          <h2 className="text-4xl tracking-[10px] font-light">
            FOTO MORALES
          </h2>

          <a
            href={`tel:57${cleanPhone}`}
            className="mt-6 inline-block px-8 py-2 rounded-full border border-white/30 hover:bg-yellow-400 hover:text-black transition"
          >
            📞 {phone}
          </a>

          {/* ESTADÍSTICAS */}
          <div className="flex justify-center gap-10 mt-8">
            <div>
              <p className="text-yellow-400 text-xl font-semibold">
                <Counter value={2779} />
              </p>
              <p className="text-xs text-white/60">Seguidores</p>
            </div>

            <div>
              <p className="text-yellow-400 text-xl font-semibold">
                <Counter value={2539} />
              </p>
              <p className="text-xs text-white/60">Seguidos</p>
            </div>

            <div>
              <p className="text-yellow-400 text-xl font-semibold">
                <Counter value={562} />
              </p>
              <p className="text-xs text-white/60">Proyectos</p>
            </div>
          </div>
        </div>

        {/* SERVICIOS */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {services.map((service) => (
            <button
              key={service}
              onClick={() => setSelectedService(service)}
              className={`px-6 py-2 text-xs tracking-widest rounded-full border transition ${
                selectedService === service
                  ? "bg-yellow-400 text-black border-yellow-400"
                  : "border-white/30 hover:bg-yellow-400 hover:text-black"
              }`}
            >
              {service}
            </button>
          ))}
        </div>

        {/* GALERÍA */}
        <div className="mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {visibleImages.map((item, i) => (
              <div
                key={i}
                onClick={() => setSelectedImage(item.src)}
                className="relative rounded-2xl overflow-hidden cursor-pointer group"
              >
                <img
                  src={item.src}
                  className="w-full h-80 object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                  <span className="text-yellow-400 text-sm tracking-widest">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* FLECHAS */}
          <div className="flex justify-between mt-10">
            <button
              onClick={prev}
              disabled={startIndex === 0}
              className="w-12 h-12 rounded-full border border-white/30 hover:bg-yellow-400 hover:text-black transition disabled:opacity-30"
            >
              ←
            </button>

            <button
              onClick={next}
              disabled={startIndex + 4 >= gallery.length}
              className="w-12 h-12 rounded-full border border-white/30 hover:bg-yellow-400 hover:text-black transition disabled:opacity-30"
            >
              →
            </button>
          </div>
        </div>

        {/* BOTONES */}
        <div className="mt-14 text-center space-y-4">
          <a
            href={whatsappUrl}
            target="_blank"
            className="block py-4 rounded-full bg-yellow-400 text-black font-semibold tracking-widest hover:bg-yellow-300 transition"
          >
            COTIZAR SERVICIO
          </a>

          <a
            href="https://www.instagram.com/juanmoralesfotografo/"
            target="_blank"
            className="block py-4 rounded-full border border-white/30 hover:bg-yellow-400 hover:text-black transition tracking-widest"
          >
            INSTAGRAM
          </a>
        </div>
      </div>

      {/* MODAL */}
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
              className="max-h-[90vh] rounded-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
