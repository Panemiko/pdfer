"use client";

import { UploadButton } from "@/lib/uploadthing";
import { useAtom } from "jotai";
import { toast } from "sonner";
import { documentAtom } from "./store";

export function UploadDocumentButton() {
  const [document, setDocument] = useAtom(documentAtom);

  return (
    <UploadButton
      endpoint="documentUploader"
      onClientUploadComplete={(res) => {
        if (!res || res.length === 0 || !res[0]) {
          alert("No file uploaded.");
          return;
        }
      }}
      onUploadError={(error: Error) => {
        toast("Error uploading document", {
          description: error.message,
        });
      }}
    />
  );
}
