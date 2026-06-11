import { ArrowLeft, LayoutDashboard, Settings, User, Briefcase, FileText, LineChart } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 glass-card m-4 p-4 flex flex-col gap-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <span className="font-bold text-xl text-gradient">Admin Panel</span>
          <Link href="/" className="p-2 hover:bg-white/10 rounded-full text-gray-400">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
        
        <nav className="flex-1 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 text-neon-blue">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link href="/admin/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-gray-400">
            <User className="w-5 h-5" />
            <span className="font-medium">Profile Info</span>
          </Link>
          <Link href="/admin/projects" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-gray-400">
            <Briefcase className="w-5 h-5" />
            <span className="font-medium">Projects</span>
          </Link>
          <Link href="/admin/experience" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-gray-400">
            <FileText className="w-5 h-5" />
            <span className="font-medium">Experience</span>
          </Link>
          <Link href="/admin/skills" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-gray-400">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Skills</span>
          </Link>
          <Link href="/admin/achievements" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-gray-400">
            <FileText className="w-5 h-5" />
            <span className="font-medium">Achievements</span>
          </Link>
          <Link href="/admin/stats" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-gray-400">
            <LineChart className="w-5 h-5" />
            <span className="font-medium">Stats & Metrics</span>
          </Link>
        </nav>
        
        <div className="pt-4 border-t border-white/10">
          <Link href="/" className="w-full block text-center py-2 px-4 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors">
            Exit Admin Panel
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
