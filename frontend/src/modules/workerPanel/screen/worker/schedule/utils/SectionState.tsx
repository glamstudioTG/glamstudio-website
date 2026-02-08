export default function SectionState({
  title,
  description,
  variant = "info",
}: {
  title: string;
  description?: string;
  variant?: "error" | "warning" | "info";
}) {
  const variants = {
    error: "border-red-200 bg-red-50 text-red-700",
    warning: "border-yellow-200 bg-yellow-50 text-yellow-700",
    info: "border-gray-200 bg-white text-gray-600",
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div
        className={`w-full max-w-md rounded-xl border p-6 text-center shadow-sm ${variants[variant]}`}
      >
        <h2 className="text-lg font-semibold">{title}</h2>

        {description && (
          <p className="mt-2 text-sm opacity-80">{description}</p>
        )}
      </div>
    </div>
  );
}
