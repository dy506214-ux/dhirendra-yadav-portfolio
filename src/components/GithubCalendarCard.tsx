'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
const GitHubCalendar = dynamic(() => import('react-github-calendar').then(mod => mod.GitHubCalendar), { ssr: false });
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitBranch, Loader2 } from "lucide-react";
import Link from "next/link";

export default function GithubCalendarCard({ username = "alokydv9045" }: { username?: string }) {
  const [mounted, setMounted] = useState(false);
  const [blockSize, setBlockSize] = useState(12);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      if (width < 400) {
        setBlockSize(8);
      } else if (width < 600) {
        setBlockSize(10);
      } else if (width < 768) {
        setBlockSize(11);
      } else {
        setBlockSize(12);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const selectLastFiveMonths = (contributions: any[]) => {
    const today = new Date();
    const fiveMonthsAgo = new Date();
    fiveMonthsAgo.setMonth(today.getMonth() - 5);
    
    return contributions.filter(day => {
      const date = new Date(day.date);
      return date >= fiveMonthsAgo;
    });
  };

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
          {mounted && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/20">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Live
            </div>
          )}
        </CardHeader>
        
        <CardContent className="relative z-10 pt-4 pb-8 w-full overflow-hidden flex flex-col items-center justify-center min-h-[160px]">
          {!mounted ? (
            <Loader2 className="w-8 h-8 text-neon-blue animate-spin opacity-50" />
          ) : (
            <div className="w-full flex justify-center overflow-hidden">
              <div className="max-w-full overflow-x-auto no-scrollbar">
                <GitHubCalendar 
                  username={username}
                  colorScheme="dark"
                  transformData={selectLastFiveMonths}
                  theme={{
                    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                    dark: ['rgba(255,255,255,0.1)', 'rgba(161, 32, 235, 0.4)', 'rgba(161, 32, 235, 0.6)', 'rgba(161, 32, 235, 0.8)', '#a120eb'],
                  }}
                  fontSize={isMobile ? 12 : 14}
                  blockSize={blockSize}
                  blockMargin={isMobile ? 3 : 4}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
