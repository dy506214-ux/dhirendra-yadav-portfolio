import { prisma } from "@/lib/prisma";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { revalidatePath } from "next/cache";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { id: 'desc' } });

  async function addProject(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const liveLink = formData.get("liveLink") as string;
    const githubLink = formData.get("githubLink") as string;
    const techStackRaw = formData.get("techStack") as string;
    const techStack = techStackRaw.split(",").map(t => t.trim());
    const detailedOverview = formData.get("detailedOverview") as string;
    const keyFeaturesRaw = formData.get("keyFeatures") as string;
    const keyFeatures = keyFeaturesRaw ? keyFeaturesRaw.split("|").map(f => f.trim()) : [];

    if (!title || !description) return;

    await prisma.project.create({
      data: { title, description, imageUrl, liveLink, githubLink, techStack, detailedOverview, keyFeatures } as any
    });
    
    revalidatePath("/projects");
    revalidatePath("/admin/projects");
  }

  async function deleteProject(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await prisma.project.delete({ where: { id } });
    revalidatePath("/projects");
    revalidatePath("/admin/projects");
  }

  return (
    <div className="max-w-6xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Manage Projects</h1>
        <p className="text-gray-400">Add or remove portfolio projects.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Add Project Form */}
        <Card className="bg-black/40 border-white/10 backdrop-blur-md h-fit">
          <CardHeader>
            <CardTitle className="text-white">Add New Project</CardTitle>
            <CardDescription className="text-gray-400">Create a new project entry.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={addProject} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-300">Project Title</Label>
                <Input id="title" name="title" required className="bg-black/50 border-white/10 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-300">Description</Label>
                <Textarea id="description" name="description" required className="bg-black/50 border-white/10 text-white min-h-[100px]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="techStack" className="text-gray-300">Tech Stack (comma separated)</Label>
                <Input id="techStack" name="techStack" placeholder="React, Node.js, MongoDB" className="bg-black/50 border-white/10 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="detailedOverview" className="text-gray-300">Detailed Overview (for detail page)</Label>
                <Textarea id="detailedOverview" name="detailedOverview" placeholder="Write a deep overview of the project..." className="bg-black/50 border-white/10 text-white min-h-[150px]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="keyFeatures" className="text-gray-300">Key Features (pipe | separated)</Label>
                <Input id="keyFeatures" name="keyFeatures" placeholder="Responsive UI | Secure DB | Optimized Performance" className="bg-black/50 border-white/10 text-white" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="imageUrl" className="text-gray-300">Image URL</Label>
                  <Input id="imageUrl" name="imageUrl" className="bg-black/50 border-white/10 text-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="liveLink" className="text-gray-300">Live URL</Label>
                  <Input id="liveLink" name="liveLink" className="bg-black/50 border-white/10 text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="githubLink" className="text-gray-300">GitHub URL</Label>
                <Input id="githubLink" name="githubLink" className="bg-black/50 border-white/10 text-white" />
              </div>
              <Button type="submit" className="w-full bg-neon-blue text-white hover:bg-neon-blue/80 font-bold">
                Add Project
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* List of Projects */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Existing Projects</h2>
          {projects.length === 0 ? (
            <p className="text-gray-500">No projects found.</p>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {projects.map(project => (
                <Card key={project.id} className="bg-white/5 border-white/10">
                  <CardHeader className="py-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white text-lg">{project.title}</CardTitle>
                        <CardDescription className="text-gray-400 line-clamp-1">{project.description}</CardDescription>
                      </div>
                      <form action={deleteProject}>
                        <input type="hidden" name="id" value={project.id} />
                        <Button type="submit" variant="destructive" size="sm" className="bg-red-500/20 text-red-500 hover:bg-red-500/40 border-0">
                          Delete
                        </Button>
                      </form>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
