import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

declare global {
  var db: PrismaClient;
}

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    // log: ['query', 'info', 'warn', 'error'],
  });
} else {
  if (!global.db) {
    global.db = new PrismaClient({
      // log: ["query", "info", "warn", "error"],
    });
  }
  prisma = global.db;
}

export default prisma;
