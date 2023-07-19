import { treeRouter } from "~/server/api/routers/tree";
import { skillRouter } from "~/server/api/routers/skill";
import { createTRPCRouter } from "~/server/api/trpc";
import { edgeRouter } from "./routers/edge";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  tree: treeRouter,
  skill: skillRouter,
  edge: edgeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
