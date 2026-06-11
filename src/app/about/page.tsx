import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutSection from "@/components/sections/AboutSection";

export const revalidate = 60;

export default function AboutPage() {
  return (
    <>
      <main className="min-h-screen relative pb-20">
        <Navbar />
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}
