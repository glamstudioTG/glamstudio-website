import ContactInfoCard from "./contactInfoCard";
import { contactInfo } from "./contact.config";
import { RippleButton } from "@/src/components/ui/shadcn-io/ripple-button";

export default function ContactUsSection() {
  const message = encodeURIComponent(
    "Hola, quiero más información sobre sus servicios y disponibilidad. ¡Gracias!."
  );
  return (
    <section className="py-24 bg-[#fcf5e8]" id="contact">
      <div className=" mx-auto px-6 text-center max-w-152.5">
        <h2 className="font-mono text-3xl md:text-6xl text-black mb-4">
          Ponte en contacto
        </h2>

        <p className="text-[#716D6D] max-w-xl mx-auto mb-12">
          ¿Tienes alguna pregunta? Nos encantaría ayudarte. Envíanos un mensaje
          y te responderemos lo antes posible.
        </p>

        <h3 className="text-black font-semibold mb-6 max-w-151.75 text-start">
          Información de contacto
        </h3>

        <div className="flex flex-col items-center gap-10 mb-10">
          {contactInfo.map((item, index) => (
            <ContactInfoCard
              key={index}
              {...item}
              align={index % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>

        <div className="mb-10">
          <a
            href={`https://wa.me/573144455235?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <RippleButton>Enviar mensaje por WhatsApp</RippleButton>
          </a>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63670.555246180666!2d-73.62165519130879!3d4.139539723375516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3e2ea06875cb91%3A0x3ef123a7031a4ce7!2sCdad.%20Salitre%2C%20Villavicencio%2C%20Meta!5e0!3m2!1ses!2sco!4v1766771359661!5m2!1ses!2sco"
          width="800"
          height="260"
          loading="lazy"
          className="w-full rounded-2xl"
        ></iframe>
      </div>
    </section>
  );
}
