import { onAuthenticateUser } from "@/actions/user";
import AppSidebar from "@/components/global/app-sidebar";
import { redirect } from "next/navigation";
import React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getRecentProjects } from "@/actions/project";
import UpperInforBar from "@/components/global/upper-info-bar";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const recentProjects = await getRecentProjects();
  //const recent Projects = await getRecentProjects();
  const checkUser = await onAuthenticateUser();

  if (!checkUser.user) {
    redirect("/sign-in");
  }
  return (
    <SidebarProvider>
      <AppSidebar
        user={checkUser.user}
        recentProjects={recentProjects.data || []}
      ></AppSidebar>

      <SidebarInset>
        <UpperInforBar user={checkUser.user} />
        <div className="p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};
export default Layout;
