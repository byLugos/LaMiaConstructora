import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import HeroSmall from '../components/HeroSmall'
import ProjectIntroSection from './ProjectIntro'
import ProjectTechnical from './ProjectTechnical'
import Cards from './Cards'
export default function Galery() {
  return (
    <>
      <Navbar />
      <HeroSmall
      title='NUESTROS PROYECTOS'
      image='/alejandria_alt.webp'/>
      <ProjectIntroSection/>
      <ProjectTechnical projectName='alejandria' unitIndex={0}/>
      <Cards/>
      <Footer/>
    </>
  )
}
