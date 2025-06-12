import type { RouterOutputs } from "@/trpc/react";
import { useHydrateAtoms } from "jotai/utils";
import { chatStateAtom, messagesAtom, templateAtom } from "./store";

export function useHydration(chat: RouterOutputs["chat"]["byId"]) {
  useHydrateAtoms([
    [messagesAtom, chat.messages],
    [chatStateAtom, { ...chat, model: chat.model ?? "gemini-2.0-flash" }],
    [templateAtom, chat.template],
  ]);
}
