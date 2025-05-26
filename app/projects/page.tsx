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
      image='https://res.cloudinary.com/dwowtfmgn/image/upload/v1748298098/fondoHero_dos_srn63q.webp'/>
      <CompanyInfo dataPath='promotions'/>
      <Cards/>
      <WhyUs/>
      <Footer/>
    </>
  )
}
