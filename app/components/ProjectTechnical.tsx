'use client'

import { useEffect, useState } from 'react'
import SectionTitle from '@/app/components/ui/SectionTitle'
import Text from '@/app/components/ui/Text'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Pagination } from 'swiper/modules'
import 'swiper/css/pagination'

import {
  FaBath,
  FaBed,
  FaTshirt,
  FaUtensils,
  FaShower,
  FaCar,
  FaCouch,
  FaDoorOpen,
} from 'react-icons/fa'

import Image from 'next/image'

type TechnicalFeature = {
  title: string
  value: string
}

type TechnicalUnit = {
  unitTitle: string
  planos: string[]
  features: TechnicalFeature[]
  description: string
  icons: string[]
}

type ProjectTechnicalDetailsData = {
  units: TechnicalUnit[]
}

const iconMap: { [key: string]: React.ReactElement } = {
  Baños: <FaBath className="w-6 h-6 text-[#454181]" />,
  Habitaciones: <FaBed className="w-6 h-6 text-[#454181]" />,
  'Zona de ropa': <FaTshirt className="w-6 h-6 text-[#454181]" />,
  Cocina: <FaUtensils className="w-6 h-6 text-[#454181]" />,
  Bañera: <FaShower className="w-6 h-6 text-[#454181]" />,
  Parqueadero: <FaCar className="w-6 h-6 text-[#454181]" />,
  Sala: <FaCouch className="w-6 h-6 text-[#454181]" />,
  Entrada: <FaDoorOpen className="w-6 h-6 text-[#454181]" />,
}

interface Props {
  projectName: string
  unitIndex?: number
}

export default function ProjectTechnicalDetails({
  projectName,
  unitIndex = 0,
}: Props) {
  const [data, setData] = useState<ProjectTechnicalDetailsData | null>(null)

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((json) => {
        const technicalDetails = json.projects?.[projectName]?.technicalDetails
        setData(technicalDetails ?? null)
      })
  }, [projectName])

  if (!data || !data.units || !data.units[unitIndex]) return null

  const unit = data.units[unitIndex]

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row gap-12 bg-white">
      <div className="lg:w-1/2">
        <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="rounded-lg overflow-hidden shadow-lg"
          spaceBetween={10}
          slidesPerView={1}
        >
          {unit.planos.map((plano, i) => (
            <SwiperSlide key={i}>
              <Image
                src={plano}
                alt={`Plano ${i + 1}`}
                width={800}   // Ajusta el tamaño adecuado
                height={320}  // Ajusta según proporción
                className="object-cover rounded-lg"
                priority={i === 0} // Prioriza la primera imagen para LCP
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="lg:w-1/2 flex flex-col justify-start">
        <SectionTitle className="mb-4">{unit.unitTitle}</SectionTitle>

        <ul className="flex flex-wrap gap-6 mb-6">
          {unit.features.map((feature, i) => (
            <li
              key={i}
              className="flex items-center gap-2 bg-[#F8F8F8] p-3 rounded-md shadow w-50"
            >
              <Text className="font-semibold text-[#454181]">
                {feature.title}:
              </Text>
              <Text>{feature.value}</Text>
            </li>
          ))}
        </ul>

        <Text className="mb-8">{unit.description}</Text>

        <ul className="grid grid-cols-4 gap-6">
          {unit.icons.map((iconTitle, i) => (
            <li
              key={i}
              className="flex flex-col items-center text-[#454181]"
            >
              {iconMap[iconTitle] || <span className="w-4 h-6" />}
              <Text className="text-sm text-[#454181]">{iconTitle}</Text>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
