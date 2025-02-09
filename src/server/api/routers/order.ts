import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const zPositiveInt = z.number().int().gt(0);

// Endpoints types are validated with zod
export const orderRouter = createTRPCRouter({
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
          cardNumber: z
            .string()
            .length(16)
            .regex(/^[0-9].*$/),
          expiry: z
            .string()
            .nonempty()
            .regex(/^\d{2}\/\d{2}$/),
          cvv: z.number().int().gt(0).lte(9999),
          name: z.string().nonempty(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // TODO: process payments with input.payment
      const [expiryMonth, expiryYear] = input.payment.expiry.split("/"); // Already validated by zod

      await ctx.db.order.create({
        data: {
          paymentDetails: {
            create: {
              cardNumber: input.payment.cardNumber,
              expiryMonth: Number(expiryMonth),
              expiryYear: Number(input.payment.expiry.split("/")[1]),
              cvv: input.payment.cvv,
              nameOnCard: input.payment.name,
            },
          },
          orderItem: {
            createMany: {
              data: input.order.map((order) => ({
                itemID: order.itemID,
                quantity: order.quantity,
              })),
            },
          },
        },
      });
      return { success: true };
    }),
});
