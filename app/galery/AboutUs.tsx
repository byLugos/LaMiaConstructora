"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "@/app/components/ui/SectionTitle";
import Text from "@/app/components/ui/Text";
import Button from "@/app/components/ui/Button";

type Info = {
  titleOne: string;
  titleTwo: string;
  descriptionOne: string;
  descriptionTwo: string;
  button: {
    text: string;
    link: string;
  };
};

export default function AboutUs() {
  const [info, setInfo] = useState<Info | null>(null);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setInfo(data.companyInfo.aboutUs));
  }, []);

  if (!info) return null;

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle className="text-[#131A24] mb-8 text-center text-3xl">
            SOBRE NOSOTROS
          </SectionTitle>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-xl font-bold text-[black]">{info.titleOne}</h2>
            <Text className="text-[black] mb-4">{info.descriptionOne}</Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-xl font-bold text-[black]">{info.titleTwo}</h2>
            <Text className="text-[black] mb-4">{info.descriptionTwo}</Text>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <Button href={info.button.link} className="self-center">
            {info.button.text}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
