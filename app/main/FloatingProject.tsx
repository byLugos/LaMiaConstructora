'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function FloatingProjectsButton() {
  const pathname = usePathname()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (pathname !== '/') {
      setShow(false)
      return
    }

    const onScroll = () => {
      if (window.scrollY > 150) setShow(true)
      else setShow(false)
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  if (pathname !== '/') return null

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.8 }}
          transition={{ duration: 0.8 }}
          className="fixed bottom-10 right-8 z-50 shadow-xl shadow-[#454181]/30"
        >
          <Link
            href="/projects"
            className="bg-[#454181] text-white px-6 py-3 rounded-full font-semibold text-lg hover:opacity-90 transition"
            aria-label="Ir a Proyectos"
          >
            Proyectos
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
