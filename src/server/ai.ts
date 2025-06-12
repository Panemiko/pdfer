import { env } from "@/env";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const googleModel = createGoogleGenerativeAI({
  apiKey: env.GEMINI_API_KEY,
});

export function getModelConfigFromModelName(modelName: string) {
  // if (modelName === "gemini-2.0-flash") {
  //   return "gemini-2.0-flash";
  // }

  return googleModel("gemini-2.0-flash");
}
