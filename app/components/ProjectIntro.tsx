'use client'

import { useEffect, useState } from 'react'
import SectionTitle from '@/app/components/ui/SectionTitle'
import Text from '@/app/components/ui/Text'
import SectionSubtitle from '@/app/components/ui/SectionSubtitle'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Pagination } from 'swiper/modules'
import 'swiper/css/pagination'

type ProjectData = {
  title: string
  location: string
  status: string
  logo: string
  description: string
  images: string[]
}

type ProjectsData = {
  [key: string]: ProjectData
}

interface Props {
  projectName: string
  logoWidth?: string  
  logoHeight?: string
}

export default function ProjectIntroSection({
  projectName,
  logoWidth = '120px',
  logoHeight = '150px',
}: Props) {
  const [projects, setProjects] = useState<ProjectsData | null>(null)

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(json => setProjects(json.project))
  }, [])

  if (!projects) return null

  const project = projects[projectName]

  if (!project) return <p>Proyecto no encontrado.</p>

  return (
    <section className="w-full mx-auto px-6 py-20 flex flex-col lg:flex-row gap-12 bg-white">
      <div className="lg:w-1/2 flex flex-col justify-center">
        <SectionTitle className="mb-6">{project.title}</SectionTitle>
        <img
          src={project.logo}
          alt={project.title}
          style={{ width: logoWidth, height: logoHeight }}
          className="mb-4"
        />
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
          {project.images.map((img, i) => (
            <SwiperSlide key={i}>
              <img
                src={img}
                alt={`${project.title} image ${i + 1}`}
                className="w-full h-80 object-cover rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
