'use client'

import Link from 'next/link'
import { FiMenu, FiX } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { useEffect, useState, useRef } from 'react'
import Text from '@/app/components/ui/Text'

type NavigationItem = {
  label: string
  link: string
}

export default function Navbar() {
  const [telefonos, setTelefonos] = useState<string[]>([])
  const [links, setLinks] = useState<NavigationItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [currentWhatsappIndex, setCurrentWhatsappIndex] = useState(0)

  const isRotatingRef = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)

    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => {
        if (data.navigation?.items) setLinks(data.navigation.items)

        if (data.companyInfo?.general?.contact) {
          const contact = data.companyInfo.general.contact
          const nums = [
            contact.phoneOne,
            contact.phoneTwo,
            contact.phoneThree
          ]
            .filter(Boolean)
            .map((num: string) => num.replace(/\D/g, ''))
          setTelefonos(nums)
        }
      })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleWhatsappClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (telefonos.length === 0) return

    const numero = telefonos[currentWhatsappIndex]
    const url = `https://wa.me/${numero}`
    window.open(url, '_blank')

    if (!isRotatingRef.current) {
      isRotatingRef.current = true
      setTimeout(() => {
        setCurrentWhatsappIndex((prev) => (prev + 1) % telefonos.length)
        isRotatingRef.current = false
      }, 1000) 
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/85 shadow-md' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo La Mía" className="h-12" />
        </div>

        <nav className="hidden md:flex gap-8 text-[20px] font-normal text-black items-center">
          {links.map((link) => (
            <Text key={link.link} className="font-extrabold hover:text-[#454181]">
              <Link href={link.link}>{link.label}</Link>
            </Text>
          ))}

          {telefonos.length > 0 && (
            <button
              onClick={handleWhatsappClick}
              className="hidden md:flex items-center justify-center pr-6 text-black hover:text-[#454181] transition-colors"
              aria-label="Abrir WhatsApp"
            >
              <FaWhatsapp size={35} />
            </button>
          )}
        </nav>

        <button
          className="md:hidden text-2xl text-[#454181]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white/80 shadow-md px-4 pb-4 space-y-4">
          {links.map((link) => (
            <Text key={link.link} className="hover:text-[#454181]">
              <Link href={link.link}>{link.label}</Link>
            </Text>
          ))}
          {telefonos.length > 0 && (
            <button
              onClick={handleWhatsappClick}
              className="flex items-center gap-2 text-[#454181] font-semibold"
              aria-label="Abrir WhatsApp"
            >
              <FaWhatsapp size={25} />
              WhatsApp
            </button>
          )}
        </div>
      )}
    </header>
  )
}
