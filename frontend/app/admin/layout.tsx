import Sidebar from "@/src/components/sidebar/sidebar";

export default function WorkerPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen overflow-hidden bg-[#fdf0f0]">
      <div>
        <Sidebar />
      </div>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
