"use client";

import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Document, pdfjs } from "react-pdf";
import { generatedDocumentValuesAtom, templateAtom } from "./store";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

export function DocumentViewer() {
  const [template] = useAtom(templateAtom);
  const [generatedDocumentValues] = useAtom(generatedDocumentValuesAtom);
  const [generatedFileUrl, setGeneratedFileUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTemplateFile() {
      if (!template?.documentUpload?.url) {
        return;
      }

      const response = await fetch("/api/chat/generate-document", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          templateId: template.id,
          params: generatedDocumentValues,
        }),
      });

      if (!response.ok) {
        return;
      }

      const blob = await response.blob();
      setGeneratedFileUrl(URL.createObjectURL(blob));
    }

    void fetchTemplateFile();
  }, [template, generatedDocumentValues]);

  return (
    <div
      className={cn(
        "bg-accent aspect-[21/30] transition-all duration-500",
        generatedFileUrl ? "w-[400px] translate-x-0" : "w-0 translate-x-full",
      )}
    >
      {generatedFileUrl && <Document file={generatedFileUrl} />}
    </div>
  );
}
