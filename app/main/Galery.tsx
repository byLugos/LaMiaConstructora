'use client'

import { useEffect, useState } from 'react'
import SectionTitle from '@/app/components/ui/SectionTitle'

type GaleriaItem = {
  titulo: string
  imagen: string
}

export default function Galeria() {
  const [items, setItems] = useState<GaleriaItem[]>([])

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => setItems(data.galeria))
  }, [])

  if (!items.length) return null

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle className="text-center mb-12 text-[#131A24]">
          NUESTRA GALERÍA
        </SectionTitle>

        <div className="grid grid-cols-6 gap-4 auto-rows-[150px]">
          {items.map((item, index) => {
            const span = [0, 1, 6, 7].includes(index) ? 'col-span-3' : 'col-span-2'
            const rowSpan = [2].includes(index) ? 'row-span-2' : ''

            return (
              <div
                key={index}
                className={`relative overflow-hidden rounded-xl bg-gray-200 ${span} ${rowSpan} flex items-end`}
              >
                <img
                  src={item.imagen}
                  alt={item.titulo}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-10 bg-black/40 w-full text-center py-2 text-white font-semibold">
                  {item.titulo}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
