import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const zPositiveInt = z.number().int().gt(0);

// Endpoints types are validated with zod
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
    .input(z.object({ categoryID: zPositiveInt }))
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
    .input(z.object({ categoryID: zPositiveInt }))
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
  getCartItems: publicProcedure
    .input(z.object({ itemIDs: z.array(zPositiveInt) }))
    .query(async ({ ctx, input }) => {
      const items = await ctx.db.menuItem.findMany({
        where: {
          id: { in: input.itemIDs },
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
  checkout: publicProcedure
    .input(
      z.object({
        order: z.array(
          z.object({
            itemID: zPositiveInt,
            quantity: z.number().int().gt(0),
          })
        ),
        payment: z.object({
          cardNumber: z.number().int(),
          expiry: z.string().nonempty(),
          cvv: z.number(),
          name: z.string().nonempty(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // TODO: Do some final validation of CC, process the payment, and send the order to the kitchen
      console.log("Received order: ", input);
      return { success: true };
    }),
});
