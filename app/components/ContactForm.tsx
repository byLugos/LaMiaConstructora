'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionTitle from '@/app/components/ui/SectionTitle'
import Text from '@/app/components/ui/Text'
import Button from '@/app/components/ui/Button'

type FormContent = {
  title: string
  description: string
  button: string
  successMessage: string
  placeholders: {
    name: string
    lastname: string
    email: string
    phone: string
    message: string
  }
}

export default function ContactForm() {
  const [data, setData] = useState<FormContent | null>(null)
  const [enviado, setEnviado] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    message: ''
  })

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  })

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => setData(data.forms.contact))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEnviado(true)
    setFormData({ name: '', lastname: '', email: '', phone: '', message: '' })
    setTimeout(() => setEnviado(false), 5000)
  }

  if (!data) return null

  return (
    <section
      ref={ref}
      className="bg-[#131A24] text-white py-20 px-6 text-center overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <SectionTitle color="text-white" className="mb-4">
          {data.title}
        </SectionTitle>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Text color="text-white/80" className="mb-12">
          {data.description}
        </Text>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <input
          type="text"
          name="name"
          placeholder={data.placeholders.name}
          value={formData.name}
          onChange={handleChange}
          required
          className="p-4 rounded-md text-black"
        />
        <input
          type="text"
          name="lastname"
          placeholder={data.placeholders.lastname}
          value={formData.lastname}
          onChange={handleChange}
          required
          className="p-4 rounded-md text-black"
        />
        <input
          type="email"
          name="email"
          placeholder={data.placeholders.email}
          value={formData.email}
          onChange={handleChange}
          required
          className="p-4 rounded-md text-black md:col-span-1"
        />
        <input
          type="tel"
          name="phone"
          placeholder={data.placeholders.phone}
          value={formData.phone}
          onChange={handleChange}
          required
          className="p-4 rounded-md text-black md:col-span-1"
        />
        <textarea
          name="message"
          placeholder={data.placeholders.message}
          value={formData.message}
          onChange={handleChange}
          required
          className="p-4 rounded-md text-black md:col-span-2 min-h-[150px]"
        />
        <div className="md:col-span-2 flex justify-center mt-4">
          <Button type="submit">{data.button}</Button>
        </div>
      </motion.form>

      {enviado && (
        <motion.p
          className="mt-6 text-white/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          role="alert"
        >
          {data.successMessage}
        </motion.p>
      )}
    </section>
  )
}
