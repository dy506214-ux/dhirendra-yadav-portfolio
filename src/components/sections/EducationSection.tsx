import { prisma } from "@/lib/prisma";
import { GraduationCap, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { TypingAnimation } from "@/components/ui/TypingAnimation";

export default async function EducationSection() {
  let educations: any[] = [];
  try {
    educations = await prisma.education.findMany({});
  } catch (error) {
    console.error("EducationSection database query error:", error);
  }

  return (
    <div id="education" className="max-w-4xl mx-auto px-6 pt-32 relative z-10 scroll-mt-20">
      <div className="space-y-4 mb-16 text-center">
        <AnimatedHeading as="h1" className="text-5xl md:text-6xl font-bold text-white tracking-tight">
          <TypingAnimation text="My Education" delay={0.1} highlight="Education" />
        </AnimatedHeading>
        <p className="text-xl text-gray-400">
          My academic journey and qualifications.
        </p>
      </div>

      {educations.length === 0 ? (
        <div className="text-center py-20 glass-card rounded-3xl">
          <AnimatedHeading as="h2" className="text-2xl text-gray-400">No education added yet.</AnimatedHeading>
        </div>
      ) : (
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
          {educations.map((edu) => (
            <div key={edu.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-[#0a0f1c] text-neon-blue group-[.is-active]:text-neon-blue shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <GraduationCap className="w-5 h-5" />
              </div>
              <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white/5 border-white/10 hover:border-neon-blue/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-2 text-neon-blue text-sm mb-2 font-medium">
                    <Calendar className="w-4 h-4" />
                    <span>{edu.startDate} - {edu.endDate || "Present"}</span>
                  </div>
                  <CardTitle className="text-white text-xl">{edu.degree}</CardTitle>
                  <p className="text-gray-400 font-medium">{edu.institution}</p>
                </CardHeader>
                <CardContent>
                  {edu.grade && (
                    <p className="text-neon-blue font-medium mb-2 text-sm">Grade: {edu.grade}</p>
                  )}
                  <p className="text-gray-300 leading-relaxed text-sm">
                    {edu.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
