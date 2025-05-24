import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import HeroSmall from '../components/HeroSmall'
import CompanyInfo from '../components/CompanyInfo'
import WhyUs from './WhyUs'
import Cards from './Cards'
export default function Galery() {
  return (
    <>
      <Navbar />
      <HeroSmall
      title='NUESTROS PROYECTOS'
      image='/fondoHero_dos.webp'/>
      <CompanyInfo dataPath='promotions'/>
      <Cards/>
      <WhyUs/>
      <Footer/>
    </>
  )
}
