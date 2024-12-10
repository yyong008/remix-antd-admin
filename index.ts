import prisma from "./app/libs/prisma";

async function main() {
  const result = await prisma.department.create({
    data: {
      name: "123"
    }
  })
  console.log(result)
}

await main()
