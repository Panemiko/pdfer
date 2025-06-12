import { ChatHeader } from "@/components/chat/header";
import { HydrateChat } from "@/components/chat/hydrate-chat";
import { Messages } from "@/components/chat/messages";
import { Prompter } from "@/components/chat/prompter";
import { api } from "@/trpc/server";
import { notFound } from "next/navigation";
import { z } from "zod";

export default async function Page({
  params,
}: {
  params: Promise<{ chatId: string }>;
}) {
  const { success, data: chatId } = await z
    .string()
    .cuid2()
    .safeParseAsync((await params).chatId);

  if (!success) {
    return notFound();
  }

  const chat = await api.chat.byId({
    chatId,
  });

  if (!chat) {
    return notFound();
  }

  return (
    <>
      <ChatHeader />
      <HydrateChat chat={chat} />
      <div className="flex h-full w-full justify-between gap-20 overflow-x-hidden">
        <div className="relative mx-auto h-full w-full max-w-4xl px-40 py-20">
          <Messages />
          <Prompter />
        </div>
        <div className="bg-accent aspect-[21/30] w-0 translate-x-full transition-all duration-500"></div>
      </div>
    </>
  );
}
