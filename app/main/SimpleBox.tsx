'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionTitle from '@/app/components/ui/SectionTitle'
import Button from '@/app/components/ui/Button'

type SimpleBoxData = {
  backgroundImage: string
  title: string
  buttonLabel: string
  buttonLink?: string
}

export default function SimpleBox() {
  const [data, setData] = useState<SimpleBoxData | null>(null)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  })

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => setData(data.simpleBox))
  }, [])

  if (!data) return null

  return (
    <section
      ref={ref}
      className="relative bg-cover bg-center h-[80vh] w-full flex items-center justify-center"
      style={{ backgroundImage: `url(${data.backgroundImage})` }}
    >
      <motion.div
        className="relative z-10 p-8 rounded-lg text-center max-w-md mx-auto border-4 border-[#454181] bg-white/90"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{
          duration: 0.8,
          ease: 'easeInOut',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: 0.3,
            ease: 'easeInOut',
          }}
        >
          <SectionTitle className="text-[#454181] mb-6">{data.title}</SectionTitle>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: 0.5,
            ease: 'easeInOut',
          }}
        >
          <Button bgColor="bg-[#454181]" textColor="text-white" href={data.buttonLink ?? '#'}>
            {data.buttonLabel}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
