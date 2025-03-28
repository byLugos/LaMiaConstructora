import Navbar from '@/app/components/Navbar'
import Hero from '@/app/components/Hero'
import CompanyInfo from '@/app/components/CompanyInfo'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero/>
      <CompanyInfo />
      <ContactForm/>
      <Footer/>
      {/* Aquí vendrá Hero y demás secciones */}
    </>
  )
}
