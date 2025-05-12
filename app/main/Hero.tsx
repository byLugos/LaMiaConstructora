"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Title from "@/app/components/ui/Title";
import Button from "@/app/components/ui/Button";

type Slide = {
  title: string;
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
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [slides]);

  if (!slides.length) return null;

  const { title, image, link, buttonLabel } = slides[current];

  return (
    <section className="relative h-[85vh] w-full overflow-hidden bg-white px-4">
      <AnimatePresence mode="wait">
  <>
    <motion.div
      key={`overlay-${image}`}
      className="absolute inset-0 z-10 bg-black rounded-[30px]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0.4 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 2 }}
    />

    <motion.img
      key={image}
      src={image}
      alt={title}
      className="absolute inset-0 w-full h-full object-cover rounded-[30px] z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
    />
  </>
</AnimatePresence>

      <div className="absolute inset-0 bg-black/40 z-0 rounded-[30px] " />

      <div className="relative z-10 h-full flex flex-col items-start justify-center px-8 max-w-7xl mx-auto text-white">
        <motion.div
          key={title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Title color="text-white" className="mb-6">
            {title}
          </Title>
        </motion.div>

        <motion.div
          key={link}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button
            href={link}
            bgColor="bg-[#454181]"
            textColor="text-white"
            className="flex items-center gap-2 rounded-full"
          >
            {buttonLabel} <span className="text-xl">→</span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
