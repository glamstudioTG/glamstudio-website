import goldCalendar from "@/public/icons/goldCalendar.png";
import makeupBrush from "@/public/icons/makeupBrush.png";
import Image from "next/image";

export default function FormLegend() {
  return (
    <div className="max-w-md mt-10">
      <p className="text-sm text-gray-500 mb-2">
        Tu momento de belleza empieza aquí{" "}
      </p>
      <h2 className="text-4xl md:text-5xl font-mono font-bold mb-6 leading-tight text-black">
        Redefine tu belleza con una cita personalizada
      </h2>
      <p className="text-lg text-gray-700 mb-6">
        Agenda tu cita y descubre una experiencia de belleza única. Resultados
        visibles, atención de lujo.
      </p>

      <ul className="space-y-3 text-black">
        <li className="flex items-center gap-2">
          <Image
            src={goldCalendar}
            alt="Calendar Icon"
            width={20}
            height={20}
          ></Image>
          Resultados naturales y duraderos
        </li>
        <li className="flex items-center gap-2">
          <Image
            src={makeupBrush}
            alt="Calendar Icon"
            width={20}
            height={20}
          ></Image>
          Horarios de 9 am a 9 pm
        </li>
      </ul>
    </div>
  );
}
