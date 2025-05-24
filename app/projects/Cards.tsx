'use client'

import { useEffect, useState } from 'react'
import SectionTitle from '@/app/components/ui/SectionTitle'
import SectionSubtitle from '@/app/components/ui/SectionSubtitle'
import Text from '@/app/components/ui/Text'

import {
  FaBed,
  FaArrowsAltH,
  FaBath,
  FaCar
} from 'react-icons/fa'

type Feature = {
  title: string
  value: string
}

type ProjectRaw = {
  title: string
  location?: string
  logo?: string
  status?: string
  description?: string
  images?: string[]
  technicalDetails?: {
    units: {
      features: Feature[]
    }[]
  }
  url: string
  image: string
}

type Project = {
  title: string
  url: string
  image: string
  features: Feature[]
}

export default function Cards() {
  const [projectsRaw, setProjectsRaw] = useState<Record<string, ProjectRaw> | null>(null)
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => setProjectsRaw(data.projects))
  }, [])

  useEffect(() => {
    if (!projectsRaw) return
    const mapped = Object.values(projectsRaw).map(p => {
      const firstUnit = p.technicalDetails?.units?.[0]
      const wantedFeatures = ['Metros construidos', 'Habitaciones', 'Baños', 'Parqueadero']
      const features = firstUnit?.features
        ?.filter(f => wantedFeatures.includes(f.title))
        ?? []
      return {
        title: p.title,
        url: p.url,
        image: p.images?.[0] ?? p.image, // Tomar la primera imagen o el campo image
        features
      }
    })

    setProjects(mapped)
  }, [projectsRaw])

  if (!projects.length) return null

  const iconMap: Record<string, React.ElementType> = {
    'Habitaciones': FaBed,
    'Metros construidos': FaArrowsAltH,
    'Baños': FaBath,
    'Parqueadero': FaCar
  }

  return (
    <section className="bg-white py-20 px-6">
      <SectionTitle className="text-center mb-12">Nuestros Proyectos</SectionTitle>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="group border rounded-lg overflow-hidden shadow-lg transform bg-[#454181]/90 hover:scale-105 duration-300 ease-in-out hover:bg-[#454181]"
          >
            <a href={project.url}>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover group-hover:blur-none blur-[3px] transition duration-300 ease-in-out"
              />
              <div className="p-6">
                <SectionSubtitle className="text-xl font-semibold mb-4 text-white">
                  {project.title}
                </SectionSubtitle>
                <ul>
                  {project.features.map((feature, idx) => {
                    const iconKey = feature.title === 'Número de Habitaciones' ? 'Habitaciones' : feature.title
                    const IconComponent = iconMap[iconKey]
                    return (
                      <li key={idx} className="flex items-center space-x-2 mb-3 text-white">
                        {IconComponent && <IconComponent className="w-6 h-6" />}
                        <Text className='text-white'>{feature.title}:</Text>
                        <Text  className='text-white'>{feature.value}</Text>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
