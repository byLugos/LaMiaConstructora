'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt
} from 'react-icons/fa'
import Button from '@/app/components/ui/Button'
import Subtitle from './ui/SectionSubtitle'

type SocialItem = {
  name: string
  icon: string
  url: string
}

type ContactInfo = {
  phone: string
  email: string
  whatsapp?: string
  address: string
}

type CompanyInfo = {
  general: {
    name: string
    description: string
    contact: ContactInfo
  }
  socials: SocialItem[]
  legal: string
}

export default function Footer() {
  const [data, setData] = useState<CompanyInfo | null>(null)

  const { ref: topRef, inView: topInView } = useInView({ triggerOnce: true, threshold: 0.5 })
  const { ref: bottomRef, inView: bottomInView } = useInView({ triggerOnce: true, threshold: 0.5 })

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => setData(data.companyInfo))
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
      {/* Newsletter section: No definido en JSON, puedes agregar o eliminar */}
      {/* Aquí dejo comentado por si decides añadir newsletter después */}
      {/* 
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
            <Subtitle>NEWSLETTER</Subtitle>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center">
              <input
                type="text"
                placeholder="Ingresa tu correo"
                className="px-4 py-3 rounded-md border border-gray-400 w-full sm:w-72 text-black"
              />
              <Button>Suscribirse</Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={topInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Subtitle>REDES SOCIALES</Subtitle>
            <div className="flex flex-wrap gap-6 mt-6 justify-center md:justify-start">
              {data.socials.map(item => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center text-center text-sm"
                  aria-label={item.name}
                >
                  <div className="text-2xl mb-1">{iconMap[item.icon] || <span />}</div>
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
      */}

      {/* Bottom info section */}
      <motion.div
        ref={bottomRef}
        className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8"
        initial={{ opacity: 0, y: 30 }}
        animate={bottomInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="col-span-1">
          <img src="/logo.png" alt="Logo La Mía" className="h-20 mb-4" />
        </div>
        <div>
          <h4 className="font-bold mb-4">{data.general.name}</h4>
          <p className="text-sm">{data.general.description}</p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Contacto</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FaPhone /> {data.general.contact.phone}
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope /> {data.general.contact.email}
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt /> {data.general.contact.address}
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Redes Sociales</h4>
          <div className="flex flex-wrap gap-6 mt-6 justify-start">
            {data.socials.map(item => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-center text-sm"
                aria-label={item.name}
              >
                <div className="text-2xl mb-1">{iconMap[item.icon] || <span />}</div>
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="text-center text-sm text-gray-500 py-4 border-t border-gray-300">
        {data.legal}
      </div>
    </footer>
  )
}
