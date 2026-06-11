import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AchievementsSection from "@/components/sections/AchievementsSection";

export const revalidate = 60;

export default function AchievementsPage() {
  return (
    <>
      <main className="min-h-screen relative pb-20">
        <Navbar />
        <AchievementsSection />
      </main>
      <Footer />
    </>
  );
}
