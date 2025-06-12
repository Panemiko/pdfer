"use client";

import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useChat } from "@ai-sdk/react";
import { useAtom } from "jotai";
import { SendIcon } from "lucide-react";
import { useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { ModelSelector } from "./model-selector";
import {
  chatStateAtom,
  generatedDocumentValuesAtom,
  messagesAtom,
} from "./store";

export function Prompter() {
  const [chatState, setChatState] = useAtom(chatStateAtom);
  const [internalMessages, setInternalMessages] = useAtom(messagesAtom);
  const [, setGeneratedDocumentValues] = useAtom(generatedDocumentValuesAtom);
  const { mutateAsync: updateMessagesMutation } =
    api.chat.updateMessages.useMutation();
  const { data, refetch } = api.chat.byId.useQuery({
    chatId: chatState?.id ?? "",
  });
  const { input, setInput, handleSubmit, handleInputChange, messages } =
    useChat({
      api: "/api/chat/message",
      body: {
        chatId: chatState?.id,
        model: chatState?.model,
      },
      initialMessages: internalMessages,
      async onToolCall({ toolCall }) {
        if (toolCall.toolName === "updateChatTitle") {
          await refetch();

          if (data) {
            setChatState({ ...data, model: data.model ?? "gemini-2.0-flash" });
          }
        }

        if (toolCall.toolName === "generateDocument") {
          setGeneratedDocumentValues(toolCall.args as Record<string, string>);
        }
      },
      async onFinish() {
        await updateMessagesMutation({
          chatId: chatState?.id ?? "",
          data: {
            messages: internalMessages,
          },
        });
      },
    });

  useEffect(() => {
    setInternalMessages(messages);
  }, [messages, setInternalMessages]);

  return (
    <div className="border-border bg-background absolute bottom-10 left-20 w-[calc(100%-5rem)] rounded-lg border p-4">
      <AutosizeTextarea
        placeholder="Type your message here..."
        maxHeight={350}
        className="mb-1 resize-none border-none px-0 py-0 text-base ring-0 outline-0 focus-visible:ring-0"
        disabled={!chatState?.templateId}
        value={input}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (input.trim()) {
              void handleSubmit();
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
                onClick={handleSubmit}
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
