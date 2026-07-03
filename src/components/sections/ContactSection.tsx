import { prisma } from "@/lib/prisma";
import { Mail, MapPin } from "lucide-react";
import { LinkedinIcon } from "@/components/icons";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { TypingAnimation } from "@/components/ui/TypingAnimation";

export default async function ContactSection() {
  let profile = null;
  try {
    profile = await prisma.profileInfo.findFirst();
  } catch (error) {
    console.error("ContactSection database query error:", error);
  }

  return (
    <div id="contact" className="max-w-6xl mx-auto px-6 pt-32 pb-20 relative z-10 scroll-mt-20">
      <div className="space-y-4 mb-16 text-center">
        <AnimatedHeading as="h1" className="text-5xl md:text-6xl font-bold text-white tracking-tight">
          <TypingAnimation text="Get in Touch" delay={0.1} highlight="Touch" />
        </AnimatedHeading>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Have a project in mind? Looking to collaborate? I&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <a href="mailto:dy506214@gmail.com" className="block group">
          <Card className="bg-white/5 border-white/10 group-hover:border-neon-blue/50 group-hover:bg-white/10 transition-all text-center h-full cursor-pointer">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-neon-blue/10 rounded-full flex items-center justify-center text-neon-blue mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Email</h3>
              <p className="text-gray-400 group-hover:text-neon-blue transition-colors break-all">
                dy506214@gmail.com
              </p>
            </CardContent>
          </Card>
        </a>

        <a href="https://maps.google.com/?q=Bareilly,+Uttar+Pradesh,+India" target="_blank" className="block group">
          <Card className="bg-white/5 border-white/10 group-hover:border-neon-blue/50 group-hover:bg-white/10 transition-all text-center h-full cursor-pointer">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-neon-blue/10 rounded-full flex items-center justify-center text-neon-blue mx-auto mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Location</h3>
              <p className="text-gray-400 group-hover:text-neon-blue transition-colors capitalize">
                Bareilly, Uttar Pradesh, India
              </p>
            </CardContent>
          </Card>
        </a>

        <a href="https://www.linkedin.com/in/dhirendra-yadav-ux/" target="_blank" className="block group">
          <Card className="bg-white/5 border-white/10 group-hover:border-[#0a66c2]/50 group-hover:bg-white/10 transition-all text-center h-full cursor-pointer">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-[#0a66c2]/10 rounded-full flex items-center justify-center text-[#0a66c2] mx-auto mb-6 group-hover:scale-110 transition-transform">
                <LinkedinIcon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">LinkedIn</h3>
              <p className="text-gray-400 group-hover:text-[#0a66c2] transition-colors">
                Connect with me
              </p>
            </CardContent>
          </Card>
        </a>
      </div>
    </div>
  );
}
