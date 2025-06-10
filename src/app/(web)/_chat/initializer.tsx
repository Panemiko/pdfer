"use client";

import { CustomLink } from "@/components/ui/custom-link";
import { useAtomValue } from "jotai";
import { messagesAtom } from "./store";

export function Initializer() {
  const messages = useAtomValue(messagesAtom);

  if (messages.length > 0) {
    return <></>;
  }

  return (
    <div className="absolute top-[calc(50%-350px)] left-[calc(50%+2.5rem)] w-full -translate-x-1/2">
      <h1 className="text-foreground mb-4 text-center text-3xl font-bold">
        Welcome!
      </h1>
      {!document && (
        <>
          <p className="text-muted-foreground text-center text-lg">
            Get started by selecting one of the base documents below
          </p>

          <p className="text-muted-foreground text-center text-lg">
            or <CustomLink href="/auth/sign-in">upload your own</CustomLink>
          </p>
        </>
      )}
    </div>
  );
}
