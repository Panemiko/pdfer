import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const templateRouter = createTRPCRouter({
  byId: protectedProcedure
    .input(
      z.object({
        templateId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.template.findUnique({
        where: {
          id: input.templateId,
        },
        include: {
          fields: true,
        },
      });
    }),
});
