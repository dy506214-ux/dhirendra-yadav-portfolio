import { prisma } from "@/lib/prisma";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { revalidatePath } from "next/cache";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ClientForm } from "@/components/ClientForm";

export const dynamic = 'force-dynamic';

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  
  if (!project) {
    notFound();
  }

  async function updateProject(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    let imageUrl = formData.get("imageUrl") as string;
    const liveLink = formData.get("liveLink") as string;
    const githubLink = formData.get("githubLink") as string;
    const techStackRaw = formData.get("techStack") as string;
    const techStack = techStackRaw.split(",").map(t => t.trim());
    const detailedOverview = formData.get("detailedOverview") as string;
    const keyFeaturesRaw = formData.get("keyFeatures") as string;
    const keyFeatures = keyFeaturesRaw ? keyFeaturesRaw.split("|").map(f => f.trim()) : [];

    const imageFile = formData.get("imageFile") as File;
    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadToCloudinary(imageFile);
    }

    if (!title || !description) return;

    await prisma.project.update({
      where: { id },
      data: { title, description, imageUrl, liveLink, githubLink, techStack, detailedOverview, keyFeatures } as any
    });
    
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath(`/projects/${id}`);
    revalidatePath("/admin/projects");
    redirect("/admin/projects");
  }

  return (
    <div className="max-w-3xl space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/projects" className="p-2 hover:bg-white/10 rounded-full text-gray-400">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Edit Project</h1>
          <p className="text-gray-400">Update the details for {project.title}.</p>
        </div>
      </div>

      <Card className="bg-black/40 border-white/10 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-white">Project Details</CardTitle>
          <CardDescription className="text-gray-400">Make changes to the project and save.</CardDescription>
        </CardHeader>
        <CardContent>
          <ClientForm action={updateProject} className="space-y-4" successMessage="Project updated!" resetOnSuccess={false}>
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-300">Project Title</Label>
              <Input id="title" name="title" defaultValue={project.title} required className="bg-black/50 border-white/10 text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-300">Description</Label>
              <Textarea id="description" name="description" defaultValue={project.description} required className="bg-black/50 border-white/10 text-white min-h-[100px]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="techStack" className="text-gray-300">Tech Stack (comma separated)</Label>
              <Input id="techStack" name="techStack" defaultValue={project.techStack.join(", ")} className="bg-black/50 border-white/10 text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="detailedOverview" className="text-gray-300">Detailed Overview (for detail page)</Label>
              <Textarea id="detailedOverview" name="detailedOverview" defaultValue={project.detailedOverview || ""} className="bg-black/50 border-white/10 text-white min-h-[150px]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="keyFeatures" className="text-gray-300">Key Features (pipe | separated)</Label>
              <Input id="keyFeatures" name="keyFeatures" defaultValue={project.keyFeatures.join(" | ")} className="bg-black/50 border-white/10 text-white" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="imageFile" className="text-gray-300">Update Project Image</Label>
                <Input type="file" id="imageFile" name="imageFile" accept="image/*" className="bg-black/50 border-white/10 text-white file:text-white" />
                <Input id="imageUrl" name="imageUrl" defaultValue={project.imageUrl || ""} className="bg-black/50 border-white/10 text-white mt-2" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="liveLink" className="text-gray-300">Live URL</Label>
                <Input id="liveLink" name="liveLink" defaultValue={project.liveLink || ""} className="bg-black/50 border-white/10 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="githubLink" className="text-gray-300">GitHub URL</Label>
              <Input id="githubLink" name="githubLink" defaultValue={project.githubLink || ""} className="bg-black/50 border-white/10 text-white" />
            </div>
            <Button type="submit" className="w-full bg-neon-blue text-white hover:bg-neon-blue/80 font-bold">
              Save Changes
            </Button>
          </ClientForm>
        </CardContent>
      </Card>
    </div>
  );
}
