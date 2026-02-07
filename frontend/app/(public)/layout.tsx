import Navbar from "@/src/components/navbar/Navbar";
import Footer from "@/src/components/footer/Footer";
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="antialiased relative overflow-x-hidden bg-[#FFEAEA]">
      <Navbar />

      <main>{children}</main>

      <Footer />
    </div>
  );
}
