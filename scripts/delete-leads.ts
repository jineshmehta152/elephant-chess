import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Checking leads in database...");

  let countBefore = 0;
  if ((prisma as any).lead) {
    countBefore = await (prisma as any).lead.count();
  } else {
    const res: any = await prisma.$queryRawUnsafe(`SELECT COUNT(*)::int FROM "Lead"`);
    countBefore = res[0]?.count || 0;
  }
  console.log(`Found ${countBefore} lead(s) in database.`);

  let deletedCount = 0;
  if ((prisma as any).lead) {
    const result = await (prisma as any).lead.deleteMany({});
    deletedCount = result.count;
  } else {
    deletedCount = await prisma.$executeRawUnsafe(`DELETE FROM "Lead"`);
  }

  console.log(`Successfully deleted ${deletedCount} lead(s) from database.`);
}

main()
  .catch((e) => {
    console.error("Error deleting leads:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
