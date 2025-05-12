'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SectionTitle from '@/app/components/ui/SectionTitle'
import SectionSubtitle from '@/app/components/ui/SectionSubtitle'
import Text from '@/app/components/ui/Text'

type SectionContent = {
  titulo: string
  titulodos : string
  descripcion: string
}

export default function WhyUs() {
  const [content, setContent] = useState<SectionContent | null>(null)

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => setContent(data.whyus))
  }, [])

  if (!content) return null

  return (
    <section className="bg-white py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <SectionTitle className="text-center mb-6">{content.titulo}</SectionTitle>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <SectionSubtitle>{content.titulodos}</SectionSubtitle>
            <Text>{content.descripcion}</Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <SectionSubtitle>{content.titulodos}</SectionSubtitle>
            <Text>{content.descripcion}</Text>
          </motion.div>
        </div>

        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-6"
          >
            <SectionSubtitle>{content.titulodos}</SectionSubtitle>
            <Text>{content.descripcion}</Text>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

