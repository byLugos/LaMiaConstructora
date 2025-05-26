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
      image='https://res.cloudinary.com/dwowtfmgn/image/upload/v1748298097/fondoHero_ykqj1n.webp'/>
      <Galerys/>
      <AboutUs />
      <Footer/>
    </>
  )
}
