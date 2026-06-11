import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import FloatingContact from "@/components/FloatingContact";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alok Yadav | Full Stack Developer & Startup Builder",
  description: "I build scalable web applications, intelligent software systems, and real-world digital products that solve meaningful problems.",
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
        <FloatingContact />
      </body>
    </html>
  );
}
