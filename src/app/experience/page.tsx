import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExperienceSection from "@/components/sections/ExperienceSection";

export const revalidate = 60;

export default function ExperiencePage() {
  return (
    <>
      <main className="min-h-screen relative pb-20">
        <Navbar />
        <ExperienceSection />
      </main>
      <Footer />
    </>
  );
}
