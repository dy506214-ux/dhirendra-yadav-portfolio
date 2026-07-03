import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkillsSection from "@/components/sections/SkillsSection";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Discover Dhirendra Yadav's tech stack and skills: React, Next.js, Node.js, TypeScript, MongoDB, Python, and more. A versatile Full Stack Developer proficient in 10+ technologies.",
  alternates: { canonical: "https://dhirendrayadav.me/skills" },
  openGraph: {
    title: "Technical Skills | Dhirendra Yadav",
    description:
      "Dhirendra Yadav's complete tech stack: React, Next.js, Node.js, TypeScript, MongoDB, and 10+ more technologies.",
    url: "https://dhirendrayadav.me/skills",
    images: [{ url: "https://dhirendrayadav.me/alok-2.jpeg", width: 1200, height: 630, alt: "Dhirendra Yadav Technical Skills" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Skills | Dhirendra Yadav",
    description: "React, Next.js, Node.js, TypeScript, MongoDB and more – Dhirendra Yadav's tech stack.",
    images: ["https://dhirendrayadav.me/alok-2.jpeg"],
  },
};

export default function SkillsPage() {
  return (
    <>
      <main className="min-h-screen relative pb-20">
        <Navbar />
        <SkillsSection />
      </main>
      <Footer />
    </>
  );
}
