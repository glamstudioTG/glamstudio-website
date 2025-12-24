import HeroSection from "./hero/HeroSection";
import ServiceSection from "./service/ServiceSection";
import GallerySection from "./galery/gallerySection";
import FormSection from "./form/formSection";
import AboutUsSection from "./aboutUs/AboutUsSection";

export default function LandingHome() {
  return (
    <>
      <HeroSection />
      <ServiceSection />
      <GallerySection />
      <FormSection />
      <AboutUsSection />
    </>
  );
}
