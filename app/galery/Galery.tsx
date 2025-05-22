'use client'

import { useEffect, useState } from 'react'
import SectionTitle from '@/app/components/ui/SectionTitle'
import { motion } from 'framer-motion'

type GaleriaItem = {
  titulo: string
  imagen: string
  categoria: string 
}

export default function Galery() {
  const [items, setItems] = useState<GaleriaItem[]>([])
  const [filteredItems, setFilteredItems] = useState<GaleriaItem[]>([])
  const [activeCategory, setActiveCategory] = useState<string>('') 

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        setItems(data.galeria)
        const categoriasUnicas = Array.from(new Set(data.galeria.map((i: GaleriaItem) => i.categoria)))
        setActiveCategory(categoriasUnicas[0] || '')
        setFilteredItems(data.galeria.filter((i: GaleriaItem) => i.categoria === categoriasUnicas[0]))
      })
  }, [])

  const filterItems = (category: string) => {
    setActiveCategory(category)
    setFilteredItems(items.filter(item => item.categoria === category))
  }

  // Sólo categorías reales, sin 'all'
  const categories = Array.from(new Set(items.map(item => item.categoria)))

  if (!items.length) return null

  return (
    <section className="bg-white py-20 px-0 w-full">
      {/* El contenedor ocupa 100% ancho */}
      <div className="w-full">
        <SectionTitle className="text-center mb-12 text-[#131A24]">
          NUESTRA GALERÍA
        </SectionTitle>

        {/* Botones de filtro */}
        <div className="text-center mb-8">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => filterItems(category)}
              className={`py-2 px-6 mx-2 rounded-md font-semibold transition-colors duration-300 ${
                activeCategory === category 
                  ? 'bg-[#454181] text-white' 
                  : 'bg-[#F5AA4D]/50 text-white hover:bg-[#d7932e]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 w-full">
          {filteredItems.map((item, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-none aspect-[4/3]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <img
                src={item.imagen}
                alt={item.titulo}
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                style={{ display: 'block' }} 
              />
              <div className="absolute bottom-1 left-1 bg-black bg-opacity-60 px-1.5 py-0.5 rounded text-xs text-white select-none pointer-events-none">
                {item.titulo}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


