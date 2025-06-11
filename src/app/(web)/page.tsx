import { api } from "@/trpc/server";
import { Initializer } from "./_chat/initializer";
import { Prompter } from "./_chat/prompter";

export default async function Page() {
  const globalTemplates = await api.template.listGlobalTemplates();

  return (
    <div className="flex h-full w-full justify-between gap-20 overflow-x-hidden">
      <div className="relative mx-auto h-full w-full max-w-4xl px-40 py-20">
        <Initializer globalTemplates={globalTemplates} />
        <Prompter />
      </div>
      <div className="bg-accent aspect-[21/30] w-0 translate-x-full transition-all duration-500"></div>
    </div>
  );
}
