import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const skillRouter = createTRPCRouter({
  getByTree: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.skill.findMany({where: {tree: {slug: input.slug}}});
    }),
});
