import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const templateRouter = createTRPCRouter({
  byId: publicProcedure
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
          documentUpload: true,
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
