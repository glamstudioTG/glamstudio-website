"use client";

import { motion, easeOut, easeInOut } from "framer-motion";
import ContactInfoCard from "./contactInfoCard";
import { contactInfo } from "./contact.config";
import { RippleButton } from "@/src/components/ui/shadcn-io/ripple-button";
import { MessageCircleMore } from "lucide-react";

const headerVariants = {
  initial: { opacity: 0, y: 24, filter: "blur(6px)" },
  enter: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: easeOut },
  },
  exit: {
    opacity: 0,
    y: 16,
    transition: { duration: 0.4, ease: easeInOut },
  },
};

const listVariants = {
  initial: {},
  enter: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  initial: (align: "left" | "right") => ({
    opacity: 0,
    x: align === "left" ? -24 : 24,
  }),
  enter: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
  exit: (align: "left" | "right") => ({
    opacity: 0,
    x: align === "left" ? -12 : 12,
    transition: { duration: 0.3, ease: easeInOut },
  }),
};

const ctaVariants = {
  initial: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
  exit: {
    opacity: 0,
    y: 12,
    transition: { duration: 0.3, ease: easeInOut },
  },
};

const mapVariants = {
  initial: { opacity: 0, scale: 0.98 },
  enter: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
};

export default function ContactUsSection() {
  const message = encodeURIComponent(
    "Hola, quiero más información sobre sus servicios y disponibilidad. ¡Gracias!.",
  );

  return (
    <section className="py-24 bg-[#FFEAEA]" id="contact">
      <div className="mx-auto px-6 text-center max-w-152.5">
        {/* TITLE */}
        <motion.h2
          variants={headerVariants}
          initial="initial"
          whileInView="enter"
          exit="exit"
          viewport={{ amount: 0.6 }}
          className="font-mono text-3xl md:text-6xl text-black mb-4"
        >
          Ponte en contacto
        </motion.h2>
        <motion.p
          variants={headerVariants}
          initial="initial"
          whileInView="enter"
          exit="exit"
          viewport={{ amount: 0.6 }}
          className="text-[#716D6D] max-w-xl mx-auto mb-12"
        >
          ¿Tienes alguna pregunta? Nos encantaría ayudarte. Envíanos un mensaje
          y te responderemos lo antes posible.
        </motion.p>
        <motion.h3
          variants={headerVariants}
          initial="initial"
          whileInView="enter"
          exit="exit"
          viewport={{ amount: 0.5 }}
          className="text-black font-semibold mb-6 max-w-151.75 text-start"
        >
          Información de contacto
        </motion.h3>
        ={" "}
        <motion.div
          variants={listVariants}
          initial="initial"
          whileInView="enter"
          exit="exit"
          viewport={{ amount: 0.35 }}
          className="flex flex-col items-center gap-10 mb-10 w-full justify-center"
        >
          {contactInfo.map((item, index) => {
            const align = index % 2 === 0 ? "left" : "right";

            return (
              <motion.div key={index} custom={align} variants={cardVariants}>
                <div className="w-full min-w-91.5 md:min-w-140.5">
                  <ContactInfoCard {...item} align={align} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        <motion.div
          variants={ctaVariants}
          initial="initial"
          whileInView="enter"
          exit="exit"
          viewport={{ amount: 0.4 }}
          className="mb-10"
        >
          <a
            href={`https://wa.me/573144455235?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <RippleButton>
              <MessageCircleMore size={16} className="text-[#850E35]" />
              Enviar mensaje por WhatsApp
            </RippleButton>
          </a>
        </motion.div>
        <motion.iframe
          variants={mapVariants}
          initial="initial"
          whileInView="enter"
          viewport={{ amount: 0.3 }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63670.555246180666!2d-73.62165519130879!3d4.139539723375516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3e2ea06875cb91%3A0x3ef123a7031a4ce7!2sCdad.%20Salitre%2C%20Villavicencio%2C%20Meta!5e0!3m2!1ses!2sco!4v1766771359661!5m2!1ses!2sco"
          width="800"
          height="260"
          loading="lazy"
          className="w-full rounded-2xl"
        />
      </div>
    </section>
  );
}
