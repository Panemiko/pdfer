import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

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

  listGlobalTemplates: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.template.findMany({
      where: {
        isGlobal: true,
      },
      include: {
        fields: true,
        documentUpload: true,
      },
    });
  }),
});
