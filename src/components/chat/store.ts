import type { RouterOutputs } from "@/trpc/react";
import { atom } from "jotai";

export const chatStateAtom = atom<
  | (Pick<
      RouterOutputs["chat"]["byId"],
      "id" | "createdAt" | "title" | "updatedAt" | "userId" | "templateId"
    > & { model: string })
  | null
>();

export const messagesAtom = atom<
  Pick<
    RouterOutputs["chat"]["byId"]["messages"][0],
    "content" | "createdAt" | "role" | "id"
  >[]
>([]);

export const templateAtom = atom<
  RouterOutputs["chat"]["byId"]["template"] | null
>(null);
