const fs = require('fs');
const env = fs.readFileSync('.env', 'utf8');
const match = env.match(/DATABASE_URL="?([^"\n\r]+)"?/);
if (match) {
  process.env.DATABASE_URL = match[1];
}

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
