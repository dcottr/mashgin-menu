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

  getMenu: publicProcedure.query(async ({ ctx }) => {
    // const post = await ctx.db.post.findFirst({
    //   orderBy: { createdAt: "desc" },
    // });

    return { title: "Menu" };
  }),
});
