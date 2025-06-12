import { createZodValidationBasedOnFields } from "@/lib/utils";
import type { RouterOutputs } from "@/trpc/react";
import { api } from "@/trpc/server";
import { tool } from "ai";
import { z } from "zod";

export async function getTools({
  chat,
  template,
}: {
  chat: RouterOutputs["chat"]["byId"];
  template: RouterOutputs["template"]["byId"];
}) {
  if (!chat || !template) {
    throw new Error("Chat or template not found");
  }

  return {
    updateChatTitle: tool({
      description:
        "Sets a new title for the chat. Update if the chat title is empty or too different from the current context of the conversation.",
      parameters: z.object({
        title: z.string().min(1, "Title cannot be empty"),
      }),
      async execute({ title }) {
        await api.chat.updateTitle({
          chatId: chat.id,
          data: {
            title,
          },
        });

        return { title };
      },
    }),

    generateDocument: tool({
      description:
        "Generates a document based on the template provided. Fill in the required fields with the provided parameters.",
      parameters: createZodValidationBasedOnFields(template.fields),
    }),
  };
}
