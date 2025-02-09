import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const menuRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getCategories: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.db.menuCategory.findMany({
      select: {
        id: true,
        name: true,
        imageURL: true,
      },
      orderBy: { createdAt: "desc" },
      take: 30, // Add pagination if we need more
    });

    return { categories };
  }),
  getCategoryItems: publicProcedure.query(async ({ ctx }) => {
    const items = await ctx.db.menuItem.findFirst({
      select: {
        id: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return { items };
  }),
});
