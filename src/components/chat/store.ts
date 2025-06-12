import type { RouterOutputs } from "@/trpc/react";
import type { Message } from "ai";
import { atom } from "jotai";

export const chatStateAtom = atom<
  | (Pick<
      RouterOutputs["chat"]["byId"],
      "id" | "createdAt" | "title" | "updatedAt" | "userId" | "templateId"
    > & { model: string })
  | null
>();

export const messagesAtom = atom<Message[]>([]);

export const templateAtom = atom<
  RouterOutputs["chat"]["byId"]["template"] | null
>(null);

export const generatedDocumentValuesAtom = atom<Record<string, string> | null>(
  null,
);
