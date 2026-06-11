'use client';

import dynamic from 'next/dynamic';
const GitHubCalendar = dynamic(() => import('react-github-calendar').then(mod => mod.GitHubCalendar), { ssr: false });
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitBranch } from "lucide-react";
import Link from "next/link";

export default function GithubCalendarCard({ username = "alokydv9045" }: { username?: string }) {
  return (
    <Link href={`https://github.com/${username}`} target="_blank" className="block w-full h-full">
      <Card className="glass-card hover:border-neon-blue/50 transition-all duration-300 group overflow-hidden relative h-full flex flex-col justify-center">
        <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-neon-blue/20 transition-all" />
        
        <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-neon-blue/10 rounded-lg text-neon-blue flex items-center justify-center">
              <GitBranch className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-lg sm:text-xl text-white flex items-center gap-2">
                GitHub Contributions
              </CardTitle>
              <p className="text-xs sm:text-sm text-gray-400">@{username}</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="relative z-10 pt-4 pb-8 w-full overflow-x-auto no-scrollbar">
          <div className="min-w-[750px] lg:min-w-full">
            <GitHubCalendar 
              username={username}
              colorScheme="dark"
              theme={{
                light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                dark: ['rgba(255,255,255,0.1)', 'rgba(161, 32, 235, 0.4)', 'rgba(161, 32, 235, 0.6)', 'rgba(161, 32, 235, 0.8)', '#a120eb'],
              }}
              fontSize={14}
              blockSize={12}
              blockMargin={4}
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
