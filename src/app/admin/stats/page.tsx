import { prisma } from "@/lib/prisma";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { revalidatePath } from "next/cache";

export default async function AdminStatsPage() {
  const stats = await prisma.stat.findMany();

  async function addStat(formData: FormData) {
    "use server";
    const label = formData.get("label") as string;
    const value = formData.get("value") as string;

    await prisma.stat.create({
      data: { label, value, icon: "" }
    });
    revalidatePath("/");
    revalidatePath("/admin/stats");
  }

  async function deleteStat(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await prisma.stat.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin/stats");
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Stats & Metrics</h1>
        <p className="text-gray-400">Manage the numeric metrics shown on your homepage.</p>
      </div>

      <Card className="bg-black/40 border-white/10 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-white">Add New Metric</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={addStat} className="flex gap-4 items-end">
            <div className="space-y-2 flex-1">
              <Label htmlFor="label" className="text-gray-300">Label (e.g. "Projects Completed")</Label>
              <Input id="label" name="label" required className="bg-black/50 border-white/10 text-white" />
            </div>
            <div className="space-y-2 flex-1">
              <Label htmlFor="value" className="text-gray-300">Value (e.g. "25+")</Label>
              <Input id="value" name="value" required className="bg-black/50 border-white/10 text-white" />
            </div>
            <Button type="submit" className="bg-neon-blue text-black hover:bg-neon-blue/80 font-bold">
              Add
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map(stat => (
          <Card key={stat.id} className="bg-black/40 border-white/10 backdrop-blur-md relative group">
            <CardContent className="pt-6 text-center space-y-2">
              <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
              <p className="text-sm text-gray-400">{stat.label}</p>
              
              <form action={deleteStat} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <input type="hidden" name="id" value={stat.id} />
                <button type="submit" className="w-8 h-8 rounded-full bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors">
                  &times;
                </button>
              </form>
            </CardContent>
          </Card>
        ))}
        {stats.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            No metrics added yet.
          </div>
        )}
      </div>
    </div>
  );
}
