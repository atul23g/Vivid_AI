"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuBadge,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const NavMain = ({
  items,
}: {
  items?: {
    title: string;
    url: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) => {
  const pathname = usePathname();

  // Add safety check for undefined/empty items
  if (!items || !Array.isArray(items)) {
    return null;
  }

  return (
    <SidebarGroup className="p-0">
      <SidebarMenu>
        {items.map((item, idx) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              tooltip={item.title}
              className={`${pathname.includes(item.url) && "bg-muted"}`}
            >
              <Link
                href={item.url}
                className={`text-lg ${pathname.includes(item.url) ? "font-bold" : ""}`}
              >
                <item.icon className="text-lg" />
                <span> {item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))} {/* ✅ Fixed: removed extra closing braces and parentheses */}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default NavMain;