import { prisma } from "@/lib/prisma";
import HomeClient from "@/components/HomeClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import EducationSection from "@/components/sections/EducationSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import ContactSection from "@/components/sections/ContactSection";
import CtaSection from "@/components/sections/CtaSection";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Page() {
  const profileInfo = await prisma.profileInfo.findFirst();
  const stats = await prisma.stat.findMany();

  const data = {
    profile: profileInfo || {
      name: "Alok Yadav",
      titles: ["Full Stack Developer", "Tech Associate", "Startup Builder"],
      bio: "I build scalable web applications, intelligent software systems, and real-world digital products that solve meaningful problems.",
      heroImage: "/alok-2.jpeg",
    },
    stats: stats.length > 0 ? stats : [
      { label: "Projects Built", value: "50+", icon: "Layout" },
      { label: "Technologies", value: "10+", icon: "Code" },
      { label: "Hours of Coding", value: "1000+", icon: "Zap" },
      { label: "Startup Solutions", value: "5+", icon: "Rocket" },
    ]
  };

  return (
    <>
      <Navbar />
      <div className="relative">
        <HomeClient data={data} />
        
        {/* Full Single-Page Portfolio Stack */}
        <AboutSection />
        <ExperienceSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <AchievementsSection />
        <ContactSection />
        <CtaSection />
      </div>
      <Footer />
    </>
  );
}
