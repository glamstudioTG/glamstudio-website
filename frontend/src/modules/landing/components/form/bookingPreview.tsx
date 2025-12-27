export default function BookingPreview() {
  return (
    <div className="bg-[#FFF7E3] rounded-xl p-5 text-sm text-gray-800">
      <h4 className="font-semibold mb-4">Resumen de tu reserva</h4>

      <ul className="space-y-2">
        <li>
          <strong>Servicio:</strong> —
        </li>
        <li>
          <strong>Duración:</strong> —
        </li>
        <li>
          <strong>Fecha y hora:</strong> —
        </li>
        <li className="pt-2 border-t">
          <strong>Total estimado:</strong> —
        </li>
      </ul>
    </div>
  );
}
