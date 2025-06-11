import { notFound } from "next/navigation";
import { z } from "zod";
import { Prompter } from "../../_chat/prompter";

export default async function Page({ params }: { params: { chatId: string } }) {
  const { success, data: chatId } = await z
    .string()
    .cuid2()
    .safeParseAsync(params.chatId);

  if (!success) {
    return notFound();
  }

  return (
    <div className="flex h-full w-full justify-between gap-20 overflow-x-hidden">
      <div className="relative mx-auto h-full w-full max-w-4xl px-40 py-20">
        <Prompter />
      </div>
      <div className="bg-accent aspect-[21/30] w-0 translate-x-full transition-all duration-500"></div>
    </div>
  );
}
