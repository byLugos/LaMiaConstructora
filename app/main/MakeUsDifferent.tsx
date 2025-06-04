'use client'

import { useEffect, useState } from "react"
import SectionTitle from "@/app/components/ui/SectionTitle"
import SectionSubtitle from "@/app/components/ui/SectionSubtitle"
import Text from "@/app/components/ui/Text"
import { FaCheckCircle } from "react-icons/fa"
import Image from "next/image"

type Differentiator = {
  image: string
  title: string
  subtitle: string
  items: string[]
}

export default function WhatMakesUsDifferent() {
  const [data, setData] = useState<Differentiator[]>([])

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((json) => {
        if (json.makeUsDifferent) {
          setData(json.makeUsDifferent)
        }
      })
  }, [])

  if (!data.length) return null

  return (
    <section className="bg-white py-10 px-6 w-full mx-auto">
      <SectionTitle className="text-center mb-16 text-[black]">
        ¿Por qué somos diferentes?
      </SectionTitle>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {data.map((card, idx) => (
          <div
            key={idx}
            className="flex flex-col bg-[#f8f8f8] rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 max-w-xs mx-auto"
            style={{ height: "auto" }}
          >
            <div className="relative w-full h-[192px]">
              <Image
                src={card.image}
                alt={card.title}
                layout="fill"
                style={{ objectFit: "cover" }}
                priority={idx === 0} // Prioriza la primera imagen si quieres
                className="rounded-t-xl"
              />
            </div>

            <div className="p-6 flex flex-col flex-grow justify-between">
              <div>
                <SectionSubtitle className="text-xl font-semibold mb-4 text-[#454181]">
                  {card.title}
                </SectionSubtitle>
                <Text className="mb-4">{card.subtitle}</Text>
              </div>

              <ul className="space-y-6">
                {card.items.map((item, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <FaCheckCircle className="h-5 text-[#454181] mr-2 flex-shrink-0" />
                    <Text>{item}</Text>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
