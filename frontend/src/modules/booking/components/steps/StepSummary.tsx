import { StepProps } from "../../types/booking.types";

export default function StepSummary({ booking, navigation }: StepProps) {
  const { date, time, userInfo, services } = booking.state;

  const totalPrice = services.reduce((acc, s) => acc + s.price, 0);

  return (
    <div className="rounded-xl bg-[#E6CDAA] p-8 space-y-8 max-w-[85%] mx-auto">
      <div className="flex items-center justify-between">
        <h3 className="font-mono text-3xl font-semibold text-black">
          Revisión y recibo
        </h3>
        <span className="text-sm text-black/60">Paso 4 de 4</span>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8 space-y-6">
          <section className="space-y-3">
            <h4 className="text-sm font-semibold text-black">
              Resumen de la cita
            </h4>

            <div className="grid grid-cols-2 gap-y-2 text-sm text-black/80">
              <span>Fecha</span>
              <span>{date?.toLocaleDateString() || "-"}</span>

              <span>Horario</span>
              <span>{time || "-"}</span>

              <span>Ubicación</span>
              <span>GlamStudio · Ciudad Salitre</span>
            </div>
          </section>

          {/* Datos del cliente */}
          <section className="space-y-3">
            <h4 className="text-sm font-semibold text-black">Tus detalles</h4>

            <div className="grid grid-cols-2 gap-y-2 text-sm text-black/80">
              <span>Nombre</span>
              <span>{userInfo?.name}</span>

              <span>Email</span>
              <span>{userInfo?.email}</span>

              <span>Teléfono</span>
              <span>{userInfo?.phone}</span>
            </div>
          </section>

          {/* Servicios */}
          <section className="space-y-3">
            <h4 className="text-sm font-semibold text-black">Servicios</h4>

            <div className="space-y-2 text-sm">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="grid grid-cols-4 text-black/80"
                >
                  <span className="col-span-2">{service.name}</span>
                  <span className="text-center">1</span>
                  <span className="text-right">
                    ${service.price.toLocaleString()}
                  </span>
                </div>
              ))}

              <div className="border-t border-black/20 pt-2 mt-2 grid grid-cols-4 font-medium text-black">
                <span className="col-span-3">Precio total</span>
                <span className="text-right">
                  ${totalPrice.toLocaleString()}
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Columna derecha (acciones rápidas) */}
        <div className="col-span-4">
          <div className="rounded-xl bg-[#F7E6CC] p-5 space-y-4 text-sm">
            <h4 className="font-semibold text-black">
              ¿Necesitas hacer algún cambio?
            </h4>

            <button
              onClick={() => navigation.goToStep(1)}
              className="block text-left text-black/80 hover:underline"
            >
              Cambiar servicios
              <div className="text-xs text-black/50">Ir a paso 1</div>
            </button>

            <button
              onClick={() => navigation.goToStep(2)}
              className="block text-left text-black/80 hover:underline"
            >
              Cambiar tus datos
              <div className="text-xs text-black/50">Ir a paso 2</div>
            </button>

            <button
              onClick={() => navigation.goToStep(3)}
              className="block text-left text-black/80 hover:underline"
            >
              Cambiar fecha y hora
              <div className="text-xs text-black/50">Ir a paso 3</div>
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 pt-6">
        <span className="max-w-md text-xs text-black/70">
          Para confirmar tu reserva se requiere un anticipo de $20.000 COP vía
          Nequi o Bancolombia.
        </span>

        <div className="flex gap-4">
          <button
            onClick={() => navigation.prevStep()}
            className="rounded-full border border-[#D4A64E] px-6 py-2 text-sm text-black"
          >
            Volver
          </button>

          <button className="rounded-full bg-[#D4A64E] px-6 py-2 text-sm font-medium text-black">
            Confirmar cita y pagar
          </button>
        </div>
      </div>
    </div>
  );
}
