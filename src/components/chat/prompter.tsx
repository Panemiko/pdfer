"use client";

import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useAtom } from "jotai";
import { SendIcon } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { ModelSelector } from "./model-selector";
import { chatStateAtom, messagesAtom } from "./store";

export function Prompter() {
  const [chatState] = useAtom(chatStateAtom);
  const [, setMessages] = useAtom(messagesAtom);
  const [input, setInput] = useState("");
  const { mutateAsync: createMessage } = api.message.create.useMutation();

  async function sendMessage() {
    if (!chatState?.templateId) return;

    // optimistically add the user message
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: crypto.randomUUID(),
        content: input,
        role: "user",
        createdAt: new Date(),
      },
    ]);

    const createdMessage = await createMessage({
      chatId: chatState.id,
      content: input,
    });

    setMessages((prevMessages) =>
      prevMessages.splice(prevMessages.length - 1, 1, createdMessage),
    );

    const generatedMessageId = crypto.randomUUID();
    const messageDate = new Date();

    try {
      const response = await fetch("/api/chat/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId: chatState.id,
          chatModel: chatState.model,
          content: input,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  return (
    <div className="border-border bg-background absolute bottom-10 left-20 w-[calc(100%-5rem)] rounded-lg border p-4">
      <AutosizeTextarea
        placeholder="Type your message here..."
        maxHeight={350}
        className="mb-1 resize-none border-none px-0 py-0 text-base ring-0 outline-0 focus-visible:ring-0"
        disabled={!chatState?.templateId}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (input.trim()) {
              void sendMessage();
              setInput("");
            }
          }
        }}
      />
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <ModelSelector />
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                disabled={!chatState?.templateId || !input.trim()}
                onClick={sendMessage}
              >
                <SendIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Send Message</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
