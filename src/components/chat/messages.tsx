"use client";

import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { messagesAtom } from "./store";

export function Messages() {
  const [messages] = useAtom(messagesAtom);

  const messagesFiltered = messages.filter(
    (message) => message.role === "user" || message.role === "assistant",
  );

  return (
    <div className="absolute top-0 left-[calc(50%+2.5rem)] flex h-full w-full max-w-4xl -translate-x-1/2 flex-col gap-4 overflow-y-auto p-4">
      {messagesFiltered.length === 0 && (
        <div className="text-muted-foreground mt-20 text-center text-sm">
          No messages yet. Feel free to start generating your documents!
        </div>
      )}

      {messagesFiltered.map((message, index) => (
        <div
          key={index}
          className={cn(
            "flex",
            message.role === "user" ? "justify-end" : "justify-start",
          )}
        >
          <div
            className={cn(
              "max-w-[80%] rounded-lg px-4 py-2 whitespace-pre-line shadow",
              message.role === "user"
                ? "bg-primary text-primary-foreground rounded-br-none"
                : "bg-muted text-muted-foreground rounded-bl-none border",
            )}
          >
            {message.parts?.map((part) => {
              switch (part.type) {
                // render text parts as simple text:
                case "text":
                  return part.text;

                // for tool invocations, distinguish between the tools and the state:
                case "tool-invocation": {
                  const callId = part.toolInvocation.toolCallId;

                  switch (part.toolInvocation.toolName) {
                    case "askForConfirmation": {
                      break;
                    }
                  }
                }
              }
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
