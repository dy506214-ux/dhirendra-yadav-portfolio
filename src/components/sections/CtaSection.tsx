import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { TypingAnimation } from "@/components/ui/TypingAnimation";

export default function CtaSection() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-32 relative z-10">
      <div className="glass-card rounded-3xl p-1 md:p-1 overflow-hidden relative group cursor-pointer border-neon-blue/30 hover:border-neon-blue/50 transition-colors">
         <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 to-neon-blue/10 group-hover:opacity-100 opacity-50 transition-opacity" />
         <div className="bg-[#0a0f1c] rounded-[22px] p-8 md:p-12 relative flex flex-col md:flex-row items-center justify-between gap-8 z-10">
            <div className="space-y-4 max-w-xl">
              <AnimatedHeading as="h2" className="text-3xl md:text-4xl font-bold text-white">
                <TypingAnimation text="Let's Build Something Amazing Together" delay={0.3} highlight="Let's" />
              </AnimatedHeading>
              <p className="text-gray-400">Turning Ideas Into Scalable Products.</p>
            </div>
            <Link href="#contact" className="bg-gradient-to-r from-neon-blue to-neon-blue text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:shadow-[0_0_30px_rgba(0,210,255,0.5)] transition-all shrink-0">
              Let&apos;s Connect <ArrowRight className="w-5 h-5" />
            </Link>
         </div>
      </div>
    </div>
  );
}
