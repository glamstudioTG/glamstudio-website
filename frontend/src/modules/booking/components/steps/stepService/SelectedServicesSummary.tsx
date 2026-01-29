import { BookingForm } from "../../../types/booking.types";

interface Props {
  booking: BookingForm;
}

export default function SelectedServicesSummary({ booking }: Props) {
  const totalPrice = booking.state.services.reduce(
    (acc, s) => acc + s.price,
    0,
  );

  const totalDuration = booking.state.services.reduce(
    (acc, s) => acc + s.duration,
    0,
  );

  return (
    <div
      className="
        rounded-xl
        bg-[#f2e9db]
        p-5
        space-y-4
        text-black
        shadow-[0_8px_20px_rgba(0,0,0,0.08)]
      "
    >
      <h4 className="font-bold text-sm">Servicios seleccionados</h4>

      <div className="space-y-2">
        {booking.state.services.map((s) => (
          <div
            key={s.id}
            className="flex justify-between text-sm text-black/80"
          >
            <span>
              {s.name} · {s.duration} min
            </span>
            <span>${s.price.toLocaleString()}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-black/10 pt-3 space-y-1 text-sm">
        <div className="flex justify-between">
          <span>Subtotal del servicio</span>
          <span>${totalPrice.toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-black/70">
          <span>Tiempo estimado</span>
          <span>{totalDuration} min</span>
        </div>
      </div>

      <div className="border-t border-black/10 pt-3 flex justify-between font-medium">
        <span>Total</span>
        <span>${totalPrice.toLocaleString()}</span>
      </div>
    </div>
  );
}
