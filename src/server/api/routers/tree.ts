import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const treeRouter = createTRPCRouter({
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.skillTree.findFirst({where: {slug: input.slug}});
    }),
});
