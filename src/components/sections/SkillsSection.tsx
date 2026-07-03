import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import SkillsGrid from "./SkillsGrid";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { TypingAnimation } from "@/components/ui/TypingAnimation";

export default async function SkillsSection() {
  let techSkills: any[] = [];
  try {
    techSkills = await prisma.techSkill.findMany();
  } catch (error) {
    console.error("SkillsSection database query error:", error);
  }

  const groupedSkills = techSkills.reduce((acc, skill) => {
    const category = skill.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, typeof techSkills>);

  return (
    <div id="skills" className="max-w-6xl mx-auto px-6 pt-32 relative z-10 scroll-mt-20">
      <div className="space-y-4 mb-16 text-center">
        <AnimatedHeading as="h1" className="text-5xl md:text-6xl font-bold text-white tracking-tight">
          <TypingAnimation text="Technical Skills" delay={0.1} highlight="Skills" />
        </AnimatedHeading>
        <p className="text-xl text-gray-400">
          Technologies and tools I work with.
        </p>
      </div>

      {techSkills.length === 0 ? (
        <div className="text-center py-20 glass-card rounded-3xl">
          <AnimatedHeading as="h2" className="text-2xl text-gray-400">No skills added yet.</AnimatedHeading>
        </div>
      ) : (
        <SkillsGrid groupedSkills={groupedSkills} />
      )}
    </div>
  );
}
