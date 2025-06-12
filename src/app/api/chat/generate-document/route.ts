import { createZodValidationBasedOnFields } from "@/lib/utils";
import { api } from "@/trpc/server";
import jsPDF from "jspdf";
import { z } from "zod";

async function getTemplateFile(url: string) {
  const response = await fetch(url);
  return response.blob();
}

const requestSchema = z.object({
  templateId: z.string().cuid2(),
  params: z.any(),
});

export async function POST(request: Request) {
  const {
    data: input,
    success,
    error,
  } = await requestSchema.safeParseAsync(await request.json());

  if (!success) {
    console.log("Validation error:", error);
    return new Response(JSON.stringify(error), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const template = await api.template.byId({
    templateId: input.templateId,
  });

  if (!template || !template.fields || !template.documentUpload?.url) {
    return new Response(undefined, {
      status: 401,
    });
  }

  const paramsSchema = createZodValidationBasedOnFields(template.fields);

  const {
    success: paramsSuccess,
    error: paramsError,
    data: params,
  } = paramsSchema.safeParse(input.params);

  if (!paramsSuccess) {
    console.log("Validation error:", paramsError);
    return new Response(JSON.stringify(paramsError), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // VALIDATION FINISHED
  // BEGIN GENERATING DOCUMENT

  const templateFile = await getTemplateFile(template.documentUpload.url);
  const doc = new jsPDF();

  doc.addFileToVFS("template.pdf", await templateFile.text());

  template.fields.forEach((field) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const value: string = params[field.key];

    if (value === undefined || value === null) {
      return;
    }

    if (field.type === "text") {
      doc.text(value, field.positionX, field.positionY);
    } else if (field.type === "number") {
      doc.text(value.toString(), field.positionX, field.positionY);
    }
  });

  const pdfBlob = doc.output("blob");
  const pdfFile = new File([pdfBlob], `${template.name}.pdf`, {
    type: "application/pdf",
  });

  return new Response(pdfFile, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
    },
  });
}
