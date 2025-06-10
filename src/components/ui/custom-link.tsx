import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

export function CustomLink({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      className={cn(
        `text-primary hover:text-primary/80 font-medium transition-colors duration-200`,
        className,
      )}
      {...props}
    />
  );
}
