'use client'

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import Modal from "react-modal"; 
import 'swiper/css';
import 'swiper/css/pagination';
import Image from "next/image";

export default function ProjectMediaRibbon() {
  const [mounted, setMounted] = useState(false); 
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<"3d" | "video" | "gallery" | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMounted(true);
    }
  }, []);

  const openModal = (type: "3d" | "video" | "gallery") => {
    setModalContent(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null); 
  };

  const galleryImages = [
    "https://res.cloudinary.com/dwowtfmgn/image/upload/q_auto,f_auto/v1748298101/isoalejandria_jwztms.webp",
    "https://res.cloudinary.com/dwowtfmgn/image/upload/q_auto,f_auto/v1748298094/alejandria_alt_q5oakn.webp",
    "https://res.cloudinary.com/dwowtfmgn/image/upload/q_auto,f_auto/v1748298094/zonacomun_ep6phn.webp",
    "https://res.cloudinary.com/dwowtfmgn/image/upload/q_auto,f_auto/v1748298093/vistacenital_nimdbd.webp",
  ];

  if (!mounted) return null; // Asegúrate de que el componente esté montado antes de renderizar

  return (
    <>
      <div className="mx-auto flex gap-10 px-6 py-12 overflow-x-auto bg-white">
        <div
          onClick={() => openModal("3d")}
          className="relative min-w-[280px] h-40 rounded-lg cursor-pointer flex items-center justify-center bg-cover bg-center filter brightness-75 hover:brightness-100 transition hover:scale-105"
          style={{ backgroundImage: "url(/isoalejandria.webp)" }}
          title="Recorrido 3D"
        >
          <span className="absolute inset-0 bg-black/40 rounded-lg"></span>
          <p className="relative text-white font-semibold text-lg z-10">Recorrido 3D</p>
        </div>

        <div
          onClick={() => openModal("video")}
          className="relative min-w-[280px] h-40 rounded-lg cursor-pointer flex items-center justify-center bg-cover bg-center filter brightness-75 hover:brightness-100 transition hover:scale-105"
          style={{ backgroundImage: "url(/alejandria_alt.webp)" }}
          title="Video"
        >
          <span className="absolute inset-0 bg-black/40 rounded-lg"></span>
          <p className="relative text-white font-semibold text-lg z-10">Video</p>
        </div>

        <div
          onClick={() => openModal("gallery")}
          className="relative min-w-[280px] h-40 rounded-lg cursor-pointer flex items-center justify-center bg-cover bg-center filter brightness-75 hover:brightness-100 transition hover:scale-105"
          style={{ backgroundImage: "url(/zonacomun.webp)" }}
          title="Galería"
        >
          <span className="absolute inset-0 bg-black/40 rounded-lg"></span>
          <p className="relative text-white font-semibold text-lg z-10">Galería</p>
        </div>

        <a
          href="https://www.google.com/maps/place/Cl.+46+%23+10B-62,+Sogamoso,+Boyac%C3%A1/@5.7417403,-72.9127939,17z/data=!3m1!4b1!4m6!3m5!1s0x8e6a4622b1fd8613:0x1afb684e2872d5f7!8m2!3d5.741735!4d-72.910219!16s%2Fg%2F11x2m39tcd?entry=ttu&g_ep=EgoyMDI1MDYwMy4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="relative min-w-[280px] h-40 rounded-lg cursor-pointer flex items-center justify-center bg-cover bg-center filter brightness-75 hover:brightness-100 transition hover:scale-105"
          title="Mapa"
        >
          <span className="absolute inset-0 bg-black/40 rounded-lg"></span>
          <p className="relative text-white font-semibold text-lg z-10">Mapa</p>
        </a>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        overlayClassName="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto p-4 relative"
      >
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 font-bold text-xl"
          aria-label="Cerrar modal"
        >
          &times;
        </button>

        {modalContent === "3d" && (
          <div className="aspect-video w-full">
            <iframe
              src="https://www.3dvista.com/samples/new_york_loft.html"
              title="Recorrido 3D"
              className="w-full h-full rounded-lg"
              allowFullScreen
              loading="lazy"
            />
          </div>
        )}

        {modalContent === "video" && (
          <div className="aspect-video w-full">
            <iframe
              src="https://www.youtube.com/watch?v=ruvctDODiVo"
              title="Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
              loading="lazy"
            />
          </div>
        )}

        {modalContent === "gallery" && (
          <Swiper
            modules={[Pagination, Navigation]}
            navigation
            pagination={{ clickable: true }}
            className="rounded-lg"
            slidesPerView={1}
          >
            {galleryImages.map((img, i) => (
              <SwiperSlide key={i}>
                <Image
                  src={img}
                  alt={`Galería imagen ${i + 1}`}
                  className="object-contain"
                  width={800}
                  height={450}
                  style={{ maxHeight: '80vh', width: '100%' }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Modal>
    </>
  );
}
