import Navbar from "@/app/components/Navbar";
import CompanyInfo from "@/app/components/CompanyInfo";
import Hero from "@/app/main/Hero";
// import ProjectsCarousel from "@/app/main/ProjectsCarousel";
// import SimpleBox from "./main/SimpleBox";
import MiniCarousel from "./main/VideoCarousel";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import ContactModal from "./components/ContactModal";
import WhatMakesUsDifferent from "./main/MakeUsDifferent";
import FloatingProjectsButton from "./main/FloatingProject";
import ProjectSlide from "./components/ProjectSlide";

export default function Home() {
  return (
    <>
      <FloatingProjectsButton />
      <Navbar />
      <Hero />
      <ContactModal />
      <CompanyInfo dataPath="companyInfo.general" />
      <WhatMakesUsDifferent />
      <ProjectSlide />
      {/* <ProjectsCarousel />
      <SimpleBox /> */}
      <MiniCarousel />
      <ContactForm />
      <Footer />
    </>
  );
}
