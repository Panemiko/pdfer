"use client";

import { CustomLink } from "@/components/ui/custom-link";
import { api, type RouterOutputs } from "@/trpc/react";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { messagesAtom } from "./store";

export function Initializer({
  globalTemplates,
}: {
  globalTemplates: RouterOutputs["template"]["listGlobalTemplates"];
}) {
  const messages = useAtomValue(messagesAtom);
  const { mutateAsync: createChat } = api.chat.create.useMutation();
  const router = useRouter();

  if (messages.length > 0) {
    return <></>;
  }

  return (
    <div className="absolute top-0 left-[calc(50%+2.5rem)] mt-20 w-full -translate-x-1/2">
      <h1 className="text-foreground mb-4 text-center text-3xl font-bold">
        Welcome!
      </h1>
      {true && (
        <>
          <p className="text-muted-foreground mb-10 text-center text-lg">
            Get started by selecting one of the template documents below
          </p>

          <ul className="mb-20 grid grid-cols-2 gap-10">
            {globalTemplates.map((template) => (
              <li key={template.id}>
                <button
                  onClick={async () => {
                    const chat = await createChat({
                      templateId: template.id,
                    });

                    if (!chat) {
                      toast("Failed to create chat", {
                        description: "Please try again later.",
                      });

                      return;
                    }

                    router.push(`/chat/${chat.id}`);
                  }}
                  className="border-border group hover:bg-accent relative block w-full overflow-hidden rounded-md border px-6 py-8 text-left transition-colors hover:cursor-pointer"
                >
                  <span className="font-medium">{template.name}</span>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {template.description ?? "No description available."}
                  </p>
                </button>
              </li>
            ))}
          </ul>

          <p className="text-muted-foreground text-center text-lg">
            or{" "}
            <CustomLink href="/auth/sign-in">
              upload your own template
            </CustomLink>
          </p>
        </>
      )}
    </div>
  );
}
