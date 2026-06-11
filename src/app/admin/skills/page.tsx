import { prisma } from "@/lib/prisma";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { revalidatePath } from "next/cache";

export default async function AdminSkillsPage() {
  const skills = await prisma.techSkill.findMany({ orderBy: { category: 'asc' } });

  async function addSkill(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const category = formData.get("category") as string;

    if (!name) return;

    await prisma.techSkill.create({
      data: { name, category: category || "Other" }
    });
    
    revalidatePath("/skills");
    revalidatePath("/about");
    revalidatePath("/admin/skills");
  }

  async function deleteSkill(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await prisma.techSkill.delete({ where: { id } });
    revalidatePath("/skills");
    revalidatePath("/about");
    revalidatePath("/admin/skills");
  }

  return (
    <div className="max-w-6xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Manage Skills</h1>
        <p className="text-gray-400">Add or remove technical skills from your portfolio.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="bg-black/40 border-white/10 backdrop-blur-md h-fit">
          <CardHeader>
            <CardTitle className="text-white">Add New Skill</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={addSkill} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">Skill Name (e.g. React, Node.js)</Label>
                <Input id="name" name="name" required className="bg-black/50 border-white/10 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="text-gray-300">Category (e.g. Frontend, Backend)</Label>
                <Input id="category" name="category" placeholder="Frontend" className="bg-black/50 border-white/10 text-white" />
              </div>
              <Button type="submit" className="w-full bg-neon-blue text-black hover:bg-neon-blue/80 font-bold">
                Add Skill
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Existing Skills</h2>
          {skills.length === 0 ? (
            <p className="text-gray-500">No skills found.</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2">
              {skills.map(item => (
                <Card key={item.id} className="bg-white/5 border-white/10">
                  <CardHeader className="p-4">
                    <div className="flex justify-between items-center gap-4">
                      <div>
                        <CardTitle className="text-white text-base">{item.name}</CardTitle>
                        <CardDescription className="text-gray-400 text-xs mt-1">{item.category}</CardDescription>
                      </div>
                      <form action={deleteSkill}>
                        <input type="hidden" name="id" value={item.id} />
                        <Button type="submit" variant="destructive" size="sm" className="h-8 bg-red-500/20 text-red-500 hover:bg-red-500/40 border-0">
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
