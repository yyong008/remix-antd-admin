import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  // cleanup the existing database
  await prisma.user.deleteMany().catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashPassword = await bcrypt.hash("123456", 10);

  const superAdmin = await prisma.user.create({
    data: {
      username: "superAdmin",
      password: {
        create: {
          hash: hashPassword,
        },
      },
    },
  });

  const admin = await prisma.user.create({
    data: {
      username: "admin",
      password: {
        create: {
          hash: hashPassword,
        },
      },
    },
  });

  const user = await prisma.user.create({
    data: {
      username: "user",
      password: {
        create: {
          hash: hashPassword,
        },
      },
    },
  });

  console.log("superAdmin", superAdmin);
  console.log("admin", admin);
  console.log("user", user);

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
