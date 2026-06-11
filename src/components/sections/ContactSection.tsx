import { prisma } from "@/lib/prisma";
import { Mail, MapPin, Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";

export default async function ContactSection() {
  const profile = await prisma.profileInfo.findFirst();

  return (
    <div id="contact" className="max-w-6xl mx-auto px-6 pt-32 pb-20 relative z-10 scroll-mt-20">
      <div className="space-y-4 mb-16 text-center">
        <AnimatedHeading as="h1" className="text-5xl md:text-6xl font-bold text-white tracking-tight">
          Get in <span className="text-gradient">Touch</span>
        </AnimatedHeading>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Have a project in mind? Looking to collaborate? I&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <Card className="bg-white/5 border-white/10 hover:border-neon-blue/50 transition-all text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-neon-blue/10 rounded-full flex items-center justify-center text-neon-blue mx-auto mb-6">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Email</h3>
            <a href={`mailto:${profile?.emailAddress || "admin@alokyadav.com"}`} className="text-gray-400 hover:text-neon-blue transition-colors">
              {profile?.emailAddress || "admin@alokyadav.com"}
            </a>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 hover:border-neon-blue/50 transition-all text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-neon-blue/10 rounded-full flex items-center justify-center text-neon-blue mx-auto mb-6">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Location</h3>
            <p className="text-gray-400">
              India
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 hover:border-[#0a66c2]/50 transition-all text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-[#0a66c2]/10 rounded-full flex items-center justify-center text-[#0a66c2] mx-auto mb-6">
              <Briefcase className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">LinkedIn</h3>
            <a href={profile?.linkedinUrl || "https://www.linkedin.com/in/alok-yadav-906920292/"} target="_blank" className="text-gray-400 hover:text-[#0a66c2] transition-colors">
              Connect with me
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
