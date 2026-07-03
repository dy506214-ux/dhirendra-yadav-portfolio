import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutSection from "@/components/sections/AboutSection";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Dhirendra Yadav – a Full Stack Developer and Startup Builder from India. Discover his background, skills, and passion for building impactful digital products.",
  alternates: { canonical: "https://dhirendrayadav.me/about" },
  openGraph: {
    title: "About Dhirendra Yadav | Full Stack Developer",
    description:
      "Learn more about Dhirendra Yadav – a Full Stack Developer and Startup Builder from India specializing in React, Next.js, and Node.js.",
    url: "https://dhirendrayadav.me/about",
    images: [{ url: "https://dhirendrayadav.me/alok-2.jpeg", width: 1200, height: 630, alt: "About Dhirendra Yadav" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Dhirendra Yadav | Full Stack Developer",
    description: "Learn more about Dhirendra Yadav – Full Stack Developer & Startup Builder.",
    images: ["https://dhirendrayadav.me/alok-2.jpeg"],
  },
};

export default function AboutPage() {
  return (
    <>
      <main className="min-h-screen relative pb-20">
        <Navbar />
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}
