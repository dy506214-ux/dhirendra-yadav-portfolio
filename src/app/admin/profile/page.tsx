import { prisma } from "@/lib/prisma";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { revalidatePath } from "next/cache";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { ClientForm } from "@/components/ClientForm";

export default async function AdminProfilePage() {
  const profile = await prisma.profileInfo.findFirst() || {
    name: "", titles: [], bio: "", heroImage: "", emailAddress: "", resumeLink: ""
  };

  async function updateProfile(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const bio = formData.get("bio") as string;
    let heroImage = formData.get("heroImage") as string;
    let resumeLink = formData.get("resumeLink") as string;
    const titlesRaw = formData.get("titles") as string;
    const titles = titlesRaw.split(",").map(t => t.trim());

    const heroImageFile = formData.get("heroImageFile") as File;
    if (heroImageFile && heroImageFile.size > 0) {
      heroImage = await uploadToCloudinary(heroImageFile);
    }

    const resumeFile = formData.get("resumeFile") as File;
    if (resumeFile && resumeFile.size > 0) {
      resumeLink = await uploadToCloudinary(resumeFile);
    }

    const existing = await prisma.profileInfo.findFirst();
    if (existing) {
      await prisma.profileInfo.update({
        where: { id: existing.id },
        data: { name, bio, heroImage, titles, resumeLink }
      });
    } else {
      await prisma.profileInfo.create({
        data: { name, bio, heroImage, titles, resumeLink }
      });
    }
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/admin/profile");
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Profile Information</h1>
        <p className="text-gray-400">Update your hero section and about page content here. You can upload files directly.</p>
      </div>

      <Card className="bg-black/40 border-white/10 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-white">General Information</CardTitle>
          <CardDescription className="text-gray-400">These details are shown on your public homepage.</CardDescription>
        </CardHeader>
        <CardContent>
          <ClientForm action={updateProfile} className="space-y-6" resetOnSuccess={false}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                <Input id="name" name="name" defaultValue={profile.name} className="bg-black/50 border-white/10 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="titles" className="text-gray-300">Titles (comma separated)</Label>
                <Input id="titles" name="titles" defaultValue={profile.titles.join(", ")} className="bg-black/50 border-white/10 text-white" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-gray-300">Biography</Label>
              <Textarea id="bio" name="bio" defaultValue={profile.bio} className="bg-black/50 border-white/10 text-white min-h-[150px]" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="heroImageFile" className="text-gray-300">Upload Hero Image</Label>
                <Input type="file" id="heroImageFile" name="heroImageFile" accept="image/*" className="bg-black/50 border-white/10 text-white file:text-white" />
                <Input id="heroImage" name="heroImage" defaultValue={profile.heroImage || ""} placeholder="Or Fallback URL" className="bg-black/50 border-white/10 text-white mt-2" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="resumeFile" className="text-gray-300">Upload Resume PDF</Label>
                <Input type="file" id="resumeFile" name="resumeFile" accept=".pdf,.doc,.docx" className="bg-black/50 border-white/10 text-white file:text-white" />
                <Input id="resumeLink" name="resumeLink" defaultValue={profile.resumeLink || ""} placeholder="Or Fallback URL" className="bg-black/50 border-white/10 text-white mt-2" />
              </div>
            </div>

            <Button type="submit" className="bg-neon-blue text-black hover:bg-neon-blue/80 font-bold px-8">
              Save Changes
            </Button>
          </ClientForm>
        </CardContent>
      </Card>
    </div>
  );
}
