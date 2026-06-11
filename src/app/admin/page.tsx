import { Layout, Users, FileText, Activity } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome to your portfolio administration panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 font-medium">Total Projects</span>
            <div className="p-2 bg-neon-blue/10 text-neon-blue rounded-lg"><Layout className="w-5 h-5" /></div>
          </div>
          <span className="text-3xl font-bold text-white">12</span>
        </div>

        <div className="glass-card p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 font-medium">Blog Posts</span>
            <div className="p-2 bg-neon-blue/10 text-neon-blue rounded-lg"><FileText className="w-5 h-5" /></div>
          </div>
          <span className="text-3xl font-bold text-white">4</span>
        </div>

        <div className="glass-card p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 font-medium">Services</span>
            <div className="p-2 bg-green-500/10 text-green-400 rounded-lg"><Activity className="w-5 h-5" /></div>
          </div>
          <span className="text-3xl font-bold text-white">8</span>
        </div>

        <div className="glass-card p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 font-medium">Profile Views</span>
            <div className="p-2 bg-pink-500/10 text-pink-400 rounded-lg"><Users className="w-5 h-5" /></div>
          </div>
          <span className="text-3xl font-bold text-white">1,204</span>
        </div>
      </div>

      <div className="glass-card p-8">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <button className="px-6 py-2 bg-neon-blue text-black font-medium rounded-xl hover:opacity-90">Add New Project</button>
          <button className="px-6 py-2 border border-white/20 text-white font-medium rounded-xl hover:bg-white/5">Write Blog Post</button>
        </div>
      </div>
    </div>
  );
}
