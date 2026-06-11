import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, GitBranch, CheckCircle2 } from "lucide-react";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export async function generateStaticParams() {
  const projects = await prisma.project.findMany();
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id }
  });

  if (!project) {
    notFound();
  }

  const projectData = project as any;

  return (
    <div className="bg-[#0A101E] min-h-screen text-white selection:bg-neon-blue/30 selection:text-white">
      <Navbar />
      <main className="pt-32 pb-20 px-6 relative z-10">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Back Button */}
          <Link href="/#projects" className="inline-flex items-center text-gray-400 hover:text-neon-blue transition-colors group">
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>
          
          {/* Header */}
          <div className="space-y-6">
            <AnimatedHeading as="h1" className="text-5xl md:text-6xl font-bold tracking-tight text-white">{project.title}</AnimatedHeading>
            <div className="flex flex-wrap gap-3">
              {project.techStack.map(tech => (
                <Badge key={tech} variant="secondary" className="bg-neon-blue/10 text-neon-blue text-sm px-4 py-1 hover:bg-neon-blue/20 transition-colors">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          {project.imageUrl && (
            <div className="relative w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden glass-card border border-white/10 group">
              <Image 
                src={project.imageUrl} 
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-transparent to-transparent opacity-80" />
            </div>
          )}

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-12 pt-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              <div className="glass-card p-8 md:p-10 rounded-3xl border border-white/10 space-y-6">
                <AnimatedHeading as="h2" className="text-3xl font-bold text-white flex items-center gap-3">
                  <span className="w-8 h-1 bg-neon-blue rounded-full"></span>
                  Overview
                </AnimatedHeading>
                <div className="text-gray-300 leading-relaxed text-lg space-y-6">
                  {projectData.detailedOverview ? (
                    <div className="whitespace-pre-line">{projectData.detailedOverview}</div>
                  ) : (
                    <>
                      <p>{project.description}</p>
                      <p>
                        This project was built with a strong focus on scalability, clean architecture, and modern UI/UX principles. It leverages {project.techStack.slice(0, 3).join(', ')} and other cutting-edge technologies to deliver a robust solution. The system is designed to be highly responsive, accessible, and performant across all devices, ensuring an optimal user experience.
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="glass-card p-8 md:p-10 rounded-3xl border border-white/10 space-y-6">
                <AnimatedHeading as="h2" className="text-3xl font-bold text-white flex items-center gap-3">
                  <span className="w-8 h-1 bg-neon-orange rounded-full"></span>
                  Key Features
                </AnimatedHeading>
                <ul className="space-y-4 text-gray-300 text-lg">
                  {(projectData.keyFeatures && projectData.keyFeatures.length > 0
                    ? projectData.keyFeatures
                    : [
                        "Responsive and modern glassmorphic UI design",
                        "Optimized performance with Server-Side Rendering",
                        "Secure and scalable database architecture",
                        "Seamless cross-platform functionality"
                      ]
                  ).map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column - Links & Meta */}
            <div className="space-y-8">
              <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-6 sticky top-32">
                <h3 className="text-xl font-bold text-white">Project Links</h3>
                <div className="space-y-4">
                  {project.liveLink ? (
                    <a href={project.liveLink} target="_blank" rel="noreferrer" className="flex items-center justify-between w-full p-4 bg-neon-blue/10 hover:bg-neon-blue/20 text-neon-blue rounded-xl transition-all font-medium border border-neon-blue/20 group">
                      <span className="flex items-center gap-3"><ExternalLink className="w-5 h-5" /> Live Demo</span>
                      <ArrowLeft className="w-4 h-4 rotate-135 group-hover:rotate-45 transition-transform" />
                    </a>
                  ) : (
                    <div className="p-4 bg-white/5 text-gray-500 rounded-xl cursor-not-allowed flex items-center gap-3 border border-white/5">
                      <ExternalLink className="w-5 h-5 opacity-50" /> Live Demo (Private)
                    </div>
                  )}
                  
                  {project.githubLink ? (
                    <a href={project.githubLink} target="_blank" rel="noreferrer" className="flex items-center justify-between w-full p-4 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all font-medium border border-white/10 group">
                      <span className="flex items-center gap-3"><GitBranch className="w-5 h-5" /> Source Code</span>
                      <ArrowLeft className="w-4 h-4 rotate-135 group-hover:rotate-45 transition-transform" />
                    </a>
                  ) : (
                    <div className="p-4 bg-white/5 text-gray-500 rounded-xl cursor-not-allowed flex items-center gap-3 border border-white/5">
                      <GitBranch className="w-5 h-5 opacity-50" /> Source Code (Private)
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
