import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkillsSection from "@/components/sections/SkillsSection";

export const revalidate = 60;

export default function SkillsPage() {
  return (
    <>
      <main className="min-h-screen relative pb-20">
        <Navbar />
        <SkillsSection />
      </main>
      <Footer />
    </>
  );
}
