import FormLegend from "./FormLegend";
import BookingForm from "./BookingForm";
import floatBackground from "@/public/images/landing/floatShadowBackGround.png";
import Image from "next/image";

export default function FormSection() {
  return (
    <section className=" relative py-24 bg-[#FFEFD3] h-[1000px] ">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start h-120">
          <FormLegend />
          <div className="bg-[#E0C49C] rounded-2xl p-8 shadow-lg size-full z-10">
            <BookingForm />
          </div>
        </div>
      </div>
      <div className="absolute -bottom-100 -right-70 z-0">
        <Image
          src={floatBackground}
          alt="background"
          width={1000}
          height={1000}
        />
      </div>
    </section>
  );
}
