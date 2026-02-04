const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  for (let i = 1; i <= 50; i++) {
    await prisma.user.create({
      data: {
        name: `User ${i}`,
        email: `user${i}@test.com`,
      },
    });
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
