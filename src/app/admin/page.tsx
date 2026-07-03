import { Layout, Users, FileText, Activity, Settings } from "lucide-react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [projectsCount, skillsCount, experiencesCount, achievementsCount] = await Promise.all([
    prisma.project.count(),
    prisma.techSkill.count(),
    prisma.experience.count(),
    prisma.achievement.count()
  ]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-sm sm:text-base text-gray-400">Welcome to your portfolio administration panel.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="glass-card p-4 sm:p-6 flex flex-col gap-4 hover:border-neon-blue/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-sm sm:text-base text-gray-400 font-medium">Total Projects</span>
            <div className="p-2 bg-neon-blue/10 text-neon-blue rounded-lg"><Layout className="w-4 h-4 sm:w-5 sm:h-5" /></div>
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-white">{projectsCount}</span>
        </div>

        <div className="glass-card p-4 sm:p-6 flex flex-col gap-4 hover:border-purple-500/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-sm sm:text-base text-gray-400 font-medium">Tech Skills</span>
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg"><Activity className="w-4 h-4 sm:w-5 sm:h-5" /></div>
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-white">{skillsCount}</span>
        </div>

        <div className="glass-card p-4 sm:p-6 flex flex-col gap-4 hover:border-green-500/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-sm sm:text-base text-gray-400 font-medium">Experiences</span>
            <div className="p-2 bg-green-500/10 text-green-400 rounded-lg"><FileText className="w-4 h-4 sm:w-5 sm:h-5" /></div>
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-white">{experiencesCount}</span>
        </div>

        <div className="glass-card p-4 sm:p-6 flex flex-col gap-4 hover:border-pink-500/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-sm sm:text-base text-gray-400 font-medium">Achievements</span>
            <div className="p-2 bg-pink-500/10 text-pink-400 rounded-lg"><Users className="w-4 h-4 sm:w-5 sm:h-5" /></div>
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-white">{achievementsCount}</span>
        </div>
      </div>

      <div className="glass-card p-4 sm:p-8">
        <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Quick Actions</h2>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Link href="/admin/projects" className="w-full sm:w-auto text-center px-4 sm:px-6 py-2 bg-neon-blue text-black font-medium rounded-xl hover:opacity-90 transition-opacity">
            Add New Project
          </Link>
          <Link href="/admin/settings" className="w-full sm:w-auto text-center px-4 sm:px-6 py-2 border border-white/20 text-white font-medium rounded-xl hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
            <Settings className="w-4 h-4" /> Manage Access
          </Link>
        </div>
      </div>
    </div>
  );
}
