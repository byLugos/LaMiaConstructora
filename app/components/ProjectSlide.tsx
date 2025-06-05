"use client"; 

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import Title from "@/app/components/ui/Title";
import Button from "@/app/components/ui/Button";

type Slide = {
  key: string;
  title: string;
  logo: string;
  logoWidth: string;
  logoHeight: string;
  image: string;
  link: string;
  buttonLabel: string;
  buttonColor: string;
  fontColor: string;
  description?: string;
};

export default function ProjectSlide() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setSlides(data.carousel));
  }, []);

  useEffect(() => {
    if (!slides.length) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides]);

  if (!slides.length) return null;

  const {
    title,
    logo,
    logoWidth,
    logoHeight,
    image,
    link,
    buttonLabel,
    buttonColor,
    fontColor,
    description,
  } = slides[current];

  return (
    <section className="relative h-[90vh] w-full overflow-hidden bg-white px-4">
      <AnimatePresence mode="wait">
        <>
          <motion.div
            key={`overlay-${image}-${current}`}
            className="absolute inset-0 z-10 bg-black/20"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />

          <motion.img
            key={`${image}-${current}`}
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          />
        </>
      </AnimatePresence>

      <div className="z-10 h-[90%] w-[90%] md:w-[50%] ml-0 px-4 md:px-12 rounded-[30px] flex flex-col items-center justify-center bg-white/90 absolute top-1/2 transform -translate-y-[50%]">
        <motion.div
          key={`text-${current}`}
          className="max-w-[80%] flex flex-col justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Logo arriba */}
          <div className="mb-6 flex justify-center">
            <Image
              src={logo}
              alt={`${title} logo`}
              width={parseInt(logoWidth)}
              height={parseInt(logoHeight)}
              style={{ objectFit: "contain" }}
              priority
            />
          </div>

          {/* Título con color dinámico */}
          <Title color={fontColor}>{title}</Title>

          {/* Descripción */}
          {description && (
            <p
              className="text-center text-lg mb-6"
              style={{ color: fontColor }}
            >
              {description}
            </p>
          )}

          {/* Botón con color dinámico */}
          <motion.div
            key={`button-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link href={link} passHref legacyBehavior>
              <Button
                bgColor={buttonColor}  // Pasando el color dinámico
                textColor="text-white"
                className="flex items-center gap-2 rounded-full max-w-max cursor-pointer transition-colors duration-500 ease-in-out"
              >
                {buttonLabel} <span className="text-xl">→</span>
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
