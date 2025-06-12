import { getModelConfigFromModelName } from "@/server/ai";
import { streamText } from "ai";
import { z } from "zod";
import { getTools } from "./tools";

const requestSchema = z.object({
  messages: z
    .object({
      role: z.enum(["user", "assistant", "system"]),
      content: z.string().min(1, "Message content cannot be empty"),
    })
    .array(),
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

  const result = streamText({
    model: getModelConfigFromModelName("gemini-2.0-flash"),
    system: `You are a helpful assistant for a chat application. Your role is to respond to user messages based on the context provided in the chat history. Please ensure your responses are relevant and helpful.`,
    messages: input.messages,
    tools: await getTools(),
  });

  return result.toDataStreamResponse();
}
