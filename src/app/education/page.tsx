import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EducationSection from "@/components/sections/EducationSection";

export const revalidate = 60;

export default function EducationPage() {
  return (
    <>
      <main className="min-h-screen relative pb-20">
        <Navbar />
        <EducationSection />
      </main>
      <Footer />
    </>
  );
}
