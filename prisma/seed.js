import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log("Clearing database...");
  await prisma.profileInfo.deleteMany();
  await prisma.project.deleteMany();
  await prisma.techSkill.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.education.deleteMany();
  await prisma.service.deleteMany();
  await prisma.stat.deleteMany();
  await prisma.achievement.deleteMany();

  console.log("Seeding database...");

  // Seed Admin
  const adminExists = await prisma.admin.findUnique({ where: { email: 'admin@alokyadav.com' } });
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.admin.create({
      data: {
        email: 'admin@alokyadav.com',
        password: hashedPassword,
        name: 'Alok Yadav',
      }
    });
    console.log("Admin created (admin@alokyadav.com / admin123)");
  }

  // Seed Profile Info
  await prisma.profileInfo.create({
    data: {
      name: "Alok Yadav",
      titles: ["Full Stack Developer", "Tech Associate", "Startup Builder"],
      bio: "I build scalable web applications, intelligent software systems, and real-world digital products that solve meaningful problems. Currently serving as a Tech Associate at Invertis Innovation & Incubation, I work on product development, startup incubation projects, AI-powered solutions, and enterprise-grade software systems.",
      heroImage: "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?auto=format&fit=crop&w=800&q=80",
      githubUrl: "https://github.com/alokyadav",
      linkedinUrl: "https://linkedin.com/in/alokyadav",
      twitterUrl: "https://twitter.com/alokyadav",
      emailAddress: "admin@alokyadav.com"
    }
  });

  // Seed Stats
  await prisma.stat.createMany({
    data: [
      { label: "Projects Built", value: "50+", icon: "Layout" },
      { label: "Technologies", value: "20+", icon: "Code" },
      { label: "Hours of Coding", value: "1000+", icon: "Zap" },
      { label: "Startup Solutions", value: "5+", icon: "Rocket" },
    ]
  });

  // Seed Services
  await prisma.service.createMany({
    data: [
      { title: "Full Stack Web Development", description: "Custom web applications built with modern technologies using MERN/Next stack.", iconName: "Code" },
      { title: "SaaS Product Development", description: "Design and development of scalable subscription-based software platforms.", iconName: "Monitor" },
      { title: "AI-Powered Applications", description: "Integrating AI/ML models and intelligent features to build smarter applications.", iconName: "BrainCircuit" },
      { title: "Startup MVP Development", description: "Turning ideas into minimum viable products and helping startups launch faster.", iconName: "Rocket" },
      { title: "Database Architecture", description: "Designing efficient database schemas and optimized queries for high performance.", iconName: "Database" },
      { title: "Cloud & DevOps Solutions", description: "Deploying scalable applications using cloud platforms and DevOps best practices.", iconName: "Cloud" },
      { title: "UI/UX Focused Development", description: "Building beautiful, intuitive and user-friendly interfaces that drive engagement.", iconName: "Layout" },
      { title: "Enterprise Software Systems", description: "Developing secure, scalable and maintainable enterprise-grade software solutions.", iconName: "Shield" },
    ]
  });

  // Seed Projects
  await prisma.project.createMany({
    data: [
      {
        title: "Invertis Bus Saarthi",
        description: "A smart transportation management platform designed to solve bus overcrowding and seat availability issues through real-time tracking and intelligent seat monitoring.",
        techStack: ["React", "Node.js", "MongoDB", "Express", "Socket.IO"],
        featured: true,
        imageUrl: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "TripDekho",
        description: "An enterprise-grade travel and tourism platform connecting travelers with destinations, tour packages, hotels, and local experiences.",
        techStack: ["Next.js", "Node.js", "MongoDB", "Cloudinary"],
        featured: true,
        imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "SIVI AI",
        description: "An intelligent voice-controlled operating system that enables users to interact naturally with technology through AI-powered voice commands.",
        techStack: ["AI APIs", "Node.js", "React", "Speech Recognition"],
        featured: true,
        imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Smart Complaint Management System",
        description: "A role-based university maintenance platform where students can report issues through images and descriptions, while administrators manage workflows efficiently.",
        techStack: ["MERN Stack", "Cloud Storage", "RBAC Architecture"],
        featured: true,
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      }
    ]
  });

  // Seed Technical Skills
  const skills = [
    { name: "React.js", category: "Frontend" },
    { name: "Next.js", category: "Frontend" },
    { name: "JavaScript (ES6+)", category: "Frontend" },
    { name: "TypeScript", category: "Frontend" },
    { name: "HTML5", category: "Frontend" },
    { name: "CSS3", category: "Frontend" },
    { name: "Tailwind CSS", category: "Frontend" },
    { name: "Bootstrap", category: "Frontend" },
    { name: "Responsive Design", category: "Frontend" },
    { name: "UI/UX Design", category: "Frontend" },
    
    { name: "Node.js", category: "Backend" },
    { name: "Express.js", category: "Backend" },
    { name: "REST APIs", category: "Backend" },
    { name: "Authentication Systems", category: "Backend" },
    { name: "Microservices", category: "Backend" },
    { name: "Server Architecture", category: "Backend" },

    { name: "MongoDB", category: "Database" },
    { name: "MySQL", category: "Database" },
    { name: "PostgreSQL", category: "Database" },
    { name: "Database Design", category: "Database" },
    { name: "Query Optimization", category: "Database" },

    { name: "Git", category: "Cloud & DevOps" },
    { name: "GitHub", category: "Cloud & DevOps" },
    { name: "Docker", category: "Cloud & DevOps" },
    { name: "Vercel", category: "Cloud & DevOps" },
    { name: "Netlify", category: "Cloud & DevOps" },
    { name: "Linux", category: "Cloud & DevOps" },
    { name: "CI/CD", category: "Cloud & DevOps" },
    { name: "Cloud Deployment", category: "Cloud & DevOps" },

    { name: "Artificial Intelligence", category: "AI & Emerging Technologies" },
    { name: "Machine Learning Integration", category: "AI & Emerging Technologies" },
    { name: "Voice Assistants", category: "AI & Emerging Technologies" },
    { name: "Prompt Engineering", category: "AI & Emerging Technologies" },
    { name: "Automation Systems", category: "AI & Emerging Technologies" },

    { name: "VS Code", category: "Development Tools" },
    { name: "Postman", category: "Development Tools" },
    { name: "Figma", category: "Development Tools" },
    { name: "GitHub Actions", category: "Development Tools" },
    { name: "Cloudinary", category: "Development Tools" },
    { name: "Firebase", category: "Development Tools" },
  ];

  await prisma.techSkill.createMany({
    data: skills.map(skill => ({ name: skill.name, category: skill.category }))
  });

  // Seed Experience
  await prisma.experience.createMany({
    data: [
      {
        role: "Technical Associate",
        company: "Invertis Innovation and Incubation",
        startDate: "Sep 2025",
        endDate: "Present",
        current: true,
        description: "Technical Support, Support Services"
      },
      {
        role: "Full-stack Developer",
        company: "Arctic Innovage Private Limited",
        startDate: "Jan 2025",
        endDate: "Feb 2026",
        current: false,
        description: "Support Services and MERN Stack"
      },
      {
        role: "Google Cloud Arcade Facilitator '25",
        company: "Google Cloud Arcade Facilitator Program",
        startDate: "Apr 2025",
        endDate: "Jun 2025",
        current: false,
        description: "Google Cloud Platform (GCP)"
      },
      {
        role: "Full-stack Developer",
        company: "NullClass",
        startDate: "Jan 2025",
        endDate: "Mar 2025",
        current: false,
        description: "MERN Stack, Full-Stack Development"
      }
    ]
  });

  // Seed Education
  await prisma.education.createMany({
    data: [
      {
        degree: "Bachelor's of Computer Applications",
        institution: "Invertis University",
        startDate: "2023",
        endDate: "2026",
        grade: "A",
        description: "Skills: C (Programming Language), Microsoft Office"
      },
      {
        degree: "Intermediate",
        institution: "Baba International School",
        startDate: "2022",
        endDate: "2023",
        grade: "A"
      },
      {
        degree: "Highschool",
        institution: "Baba International School",
        startDate: "2020",
        endDate: "2021",
        grade: "A"
      }
    ]
  });

  // Seed Achievements (Certifications)
  await prisma.achievement.createMany({
    data: [
      {
        title: "Certificate of Participation in Capture The Flag of Pragyan'25",
        issuer: "Unstop",
        date: "Feb 2025",
        description: "Credential ID 0e608f34-e494-4d97-a5dc-e015663d2431"
      },
      {
        title: "SQL and Relational Databases 101",
        issuer: "Cognitive Class",
        date: "Feb 2025",
        description: "Credential ID 82871d7011b24b38bbe2a18bb6e8cb3a"
      },
      {
        title: "Python for Data Science",
        issuer: "IBM",
        date: "Feb 2025",
        description: "Data Science Certification"
      },
      {
        title: "Python 101 for Data Science",
        issuer: "United Latino Students Association",
        date: "Feb 2025",
        description: "Credential ID 75e472e44d194a02afd3ed1c8c75b8e6"
      },
      {
        title: "Certificate of Participation in Weekly Coding Challenge 10",
        issuer: "Unstop",
        date: "Jan 2025",
        description: "Credential ID cf3a253e-dd87-4524-b3aa-26989f3f5d65"
      },
      {
        title: "Full Stack Development",
        issuer: "Codec Technologies India",
        date: "Dec 2024",
        description: "Credential ID #3b9042bc27c1ce10 | Skills: Full-Stack Development, MERN"
      },
      {
        title: "Certificate of Participation in Idea Submission Round of Void Hacks() 6.0",
        issuer: "Unstop",
        date: "Dec 2024",
        description: "Credential ID 335a33a1-15de-4081-b166-45f5f1467098"
      },
      {
        title: "node(basic)",
        issuer: "HackerRank",
        date: "Jul 2024",
        description: "Basic Node.js Certification"
      },
      {
        title: "Data Visualization With Power BI course",
        issuer: "Great Learning",
        date: "Aug 2024",
        description: "Skills: visualization of power BI"
      },
      {
        title: "Power BI Micro Course",
        issuer: "coursepe",
        date: "Sep 2024",
        description: "Credential ID SQ21T01 | Skills: Microsoft Power BI"
      },
      {
        title: "AI Fundamentals for Data Professionals",
        issuer: "LinkedIn",
        date: "Jan 2024",
        description: "Skills: Data Science, Artificial Intelligence (AI)"
      },
      {
        title: "Learning Word Desktop (Microsoft 365)",
        issuer: "LinkedIn",
        date: "Jan 2024",
        description: "Skills: Microsoft Word"
      },
      {
        title: "Learning Excel Desktop (Microsoft 365)",
        issuer: "LinkedIn",
        date: "Jan 2024",
        description: "Skills: Office 365, Microsoft Excel"
      }
    ]
  });

  console.log("Seeding complete!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
