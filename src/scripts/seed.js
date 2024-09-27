import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function seed() {
  const name = "admin";
  const email = "default@example.com";
  const password = await bcrypt.hash("defaultpassword", 10);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password,
      name,
    },
  });

  console.log("Seeding complete");
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
