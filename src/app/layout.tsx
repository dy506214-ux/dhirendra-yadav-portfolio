import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import FloatingContact from "@/components/FloatingContact";
import Script from "next/script";
import { Toaster } from "react-hot-toast";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://dhirendrayadav.me";
const siteTitle = "Dhirendra Yadav | Full Stack Developer & Startup Builder";
const siteDescription =
  "Dhirendra Yadav is a Full Stack Developer and Startup Builder from India. He builds scalable web apps, intelligent software systems, and real-world digital products using React, Next.js, Node.js, and MongoDB.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Dhirendra Yadav",
  },
  description: siteDescription,
  keywords: [
    "Dhirendra Yadav",
    "Full Stack Developer",
    "Startup Builder",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "MongoDB",
    "Web Developer India",
    "Software Engineer",
    "Tech Associate",
    "Invertis Innovation",
    "Portfolio",
    "JavaScript Developer",
    "TypeScript Developer",
  ],
  authors: [{ name: "Dhirendra Yadav", url: siteUrl }],
  creator: "Dhirendra Yadav",
  publisher: "Dhirendra Yadav",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Dhirendra Yadav Portfolio",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: `${siteUrl}/alok-2.jpeg`,
        width: 1200,
        height: 630,
        alt: "Dhirendra Yadav – Full Stack Developer & Startup Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    creator: "@dy506214-ux",
    images: [`${siteUrl}/alok-2.jpeg`],
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
    shortcut: "/favicon.png",
  },
  category: "technology",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dhirendra Yadav",
  url: siteUrl,
  image: `${siteUrl}/alok-2.jpeg`,
  jobTitle: "Full Stack Developer & Startup Builder",
  worksFor: {
    "@type": "Organization",
    name: "Invertis Innovation & Incubation",
  },
  sameAs: [
    "https://github.com/dy506214-ux",
    "https://www.linkedin.com/in/dhirendra-yadav-ux/",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "Node.js",
    "MongoDB",
    "TypeScript",
    "Full Stack Development",
    "Startup Building",
  ],
  description: siteDescription,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Dhirendra Yadav Portfolio",
  url: siteUrl,
  description: siteDescription,
  author: {
    "@type": "Person",
    name: "Dhirendra Yadav",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/projects?search={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#0A101E" />
        <meta name="color-scheme" content="dark" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.country" content="India" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="general" />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Script
          id="schema-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
        <Toaster position="bottom-right" />
        <FloatingContact />
      </body>
    </html>
  );
}
