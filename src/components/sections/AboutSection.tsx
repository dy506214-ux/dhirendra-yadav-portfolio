import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import LeetCodeCard from "@/components/LeetCodeCard";
import GithubCalendarCard from "@/components/GithubCalendarCard";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { TypingAnimation } from "@/components/ui/TypingAnimation";

export default async function AboutSection() {
  let profile = null;
  let techSkills = [];
  try {
    profile = await prisma.profileInfo.findFirst();
    techSkills = await prisma.techSkill.findMany();
  } catch (error) {
    console.error("AboutSection database query error:", error);
  }

  return (
    <div id="about" className="max-w-6xl mx-auto px-6 pt-20 relative z-10 scroll-mt-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <AnimatedHeading as="h1" className="text-5xl md:text-6xl font-bold text-white tracking-tight">
            <TypingAnimation text="About Me" delay={0.1} highlight="Me" />
          </AnimatedHeading>
          <p className="text-lg text-gray-400 leading-relaxed text-justify">
            I build scalable web applications, intelligent software systems, and real-world digital products that solve meaningful problems. Currently serving as a Tech Associate at Invertis Innovation & Incubation, I work on product development, startup incubation projects, AI-powered solutions, and enterprise-grade software systems.
          </p>
          

        </div>

        <div className="relative h-[300px] lg:h-[380px] w-[85%] max-w-[340px] mx-auto rounded-3xl overflow-hidden glass-card border border-white/10">
          <Image 
            src={profile?.heroImage || "/alok-2.jpeg"}
            alt="About me"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-[#0a0f1c]/40 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-center">
            <p className="text-2xl font-bold text-white mb-2">{profile?.name || "Dhirendra Yadav"}</p>
            <p className="text-neon-blue font-medium">{profile?.titles?.[0] || "Full Stack Developer"}</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-20 grid lg:grid-cols-2 gap-8 min-w-0 w-full">
        <div className="flex flex-col h-full min-w-0 w-full">
          <AnimatedHeading as="h2" className="text-3xl font-bold text-white mb-8 tracking-tight">
            <TypingAnimation text="Problem Solving & DSA" delay={0.1} highlight="DSA" />
          </AnimatedHeading>
          <div className="flex-grow min-w-0 w-full">
            <LeetCodeCard username="dy506214-ux" />
          </div>
        </div>
        <div className="flex flex-col h-full min-w-0 w-full">
          <AnimatedHeading as="h2" className="text-3xl font-bold text-white mb-8 tracking-tight">
            <TypingAnimation text="Open Source & GitHub" delay={0.1} highlight="GitHub" />
          </AnimatedHeading>
          <div className="flex-grow min-w-0 w-full">
            <GithubCalendarCard username="dy506214-ux" />
          </div>
        </div>
      </div>
    </div>
  );
}
