'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionTitle from '@/app/components/ui/SectionTitle'
import Text from '@/app/components/ui/Text'
import Button from '@/app/components/ui/Button'

type Info = {
  titulo: string
  descripcion: string
  boton: {
    texto: string
    link: string
  }
}

type CompanyInfoProps = {
  dataPath: string; // Ruta o clave del JSON a consumir
}

export default function CompanyInfo({ dataPath }: CompanyInfoProps) {
  const [info, setInfo] = useState<Info | null>(null)

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  })

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => setInfo(data[dataPath])) // Usamos la prop dataPath para acceder a la clave del JSON
  }, [dataPath])

  if (!info) return null

  return (
    <section
      ref={ref}
      className="bg-white py-20 px-6 text-center overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <SectionTitle className="mb-6">{info.titulo}</SectionTitle>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-3xl mx-auto mb-8"
      >
        <Text className='mb-4'>{info.descripcion}</Text>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Button href={info.boton.link}>{info.boton.texto}</Button>
      </motion.div>
    </section>
  )
}
