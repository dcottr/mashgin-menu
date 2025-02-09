import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const menuRouter = createTRPCRouter({
  getCategories: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.db.menuCategory.findMany({
      select: {
        id: true,
        name: true,
        imageURL: true,
      },
      orderBy: { createdAt: "desc" },
      take: 100, // Add pagination if we need more
    });

    return { categories };
  }),

  getCategoryName: publicProcedure
    .input(z.object({ categoryID: z.number().int().gt(0) }))
    .query(async ({ ctx, input }) => {
      const category = await ctx.db.menuCategory.findFirst({
        where: {
          id: input.categoryID,
        },
        select: {
          name: true,
        },
      });

      return { name: category?.name ?? undefined };
    }),

  getCategoryItems: publicProcedure
    .input(z.object({ categoryID: z.number().int().gt(0) }))
    .query(async ({ ctx, input }) => {
      const items = await ctx.db.menuItem.findMany({
        where: {
          categoryID: input.categoryID,
        },
        select: {
          id: true,
          name: true,
          imageURL: true,
          priceInCents: true,
        },
        orderBy: { createdAt: "desc" },
        take: 100, // Add pagination if we need more
      });

      return { items };
    }),
});
