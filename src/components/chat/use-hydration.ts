import type { RouterOutputs } from "@/trpc/react";
import type { Message } from "ai";
import { useHydrateAtoms } from "jotai/utils";
import { chatStateAtom, messagesAtom, templateAtom } from "./store";

export function useHydration(chat: RouterOutputs["chat"]["byId"]) {
  useHydrateAtoms([
    [messagesAtom, JSON.parse(JSON.stringify(chat.messages)) as Message[]],
    [chatStateAtom, { ...chat, model: chat.model ?? "gemini-2.0-flash" }],
    [templateAtom, chat.template],
  ]);
}
