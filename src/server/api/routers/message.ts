import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const messageRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        chatId: z.string().cuid2(),
        content: z.string().min(1, "Content cannot be empty"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { chatId, content } = input;

      const chat = await ctx.db.chat.findUnique({
        where: { id: chatId },
      });

      if (!chat) {
        throw new Error("Chat not found");
      }

      const message = await ctx.db.message.create({
        data: {
          chatId,
          content,
          role: "user",
        },
      });

      return message;
    }),

  byChatId: publicProcedure
    .input(z.object({ chatId: z.string().cuid2() }))
    .query(async ({ ctx, input }) => {
      const messages = await ctx.db.message.findMany({
        where: { chatId: input.chatId },
        orderBy: { createdAt: "asc" },
      });

      return messages;
    }),
});
