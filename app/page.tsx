import Navbar from '@/app/components/Navbar'
import Hero from '@/app/main/Hero'
import CompanyInfo from '@/app/components/CompanyInfo'
import ProjectsCarousel from '@/app/main/ProjectsCarousel'
import Galery from '@/app/main/Galery'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import SimpleBox from './main/SimpleBox'
import MiniCarousel from './main/VideoCarousel'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero/>
      <CompanyInfo dataPath='companyInfo' />
      <ProjectsCarousel/>
      <Galery/>
      <SimpleBox/>
      <MiniCarousel/>
      <ContactForm/>
      <Footer/>
    </>
  )
}
