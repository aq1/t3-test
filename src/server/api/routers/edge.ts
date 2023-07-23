import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const edgeRouter = createTRPCRouter({
  getByTree: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.skillEdge.findMany({
        where: { tree: { slug: input.slug } },
      });
    }),
});
