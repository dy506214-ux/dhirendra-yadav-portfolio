"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Code2, Database, Server, Layout, Cloud, Wrench, FileCode2, Box, Smartphone,
  Blocks, Triangle, FileJson, Palette, Wind, LayoutGrid, MonitorSmartphone, 
  PenTool, ServerCog, Zap, Network, ShieldCheck, Boxes, Leaf, Table, Gauge, 
  GitBranch, Ship, Terminal, RefreshCcw, CloudUpload, BrainCircuit, 
  Cpu, Mic, MessageSquareText, Settings, Send, PlayCircle, Image as ImageIcon, Flame
} from "lucide-react";

const getSkillIcon = (name: string) => {
  const n = name.toLowerCase();
  
  // Frontend
  if (n.includes('react')) return { Icon: Blocks, color: "text-[#61DAFB]" };
  if (n.includes('next')) return { Icon: Triangle, color: "text-white" };
  if (n.includes('typescript')) return { Icon: FileCode2, color: "text-[#3178C6]" };
  if (n.includes('javascript') || n.includes('js')) return { Icon: FileJson, color: "text-[#F7DF1E]" };
  if (n.includes('html')) return { Icon: Layout, color: "text-[#E34F26]" };
  if (n.includes('tailwind')) return { Icon: Wind, color: "text-[#38B2AC]" };
  if (n.includes('css')) return { Icon: Palette, color: "text-[#1572B6]" };
  if (n.includes('bootstrap')) return { Icon: LayoutGrid, color: "text-[#7952B3]" };
  if (n.includes('responsive')) return { Icon: MonitorSmartphone, color: "text-blue-400" };
  if (n.includes('ui/ux') || n.includes('design')) return { Icon: PenTool, color: "text-pink-400" };
  
  // Backend
  if (n.includes('node')) return { Icon: ServerCog, color: "text-[#339933]" };
  if (n.includes('express')) return { Icon: Zap, color: "text-gray-400" };
  if (n.includes('api') || n.includes('rest')) return { Icon: Network, color: "text-green-400" };
  if (n.includes('auth')) return { Icon: ShieldCheck, color: "text-yellow-400" };
  if (n.includes('microservices')) return { Icon: Boxes, color: "text-blue-500" };
  if (n.includes('architecture')) return { Icon: Server, color: "text-indigo-400" };
  
  // Database
  if (n.includes('mongo')) return { Icon: Leaf, color: "text-[#47A248]" };
  if (n.includes('sql') || n.includes('postgres')) return { Icon: Database, color: "text-[#336791]" };
  if (n.includes('database design')) return { Icon: Table, color: "text-gray-300" };
  if (n.includes('query') || n.includes('optimization')) return { Icon: Gauge, color: "text-orange-400" };
  
  // DevOps & Tools
  if (n.includes('github actions')) return { Icon: PlayCircle, color: "text-[#2088FF]" };
  if (n.includes('github') || n.includes('git')) return { Icon: GitBranch, color: "text-[#F05032]" };
  if (n.includes('docker')) return { Icon: Ship, color: "text-[#2496ED]" };
  if (n.includes('vercel')) return { Icon: Triangle, color: "text-white" };
  if (n.includes('linux')) return { Icon: Terminal, color: "text-yellow-300" };
  if (n.includes('ci/cd') || n.includes('pipeline')) return { Icon: RefreshCcw, color: "text-green-500" };
  if (n.includes('cloud') || n.includes('netlify')) return { Icon: CloudUpload, color: "text-[#00C7B7]" };
  
  // AI & Others
  if (n.includes('artificial intelligence') || n.includes('ai')) return { Icon: BrainCircuit, color: "text-purple-400" };
  if (n.includes('machine learning') || n.includes('ml')) return { Icon: Cpu, color: "text-indigo-400" };
  if (n.includes('voice')) return { Icon: Mic, color: "text-blue-400" };
  if (n.includes('prompt')) return { Icon: MessageSquareText, color: "text-green-400" };
  if (n.includes('automation')) return { Icon: Settings, color: "text-gray-400" };
  
  // Software / Platforms
  if (n.includes('vs code')) return { Icon: Code2, color: "text-[#007ACC]" };
  if (n.includes('postman')) return { Icon: Send, color: "text-[#FF6C37]" };
  if (n.includes('figma')) return { Icon: PenTool, color: "text-[#F24E1E]" };
  if (n.includes('cloudinary')) return { Icon: ImageIcon, color: "text-[#3448C5]" };
  if (n.includes('firebase')) return { Icon: Flame, color: "text-[#FFCA28]" };

  return { Icon: Box, color: "text-gray-400" };
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function SkillsGrid({ groupedSkills }: { groupedSkills: Record<string, any[]> }) {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {Object.entries(groupedSkills).map(([category, skills]) => (
        <motion.div key={category} variants={itemVariants}>
          <Card className="bg-white/5 border-white/10 hover:border-neon-blue/50 transition-all duration-500 group hover:shadow-[0_0_30px_rgba(0,210,255,0.1)] hover:-translate-y-2 h-full flex flex-col">
            <div className="p-6 pb-4 border-b border-white/5">
              <h3 className="text-xl font-bold text-white group-hover:text-neon-blue transition-colors">{category}</h3>
            </div>
            <CardContent className="p-6 flex-1">
              <div className="grid grid-cols-2 gap-3">
                {skills.map(skill => {
                  const { Icon, color } = getSkillIcon(skill.name);
                  return (
                    <Badge 
                      key={skill.id} 
                      variant="outline" 
                      className="border-white/10 text-gray-300 hover:text-white hover:border-neon-blue bg-black/20 hover:bg-white/10 transition-all duration-300 flex items-center gap-2.5 py-2 px-3 cursor-default justify-start w-full group/badge"
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${color} group-hover/badge:scale-110 transition-transform`} />
                      <span className="truncate">{skill.name}</span>
                    </Badge>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
