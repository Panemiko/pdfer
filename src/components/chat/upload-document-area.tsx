"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { toast } from "sonner";

export function UploadDocumentArea() {
  return (
    <UploadDropzone
      className="bg-primary/5 border-primary/30 ut-label:text-xl ut-allowed-content:hidden ut-button:hidden mx-auto mb-10 w-full max-w-[calc(51rem)] border-dashed py-10"
      endpoint="documentUploader"
      onClientUploadComplete={(res) => {
        if (!res || res.length === 0 || !res[0]) {
          alert("No file uploaded.");
          return;
        }
      }}
      config={{
        appendOnPaste: true,
      }}
      onUploadError={(error: Error) => {
        toast("Error uploading document", {
          description: error.message,
        });
      }}
    />
  );
}
