import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarRail
} from "@/components/ui/sidebar";
import { auth } from "@/server/auth";
import type { ReactNode } from "react";
import { UserDropdown } from "./user-dropdown";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth();

  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar collapsible="icon">
        <SidebarHeader></SidebarHeader>
        <SidebarContent>
          {/* <NavMain items={data.navMain} />
          <NavProjects projects={data.projects} /> */}
        </SidebarContent>
        <SidebarFooter>
          {session?.user ? <UserDropdown user={session.user} /> : <div></div>}
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        {/* <header className="absolute top-0 left-0 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
        </header> */}
        <main className="h-full w-full">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
