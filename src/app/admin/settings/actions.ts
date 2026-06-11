"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function addAdmin(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) throw new Error("Missing fields");

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.admin.create({
      data: { name, email, password: hashedPassword }
    });
    
    revalidatePath("/admin/settings");
  } catch (error) {
    console.error("Error adding admin:", error);
    throw new Error("Failed to add admin or email already exists");
  }
}

export async function changePassword(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const newPassword = formData.get("newPassword") as string;

    if (!email || !newPassword) throw new Error("Missing fields");

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.admin.update({
      where: { email },
      data: { password: hashedPassword }
    });
    
    revalidatePath("/admin/settings");
  } catch (error) {
    console.error("Error changing password:", error);
    throw new Error("Failed to change password. Admin not found.");
  }
}

export async function deleteAdmin(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    await prisma.admin.delete({ where: { id } });
    revalidatePath("/admin/settings");
  } catch (error) {
    console.error("Error deleting admin:", error);
    throw new Error("Failed to delete admin");
  }
}
