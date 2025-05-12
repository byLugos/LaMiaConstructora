'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import Button from '@/app/components/ui/Button'
import Subtitle from './ui/SectionSubtitle'

export default function Footer() {
  const [data, setData] = useState<any>(null)

  const { ref: topRef, inView: topInView } = useInView({ triggerOnce: true, threshold: 0.5 })
  const { ref: bottomRef, inView: bottomInView } = useInView({ triggerOnce: true, threshold: 0.5 })

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => setData(data.footer))
  }, [])

  if (!data) return null

  const iconMap: Record<string, JSX.Element> = {
    facebook: <FaFacebookF />,
    twitter: <FaTwitter />,
    instagram: <FaInstagram />,
    linkedin: <FaLinkedinIn />,
    youtube: <FaYoutube />
  }

  return (
    <footer className="bg-white text-[#131A24]">
      <motion.div
        ref={topRef}
        className="bg-[#F2F3F5] border-b border-gray-300"
        initial={{ opacity: 0, y: 30 }}
        animate={topInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={topInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Subtitle>{data.newsletter.titulo}</Subtitle>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center">
              <input
                type="text"
                placeholder={data.newsletter.placeholder}
                className="px-4 py-3 rounded-md border border-gray-400 w-full sm:w-72 text-black"
              />
              <Button>{data.newsletter.boton}</Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={topInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Subtitle>{data.sociales.titulo}</Subtitle>
            <div className="flex flex-wrap gap-6 mt-6 justify-center md:justify-start">
              {data.sociales.items.map((item: any) => (
                <div key={item.nombre} className="flex flex-col items-center text-center text-sm">
                  <div className="text-2xl mb-1">{iconMap[item.icono]}</div>
                  {item.nombre}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        ref={bottomRef}
        className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8"
        initial={{ opacity: 0, y: 30 }}
        animate={bottomInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="col-span-1">
          <img src="/salida.webp" alt="Logo La Mía" className="h-20 mb-4" />
        </div>
        <div>
          <h4 className="font-bold mb-4">LOREM IPSUM</h4>
          <ul className="space-y-1 text-sm">
            <li>Lorem</li>
            <li>Ipsum Is Simply</li>
            <li>Dummy</li>
            <li>Text Of The</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">LOREM IPSUM</h4>
          <ul className="space-y-1 text-sm">
            <li>Lorem</li>
            <li>Ipsum Is Simply</li>
            <li>Dummy</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">LOREM IPSUM</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FaPhone /> {data.contacto.telefono}
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope /> {data.contacto.correo}
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt /> {data.contacto.direccion}
            </li>
          </ul>
        </div>
      </motion.div>

      <div className="text-center text-sm text-gray-500 py-4 border-t border-gray-300">
        {data.legal}
      </div>
    </footer>
  )
}
