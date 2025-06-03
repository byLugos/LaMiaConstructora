'use client'

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
// import Button from "@/app/components/ui/Button";
// import Subtitle from "./ui/SectionSubtitle";

type SocialItem = {
  name: string;
  icon: string;
  url: string;
};

type ContactInfo = {
  phone: string;
  email: string;
  whatsapp?: string;
  address: string;
};

type CompanyInfo = {
  general: {
    name: string;
    description: string;
    contact: ContactInfo;
  };
  socials: SocialItem[];
  legal: string;
};

export default function Footer() {
  const [data, setData] = useState<CompanyInfo | null>(null);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setData(data.companyInfo));
  }, []);

  if (!data) return null;

  const iconMap: Record<string, JSX.Element> = {
    facebook: <FaFacebookF />,
    twitter: <FaTwitter />,
    instagram: <FaInstagram />,
    linkedin: <FaLinkedinIn />,
    youtube: <FaYoutube />,
  };

  return (
    <footer className="bg-white text-[#131A24]">
      {/* Aquí puedes activar el newsletter si lo deseas */}
      {/* ... */}

      {/* Bottom info section */}
      <motion.div
        className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="col-span-1">
          <a href="#">
            <Image
              src="https://res.cloudinary.com/dwowtfmgn/image/upload/v1748298103/logo_jhwpmg.png"
              alt="Logo La Mía"
              width={160} // Ajusta el tamaño según necesidad (h-20 ~ 80px alto)
              height={80}
              className="mb-4"
              priority={true} // para cargarla rápido en la página
            />
          </a>
        </div>
        <div>
          <h4 className="font-bold mb-4">{data.general.name}</h4>
          <p className="text-sm">{data.general.description}</p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Contacto</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FaPhone /> {data.general.contact.phone}
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope /> {data.general.contact.email}
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt /> {data.general.contact.address}
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Redes Sociales</h4>
          <div className="flex flex-wrap gap-6 mt-6 justify-start">
            {data.socials.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-center text-sm"
                aria-label={item.name}
              >
                <div className="text-2xl mb-1">
                  {iconMap[item.icon] || <span />}
                </div>
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="text-center text-sm text-gray-500 py-4 border-t border-gray-300">
        {data.legal}
      </div>
    </footer>
  );
}
