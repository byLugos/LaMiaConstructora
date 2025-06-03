'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
  link_video: string
}

export default function MiniCarousel() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([])
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => setProyectos(data.carousel))
  }, [])

  if (!proyectos.length) return null

  return (
    <section
      ref={ref}
      className="bg-[#F8F8F8] py-28 px-6 flex flex-col lg:flex-row justify-between items-center"
    >
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
        <Button href="https://www.youtube.com/@CONSTRUCTORALAMIA">Suscríbete!</Button>
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
          {proyectos.map((proyecto, index) => {
            const isExternal = proyecto.link_video.startsWith('http')
            return (
              <SwiperSlide key={index}>
                <div className="relative w-full max-w-[350px]">
                  {isExternal ? (
                    <a
                      href={proyecto.link_video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative"
                    >
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                        <Image
                          src="/youtube.svg"
                          alt="YouTube"
                          width={48}
                          height={48}
                          priority={true}
                        />
                      </div>
                      <Image
                        src={proyecto.image}
                        alt={proyecto.title}
                        width={350}
                        height={200}
                        className="rounded-[20px] filter blur-[1px]"
                        style={{ objectFit: 'cover' }}
                      />
                    </a>
                  ) : (
                    <Link href={proyecto.link_video} className="block relative">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                        <Image
                          src="/youtube.svg"
                          alt="YouTube"
                          width={48}
                          height={48}
                          priority={true}
                        />
                      </div>
                      <Image
                        src={proyecto.image}
                        alt={proyecto.title}
                        width={350}
                        height={200}
                        className="rounded-[20px] filter blur-[1px]"
                        style={{ objectFit: 'cover' }}
                      />
                    </Link>
                  )}
                  <div className="absolute top-4 left-4 text-white text-[10px] font-semibold bg-[#131A24] bg-opacity-50 px-4 py-2 rounded-lg">
                    {proyecto.title}
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </motion.div>
    </section>
  )
}

