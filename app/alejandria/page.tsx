import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import HeroSmall from '../components/HeroSmall'
import ProjectIntro from '@/app/components/ProjectIntro'
import ProjectDetails from '@/app/components/ProjectTechnical'
import Cards from './Cards'
export default function Galery() {
  return (
    <>
      <Navbar />
      <HeroSmall
      title='Alejandría'
      image='/alejandria_alt.webp'/>
      <ProjectIntro projectName='alejandria' logoWidth='250px' logoHeight='200'/>
      <ProjectDetails projectName='alejandria' unitIndex={0}/>
      <Cards/>
      <Footer/>
    </>
  )
}
