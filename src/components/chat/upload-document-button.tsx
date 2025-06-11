"use client";

import { UploadButton } from "@/lib/uploadthing";
import { toast } from "sonner";

export function UploadDocumentButton() {
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
