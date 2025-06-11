"use client";

import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { availableModels } from "@/lib/config";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { Skeleton } from "../ui/skeleton";
import { chatStateAtom } from "./store";

export function ModelSelector() {
  const [open, setOpen] = React.useState(false);
  const [chatState, setChatState] = useAtom(chatStateAtom);

  if (!chatState) {
    return <Skeleton className="h-9 w-[200px]" />;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between has-[>svg]:px-1"
        >
          {chatState.model
            ? availableModels.find((model) => model.id === chatState.model)
                ?.name
            : ""}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Select model" />
          <CommandList>
            <CommandEmpty>No model found.</CommandEmpty>
            <CommandGroup>
              {availableModels.map((model) => (
                <CommandItem
                  key={model.id}
                  value={model.id}
                  onSelect={(currentValue) => {
                    setChatState({ ...chatState, model: currentValue });
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      chatState.model === model.id
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {model.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
