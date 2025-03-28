"use client";

import Link from "next/link";
import { FiPhone, FiMenu, FiX } from "react-icons/fi";
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
    { href: "#avance", label: "Avance de Obra" },
    { href: "#proyectos", label: "Proyectos" },
    { href: "#ventas", label: "Sala de Ventas" },
    { href: "#quienes", label: "Quienes somos" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/70 shadow-md" : "bg-white"
      }`}
    >
      {" "}
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/salida.webp" alt="Logo La Mía" className="h-16" />
        </div>

        <nav className="hidden md:flex gap-8 text-[20px] font-normal text-black items-center">
          {links.map((link) => (
            <Text
              key={link.href}
              className="hover:text-[#967C6D] transition-colors cursor-pointer"
            >
              <Link href={link.href}>{link.label}</Link>
            </Text>
          ))}
        </nav>
        <div className="hidden md:flex items-center overflow-hidden bg-[#967C6D] rounded-full shadow-md">
          <div className="flex items-center justify-center px-4 py-[12px]">
            <FiPhone size={20} className="text-white" />
          </div>
          <div className="bg-[#131A24] text-white px-4 py-[12px] text-base font-semibold tracking-wide whitespace-nowrap">
            {telefono.replace(/(\+\d{3})(\d{3})(\d{4,})/, "$1 $2 $3")}
          </div>
        </div>

        <button
          className="md:hidden text-2xl text-[#967C6D]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-4">
          {links.map((link) => (
            <Text
              key={link.href}
              className="block text-lg font-medium text-[#131A24] hover:text-[#967C6D] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Link href={link.href}>{link.label}</Link>
            </Text>
          ))}
          <div className="flex items-center overflow-hidden bg-[#967C6D] rounded-full w-fit shadow-md">
            <div className="flex items-center justify-center px-4 py-3">
              <FiPhone size={20} className="text-white" />
            </div>
            <div className="bg-[#131A24] text-white px-4 py-3 text-base font-semibold tracking-wide whitespace-nowrap">
              {telefono.replace(/(\+\d{3})(\d{3})(\d{4,})/, "$1 $2 $3")}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
