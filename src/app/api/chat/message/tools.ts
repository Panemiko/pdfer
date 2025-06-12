import { tool } from "ai";
import { z } from "zod";

export async function getTools() {
  return {
    updateChatTitle: tool({
      description:
        "Sets a new title for the chat. Update if the chat title is empty or too different from the current context of the conversation.",
      parameters: z.object({
        title: z.string().min(1, "Title cannot be empty"),
      }),
      async execute({ title }) {
        console.log("Updating chat title to:", title);
      },
    }),
  };
}
