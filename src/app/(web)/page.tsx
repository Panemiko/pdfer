import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { Button } from "@/components/ui/button";
import { FileUpIcon, SendIcon } from "lucide-react";
import { ModelSelector } from "./model-selector";

export default async function Page() {
  return (
    <div className="flex h-full w-full justify-between gap-20">
      <div className="relative h-full w-full px-20 py-20">
        <div className="border-border absolute bottom-10 left-20 w-[calc(100%-5rem)] rounded-lg border px-2 py-2">
          <AutosizeTextarea
            placeholder="Type your message here..."
            className="mb-1 resize-none border-none text-base ring-0 outline-0 focus-visible:ring-0"
          />
          <div className="flex justify-between px-3">
            <div className="flex items-center gap-2">
              <Button variant="destructive" size="sm">
                <FileUpIcon />
                No Document Selected
              </Button>
              <ModelSelector />
            </div>
            <Button>
              <SendIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-accent aspect-[21/30] h-full"></div>
    </div>
  );
}
