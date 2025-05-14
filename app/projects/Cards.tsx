'use client'

import { useEffect, useState } from 'react'
import SectionTitle from '@/app/components/ui/SectionTitle'
import SectionSubtitle from '@/app/components/ui/SectionSubtitle'
import Text from '@/app/components/ui/Text'

import { FaBed, FaArrowsAltH, FaRegCheckCircle } from 'react-icons/fa'

type Feature = {
  icon: React.ElementType
  title: string
  value: string
}

type Project = {
  title: string
  image: string
  features: Feature[]
}

export default function Cards() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => setProjects(data.projectos))
  }, [])

  if (!projects.length) return null

  const iconMap: { [key: string]: React.ElementType } = {
    'Número de Habitaciones': FaBed,
    'Metros Totales': FaArrowsAltH,
    'Cocina Integral': FaRegCheckCircle
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
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover group-hover:blur-none blur-[3px] transition duration-300 ease-in-out"
            />
            <div className="p-6">
              <SectionSubtitle className="text-xl font-semibold mb-4 text-[white]">{project.title}</SectionSubtitle>
              <ul>
                {project.features.map((feature, idx) => {
                  const IconComponent = iconMap[feature.title];
                  return (
                    <li key={idx} className="flex items-center space-x-2 mb-3">
                      {IconComponent && <IconComponent className="w-6 h-6 text-[white]" />}
                      <Text className=" text-[white]">{feature.title}:</Text>
                      <Text className='text-[white]'>{feature.value}</Text>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
