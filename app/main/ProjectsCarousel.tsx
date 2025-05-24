'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

import { useInView } from 'react-intersection-observer'
import { motion, AnimatePresence } from 'framer-motion'

import SectionTitle from '@/app/components/ui/SectionTitle'

type Proyecto = {
  title: string
  image: string
  logo: string
  link: string
  buttonLabel: string
}

export default function ProyectosCarousel() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([])
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  const [hoverIndex, setHoverIndex] = useState<number | null>(null)

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
              <Link
                href={proyecto.link || '/alejandria'}
                className="relative w-[90%] max-w-[560px] mx-auto rounded-[20px] overflow-hidden shadow-lg block"
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                aria-label={`Ver más sobre ${proyecto.title}`}
              >
                <img
                  src={proyecto.image}
                  alt={proyecto.title}
                  className="w-full h-[400px] object-cover"
                />

                <AnimatePresence>
                  {hoverIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center pointer-events-none rounded-[20px]"
                    >
                      <img
                        src={proyecto.logo}
                        alt={`${proyecto.title} logo`}
                        className="max-h-24 max-w-48 object-contain"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  )
}
