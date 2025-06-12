import { getModelConfigFromModelName } from "@/server/ai";
import { api } from "@/trpc/server";
import { streamText } from "ai";
import { z } from "zod";
import { getTools } from "./tools";

const requestSchema = z.object({
  messages: z
    .object({
      role: z.enum(["user", "assistant", "system"]),
      content: z.string(),
    })
    .array(),
  chatId: z.string().cuid2(),
  model: z.enum(["gemini-2.0-flash"]).optional(),
});

export async function POST(request: Request) {
  const {
    data: input,
    success,
    error,
  } = await requestSchema.safeParseAsync(await request.json());

  if (!success) {
    console.error("Validation error:", error);
    return new Response(JSON.stringify(error), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const chat = await api.chat.byId({
    chatId: input.chatId,
  });

  const template = await api.template.byId({
    templateId: chat?.templateId ?? "",
  });

  if (!template || !chat) {
    return new Response(undefined, {
      status: 401,
    });
  }

  const result = streamText({
    model: getModelConfigFromModelName(input.model ?? "gemini-2.0-flash"),
    system: `You are a helpful assistant for a chat application. Your role is to respond to user messages based on the context provided in the chat history. Please ensure your responses are relevant and helpful.`,
    messages: input.messages,
    tools: await getTools({
      chat,
      template,
    }),
  });

  return result.toDataStreamResponse();
}
