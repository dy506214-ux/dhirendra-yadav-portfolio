"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Eye } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const router = useRouter();

  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const isConfirmed = window.confirm("You are entering the Admin Panel. Do you want to continue?");
    if (isConfirmed) {
      window.location.href = "/admin";
    }
  };

  return (
    <footer className="w-full border-t border-white/10 bg-[#060913] relative z-20 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="text-2xl font-bold tracking-tighter font-mono">
              <span className="text-gradient">&lt; /&gt;</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Building intelligent software solutions.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="https://github.com/alokydv9045" target="_blank" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-white hover:border-neon-blue/50 transition-colors">
              <GithubIcon className="w-5 h-5" />
            </Link>
            <Link href="https://www.linkedin.com/in/alok-yadav-906920292/" target="_blank" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-[#0a66c2] hover:border-[#0a66c2]/50 transition-colors">
              <LinkedinIcon className="w-5 h-5" />
            </Link>
            <Link href="https://twitter.com/alokyadav" target="_blank" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-[#1d9bf0] hover:border-[#1d9bf0]/50 transition-colors">
              <TwitterIcon className="w-5 h-5" />
            </Link>
            <Link href="mailto:Alokyadav83956@gmail.com" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-neon-blue hover:border-neon-blue/50 transition-colors">
              <Mail className="w-5 h-5" />
            </Link>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {currentYear} Alok Yadav. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/about" className="hover:text-gray-300 transition-colors">About</Link>
            <Link href="/projects" className="hover:text-gray-300 transition-colors">Projects</Link>
            <Link href="/skills" className="hover:text-gray-300 transition-colors">Skills</Link>
            <Link href="/education" className="hover:text-gray-300 transition-colors">Education</Link>
            <Link href="/experience" className="hover:text-gray-300 transition-colors">Experience</Link>
            <Link href="/contact" className="hover:text-gray-300 transition-colors">Contact</Link>
            <button onClick={handleAdminClick} className="p-1.5 rounded-full hover:bg-white/10 text-gray-500 hover:text-neon-blue transition-colors ml-2" title="Admin Access">
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
