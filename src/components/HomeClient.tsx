'use client';

import { motion } from "framer-motion";
import { ArrowRight, Download, Monitor, Database, Cloud, Layout, Zap, Code, Shield, BrainCircuit, Rocket, Car, Mic, Plane, Building, Target, LineChart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { TypingAnimation } from "@/components/ui/TypingAnimation";
import RippleGrid from "@/components/ui/RippleGrid";

export default function HomeClient({ data }: { data: { profile: { name: string; titles: string[]; bio: string; [key: string]: unknown }; stats: { label: string; value: string; [key: string]: unknown }[] } }) {
  const { profile, stats } = data;
  return (
    <main className="min-h-screen relative overflow-hidden pb-32">
      {/* Background Ripple Grid */}
      <div className="absolute inset-0 z-0">
        <RippleGrid
          enableRainbow={false}
          gridColor="#7a2cbf"
          rippleIntensity={0.05}
          gridSize={10}
          gridThickness={15}
          mouseInteraction={true}
          mouseInteractionRadius={1.2}
          opacity={0.3}
        />
      </div>



      <div className="max-w-7xl mx-auto px-6 pt-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Hero Text */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 order-2 lg:order-1"
          >
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-medium text-gray-300">Hi, I&apos;m</h2>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight flex flex-wrap gap-x-4 cursor-default">
                <div className="flex">
                  {profile.name.split(" ")[0].split("").map((char: string, i: number) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: -40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 + i * 0.1, type: "spring", bounce: 0.5 }}
                      className="inline-block transition-colors"
                      whileHover={{ y: -15, color: "#FFD700", transition: { duration: 0.2 } }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
                <motion.span
                  initial={{ opacity: 0, scale: 0, rotate: -15 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 + profile.name.split(" ")[0].length * 0.1, type: "spring", bounce: 0.6 }}
                  className="text-gradient inline-block origin-left"
                >
                  {profile.name.split(" ")[1] || ""}
                </motion.span>
              </h1>
              <p className="text-xl text-gray-400 font-medium border-l-4 border-neon-blue pl-4 py-1">
                {profile.titles?.join(" | ")}
              </p>
            </div>

            <div className="text-gray-400 space-y-4 max-w-lg leading-relaxed text-justify">
              <p>
                I build scalable web applications, intelligent software systems, and real-world digital products that solve meaningful problems. Currently serving as a Tech Associate at Invertis Innovation & Incubation, I work on product development, startup incubation projects, AI-powered solutions, and enterprise-grade software systems.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link href="#projects" className="bg-gradient-to-r from-neon-blue to-neon-blue text-white px-8 py-3 rounded-full font-medium flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,210,255,0.4)] transition-all">
                View My Work <ArrowRight className="w-4 h-4" />
              </Link>
              <a href={profile.resumeLink as string || "/resume.pdf"} target="_blank" className="glass-card px-8 py-3 rounded-full font-medium flex items-center gap-2 hover:bg-white/5 transition-all text-white">
                Download Resume <Download className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-8 flex items-center gap-2 text-sm text-gray-400">
              <span><TypingAnimation text="Let's Build Something Amazing Together 🚀" delay={0.5} highlight="Let's" /></span>
            </div>
          </motion.div>

          {/* Right Column - Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-[85%] max-w-[340px] mx-auto flex items-center justify-center order-1 lg:order-2 mb-10 lg:mb-0"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-neon-blue/20 to-neon-blue/20 rounded-full blur-3xl" />
            
            <div className="relative w-full rounded-3xl overflow-hidden border border-white/10 glass-card flex items-end justify-center bg-[#0a0f1c]">
              <Image 
                src="/alok-3.jpeg" 
                alt="Alok Yadav" 
                width={1135}
                height={1600}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-auto object-cover block"
                priority
              />
              <div className="absolute bottom-8 glass-card p-4 rounded-xl flex items-center gap-4 w-[80%] backdrop-blur-xl border border-white/20 bg-black/40">
                <div>
                  <p className="font-semibold text-white text-sm">Tech Associate & Full Stack Developer</p>
                  <p className="text-xs text-gray-300">Invertis Innovation & Incubation</p>
                </div>
                <div className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse shrink-0" />
              </div>
            </div>

            {/* Floating Icons */}
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="hidden lg:flex absolute top-10 -left-12 glass-card p-4 rounded-xl border border-neon-blue/30 text-neon-blue bg-black/50 backdrop-blur-md">
              <Code className="w-6 h-6" />
            </motion.div>
            <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="hidden lg:flex absolute top-1/2 -left-20 glass-card p-4 rounded-xl border border-white/20 text-gray-400 bg-black/50 backdrop-blur-md">
              <Cloud className="w-6 h-6" />
            </motion.div>
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="hidden lg:flex absolute top-1/4 -right-12 glass-card p-4 rounded-xl border border-white/20 text-gray-400 bg-black/50 backdrop-blur-md">
              <Database className="w-6 h-6" />
            </motion.div>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} className="hidden lg:flex absolute bottom-1/4 -right-20 glass-card p-4 rounded-xl border border-neon-blue/30 text-neon-blue bg-black/50 backdrop-blur-md">
              <LineChart className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 mt-32 relative z-10">
        <div className="glass-card p-8 rounded-2xl grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x divide-white/10">
          {stats.map((stat: { label: string; value: string; [key: string]: unknown }, index: number) => {
            const colors = [
              "bg-neon-blue/10 text-neon-blue",
              "bg-neon-blue/10 text-neon-blue",
              "bg-purple-500/10 text-purple-400",
              "bg-green-500/10 text-green-400"
            ];
            const color = colors[index % colors.length];
            return (
              <div key={index} className={`flex flex-col items-center justify-center space-y-2 text-center ${index > 0 ? 'md:pl-8' : ''}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 ${color}`}>
                  <Layout className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Services & Focus Grid */}
      <div className="max-w-7xl mx-auto px-6 mt-32 relative z-10">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* What I Do */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <Zap className="w-6 h-6 text-yellow-400" />
              <AnimatedHeading as="h2" className="text-3xl font-bold text-white">What I <span className="text-neon-blue">Do</span></AnimatedHeading>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { title: "Full Stack Web Development", icon: <Layout className="w-6 h-6" />, color: "text-blue-400" },
                { title: "SaaS Product Development", icon: <Code className="w-6 h-6" />, color: "text-purple-400" },
                { title: "AI-Powered Applications", icon: <BrainCircuit className="w-6 h-6" />, color: "text-pink-400" },
                { title: "Startup MVP Development", icon: <Rocket className="w-6 h-6" />, color: "text-orange-400" },
                { title: "Database Architecture", icon: <Database className="w-6 h-6" />, color: "text-teal-400" },
                { title: "Cloud & DevOps Solutions", icon: <Cloud className="w-6 h-6" />, color: "text-cyan-400" },
                { title: "UI/UX Focused Design", icon: <Monitor className="w-6 h-6" />, color: "text-indigo-400" },
                { title: "Enterprise Software Systems", icon: <Shield className="w-6 h-6" />, color: "text-green-400" }
              ].map((service, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="glass-card p-6 flex flex-col items-center justify-center text-center gap-4 hover:border-white/20 cursor-pointer group"
                >
                  <div className={`w-14 h-14 rounded-full bg-white/5 flex items-center justify-center ${service.color} group-hover:scale-110 transition-transform`}>
                    {service.icon}
                  </div>
                  <h3 className="font-semibold text-gray-200">{service.title}</h3>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Current Focus */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <Target className="w-6 h-6 text-neon-blue" />
              <h2 className="text-3xl font-bold text-white">Current Focus</h2>
            </div>
            <p className="text-sm text-gray-400 mb-6">Building innovative solutions in:</p>
            
            <div className="space-y-4">
              {[
                { title: "Smart Transportation Systems", icon: <Car className="w-5 h-5 text-purple-400" /> },
                { title: "AI Voice Operating Systems", icon: <Mic className="w-5 h-5 text-blue-400" /> },
                { title: "Tourism Technology Platforms", icon: <Plane className="w-5 h-5 text-cyan-400" /> },
                { title: "University Digital Transformation", icon: <Building className="w-5 h-5 text-indigo-400" /> },
                { title: "Startup Ecosystem Products", icon: <Rocket className="w-5 h-5 text-pink-400" /> }
              ].map((item, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="flex items-center justify-between p-4 glass-card hover:bg-white/5 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-white/10 p-2 rounded-lg">
                      {item.icon}
                    </div>
                    <span className="text-sm font-medium text-gray-300">{item.title}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>


    </main>
  );
}
