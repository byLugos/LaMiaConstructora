"use client";

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

type SocialItem = {
  name: string;
  icon: string;
  url: string;
};

type ContactInfo = {
  phoneOne: string;
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
              width={160}
              height={80}
              className="mb-4"
              priority={true}
            />
          </a>
        </div>
        <div>
          <h4 className="font-bold mb-4">Encuéntranos!</h4>
          <a
            href="https://www.google.com/maps?q=Cll+46+N+10+B-62+Sogamoso"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-blue-500 underline"
          >
            <FaMapMarkerAlt className="text-2xl" />{data.general.contact.address}            
          </a>
        </div>
        <div>
          <h4 className="font-bold mb-4">Contacto</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FaPhone /> {data.general.contact.phoneOne}
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
