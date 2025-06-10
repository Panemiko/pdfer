import { defaultTemplates } from "@/lib/config";
import { atom } from "jotai";
import { useQueryState } from "nuqs";

export const chatOptionsAtom = atom({
  modelId: "gemini-2.5-flash",
});

const templateAtom = atom((get) => {
  const [templateId] = useQueryState("t", { defaultValue: "" });

  if (!templateId) {
    return null;
  }

  if (templateId.length === 1) {
    const foundTemplate = defaultTemplates[parseInt(templateId)];

    if (foundTemplate) {
      return foundTemplate;
    }
    
    return null;
  }
});

export const messagesAtom = atom<
  {
    id: string;
    role: "user" | "assistant";
    content: string;
  }[]
>([]);

export const selectedTemplateAtom = atom();
