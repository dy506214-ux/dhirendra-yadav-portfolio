import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AchievementsSection from "@/components/sections/AchievementsSection";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Achievements",
  description:
    "View Dhirendra Yadav's certifications, awards, and accomplishments as a Full Stack Developer and Startup Builder. Recognitions from leading organizations in technology and innovation.",
  alternates: { canonical: "https://dhirendrayadav.me/achievements" },
  openGraph: {
    title: "Achievements & Certifications | Dhirendra Yadav",
    description:
      "Dhirendra Yadav's awards, certifications, and accomplishments in Full Stack Development and Startup Building.",
    url: "https://dhirendrayadav.me/achievements",
    images: [{ url: "https://dhirendrayadav.me/alok-2.jpeg", width: 1200, height: 630, alt: "Dhirendra Yadav Achievements" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Achievements & Certifications | Dhirendra Yadav",
    description: "Dhirendra Yadav's awards, certifications, and accomplishments as a developer.",
    images: ["https://dhirendrayadav.me/alok-2.jpeg"],
  },
};

export default function AchievementsPage() {
  return (
    <>
      <main className="min-h-screen relative pb-20">
        <Navbar />
        <AchievementsSection />
      </main>
      <Footer />
    </>
  );
}
