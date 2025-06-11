"use client";

import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { Button } from "@/components/ui/button";
import { SendIcon } from "lucide-react";
import { ModelSelector } from "./model-selector";

export function Prompter() {
  return (
    <div className="border-border absolute bottom-10 left-20 w-[calc(100%-5rem)] rounded-lg border p-4">
      <AutosizeTextarea
        placeholder="Type your message here..."
        maxHeight={350}
        className="mb-1 resize-none border-none px-0 py-0 text-base ring-0 outline-0 focus-visible:ring-0"
        disabled={false}
      />
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <ModelSelector />
        </div>
        <Button disabled={false}>
          <SendIcon />
        </Button>
      </div>
    </div>
  );
}
