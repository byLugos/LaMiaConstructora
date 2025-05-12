import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import HeroSmall from '../components/HeroSmall'
import CompanyInfo from '../components/CompanyInfo'
import WhyUs from './WhyUs'
export default function Galery() {
  return (
    <>
      <Navbar />
      <HeroSmall
      title='NUESTROS PROYECTOS'
      image='/alejandria.webp'/>
      <CompanyInfo dataPath='nosotrosPromociones'/>
      <WhyUs/>
      <Footer/>
    </>
  )
}
