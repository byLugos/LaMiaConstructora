import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import HeroSmall from '../components/HeroSmall'
import Team from '@/app/ourteam/Team'
export default function Galery() {
  return (
    <>
      <Navbar />
      <HeroSmall
      title=''
      image='/equipo.jpg'/>
      <Team/>
      <Footer/>
    </>
  )
}
