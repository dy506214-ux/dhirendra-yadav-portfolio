import { prisma } from "@/lib/prisma";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { revalidatePath } from "next/cache";
import { ClientForm } from "@/components/ClientForm";

export const dynamic = 'force-dynamic';

export default async function AdminAchievementsPage() {
  const achievements = await prisma.achievement.findMany({ orderBy: { id: 'desc' } });

  async function addAchievement(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const date = formData.get("date") as string;
    const issuer = formData.get("issuer") as string;
    const link = formData.get("link") as string;

    if (!title || !description || !date) return;

    await prisma.achievement.create({
      data: { title, description, date, issuer, link }
    });
    
    revalidatePath("/");
    revalidatePath("/achievements");
    revalidatePath("/admin/achievements");
  }

  async function deleteAchievement(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await prisma.achievement.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/achievements");
    revalidatePath("/admin/achievements");
  }

  return (
    <div className="max-w-6xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Manage Achievements</h1>
        <p className="text-gray-400">Add or remove your achievements and certifications.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Add Form */}
        <Card className="bg-black/40 border-white/10 backdrop-blur-md h-fit">
          <CardHeader>
            <CardTitle className="text-white">Add New Achievement</CardTitle>
          </CardHeader>
          <CardContent>
            <ClientForm action={addAchievement} className="space-y-4" successMessage="Achievement added!">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-300">Title</Label>
                <Input id="title" name="title" required className="bg-black/50 border-white/10 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-300">Description</Label>
                <Textarea id="description" name="description" required className="bg-black/50 border-white/10 text-white min-h-[100px]" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-gray-300">Date (e.g., Aug 2024)</Label>
                  <Input id="date" name="date" required className="bg-black/50 border-white/10 text-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="issuer" className="text-gray-300">Issuer (Optional)</Label>
                  <Input id="issuer" name="issuer" className="bg-black/50 border-white/10 text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="link" className="text-gray-300">Credential Link (Optional)</Label>
                <Input id="link" name="link" className="bg-black/50 border-white/10 text-white" />
              </div>
              <Button type="submit" className="w-full bg-neon-blue text-black hover:bg-neon-blue/80 font-bold">
                Add Achievement
              </Button>
            </ClientForm>
          </CardContent>
        </Card>

        {/* List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Existing Achievements</h2>
          {achievements.length === 0 ? (
            <p className="text-gray-500">No achievements found.</p>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {achievements.map(item => (
                <Card key={item.id} className="bg-white/5 border-white/10">
                  <CardHeader className="py-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white text-lg">{item.title}</CardTitle>
                        <CardDescription className="text-gray-400 mt-1">{item.date}</CardDescription>
                      </div>
                      <ClientForm action={deleteAchievement} successMessage="Achievement deleted!">
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
