import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/sections/ContactSection";

export const revalidate = 60;

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
