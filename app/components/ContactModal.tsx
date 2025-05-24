'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type PromotionData = {
  title: string
  description: string
  imageUrl: string
}

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [promoData, setPromoData] = useState<PromotionData | null>(null)
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    ciudad: '',
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        if (data.promotionsNow) {
          setPromoData({
            title: data.promotionsNow.title,
            description: data.promotionsNow.description,
            imageUrl: data.promotionsNow.imageUrl,
          })
        }
      })

    const modalShown = sessionStorage.getItem('contactModalShown')
    if (!modalShown) {
      setIsOpen(true)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    sessionStorage.setItem('contactModalShown', 'true')
  }

  if (!promoData) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay general */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal container */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 0.8, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
          >
            <div
              className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full flex overflow-hidden"
              onClick={e => e.stopPropagation()}
              style={{ minHeight: '400px' }}
            >
              {/* Imagen lateral */}
              <div
                className="hidden md:block relative rounded-l-3xl flex-shrink-0"
                style={{
                  width: '50%',
                  height: 'auto',
                  minHeight: '400px',
                  backgroundImage: `url(${promoData.imageUrl})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  position: 'relative',
                  zIndex: 0,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(69, 65, 129, 0.2)',
                    zIndex: 1,
                    borderTopLeftRadius: '1.5rem',
                    borderBottomLeftRadius: '1.5rem',
                  }}
                />
              </div>

              {/* Formulario y contenido */}
              <div className="w-full md:w-2/3 p-8 md:p-12 relative z-10 flex flex-col">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 font-bold text-3xl cursor-pointer"
                  aria-label="Cerrar modal"
                >
                  &times;
                </button>

                {/* Título y descripción */}
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-2 text-[#454181]">{promoData.title}</h2>
                  <p className="text-gray-700">{promoData.description}</p>
                </div>

                {!submitted ? (
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 flex-grow">
                    <input
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      placeholder="Nombre"
                      className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#454181]"
                    />
                    <input
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleChange}
                      required
                      placeholder="Apellido"
                      className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#454181]"
                    />
                    <input
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                      placeholder="Teléfono"
                      type="tel"
                      className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#454181]"
                    />
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Correo electrónico"
                      type="email"
                      className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#454181]"
                    />
                    <input
                      name="ciudad"
                      value={formData.ciudad}
                      onChange={handleChange}
                      required
                      placeholder="Ciudad"
                      className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#454181]"
                    />
                    <button
                      type="submit"
                      className="bg-[#454181] text-white py-3 rounded-lg font-semibold hover:bg-[#333766] transition"
                    >
                      Enviar
                    </button>
                  </form>
                ) : (
                  <div className="text-center mt-16">
                    <h3 className="text-2xl font-semibold mb-6 text-[#454181]">
                      ¡Gracias por contactarnos!
                    </h3>
                    <button
                      onClick={handleClose}
                      className="bg-[#454181] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#333766] transition"
                    >
                      Cerrar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
