"use client";

import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { messagesAtom } from "./store";

export function Messages() {
  const [messages] = useAtom(messagesAtom);

  const messagesFiltered = messages.filter(
    (msg) => msg.role === "user" || msg.role === "assistant",
  );

  return (
    <div className="absolute top-0 left-[calc(50%+2.5rem)] flex h-full w-full max-w-4xl -translate-x-1/2 flex-col gap-4 overflow-y-auto p-4">
      {messagesFiltered.length === 0 && (
        <div className="text-muted-foreground text-center text-sm">
          No messages yet. Feel free to start generating your documents!
        </div>
      )}
      {messagesFiltered.map((msg, index) => (
        <div
          key={index}
          className={cn(
            "flex",
            msg.role === "user" ? "justify-end" : "justify-start",
          )}
        >
          <div
            className={cn(
              "max-w-[80%] rounded-lg px-4 py-2 whitespace-pre-line shadow",
              msg.role === "user"
                ? "bg-primary text-primary-foreground rounded-br-none"
                : "bg-muted text-muted-foreground rounded-bl-none border",
            )}
          >
            <div className="mb-1 text-xs opacity-60">
              {msg.role === "user" ? "Você" : "AI"}
              {msg.createdAt && (
                <span className="ml-2">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              )}
            </div>
            <div>{msg.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
