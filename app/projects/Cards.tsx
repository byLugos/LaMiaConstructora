'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import SectionTitle from '@/app/components/ui/SectionTitle'
import SectionSubtitle from '@/app/components/ui/SectionSubtitle'
import Text from '@/app/components/ui/Text'

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
  images?: string[] // Aquí definimos correctamente que es un arreglo de imágenes
  apartmentFeatures: Feature[]
  projectFeatures: Feature[]
  url: string
  color: string 
}

type Project = {
  title: string
  url: string
  image: string | undefined  // Permitir que image sea string o undefined
  apartmentFeatures: Feature[]
  projectFeatures: Feature[]
  color: string 
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
      return {
        title: p.title,
        url: p.url,
        image: p.images?.[0], // Usamos correctamente el primer elemento del arreglo de imágenes
        apartmentFeatures: p.apartmentFeatures,
        projectFeatures: p.projectFeatures,
        color: p.color // Pasamos el color al estado del proyecto
      }
    })

    setProjects(mapped)
  }, [projectsRaw])

  if (!projects.length) return null

  return (
    <section className="bg-white py-2 px-10">
      <SectionTitle className="text-center mb-12">Nuestros Proyectos</SectionTitle>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-14">
        {projects.map((project, index) => (
          <div
            key={index}
            className="group border rounded-lg overflow-hidden shadow-lg transform w-[115%]"
            style={{ backgroundColor: project.color }} // Aplicamos el color de fondo de cada tarjeta
          >
            <a href={project.url} target="_blank" rel="noopener noreferrer" >
              <div className="relative w-full h-48">
                <Image
                  src={project.image || '/default-image.jpg'} // Imagen por defecto si no hay una válida
                  alt={project.title}
                  fill
                  className="object-cover group-hover:blur-none blur-[3px] transition duration-300 ease-in-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index === 0} // prioriza la primera imagen
                />
              </div>
              <div className="p-6">
                <SectionSubtitle className="text-xl font-semibold mb-4 text-white">
                  {project.title}
                </SectionSubtitle>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-white">
                    <Text className="text-lg font-semibold text-white">Apartamentos</Text>
                    <ul className="list-none space-y-2">
                      {project.apartmentFeatures.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2 mb-3">
                          <Text className="text-white text-[14px] text-left">{feature.title}:</Text>
                          <Text className="text-white text-[14px] text-left">{feature.value}</Text>
                        </li>
                      ))} 
                    </ul>
                  </div>

                  <div className="text-white">
                    <Text className="text-lg font-semibold text-white">Proyecto</Text>
                    <ul className="list-none space-y-4">
                      {project.projectFeatures.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2 mb-3">
                          <Text className="text-white text-[14px] text-left">{feature.title}:</Text>
                          <Text className="text-white text-[14px] text-left">{feature.value}</Text>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
