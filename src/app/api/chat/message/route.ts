import { getModelConfigFromModelName } from "@/server/ai";
import { api } from "@/trpc/server";
import { streamText } from "ai";
import { z } from "zod";

const requestSchema = z.object({
  chatId: z.string().cuid2(),
  chatModel: z.string().optional(),
  content: z.string().min(1, "Content cannot be empty"),
});

export async function POST(request: Request) {
  const {
    data: input,
    success,
    error,
  } = await requestSchema.safeParseAsync(await request.json());

  if (!success) {
    return new Response(JSON.stringify(error), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const chatMessages = await api.message.byChatId({
    chatId: input.chatId,
  });

  const result = streamText({
    model: getModelConfigFromModelName(input.chatModel ?? "gemini-2.0-flash"),
    system: `
      
    `,
    messages: chatMessages.map((message) => ({
      role:
        message.role !== "user" &&
        message.role !== "assistant" &&
        message.role !== "system"
          ? "user"
          : message.role,
      content: message.content,
    })),
  });

  return result.toDataStreamResponse();
}
