const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const projects = await prisma.project.findMany();

  for (const project of projects) {
    let detailedOverview = project.detailedOverview;
    let keyFeatures = project.keyFeatures;

    const title = project.title.toLowerCase();

    if (title.includes('bus')) {
      detailedOverview = `Invertis Bus Saarthi is a comprehensive transport management solution designed specifically for educational institutions and large organizations. The platform revolutionizes how fleet operations are handled by providing real-time bus tracking, automated route optimization, and seamless communication between administrators, drivers, and commuters. 

Built with modern web technologies, it ensures high availability and precise location accuracy. It significantly reduces wait times and operational inefficiencies, making daily commutes safer and more predictable for thousands of users.`;
      keyFeatures = [
        "Real-time GPS Fleet Tracking & Geofencing",
        "Automated Route Optimization & Dispatch",
        "Role-Based Access for Drivers, Admins, and Users",
        "Instant SMS/Push Notification Alerts",
        "Comprehensive Analytics & Reporting Dashboard"
      ];
    } else if (title.includes('trip')) {
      detailedOverview = `TripDekho is an enterprise-grade travel and tourism platform that bridges the gap between avid travelers and local destination experiences. It offers a unified ecosystem where users can seamlessly discover pristine locations, book tailored tour packages, and reserve accommodations.

The platform is engineered with a scalable backend that supports high-concurrency booking systems and real-time availability checks. With a focus on intuitive UI/UX, TripDekho simplifies the complex travel planning process into a visually stunning, easy-to-navigate journey.`;
      keyFeatures = [
        "Dynamic Booking Engine with Real-time Availability",
        "Intelligent Recommendation Algorithm for Destinations",
        "Secure Payment Gateway Integration",
        "Vendor Management Portal for Hotels & Guides",
        "High-performance media delivery via Cloudinary"
      ];
    } else if (title.includes('sivi')) {
      detailedOverview = `SIVI AI is a next-generation voice-controlled operating system that redefines human-computer interaction. Moving beyond traditional command-line or graphical interfaces, SIVI AI allows users to interact with their technology through natural, conversational voice commands.

Powered by advanced NLP models and real-time speech recognition pipelines, the system can execute complex desktop operations, automate repetitive tasks, and provide contextual intelligence on the fly. It is designed to act as a seamless, hands-free assistant for power users and professionals.`;
      keyFeatures = [
        "Real-time Advanced Speech Recognition (ASR)",
        "Context-Aware Natural Language Processing (NLP)",
        "Deep System Integration for OS-level Control",
        "Extensible Plugin Architecture for Custom Commands",
        "Low-latency Edge Processing capabilities"
      ];
    } else if (title.includes('complaint')) {
      detailedOverview = `The Smart Complaint Management System is an innovative administrative tool deployed across university campuses to streamline maintenance workflows. It replaces outdated paper-based reporting with a dynamic, digital-first approach. 

Students and staff can effortlessly log infrastructure or IT issues, attach photographic evidence, and track resolution progress in real-time. On the backend, administrators benefit from an automated ticketing system that categorizes, prioritizes, and assigns tasks to the appropriate maintenance personnel, drastically reducing resolution turnaround times.`;
      keyFeatures = [
        "Automated Ticket Routing & Prioritization",
        "Image Uploads & Cloud Storage Integration",
        "Real-time Status Tracking & Email Notifications",
        "Comprehensive Admin Analytics Dashboard",
        "Secure Role-Based Access Control (RBAC)"
      ];
    }

    await prisma.project.update({
      where: { id: project.id },
      data: {
        detailedOverview,
        keyFeatures
      }
    });

    console.log(`Successfully updated deep details for: ${project.title}`);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
