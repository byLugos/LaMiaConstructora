'use client'

import { useEffect, useState } from 'react'
import SectionTitle from '@/app/components/ui/SectionTitle'
import { motion } from 'framer-motion'

type GaleriaItem = {
  title: string
  image: string
  category: string 
}

export default function Galery() {
  const [items, setItems] = useState<GaleriaItem[]>([])
  const [filteredItems, setFilteredItems] = useState<GaleriaItem[]>([])
  const [activeCategory, setActiveCategory] = useState<string>('') 

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        setItems(data.gallery)
        const categoriasUnicas = Array.from(new Set(data.gallery.map((i: GaleriaItem) => i.category)))
        setActiveCategory(categoriasUnicas[0] || '')
        setFilteredItems(data.gallery.filter((i: GaleriaItem) => i.category === categoriasUnicas[0]))
      })
  }, [])

  const filterItems = (category: string) => {
    setActiveCategory(category)
    setFilteredItems(items.filter(item => item.category === category))
  }
  const categories = Array.from(new Set(items.map(item => item.category)))
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
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                style={{ display: 'block' }} 
              />
              <div className="absolute bottom-1 left-1 bg-black bg-opacity-60 px-1.5 py-0.5 rounded text-xs text-white select-none pointer-events-none">
                {item.title}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


