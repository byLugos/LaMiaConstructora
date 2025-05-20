import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import HeroSmall from '../components/HeroSmall'
import Galerys from './Galery'
import AboutUs from './AboutUs'

export default function Galery() {
  return (
    <>
      <Navbar />
      <HeroSmall
      title='Galería'
      image='/fondoHero.webp'/>
      <Galerys/>
      <AboutUs />
      <Footer/>
    </>
  )
}
