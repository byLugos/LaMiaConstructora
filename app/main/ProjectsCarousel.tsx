'use client'

import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

import SectionTitle from '@/app/components/ui/SectionTitle'

type Proyecto = {
  title: string
  image: string
  link: string
  buttonLabel: string
}

export default function ProyectosCarousel() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([])
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => setProyectos(data.carousel))
  }, [])

  if (!proyectos.length) return null

  return (
    <section
      ref={ref}
      className="bg-[#131A24] py-20 px-6 text-left overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <SectionTitle color="text-white" className="mb-12 pl-11">
          NUESTROS PROYECTOS
        </SectionTitle>
      </motion.div>

      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Swiper
          spaceBetween={30}
          slidesPerView={1.1}
          centeredSlides
          pagination={{ clickable: true }}
          breakpoints={{
            768: {
              slidesPerView: 1.5,
              spaceBetween: 50,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 80,
            },
          }}
          modules={[Pagination]}
          className="pb-24"
        >
          {proyectos.map((proyecto, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-[90%] max-w-[560px] mx-auto rounded-[20px] overflow-hidden shadow-lg">
                <img
                  src={proyecto.image}
                  alt={proyecto.title}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-[#00000088] px-4 py-2 rounded-md">
                  <h3 className="text-white text-base md:text-lg font-semibold">
                    {proyecto.title}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  )
}
