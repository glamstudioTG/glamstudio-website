import FormLegend from "./FormLegend";
import BookingForm from "./BookingForm";

export default function FormSection() {
  return (
    <section className="py-24 bg-[#FFEFD3] h-[1000px]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start h-120">
          <FormLegend />
          <div className="bg-[#E0C49C] rounded-2xl p-8 shadow-lg size-full">
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
}
