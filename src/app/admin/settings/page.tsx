import { prisma } from "@/lib/prisma";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { addAdmin, changePassword, deleteAdmin } from "./actions";

export default async function AdminSettingsPage() {
  const admins = await prisma.admin.findMany({ select: { id: true, email: true, name: true } });

  return (
    <div className="max-w-6xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Admin Settings</h1>
        <p className="text-gray-400">Manage administrator access and security.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Add User Form */}
        <Card className="bg-black/40 border-white/10 backdrop-blur-md h-fit">
          <CardHeader>
            <CardTitle className="text-white">Add New Admin User</CardTitle>
            <CardDescription className="text-gray-400">Create a new administrator account.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={addAdmin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">Name</Label>
                <Input id="name" name="name" required className="bg-black/50 border-white/10 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                <Input id="email" name="email" type="email" required className="bg-black/50 border-white/10 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <Input id="password" name="password" type="password" required className="bg-black/50 border-white/10 text-white" />
              </div>
              <Button type="submit" className="w-full bg-neon-blue text-black hover:bg-neon-blue/80 font-bold">
                Add User
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {/* Change Password Form */}
          <Card className="bg-black/40 border-white/10 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white">Change Password</CardTitle>
              <CardDescription className="text-gray-400">Update an existing administrator's password.</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={changePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="targetEmail" className="text-gray-300">Admin Email</Label>
                  <Input id="targetEmail" name="email" type="email" required className="bg-black/50 border-white/10 text-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-gray-300">New Password</Label>
                  <Input id="newPassword" name="newPassword" type="password" required className="bg-black/50 border-white/10 text-white" />
                </div>
                <Button type="submit" className="w-full border border-white/20 text-white hover:bg-white/5 font-bold">
                  Update Password
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* List of Admins */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Existing Admins</h2>
            {admins.length === 0 ? (
              <p className="text-gray-500">No admins found.</p>
            ) : (
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {admins.map(admin => (
                  <Card key={admin.id} className="bg-white/5 border-white/10">
                    <CardHeader className="py-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-white text-base">{admin.name}</CardTitle>
                          <CardDescription className="text-gray-400 text-sm">{admin.email}</CardDescription>
                        </div>
                        <form action={deleteAdmin}>
                          <input type="hidden" name="id" value={admin.id} />
                          <Button type="submit" variant="destructive" size="sm" className="bg-red-500/20 text-red-500 hover:bg-red-500/40 border-0">
                            Revoke
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
    </div>
  );
}
