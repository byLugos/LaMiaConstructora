'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import SectionTitle from '@/app/components/ui/SectionTitle'
import SectionSubtitle from '@/app/components/ui/SectionSubtitle'
import Text from '@/app/components/ui/Text'

type Empleado = {
  name: string
  image: string
  description: string
}

export default function Team() {
  const [empleados, setEmpleados] = useState<Empleado[]>([])

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => setEmpleados(data.team))
  }, [])

  if (!empleados.length) return null

  return (
    <section className="bg-white py-20 px-6">
      <SectionTitle className="text-center mb-12">Nuestro Equipo</SectionTitle>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {empleados.map((empleado, index) => (
          <div
            key={index}
            className="bg-[#F8F8F8] p-6 rounded-lg shadow-lg transform hover:scale-105 duration-300 ease-in-out"
          >
            <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
              <Image
                src={empleado.image}
                alt={empleado.name}
                layout='fill'
                style={{ objectFit: 'cover' }}
                sizes="128px"
                priority={index === 0} // Carga prioritaria solo para la primera imagen
              />
            </div>
            <SectionSubtitle className="text-center text-[#454181]">{empleado.name}</SectionSubtitle>
            <Text className="text-center text-sm text-[#454181]">{empleado.description}</Text>
          </div>
        ))}
      </div>
    </section>
  )
}
