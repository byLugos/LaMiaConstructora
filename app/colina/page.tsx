import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import HeroSmall from "../components/HeroSmall";
import ProjectIntro from '@/app/components/ProjectIntro'
import ProjectDetails from '@/app/components/ProjectTechnical'
import Cards from "./Cards";
export default function Galery() {
  return (
    <>
      <Navbar />
      <HeroSmall title="La Colina" image="/alejandria_alt.webp" />
      <ProjectIntro projectName='colina' logoWidth='100px' logoHeight='250'/>
      <ProjectDetails projectName="colina" unitIndex={0} />
      <Cards />
      <Footer />
    </>
  );
}
