"use client";

import { useState } from "react";
import Modal from "react-modal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function ProjectMediaRibbon() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<
    "3d" | "video" | "gallery" | null
  >(null);

  const galleryImages = [
    "/isoalejandria.webp",
    "/alejandria_alt.webp",
    "/zonacomun.webp",
    "/zonacomun.webp",
  ];

  const openModal = (type: "3d" | "video" | "gallery") => {
    setModalContent(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
  };

  return (
    <>
      <div className=" mx-auto flex gap-10 px-6 py-12 overflow-x-auto scrollbar-hide bg-white">
        <div
          onClick={() => openModal("3d")}
          className="relative min-w-[280px] h-40 rounded-lg cursor-pointer flex items-center justify-center bg-cover bg-center filter brightness-75 hover:brightness-100 transition hover:scale-105"
          style={{ backgroundImage: "url(/isoalejandria.webp)" }} 
          title="Recorrido 3D"
        >
          <span className="absolute inset-0 bg-black/40 rounded-lg"></span>
          <p className="relative text-white font-semibold text-lg z-10">
            Recorrido 3D
          </p>
        </div>

        {/* Card Video */}
        <div
          onClick={() => openModal("video")}
          className="relative min-w-[280px] h-40 rounded-lg cursor-pointer flex items-center justify-center bg-cover bg-center filter brightness-75 hover:brightness-100 transition hover:scale-105"
          style={{ backgroundImage: "url(/alejandria_alt.webp)" }}
          title="Video"
        >
          <span className="absolute inset-0 bg-black/40 rounded-lg"></span>
          <p className="relative text-white font-semibold text-lg z-10">
            Video
          </p>
        </div>

        {/* Card Galería */}
        <div
          onClick={() => openModal("gallery")}
          className="relative min-w-[280px] h-40 rounded-lg cursor-pointer flex items-center justify-center bg-cover bg-center filter brightness-75 hover:brightness-100 transition hover:scale-105"
          style={{ backgroundImage: "url(/zonacomun.webp)" }}
          title="Galería"
        >
          <span className="absolute inset-0 bg-black/40 rounded-lg"></span>
          <p className="relative text-white font-semibold text-lg z-10">
            Galería
          </p>
        </div>

        <a
          href="https://maps.google.com/?q=4.710989,-74.072090" 
          target="_blank"
          rel="noopener noreferrer"
          className="relative min-w-[280px] h-40 rounded-lg cursor-pointer flex items-center justify-center bg-cover bg-center filter brightness-75 hover:brightness-100 transition hover:scale-105"
          title="Mapa"
        >
          <span className="absolute inset-0 bg-black/40 rounded-lg"></span>
          <p className="relative text-white font-semibold text-lg z-10">Mapa</p>
        </a>
      </div>

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
              src="https://my.matterport.com/show/?m=9BDSyscMXG7"
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
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
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
                <img
                  src={img}
                  alt={`Galería imagen ${i + 1}`}
                  className="w-full max-h-[80vh] object-contain"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Modal>
    </>
  );
}
