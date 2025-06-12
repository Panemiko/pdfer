import type { JsonArray } from "@prisma/client/runtime/library";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const chatRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        templateId: z.string().cuid2(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const template = await ctx.db.template.findUnique({
        where: { id: input.templateId },
      });

      if (!template) {
        throw new TRPCError({
          code: "FORBIDDEN",
        });
      }

      return await ctx.db.chat.create({
        data: {
          templateId: template.id,
          userId: ctx.session?.user.id ?? null,
          messages: [] as JsonArray,
        },
      });
    }),

  byId: publicProcedure
    .input(
      z.object({
        chatId: z.string().cuid2(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const chat = await ctx.db.chat.findUnique({
        where: { id: input.chatId },
        include: {
          template: {
            include: {
              documentUpload: true,
              fields: true,
            },
          },
        },
      });

      if (!chat) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }

      return chat;
    }),
  updateTitle: publicProcedure
    .input(
      z.object({
        chatId: z.string().cuid2(),
        data: z.object({
          title: z.string().min(1, "Title cannot be empty"),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const chat = await ctx.db.chat.findUnique({
        where: { id: input.chatId },
      });

      if (!chat) {
        throw new TRPCError({
          code: "FORBIDDEN",
        });
      }

      return await ctx.db.chat.update({
        where: { id: input.chatId },
        data: {
          title: input.data.title,
        },
      });
    }),

  updateMessages: publicProcedure
    .input(
      z.object({
        chatId: z.string().cuid2(),
        data: z.object({
          messages: z
            .object({
              role: z.enum(["user", "assistant", "system", "data"]),
              content: z.string().min(1, "Message content cannot be empty"),
            })
            .array(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const chat = await ctx.db.chat.findUnique({
        where: { id: input.chatId },
      });

      if (!chat) {
        throw new TRPCError({
          code: "FORBIDDEN",
        });
      }

      return await ctx.db.chat.update({
        where: { id: input.chatId },
        data: {
          messages: input.data.messages as JsonArray,
        },
      });
    }),
});
