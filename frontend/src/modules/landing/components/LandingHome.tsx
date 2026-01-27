import HeroSection from "./hero/HeroSection";
import ServiceSection from "./service/ServiceSection";
import GallerySection from "./galery/gallerySection";
import FormSection from "./form/formSection";
import AboutUsSection from "./aboutUs/AboutUsSection";
import ContactUsSection from "./contactUs/contactUsSection";
import HeroServiceScene from "../service/scene/HeroServiceScene";

export default function LandingHome() {
  return (
    <>
      <HeroServiceScene />
      <GallerySection />
      <FormSection />
      <AboutUsSection />
      <ContactUsSection />
    </>
  );
}
