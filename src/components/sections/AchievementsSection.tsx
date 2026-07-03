import { prisma } from "@/lib/prisma";
import { Trophy, Calendar } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { TypingAnimation } from "@/components/ui/TypingAnimation";

export default async function AchievementsSection() {
  let achievements: any[] = [];
  try {
    achievements = await prisma.achievement.findMany();
  } catch (error) {
    console.error("AchievementsSection database query error:", error);
  }

  return (
    <div id="achievements" className="max-w-6xl mx-auto px-6 pt-32 relative z-10 scroll-mt-20">
      <div className="space-y-4 mb-16 text-center">
        <AnimatedHeading as="h1" className="text-5xl md:text-6xl font-bold text-white tracking-tight">
          <TypingAnimation text="My Achievements" delay={0.1} highlight="Achievements" />
        </AnimatedHeading>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Certifications, awards, and milestones.
        </p>
      </div>

      {achievements.length === 0 ? (
        <div className="text-center py-20 glass-card rounded-3xl">
          <AnimatedHeading as="h2" className="text-2xl text-gray-400">No achievements added yet.</AnimatedHeading>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement) => (
            <Card key={achievement.id} className="bg-white/5 border-white/10 hover:border-yellow-500/50 transition-all group flex flex-col h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-500 mb-4 group-hover:scale-110 transition-transform">
                  <Trophy className="w-6 h-6" />
                </div>
                <CardTitle className="text-white text-xl leading-tight">
                  {achievement.title}
                </CardTitle>
                <div className="flex items-center gap-2 text-yellow-500/80 text-sm mt-2 font-medium">
                  <Calendar className="w-4 h-4" />
                  <span>{achievement.date}</span>
                </div>
              </CardHeader>
              <CardContent>
                {achievement.issuer && (
                  <p className="text-neon-blue font-medium mb-2 text-sm">Issued by: {achievement.issuer}</p>
                )}
                <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">
                  {achievement.description}
                </p>
                {achievement.link && (
                  <div className="pt-4 mt-auto border-t border-white/10">
                    <Link 
                      href={achievement.link} 
                      target="_blank"
                      className="text-sm font-medium text-white hover:text-yellow-400 flex items-center gap-2 transition-colors w-fit"
                    >
                      View Credential
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
