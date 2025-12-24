import Image from "next/image";
import meImage from "@/public/images/landing/4763f4ea1c606ab46ca79652a645a336 2.png";

export default function AboutUsSection() {
  return (
    <section className="bg-[#FFEFD3] py-24 px-4">
      <div className="max-w-[1122px] mx-auto border-2 border-[#C2A85D] rounded-xl px-8 py-16">
        <h2 className="text-center font-mono text-3xl md:text-5xl text-black mb-16 max-w-[520px] mx-auto">
          La historia detrás de GlamStudio
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="text-black text-[18px] leading-relaxed space-y-6 pl-12">
            <p>
              GlamStudio TG nació en 2022 del amor y la pasión de Tatiana Gómez
              por el mundo de la belleza.
            </p>
            <p>
              Comenzó como un emprendimiento de pestañas y hoy es un espacio de
              formación donde más personas pueden aprender, crecer y emprender.
            </p>
            <p>
              Nuestra misión siempre ha sido ofrecer un servicio de calidad, con
              dedicación en cada detalle. Buscamos resaltar la belleza exterior,
              pero también inspirar seguridad, autenticidad y empoderamiento.
            </p>
            <p>
              GlamStudio TG es más que un estudio: es la prueba de que los
              sueños se construyen con constancia, fe y amor.
            </p>
          </div>

          <div className="relative flex justify-center">
            <div className="absolute left-6 bottom-6 w-[310px] h-[387px] border-2 border-[#C2A85D] rounded-xl" />

            <div className="relative z-10 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={meImage}
                alt="GlamStudio"
                width={310}
                height={387}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
