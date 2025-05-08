import Navbar from '@/app/components/Navbar'
import Hero from '@/app/components/Hero'
import CompanyInfo from '@/app/components/CompanyInfo'
import ProjectsCarousel from '@/app/components/ProjectsCarousel'
import Galery from '@/app/components/Galery'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero/>
      <CompanyInfo />
      <ProjectsCarousel/>
      <Galery/>
      <ContactForm/>
      <Footer/>
      {/* Aquí vendrá Hero y demás secciones */}
    </>
  )
}
