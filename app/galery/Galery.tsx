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
  const [activeCategory, setActiveCategory] = useState<string>('all') 
  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        setItems(data.galeria)
        setFilteredItems(data.galeria) 
      })
  }, [])

  const filterItems = (category: string) => {
    setActiveCategory(category)
    if (category === 'all') {
      setFilteredItems(items)
    } else {
      setFilteredItems(items.filter(item => item.categoria === category))
    }
  }

const categories = ['all', ...Array.from(new Set(items.map(item => item.categoria)))];

  if (!items.length) return null

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle className="text-center mb-12 text-[#131A24]">
          NUESTRA GALERÍA
        </SectionTitle>

        <div className="text-center mb-8">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => filterItems(category)}
              className={`${
                activeCategory === category ? 'bg-[#454181] text-white'  : 'bg-[#F5AA4D]'
              } py-2 px-6 mx-2 rounded-md font-semibold`}
            >
              {category === 'all' ? 'Todas' : category}
            </button>
          ))}
        </div>

        {/* Galería */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-lg bg-gray-200 flex justify-center items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img
                src={item.imagen}
                alt={item.titulo}
                className="w-full h-full object-cover transform hover:scale-105 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-black/50 flex justify-center items-center">
                <p className="text-white text-lg font-semibold">{item.titulo}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
