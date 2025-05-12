"use client";

import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from "react";
import Text from "@/app/components/ui/Text";

export default function Navbar() {
  const [telefono, setTelefono] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setTelefono(data.contacto.whatsapp);
      });
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/galery", label: "Galería" },
    { href: "/projects", label: "Nuestros proyectos" },
    { href: "/xdDos", label: "Sala de Ventas" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/85 shadow-md" : "bg-white"
      }`}
    >
      {" "}
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo La Mía" className="h-12" />
        </div>

        <nav className="hidden md:flex gap-8 text-[20px] font-normal text-black items-center">
          {links.map((link) => (
            <Text className="font-extrabold hover:text-[#454181]">
              <Link href={link.href}>{link.label}</Link>
            </Text>
          ))}
          <a
            href={`https://wa.me/${telefono.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center justify-center pr-6"
          >
            <FaWhatsapp
              size={35}
              className="text-black hover:text-[#454181] transition-colors"
            />
          </a>
        </nav>

        <button
          className="md:hidden text-2xl text-[#454181]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white/8 shadow-md px-4 pb-4 space-y-4">
          {links.map((link) => (
            <Text className="hover:text-[#454181]">
              <Link href={link.href}>{link.label}</Link>
            </Text>
          ))}
        </div>
      )}
    </header>
  );
}
