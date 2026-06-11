const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  try {
    const admins = await prisma.admin.findMany();
    console.log(admins);
  } catch(e) {
    console.error('Error fetching admins:', e);
  } finally {
    await prisma.$disconnect();
  }
}
main();
