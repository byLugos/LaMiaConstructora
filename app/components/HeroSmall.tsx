'use client'

import { motion } from 'framer-motion'

import Title from "@/app/components/ui/Title"

type HeroSmallProps = {
  title: string
  image: string
}

export default function HeroSmall({ title, image }: HeroSmallProps) {
  return (
    <section className="relative h-[50vh] w-full overflow-hidden bg-white px-4">
      <motion.img
        key={image}
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover rounded-[25px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />
      
      <div className="absolute inset-0 bg-black/50 z-0 rounded-[25px]" />

      <div className="relative z-10 h-full flex items-center justify-center px-8 max-w-7xl mx-auto text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <Title color="text-white" className="text-4xl font-semibold mb-6 text-center">
            {title}
          </Title>
        </motion.div>
      </div>
    </section>
  )
}
