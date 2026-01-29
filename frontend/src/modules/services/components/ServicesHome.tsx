import ServiceCategories from "./category/ServiceCategories";

export default function ServiceHome() {
  return (
    <section className="bg-[#FFEAEA] py-36 px-8">
      <h1 className="font-mono text-black text-2xl md:text-6xl text-center mb-24">
        Nuestros Servicios
      </h1>
      <ServiceCategories />
    </section>
  );
}
