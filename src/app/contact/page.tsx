import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/sections/ContactSection";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Dhirendra Yadav – Full Stack Developer & Startup Builder. Available for freelance projects, collaborations, and full-time opportunities. Reach out via email or LinkedIn.",
  alternates: { canonical: "https://dhirendrayadav.me/contact" },
  openGraph: {
    title: "Contact Dhirendra Yadav | Full Stack Developer",
    description:
      "Hire or collaborate with Dhirendra Yadav. Available for freelance, startups, and full-time roles in Full Stack Development.",
    url: "https://dhirendrayadav.me/contact",
    images: [{ url: "https://dhirendrayadav.me/alok-2.jpeg", width: 1200, height: 630, alt: "Contact Dhirendra Yadav" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Dhirendra Yadav | Full Stack Developer",
    description: "Get in touch with Dhirendra Yadav for freelance, collaboration, or full-time opportunities.",
    images: ["https://dhirendrayadav.me/alok-2.jpeg"],
  },
};

export default function ContactPage() {
  return (
    <>
      <main className="min-h-screen relative pb-20">
        <Navbar />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
