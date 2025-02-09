import { PrismaClient } from "@prisma/client";
import data from "./data.json";

const prisma = new PrismaClient();

// TODO: Figure out why bun can't run the seed directly when running `bun run db:generate`
async function main() {
  await Promise.all(
    data.categories.map((category) =>
      prisma.menuCategory.upsert({
        where: { id: category.id },
        update: {},
        create: {
          name: category.name,
          imageURL: `https://8efhnqurvrogwnda.public.blob.vercel-storage.com/${category.imageID}.jpg`,
          MenuItem: {
            createMany: {
              data: category.items.map((item) => ({
                name: item.name,
                priceInCents: item.price * 100,
                imageURL: `https://8efhnqurvrogwnda.public.blob.vercel-storage.com/${item.imageID}.jpg`,
              })),
            },
          },
        },
      })
    )
  );

  console.log("Data seeded successfully");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
