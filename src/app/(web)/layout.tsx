import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
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
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
