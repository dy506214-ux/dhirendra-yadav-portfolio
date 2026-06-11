import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, GitBranch } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";

export default async function ProjectsSection() {
  const projects = await prisma.project.findMany({
    orderBy: { featured: 'desc' }
  });

  return (
    <div id="projects" className="max-w-7xl mx-auto px-6 pt-32 relative z-10 scroll-mt-20">
      <div className="space-y-4 mb-16">
        <AnimatedHeading as="h1" className="text-5xl md:text-6xl font-bold text-white tracking-tight">
          Featured <span className="text-gradient">Projects</span>
        </AnimatedHeading>
        <p className="text-xl text-gray-400 max-w-2xl">
          A selection of my recent work in web development, SaaS platforms, and intelligent software systems.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-20 glass-card rounded-3xl">
          <AnimatedHeading as="h2" className="text-2xl text-gray-400">No projects added yet.</AnimatedHeading>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="bg-white/5 border-white/10 hover:border-neon-blue/50 transition-colors group overflow-hidden flex flex-col h-full">
              {project.imageUrl && (
                <Link href={`/projects/${project.id}`} className="relative w-full h-48 overflow-hidden block">
                  <Image 
                    src={project.imageUrl} 
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
              )}
              <CardHeader>
                <Link href={`/projects/${project.id}`}>
                  <CardTitle className="text-white text-xl hover:text-neon-blue transition-colors cursor-pointer">{project.title}</CardTitle>
                </Link>
                <CardDescription className="text-gray-400 line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(tech => (
                    <Badge key={tech} variant="secondary" className="bg-neon-blue/10 text-neon-blue hover:bg-neon-blue/20">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-4 pt-4 border-t border-white/10 mt-auto">
                {project.liveLink && (
                  <Link href={project.liveLink} target="_blank" className="text-sm font-medium text-white flex items-center gap-2 hover:text-neon-blue transition-colors">
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </Link>
                )}
                {project.githubLink && (
                  <Link href={project.githubLink} target="_blank" className="text-sm font-medium text-white flex items-center gap-2 hover:text-gray-300 transition-colors">
                    <GitBranch className="w-4 h-4" /> Code
                  </Link>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
