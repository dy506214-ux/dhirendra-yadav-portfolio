import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectsSection from "@/components/sections/ProjectsSection";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Dhirendra Yadav's portfolio of 50+ projects – scalable web applications, startup platforms, and intelligent software systems built with React, Next.js, Node.js, and MongoDB.",
  alternates: { canonical: "https://dhirendrayadav.me/projects" },
  openGraph: {
    title: "Projects by Dhirendra Yadav | Full Stack Developer",
    description:
      "Explore 50+ projects built by Dhirendra Yadav, including scalable web apps, startup products, and intelligent software systems.",
    url: "https://dhirendrayadav.me/projects",
    images: [{ url: "https://dhirendrayadav.me/portfolio-screenshot.png", width: 1200, height: 630, alt: "Dhirendra Yadav Projects" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects by Dhirendra Yadav",
    description: "Explore 50+ real-world projects by Full Stack Developer Dhirendra Yadav.",
    images: ["https://dhirendrayadav.me/portfolio-screenshot.png"],
  },
};

export default function ProjectsPage() {
  return (
    <>
      <main className="min-h-screen relative pb-20">
        <Navbar />
        <ProjectsSection />
      </main>
      <Footer />
    </>
  );
}
