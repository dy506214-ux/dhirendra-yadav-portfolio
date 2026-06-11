const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const projects = await prisma.project.findMany();
  for (const p of projects) {
    let newImage = p.imageUrl;
    if (p.title.toLowerCase().includes('bus')) {
      newImage = '/bus-sarthi.png';
    } else if (p.title.toLowerCase().includes('trip')) {
      newImage = '/tripdekho.png';
    } else if (p.title.toLowerCase().includes('complaint')) {
      newImage = '/feedback.png';
    }

    if (newImage !== p.imageUrl) {
      await prisma.project.update({
        where: { id: p.id },
        data: { imageUrl: newImage }
      });
      console.log(`Updated ${p.title} with image ${newImage}`);
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
