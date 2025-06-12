import type { TemplateField } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z, type ZodRawShape } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// returns a zod schema based on the fields of a template
// the types are text and number
// the description should be added to the zod schema
export function createZodValidationBasedOnFields(fields: TemplateField[]) {
  return z.object(
    fields.reduce((acc, field) => {
      if (field.type === "text") {
        acc[field.key] = field.required
          ? z.string({ description: field.description ?? undefined }).min(1)
          : z
              .string({ description: field.description ?? undefined })
              .optional();
      } else if (field.type === "number") {
        acc[field.key] = field.required
          ? z
              .number({ description: field.description ?? undefined })
              .min(0, field.description ?? "This field is required")
          : z
              .number({ description: field.description ?? undefined })
              .optional();
      }
      return acc;
    }, {} as ZodRawShape),
  );
}
