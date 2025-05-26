import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import HeroSmall from '../components/HeroSmall'
import Team from '@/app/ourteam/Team'
export default function Galery() {
  return (
    <>
      <Navbar />
      <HeroSmall
      title='QUIÉNES SOMOS'
      image='https://res.cloudinary.com/dwowtfmgn/image/upload/v1748301820/group_xwqjvw.jpg'/>
      <Team/>
      <Footer/>
    </>
  )
}
