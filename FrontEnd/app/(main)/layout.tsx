import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main className="main-site">{children}</main>
      <Footer />
    </SmoothScroll>
  );
}
