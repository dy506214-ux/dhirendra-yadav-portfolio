import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const projects = [
  {
    title: "Aethervia",
    description: "Modern beauty and skincare brand platform offering personalized skincare solutions and premium products.",
    detailedOverview: "Aethervia is a comprehensive e-commerce platform built for a modern beauty and skincare brand. It focuses on providing a seamless shopping experience with elegant design, high-quality imagery, and an intuitive user interface. The platform features product cataloging, secure checkout, and personalized skincare recommendations.",
    keyFeatures: ["E-commerce functionality", "Modern & elegant UI", "Product categorization", "Responsive design", "Secure checkout"],
    imageUrl: "/aetehrvia.png",
    techStack: ["Next.js", "Tailwind CSS", "TypeScript", "Node.js"],
    liveLink: "https://aetehrvia.com",
    featured: true
  },
  {
    title: "School ERP System",
    description: "Comprehensive Enterprise Resource Planning system tailored for educational institutions to manage administrative and academic operations.",
    detailedOverview: "A centralized ERP system designed to streamline school operations, including student enrollment, attendance tracking, grade management, fee processing, and parent-teacher communication. The system improves efficiency and provides real-time insights into school performance.",
    keyFeatures: ["Student & Staff Management", "Attendance & Grading", "Fee Management", "Parent Portal", "Analytics Dashboard"],
    imageUrl: "/Erp systems.png",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    featured: true
  },
  {
    title: "Invertis Innovation & Incubation",
    description: "Official website for Invertis Innovation & Incubation, fostering startups, entrepreneurship, and innovation.",
    detailedOverview: "The platform serves as the digital front door for the Invertis Innovation & Incubation center. It provides information about incubation programs, mentorship opportunities, successful startups, and upcoming events, facilitating the growth of the entrepreneurial ecosystem.",
    keyFeatures: ["Program information", "Event management", "Startup showcases", "Application portal", "Responsive layout"],
    imageUrl: "/invertis incubation.png",
    techStack: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    liveLink: "https://invertisincubation.com",
    featured: true
  },
  {
    title: "Nayi Bareilly",
    description: "A civic issue reporting system empowering citizens to report, track, and resolve local community issues.",
    detailedOverview: "Nayi Bareilly is a smart city initiative platform that allows residents to report civic issues like potholes, waste management problems, and street light failures directly to the concerned municipal departments. It features geo-tagging, status tracking, and a department dashboard for issue resolution.",
    keyFeatures: ["Issue reporting with images", "Geo-tagging", "Real-time status tracking", "Department dashboard", "Analytics and reporting"],
    imageUrl: "/nayibareilly.png",
    techStack: ["Next.js", "Node.js", "MongoDB", "Prisma", "Tailwind CSS"],
    featured: true
  }
];

async function main() {
  console.log('Start seeding projects...');
  for (const project of projects) {
    const existingProject = await prisma.project.findFirst({
      where: { title: project.title }
    });
    if (!existingProject) {
      await prisma.project.create({
        data: project
      });
      console.log(`Created project: ${project.title}`);
    } else {
      await prisma.project.update({
        where: { id: existingProject.id },
        data: project
      });
      console.log(`Updated project: ${project.title}`);
    }
  }
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
