import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import HeroSmall from "../components/HeroSmall";
import Galerys from "./Galery";
import AboutUs from "./AboutUs";
import MapComponent from "./Map";

export default function Galery() {
  return (
    <>
      <Navbar />
      <HeroSmall
        title="SALA DE VENTAS"
        image="https://res.cloudinary.com/dwowtfmgn/image/upload/v1748298097/fondoHero_ykqj1n.webp"
      />
      <AboutUs />
      <MapComponent/>
      <Galerys />
      <Footer />
    </>
  );
}
