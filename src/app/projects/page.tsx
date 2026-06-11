import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectsSection from "@/components/sections/ProjectsSection";

export const revalidate = 60;

export default function ProjectsPage() {
  return (
    <>
      <main className="min-h-screen relative pb-20">
        <Navbar />
        <ProjectsSection />
      </main>
      <Footer />
    </>
  );
}
