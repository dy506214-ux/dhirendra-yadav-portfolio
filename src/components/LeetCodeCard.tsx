import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Target } from "lucide-react";
import Link from "next/link";

interface LeetCodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number;
}

export default async function LeetCodeCard({ username = "alokyadav9045" }: { username?: string }) {
  let stats: LeetCodeStats | null = null;
  
  try {
    const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`, { next: { revalidate: 3600 } });
    const data = await res.json();
    if (data.status === "success") {
      stats = data;
    }
  } catch {
    // API failed, silent fallback
  }

  // Fallback data provided by user if API fails
  const data = stats || {
    totalSolved: 87,
    totalQuestions: 3958,
    easySolved: 40,
    totalEasy: 949,
    mediumSolved: 35,
    totalMedium: 2067,
    hardSolved: 12,
    totalHard: 942,
    acceptanceRate: 88.36,
    ranking: 1717889,
  };


  return (
    <Link href={`https://leetcode.com/${username}/`} target="_blank" className="block w-full h-full">
      <Card className="glass-card hover:border-orange-500/50 transition-all duration-300 group overflow-hidden relative h-full flex flex-col">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-orange-500/20 transition-all" />
        
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2 relative z-10 gap-4 sm:gap-0">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.396.702-1.863l4.332-4.363c.467-.467 1.112-.662 1.824-.662s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636c-1.111-1.11-2.646-1.577-4.343-1.577s-3.232.467-4.343 1.577l-4.332 4.363c-1.112 1.111-1.579 2.647-1.579 4.344s.467 3.233 1.579 4.344l4.332 4.363c1.111 1.111 2.646 1.577 4.343 1.577s3.232-.466 4.343-1.577l2.609-2.636c.514-.514.496-1.365-.039-1.901-.535-.535-1.386-.553-1.9-.038z" />
                <path d="M20.915 11.284l-6.845-1.332c-.524-.103-1.037.243-1.14.767-.103.524.243 1.036.767 1.14l6.845 1.332c.524.102 1.037-.243 1.14-.767.102-.524-.243-1.037-.767-1.14z" />
              </svg>
            </div>
            <div className="min-w-0">
              <CardTitle className="text-lg sm:text-xl text-white flex items-center gap-2 truncate">
                LeetCode Stats
              </CardTitle>
              <p className="text-xs sm:text-sm text-gray-400 truncate">@{username}</p>
            </div>
          </div>
          <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto bg-white/5 sm:bg-transparent p-2 sm:p-0 rounded-lg sm:rounded-none">
            <div className="text-xs sm:text-sm text-gray-400 flex items-center gap-1">
              <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" /> Rank
            </div>
            <div className="text-sm sm:text-base font-bold text-white tracking-tight">{data.ranking.toLocaleString()}</div>
          </div>
        </CardHeader>
        
        <CardContent className="relative z-10 pt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <div className="bg-black/40 rounded-xl p-3 sm:p-4 border border-white/5">
              <div className="text-gray-400 text-xs sm:text-sm mb-1 flex items-center gap-1 sm:gap-2">
                <Target className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" /> Solved
              </div>
              <div className="text-lg sm:text-2xl font-bold text-white">
                {data.totalSolved} <span className="text-[10px] sm:text-sm text-gray-500 font-normal">/ {data.totalQuestions}</span>
              </div>
            </div>
            <div className="bg-black/40 rounded-xl p-3 sm:p-4 border border-white/5">
              <div className="text-emerald-400 text-xs sm:text-sm mb-1 font-medium">Easy</div>
              <div className="text-base sm:text-xl font-bold text-white">
                {data.easySolved} <span className="text-[10px] sm:text-xs text-gray-500 font-normal">/ {data.totalEasy}</span>
              </div>
            </div>
            <div className="bg-black/40 rounded-xl p-3 sm:p-4 border border-white/5">
              <div className="text-yellow-400 text-xs sm:text-sm mb-1 font-medium">Medium</div>
              <div className="text-base sm:text-xl font-bold text-white">
                {data.mediumSolved} <span className="text-[10px] sm:text-xs text-gray-500 font-normal">/ {data.totalMedium}</span>
              </div>
            </div>
            <div className="bg-black/40 rounded-xl p-3 sm:p-4 border border-white/5">
              <div className="text-red-400 text-xs sm:text-sm mb-1 font-medium">Hard</div>
              <div className="text-base sm:text-xl font-bold text-white">
                {data.hardSolved} <span className="text-[10px] sm:text-xs text-gray-500 font-normal">/ {data.totalHard}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Acceptance Rate</span>
                <span className="text-white font-medium">{data.acceptanceRate}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-orange-500 h-2 rounded-full transition-all duration-1000" 
                  style={{ width: `${data.acceptanceRate}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
