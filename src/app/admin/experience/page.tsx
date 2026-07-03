import { prisma } from "@/lib/prisma";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { revalidatePath } from "next/cache";
import { ClientForm } from "@/components/ClientForm";

export const dynamic = 'force-dynamic';

export default async function AdminExperiencePage() {
  const experiences = await prisma.experience.findMany({ orderBy: { id: 'desc' } });

  async function addExperience(formData: FormData) {
    "use server";
    const role = formData.get("role") as string;
    const company = formData.get("company") as string;
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;
    const description = formData.get("description") as string;
    const current = formData.get("current") === "on";

    if (!role || !company || !startDate || !description) return;

    await prisma.experience.create({
      data: { role, company, startDate, endDate, description, current }
    });
    
    revalidatePath("/");
    revalidatePath("/experience");
    revalidatePath("/admin/experience");
  }

  async function deleteExperience(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await prisma.experience.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/experience");
    revalidatePath("/admin/experience");
  }

  return (
    <div className="max-w-6xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Manage Experience</h1>
        <p className="text-gray-400">Add or remove your work experience.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="bg-black/40 border-white/10 backdrop-blur-md h-fit">
          <CardHeader>
            <CardTitle className="text-white">Add New Role</CardTitle>
          </CardHeader>
          <CardContent>
            <ClientForm action={addExperience} className="space-y-4" successMessage="Experience added!">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-gray-300">Job Role</Label>
                  <Input id="role" name="role" required className="bg-black/50 border-white/10 text-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-gray-300">Company</Label>
                  <Input id="company" name="company" required className="bg-black/50 border-white/10 text-white" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-gray-300">Start Date (e.g. 2021)</Label>
                  <Input id="startDate" name="startDate" required className="bg-black/50 border-white/10 text-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate" className="text-gray-300">End Date</Label>
                  <Input id="endDate" name="endDate" className="bg-black/50 border-white/10 text-white" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="current" name="current" className="rounded border-white/10 bg-black/50" />
                <Label htmlFor="current" className="text-gray-300">I currently work here</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-300">Description</Label>
                <Textarea id="description" name="description" required className="bg-black/50 border-white/10 text-white min-h-[100px]" />
              </div>
              <Button type="submit" className="w-full bg-neon-blue text-white hover:bg-neon-blue/80 font-bold">
                Add Experience
              </Button>
            </ClientForm>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Existing Experience</h2>
          {experiences.length === 0 ? (
            <p className="text-gray-500">No experience found.</p>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {experiences.map(item => (
                <Card key={item.id} className="bg-white/5 border-white/10">
                  <CardHeader className="py-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white text-lg">{item.role}</CardTitle>
                        <CardDescription className="text-gray-400 mt-1">{item.company} | {item.startDate} - {item.current ? "Present" : item.endDate}</CardDescription>
                      </div>
                      <ClientForm action={deleteExperience} successMessage="Experience deleted!">
                        <input type="hidden" name="id" value={item.id} />
                        <Button type="submit" variant="destructive" size="sm" className="bg-red-500/20 text-red-500 hover:bg-red-500/40 border-0">
                          Delete
                        </Button>
                      </ClientForm>
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
