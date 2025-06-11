"use client";
import { useAtom } from "jotai";
import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import { Skeleton } from "../ui/skeleton";
import { chatStateAtom, templateAtom } from "./store";

export function ChatHeader() {
  const [chatState] = useAtom(chatStateAtom);
  const [template] = useAtom(templateAtom);

  const breadcrumbs = [
    {
      label: "Chats",
      href: `/chat/`,
    },
    {
      label: template?.name,
      href: `/templates/${chatState?.templateId}`,
    },
    {
      label: chatState?.title ?? "New chat",
    },
  ];

  return (
    <header className="absolute top-0 left-0 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        {breadcrumbs?.length && (
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((breadcrumb, index) => (
                <Fragment key={index}>
                  <BreadcrumbItem>
                    {(chatState && template) || index === 0 ? (
                      breadcrumb.href ? (
                        <BreadcrumbLink href={breadcrumb.href}>
                          {breadcrumb.label}
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                      )
                    ) : (
                      <Skeleton className="h-4 w-24" />
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                </Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        )}
      </div>
    </header>
  );
}
