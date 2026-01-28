import GallerySection from "./galery/gallerySection";
import FormSection from "./form/formSection";
import AboutUsSection from "./aboutUs/AboutUsSection";
import ContactUsSection from "./contactUs/contactUsSection";
import HeroServiceScene from "../service/scene/HeroServiceScene";
import AcademySection from "./academy/academySection";

export default function LandingHome() {
  return (
    <>
      <HeroServiceScene />
      <GallerySection />
      <AcademySection />
      <AboutUsSection />
      <ContactUsSection />
    </>
  );
}
