"use client";

import type { RouterOutputs } from "@/trpc/react";
import { useHydration } from "./use-hydration";

export function HydrateChat({ chat }: { chat: RouterOutputs["chat"]["byId"] }) {
  useHydration(chat);
  return null;
}
