'use client'

import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

import SectionTitle from '@/app/components/ui/SectionTitle'
import Text from '../components/ui/Text'
import Button from '../components/ui/Button'

type Proyecto = {
  title: string
  image: string
  link: string
}

export default function MiniCarousel() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([])
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => setProyectos(data.miniCarousel)) 
  }, [])

  if (!proyectos.length) return null

  return (
    <section
      ref={ref}
      className="bg-[#F8F8F8] py-28 px-6 flex flex-col lg:flex-row justify-between items-center"
    >
      {/* Texto (30%) */}
      <motion.div
        className="lg:w-[30%] w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <SectionTitle className="text-[#131A24] mb-4">
          MÁS DE NUESTROS PROYECTOS
        </SectionTitle>
        <Text className="mb-4">
          Aquí puedes ver los vídeos de avances y próximos lanzamientos
        </Text>
        <Button href="https://www.youtube.com/">Lorem</Button>
      </motion.div>

      <motion.div
        className="lg:w-[70%] w-full mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Swiper
          spaceBetween={30}
          slidesPerView={1}  
          pagination={{ clickable: true }}
          breakpoints={{
            768: {
              slidesPerView: 2,  
              spaceBetween: 50,
            },
            1024: {
              slidesPerView: 3,  
              spaceBetween: 60,
            },
            1440: {
              slidesPerView: 4,
              spaceBetween: 80,
            },
          }}
          modules={[Pagination]}
          className="pb-12"
        >
          {proyectos.map((proyecto, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full max-w-[350px]">
                <a href={proyecto.link}>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                    <img
                      src="/youtube.svg"
                      alt="YouTube"
                      className="w-12 h-12"
                    />
                  </div>
                  <img
                    src={proyecto.image}
                    alt={proyecto.title}
                    className="w-full h-[200px] object-cover rounded-[20px] filter blur-sm"
                  />
                </a>

                <div className="absolute top-4 left-4 text-white text-[10px] font-semibold bg-[#131A24] bg-opacity-50 px-4 py-2 rounded-lg">
                  {proyecto.title}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  )
}
