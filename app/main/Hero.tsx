"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import Title from "@/app/components/ui/Title";
import Button from "@/app/components/ui/Button";

type Slide = {
  title: string;
  logo: string;
  logoWidth: string;
  logoHeight: string;
  image: string;
  link: string;
  buttonLabel: string;
};

export default function HeroCarousel() {
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

  const { title, logo, logoWidth, logoHeight, image, link, buttonLabel } =
    slides[current];

  return (
    <section className="relative h-[85vh] w-full overflow-hidden bg-white px-4">
      <AnimatePresence mode="wait">
        <>
          <motion.div
            key={`overlay-${image}-${current}`}
            className="absolute inset-0 z-10 bg-black rounded-[30px]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />

          <motion.img
            key={`${image}-${current}`}
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover rounded-[30px] z-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          />
        </>
      </AnimatePresence>

      <div className="absolute inset-0 bg-white/40 z-0 rounded-[30px]" />

      <div className="relative z-10 h-full max-w-7xl mx-auto text-white px-12 rounded-[30px] flex items-center">
        <motion.div
          key={`text-${current}`}
          className="max-w-[60%] flex flex-col justify-center h-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Title color="text-white" className="mb-6">
            {title}
          </Title>

          <motion.div
            key={`button-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link href={link} passHref legacyBehavior>
              <Button
                textColor="text-white"
                className={`flex items-center gap-2 rounded-full max-w-max cursor-pointer transition-colors duration-500 ease-in-out hover:bg-[#b1d07fff]`}
              >
                {buttonLabel} <span className="text-xl">→</span>
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {logo && (
          <motion.div
            key={`logo-${current}`}
            className={`absolute top-[30%] right-60 transform -translate-y-1/2 ${logoWidth} ${logoHeight}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <img
              src={logo}
              alt={`${title} logo`}
              className="object-contain w-full h-full"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
