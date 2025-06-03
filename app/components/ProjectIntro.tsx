'use client'

import { useEffect, useState } from 'react'
import SectionTitle from '@/app/components/ui/SectionTitle'
import Text from '@/app/components/ui/Text'
import SectionSubtitle from '@/app/components/ui/SectionSubtitle'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Pagination } from 'swiper/modules'
import 'swiper/css/pagination'
import Image from 'next/image'

type ProjectData = {
  url: string
  title: string
  location: string
  status: string
  logo: string
  description: string
}

type GalleryItem = {
  title: string
  image: string
  category: string
}

type ProjectsData = {
  [key: string]: ProjectData
}

interface Props {
  projectName: string
  logoWidth?: number | string
  logoHeight?: number | string
}

export default function ProjectIntroSection({
  projectName,
  logoWidth = 120,
  logoHeight = 150,
}: Props) {
  const [projects, setProjects] = useState<ProjectsData | null>(null)
  const [gallery, setGallery] = useState<GalleryItem[]>([])

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(json => {
        setProjects(json.projects)
        setGallery(json.gallery)
      })
  }, [])

  if (!projects) return null

  const project = projects[projectName]
  if (!project) return <p>Proyecto no encontrado.</p>

  const projectImages = gallery.filter(
    (item) => item.category.toLowerCase() === project.title.toLowerCase()
  )

  return (
    <section className="w-full mx-auto px-6 py-20 flex flex-col lg:flex-row gap-12 bg-white">
      <div className="lg:w-1/2 flex flex-col justify-center">
        <SectionTitle className="mb-6">{project.title}</SectionTitle>

        <div className="mb-4" style={{ width: logoWidth, height: logoHeight, position: 'relative' }}>
          <Image
            src={project.logo}
            alt={project.title}
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>

        <SectionSubtitle className="mb-2">{project.location}</SectionSubtitle>
        <Text className="mb-4 text-yellow-600 font-bold">{project.status}</Text>
        <Text className="mb-4">{project.description}</Text>
      </div>

      <div className="lg:w-1/2">
        <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="rounded-lg overflow-hidden shadow-lg"
          spaceBetween={10}
          slidesPerView={1}
        >
          {projectImages.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-80 rounded-lg overflow-hidden">
                <Image
                  src={img.image}
                  alt={`${project.title} image ${i + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority={i === 0} // Prioriza la primera imagen para mejor LCP
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
