import Navbar from "@/app/components/Navbar";
import Hero from "@/app/main/Hero";
import CompanyInfo from "@/app/components/CompanyInfo";
import ProjectsCarousel from "@/app/main/ProjectsCarousel";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import SimpleBox from "./main/SimpleBox";
import MiniCarousel from "./main/VideoCarousel";
import ContactModal from "./components/ContactModal";

export default function Home() {
  return (
    <>
      <Navbar />
      <ContactModal />
      <Hero />
      <CompanyInfo dataPath="companyInfo.general" />
      <ProjectsCarousel />
      <MiniCarousel />
      <SimpleBox />
      <ContactForm />
      <Footer />
    </>
  );
}
